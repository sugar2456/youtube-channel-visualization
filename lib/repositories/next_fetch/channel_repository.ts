import { ChannelParams, ChannelRepositoryInterface, ChannelResult, ChannelResultItem } from "../interfaces/channel_repository_interface";

export default class ChannelRepository implements ChannelRepositoryInterface {
  /**
   * YouTube Data APIを利用して、チャンネル情報を取得します。
   * 
   * @param channelId チャンネルID
   * @returns チャンネル情報
   */
  async getChannelInfo(params: ChannelParams): Promise<ChannelResult> {
    const url = new URL("https://www.googleapis.com/youtube/v3/channels");

    // APIキーをクエリパラメータとして追加
    url.searchParams.append("key", process.env.YOUTUBE_API_KEY || "");
    url.searchParams.append("part", "snippet,contentDetails,statistics");
    url.searchParams.append("id", params.id || "");
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    }
    );
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching channel info: ${response.statusText}`);
      }

      const data = await response.json();
      const result: ChannelResult = {
        kind: data.kind,
        etag: data.etag,
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
        pageInfo: {
          totalResults: data.pageInfo.totalResults,
          resultsPerPage: data.pageInfo.resultsPerPage,
        },
        items: data.items.map((item: ChannelResultItem) => ({
          kind: item.kind,
          etag: item.etag,
          id: item.id,
          snippet: {
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            customUrl: item.snippet.customUrl,
            description: item.snippet.description,
            thumbnails: {
              default: {
                url: item.snippet.thumbnails.default.url,
                width: item.snippet.thumbnails.default.width,
                height: item.snippet.thumbnails.default.height,
              },
              medium: {
                url: item.snippet.thumbnails.medium.url,
                width: item.snippet.thumbnails.medium.width,
                height: item.snippet.thumbnails.medium.height,
              },
              high: {
                url: item.snippet.thumbnails.high.url,
                width: item.snippet.thumbnails.high.width,
                height: item.snippet.thumbnails.high.height,
              },
            },
            country: item.snippet.country,
          },
          contentDetails: {
            relatedPlaylists: {
              likes: item.contentDetails.relatedPlaylists.likes,
              favorites: item.contentDetails.relatedPlaylists.favorites,
              uploads: item.contentDetails.relatedPlaylists.uploads,
              watchHistory: item.contentDetails.relatedPlaylists.watchHistory,
              watchLater: item.contentDetails.relatedPlaylists.watchLater,
            },
          },
          statistics: {
            viewCount: item.statistics.viewCount,
            subscriberCount: item.statistics.subscriberCount,
            hiddenSubscriberCount: item.statistics.hiddenSubscriberCount,
            videoCount: item.statistics.videoCount,
          },
        })),
      };
      return result;
    }
    catch (error) {
      console.error("Error fetching channel info:", error);
      throw error;
    }
  }
}
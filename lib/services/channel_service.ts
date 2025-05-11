import {
  ChannelParams,
  ChannelRepositoryInterface,
} from "../repositories/interfaces/channel_repository_interface";
import { SearchRepositoryInterface } from "../repositories/interfaces/search_repository_interface";
import {
  ChannelInfoResult,
  ChannelsVideoResult,
  ChannelsVideoResultItem,
} from "./interfaces/channel_service_interface";

export class ChannelService {
  private searchRepository;
  private channelRepository;
  private static readonly MAX_RESULTS = 50;

  constructor(
    searchRepository: SearchRepositoryInterface,
    channelRepository: ChannelRepositoryInterface
  ) {
    this.searchRepository = searchRepository;
    this.channelRepository = channelRepository;
  }

  async getChannelInfo(channelId: string): Promise<ChannelInfoResult> {
    const params: ChannelParams = {
      part: "snippet,contentDetails,statistics",
      id: channelId,
    };

    const resultRow = await this.channelRepository.getChannelInfo(params);
    if (resultRow.items.length === 0) {
      throw new Error("チャンネル情報が見つかりませんでした");
    }
    const item = resultRow.items[0];
    return {
      channelId: item.id,
      channelTitle: item.snippet.title,
      description: item.snippet.description,
      customUrl: item.snippet.customUrl || "",
      country: item.snippet.country || "",
      publishedAt: item.snippet.publishedAt,
      thumbnails: {
        default: item.snippet.thumbnails.default,
        medium: item.snippet.thumbnails.medium,
        high: item.snippet.thumbnails.high,
      },
      statistics: {
        subscriberCount: Number(item.statistics.subscriberCount),
        viewCount: Number(item.statistics.viewCount),
        videoCount: Number(item.statistics.videoCount),
      },
    };
  }

  async getRecentVideos(
    channelId: string,
    nextPageToken?: string
  ): Promise<ChannelsVideoResult> {
    const params = {
      part: "snippet",
      channelId: channelId,
      type: "video",
      maxResults: ChannelService.MAX_RESULTS,
      pageToken: nextPageToken,
    };

    const resultRow = await this.searchRepository.search(params);
    const resultItems: ChannelsVideoResultItem[] = resultRow.items.map(
      (item) => {
        if (!item.id.videoId) {
          throw new Error("videoIdが存在しません");
        }
        return {
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnails: {
            default: item.snippet.thumbnails.default,
            medium: item.snippet.thumbnails.medium,
            high: item.snippet.thumbnails.high,
          },
          viewCount: 0, // Placeholder, replace with actual data if available
          likeCount: 0, // Placeholder, replace with actual data if available
          commentCount: 0, // Placeholder, replace with actual data if available
        };
      }
    );
    return {
      nextPageToken: resultRow.nextPageToken,
      items: resultItems,
    };
  }
}

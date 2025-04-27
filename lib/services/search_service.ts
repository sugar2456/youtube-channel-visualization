import { SearchParams, SearchRepositoryInterface } from "../repositories/interfaces/search_repository_interface";
import { SearchChannelResult, SearchChannelResultItem, SearchVideoResult, SearchVideoResultItem } from "./interfaces/search_channel_interface";

/**
 * youtube data apiを利用したSearchServiceの実装
 * 
 * SearchServiceは、SearchRepositoryを利用して、YouTube Data APIを通じて検索機能を提供します。
 * apiのデータをフロント側で利用しやすいデータに変換する
 */
export default class SearchService {

  constructor(private searchRepository: SearchRepositoryInterface) {}

  async searchChannel(
    q: string,
    nextPageToken?: string
  ): Promise<SearchChannelResult> {
    const params: SearchParams = {
      part: "snippet",
      q: q,
      type: "channel",
      pageToken: nextPageToken,
    };

    const resultRow = await this.searchRepository.search(params);
    
    const resultItems: SearchChannelResultItem[] = resultRow.items.map((item) => {
      if (!item.id.channelId) {
        throw new Error("channelIdが存在しません");
      }
      return {
        channelId: item.id.channelId,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
        thumbnails: {
          default: item.snippet.thumbnails.default,
          medium: item.snippet.thumbnails.medium,
          high: item.snippet.thumbnails.high,
        },
      };
    });

    const result: SearchChannelResult = {
      nextPageToken: resultRow.nextPageToken,
      items: resultItems,
    };

    return result;
  }

  async searchVideo(
    q: string,
    nextPageToken?: string
  ): Promise<SearchVideoResult> {
    const params: SearchParams = {
      part: "snippet",
      q: q,
      type: "video",
      pageToken: nextPageToken,
    };

    const resultRow = await this.searchRepository.search(params);
    
    const resultItems: SearchVideoResultItem[] = resultRow.items.map((item) => {
      if (!item.id.videoId && !item.snippet.title) {
        throw new Error("videoIdが存在しません");
      }
      return {
        videoId: item.id.videoId as string,
        videoTitle: item.snippet.title,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
        thumbnails: {
          default: item.snippet.thumbnails.default,
          medium: item.snippet.thumbnails.medium,
          high: item.snippet.thumbnails.high,
        },
      };
    });

    const result: SearchVideoResult = {
      nextPageToken: resultRow.nextPageToken,
      items: resultItems,
    };

    return result;
  }
}

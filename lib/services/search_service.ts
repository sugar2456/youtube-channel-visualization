import { SearchParams, SearchRepositoryInterface } from "../repositories/interfaces/search_repository_interface";

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
}

/**
 * 画面で利用する情報を定義した型
 */
export interface SearchChannelResult {
  // 次のページがある場合はトークンが存在する
  nextPageToken?: string;
  // 検索結果のアイテム
  items: SearchChannelResultItem[];
}

export interface SearchChannelResultItem {
  // チャンネルID
  channelId: string;
  // チャンネル名
  channelTitle: string;
  // チャンネルの説明
  description: string;
  // チャンネルの公開日時
  publishedAt: string;
  // ライブ配信コンテンツの有無
  liveBroadcastContent?: string;
  thumbnails: {
    default: {
      url: string;
      width?: number;
      height?: number;
    };
    medium: {
      url: string;
      width?: number;
      height?: number;
    };
    high: {
      url: string;
      width?: number;
      height?: number;
    };
  };
}
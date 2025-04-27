export interface SearchParams {
  part: string;
  forContentOwner?: boolean;
  forDeveloper?: boolean;
  forMine?: boolean;
  channelId?: string;
  channelType?: string;
  eventType?: string;
  location?: string;
  locationRadius?: number;
  maxResults?: number;
  onBehalfOfContentOwner?: string;
  order?: string;
  pageToken?: string;
  publishedAfter?: string;
  publishedBefore?: string;
  q?: string;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: string;
  topicId?: string;
  type?: string;
  videoCaption?: string;
  videoCategoryId?: string;
  videoDefinition?: string;
  videoDimension?: string;
  videoDuration?: string;
  videoEmbeddable?: string;
  videoLicense?: string;
  videoPaidProductPlacement?: string;
  videoSyndicated?: string;
  videoType?: string;
}

export interface SearchResult {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchResultItem[];
}

export interface SearchResultItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Record<
      string,
      {
        url: string;
        width?: number;
        height?: number;
      }
    >;
    channelTitle: string;
    // ライブ配信の有無
    // live: 現在配信中
    // upcoming: 配信予定
    // none: ライブ配信なし
    liveBroadcastContent?: string;
  };
}

/**
 * SearchRepositoryInterfaceは、YouTube Data APIを利用して検索機能を提供するためのインターフェースです。
 * 
 * SearchRepositoryは、YouTube Data APIを通じて検索機能を提供します。
 */
export interface SearchRepositoryInterface {
  /**
   * YouTube Data APIを利用して、検索を行います。
   * 
   * @param params 検索パラメータ
   * @returns 検索結果
   */
  search(params: SearchParams): Promise<SearchResult>;
}

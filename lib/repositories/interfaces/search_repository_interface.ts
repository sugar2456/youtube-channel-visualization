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
    liveBroadcastContent?: string;
  };
}

export interface SearchRepositoryInterface {
  search(params: SearchParams): Promise<SearchResult>;
}

export interface ChannelParams {
  part: string
  forHandle?: string
  forUsername?: string
  id?: string
  managedByMe?: boolean
  mine?: boolean
  h1?: string
  maxResults?: number
  onBehalfOfContentOwner?: string
  pageToken?: string
}

export interface ChannelResult {
  kind: string
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: ChannelResultItem[]
}
export interface ChannelResultItem {
  kind: string
  etag: string
  id: {
    kind: string
    videoId?: string
    channelId?: string
    playlistId?: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: {
        url: string
        width?: number
        height?: number
      }
      medium: {
        url: string
        width?: number
        height?: number
      }
      high: {
        url: string
        width?: number
        height?: number
      }
    }
    channelTitle: string
    liveBroadcastContent?: string
    country?: string
  }
  contentDetails: {
    relatedPlaylists: {
      likes: string
      favorites: string
      uploads: string
      watchHistory: string
      watchLater: string
    }
    googlePlusUserId: string
    subscriberCount: number
    videoCount: number
    viewCount: number
    hiddenSubscriberCount: boolean
    defaultLanguage: string
    localized: {
      title: string
      description: string
    }
    customUrl: string
    publishedAt: string
    country: string
  }
}

export interface ChannelRepositoryInterface {
  getChannelInfo(params: ChannelParams): Promise<ChannelResult>
}
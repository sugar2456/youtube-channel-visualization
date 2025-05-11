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
  id: string
  snippet: {
    publishedAt: string
    title: string
    description: string
    customUrl?: string
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
  },
  statistics: {
    viewCount: string
    subscriberCount: string
    hiddenSubscriberCount: boolean
    videoCount: string
  }
}

export interface ChannelRepositoryInterface {
  getChannelInfo(params: ChannelParams): Promise<ChannelResult>
}
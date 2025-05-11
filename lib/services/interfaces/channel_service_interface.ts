export interface ChannelInfoResult {
  // チャンネルID
  channelId: string;
  // チャンネル名
  channelTitle: string;
  // カスタムURL
  customUrl: string;
  // 説明
  description: string;
  // 公開日
  publishedAt: string;
  // サムネイル情報
  thumbnails: {
    default: {
      url: string;
    };
    medium: {
      url: string;
    };
    high: {
      url: string;
    };
  };
  // 国
  country: string;
  // チャンネルの統計情報
  statistics: {
    // 登録者数
    subscriberCount: number;
    // 総再生回数
    viewCount: number;
    // 動画数
    videoCount: number;
  };
}

export interface ChannelsVideoResult {
  // 次のページがある場合はトークンが存在する
  nextPageToken?: string;
  // 検索結果のアイテム
  items: ChannelsVideoResultItem[];
}

export interface ChannelsVideoResultItem {
  // 動画ID
  videoId: string;
  // 動画名
  videoTitle: string;
  // youtube_url
  youtubeUrl: string;
  // 公開日
  publishedAt: string;
  // ライブ配信コンテンツの有無
  liveBroadcastContent?: string;
  // サムネイル情報
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
  // 視聴回数
  viewCount: number;
  // いいね数
  likeCount: number;
  // コメント数
  commentCount: number;
}
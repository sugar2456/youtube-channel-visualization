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

export interface SearchVideoResult {
  // 次のページがある場合はトークンが存在する
  nextPageToken?: string;
  // 検索結果のアイテム
  items: SearchVideoResultItem[];
}

export interface SearchVideoResultItem {
  // 動画ID
  videoId: string;
  // 動画名
  videoTitle: string;
  // チャンネルID
  channelId: string;
  // チャンネル名
  channelTitle: string;
  // 動画の説明
  description: string;
  // 公開日時
  publishedAt: string;
  // ライブ配信コンテンツの有無
  liveBroadcastContent?: string;
  // サムネイル情報
  thumbnails: {
    default: { url: string; width?: number; height?: number; };
    medium: { url: string; width?: number; height?: number; };
    high: { url: string; width?: number; height?: number; };
  };
}
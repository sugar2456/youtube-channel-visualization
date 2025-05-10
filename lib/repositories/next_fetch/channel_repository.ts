import { ChannelParams, ChannelRepositoryInterface, ChannelResult } from "../interfaces/channel_repository_interface";

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
      return data as ChannelResult;
    }
    catch (error) {
      console.error("Error fetching channel info:", error);
      throw error;
    }
  }
}
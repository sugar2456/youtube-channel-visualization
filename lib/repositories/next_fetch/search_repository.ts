import { SearchParams, SearchRepositoryInterface, SearchResult } from "../interfaces/search_repository_interface";

/**
 * nextjsのfetch関数を利用したSearchRepositoryの実装
 * サーバサイドで利用することを想定
 */
export default class SearchRepository implements SearchRepositoryInterface {
  async search(params: SearchParams): Promise<SearchResult> {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");

    // APIキーをクエリパラメータとして追加
    url.searchParams.append("key", process.env.YOUTUBE_API_KEY || "");

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching search results: ${response.statusText}`);
      }

      const data = await response.json();
      return data as SearchResult;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  }
}
import SearchService from "@/lib/services/search_service";
import { SearchRepositoryInterface, SearchResult } from "@/lib/repositories/interfaces/search_repository_interface";

describe("SearchService", () => {
  // モックリポジトリの作成
  let mockSearchRepository: jest.Mocked<SearchRepositoryInterface>;
  
  // テスト対象のサービス
  let searchService: SearchService;
  
  // テストデータ
  const mockSearchResult: SearchResult = {
    kind: "youtube#searchListResponse",
    etag: "etag",
    nextPageToken: "next-page-token",
    pageInfo: {
      totalResults: 2,
      resultsPerPage: 2,
    },
    items: [
      {
        kind: "youtube#searchResult",
        etag: "etag1",
        id: {
          kind: "youtube#channel",
          channelId: "channel-id-1",
        },
        snippet: {
          publishedAt: "2023-01-01T00:00:00Z",
          channelId: "channel-id-1",
          title: "チャンネル1",
          description: "チャンネル1の説明",
          thumbnails: {
            default: {
              url: "https://example.com/default1.jpg",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://example.com/medium1.jpg",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://example.com/high1.jpg",
              width: 800,
              height: 800,
            },
          },
          channelTitle: "チャンネル1",
          liveBroadcastContent: "none",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "etag2",
        id: {
          kind: "youtube#channel",
          channelId: "channel-id-2",
        },
        snippet: {
          publishedAt: "2023-02-01T00:00:00Z",
          channelId: "channel-id-2",
          title: "チャンネル2",
          description: "チャンネル2の説明",
          thumbnails: {
            default: {
              url: "https://example.com/default2.jpg",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://example.com/medium2.jpg",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://example.com/high2.jpg",
              width: 800,
              height: 800,
            },
          },
          channelTitle: "チャンネル2",
          liveBroadcastContent: "live",
        },
      },
    ],
  };

  // ビデオ検索のモックデータ
  const mockVideoSearchResult: SearchResult = {
    kind: "youtube#searchListResponse",
    etag: "etag-video",
    nextPageToken: "video-next-page-token",
    pageInfo: {
      totalResults: 2,
      resultsPerPage: 2,
    },
    items: [
      {
        kind: "youtube#searchResult",
        etag: "etag-video-1",
        id: {
          kind: "youtube#video",
          videoId: "video-id-1",
        },
        snippet: {
          publishedAt: "2023-03-01T00:00:00Z",
          channelId: "channel-id-1",
          title: "ビデオ1のタイトル",
          description: "ビデオ1の説明",
          thumbnails: {
            default: {
              url: "https://example.com/video-default1.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://example.com/video-medium1.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://example.com/video-high1.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "チャンネル1",
          liveBroadcastContent: "none",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "etag-video-2",
        id: {
          kind: "youtube#video",
          videoId: "video-id-2",
        },
        snippet: {
          publishedAt: "2023-04-01T00:00:00Z",
          channelId: "channel-id-2",
          title: "ビデオ2のタイトル",
          description: "ビデオ2の説明",
          thumbnails: {
            default: {
              url: "https://example.com/video-default2.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://example.com/video-medium2.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://example.com/video-high2.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "チャンネル2",
          liveBroadcastContent: "upcoming",
        },
      },
    ],
  };
  
  // テスト前の準備
  beforeEach(() => {
    // モックの初期化
    mockSearchRepository = {
      search: jest.fn(),
    };
    
    // サービスの初期化
    searchService = new SearchService(mockSearchRepository);
  });

  it("searchChannel 定義テスト", () => {
    expect(searchService.searchChannel).toBeDefined();
  });

  it("searchChannel 正常系テスト - 次ページなし", async () => {
    // 次ページなしの結果を用意
    const resultWithoutNextPage: SearchResult = {
      ...mockSearchResult,
      nextPageToken: undefined,
    };
    
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(resultWithoutNextPage);

    // テスト対象メソッドの実行
    const result = await searchService.searchChannel("テスト検索");

    // 検証
    expect(mockSearchRepository.search).toHaveBeenCalledWith({
      part: "snippet",
      q: "テスト検索",
      type: "channel",
      pageToken: undefined,
    });
    
    expect(result).toEqual({
      nextPageToken: undefined,
      items: [
        {
          channelId: "channel-id-1",
          channelTitle: "チャンネル1",
          description: "チャンネル1の説明",
          publishedAt: "2023-01-01T00:00:00Z",
          liveBroadcastContent: "none",
          thumbnails: {
            default: {
              url: "https://example.com/default1.jpg",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://example.com/medium1.jpg",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://example.com/high1.jpg",
              width: 800,
              height: 800,
            },
          },
        },
        {
          channelId: "channel-id-2",
          channelTitle: "チャンネル2",
          description: "チャンネル2の説明",
          publishedAt: "2023-02-01T00:00:00Z",
          liveBroadcastContent: "live",
          thumbnails: {
            default: {
              url: "https://example.com/default2.jpg",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://example.com/medium2.jpg",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://example.com/high2.jpg",
              width: 800,
              height: 800,
            },
          },
        },
      ],
    });
  });

  it("searchChannel 正常系テスト - 次ページあり", async () => {
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(mockSearchResult);

    // テスト対象メソッドの実行
    const result = await searchService.searchChannel("テスト検索");

    // 検証
    expect(mockSearchRepository.search).toHaveBeenCalledWith({
      part: "snippet",
      q: "テスト検索",
      type: "channel",
      pageToken: undefined,
    });
    
    expect(result).toEqual({
      nextPageToken: "next-page-token",
      items: [
        {
          channelId: "channel-id-1",
          channelTitle: "チャンネル1",
          description: "チャンネル1の説明",
          publishedAt: "2023-01-01T00:00:00Z",
          liveBroadcastContent: "none",
          thumbnails: {
            default: {
              url: "https://example.com/default1.jpg",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://example.com/medium1.jpg",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://example.com/high1.jpg",
              width: 800,
              height: 800,
            },
          },
        },
        {
          channelId: "channel-id-2",
          channelTitle: "チャンネル2",
          description: "チャンネル2の説明",
          publishedAt: "2023-02-01T00:00:00Z",
          liveBroadcastContent: "live",
          thumbnails: {
            default: {
              url: "https://example.com/default2.jpg",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://example.com/medium2.jpg",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://example.com/high2.jpg",
              width: 800,
              height: 800,
            },
          },
        },
      ],
    });
  });

  it("searchChannel ページトークン指定テスト", async () => {
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(mockSearchResult);

    // テスト対象メソッドの実行
    const result = await searchService.searchChannel("テスト検索", "test-page-token");

    // 検証
    expect(mockSearchRepository.search).toHaveBeenCalledWith({
      part: "snippet",
      q: "テスト検索",
      type: "channel",
      pageToken: "test-page-token",
    });
    
    expect(result.nextPageToken).toBe("next-page-token");
  });

  it("searchChannel エラーテスト - channelIdが存在しない", async () => {
    // channelIdが存在しないテストデータ
    const invalidData: SearchResult = {
      ...mockSearchResult,
      items: [
        {
          ...mockSearchResult.items[0],
          id: {
            kind: "youtube#channel",
            // channelIdを削除
          },
        },
      ],
    };
    
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(invalidData);

    // 例外が発生することを検証
    await expect(searchService.searchChannel("テスト検索")).rejects.toThrow(
      "channelIdが存在しません"
    );
  });

  it("searchChannel 空結果テスト", async () => {
    // 空の結果を用意
    const emptyResult: SearchResult = {
      kind: "youtube#searchListResponse",
      etag: "etag",
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0,
      },
      items: [],
    };
    
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(emptyResult);

    // テスト対象メソッドの実行
    const result = await searchService.searchChannel("存在しない検索語");

    // 検証
    expect(result.items).toEqual([]);
    expect(result.nextPageToken).toBeUndefined();
  });

  // searchVideoのテストケース
  it("searchVideo 定義テスト", () => {
    expect(searchService.searchVideo).toBeDefined();
  });

  it("searchVideo 正常系テスト - 次ページなし", async () => {
    // 次ページなしの結果を用意
    const resultWithoutNextPage: SearchResult = {
      ...mockVideoSearchResult,
      nextPageToken: undefined,
    };
    
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(resultWithoutNextPage);

    // テスト対象メソッドの実行
    const result = await searchService.searchVideo("テスト動画検索");

    // 検証
    expect(mockSearchRepository.search).toHaveBeenCalledWith({
      part: "snippet",
      q: "テスト動画検索",
      type: "video",
      pageToken: undefined,
    });
    
    expect(result).toEqual({
      nextPageToken: undefined,
      items: [
        {
          videoId: "video-id-1",
          videoTitle: "ビデオ1のタイトル",
          channelId: "channel-id-1",
          channelTitle: "チャンネル1",
          description: "ビデオ1の説明",
          publishedAt: "2023-03-01T00:00:00Z",
          liveBroadcastContent: "none",
          thumbnails: {
            default: {
              url: "https://example.com/video-default1.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://example.com/video-medium1.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://example.com/video-high1.jpg",
              width: 480,
              height: 360,
            },
          },
        },
        {
          videoId: "video-id-2",
          videoTitle: "ビデオ2のタイトル",
          channelId: "channel-id-2",
          channelTitle: "チャンネル2",
          description: "ビデオ2の説明",
          publishedAt: "2023-04-01T00:00:00Z",
          liveBroadcastContent: "upcoming",
          thumbnails: {
            default: {
              url: "https://example.com/video-default2.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://example.com/video-medium2.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://example.com/video-high2.jpg",
              width: 480,
              height: 360,
            },
          },
        },
      ],
    });
  });

  it("searchVideo 正常系テスト - 次ページあり", async () => {
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(mockVideoSearchResult);

    // テスト対象メソッドの実行
    const result = await searchService.searchVideo("テスト動画検索");

    // 検証
    expect(mockSearchRepository.search).toHaveBeenCalledWith({
      part: "snippet",
      q: "テスト動画検索",
      type: "video",
      pageToken: undefined,
    });
    
    expect(result).toEqual({
      nextPageToken: "video-next-page-token",
      items: [
        {
          videoId: "video-id-1",
          videoTitle: "ビデオ1のタイトル",
          channelId: "channel-id-1",
          channelTitle: "チャンネル1",
          description: "ビデオ1の説明",
          publishedAt: "2023-03-01T00:00:00Z",
          liveBroadcastContent: "none",
          thumbnails: {
            default: {
              url: "https://example.com/video-default1.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://example.com/video-medium1.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://example.com/video-high1.jpg",
              width: 480,
              height: 360,
            },
          },
        },
        {
          videoId: "video-id-2",
          videoTitle: "ビデオ2のタイトル",
          channelId: "channel-id-2",
          channelTitle: "チャンネル2",
          description: "ビデオ2の説明",
          publishedAt: "2023-04-01T00:00:00Z",
          liveBroadcastContent: "upcoming",
          thumbnails: {
            default: {
              url: "https://example.com/video-default2.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://example.com/video-medium2.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://example.com/video-high2.jpg",
              width: 480,
              height: 360,
            },
          },
        },
      ],
    });
  });

  it("searchVideo ページトークン指定テスト", async () => {
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(mockVideoSearchResult);

    // テスト対象メソッドの実行
    const result = await searchService.searchVideo("テスト動画検索", "video-page-token");

    // 検証
    expect(mockSearchRepository.search).toHaveBeenCalledWith({
      part: "snippet",
      q: "テスト動画検索",
      type: "video",
      pageToken: "video-page-token",
    });
    
    expect(result.nextPageToken).toBe("video-next-page-token");
  });

  it("searchVideo エラーテスト - videoIdが存在しない", async () => {
    // videoIdが存在しないテストデータ
    const invalidData: SearchResult = {
      ...mockVideoSearchResult,
      items: [
        {
          ...mockVideoSearchResult.items[0],
          id: {
            kind: "youtube#video",
            // videoIdを削除
          },
          snippet: {
            ...mockVideoSearchResult.items[0].snippet,
            title: "", // titleも空に
          }
        },
      ],
    };
    
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(invalidData);

    // 例外が発生することを検証
    await expect(searchService.searchVideo("テスト動画検索")).rejects.toThrow(
      "videoIdが存在しません"
    );
  });

  it("searchVideo 空結果テスト", async () => {
    // 空の結果を用意
    const emptyResult: SearchResult = {
      kind: "youtube#searchListResponse",
      etag: "etag",
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0,
      },
      items: [],
    };
    
    // モックの設定
    mockSearchRepository.search.mockResolvedValue(emptyResult);

    // テスト対象メソッドの実行
    const result = await searchService.searchVideo("存在しない動画検索語");

    // 検証
    expect(result.items).toEqual([]);
    expect(result.nextPageToken).toBeUndefined();
  });
});
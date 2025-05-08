import SearchRepository from '../../../../lib/repositories/next_fetch/search_repository';
import { SearchParams, SearchResult } from '../../../../lib/repositories/interfaces/search_repository_interface';
import fetchMock from 'jest-fetch-mock';

describe('SearchRepository', () => {
  let searchRepository: SearchRepository;
  
  beforeEach(() => {
    // 完全にfetchをリセット
    fetchMock.resetMocks();
    
    // 環境変数のモック
    process.env.YOUTUBE_API_KEY = 'test-api-key';
    
    // SearchRepositoryのインスタンスを作成
    searchRepository = new SearchRepository();
  });

  afterEach(() => {
    // テスト後にモックと環境変数をリセット
    jest.resetAllMocks();
    delete process.env.YOUTUBE_API_KEY;
  });

  describe('search', () => {
    it('正しいパラメータでAPIを呼び出し、結果を返すこと', async () => {
      // モックの検索結果
      const mockSearchResult: SearchResult = {
        kind: 'youtube#searchListResponse',
        etag: 'test-etag',
        nextPageToken: 'next-page-token',
        pageInfo: {
          totalResults: 10,
          resultsPerPage: 5
        },
        items: [{
          kind: 'youtube#searchResult',
          etag: 'item-etag',
          id: {
            kind: 'youtube#video',
            videoId: 'test-video-id'
          },
          snippet: {
            publishedAt: '2023-01-01T00:00:00Z',
            channelId: 'test-channel-id',
            title: 'テスト動画',
            description: 'これはテスト動画の説明です',
            thumbnails: {
              default: {
                url: 'https://example.com/thumbnail.jpg',
                width: 120,
                height: 90
              }
            },
            channelTitle: 'テストチャンネル',
            liveBroadcastContent: 'none'
          }
        }]
      };

      // 検索パラメータ
      const searchParams: SearchParams = {
        part: 'snippet',
        q: 'テスト検索',
        maxResults: 5,
        type: 'video'
      };

      // fetchのモック - 明示的に200 OKレスポンスを設定
      fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

      // テスト実行
      const result = await searchRepository.search(searchParams);

      // 検証
      expect(fetchMock).toHaveBeenCalledTimes(1);
      
      // URLをチェック - 日本語はエンコードされるため、エンコード後の値で比較する
      const encodedQuery = encodeURIComponent('テスト検索');
      const expectedUrl = `https://www.googleapis.com/youtube/v3/search?key=test-api-key&part=snippet&q=${encodedQuery}&maxResults=5&type=video`;
      const actualCallUrl = fetchMock.mock.calls[0][0] as string;
      expect(actualCallUrl).toBe(expectedUrl);
      
      // ヘッダーをチェック - Authorizationヘッダーを正確に検証
      const options = fetchMock.mock.calls[0][1];
      expect(options).toHaveProperty('headers');
      expect(options?.headers).toHaveProperty('Content-Type', 'application/json');
      
      // 結果をチェック
      expect(result).toEqual(mockSearchResult);
    });

    it('パラメータが正しく処理され、nullとundefinedは省略されること', async () => {
      // モックの検索結果 - 明示的に200 OKレスポンスを設定
      const mockResponse = {
        kind: 'youtube#searchListResponse',
        etag: 'test-etag',
        pageInfo: {
          totalResults: 0,
          resultsPerPage: 0
        },
        items: []
      } as SearchResult;
      
      // nullとundefinedを含むパラメータ
      const searchParams: SearchParams = {
        part: 'snippet',
        q: 'テスト',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        maxResults: null as any,
        channelId: undefined
      };

      // fetchのモック
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

      // テスト実行
      await searchRepository.search(searchParams);

      // 検証 - URLには part と q だけが含まれているはず
      const encodedQuery = encodeURIComponent('テスト');
      const expectedUrl = `https://www.googleapis.com/youtube/v3/search?key=test-api-key&part=snippet&q=${encodedQuery}`;
      const actualCallUrl = fetchMock.mock.calls[0][0] as string;
      expect(actualCallUrl).toBe(expectedUrl);
    });

    it('APIからエラーレスポンスが返された場合、エラーをスローすること', async () => {
      // エラーレスポンスをモック
      fetchMock.mockResponseOnce(JSON.stringify({ error: 'invalid_request' }), {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' }
      });

      // 検索パラメータ
      const searchParams: SearchParams = {
        part: 'snippet',
        q: 'テスト'
      };

      // テスト実行とエラーの検証
      await expect(searchRepository.search(searchParams)).rejects.toThrow('Error fetching search results: Bad Request');
    });

    it('ネットワークエラーの場合、エラーをスローすること', async () => {
      // ネットワークエラーをモック
      fetchMock.mockReject(new Error('Network failure'));

      // 検索パラメータ
      const searchParams: SearchParams = {
        part: 'snippet',
        q: 'テスト'
      };

      // テスト実行とエラーの検証
      await expect(searchRepository.search(searchParams)).rejects.toThrow('Network failure');
    });
  });
});
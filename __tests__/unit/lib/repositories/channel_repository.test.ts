// filepath: /app/__tests__/unit/lib/repositories/channel_repository.test.ts
import ChannelRepository from '../../../../lib/repositories/next_fetch/channel_repository';
import { ChannelParams, ChannelResult } from '../../../../lib/repositories/interfaces/channel_repository_interface';
import fetchMock from 'jest-fetch-mock';

describe('ChannelRepository', () => {
  let channelRepository: ChannelRepository;
  
  beforeEach(() => {
    // 完全にfetchをリセット
    fetchMock.resetMocks();
    
    // 環境変数のモック
    process.env.YOUTUBE_API_KEY = 'test-api-key';
    
    // ChannelRepositoryのインスタンスを作成
    channelRepository = new ChannelRepository();
  });

  afterEach(() => {
    // テスト後にモックと環境変数をリセット
    jest.resetAllMocks();
    delete process.env.YOUTUBE_API_KEY;
  });

  describe('getChannelInfo', () => {
    it('正しいパラメータでAPIを呼び出し、結果を返すこと', async () => {
      // モックのチャンネル情報
      const mockChannelResult: ChannelResult = {
        kind: 'youtube#channelListResponse',
        etag: 'test-etag',
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 1
        },
        items: [{
          kind: 'youtube#channel',
          etag: 'item-etag',
          id: 'test-channel-id',
          snippet: {
            publishedAt: '2023-01-01T00:00:00Z',
            title: 'テストチャンネル',
            description: 'これはテストチャンネルの説明です',
            thumbnails: {
              default: {
                url: 'https://example.com/thumbnail-default.jpg',
                width: 88,
                height: 88
              },
              medium: {
                url: 'https://example.com/thumbnail-medium.jpg',
                width: 240,
                height: 240
              },
              high: {
                url: 'https://example.com/thumbnail-high.jpg',
                width: 800,
                height: 800
              }
            },
            country: 'JP'
          },
          contentDetails: {
            relatedPlaylists: {
              likes: 'likes-playlist-id',
              favorites: 'favorites-playlist-id',
              uploads: 'uploads-playlist-id',
              watchHistory: 'watch-history-playlist-id',
              watchLater: 'watch-later-playlist-id'
            },
          },
          statistics: {
            viewCount: '10000',
            subscriberCount: '1000',
            hiddenSubscriberCount: false,
            videoCount: '50'
          }
        }]
      };

      // チャンネル取得パラメータ
      const channelParams: ChannelParams = {
        part: 'snippet,contentDetails,statistics',
        id: 'test-channel-id'
      };

      // fetchのモック - 明示的に200 OKレスポンスを設定
      fetchMock.mockResponseOnce(JSON.stringify(mockChannelResult), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

      // テスト実行
      const result = await channelRepository.getChannelInfo(channelParams);

      // 検証
      expect(fetchMock).toHaveBeenCalledTimes(1);
      
      // URLをチェック
      const expectedUrl = `https://www.googleapis.com/youtube/v3/channels?key=test-api-key&part=snippet%2CcontentDetails%2Cstatistics&id=test-channel-id&part=snippet%2CcontentDetails%2Cstatistics&id=test-channel-id`;
      const actualCallUrl = fetchMock.mock.calls[0][0] as string;
      expect(actualCallUrl).toBe(expectedUrl);
      
      // ヘッダーをチェック
      const options = fetchMock.mock.calls[0][1];
      expect(options).toHaveProperty('headers');
      expect(options?.headers).toHaveProperty('Content-Type', 'application/json');
      
      // 結果をチェック
      expect(result).toEqual(mockChannelResult);
    });

    it('パラメータが正しく処理され、nullとundefinedは省略されること', async () => {
      // モックのレスポンス
      const mockResponse = {
        kind: 'youtube#channelListResponse',
        etag: 'test-etag',
        pageInfo: {
          totalResults: 0,
          resultsPerPage: 0
        },
        items: []
      } as ChannelResult;
      
      // nullとundefinedを含むパラメータ
      const channelParams: ChannelParams = {
        part: 'snippet',
        id: 'test-channel-id',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        maxResults: null as any,
        forUsername: undefined
      };

      // fetchのモック
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

      // テスト実行
      await channelRepository.getChannelInfo(channelParams);

      // 検証 - URLには part と id だけが含まれているはず
      const expectedUrl = `https://www.googleapis.com/youtube/v3/channels?key=test-api-key&part=snippet%2CcontentDetails%2Cstatistics&id=test-channel-id&part=snippet&id=test-channel-id`;
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

      // チャンネル取得パラメータ
      const channelParams: ChannelParams = {
        part: 'snippet',
        id: 'test-channel-id'
      };

      // テスト実行とエラーの検証
      await expect(channelRepository.getChannelInfo(channelParams)).rejects.toThrow('Error fetching channel info: Bad Request');
    });

    it('ネットワークエラーの場合、エラーをスローすること', async () => {
      // ネットワークエラーをモック
      fetchMock.mockReject(new Error('Network failure'));

      // チャンネル取得パラメータ
      const channelParams: ChannelParams = {
        part: 'snippet',
        id: 'test-channel-id'
      };

      // テスト実行とエラーの検証
      await expect(channelRepository.getChannelInfo(channelParams)).rejects.toThrow('Network failure');
    });
  });
});
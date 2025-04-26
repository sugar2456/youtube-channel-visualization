// jest.setup.js - すべてのテスト前に一度実行されるセットアップファイル
import 'whatwg-fetch'; // fetch polyfill
import fetchMock from 'jest-fetch-mock';

// fetchのグローバルモックを有効化
fetchMock.enableMocks();

// Jest拡張マッチャーの設定（必要に応じて）
// expect.extend({ ... });

// テスト用のカスタムグローバル関数
global.mockFetch = (url, responseData, status = 200) => {
  return fetchMock.mockResponseOnce(JSON.stringify(responseData), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};

// コンソール警告を抑制（必要に応じて）
// console.warn = jest.fn();
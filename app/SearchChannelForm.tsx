"use client";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import ResultCard from "./components/ResultCard";
import Loading from "./loading";
import { searchChannelAction } from "./actions/search_action";
import { SearchChannelResultItem } from "@/lib/services/interfaces/search_channel_interface";

/**
 * チャンネル検索と検索結果を表示するコンポーネント
 * @returns {JSX.Element}
 */
export default function SearchChannelForm() {
  // 検索ワード
  const [searchValue, setSearchValue] = useState("");
  // 検索結果
  const [searchResults, setSearchResults] = useState<SearchChannelResultItem[]>([]);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);
  // 次のページトークン
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsLoading(true);
    
    try {
      // サーバーアクションを呼び出して検索を実行
      const result = await searchChannelAction(searchValue);
      
      // 検索結果とページトークンを保存
      setSearchResults(result.items);
      setNextPageToken(result.nextPageToken);
    } catch (error) {
      console.error("検索中にエラーが発生しました:", error);
      // エラー処理を追加することができます
    } finally {
      setIsLoading(false);
    }
  };

  // 次のページを読み込む関数
  const loadMoreResults = async () => {
    if (!nextPageToken || !searchValue) return;
    
    setIsLoading(true);
    
    try {
      // 次のページトークンを使って検索を実行
      const result = await searchChannelAction(searchValue, nextPageToken);
      
      // 新しい検索結果を追加
      setSearchResults([...searchResults, ...result.items]);
      // 次のページトークンを更新
      setNextPageToken(result.nextPageToken);
    } catch (error) {
      console.error("追加データの読み込み中にエラーが発生しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">チャンネル検索</h1>
      
      <SearchInput
        placeholder="チャンネルを検索"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSubmit={handleSearch}
      />
      
      {/* 検索中のローディング表示 */}
      {isLoading && (
        <Loading />
      )}
      
      {/* 検索結果表示エリア */}
      {!isLoading && searchResults.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">検索結果</h2>
          {searchResults.map((result, index) => (
            <ResultCard
              key={`${result.channelId}-${index}`}
              title={result.channelTitle}
              description={result.description}
              imageUrl={result.thumbnails.medium?.url || result.thumbnails.default?.url}
              onClick={() => console.log("選択されたチャンネル:", result)}
              additionalInfo={
                <div className="flex items-center text-xs text-gray-500">
                  <span>公開日: {new Date(result.publishedAt).toLocaleDateString('ja-JP')}</span>
                </div>
              }
            />
          ))}
          
          {/* 次のページがある場合、「もっと読み込む」ボタンを表示 */}
          {nextPageToken && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreResults}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                disabled={isLoading}
              >
                もっと読み込む
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* 検索結果がない場合のメッセージ */}
      {!isLoading && searchValue && searchResults.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          検索結果がありません
        </div>
      )}
    </div>
  );
}

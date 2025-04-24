"use client";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import ResultCard from "./components/ResultCard";

/**
 * チャンネル検索と検索結果を表示するコンポーネント
 * @returns {JSX.Element}
 */
export default function SearchChannelForm() {
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([]); // 本来は適切な型定義が必要です
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsLoading(true);
    
    // 仮の検索結果データ（実際の実装では API 呼び出しなどを行います）
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: `チャンネル: ${searchValue}`, description: "チャンネルの説明文がここに表示されます。" },
        { id: 2, title: `関連チャンネル 1`, description: "関連チャンネルの説明文です。" },
        { id: 3, title: `関連チャンネル 2`, description: "もう一つの関連チャンネルの説明です。" },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
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
        <div className="flex justify-center my-8">
          <div data-testid="loading-spinner" className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* 検索結果表示エリア */}
      {!isLoading && searchResults.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">検索結果</h2>
          {searchResults.map((result) => (
            <ResultCard
              key={result.id}
              title={result.title}
              description={result.description}
              onClick={() => console.log("選択されたチャンネル:", result)}
            />
          ))}
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

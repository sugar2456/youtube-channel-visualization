"use client";
import SearchInput from "./components/SearchInput";

/**
 * 動画検索フォームと検索結果を表示するコンポーネント
 * 
 * @returns {JSX.Element}
 */
export default function SearchVideoForm() {
  return (
    <>
      <SearchInput
        placeholder="動画を検索"
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </>
  );
}

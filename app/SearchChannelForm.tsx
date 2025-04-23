"use client";
import SearchInput from "./components/SearchInput";

/**
 * チャンネル検索と検索結果を表示するコンポーネント
 * @returns {JSX.Element}
 */
export default function SearchChannelForm() {
  return (
    <>
      <SearchInput
        placeholder="チャンネルを検索"
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </>
  );
}

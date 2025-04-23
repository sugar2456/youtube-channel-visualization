import { ChangeEvent, FormEvent } from 'react';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * 検索入力コンポーネント
 * 
 * チャンネル検索と動画検索で共通使用する検索フォーム
 */
export default function SearchInput({ placeholder, value, onChange, onSubmit }: SearchInputProps) {
  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={onSubmit} className="w-full max-w-xl">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition"
          >
            検索
          </button>
        </div>
      </form>
    </div>
  );
}
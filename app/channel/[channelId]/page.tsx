import { Suspense } from "react";
import WrapperSummaryComponent from "./wrapper_summary_component";

// Next.js 14以降では組み込みの型を使用
type Props = {
  params: Promise<{ channelId: string }>;
}

// ローディング表示用のコンポーネント
function LoadingFallback() {
  return (
    <div className="flex flex-col w-full gap-4 p-6 animate-pulse">
      <h1 className="text-2xl font-bold">チャンネル詳細を読み込み中...</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-6 mb-4">
          <div className="bg-gray-300 w-[88px] h-[88px] rounded-lg"></div>
          <div className="flex flex-col justify-center">
            <div className="bg-gray-300 h-8 w-64 mb-2 rounded"></div>
            <div className="bg-gray-300 h-6 w-48 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-300 h-36 w-full mb-4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/2 mb-2 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/3 mb-2 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
      </div>
    </div>
  );
}

export default async function Page({ params }: Props) {
  const { channelId } = await params;
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WrapperSummaryComponent channelId={channelId} />
    </Suspense>
  );
}

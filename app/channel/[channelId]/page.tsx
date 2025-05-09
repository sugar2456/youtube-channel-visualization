// App Routerでは、パラメータはpropsとして受け取ります
interface PageProps {
  params: Promise<{
    channelId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { channelId } = await params;
  
  return (
    <div className="flex flex-col w-full gap-4 p-6">
      <h1 className="text-2xl font-bold">チャンネル詳細</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg font-medium mb-2">チャンネルID: {channelId}</p>
        <p className="text-gray-600">詳細情報をこちらに表示します。</p>
        {/* ここにチャンネルの詳細情報を表示するコンポーネントを追加 */}
      </div>
    </div>
  );
}

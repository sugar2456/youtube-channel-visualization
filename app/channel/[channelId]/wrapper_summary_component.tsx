import { convertNewLineToBr } from "@/lib/utils/string_utils";
import { SummaryComponent } from "./summary_component";
import { getChannelInfoAction } from "@/app/actions/channel_action";

// データ取得を行うコンポーネントを分離
export default async function WrapperSummaryComponent({ channelId }: { channelId: string }) {
  // データ取得
  const data = await getChannelInfoAction(channelId);
  if (!data) {
    return <div>チャンネル情報が見つかりませんでした</div>;
  }
  return (
    <SummaryComponent
      channelId={data.channelId}
      title={data.channelTitle}
      description={convertNewLineToBr(data.description)}
      customUrl={data.customUrl}
      publishedAt={new Date(data.publishedAt).toLocaleDateString("ja-JP")}
      thumbnails={data.thumbnails}
      country={data.country}
    />
  );
}

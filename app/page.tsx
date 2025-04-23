import SearchChannelForm from "./SearchChannelForm";
import SearchVideoForm from "./SearchVideoForm";

/**
 * ホーム画面
 *
 * チャンネル検索
 * 動画検索
 *
 * @returns {JSX.Element}
 */
export default function Page() {
  return (
    <div className="flex md:flex-row flex-col w-full gap-2">
      <div className="flex-1">
        <SearchChannelForm />
      </div>
      <div className="flex-1">
        <SearchVideoForm />
      </div>
    </div>
  );
}

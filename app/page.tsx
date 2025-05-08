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
      <div className="w-full md:w-1/2">
        <SearchChannelForm />
      </div>
      <div className="w-full md:w-1/2">
        <SearchVideoForm />
      </div>
    </div>
  );
}

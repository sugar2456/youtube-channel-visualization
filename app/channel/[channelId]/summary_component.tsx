import Image from 'next/image';
import { convertNewLineToBr } from '../../../lib/utils/string_utils';

export interface ChannelSummaryProps {
  channelId: string;
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  country: string;
}

export function SummaryComponent({ channelId, title, description, customUrl, publishedAt, thumbnails, country }: ChannelSummaryProps) {
  return (
    <div className="flex flex-col w-full gap-4 p-6">
      <h1 className="text-2xl font-bold">チャンネル詳細</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-6 mb-4">
          <Image
            src={thumbnails.default.url}
            alt="Channel Thumbnail"
            width={88}
            height={88}
            className="rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <p className="text-3xl">チャンネル名: {title}</p>
            <p className="text-lg">チャンネルID: {channelId ?? "----"}</p>
          </div>
        </div>
        <div className="text-gray-600 border-2 rounded-2xl p-2">説明: <span dangerouslySetInnerHTML={{ __html: convertNewLineToBr(description) }} /></div>
        <p className="text-gray-600">カスタムURL: {customUrl ?? "----"}</p>
        <p className="text-gray-600">公開日: {new Date(publishedAt).toLocaleDateString('ja-JP')}</p>
        <p className="text-gray-600">国: {country}</p>
        </div>
    </div>
  );
}
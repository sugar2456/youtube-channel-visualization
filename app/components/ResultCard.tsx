import Image from 'next/image';

interface ResultCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
  additionalInfo?: React.ReactNode;
}

/**
 * 検索結果カードコンポーネント
 * 
 * チャンネルや動画の検索結果を表示するためのカード
 */
export default function ResultCard({ 
  title, 
  description, 
  imageUrl, 
  onClick,
  additionalInfo 
}: ResultCardProps) {
  return (
    <div 
      className="flex border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 mr-4">
        <Image
          src={imageUrl}
          alt={title}
          width={120}
          height={90}
          className="rounded object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        {additionalInfo && (
          <div className="mt-2 text-xs text-gray-500">
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
}
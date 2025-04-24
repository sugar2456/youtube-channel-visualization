import Image from 'next/image';

interface ResultCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClick?: () => void;
  additionalInfo?: React.ReactNode;
}

/**
 * 検索結果カードコンポーネント
 * 
 * チャンネルや動画の検索結果を表示するためのカード  
 * タイトル、説明、画像を表示し、クリックでイベントを発火する
 */
export default function ResultCard({ 
  title, 
  description, 
  imageUrl = '/vercel.svg', // デフォルト画像を設定
  onClick,
  additionalInfo 
}: ResultCardProps) {
  return (
    <div 
      className="flex rounded-lg p-4 mb-4 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.15)] transition-shadow duration-300 ease-in-out cursor-pointer transform hover:translate-y-[-2px]"
      onClick={onClick}
    >
      <div className="shrink-0 mr-4">
        <div className="rounded overflow-hidden" style={{ width: '120px', height: '90px' }}>
          <Image
            src={imageUrl}
            alt={title}
            width={120}
            height={90}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{description}</p>
        {additionalInfo && (
          <div className="mt-2 text-xs text-gray-500">
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
}
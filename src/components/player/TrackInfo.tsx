import { Volume2 } from 'lucide-react';

interface TrackInfoProps {
  title: string;
  artist: string;
  className?: string;
}

const TrackInfo = ({ title, artist, className = '' }: TrackInfoProps) => {
  return (
    <div className={`flex items-center space-x-4 flex-1 min-w-0 ${className}`}>
      <div className="w-12 h-12 border border-gray-300 bg-gray-100 rounded flex items-center justify-center">
        <Volume2 size={24} className="text-gray-500" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-black font-medium truncate">{title}</h3>
        <div className="text-sm text-gray-900">{artist}</div>
      </div>
    </div>
  );
};

export default TrackInfo;

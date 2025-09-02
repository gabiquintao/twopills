import { useState, useEffect } from 'react';

interface TrackInfoProps {
  title: string;
  img: string;
  artist: string;
  className?: string;
}

const TrackInfo = ({ title, img, artist, className = '' }: TrackInfoProps) => {
  const [imageError, setImageError] = useState(false);

  // reset imageError whenever img prop changes
  useEffect(() => {
    if (img) {
      setImageError(false);
    }
  }, [img]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`flex items-center space-x-4 flex-1 min-w-0 ${className}`}>
      <div className="w-12 h-12 border border-gray-300 bg-gray-100 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
        {img && !imageError ? (
          <img
            src={img}
            alt={`${title} cover`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-sm font-bold">
              {title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-black font-medium truncate">{title}</h3>
        <div className="text-sm text-gray-900">{artist}</div>
      </div>
    </div>
  );
};

export default TrackInfo;

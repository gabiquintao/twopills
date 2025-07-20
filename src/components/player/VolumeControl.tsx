import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { VolumeControlProps } from '@/types/audio';
import { AUDIO_CONFIG } from '@/utils/constants';

const VolumeControl = ({
  currentVolume,
  onVolumeChange,
  className = '',
}: VolumeControlProps) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeSlider(true);
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, AUDIO_CONFIG.VOLUME_HIDE_DELAY);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`flex items-center space-x-2 relative ${className}`}
      onMouseEnter={handleVolumeMouseEnter}
      onMouseLeave={handleVolumeMouseLeave}
    >
      <button className="text-gray-700 hover:text-yellow-600 transition-colors p-1">
        {currentVolume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div
        className={`absolute bottom-full right-0 transition-all duration-300 ${
          showVolumeSlider
            ? 'opacity-100 mb-3 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {showVolumeSlider && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex flex-col items-center">
            <div className="relative w-4 h-20 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute bottom-0 w-full bg-yellow-600 rounded-full transition-all duration-100"
                style={{ height: `${currentVolume * 100}%` }}
              />

              <input
                onChange={handleVolumeChange}
                type="range"
                min="0"
                max="1"
                step={AUDIO_CONFIG.VOLUME_STEP.toString()}
                value={currentVolume}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{
                  writingMode: 'vertical-lr',
                  direction: 'ltr',
                  transform: 'rotate(180deg)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeControl;

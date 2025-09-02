import type { SeekBarProps } from '@/types/audio';
import { formatTime } from '@/utils/audio';
import { AUDIO_CONFIG } from '@/utils/constants';

const SeekBar = ({
  currentSeek,
  duration,
  localSeekValue,
  onSeekChange,
  onSeekStart,
  onSeekEnd,
  className = '',
}: SeekBarProps) => {
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = parseFloat(e.target.value);
    onSeekChange(percentage);
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <span className="text-gray-700 text-sm font-mono min-w-[40px]">
        {formatTime(currentSeek)}
      </span>

      <div className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer relative group">
        <div
          className="h-full bg-yellow-600 rounded-full relative transition-none"
          style={{
            width: `${localSeekValue}%`,
          }}
        >
          <div
            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ willChange: 'opacity' }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step={AUDIO_CONFIG.SEEK_STEP.toString()}
          value={localSeekValue}
          onChange={handleSeekChange}
          onMouseDown={onSeekStart}
          onMouseUp={onSeekEnd}
          onTouchStart={onSeekStart}
          onTouchEnd={onSeekEnd}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{
            background: 'transparent',
          }}
        />
      </div>

      <span className="text-gray-700 text-sm font-mono min-w-[40px]">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default SeekBar;

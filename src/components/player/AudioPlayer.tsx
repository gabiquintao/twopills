import { useSongStore } from '@/stores/useSongStore';
import { useSeekBar } from '@/hooks/useSeekBar';
import { DEMO_TRACK } from '@/utils/constants';
import type { AudioPlayerProps } from '@/types/audio';

import SeekBar from './SeekBar';
import TrackInfo from './TrackInfo';
import PlayButton from './PlayButton';
import VolumeControl from './VolumeControl';

const AudioPlayer = ({ className = '' }: AudioPlayerProps) => {
  const {
    seek,
    play,
    pause,
    volume,
    currentVolume,
    currentSeek,
    duration,
    isPlaying,
    setDragging,
  } = useSongStore();

  const { localSeekValue, handleSeekChange, handleSeekStart, handleSeekEnd } =
    useSeekBar({
      currentSeek,
      duration,
      onSeek: seek,
      onDraggingChange: setDragging,
    });

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t border-gray-200 shadow-sm bg-white z-50 ${className}`}
    >
      <div className="px-8 py-4">
        <SeekBar
          currentSeek={currentSeek}
          duration={duration}
          localSeekValue={localSeekValue}
          onSeekChange={handleSeekChange}
          onSeekStart={handleSeekStart}
          onSeekEnd={handleSeekEnd}
          className="mb-4"
        />

        <div className="flex items-center justify-between">
          <TrackInfo title={DEMO_TRACK.title} artist={DEMO_TRACK.artist} />

          <div className="flex items-center space-x-4">
            <PlayButton isPlaying={isPlaying} onTogglePlay={togglePlay} />
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <VolumeControl
              currentVolume={currentVolume}
              onVolumeChange={volume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

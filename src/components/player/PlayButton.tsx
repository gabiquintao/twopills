import { Play, Pause } from 'lucide-react';

interface PlayButtonProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  className?: string;
}

const PlayButton = ({
  isPlaying,
  onTogglePlay,
  className = '',
}: PlayButtonProps) => {
  return (
    <button
      onClick={onTogglePlay}
      className={`border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white p-2 transition-all duration-300 rounded ${className}`}
    >
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
  );
};

export default PlayButton;

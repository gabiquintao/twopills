import { Repeat } from 'lucide-react';

interface LoopButtonProps {
  onToogleLoop: () => void;
  isLooping: boolean;
  className?: string;
}

const LoopButton = ({
  onToogleLoop,
  isLooping,
  className = '',
}: LoopButtonProps) => {
  return (
    <button
      onClick={onToogleLoop}
      className={`border p-2 transition-all duration-300 rounded ${
        isLooping
          ? 'bg-yellow-600 text-white border-yellow-600'
          : 'text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white'
      } ${className}`}
    >
      <Repeat size={20} />
    </button>
  );
};

export default LoopButton;

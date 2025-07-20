import { Howl } from 'howler';

export interface SongStore {
  sound: Howl | null;
  seek: (newSeek: number) => void;
  currentSeek: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  rate: (newRate: number) => void;
  currentRate: number;
  volume: (newVolume: number) => void;
  currentVolume: number;
  isPlaying: boolean;
  duration: number;
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
}

export interface AudioPlayerProps {
  className?: string;
}

export interface VolumeControlProps {
  currentVolume: number;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

export interface SeekBarProps {
  currentSeek: number;
  duration: number;
  localSeekValue: number;
  onSeekChange: (percentage: number) => void;
  onSeekStart: () => void;
  onSeekEnd: () => void;
  className?: string;
}

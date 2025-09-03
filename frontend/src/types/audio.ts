import { Howl } from 'howler';
import type { Track } from 'shared/types/audio';

export interface SongStore {
  sound: Howl | null;
  currentTrack: Track | null;
  seek: (newSeek: number) => void;
  currentSeek: number;
  play: (track?: Track) => void;
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
  isLoading?: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
  error?: string | null;
}

export interface AudioPlayerProps {
  track?: Track;
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

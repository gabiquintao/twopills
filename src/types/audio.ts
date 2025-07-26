import { Howl } from 'howler';

export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  img: string | null;
}

export interface Album {
  id: string;
  name: string;
  img: string | null;
  releaseDate: Date;
  artist: Artist;
}

export interface Track {
  id: string;
  name: string;
  artist: Artist;
  releaseDate: Date;
  album: Album | null;
  img: string | null;
  src: string;
  duration?: number;
}

export interface Playlist {
  id: string;
  tracks: Track[];
  img: string | null;
  name: string;
  creationDate: Date;
}

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
  isLoading?: boolean; // Added loading state
  error?: string | null; // Added error state
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

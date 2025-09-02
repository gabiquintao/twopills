import type { NavigationLink } from '@/types/navigation';

export const NAVIGATION_LINKS: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/artists', label: 'Artists' },
  { href: '/tracks', label: 'Tracks' },
  { href: '/playlists', label: 'Playlists' },
];

export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 0.5,
  DEFAULT_RATE: 1,
  SEEK_STEP: 0.01,
  VOLUME_STEP: 0.01,
  VOLUME_HIDE_DELAY: 100,
} as const;

export const DEMO_TRACK = {
  src: '/Snakes.mp3',
  title: 'Song',
  artist: 'Artist',
} as const;

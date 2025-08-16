import type { Artist, Album, Track, Playlist } from '@/types/audio';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Souleance',
    img: null,
    bio: 'French',
  },
  {
    id: '2',
    name: 'Central Cee',
    img: null,
    bio: 'British',
  },
  {
    id: '3',
    name: 'Joey Bada$$',
    img: null,
    bio: 'North American',
  },
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    name: 'La Boulangerie, Vol. 3 (La Fine Équipe & Friends)',
    releaseDate: new Date('2014-01-01'),
    img: '/Jazz et Thé Vert.jpg',
    artist: mockArtists[0],
  },
  {
    id: '2',
    name: "CAN'T RUSH GREATNESS",
    releaseDate: new Date('2025-01-01'),
    img: "/CAN'T RUSH GREATNESS.jpg",
    artist: mockArtists[1],
  },
  {
    id: '3',
    name: '1999',
    releaseDate: new Date('2019-01-01'),
    img: '/Snakes.jpg',
    artist: mockArtists[2],
  },
];

export const mockTracks: Track[] = [
  {
    id: '1',
    name: 'Jazz et Thé Vert',
    artist: mockArtists[0],
    album: mockAlbums[0],
    img: '/Jazz et Thé Vert.jpg',
    src: '/Jazz et Thé Vert.mp3',
    releaseDate: new Date('2014-01-01'),
    duration: 234,
  },
  {
    id: '2',
    name: 'Limitless',
    artist: mockArtists[1],
    album: mockAlbums[1],
    img: "/CAN'T RUSH GREATNESS.jpg",
    src: '/Limitless.mp3',
    releaseDate: new Date('2025-01-01'),
    duration: 187,
  },
  {
    id: '3',
    name: 'Snakes',
    artist: mockArtists[2],
    album: mockAlbums[2],
    img: '/Snakes.jpg',
    src: '/Snakes.mp3',
    releaseDate: new Date('2019-01-01'),
    duration: 198,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    tracks: [mockTracks[0], mockTracks[1], mockTracks[2]],
    img: null,
    name: 'p1',
    creationDate: new Date('2025-08-01'),
  },
  {
    id: '2',
    tracks: [mockTracks[0], mockTracks[1]],
    img: null,
    name: 'p2',
    creationDate: new Date('2025-09-01'),
  },
];

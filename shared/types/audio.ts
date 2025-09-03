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

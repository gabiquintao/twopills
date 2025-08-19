import { useParams, Link } from 'react-router-dom';
import { mockPlaylists } from '@/utils/mockData';
import Tracks from '@/pages/Tracks';

export default function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const playlist = mockPlaylists.find((p) => p.id === id);

  if (!playlist) {
    return <div className="p-6">Playlist not found</div>;
  }

  return (
    <div className="main-content">
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-6 lg:px-12 py-8">
          <Link
            to="/playlists"
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
          >
            ← Back to Playlists
          </Link>

          <h1 className="text-2xl font-bold mb-2">{playlist.name}</h1>
          <p className="text-gray-500 mb-6">
            {playlist.tracks.length}{' '}
            {playlist.tracks.length === 1 ? 'track' : 'tracks'}
          </p>

          <Tracks initialTracks={playlist.tracks} />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPlaylists } from '@/utils/mockData';

const Playlists = () => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (playlistId: string) => {
    setImageErrors((prev) => new Set(prev).add(playlistId));
  };

  return (
    <div className="main-content">
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-6 lg:px-12 py-8">
          <h1 className="text-2xl font-bold mb-6">Playlists</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {mockPlaylists.map((playlist) => {
              const hasImageError = imageErrors.has(playlist.id);

              return (
                <Link to={`/playlists/${playlist.id}`} key={playlist.id}>
                  <div className="group bg-white rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                      {playlist.img && !hasImageError ? (
                        <img
                          src={playlist.img}
                          alt={`${playlist.name} cover`}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(playlist.id)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-gray-500 text-2xl font-bold">
                            {playlist.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {playlist.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;

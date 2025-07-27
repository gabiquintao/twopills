import { useState } from 'react';
import {
  Play,
  Pause,
  Search,
  Loader,
  List,
  Grid3X3,
  Minus,
} from 'lucide-react';
import { useSongStore } from '@/stores/useSongStore';
import { mockTracks } from '@/utils/mockData';
import type { Track } from '@/types/audio';

type ViewMode = 'list' | 'compact' | 'grid';

const Tracks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { currentTrack, isPlaying, isLoading, play, pause } = useSongStore();

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (track.album?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrackPlay = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  const handleImageError = (trackId: string) => {
    setImageErrors((prev) => new Set(prev).add(trackId));
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const renderPlayButton = (track: Track) => {
    const isCurrentTrack = currentTrack?.id === track.id;
    const isTrackPlaying = isCurrentTrack && isPlaying;
    const isTrackLoading = isCurrentTrack && isLoading;

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleTrackPlay(track);
        }}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${
          isCurrentTrack
            ? 'bg-yellow-500 text-white'
            : 'bg-white text-gray-600 hover:bg-yellow-500 hover:text-white shadow-md'
        }`}
      >
        {isTrackLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : isTrackPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </button>
    );
  };

  const renderListView = () => (
    <div className="space-y-1">
      {filteredTracks.map((track) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const hasImageError = imageErrors.has(track.id);

        return (
          <div
            key={track.id}
            className={`group flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-150 cursor-pointer ${
              isCurrentTrack ? 'bg-yellow-50' : ''
            }`}
            onClick={() => handleTrackPlay(track)}
          >
            <div className="flex-shrink-0 w-12 h-12 mr-4 rounded-md overflow-hidden bg-gray-100">
              {track.img && !hasImageError ? (
                <img
                  src={track.img}
                  alt={`${track.name} cover`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(track.id)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-sm font-bold">
                    {track.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-medium text-sm truncate transition-colors ${
                      isCurrentTrack ? 'text-yellow-700' : 'text-gray-900'
                    }`}
                  >
                    {track.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {track.artist.name}
                    {track.album && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{track.album.name}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-400 ml-4">
                  <span className="hidden sm:block">
                    {formatDate(track.releaseDate)}
                  </span>
                  {track.duration && (
                    <span className="font-mono">
                      {formatDuration(track.duration)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCompactView = () => (
    <div className="space-y-0.5">
      {filteredTracks.map((track) => {
        const isCurrentTrack = currentTrack?.id === track.id;

        return (
          <div
            key={track.id}
            className={`group flex items-center px-3 py-2 rounded hover:bg-gray-50 transition-all duration-150 cursor-pointer ${
              isCurrentTrack ? 'bg-yellow-50' : ''
            }`}
            onClick={() => handleTrackPlay(track)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-medium text-sm truncate transition-colors ${
                      isCurrentTrack ? 'text-yellow-700' : 'text-gray-900'
                    }`}
                  >
                    {track.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {track.artist.name}
                    {track.album && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{track.album.name}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span className="hidden md:block">
                      {formatDate(track.releaseDate)}
                    </span>
                    {track.duration && (
                      <span className="font-mono">
                        {formatDuration(track.duration)}
                      </span>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {renderPlayButton(track)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredTracks.map((track) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const hasImageError = imageErrors.has(track.id);

        return (
          <div
            key={track.id}
            className={`group bg-white rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
              isCurrentTrack ? 'bg-yellow-50 ring-2 ring-yellow-200' : ''
            }`}
            onClick={() => handleTrackPlay(track)}
          >
            <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
              {track.img && !hasImageError ? (
                <img
                  src={track.img}
                  alt={`${track.name} cover`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(track.id)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-2xl font-bold">
                    {track.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3
                className={`font-medium text-sm truncate transition-colors ${
                  isCurrentTrack ? 'text-yellow-700' : 'text-gray-900'
                }`}
              >
                {track.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {track.artist.name}
              </p>
              {track.album && (
                <p className="text-xs text-gray-400 truncate">
                  {track.album.name}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                <span className="truncate">
                  {formatDate(track.releaseDate)}
                </span>
                {track.duration && (
                  <span className="font-mono ml-2">
                    {formatDuration(track.duration)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="main-content">
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50/50 border-b border-gray-100">
          <div className="mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-100 transition-all duration-200 w-72"
                  />
                </div>

                <span className="text-sm text-gray-500">
                  {filteredTracks.length}{' '}
                  {filteredTracks.length === 1 ? 'result' : 'results'}
                </span>
              </div>

              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
                    viewMode === 'list'
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
                    viewMode === 'compact'
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Compact View"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
                    viewMode === 'grid'
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto px-6 lg:px-12 py-8">
          {filteredTracks.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tracks found
              </h3>
              <p className="text-gray-500 mb-4">
                Try searching with different keywords
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'list' && renderListView()}
              {viewMode === 'compact' && renderCompactView()}
              {viewMode === 'grid' && renderGridView()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracks;

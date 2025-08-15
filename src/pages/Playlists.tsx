import { mockPlaylists } from '@/utils/mockData';

const Playlists = () => {
  return (
    <div>
      {mockPlaylists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Playlists;

import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
import Tracks from '@/pages/Tracks';
import Playlists from '@/pages/Playlists';
import PlaylistDetail from '@/pages/PlaylistDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlists/:id" element={<PlaylistDetail />} />
    </Routes>
  );
}

export default App;

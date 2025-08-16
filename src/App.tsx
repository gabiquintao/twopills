import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
import Tracks from '@/pages/Tracks';
import Playlists from '@/pages/Playlists';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/playlists" element={<Playlists />} />
    </Routes>
  );
}

export default App;

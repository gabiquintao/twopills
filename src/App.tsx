import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Artists from '@/pages/Artists';
import Tracks from '@/pages/Tracks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/tracks" element={<Tracks />} />
    </Routes>
  );
}

export default App;

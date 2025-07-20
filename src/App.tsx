import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Songs from './pages/Songs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/songs" element={<Songs />} />
    </Routes>
  );
}

export default App;

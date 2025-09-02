import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Navbar from './components/ui/Navbar.tsx';
import AudioPlayer from './components/player/AudioPlayer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="main-content flex-1 overflow-y-auto overflow-x-hidden">
          <App />
        </main>
        <AudioPlayer />
      </div>
    </BrowserRouter>
  </StrictMode>
);

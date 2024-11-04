import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { DirectionProvider } from './contexts/direction.jsx';
import { PlayerProvider } from './contexts/player.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider>
      <DirectionProvider>
        <App />
      </DirectionProvider>
    </PlayerProvider>
  </StrictMode>,
);

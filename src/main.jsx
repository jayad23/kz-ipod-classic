import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterApp from './router/router.app.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PlayerProvider } from './contexts/player.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </PlayerProvider>
  </StrictMode>,
);

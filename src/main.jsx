import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterApp from './router/router.app.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PlayerProvider } from './contexts/player.jsx';
import AppearanceProvider from './contexts/appearance.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppearanceProvider>
      <PlayerProvider>
        <BrowserRouter>
          <RouterApp />
        </BrowserRouter>
      </PlayerProvider>
    </AppearanceProvider>
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterApp from './router/router.app.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PlayerProvider } from './contexts/player.jsx';
import AppearanceProvider from './contexts/appearance.jsx';
// Forcing new deployment
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppearanceProvider>
        <PlayerProvider>
          <BrowserRouter>
            <RouterApp />
          </BrowserRouter>
        </PlayerProvider>
      </AppearanceProvider>
    </QueryClientProvider>
  </StrictMode>,
);

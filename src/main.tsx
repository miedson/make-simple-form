import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider.tsx';
import { AppRoutes } from './routes.tsx';
import { Toaster } from './components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <AppRoutes />
      <Toaster />
    </Provider>
  </StrictMode>
);

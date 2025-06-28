import { Routes as AppRoutes, BrowserRouter, Route } from 'react-router-dom';
import { BuilderPage } from './pages/builder';
import { DragDropProvider } from './pages/builder/contexts/drag-drop.context';
import { FormContexProvider } from './pages/builder/contexts/header-form.context';

export const Routes = () => {
  return (
    <BrowserRouter>
      <AppRoutes>
        <Route
          path="/"
          element={
            <DragDropProvider>
              <FormContexProvider>
                <BuilderPage />
              </FormContexProvider>
            </DragDropProvider>
          }
        />
      </AppRoutes>
    </BrowserRouter>
  );
};

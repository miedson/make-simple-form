import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { BuilderPage } from './pages/builder';
import { DragDropProvider } from './pages/builder/contexts/drag-drop.context';
import { FormContexProvider } from './pages/builder/contexts/header-form.context';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

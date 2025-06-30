import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { BuilderPage } from './pages/builder';
import { DragDropProvider } from './pages/builder/contexts/drag-drop.context';
import { FormContexProvider } from './pages/builder/contexts/header-form.context';
import { FormPage } from './pages/form';

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
        <Route path='form/:id' element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
};

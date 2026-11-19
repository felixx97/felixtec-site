import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { PerformanceProvider } from './context/PerformanceContext';
import HomePage from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage'));

export default function App() {
  return (
    <PerformanceProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/politicas" element={<PoliciesPage />} />

              {/* Legacy .html URL compatibility */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/servicos.html" element={<Navigate to="/servicos" replace />} />
              <Route path="/politicas.html" element={<Navigate to="/politicas" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PerformanceProvider>
  );
}


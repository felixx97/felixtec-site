import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { PerformanceProvider } from './context/PerformanceContext';
import HomePage from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage'));
const NatalPage = lazy(() => import('./pages/NatalPage'));
const AutomacoesPage = lazy(() => import('./pages/AutomacoesPage'));

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
              <Route path="/natal" element={<NatalPage />} />
              <Route path="/automacoes" element={<AutomacoesPage />} />

              {/* Legacy / static-shell .html URL compatibility */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/servicos.html" element={<Navigate to="/servicos" replace />} />
              <Route path="/politicas.html" element={<Navigate to="/politicas" replace />} />
              <Route path="/natal.html" element={<Navigate to="/natal" replace />} />
              <Route path="/automacoes.html" element={<Navigate to="/automacoes" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PerformanceProvider>
  );
}

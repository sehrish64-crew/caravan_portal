import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout').then((module) => ({ default: module.DashboardLayout })));
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const NewReport = lazy(() => import('./pages/NewReport').then((module) => ({ default: module.NewReport })));
const ReportEditor = lazy(() => import('./pages/ReportEditor').then((module) => ({ default: module.ReportEditor })));
const ReportPdfPage = lazy(() => import('./pages/ReportPdfPage').then((module) => ({ default: module.ReportPdfPage })));
const ClientReports = lazy(() => import('./pages/ClientReports').then((module) => ({ default: module.ClientReports })));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        <span className="text-sm font-medium">Loading page…</span>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<ClientReports />} />
          <Route path="new-report" element={<NewReport />} />
          <Route path="report/:id" element={<ReportEditor />} />
        </Route>

        <Route path="/dashboard/report/:id/pdf" element={<ReportPdfPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

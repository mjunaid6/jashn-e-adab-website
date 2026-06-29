import { Routes, Route } from 'react-router';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

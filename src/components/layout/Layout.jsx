/* ============================================
   Layout — Root Layout Wrapper
   Lenis smooth scrolling, Navbar, Outlet, Footer.
   ============================================ */

import { ReactLenis } from 'lenis/react';
import { Outlet } from 'react-router';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Layout() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <div className="overflow-clip">
        {/* Sticky navigation */}
        <Navbar />

        {/* Page content — rendered by React Router */}
        <main className="min-h-screen">
          <Outlet />
        </main>

        {/* Site footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}

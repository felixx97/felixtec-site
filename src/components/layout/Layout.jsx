import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { reportWhatsAppConversion } from '../../utils/analytics';
import AmbientGlow from '../effects/AmbientGlow';
import CodeParticlesCanvas from '../effects/CodeParticlesCanvas';
import CustomCursor from '../effects/CustomCursor';
import CookieBanner from '../widgets/CookieBanner';
import WhatsAppWidget from '../widgets/WhatsAppWidget';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();

  // Scroll to top or target hash when changing routes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      // Wait a frame so newly mounted route DOM exists
      const raf = requestAnimationFrame(() => setTimeout(scrollToTarget, 60));
      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  // Global Google Ads conversion tracking for direct wa.me links
  useEffect(() => {
    const handleWhatsAppClick = (e) => {
      const link = e.target.closest?.('a');
      if (link && link.href && link.href.includes('wa.me')) {
        if (typeof window.gtag === 'function') {
          const isNewTab = link.target === '_blank';
          if (isNewTab) {
            // Do not block popup opening in new tab — just fire conversion
            reportWhatsAppConversion();
          } else {
            e.preventDefault();
            const targetUrl = link.href;
            reportWhatsAppConversion(() => {
              window.location.href = targetUrl;
            });
          }
        }
      }
    };

    document.addEventListener('click', handleWhatsAppClick);
    return () => document.removeEventListener('click', handleWhatsAppClick);
  }, []);

  return (
    <>
      <AmbientGlow />
      <CodeParticlesCanvas />
      <CustomCursor />

      <div id="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>

      <WhatsAppWidget />
      <CookieBanner />
    </>
  );
}


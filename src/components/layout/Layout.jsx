import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { reportWhatsAppConversion } from '../../utils/analytics';
import AmbientGlow from '../effects/AmbientGlow';
import CodeParticlesCanvas from '../effects/CodeParticlesCanvas';
import CookieBanner from '../widgets/CookieBanner';
import WhatsAppWidget from '../widgets/WhatsAppWidget';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();
  const isNatalLanding = location.pathname === '/natal';
  const isFloripaCultural = location.pathname.startsWith('/floripa-cultural');
  const hideAgencyChrome = isNatalLanding || isFloripaCultural;

  useEffect(() => {
    document.body.classList.toggle('theme-natal', isNatalLanding);
    document.body.classList.toggle('theme-floripa', isFloripaCultural);
    return () => {
      document.body.classList.remove('theme-natal');
      document.body.classList.remove('theme-floripa');
    };
  }, [isNatalLanding, isFloripaCultural]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      const raf = requestAnimationFrame(() => setTimeout(scrollToTarget, 60));
      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleWhatsAppClick = (e) => {
      const link = e.target.closest?.('a');
      if (link && link.href && link.href.includes('wa.me')) {
        if (typeof window.gtag === 'function') {
          const isNewTab = link.target === '_blank';
          if (isNewTab) {
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
      {!hideAgencyChrome && <AmbientGlow />}
      {!hideAgencyChrome && <CodeParticlesCanvas />}

      <div id="app">
        {!hideAgencyChrome && <Navbar />}
        <Outlet />
        {!hideAgencyChrome && <Footer />}
      </div>

      {!isFloripaCultural && <WhatsAppWidget />}
      {!isFloripaCultural && <CookieBanner />}
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OfferModal from '../components/modals/OfferModal';
import ServiceModal from '../components/modals/ServiceModal';
import CampaignSpotlightBanner from '../components/sections/CampaignSpotlightBanner';
import ContactSection from '../components/sections/ContactSection';
import DetailsSection from '../components/sections/DetailsSection';
import HeroSection from '../components/sections/HeroSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import PricingSection from '../components/sections/PricingSection';
import ProfileSection from '../components/sections/ProfileSection';
import ServicesBentoSection from '../components/sections/ServicesBentoSection';
import VideoSection from '../components/sections/VideoSection';
import { usePerformance } from '../context/PerformanceContext';
import { usePageMeta } from '../hooks/usePageMeta';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef(null);
  const { isLowPower, reducedMotion } = usePerformance();
  const [offerOpen, setOfferOpen] = useState(false);
  const [activeServiceKey, setActiveServiceKey] = useState(null);

  usePageMeta({
    title: 'FélixTec | Sistemas, Web Apps & IAs de Alta Performance',
    description:
      'Desenvolvimento web de alto padrão, automações inteligentes de rotinas e engenharia de software de alta conversão. Garanta seu desconto especial!',
    url: 'https://felixtec.com.br/',
  });

  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline();
      heroTl
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
        )
        .from('.hero-subtitle', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        .from('.hero-offer-card', { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-actions', { opacity: 0, y: 14, duration: 0.55, ease: 'power2.out' }, '-=0.4')
        .fromTo(
          '.python-ide-panel',
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.7'
        );

      // Subtle scroll reaction on Dev Félix (skip scrub on low-power PCs)
      if (!isLowPower) {
        gsap.to('#main-robot', {
          scrollTrigger: {
            trigger: '.hero-section',
            start: '40% top',
            end: 'bottom top',
            scrub: 0.8,
          },
          y: 40,
          rotation: 16,
          scale: 0.95,
          ease: 'power1.out',
        });
      }

      // Section headers
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: { trigger: header, start: 'top 88%', once: true },
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
        });
      });

      // Pricing cards
      gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: isMobile ? 'top 92%' : 'top 88%', once: true },
          opacity: 0,
          y: isLowPower ? 24 : 45,
          scale: isLowPower ? 1 : 0.96,
          rotation: isLowPower ? 0 : index % 2 === 0 ? 1.2 : -1.2,
          duration: isLowPower ? 0.5 : 0.75,
          ease: 'power3.out',
          onComplete: () => gsap.set(card, { clearProps: 'transform' }),
        });
      });

      // Bento cards
      gsap.utils.toArray('.bento-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: isMobile ? 'top 92%' : 'top 88%', once: true },
          opacity: 0,
          y: isLowPower ? 24 : 40,
          scale: isLowPower ? 1 : 0.96,
          rotation: isLowPower ? 0 : index % 2 === 0 ? 1 : -1,
          duration: isLowPower ? 0.5 : 0.7,
          ease: 'power3.out',
          onComplete: () => gsap.set(card, { clearProps: 'transform' }),
        });
      });

      // Portfolio carousel reveal
      gsap.from('.portfolio-carousel-wrapper', {
        scrollTrigger: { trigger: '.portfolio-carousel-wrapper', start: isMobile ? 'top 95%' : 'top 90%', once: true },
        opacity: 0,
        y: 28,
        duration: 0.75,
        ease: 'power2.out',
      });

      // Details reveal
      gsap.from('.scroll-reveal-left', {
        scrollTrigger: { trigger: '.details-section', start: 'top 82%', once: true },
        opacity: 0,
        x: isLowPower ? 0 : -40,
        y: isLowPower ? 20 : 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.scroll-reveal-right', {
        scrollTrigger: { trigger: '.details-section', start: 'top 82%', once: true },
        opacity: 0,
        x: isLowPower ? 0 : 40,
        y: isLowPower ? 20 : 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Profile items & photo
      gsap.utils.toArray('.profile-experience-item').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
          opacity: 0,
          x: isLowPower ? 0 : -24,
          y: 14,
          duration: 0.55,
          ease: 'power2.out',
        });
      });

      gsap.from('.profile-media-container', {
        scrollTrigger: { trigger: '.profile-media-container', start: 'top 88%', once: true },
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Video reveal (lightweight one-shot on low-power, gentle scrub on high-power)
      if (isLowPower) {
        gsap.from('.video-panel', {
          scrollTrigger: { trigger: '.video-section', start: 'top 88%', once: true },
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: 'power3.out',
        });
      } else {
        const videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.video-section',
            start: 'top 90%',
            end: 'bottom 45%',
            scrub: 1.2,
          },
        });
        videoTl
          .fromTo('.video-panel', { opacity: 0.75, y: 32, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, ease: 'none' })
          .fromTo('.video-wrapper', { scale: 0.9, rotation: isMobile ? -1.5 : -2.5 }, { scale: 1, rotation: 0, ease: 'none' }, '<=')
          .fromTo('.video-glow', { opacity: 0, scale: 0.8 }, { opacity: 0.8, scale: 1.1, ease: 'none' }, '<=');
      }
    }, pageRef);

    return () => ctx.revert();
  }, [isLowPower, reducedMotion]);

  return (
    <div ref={pageRef}>
      <HeroSection onOpenOffer={() => setOfferOpen(true)} />
      <CampaignSpotlightBanner />
      <PricingSection variant="home" />
      <ServicesBentoSection onSelectService={setActiveServiceKey} />
      <PortfolioSection />
      <DetailsSection />
      <ProfileSection />
      <VideoSection />
      <ContactSection />

      <OfferModal isOpen={offerOpen} onClose={() => setOfferOpen(false)} />
      <ServiceModal serviceKey={activeServiceKey} onClose={() => setActiveServiceKey(null)} />
    </div>
  );
}


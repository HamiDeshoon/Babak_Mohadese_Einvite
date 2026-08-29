import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import type { Language } from './context/LanguageContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import CountdownTimer from './components/CountdownTimer';
import TheWedding from './sections/TheWedding';
import LocationSection from './components/LocationSection';
import Gallery from './sections/Gallery';
import RSVP from './sections/RSVP';
import WishesWall from './sections/WishesWall';
import Footer from './sections/Footer';
import ParticleBackground from './components/ParticleBackground';
import { asset } from './lib/assets';

gsap.registerPlugin(ScrollTrigger);

function MainContent() {
  const location = useLocation();

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Always jump to top when switching between pages.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] relative selection:bg-sage-400 selection:text-ivory bg-ivory overflow-x-hidden">
      {/* Charming Natural Wedding Botanical Wallpaper & Ambient Lighting */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-top bg-no-repeat opacity-45 mix-blend-multiply transition-opacity duration-1000"
        style={{ backgroundImage: `url('${asset('/botanical_wedding_wallpaper.jpg')}')` }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(138,158,137,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.1)_0%,transparent_50%)]"
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-ivory/25 to-ivory/60"
      />

      {/* Three.js Ethereal Stardust & Petal Background */}
      <ParticleBackground />

      {/* Floating Glass Capsule Navigation */}
      <Navigation />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <Hero />
        <CountdownTimer />
        <TheWedding />
        <LocationSection />
        <WishesWall />
        <RSVP />
        <Gallery />
        <Footer />
      </main>
    </div>
  );
}

function LanguageRoute({ lang, children }: { lang: Language; children: React.ReactNode }) {
  return <LanguageProvider key={lang} initial={lang}>{children}</LanguageProvider>;
}

function RootRedirect() {
  return <Navigate to="/fa" replace />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/en"
          element={
            <LanguageRoute lang="en">
              <MainContent />
            </LanguageRoute>
          }
        />
        <Route
          path="/fa"
          element={
            <LanguageRoute lang="fa">
              <MainContent />
            </LanguageRoute>
          }
        />
        <Route path="*" element={<Navigate to="/fa" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider, type Language } from './context/LanguageContext';
import { asset } from './lib/assets';
import ParticleBackground from './components/ParticleBackground';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import CountdownTimer from './components/CountdownTimer';
import OurStory from './sections/OurStory';
import TheWedding from './sections/TheWedding';
import LocationSection from './components/LocationSection';
import Gallery from './sections/Gallery';
import RSVP from './sections/RSVP';
import WishesWall from './sections/WishesWall';
import Footer from './sections/Footer';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function MainContent() {
  // Re-initialize smooth scroll on every route change so the Lenis instance
  // always tracks the active page's sections.
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Always jump to top when switching between the two pages.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative selection:bg-sage-400 selection:text-ivory bg-ivory">
      {/* Charming Natural Wedding Botanical Wallpaper & Ambient Lighting */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-top bg-no-repeat opacity-40 mix-blend-multiply transition-opacity duration-1000"
        style={{ backgroundImage: `url('${asset('/botanical_wedding_wallpaper.jpg')}')` }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(138,158,137,0.12)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.08)_0%,transparent_50%)]"
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-ivory/30 to-ivory/60"
      />

      {/* Three.js Ethereal Stardust & Petal Background */}
      <ParticleBackground />

      {/* Floating Glass Capsule Navigation */}
      <Navigation />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <Hero />
        <CountdownTimer />
        <OurStory />
        <TheWedding />
        <LocationSection />
        <Gallery />
        <RSVP />
        <WishesWall />
        <Footer />
      </main>
    </div>
  );
}

function LanguageRoute({ lang, children }: { lang: Language; children: React.ReactNode }) {
  return <LanguageProvider initial={lang}>{children}</LanguageProvider>;
}

function RootRedirect() {
  // The root URL has no language switcher; send the visitor to the Persian
  // page by default, which is the primary audience for this celebration.
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

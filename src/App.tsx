import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
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
  useEffect(() => {
    // Initialize Lenis smooth scroll
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

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-rose-gold selection:text-ivory">
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

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

function resolveAudioTrack(lang: 'en' | 'fa'): string {
  const at = invitationConfig.media.audioTrack;
  if (!at) return '';
  if (typeof at === 'string') return asset(at);
  return asset((lang === 'fa' ? at.fa : at.en) ?? at.en ?? at.fa ?? '');
}

export default function AudioPlayer() {
  const { isPersian, t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string>('');

  const buildAudio = () => {
    const src = resolveAudioTrack(language);
    if (!src) return null;
    if (audioRef.current && currentSrcRef.current === src) return audioRef.current;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;
    currentSrcRef.current = src;
    return audio;
  };

  const startPlaying = () => {
    const audio = buildAudio();
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowAutoPlayPrompt(false);
      })
      .catch(() => {
        // Autoplay blocked by browser policy
        setIsPlaying(false);
        setShowAutoPlayPrompt(true);
      });
  };

  const pausePlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pausePlaying();
    } else {
      startPlaying();
    }
  };

  // Whenever the locked language of the page changes (e.g. cross-route nav),
  // rebuild the audio source so the right track plays.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = null;
    currentSrcRef.current = '';
    setIsPlaying(false);
    startPlaying();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    // 1. Attempt initial autoplay
    startPlaying();

    // 2. Set up one-time interaction listeners if autoplay was prevented
    const handleFirstInteraction = () => {
      if (!audioRef.current || audioRef.current.paused) {
        startPlaying();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? t('music_toggle_pause') : t('music_toggle_play')}
        title={isPlaying ? t('music_toggle_pause') : t('music_toggle_play')}
        className={`group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 border ${
          isPlaying
            ? 'bg-champagne/90 border-gold shadow-gold-glow'
            : 'bg-ivory/80 border-rose-gold/30 shadow-sm'
        }`}
      >
        <div className="flex items-end gap-[3px] h-3.5 w-4 justify-center">
          <span
            className={`w-[2.5px] bg-rose-gold rounded-full transition-all duration-300 ${
              isPlaying ? 'animate-[bounce_0.8s_infinite_ease-in-out] h-3.5' : 'h-1.5'
            }`}
          />
          <span
            className={`w-[2.5px] bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? 'animate-[bounce_1.1s_infinite_ease-in-out_0.2s] h-4' : 'h-2.5'
            }`}
          />
          <span
            className={`w-[2.5px] bg-rose-deep rounded-full transition-all duration-300 ${
              isPlaying ? 'animate-[bounce_0.9s_infinite_ease-in-out_0.4s] h-2.5' : 'h-1.5'
            }`}
          />
        </div>
        <span className="text-[11px] font-serif tracking-wider uppercase text-mahogany font-medium hidden sm:inline-block">
          {isPlaying ? (isPersian ? 'موسیقی' : 'Playing') : (isPersian ? 'پخش آهنگ' : 'Music')}
        </span>
      </button>

      {/* Floating Prompt if browser blocked initial autoplay until touch */}
      {showAutoPlayPrompt && !isPlaying && (
        <div
          onClick={startPlaying}
          className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 cursor-pointer animate-bounce rounded-full px-4 py-2 bg-mahogany/95 backdrop-blur-md text-ivory border border-gold/40 shadow-2xl flex items-center gap-2 text-xs font-serif"
        >
          <span className="text-gold">🎵</span>
          <span>{isPersian ? 'لمس کنید تا موسیقی جشن پخش شود' : 'Tap anywhere for wedding piano music'}</span>
          <span className="text-gold text-xs">✦</span>
        </div>
      )}
    </>
  );
}

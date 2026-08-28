import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function AudioPlayer() {
  const { isPersian, t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'fa' | 'en'>(language);
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string>('');

  const at = invitationConfig.media.audioTrack;
  const faTrack = typeof at === 'object' && at && at.fa ? at.fa : typeof at === 'string' ? at : '/fa-Mix final.mp3';
  const enTrack = typeof at === 'object' && at && at.en ? at.en : typeof at === 'string' ? at : '/en-You Are My Favorite - Heather Mae (Official Music Video).mp3';

  const tracks = {
    fa: {
      src: asset(faTrack),
      titleEn: 'Persian Wedding Romance Mix',
      titleFa: 'میکس عاشقانه و شاد جشن',
    },
    en: {
      src: asset(enTrack),
      titleEn: 'You Are My Favorite — Heather Mae',
      titleFa: 'ترانه انگلیسی اختصاصی',
    },
  };

  const currentTrack = tracks[selectedTrack];

  const buildAudio = () => {
    const src = currentTrack.src;
    if (!src) return null;
    if (audioRef.current && currentSrcRef.current === src) return audioRef.current;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.8;
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

  const switchTrack = (trackKey: 'fa' | 'en') => {
    setSelectedTrack(trackKey);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      currentSrcRef.current = '';
    }
    setTimeout(() => {
      startPlaying();
    }, 50);
  };

  useEffect(() => {
    setSelectedTrack(language);
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
    startPlaying();

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
    <div className="relative">
      <div className="flex items-center gap-1.5 bg-ivory/80 rounded-full p-1 border border-rose-gold/30 shadow-sm backdrop-blur-md">
        {/* Play/Pause Button */}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? t('music_toggle_pause') : t('music_toggle_play')}
          title={isPlaying ? t('music_toggle_pause') : t('music_toggle_play')}
          className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 border ${
            isPlaying
              ? 'bg-champagne/90 border-gold shadow-gold-glow'
              : 'bg-ivory/90 border-rose-gold/20'
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

        {/* Track Switcher Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-7 h-7 rounded-full bg-champagne-100/60 hover:bg-gold/20 flex items-center justify-center text-xs text-mahogany transition-colors"
          title={isPersian ? 'تغییر آهنگ' : 'Switch Song'}
        >
          🎵
        </button>
      </div>

      {/* Expanded Track Selector Popup */}
      {isExpanded && (
        <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 z-50 w-64 rounded-2xl p-2 bg-gradient-to-b from-ivory/95 to-champagne-50/95 backdrop-blur-2xl border border-gold/30 shadow-2xl space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-1.5 text-[10px] uppercase font-serif tracking-widest text-warm-stone border-b border-rose-gold/15 flex items-center justify-between">
            <span>{isPersian ? 'انتخاب آهنگ جشن' : 'Wedding Playlist'}</span>
            <button onClick={() => setIsExpanded(false)} className="text-xs hover:text-rose-deep">✕</button>
          </div>

          <button
            onClick={() => {
              switchTrack('fa');
              setIsExpanded(false);
            }}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
              selectedTrack === 'fa'
                ? 'bg-rose-deep text-ivory font-medium shadow-sm'
                : 'hover:bg-champagne-100/70 text-mahogany'
            }`}
          >
            <span>{isPersian ? 'میکس شاد و رمانتیک فارسی' : 'Persian Romance Mix'}</span>
            {selectedTrack === 'fa' && <span className="text-xs">✓</span>}
          </button>

          <button
            onClick={() => {
              switchTrack('en');
              setIsExpanded(false);
            }}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
              selectedTrack === 'en'
                ? 'bg-rose-deep text-ivory font-medium shadow-sm'
                : 'hover:bg-champagne-100/70 text-mahogany'
            }`}
          >
            <span>Heather Mae — You Are My Favorite</span>
            {selectedTrack === 'en' && <span className="text-xs">✓</span>}
          </button>
        </div>
      )}

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
    </div>
  );
}

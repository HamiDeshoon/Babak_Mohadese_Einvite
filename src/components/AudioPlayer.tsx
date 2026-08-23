import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { invitationConfig } from '../config/invitation.config';

export default function AudioPlayer() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Synthesize soft ambient chord progression using Web Audio API if no external track URL is provided
  const playSynthesizedAmbient = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic chord notes (frequencies for C major 9th / F major 7th / A minor 7th)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!isPlaying && chordIndex > 0) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle envelope
          const now = ctx.currentTime;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.035 / currentChord.length, now + 1.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 5.0);
        });
      };

      playChord();
      intervalRef.current = window.setInterval(playChord, 4800);
    } catch {
      // AudioContext not supported or blocked
    }
  };

  const stopSynthesizedAmbient = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      } else {
        stopSynthesizedAmbient();
      }
      setIsPlaying(false);
    } else {
      if (invitationConfig.media.audioTrack) {
        if (!audioRef.current) {
          audioRef.current = new Audio(invitationConfig.media.audioTrack);
          audioRef.current.loop = true;
        }
        audioRef.current.play().catch(() => {});
      } else {
        playSynthesizedAmbient();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthesizedAmbient();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? t('music_toggle_pause') : t('music_toggle_play')}
      title={isPlaying ? t('music_toggle_pause') : t('music_toggle_play')}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-card transition-all duration-300 hover:scale-105 active:scale-95 border border-rose-gold/30 hover:border-gold/60"
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
          className={`w-[2.5px] bg-rose-gold rounded-full transition-all duration-300 ${
            isPlaying ? 'animate-[bounce_0.9s_infinite_ease-in-out_0.4s] h-2.5' : 'h-1.5'
          }`}
        />
      </div>
      <span className="text-[11px] font-serif tracking-wider uppercase text-mahogany font-medium hidden sm:inline-block">
        {isPlaying ? 'Music On' : 'Music'}
      </span>
    </button>
  );
}

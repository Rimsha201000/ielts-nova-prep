import { useState, useEffect, useRef, useCallback } from 'react';

export type SupportedAccent = 'British' | 'American' | 'Australian' | 'Canadian' | 'International';

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0); // 0 - 100
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);

      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
        }
      };
    }
  }, []);

  const selectVoiceForAccent = useCallback((accent: SupportedAccent): SpeechSynthesisVoice | null => {
    if (!voices.length) return null;

    let targetLang = 'en-GB';
    if (accent === 'American') targetLang = 'en-US';
    else if (accent === 'Australian') targetLang = 'en-AU';
    else if (accent === 'Canadian') targetLang = 'en-CA';
    else if (accent === 'British') targetLang = 'en-GB';
    else targetLang = 'en';

    // Try finding exact language code match
    const match = voices.find(v => v.lang.toLowerCase().includes(targetLang.toLowerCase()));
    if (match) return match;

    // Fallback to any English voice
    const enFallback = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    return enFallback || voices[0] || null;
  }, [voices]);

  const speak = useCallback((text: string, accent: SupportedAccent = 'British', rate: number = 1.0) => {
    if (!supported || typeof window === 'undefined') return;

    window.speechSynthesis.cancel();
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectVoiceForAccent(accent);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const totalWords = text.split(/\s+/).length;
    let spokenWords = 0;

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        spokenWords += 1;
        const pct = Math.min(100, Math.round((spokenWords / totalWords) * 100));
        setCurrentProgress(pct);
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentProgress(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentProgress(100);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis playback notice:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [supported, selectVoiceForAccent]);

  const pause = useCallback(() => {
    if (supported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (supported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [supported]);

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentProgress(0);
    }
  }, [supported]);

  return {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    currentProgress,
    supported,
    voices
  };
}

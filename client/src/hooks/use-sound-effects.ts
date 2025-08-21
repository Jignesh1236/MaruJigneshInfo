
import { useCallback, useRef } from "react";

interface SoundEffects {
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playError: () => void;
}

export const useSoundEffects = (): SoundEffects => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createBeep = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [getAudioContext]);

  const playHover = useCallback(() => {
    try {
      createBeep(800, 0.1, 0.05);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }, [createBeep]);

  const playClick = useCallback(() => {
    try {
      createBeep(1000, 0.15, 0.08);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }, [createBeep]);

  const playSuccess = useCallback(() => {
    try {
      createBeep(523, 0.2, 0.06); // C5
      setTimeout(() => createBeep(659, 0.2, 0.06), 100); // E5
      setTimeout(() => createBeep(784, 0.3, 0.06), 200); // G5
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }, [createBeep]);

  const playError = useCallback(() => {
    try {
      createBeep(200, 0.3, 0.08);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }, [createBeep]);

  return { playHover, playClick, playSuccess, playError };
};

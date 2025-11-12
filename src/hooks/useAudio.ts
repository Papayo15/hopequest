/**
 * Audio Hooks
 * React hooks para integración fácil del audio service
 */

import { useEffect, useCallback } from 'react';
import { audioService, MusicTrack, SFXType } from '@/services/audio/audioService';

/**
 * Hook para reproducir música de fondo en una pantalla
 * Auto-stop cuando el componente se desmonta
 */
export function useBackgroundMusic(track: MusicTrack, autoPlay = true) {
  useEffect(() => {
    if (autoPlay) {
      audioService.playMusic(track, true);
    }

    return () => {
      // Cleanup on unmount
      audioService.stopMusic(true);
    };
  }, [track, autoPlay]);

  const play = useCallback(() => {
    audioService.playMusic(track, true);
  }, [track]);

  const stop = useCallback(() => {
    audioService.stopMusic(true);
  }, []);

  return { play, stop };
}

/**
 * Hook para efectos de sonido
 * Retorna función para reproducir SFX
 */
export function useSFX() {
  const playSFX = useCallback((type: SFXType) => {
    audioService.playSFX(type);
  }, []);

  return { playSFX };
}

/**
 * Hook para botones con SFX
 * Wrapper conveniente para onPress con sonido
 */
export function useButtonPress(onPress?: () => void, sfxType: SFXType = 'button_press') {
  return useCallback(() => {
    audioService.playSFX(sfxType);
    if (onPress) {
      onPress();
    }
  }, [onPress, sfxType]);
}

/**
 * Hook para narración
 * Control completo de narración con callbacks
 */
export function useNarration() {
  const playNarration = useCallback((audioPath: any, onComplete?: () => void) => {
    audioService.playNarration(audioPath, onComplete);
  }, []);

  const stopNarration = useCallback(() => {
    audioService.stopNarration();
  }, []);

  const pauseNarration = useCallback(() => {
    audioService.pauseNarration();
  }, []);

  const resumeNarration = useCallback(() => {
    audioService.resumeNarration();
  }, []);

  return {
    play: playNarration,
    stop: stopNarration,
    pause: pauseNarration,
    resume: resumeNarration,
  };
}

/**
 * Hook para control de volumen
 */
export function useAudioSettings() {
  const setVolume = useCallback((category: 'master' | 'music' | 'sfx' | 'narration', volume: number) => {
    audioService.setVolume(category, volume);
  }, []);

  const getVolume = useCallback((category: 'master' | 'music' | 'sfx' | 'narration') => {
    return audioService.getVolume(category);
  }, []);

  const toggleMusic = useCallback((enabled: boolean) => {
    audioService.toggleMusic(enabled);
  }, []);

  const toggleSFX = useCallback((enabled: boolean) => {
    audioService.toggleSFX(enabled);
  }, []);

  const toggleNarration = useCallback((enabled: boolean) => {
    audioService.toggleNarration(enabled);
  }, []);

  const getAudioStates = useCallback(() => {
    return audioService.getAudioStates();
  }, []);

  return {
    setVolume,
    getVolume,
    toggleMusic,
    toggleSFX,
    toggleNarration,
    getAudioStates,
  };
}

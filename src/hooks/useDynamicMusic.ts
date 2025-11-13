/**
 * Dynamic Music Hook
 * Sistema de música dinámica que cambia según el contexto
 * Se adapta a: país, hora del día, situación de juego, estado emocional
 */

import { useEffect, useState, useRef } from 'react';
import { audioService, MusicTrack } from '@/services/audio/audioService';

export type MusicContext =
  | 'menu' // Menú principal
  | 'worldmap' // Mapa mundial
  | 'gameplay' // Jugando nivel
  | 'victory' // Victoria
  | 'defeat' // Derrota
  | 'detective' // Modo detective
  | 'journal'; // Diario de viaje

export type MusicMood =
  | 'calm' // Música tranquila
  | 'energetic' // Música enérgica
  | 'tense' // Música tensa (desafío)
  | 'triumphant' // Música triunfal
  | 'melancholic'; // Música melancólica

export interface MusicTrack {
  id: string;
  name: string;
  context: MusicContext;
  country?: string; // País específico (opcional)
  mood: MusicMood;
  timeOfDay?: 'day' | 'night'; // Hora del día (opcional)
  volume: number; // 0-1
  loop: boolean;
  fadeDuration?: number; // Duración del fade en ms
}

interface UseDynamicMusicParams {
  context: MusicContext;
  country?: string;
  mood?: MusicMood;
  enabled?: boolean; // Si la música está habilitada
}

/**
 * Hook para música dinámica adaptativa
 */
export const useDynamicMusic = ({
  context,
  country,
  mood = 'calm',
  enabled = true,
}: UseDynamicMusicParams) => {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      stopCurrentTrack();
      return;
    }

    // Seleccionar track apropiado
    const track = selectTrack({ context, country, mood });

    if (track && track.id !== currentTrack?.id) {
      switchTrack(track);
    }

    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [context, country, mood, enabled]);

  const selectTrack = ({
    context,
    country,
    mood,
  }: {
    context: MusicContext;
    country?: string;
    mood: MusicMood;
  }): MusicTrack | null => {
    // Obtener hora del día
    const hour = new Date().getHours();
    const timeOfDay = hour >= 6 && hour < 20 ? 'day' : 'night';

    // Buscar track que coincida con todos los criterios
    let track = MUSIC_LIBRARY.find(
      (t) =>
        t.context === context &&
        t.mood === mood &&
        (!country || t.country === country) &&
        (!t.timeOfDay || t.timeOfDay === timeOfDay)
    );

    // Fallback: buscar solo por contexto y mood
    if (!track) {
      track = MUSIC_LIBRARY.find(
        (t) => t.context === context && t.mood === mood
      );
    }

    // Fallback: buscar solo por contexto
    if (!track) {
      track = MUSIC_LIBRARY.find((t) => t.context === context);
    }

    return track || null;
  };

  const switchTrack = async (newTrack: MusicTrack) => {
    // Solo mapear contexto a track de audioService
    const trackMap: Record<MusicContext, MusicTrack> = {
      'menu': 'menu',
      'worldmap': 'map',
      'gameplay': 'activity',
      'victory': 'victory',
      'defeat': 'defeat',
      'detective': 'activity', // Usar activity music para detective
      'journal': 'menu', // Usar menu music para journal
    };

    const audioTrack = trackMap[context] || 'menu';

    try {
      await audioService.playMusic(audioTrack, true);
      setCurrentTrack(newTrack);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error switching track:', error);
    }
  };

  const stopCurrentTrack = async () => {
    if (isPlaying) {
      try {
        await audioService.stopMusic(true);
        setCurrentTrack(null);
        setIsPlaying(false);
      } catch (error) {
        console.error('Error stopping track:', error);
      }
    }
  };

  const changeMood = (newMood: MusicMood) => {
    const track = selectTrack({ context, country, mood: newMood });
    if (track) {
      switchTrack(track);
    }
  };

  const changeVolume = async (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    await audioService.setVolume('music', clampedVolume);
  };

  return {
    currentTrack,
    isPlaying,
    volume,
    changeMood,
    changeVolume,
    stop: stopCurrentTrack,
  };
};

/**
 * Biblioteca de música
 * NOTA: Los IDs son referencias a archivos de audio que deben existir
 * Se pueden usar assets gratuitos de:
 * - Incompetech (Kevin MacLeod) - Libre de derechos
 * - Free Music Archive
 * - YouTube Audio Library
 */
const MUSIC_LIBRARY: MusicTrack[] = [
  // Menú principal
  {
    id: 'menu_calm',
    name: 'Welcome Journey',
    context: 'menu',
    mood: 'calm',
    volume: 0.6,
    loop: true,
    fadeDuration: 1500,
  },

  // Mapa mundial
  {
    id: 'worldmap_day',
    name: 'World Explorer',
    context: 'worldmap',
    mood: 'energetic',
    timeOfDay: 'day',
    volume: 0.7,
    loop: true,
  },
  {
    id: 'worldmap_night',
    name: 'Night Journey',
    context: 'worldmap',
    mood: 'calm',
    timeOfDay: 'night',
    volume: 0.5,
    loop: true,
  },

  // Gameplay - México
  {
    id: 'gameplay_mexico_energetic',
    name: 'Mexican Adventure',
    context: 'gameplay',
    country: 'mexico',
    mood: 'energetic',
    volume: 0.7,
    loop: true,
  },

  // Gameplay - España
  {
    id: 'gameplay_spain_energetic',
    name: 'Spanish Quest',
    context: 'gameplay',
    country: 'spain',
    mood: 'energetic',
    volume: 0.7,
    loop: true,
  },

  // Gameplay - Brasil
  {
    id: 'gameplay_brazil_energetic',
    name: 'Brazilian Carnival',
    context: 'gameplay',
    country: 'brazil',
    mood: 'energetic',
    volume: 0.7,
    loop: true,
  },

  // Gameplay - Genérico
  {
    id: 'gameplay_calm',
    name: 'Puzzle Solving',
    context: 'gameplay',
    mood: 'calm',
    volume: 0.6,
    loop: true,
  },
  {
    id: 'gameplay_tense',
    name: 'Challenge Ahead',
    context: 'gameplay',
    mood: 'tense',
    volume: 0.7,
    loop: true,
  },

  // Victoria
  {
    id: 'victory_triumphant',
    name: 'Victory Celebration',
    context: 'victory',
    mood: 'triumphant',
    volume: 0.8,
    loop: false,
    fadeDuration: 500,
  },

  // Derrota
  {
    id: 'defeat_melancholic',
    name: 'Try Again',
    context: 'defeat',
    mood: 'melancholic',
    volume: 0.5,
    loop: false,
  },

  // Modo detective
  {
    id: 'detective_tense',
    name: 'Mystery Investigation',
    context: 'detective',
    mood: 'tense',
    volume: 0.6,
    loop: true,
  },

  // Diario de viaje
  {
    id: 'journal_calm',
    name: 'Memory Lane',
    context: 'journal',
    mood: 'calm',
    volume: 0.5,
    loop: true,
  },
];

/**
 * Hook para transiciones musicales automáticas basadas en eventos
 */
export const useAdaptiveMusic = () => {
  const [context, setContext] = useState<MusicContext>('menu');
  const [mood, setMood] = useState<MusicMood>('calm');
  const [country, setCountry] = useState<string | undefined>();

  const music = useDynamicMusic({ context, country, mood });

  // Funciones de conveniencia
  const playMenuMusic = () => {
    setContext('menu');
    setMood('calm');
  };

  const playWorldMapMusic = () => {
    setContext('worldmap');
    setMood('energetic');
  };

  const playGameplayMusic = (countryId?: string, intense: boolean = false) => {
    setContext('gameplay');
    setCountry(countryId);
    setMood(intense ? 'tense' : 'energetic');
  };

  const playVictoryMusic = () => {
    setContext('victory');
    setMood('triumphant');
  };

  const playDefeatMusic = () => {
    setContext('defeat');
    setMood('melancholic');
  };

  const playDetectiveMusic = () => {
    setContext('detective');
    setMood('tense');
  };

  const playJournalMusic = () => {
    setContext('journal');
    setMood('calm');
  };

  return {
    ...music,
    playMenuMusic,
    playWorldMapMusic,
    playGameplayMusic,
    playVictoryMusic,
    playDefeatMusic,
    playDetectiveMusic,
    playJournalMusic,
  };
};

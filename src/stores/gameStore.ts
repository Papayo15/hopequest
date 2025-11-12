/**
 * Game Store - Zustand
 * Maneja el estado principal del juego
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Country, FamilyCharacter } from '../types';

interface GameState {
  // Estado del juego
  currentCountry: Country | null;
  currentCountryId: string | null;
  isGameActive: boolean;
  isPaused: boolean;
  gameMode: 'adventure' | 'physics' | null;

  // Progreso
  completedCountries: string[]; // IDs de países completados
  unlockedHelpers: FamilyCharacter[]; // Personajes desbloqueados
  totalStars: number;
  currentLevel: number; // Nivel del jugador (1-35)

  // Configuración
  difficulty: 'auto' | 'easy' | 'normal' | 'hard';
  language: 'es' | 'en' | 'zh' | 'hi' | 'ar';
  soundEnabled: boolean;
  musicEnabled: boolean;

  // Loading
  isLoading: boolean;
  loadingMessage: string;

  // Actions
  setCurrentCountry: (country: Country | null) => void;
  setCurrentCountryId: (id: string | null) => void;
  setGameMode: (mode: 'adventure' | 'physics' | null) => void;
  completeCountry: (countryId: string, stars: number) => void;
  unlockHelper: (helper: FamilyCharacter) => void;
  setDifficulty: (difficulty: 'auto' | 'easy' | 'normal' | 'hard') => void;
  setLanguage: (lang: 'es' | 'en' | 'zh' | 'hi' | 'ar') => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  setLoading: (isLoading: boolean, message?: string) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
}

const initialState = {
  currentCountry: null,
  currentCountryId: null,
  isGameActive: false,
  isPaused: false,
  gameMode: null,
  completedCountries: [],
  unlockedHelpers: ['marco', 'xolo'] as FamilyCharacter[], // Empiezan con Marco y Xolo
  totalStars: 0,
  currentLevel: 1,
  difficulty: 'auto' as const,
  language: 'es' as const,
  soundEnabled: true,
  musicEnabled: true,
  isLoading: false,
  loadingMessage: '',
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentCountry: (country) =>
        set({ currentCountry: country, currentCountryId: country?.id || null }),

      setCurrentCountryId: (id) =>
        set({ currentCountryId: id }),

      setGameMode: (mode) =>
        set({ gameMode: mode, isGameActive: mode !== null }),

      completeCountry: (countryId, stars) => {
        const state = get();
        if (!state.completedCountries.includes(countryId)) {
          set({
            completedCountries: [...state.completedCountries, countryId],
            totalStars: state.totalStars + stars,
            currentLevel: state.currentLevel + 1,
          });
        }
      },

      unlockHelper: (helper) => {
        const state = get();
        if (!state.unlockedHelpers.includes(helper)) {
          set({
            unlockedHelpers: [...state.unlockedHelpers, helper],
          });
        }
      },

      setDifficulty: (difficulty) =>
        set({ difficulty }),

      setLanguage: (language) =>
        set({ language }),

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      toggleMusic: () =>
        set((state) => ({ musicEnabled: !state.musicEnabled })),

      setLoading: (isLoading, message = '') =>
        set({ isLoading, loadingMessage: message }),

      pauseGame: () =>
        set({ isPaused: true }),

      resumeGame: () =>
        set({ isPaused: false }),

      resetGame: () =>
        set({ ...initialState }),
    }),
    {
      name: 'hope-quest-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Solo persistir ciertos campos
      partialize: (state) => ({
        completedCountries: state.completedCountries,
        unlockedHelpers: state.unlockedHelpers,
        totalStars: state.totalStars,
        currentLevel: state.currentLevel,
        difficulty: state.difficulty,
        language: state.language,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
      }),
    }
  )
);

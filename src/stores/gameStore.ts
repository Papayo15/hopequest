/**
 * Game Store - Zustand
 * Maneja el estado principal del juego
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Country, FamilyCharacter } from '../types';
import { achievementService, GameStats } from '../services/achievements/achievementService';
import { getStorage } from '../utils/storage';

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

  // Achievement tracking
  portalsUsed: number; // Total de portales usados
  activitiesCompleted: number; // Total de actividades completadas
  perfectActivities: number; // Actividades con 100%
  triviaCorrect: number; // Respuestas correctas de trivia

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

  // Achievement tracking actions
  incrementPortalsUsed: () => void;
  incrementActivitiesCompleted: (isPerfect: boolean) => void;
  incrementTriviaCorrect: () => void;
  checkAchievements: () => void; // Verifica y actualiza achievements basado en stats actuales
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
  portalsUsed: 0,
  activitiesCompleted: 0,
  perfectActivities: 0,
  triviaCorrect: 0,
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
          // Verificar achievements después de completar país
          get().checkAchievements();
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

      // Achievement tracking actions
      incrementPortalsUsed: () => {
        set((state) => ({ portalsUsed: state.portalsUsed + 1 }));
        get().checkAchievements();
      },

      incrementActivitiesCompleted: (isPerfect) => {
        set((state) => ({
          activitiesCompleted: state.activitiesCompleted + 1,
          perfectActivities: isPerfect ? state.perfectActivities + 1 : state.perfectActivities,
        }));
        get().checkAchievements();
      },

      incrementTriviaCorrect: () => {
        set((state) => ({ triviaCorrect: state.triviaCorrect + 1 }));
        get().checkAchievements();
      },

      // Verificar achievements con stats actuales
      checkAchievements: () => {
        const state = get();
        const stats: GameStats = {
          countriesCompleted: state.completedCountries.length,
          totalStars: state.totalStars,
          portalsUsed: state.portalsUsed,
          activitiesCompleted: state.activitiesCompleted,
          perfectActivities: state.perfectActivities,
          companionsMet: state.unlockedHelpers.length,
          currentMoney: 0, // TODO: agregar currentMoney al gameStore si no existe
          triviaCorrect: state.triviaCorrect,
        };
        achievementService.checkAchievements(stats);
      },
    }),
    {
      name: 'hope-quest-game-storage',
      storage: createJSONStorage(() => getStorage()),
      // Solo persistir ciertos campos
      partialize: (state) => ({
        completedCountries: state.completedCountries,
        unlockedHelpers: state.unlockedHelpers,
        totalStars: state.totalStars,
        currentLevel: state.currentLevel,
        portalsUsed: state.portalsUsed,
        activitiesCompleted: state.activitiesCompleted,
        perfectActivities: state.perfectActivities,
        triviaCorrect: state.triviaCorrect,
        difficulty: state.difficulty,
        language: state.language,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
      }),
    }
  )
);

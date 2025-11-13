/**
 * Easter Egg Store - Zustand
 * Rastrea los easter eggs descubiertos por el jugador
 * Secretos divertidos y educativos para niños de 5-12 años
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type EasterEggId =
  | 'dancing_xolo'         // Tocar 10 veces a Xolo → baila
  | 'shooting_star'        // Atrapar estrella fugaz de noche
  | 'giant_xolo_helper'    // Xolo gigante ayuda si pierdes 5 veces
  | 'rainbow_mode'         // Tocar países en orden de colores
  | 'birthday_surprise'    // Jugar en tu cumpleaños
  | 'emoji_language'       // Cambiar idioma 10 veces
  | 'rainbow_portal'       // Completar 5 países seguidos sin perder estrellas
  | 'secret_moon_level'    // Completar 35 países con 3 estrellas en todo
  | 'family_photo'         // Tener todos los personajes y completar 10 países
  | 'secret_dance_party';  // Tocar todos los personajes en orden

interface EasterEgg {
  id: EasterEggId;
  discovered: boolean;
  discoveredAt?: Date;
  timesTriggered: number;
}

interface EasterEggState {
  // Easter eggs descubiertos
  easterEggs: Record<EasterEggId, EasterEgg>;

  // Contadores para desbloquear easter eggs
  xoloTapCount: number; // Para dancing_xolo
  languageChangeCount: number; // Para emoji_language
  consecutivePerfectCountries: number; // Para rainbow_portal
  currentLevelFailCount: string; // "countryId:failCount" para giant_xolo_helper

  // Actions
  discoverEasterEgg: (id: EasterEggId) => void;
  triggerEasterEgg: (id: EasterEggId) => void;
  isDiscovered: (id: EasterEggId) => boolean;
  incrementXoloTap: () => number;
  resetXoloTap: () => void;
  incrementLanguageChange: () => number;
  incrementPerfectCountry: () => void;
  resetPerfectCountry: () => void;
  incrementLevelFail: (countryId: string) => number;
  resetLevelFail: () => void;
  getTotalDiscovered: () => number;
  reset: () => void;
}

const initialEasterEggs: Record<EasterEggId, EasterEgg> = {
  dancing_xolo: { id: 'dancing_xolo', discovered: false, timesTriggered: 0 },
  shooting_star: { id: 'shooting_star', discovered: false, timesTriggered: 0 },
  giant_xolo_helper: { id: 'giant_xolo_helper', discovered: false, timesTriggered: 0 },
  rainbow_mode: { id: 'rainbow_mode', discovered: false, timesTriggered: 0 },
  birthday_surprise: { id: 'birthday_surprise', discovered: false, timesTriggered: 0 },
  emoji_language: { id: 'emoji_language', discovered: false, timesTriggered: 0 },
  rainbow_portal: { id: 'rainbow_portal', discovered: false, timesTriggered: 0 },
  secret_moon_level: { id: 'secret_moon_level', discovered: false, timesTriggered: 0 },
  family_photo: { id: 'family_photo', discovered: false, timesTriggered: 0 },
  secret_dance_party: { id: 'secret_dance_party', discovered: false, timesTriggered: 0 },
};

const initialState = {
  easterEggs: initialEasterEggs,
  xoloTapCount: 0,
  languageChangeCount: 0,
  consecutivePerfectCountries: 0,
  currentLevelFailCount: '',
};

export const useEasterEggStore = create<EasterEggState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Descubrir un easter egg (primera vez)
      discoverEasterEgg: (id) => {
        set((state) => {
          if (state.easterEggs[id].discovered) {
            return state; // Ya descubierto
          }

          return {
            easterEggs: {
              ...state.easterEggs,
              [id]: {
                ...state.easterEggs[id],
                discovered: true,
                discoveredAt: new Date(),
                timesTriggered: state.easterEggs[id].timesTriggered + 1,
              },
            },
          };
        });
      },

      // Activar un easter egg (puede ser múltiples veces)
      triggerEasterEgg: (id) => {
        set((state) => ({
          easterEggs: {
            ...state.easterEggs,
            [id]: {
              ...state.easterEggs[id],
              timesTriggered: state.easterEggs[id].timesTriggered + 1,
            },
          },
        }));
      },

      // Verificar si está descubierto
      isDiscovered: (id) => {
        return get().easterEggs[id].discovered;
      },

      // Incrementar contador de taps en Xolo
      incrementXoloTap: () => {
        const newCount = get().xoloTapCount + 1;
        set({ xoloTapCount: newCount });
        return newCount;
      },

      resetXoloTap: () => {
        set({ xoloTapCount: 0 });
      },

      // Incrementar contador de cambios de idioma
      incrementLanguageChange: () => {
        const newCount = get().languageChangeCount + 1;
        set({ languageChangeCount: newCount });
        return newCount;
      },

      // Contador de países perfectos consecutivos
      incrementPerfectCountry: () => {
        set((state) => ({
          consecutivePerfectCountries: state.consecutivePerfectCountries + 1,
        }));
      },

      resetPerfectCountry: () => {
        set({ consecutivePerfectCountries: 0 });
      },

      // Contador de fallos en nivel actual
      incrementLevelFail: (countryId) => {
        const { currentLevelFailCount } = get();
        const [currentCountryId, countStr] = currentLevelFailCount.split(':');

        if (currentCountryId === countryId) {
          // Mismo nivel, incrementar
          const newCount = parseInt(countStr || '0', 10) + 1;
          set({ currentLevelFailCount: `${countryId}:${newCount}` });
          return newCount;
        } else {
          // Nivel diferente, resetear
          set({ currentLevelFailCount: `${countryId}:1` });
          return 1;
        }
      },

      resetLevelFail: () => {
        set({ currentLevelFailCount: '' });
      },

      // Obtener total de easter eggs descubiertos
      getTotalDiscovered: () => {
        return Object.values(get().easterEggs).filter((egg) => egg.discovered).length;
      },

      // Resetear todo
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'hope-quest-easteregg-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        easterEggs: state.easterEggs,
      }),
    }
  )
);

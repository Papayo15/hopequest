/**
 * User Store - Zustand
 * Maneja información del usuario y progreso global
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ProtagonistGender } from '../constants/gameConfig';

interface UserState {
  // Información del usuario
  userId: string | null;
  username: string;
  email: string | null;
  age: number | null;
  avatar: string | null;

  // NUEVO: Sistema de personaje protagonista
  protagonistGender: ProtagonistGender | null; // 'boy' o 'girl'
  protagonistName: string | null; // Nombre custom del protagonista
  companionName: string; // Nombre del personaje encontrado (automático: Pepe o Paula)
  companionDiscovered: boolean; // Si ya descubrió al compañero en la ruta
  isabellaDiscovered: boolean; // Si ya descubrió a Isabella (niña adoptada)

  // Progreso
  createdAt: Date | null;
  lastPlayed: Date | null;
  totalPlayTime: number; // segundos
  totalSessions: number;

  // Configuración
  parentalControlsEnabled: boolean;
  parentalPin: string | null;
  contentSensitivityLevel: 1 | 2 | 3 | 4 | 5; // Máximo nivel permitido

  // Estadísticas
  achievements: Achievement[];
  favoriteHelper: string | null;

  // Actions
  setUser: (data: Partial<UserData>) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  setProtagonist: (gender: ProtagonistGender, name: string) => void; // NUEVO
  discoverCompanion: () => void; // NUEVO
  discoverIsabella: () => void; // NUEVO
  incrementPlayTime: (seconds: number) => void;
  incrementSessions: () => void;
  setParentalControls: (enabled: boolean, pin?: string) => void;
  setContentLevel: (level: 1 | 2 | 3 | 4 | 5) => void;
  unlockAchievement: (achievement: Achievement) => void;
  logout: () => void;
}

interface UserData {
  userId: string;
  username: string;
  email: string;
  age: number;
  avatar: string;
}

interface ProfileData {
  username: string;
  age: number;
  avatar: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

const initialState = {
  userId: null,
  username: 'Jugador',
  email: null,
  age: null,
  avatar: null,
  // NUEVO: Sistema de personajes
  protagonistGender: null,
  protagonistName: null,
  companionName: '', // Se define cuando se establece el género
  companionDiscovered: false,
  isabellaDiscovered: false,
  createdAt: null,
  lastPlayed: null,
  totalPlayTime: 0,
  totalSessions: 0,
  parentalControlsEnabled: true, // Activado por defecto
  parentalPin: null,
  contentSensitivityLevel: 3 as const, // Nivel medio por defecto
  achievements: [],
  favoriteHelper: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (data) =>
        set({
          userId: data.userId || get().userId,
          username: data.username || get().username,
          email: data.email || get().email,
          age: data.age || get().age,
          avatar: data.avatar || get().avatar,
          createdAt: get().createdAt || new Date(),
          lastPlayed: new Date(),
        }),

      updateProfile: (data) =>
        set({
          username: data.username || get().username,
          age: data.age || get().age,
          avatar: data.avatar || get().avatar,
        }),

      // NUEVO: Establecer protagonista (niño/niña con nombre)
      setProtagonist: (gender, name) =>
        set({
          protagonistGender: gender,
          protagonistName: name,
          // Automáticamente asignar el nombre del compañero según el género
          companionName: gender === 'boy' ? 'Paula' : 'Pepe',
        }),

      // NUEVO: Descubrir al compañero durante la ruta
      discoverCompanion: () =>
        set({ companionDiscovered: true }),

      // NUEVO: Descubrir a Isabella (niña adoptada)
      discoverIsabella: () =>
        set({ isabellaDiscovered: true }),

      incrementPlayTime: (seconds) =>
        set((state) => ({
          totalPlayTime: state.totalPlayTime + seconds,
          lastPlayed: new Date(),
        })),

      incrementSessions: () =>
        set((state) => ({
          totalSessions: state.totalSessions + 1,
          lastPlayed: new Date(),
        })),

      setParentalControls: (enabled, pin) =>
        set({
          parentalControlsEnabled: enabled,
          parentalPin: pin || get().parentalPin,
        }),

      setContentLevel: (level) =>
        set({ contentSensitivityLevel: level }),

      unlockAchievement: (achievement) => {
        const achievements = get().achievements;
        if (!achievements.find((a) => a.id === achievement.id)) {
          set({
            achievements: [
              ...achievements,
              { ...achievement, unlockedAt: new Date() },
            ],
          });
        }
      },

      logout: () =>
        set({
          userId: null,
          email: null,
          lastPlayed: new Date(),
        }),
    }),
    {
      name: 'hope-quest-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

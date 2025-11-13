/**
 * Enemy Store
 * Gestiona el estado de los enemigos educativos
 * Usa Zustand con persistencia en AsyncStorage
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnemyType, EnemyState } from '../types/enemies';

interface EnemyStoreState extends EnemyState {
  // Acciones
  defeatEnemy: (enemyType: EnemyType) => void;
  resetLevelEnemies: () => void;
  addLevelEnemy: (enemyId: string) => void;
  removeLevelEnemy: (enemyId: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  getEnemyStats: (enemyType: EnemyType) => number;
  getTotalStats: () => {
    total: number;
    byType: Record<EnemyType, number>;
    streak: number;
  };
}

const initialState: EnemyState = {
  enemiesDefeated: {
    ignorance: 0,
    prejudice: 0,
    bureaucracy: 0,
    misinformation: 0,
    language_barrier: 0,
    homesickness: 0,
  },
  totalEnemiesDefeated: 0,
  currentLevelEnemies: [],
  defeatStreak: 0,
};

export const useEnemyStore = create<EnemyStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      defeatEnemy: (enemyType: EnemyType) => {
        set((state) => ({
          enemiesDefeated: {
            ...state.enemiesDefeated,
            [enemyType]: state.enemiesDefeated[enemyType] + 1,
          },
          totalEnemiesDefeated: state.totalEnemiesDefeated + 1,
        }));
      },

      resetLevelEnemies: () => {
        set({ currentLevelEnemies: [] });
      },

      addLevelEnemy: (enemyId: string) => {
        set((state) => ({
          currentLevelEnemies: [...state.currentLevelEnemies, enemyId],
        }));
      },

      removeLevelEnemy: (enemyId: string) => {
        set((state) => ({
          currentLevelEnemies: state.currentLevelEnemies.filter(
            (id) => id !== enemyId
          ),
        }));
      },

      incrementStreak: () => {
        set((state) => ({
          defeatStreak: state.defeatStreak + 1,
        }));
      },

      resetStreak: () => {
        set({ defeatStreak: 0 });
      },

      getEnemyStats: (enemyType: EnemyType) => {
        return get().enemiesDefeated[enemyType];
      },

      getTotalStats: () => {
        const state = get();
        return {
          total: state.totalEnemiesDefeated,
          byType: state.enemiesDefeated,
          streak: state.defeatStreak,
        };
      },
    }),
    {
      name: 'hope-quest-enemies',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

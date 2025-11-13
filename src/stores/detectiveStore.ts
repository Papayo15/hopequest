/**
 * Detective Store
 * Gestiona el estado del modo detective (Carmen Sandiego style)
 * Usa Zustand con persistencia en AsyncStorage
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DetectiveModeState } from '../types/detective';

interface DetectiveStoreState extends DetectiveModeState {
  // Acciones
  startCase: (caseId: string) => void;
  completeCase: (caseId: string) => void;
  collectClue: (caseId: string, clueId: string) => void;
  isClueCollected: (caseId: string, clueId: string) => boolean;
  getCaseProgress: (caseId: string) => {
    collected: number;
    total: number;
    percentage: number;
  };
  awardBadge: (badge: string) => void;
  resetCase: () => void;
}

const initialState: DetectiveModeState = {
  activeCaseId: null,
  completedCases: [],
  collectedClues: {},
  badges: [],
  totalCasesSolved: 0,
};

export const useDetectiveStore = create<DetectiveStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      startCase: (caseId: string) => {
        set({
          activeCaseId: caseId,
          collectedClues: {
            ...get().collectedClues,
            [caseId]: [],
          },
        });
      },

      completeCase: (caseId: string) => {
        const state = get();
        if (!state.completedCases.includes(caseId)) {
          set({
            completedCases: [...state.completedCases, caseId],
            totalCasesSolved: state.totalCasesSolved + 1,
            activeCaseId: null,
          });
        }
      },

      collectClue: (caseId: string, clueId: string) => {
        const state = get();
        const caseClues = state.collectedClues[caseId] || [];

        if (!caseClues.includes(clueId)) {
          set({
            collectedClues: {
              ...state.collectedClues,
              [caseId]: [...caseClues, clueId],
            },
          });
        }
      },

      isClueCollected: (caseId: string, clueId: string) => {
        const state = get();
        const caseClues = state.collectedClues[caseId] || [];
        return caseClues.includes(clueId);
      },

      getCaseProgress: (caseId: string) => {
        const state = get();
        const collected = (state.collectedClues[caseId] || []).length;

        // Obtener el total de pistas del caso (necesitarías importar DETECTIVE_CASES)
        // Por ahora, asumimos 3 pistas por caso
        const total = 3;

        return {
          collected,
          total,
          percentage: Math.round((collected / total) * 100),
        };
      },

      awardBadge: (badge: string) => {
        const state = get();
        if (!state.badges.includes(badge)) {
          set({
            badges: [...state.badges, badge],
          });
        }
      },

      resetCase: () => {
        set({
          activeCaseId: null,
        });
      },
    }),
    {
      name: 'hope-quest-detective',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

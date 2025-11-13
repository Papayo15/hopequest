/**
 * Travel Journal Store
 * Gestiona el estado del diario de viaje
 * Usa Zustand con persistencia en AsyncStorage
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TravelJournalState, JournalEntry, Memory } from '../types/journal';

interface JournalStoreState extends TravelJournalState {
  // Acciones
  addEntry: (countryId: string, countryName: string, countryFlag: string) => void;
  updateEntry: (countryId: string, updates: Partial<JournalEntry>) => void;
  addMemory: (countryId: string, memory: Memory) => void;
  markCountryComplete: (countryId: string) => void;
  setFavoriteCountry: (countryId: string) => void;
  addNotes: (countryId: string, notes: string) => void;
  updateStats: (
    countryId: string,
    stats: Partial<JournalEntry['stats']>
  ) => void;
  getEntry: (countryId: string) => JournalEntry | undefined;
  getAllEntries: () => JournalEntry[];
  getGlobalStats: () => TravelJournalState['globalStats'];
}

const initialState: TravelJournalState = {
  entries: {},
  totalCountriesVisited: 0,
  totalMemoriesCollected: 0,
  totalFactsLearned: 0,
  totalTimeSpent: 0,
  favoriteCountry: null,
  globalStats: {
    mostVisitedCountry: '',
    fastestCompletion: '',
    highestScore: '',
    rareMemoriesCount: 0,
    legendaryMemoriesCount: 0,
  },
};

export const useJournalStore = create<JournalStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addEntry: (countryId: string, countryName: string, countryFlag: string) => {
        const state = get();
        if (state.entries[countryId]) {
          return; // Ya existe la entrada
        }

        const newEntry: JournalEntry = {
          id: `entry_${countryId}_${Date.now()}`,
          countryId,
          countryName,
          countryFlag,
          visitDate: new Date(),
          completed: false,
          memories: [],
          stats: {
            levelsCompleted: 0,
            starsEarned: 0,
            timeSpent: 0,
            factsLearned: 0,
          },
          isFavorite: false,
        };

        set({
          entries: {
            ...state.entries,
            [countryId]: newEntry,
          },
          totalCountriesVisited: state.totalCountriesVisited + 1,
        });
      },

      updateEntry: (countryId: string, updates: Partial<JournalEntry>) => {
        const state = get();
        const entry = state.entries[countryId];
        if (!entry) return;

        set({
          entries: {
            ...state.entries,
            [countryId]: {
              ...entry,
              ...updates,
            },
          },
        });
      },

      addMemory: (countryId: string, memory: Memory) => {
        const state = get();
        const entry = state.entries[countryId];
        if (!entry) return;

        // Verificar si ya tiene este recuerdo
        const hasMemory = entry.memories.some((m) => m.id === memory.id);
        if (hasMemory) return;

        const updatedMemories = [...entry.memories, memory];

        // Actualizar contadores de rareza
        let rareCount = state.globalStats.rareMemoriesCount;
        let legendaryCount = state.globalStats.legendaryMemoriesCount;

        if (memory.rarity === 'rare') rareCount++;
        if (memory.rarity === 'legendary') legendaryCount++;

        set({
          entries: {
            ...state.entries,
            [countryId]: {
              ...entry,
              memories: updatedMemories,
            },
          },
          totalMemoriesCollected: state.totalMemoriesCollected + 1,
          globalStats: {
            ...state.globalStats,
            rareMemoriesCount: rareCount,
            legendaryMemoriesCount: legendaryCount,
          },
        });
      },

      markCountryComplete: (countryId: string) => {
        const state = get();
        const entry = state.entries[countryId];
        if (!entry) return;

        set({
          entries: {
            ...state.entries,
            [countryId]: {
              ...entry,
              completed: true,
            },
          },
        });
      },

      setFavoriteCountry: (countryId: string) => {
        const state = get();

        // Remover favorito anterior
        const updatedEntries = { ...state.entries };
        Object.keys(updatedEntries).forEach((id) => {
          updatedEntries[id].isFavorite = id === countryId;
        });

        set({
          entries: updatedEntries,
          favoriteCountry: countryId,
        });
      },

      addNotes: (countryId: string, notes: string) => {
        const state = get();
        const entry = state.entries[countryId];
        if (!entry) return;

        set({
          entries: {
            ...state.entries,
            [countryId]: {
              ...entry,
              notes,
            },
          },
        });
      },

      updateStats: (
        countryId: string,
        stats: Partial<JournalEntry['stats']>
      ) => {
        const state = get();
        const entry = state.entries[countryId];
        if (!entry) return;

        const updatedStats = {
          ...entry.stats,
          ...stats,
        };

        // Actualizar tiempo total
        const timeDiff = (stats.timeSpent || 0) - entry.stats.timeSpent;
        const newTotalTime = state.totalTimeSpent + timeDiff;

        // Actualizar facts totales
        const factsDiff = (stats.factsLearned || 0) - entry.stats.factsLearned;
        const newTotalFacts = state.totalFactsLearned + factsDiff;

        set({
          entries: {
            ...state.entries,
            [countryId]: {
              ...entry,
              stats: updatedStats,
            },
          },
          totalTimeSpent: newTotalTime,
          totalFactsLearned: newTotalFacts,
        });
      },

      getEntry: (countryId: string) => {
        return get().entries[countryId];
      },

      getAllEntries: () => {
        return Object.values(get().entries);
      },

      getGlobalStats: () => {
        return get().globalStats;
      },
    }),
    {
      name: 'hope-quest-journal',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

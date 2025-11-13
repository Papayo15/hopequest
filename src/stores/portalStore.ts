/**
 * Portal Store - Zustand
 * Maneja el sistema de portales de migración
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  PortalType,
  PortalTransition,
  PortalTransitionPhase,
  MigrationPortal,
  PortalRoute,
  PackingItem,
} from '../types';

interface PortalState {
  // Estado actual
  currentTransition: PortalTransition | null;
  currentPhase: PortalTransitionPhase | null;
  isInPortal: boolean;

  // Portales desbloqueados
  unlockedPortals: PortalType[];

  // Historial
  portalsUsed: PortalUsageHistory[];
  totalPortalsUsed: number;

  // Portal actual (preparación)
  selectedPortal: MigrationPortal | null;
  selectedRoute: PortalRoute | null;
  selectedItems: PackingItem[];
  currentWeight: number;
  currentVolume: number;

  // Actions - Navegación de portales
  selectPortal: (portal: MigrationPortal) => void;
  selectRoute: (route: PortalRoute) => void;
  startTransition: () => void;
  setPhase: (phase: PortalTransitionPhase) => void;
  completeTransition: (outcome: 'success' | 'failure' | 'partial') => void;
  cancelTransition: () => void;

  // Actions - Packing
  addItem: (item: PackingItem) => boolean; // Returns false if no space
  removeItem: (itemId: string) => void;
  clearItems: () => void;
  canPackItem: (item: PackingItem, maxWeight: number, maxVolume: number) => boolean;

  // Actions - Portales
  unlockPortal: (portal: PortalType) => void;
  isPortalUnlocked: (portal: PortalType) => boolean;

  // Utilidades
  getPortalStats: () => PortalStats;
  reset: () => void;
}

interface PortalUsageHistory {
  id: string;
  portalType: PortalType;
  fromCountry: string;
  toCountry: string;
  outcome: 'success' | 'failure' | 'partial';
  itemsPacked: string[]; // IDs
  // SIN money - todo es gratis
  healthChange: number;
  moralChange: number;
  timestamp: Date;
}

interface PortalStats {
  mostUsedPortal: PortalType | null;
  successRate: number; // 0-1
  // SIN totalMoneySpent - todo es gratis
  averageItemsPacked: number;
}

const initialState = {
  currentTransition: null,
  currentPhase: null,
  isInPortal: false,
  unlockedPortals: ['caminando'] as PortalType[], // Portal "caminando" 🚶 disponible desde el inicio (GRATIS)
  portalsUsed: [],
  totalPortalsUsed: 0,
  selectedPortal: null,
  selectedRoute: null,
  selectedItems: [],
  currentWeight: 0,
  currentVolume: 0,
};

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navegación de portales
      selectPortal: (portal) =>
        set({
          selectedPortal: portal,
          selectedItems: [],
          currentWeight: 0,
          currentVolume: 0,
        }),

      selectRoute: (route) =>
        set({ selectedRoute: route }),

      startTransition: () => {
        const { selectedPortal, selectedRoute, selectedItems } = get();
        if (!selectedPortal || !selectedRoute) return;

        const transition: PortalTransition = {
          portal: selectedPortal,
          route: selectedRoute,
          packedItems: selectedItems,
          phase: 'preparation',
          startTime: new Date(),
          estimatedEndTime: new Date(Date.now() + selectedPortal.costs.time * 24 * 60 * 60 * 1000),
        };

        set({
          currentTransition: transition,
          currentPhase: 'preparation',
          isInPortal: true,
        });
      },

      setPhase: (phase) =>
        set((state) => ({
          currentPhase: phase,
          currentTransition: state.currentTransition
            ? { ...state.currentTransition, phase }
            : null,
        })),

      completeTransition: (outcome) => {
        const { currentTransition, portalsUsed, selectedItems } = get();
        if (!currentTransition) return;

        const history: PortalUsageHistory = {
          id: Date.now().toString(),
          portalType: currentTransition.portal.type,
          fromCountry: currentTransition.route.fromCountry,
          toCountry: currentTransition.route.toCountry,
          outcome,
          itemsPacked: selectedItems.map((item) => item.id),
          // SIN moneySpent - todo es gratis
          healthChange: 0, // Se calculará según outcome
          moralChange: currentTransition.portal.costs.emotional || 0,
          timestamp: new Date(),
        };

        set({
          portalsUsed: [...portalsUsed, history],
          totalPortalsUsed: portalsUsed.length + 1,
          currentTransition: null,
          currentPhase: null,
          isInPortal: false,
          selectedPortal: null,
          selectedRoute: null,
          selectedItems: [],
          currentWeight: 0,
          currentVolume: 0,
        });
      },

      cancelTransition: () =>
        set({
          currentTransition: null,
          currentPhase: null,
          isInPortal: false,
        }),

      // Packing
      addItem: (item) => {
        const { selectedItems, selectedPortal } = get();
        if (!selectedPortal) return false;

        const newWeight = get().currentWeight + item.weight;
        const newVolume = get().currentVolume + item.volume;

        const maxWeight = selectedPortal.costs.money >= 500 ? 30 : 20; // Simplificado
        const maxVolume = selectedPortal.costs.money >= 500 ? 50 : 35;

        if (newWeight <= maxWeight && newVolume <= maxVolume) {
          set({
            selectedItems: [...selectedItems, item],
            currentWeight: newWeight,
            currentVolume: newVolume,
          });
          return true;
        }
        return false;
      },

      removeItem: (itemId) => {
        const { selectedItems } = get();
        const item = selectedItems.find((i) => i.id === itemId);
        if (item) {
          set({
            selectedItems: selectedItems.filter((i) => i.id !== itemId),
            currentWeight: get().currentWeight - item.weight,
            currentVolume: get().currentVolume - item.volume,
          });
        }
      },

      clearItems: () =>
        set({
          selectedItems: [],
          currentWeight: 0,
          currentVolume: 0,
        }),

      canPackItem: (item, maxWeight, maxVolume) => {
        const newWeight = get().currentWeight + item.weight;
        const newVolume = get().currentVolume + item.volume;
        return newWeight <= maxWeight && newVolume <= maxVolume;
      },

      // Portales
      unlockPortal: (portal) => {
        const portals = get().unlockedPortals;
        if (!portals.includes(portal)) {
          set({ unlockedPortals: [...portals, portal] });
        }
      },

      isPortalUnlocked: (portal) =>
        get().unlockedPortals.includes(portal),

      // Utilidades
      getPortalStats: () => {
        const { portalsUsed } = get();

        if (portalsUsed.length === 0) {
          return {
            mostUsedPortal: null,
            successRate: 0,
            averageItemsPacked: 0,
          };
        }

        // Most used portal
        const portalCounts: { [key in PortalType]?: number } = {};
        portalsUsed.forEach((usage) => {
          portalCounts[usage.portalType] = (portalCounts[usage.portalType] || 0) + 1;
        });
        const mostUsedPortal = Object.entries(portalCounts).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )[0] as PortalType;

        // Success rate
        const successCount = portalsUsed.filter((u) => u.outcome === 'success').length;
        const successRate = successCount / portalsUsed.length;

        // Average items packed
        const averageItemsPacked =
          portalsUsed.reduce((sum, u) => sum + u.itemsPacked.length, 0) / portalsUsed.length;

        return {
          mostUsedPortal,
          successRate,
          averageItemsPacked,
        };
      },

      reset: () =>
        set({ ...initialState }),
    }),
    {
      name: 'hope-quest-portal-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        unlockedPortals: state.unlockedPortals,
        portalsUsed: state.portalsUsed,
        totalPortalsUsed: state.totalPortalsUsed,
      }),
    }
  )
);

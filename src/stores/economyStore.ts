/**
 * Economy Store - Zustand
 * Maneja el sistema de economía del juego: dinero, documentos, salud, moral
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getStorage } from '../utils/storage';
import type { DocumentType } from '../types';

interface EconomyState {
  // Recursos
  money: number; // Dinero actual
  health: number; // Salud (0-100)
  moral: number; // Moral/ánimo (0-100)

  // Documentos
  documents: DocumentType[]; // Documentos que posee el jugador

  // Inventario
  packedItems: string[]; // IDs de items empacados en la última migración

  // Historial
  transactions: Transaction[];
  maxMoney: number; // Dinero máximo alcanzado
  minHealth: number; // Salud mínima alcanzada
  minMoral: number; // Moral mínima alcanzada

  // Actions - Dinero
  addMoney: (amount: number, reason?: string) => void;
  spendMoney: (amount: number, reason?: string) => boolean;
  setMoney: (amount: number) => void;

  // Actions - Salud
  increaseHealth: (amount: number, reason?: string) => void;
  decreaseHealth: (amount: number, reason?: string) => void;
  setHealth: (amount: number) => void;

  // Actions - Moral
  increaseMoral: (amount: number, reason?: string) => void;
  decreaseMoral: (amount: number, reason?: string) => void;
  setMoral: (amount: number) => void;

  // Actions - Documentos
  addDocument: (doc: DocumentType) => void;
  removeDocument: (doc: DocumentType) => void;
  hasDocument: (doc: DocumentType) => boolean;

  // Actions - Items
  packItem: (itemId: string) => void;
  unpackItem: (itemId: string) => void;
  clearPackedItems: () => void;

  // Utilidades
  canAfford: (amount: number) => boolean;
  getStatus: () => EconomyStatus;
  resetEconomy: () => void;
}

interface Transaction {
  id: string;
  type: 'money' | 'health' | 'moral';
  amount: number;
  reason: string;
  timestamp: Date;
}

interface EconomyStatus {
  moneyStatus: 'wealthy' | 'comfortable' | 'struggling' | 'broke';
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  moralStatus: 'hopeful' | 'optimistic' | 'neutral' | 'discouraged' | 'desperate';
  overallStatus: 'thriving' | 'surviving' | 'struggling' | 'critical';
}

const initialState = {
  money: 500, // Empiezan con ahorros modestos
  health: 100,
  moral: 80, // Optimistas al inicio
  documents: ['passport'] as DocumentType[], // Solo tienen pasaporte al inicio
  packedItems: [],
  transactions: [],
  maxMoney: 500,
  minHealth: 100,
  minMoral: 80,
};

export const useEconomyStore = create<EconomyState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Dinero
      addMoney: (amount, reason = 'Ingreso') => {
        const newMoney = get().money + amount;
        set((state) => ({
          money: newMoney,
          maxMoney: Math.max(state.maxMoney, newMoney),
          transactions: [
            ...state.transactions,
            {
              id: Date.now().toString(),
              type: 'money',
              amount,
              reason,
              timestamp: new Date(),
            },
          ],
        }));
      },

      spendMoney: (amount, reason = 'Gasto') => {
        const currentMoney = get().money;
        if (currentMoney >= amount) {
          set((state) => ({
            money: currentMoney - amount,
            transactions: [
              ...state.transactions,
              {
                id: Date.now().toString(),
                type: 'money',
                amount: -amount,
                reason,
                timestamp: new Date(),
              },
            ],
          }));
          return true;
        }
        return false;
      },

      setMoney: (amount) =>
        set({ money: Math.max(0, amount) }),

      // Salud
      increaseHealth: (amount, reason = 'Recuperación') => {
        const newHealth = Math.min(100, get().health + amount);
        set((state) => ({
          health: newHealth,
          transactions: [
            ...state.transactions,
            {
              id: Date.now().toString(),
              type: 'health',
              amount,
              reason,
              timestamp: new Date(),
            },
          ],
        }));
      },

      decreaseHealth: (amount, reason = 'Daño') => {
        const newHealth = Math.max(0, get().health - amount);
        set((state) => ({
          health: newHealth,
          minHealth: Math.min(state.minHealth, newHealth),
          transactions: [
            ...state.transactions,
            {
              id: Date.now().toString(),
              type: 'health',
              amount: -amount,
              reason,
              timestamp: new Date(),
            },
          ],
        }));
      },

      setHealth: (amount) =>
        set({ health: Math.max(0, Math.min(100, amount)) }),

      // Moral
      increaseMoral: (amount, reason = 'Esperanza') => {
        const newMoral = Math.min(100, get().moral + amount);
        set((state) => ({
          moral: newMoral,
          transactions: [
            ...state.transactions,
            {
              id: Date.now().toString(),
              type: 'moral',
              amount,
              reason,
              timestamp: new Date(),
            },
          ],
        }));
      },

      decreaseMoral: (amount, reason = 'Decepción') => {
        const newMoral = Math.max(0, get().moral - amount);
        set((state) => ({
          moral: newMoral,
          minMoral: Math.min(state.minMoral, newMoral),
          transactions: [
            ...state.transactions,
            {
              id: Date.now().toString(),
              type: 'moral',
              amount: -amount,
              reason,
              timestamp: new Date(),
            },
          ],
        }));
      },

      setMoral: (amount) =>
        set({ moral: Math.max(0, Math.min(100, amount)) }),

      // Documentos
      addDocument: (doc) => {
        const docs = get().documents;
        if (!docs.includes(doc)) {
          set({ documents: [...docs, doc] });
        }
      },

      removeDocument: (doc) =>
        set((state) => ({
          documents: state.documents.filter((d) => d !== doc),
        })),

      hasDocument: (doc) =>
        get().documents.includes(doc),

      // Items
      packItem: (itemId) => {
        const items = get().packedItems;
        if (!items.includes(itemId)) {
          set({ packedItems: [...items, itemId] });
        }
      },

      unpackItem: (itemId) =>
        set((state) => ({
          packedItems: state.packedItems.filter((id) => id !== itemId),
        })),

      clearPackedItems: () =>
        set({ packedItems: [] }),

      // Utilidades
      canAfford: (amount) =>
        get().money >= amount,

      getStatus: () => {
        const { money, health, moral } = get();

        // Money status
        let moneyStatus: EconomyStatus['moneyStatus'];
        if (money >= 1000) moneyStatus = 'wealthy';
        else if (money >= 400) moneyStatus = 'comfortable';
        else if (money >= 100) moneyStatus = 'struggling';
        else moneyStatus = 'broke';

        // Health status
        let healthStatus: EconomyStatus['healthStatus'];
        if (health >= 80) healthStatus = 'excellent';
        else if (health >= 60) healthStatus = 'good';
        else if (health >= 40) healthStatus = 'fair';
        else if (health >= 20) healthStatus = 'poor';
        else healthStatus = 'critical';

        // Moral status
        let moralStatus: EconomyStatus['moralStatus'];
        if (moral >= 80) moralStatus = 'hopeful';
        else if (moral >= 60) moralStatus = 'optimistic';
        else if (moral >= 40) moralStatus = 'neutral';
        else if (moral >= 20) moralStatus = 'discouraged';
        else moralStatus = 'desperate';

        // Overall status (promedio ponderado)
        const avgScore = (money / 1000) * 0.3 + (health / 100) * 0.4 + (moral / 100) * 0.3;
        let overallStatus: EconomyStatus['overallStatus'];
        if (avgScore >= 0.7) overallStatus = 'thriving';
        else if (avgScore >= 0.5) overallStatus = 'surviving';
        else if (avgScore >= 0.3) overallStatus = 'struggling';
        else overallStatus = 'critical';

        return {
          moneyStatus,
          healthStatus,
          moralStatus,
          overallStatus,
        };
      },

      resetEconomy: () =>
        set({ ...initialState }),
    }),
    {
      name: 'hope-quest-economy-storage',
      storage: createJSONStorage(() => getStorage()),
      // Persistir todo excepto transactions (puede crecer mucho)
      partialize: (state) => ({
        money: state.money,
        health: state.health,
        moral: state.moral,
        documents: state.documents,
        packedItems: state.packedItems,
        maxMoney: state.maxMoney,
        minHealth: state.minHealth,
        minMoral: state.minMoral,
      }),
    }
  )
);

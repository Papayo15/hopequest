/**
 * Power-Up Store - Zustand
 * Maneja los power-ups culturales activos del jugador
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CulturalPowerUp, PowerUpType } from '../types/powerups';

interface ActivePowerUp {
  powerUp: CulturalPowerUp;
  activatedAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

interface PowerUpState {
  // Power-ups recolectados (inventario)
  collectedPowerUps: string[]; // IDs de power-ups que el jugador tiene

  // Power-ups activos actualmente
  activePowerUps: ActivePowerUp[];

  // Contador de power-ups usados (para achievements)
  totalPowerUpsUsed: number;

  // Actions
  collectPowerUp: (powerUpId: string) => void;
  activatePowerUp: (powerUp: CulturalPowerUp) => void;
  deactivatePowerUp: (powerUpId: string) => void;
  hasPowerUp: (powerUpId: string) => boolean;
  isPowerUpActive: (type: PowerUpType) => boolean;
  getActivePowerUp: (type: PowerUpType) => ActivePowerUp | null;
  clearExpiredPowerUps: () => void;
  reset: () => void;
}

const initialState = {
  collectedPowerUps: [],
  activePowerUps: [],
  totalPowerUpsUsed: 0,
};

export const usePowerUpStore = create<PowerUpState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Recoger un power-up (agregarlo al inventario)
      collectPowerUp: (powerUpId) => {
        const { collectedPowerUps } = get();
        if (!collectedPowerUps.includes(powerUpId)) {
          set({
            collectedPowerUps: [...collectedPowerUps, powerUpId]
          });
        }
      },

      // Activar un power-up (usarlo)
      activatePowerUp: (powerUp) => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + powerUp.duration * 1000);

        const activePowerUp: ActivePowerUp = {
          powerUp,
          activatedAt: now,
          expiresAt,
          isActive: true,
        };

        set((state) => ({
          activePowerUps: [...state.activePowerUps, activePowerUp],
          totalPowerUpsUsed: state.totalPowerUpsUsed + 1,
        }));

        // Auto-desactivar después del duration (si no es instantáneo)
        if (powerUp.duration > 0) {
          setTimeout(() => {
            get().deactivatePowerUp(powerUp.id);
          }, powerUp.duration * 1000);
        }
      },

      // Desactivar un power-up
      deactivatePowerUp: (powerUpId) => {
        set((state) => ({
          activePowerUps: state.activePowerUps.map((ap) =>
            ap.powerUp.id === powerUpId
              ? { ...ap, isActive: false }
              : ap
          ),
        }));

        // Limpiar después de 1 segundo
        setTimeout(() => {
          set((state) => ({
            activePowerUps: state.activePowerUps.filter(
              (ap) => ap.powerUp.id !== powerUpId
            ),
          }));
        }, 1000);
      },

      // Verificar si tiene un power-up en el inventario
      hasPowerUp: (powerUpId) => {
        return get().collectedPowerUps.includes(powerUpId);
      },

      // Verificar si un tipo de power-up está activo
      isPowerUpActive: (type) => {
        return get().activePowerUps.some(
          (ap) => ap.powerUp.type === type && ap.isActive
        );
      },

      // Obtener power-up activo por tipo
      getActivePowerUp: (type) => {
        return (
          get().activePowerUps.find(
            (ap) => ap.powerUp.type === type && ap.isActive
          ) || null
        );
      },

      // Limpiar power-ups expirados (llamar periódicamente)
      clearExpiredPowerUps: () => {
        const now = new Date();
        set((state) => ({
          activePowerUps: state.activePowerUps.filter(
            (ap) => ap.expiresAt > now
          ),
        }));
      },

      // Resetear todo
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'hope-quest-powerup-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        collectedPowerUps: state.collectedPowerUps,
        totalPowerUpsUsed: state.totalPowerUpsUsed,
      }),
    }
  )
);

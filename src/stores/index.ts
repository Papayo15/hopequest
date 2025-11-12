/**
 * Stores - Barrel Export
 * Exporta todos los Zustand stores
 */

export { useGameStore } from './gameStore';
export { useEconomyStore } from './economyStore';
export { usePortalStore } from './portalStore';
export { useUserStore } from './userStore';

// Re-export tipos útiles
export type { EconomyStatus } from './economyStore';
export type { PortalUsageHistory, PortalStats } from './portalStore';
export type { Achievement } from './userStore';

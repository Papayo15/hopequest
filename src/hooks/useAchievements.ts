/**
 * Achievement Hooks
 * Hook para sincronizar achievementService con los stores de Zustand
 */

import { useEffect, useCallback } from 'react';
import { achievementService, GameStats } from '../services/achievements/achievementService';
import { useUserStore, useGameStore, useEconomyStore } from '../stores';
import { Achievement } from '../constants/achievements';

/**
 * Hook principal para manejar achievements
 * Se debe usar en el componente raíz de la app (después de auth)
 */
export function useAchievementSync() {
  const { achievements, unlockAchievement } = useUserStore();
  const gameState = useGameStore();
  const economyState = useEconomyStore();

  // Inicializar achievementService cuando la app carga
  useEffect(() => {
    // Convertir achievements del userStore al formato de UserAchievement
    const userAchievements = achievements.map((ach) => ({
      achievementId: ach.id,
      unlockedAt: new Date(ach.unlockedAt),
      progress: 100,
      claimed: true, // Si está en userStore, ya fue reclamado
    }));

    achievementService.initialize(userAchievements);

    // Suscribirse a nuevos achievements desbloqueados
    const unsubscribe = achievementService.subscribe((achievement: Achievement) => {
      // Agregar al userStore cuando se desbloquea
      unlockAchievement({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        unlockedAt: new Date(),
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Verificar achievements cada vez que cambien las estadísticas
  useEffect(() => {
    const stats: GameStats = {
      countriesCompleted: gameState.completedCountries.length,
      totalStars: gameState.totalStars,
      portalsUsed: gameState.portalsUsed,
      activitiesCompleted: gameState.activitiesCompleted,
      perfectActivities: gameState.perfectActivities,
      companionsMet: gameState.unlockedHelpers.length - 2, // Restar Marco y Xolo iniciales
      currentMoney: economyState.money,
      triviaCorrect: gameState.triviaCorrect,
    };

    achievementService.checkAchievements(stats);
  }, [
    gameState.completedCountries.length,
    gameState.totalStars,
    gameState.portalsUsed,
    gameState.activitiesCompleted,
    gameState.perfectActivities,
    gameState.unlockedHelpers.length,
    economyState.money,
    gameState.triviaCorrect,
  ]);
}

/**
 * Hook para obtener achievements no reclamados
 */
export function useUnclaimedAchievements() {
  return achievementService.getUnclaimedAchievements();
}

/**
 * Hook para reclamar recompensas de achievement
 */
export function useClaimAchievement() {
  const { addMoney } = useEconomyStore();
  const { unlockAchievement } = useUserStore();

  const claimAchievement = useCallback((achievementId: string) => {
    const rewards = achievementService.claimAchievement(achievementId);

    if (rewards) {
      // Agregar monedas
      if (rewards.coins > 0) {
        addMoney(rewards.coins, `Achievement: ${achievementId}`);
      }

      // Agregar estrellas (si implementas un sistema de estrellas bonus)
      if (rewards.stars && rewards.stars > 0) {
        // TODO: Agregar estrellas bonus si quieres
      }

      // Agregar item especial al inventario
      if (rewards.specialItem) {
        // TODO: Agregar item especial al inventario si implementas uno
      }

      // Actualizar título del jugador
      if (rewards.title) {
        // TODO: Guardar título desbloqueado
      }

      return rewards;
    }

    return null;
  }, [addMoney]);

  return { claimAchievement };
}

/**
 * Hook para obtener estadísticas de achievements
 */
export function useAchievementStats() {
  return achievementService.getAchievementStats();
}

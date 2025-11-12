/**
 * Achievement Service
 * Servicio para tracking y gestión de logros
 */

import {
  Achievement,
  UserAchievement,
  achievements,
  getAchievementById,
} from '@/constants/achievements';
import { audioService } from '@/services/audio/audioService';
import { analyticsService } from '@/services/firebase';

/**
 * Achievement Service Class
 * Manages achievement unlocking, progress tracking, and rewards
 */
class AchievementService {
  private userAchievements: Map<string, UserAchievement> = new Map();
  private listeners: Set<(achievement: Achievement) => void> = new Set();

  /**
   * Initialize with user's achievement data
   */
  initialize(userAchievements: UserAchievement[]): void {
    this.userAchievements.clear();
    userAchievements.forEach((ua) => {
      this.userAchievements.set(ua.achievementId, ua);
    });
  }

  /**
   * Subscribe to achievement unlock events
   */
  subscribe(callback: (achievement: Achievement) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of achievement unlock
   */
  private notify(achievement: Achievement): void {
    this.listeners.forEach((callback) => callback(achievement));
  }

  /**
   * Check if achievement is unlocked
   */
  isUnlocked(achievementId: string): boolean {
    const userAchievement = this.userAchievements.get(achievementId);
    return userAchievement?.progress === 100 && userAchievement?.claimed === false;
  }

  /**
   * Check if achievement is claimed (rewards collected)
   */
  isClaimed(achievementId: string): boolean {
    const userAchievement = this.userAchievements.get(achievementId);
    return userAchievement?.claimed === true;
  }

  /**
   * Get progress for an achievement (0-100)
   */
  getProgress(achievementId: string): number {
    return this.userAchievements.get(achievementId)?.progress || 0;
  }

  /**
   * Get all user achievements
   */
  getAllUserAchievements(): UserAchievement[] {
    return Array.from(this.userAchievements.values());
  }

  /**
   * Get unlocked but unclaimed achievements
   */
  getUnclaimedAchievements(): Achievement[] {
    const unclaimed: Achievement[] = [];

    this.userAchievements.forEach((userAchievement, achievementId) => {
      if (userAchievement.progress === 100 && !userAchievement.claimed) {
        const achievement = getAchievementById(achievementId);
        if (achievement) {
          unclaimed.push(achievement);
        }
      }
    });

    return unclaimed;
  }

  /**
   * Update progress for an achievement
   * Returns true if achievement was newly unlocked
   */
  updateProgress(achievementId: string, currentValue: number): boolean {
    const achievement = getAchievementById(achievementId);
    if (!achievement) return false;

    // Calculate progress percentage
    const progressPercentage = Math.min(
      100,
      Math.floor((currentValue / achievement.requirement.target) * 100)
    );

    // Get current user achievement or create new
    let userAchievement = this.userAchievements.get(achievementId);
    const wasUnlocked = userAchievement?.progress === 100;

    if (!userAchievement) {
      userAchievement = {
        achievementId,
        unlockedAt: new Date(),
        progress: progressPercentage,
        claimed: false,
      };
      this.userAchievements.set(achievementId, userAchievement);
    } else {
      userAchievement.progress = progressPercentage;
      if (progressPercentage === 100 && !wasUnlocked) {
        userAchievement.unlockedAt = new Date();
      }
    }

    // Check if newly unlocked
    const isNewlyUnlocked = progressPercentage === 100 && !wasUnlocked;

    if (isNewlyUnlocked) {
      this.handleAchievementUnlocked(achievement);
    }

    return isNewlyUnlocked;
  }

  /**
   * Handle achievement unlock
   * - Play sound
   * - Log analytics
   * - Notify listeners
   */
  private handleAchievementUnlocked(achievement: Achievement): void {
    // Play achievement SFX
    audioService.playSFX('achievement_unlock');

    // Log to analytics
    analyticsService.logAchievementUnlocked(achievement.id, achievement.name);

    // Notify listeners (for UI notifications)
    this.notify(achievement);

    console.log(`🏆 Achievement unlocked: ${achievement.name}`);
  }

  /**
   * Claim achievement rewards
   * Returns rewards object
   */
  claimAchievement(achievementId: string): {
    coins: number;
    stars: number;
    specialItem?: string;
    title?: string;
  } | null {
    const achievement = getAchievementById(achievementId);
    const userAchievement = this.userAchievements.get(achievementId);

    if (!achievement || !userAchievement) return null;
    if (userAchievement.claimed) return null;
    if (userAchievement.progress < 100) return null;

    // Mark as claimed
    userAchievement.claimed = true;

    // Log claim
    analyticsService.logCustomEvent('achievement_claimed', {
      achievement_id: achievementId,
      achievement_name: achievement.name,
    });

    return {
      coins: achievement.rewards.coins,
      stars: achievement.rewards.stars || 0,
      specialItem: achievement.rewards.specialItem,
      title: achievement.rewards.title,
    };
  }

  /**
   * Check achievements based on game stats
   */
  checkAchievements(stats: GameStats): void {
    // Countries completed
    achievements
      .filter((a) => a.requirement.type === 'countries_completed')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.countriesCompleted);
      });

    // Stars earned
    achievements
      .filter((a) => a.requirement.type === 'stars_earned')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.totalStars);
      });

    // Portals used
    achievements
      .filter((a) => a.requirement.type === 'portals_used')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.portalsUsed);
      });

    // Activities completed
    achievements
      .filter((a) => a.requirement.type === 'activities_completed')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.activitiesCompleted);
      });

    // Perfect activities
    achievements
      .filter((a) => a.requirement.type === 'perfect_activities')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.perfectActivities);
      });

    // Companions met
    achievements
      .filter((a) => a.requirement.type === 'companions_met')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.companionsMet);
      });

    // Money saved
    achievements
      .filter((a) => a.requirement.type === 'money_saved')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.currentMoney);
      });

    // Trivia correct
    achievements
      .filter((a) => a.requirement.type === 'trivia_correct')
      .forEach((achievement) => {
        this.updateProgress(achievement.id, stats.triviaCorrect);
      });
  }

  /**
   * Trigger special achievement
   * For event-based achievements that don't follow stats pattern
   */
  triggerSpecialAchievement(achievementId: string): boolean {
    const achievement = getAchievementById(achievementId);
    if (!achievement || achievement.requirement.type !== 'special_event') {
      return false;
    }

    return this.updateProgress(achievementId, achievement.requirement.target);
  }

  /**
   * Get achievement completion stats
   */
  getAchievementStats(): {
    total: number;
    unlocked: number;
    claimed: number;
    percentage: number;
  } {
    const total = achievements.length;
    let unlocked = 0;
    let claimed = 0;

    this.userAchievements.forEach((ua) => {
      if (ua.progress === 100) unlocked++;
      if (ua.claimed) claimed++;
    });

    return {
      total,
      unlocked,
      claimed,
      percentage: total > 0 ? Math.floor((unlocked / total) * 100) : 0,
    };
  }

  /**
   * Export user achievements for saving
   */
  exportUserAchievements(): UserAchievement[] {
    return Array.from(this.userAchievements.values());
  }
}

/**
 * Game Stats Interface
 * Stats used to check achievement progress
 */
export interface GameStats {
  countriesCompleted: number;
  totalStars: number;
  portalsUsed: number;
  activitiesCompleted: number;
  perfectActivities: number;
  companionsMet: number;
  currentMoney: number;
  triviaCorrect: number;
}

// Singleton instance
export const achievementService = new AchievementService();

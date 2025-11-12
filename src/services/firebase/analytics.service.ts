/**
 * Firebase Analytics Service
 * Tracking de eventos y comportamiento del usuario
 */

import { logEvent as firebaseLogEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { analytics } from './config';

export const analyticsService = {
  // User tracking
  setUser(userId: string, properties?: Record<string, any>): void {
    try {
      setUserId(analytics, userId);
      if (properties) {
        setUserProperties(analytics, properties);
      }
    } catch (error) {
      console.error('Error setting user:', error);
    }
  },

  // Game events
  logLevelStart(countryId: string, levelNumber: number): void {
    try {
      firebaseLogEvent(analytics, 'level_start', {
        country_id: countryId,
        level_number: levelNumber,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging level start:', error);
    }
  },

  logLevelComplete(countryId: string, levelNumber: number, stars: number, timeSpent: number): void {
    try {
      firebaseLogEvent(analytics, 'level_complete', {
        country_id: countryId,
        level_number: levelNumber,
        stars,
        time_spent: timeSpent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging level complete:', error);
    }
  },

  // Portal events
  logPortalSelected(portalType: string, countryFrom: string, countryTo: string): void {
    try {
      firebaseLogEvent(analytics, 'portal_selected', {
        portal_type: portalType,
        country_from: countryFrom,
        country_to: countryTo,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging portal selected:', error);
    }
  },

  logPortalComplete(portalType: string, outcome: 'success' | 'partial' | 'failure', moneySpent: number): void {
    try {
      firebaseLogEvent(analytics, 'portal_complete', {
        portal_type: portalType,
        outcome,
        money_spent: moneySpent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging portal complete:', error);
    }
  },

  // Activity events
  logActivityStart(activityType: string, difficulty: string): void {
    try {
      firebaseLogEvent(analytics, 'activity_start', {
        activity_type: activityType,
        difficulty,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging activity start:', error);
    }
  },

  logActivityComplete(activityType: string, score: number, timeSpent: number): void {
    try {
      firebaseLogEvent(analytics, 'activity_complete', {
        activity_type: activityType,
        score,
        time_spent: timeSpent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging activity complete:', error);
    }
  },

  // Character events
  logCharacterSelected(gender: 'boy' | 'girl', name: string): void {
    try {
      firebaseLogEvent(analytics, 'character_selected', {
        gender,
        name,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging character selected:', error);
    }
  },

  logCompanionDiscovered(companionName: string, countryId: string): void {
    try {
      firebaseLogEvent(analytics, 'companion_discovered', {
        companion_name: companionName,
        country_id: countryId,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging companion discovered:', error);
    }
  },

  // Achievement events
  logAchievementUnlocked(achievementId: string, achievementName: string): void {
    try {
      firebaseLogEvent(analytics, 'achievement_unlocked', {
        achievement_id: achievementId,
        achievement_name: achievementName,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging achievement unlocked:', error);
    }
  },

  // Purchase events (IAP tracking)
  logPurchase(itemId: string, itemName: string, value: number, currency: string = 'USD'): void {
    try {
      firebaseLogEvent(analytics, 'purchase', {
        item_id: itemId,
        item_name: itemName,
        value,
        currency,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging purchase:', error);
    }
  },

  // Screen tracking
  logScreenView(screenName: string, screenClass?: string): void {
    try {
      firebaseLogEvent(analytics, 'screen_view', {
        screen_name: screenName,
        screen_class: screenClass || screenName,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging screen view:', error);
    }
  },

  // Settings events
  logLanguageChange(newLanguage: string): void {
    try {
      firebaseLogEvent(analytics, 'language_changed', {
        new_language: newLanguage,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging language change:', error);
    }
  },

  logParentalControlChange(newLevel: number): void {
    try {
      firebaseLogEvent(analytics, 'parental_control_changed', {
        new_level: newLevel,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging parental control change:', error);
    }
  },

  // Custom events
  logCustomEvent(eventName: string, params?: Record<string, any>): void {
    try {
      firebaseLogEvent(analytics, eventName, {
        ...params,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error(`Error logging custom event ${eventName}:`, error);
    }
  },

  // Error tracking
  logError(errorCode: string, errorMessage: string, context?: Record<string, any>): void {
    try {
      firebaseLogEvent(analytics, 'error_occurred', {
        error_code: errorCode,
        error_message: errorMessage,
        ...context,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging error event:', error);
    }
  },

  // Session tracking
  logSessionStart(): void {
    try {
      firebaseLogEvent(analytics, 'session_start', {
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging session start:', error);
    }
  },

  logSessionEnd(duration: number): void {
    try {
      firebaseLogEvent(analytics, 'session_end', {
        duration,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging session end:', error);
    }
  },
};

/**
 * Firestore Service
 * CRUD operations para Firestore database
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './config';

export const firestoreService = {
  // Save user progress
  async saveUserProgress(userId: string, progressData: any): Promise<void> {
    try {
      const userProgressRef = doc(db, 'progress', userId);
      await setDoc(userProgressRef, {
        ...progressData,
        lastUpdated: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user progress:', error);
      throw error;
    }
  },

  // Get user progress
  async getUserProgress(userId: string): Promise<any | null> {
    try {
      const userProgressRef = doc(db, 'progress', userId);
      const docSnap = await getDoc(userProgressRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw error;
    }
  },

  // Save user profile
  async saveUserProfile(userId: string, profileData: any): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...profileData,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  },

  // Get leaderboard
  async getLeaderboard(limitCount: number = 50): Promise<any[]> {
    try {
      const leaderboardRef = collection(db, 'leaderboards');
      const q = query(
        leaderboardRef,
        orderBy('totalStars', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const leaderboard: any[] = [];

      querySnapshot.forEach((doc) => {
        leaderboard.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return leaderboard;
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  },

  // Log analytics event
  async logEvent(eventName: string, eventData: any): Promise<void> {
    try {
      const analyticsRef = collection(db, 'analytics');
      await setDoc(doc(analyticsRef), {
        event: eventName,
        data: eventData,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error logging event:', error);
      throw error;
    }
  },
};

/**
 * Firebase Auth Service
 * Manejo de autenticación de usuarios
 * MODO OFFLINE: Funciona sin Firebase usando AsyncStorage
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, isFirebaseAvailable } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock user for offline mode
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const MOCK_USER_KEY = '@HopeQuest:mockUser';

export const authService = {
  // Register new user
  async register(email: string, password: string, displayName: string): Promise<User | MockUser> {
    if (!isFirebaseAvailable() || !auth) {
      console.log('📱 Offline mode: Creating local user');
      const mockUser: MockUser = {
        uid: `local_${Date.now()}`,
        email,
        displayName,
      };
      await AsyncStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      return mockUser as any;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, { displayName });

      return user;
    } catch (error: any) {
      console.error('Error registering user:', error);
      throw new Error(error.message);
    }
  },

  // Sign in existing user
  async login(email: string, password: string): Promise<User | MockUser> {
    if (!isFirebaseAvailable() || !auth) {
      console.log('📱 Offline mode: Using local user');
      const stored = await AsyncStorage.getItem(MOCK_USER_KEY);
      if (stored) {
        return JSON.parse(stored) as any;
      }
      // Auto-create mock user if not exists
      const mockUser: MockUser = {
        uid: `local_${Date.now()}`,
        email,
        displayName: 'Player',
      };
      await AsyncStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      return mockUser as any;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.message);
    }
  },

  // Sign out
  async logout(): Promise<void> {
    if (!isFirebaseAvailable() || !auth) {
      console.log('📱 Offline mode: Logging out locally');
      await AsyncStorage.removeItem(MOCK_USER_KEY);
      return;
    }

    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Error logging out:', error);
      throw new Error(error.message);
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    if (!isFirebaseAvailable() || !auth) {
      console.log('📱 Offline mode: No auth available');
      return null;
    }
    return auth.currentUser;
  },

  // Get current user (async, checks AsyncStorage in offline mode)
  async getCurrentUserAsync(): Promise<User | MockUser | null> {
    if (!isFirebaseAvailable() || !auth) {
      const stored = await AsyncStorage.getItem(MOCK_USER_KEY);
      if (stored) {
        return JSON.parse(stored) as any;
      }
      return null;
    }
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    if (!isFirebaseAvailable() || !auth) {
      console.log('📱 Offline mode: Auth state listener disabled');
      // Return no-op unsubscribe function
      return () => {};
    }

    return onAuthStateChanged(auth, callback);
  },

  // Update user profile
  async updateUserProfile(displayName: string, photoURL?: string): Promise<void> {
    if (!isFirebaseAvailable() || !auth) {
      console.log('📱 Offline mode: Updating local profile');
      const stored = await AsyncStorage.getItem(MOCK_USER_KEY);
      if (stored) {
        const mockUser = JSON.parse(stored);
        mockUser.displayName = displayName;
        await AsyncStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      }
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }

    try {
      await updateProfile(user, { displayName, photoURL });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw new Error(error.message);
    }
  },
};

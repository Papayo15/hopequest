/**
 * Cross-platform Storage Utility
 * Usa localStorage en web y AsyncStorage en mobile
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: async (name: string) => {
        try {
          const value = localStorage.getItem(name);
          return value;
        } catch (error) {
          console.error('Error getting item from localStorage:', error);
          return null;
        }
      },
      setItem: async (name: string, value: string) => {
        try {
          localStorage.setItem(name, value);
        } catch (error) {
          console.error('Error setting item to localStorage:', error);
        }
      },
      removeItem: async (name: string) => {
        try {
          localStorage.removeItem(name);
        } catch (error) {
          console.error('Error removing item from localStorage:', error);
        }
      },
    };
  }
  return AsyncStorage;
};

/**
 * i18next Configuration
 * Sistema de internacionalización para 5 idiomas
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translations
import es from './translations/es.json';
import en from './translations/en.json';
import zh from './translations/zh.json';
import hi from './translations/hi.json';
import ar from './translations/ar.json';

const LANGUAGE_STORAGE_KEY = 'hope-quest-language';

// Language detector for AsyncStorage
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
      } else {
        // Default to Spanish (lengua materna de los personajes)
        callback('es');
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('es');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      zh: { translation: zh },
      hi: { translation: hi },
      ar: { translation: ar },
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

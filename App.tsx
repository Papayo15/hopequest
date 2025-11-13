/**
 * Wisdom Quest - App Principal
 * Juego educativo interactivo para niños de 4-12 años
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Navegación
import RootNavigator from '@navigation/RootNavigator';

// Servicios
import { audioService } from '@/services/audio/audioService';
import { achievementService } from '@/services/achievements/achievementService';

// i18n
import '@i18n/config';

// Prevenir que el splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Inicializar audio service
        await audioService.initialize();

        // Inicializar achievement service con datos vacíos (se cargará del gameStore después)
        achievementService.initialize([]);

        // Cargar fuentes personalizadas (si las hay)
        await Font.loadAsync({
          // Aquí puedes cargar fuentes custom
          // 'CustomFont': require('./assets/fonts/CustomFont.ttf'),
        });

        // Simular carga mínima (opcional, para mostrar splash)
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error('Error during app initialization:', error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Ocultar splash screen cuando la app está lista
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

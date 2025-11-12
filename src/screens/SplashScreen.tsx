/**
 * Splash Screen
 * Pantalla inicial de carga de la aplicación
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../navigation/types';
import { LoadingScreen } from '../components/ui';
import { Colors } from '../constants';
import { useUserStore } from '../stores';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    // Simulate loading assets, fonts, etc.
    const initializeApp = async () => {
      try {
        // TODO: Load fonts
        // TODO: Load assets
        // TODO: Initialize Firebase
        // TODO: Check authentication status

        // Wait minimum splash time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Navigate based on auth status
        if (userId) {
          navigation.replace('Main');
        } else {
          navigation.replace('Auth');
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        // Navigate to auth on error
        navigation.replace('Auth');
      }
    };

    initializeApp();
  }, [userId, navigation]);

  return (
    <View style={styles.container}>
      {/* TODO: Add logo/branding */}
      <LoadingScreen
        message="Cargando Hope Quest..."
        color={Colors.primary.main}
        fullScreen={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;

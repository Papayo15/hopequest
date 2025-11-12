/**
 * LoadingScreen Component
 * Pantalla de carga con spinner y mensaje opcional
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { BodyText } from './Typography';
import { Colors } from '../../constants';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  size = 'large',
  color = Colors.primary.main,
  fullScreen = true,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <BodyText style={styles.message} color={Colors.text.secondary}>
          {message}
        </BodyText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
  },
});

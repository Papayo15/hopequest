/**
 * Replay Button Component
 * Botón para ver replay del último lanzamiento exitoso
 * Estilo Angry Birds - Simple y visual para niños
 */

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import { SmallText, BodyText } from '../ui';
import { Colors } from '../../constants';

interface ReplayButtonProps {
  onPress: () => void;
  disabled?: boolean;
  stars?: number; // Estrellas del último lanzamiento
}

export const ReplayButton: React.FC<ReplayButtonProps> = ({
  onPress,
  disabled = false,
  stars = 0,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.button, disabled && styles.disabled]}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <BodyText style={styles.icon}>🎬</BodyText>
          <View style={styles.textContainer}>
            <SmallText style={styles.title}>Ver Replay</SmallText>
            {stars > 0 && (
              <SmallText style={styles.stars}>
                {'⭐'.repeat(stars)}
              </SmallText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabled: {
    backgroundColor: Colors.text.disabled,
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stars: {
    fontSize: 10,
    marginTop: 2,
  },
});

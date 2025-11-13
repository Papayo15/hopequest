/**
 * Slow Motion Indicator
 * Indicador visual cuando el juego está en cámara lenta
 * Para niños - Grande, colorido y fácil de entender
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Heading2, BodyText } from '../ui';
import { Colors } from '../../constants';

interface SlowMotionIndicatorProps {
  isActive: boolean;
  speedMultiplier?: number; // 0.3 = 30% velocidad
}

export const SlowMotionIndicator: React.FC<SlowMotionIndicatorProps> = ({
  isActive,
  speedMultiplier = 0.3,
}) => {
  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isActive) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animación de salida
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  if (!isActive && opacity._value === 0) {
    return null;
  }

  const speedPercentage = Math.round(speedMultiplier * 100);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <View style={styles.badge}>
        <Heading2 style={styles.icon}>⏱️</Heading2>
        <View style={styles.textContainer}>
          <BodyText style={styles.title}>CÁMARA LENTA</BodyText>
          <BodyText style={styles.speed}>{speedPercentage}% velocidad</BodyText>
        </View>
      </View>

      {/* Efecto de ondas */}
      <SlowMotionWaves />
    </Animated.View>
  );
};

// Ondas animadas alrededor del indicador
const SlowMotionWaves: React.FC = () => {
  const waves = [0, 1, 2];
  return (
    <View style={styles.wavesContainer}>
      {waves.map((i) => (
        <Wave key={i} delay={i * 400} />
      ))}
    </View>
  );
};

const Wave: React.FC<{ delay: number }> = ({ delay }) => {
  const [waveScale] = useState(new Animated.Value(1));
  const [waveOpacity] = useState(new Animated.Value(0.8));

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(waveScale, {
            toValue: 2,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.wave,
        {
          transform: [{ scale: waveScale }],
          opacity: waveOpacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    zIndex: 1000,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  speed: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  wavesContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  wave: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.warning.main,
  },
});

/**
 * Floating Clouds Component
 * Nubes flotantes que se mueven lentamente por el mapa
 * Estilo Mario World - Ambiente visual relajante
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { BodyText } from '../ui';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FloatingCloudsProps {
  count?: number; // Cantidad de nubes
  speed?: number; // Velocidad base (multiplicador)
}

export const FloatingClouds: React.FC<FloatingCloudsProps> = ({
  count = 8,
  speed = 1,
}) => {
  const clouds = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: i * 3000, // Escalonar aparición
    startY: Math.random() * (SCREEN_HEIGHT * 0.6), // Solo en la mitad superior
    size: 30 + Math.random() * 30, // Tamaño 30-60
    speedMultiplier: 0.5 + Math.random() * 1, // Velocidad variable
  }));

  return (
    <View style={styles.container} pointerEvents="none">
      {clouds.map((cloud) => (
        <FloatingCloud
          key={cloud.id}
          startY={cloud.startY}
          size={cloud.size}
          delay={cloud.delay}
          speed={speed * cloud.speedMultiplier}
        />
      ))}
    </View>
  );
};

interface FloatingCloudProps {
  startY: number;
  size: number;
  delay: number;
  speed: number;
}

const FloatingCloud: React.FC<FloatingCloudProps> = ({
  startY,
  size,
  delay,
  speed,
}) => {
  const [cloudAnim] = useState(new Animated.Value(-100));
  const [floatAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Esperar delay antes de empezar
    setTimeout(() => {
      // Movimiento horizontal continuo
      Animated.loop(
        Animated.timing(cloudAnim, {
          toValue: SCREEN_WIDTH + 100,
          duration: (30000 / speed), // Más rápido = menos duración
          useNativeDriver: true,
        })
      ).start();

      // Movimiento vertical suave (flotación)
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -10,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 10,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.cloud,
        {
          top: startY,
          transform: [
            { translateX: cloudAnim },
            { translateY: floatAnim },
          ],
        },
      ]}
    >
      <BodyText style={{ fontSize: size, opacity: 0.6 }}>☁️</BodyText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  cloud: {
    position: 'absolute',
    left: -100, // Empezar fuera de pantalla
  },
});

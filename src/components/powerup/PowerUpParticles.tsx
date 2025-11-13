/**
 * Power-Up Particles Effect
 * Efecto visual de partículas cuando se activa un power-up
 * Simple y colorido para niños
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Particle {
  id: string;
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  scale: Animated.Value;
  emoji: string;
}

interface PowerUpParticlesProps {
  color: string;
  emoji: string;
  visible: boolean;
  onComplete?: () => void;
}

export const PowerUpParticles: React.FC<PowerUpParticlesProps> = ({
  color,
  emoji,
  visible,
  onComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (visible) {
      createParticles();
    }
  }, [visible]);

  const createParticles = () => {
    // Crear 20 partículas
    const newParticles: Particle[] = [];

    for (let i = 0; i < 20; i++) {
      const startX = SCREEN_WIDTH / 2;
      const startY = SCREEN_HEIGHT / 2;

      // Dirección aleatoria
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 100 + Math.random() * 200;
      const targetX = startX + Math.cos(angle) * distance;
      const targetY = startY + Math.sin(angle) * distance;

      const particle: Particle = {
        id: `particle_${i}`,
        x: new Animated.Value(startX),
        y: new Animated.Value(startY),
        opacity: new Animated.Value(1),
        scale: new Animated.Value(0),
        emoji: i % 2 === 0 ? emoji : '✨', // Alterna entre emoji del power-up y estrella
      };

      newParticles.push(particle);

      // Animar partícula
      Animated.parallel([
        Animated.timing(particle.x, {
          toValue: targetX,
          duration: 800 + Math.random() * 400,
          useNativeDriver: true,
        }),
        Animated.timing(particle.y, {
          toValue: targetY,
          duration: 800 + Math.random() * 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(particle.scale, {
            toValue: 1.5,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(particle.scale, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(particle.opacity, {
          toValue: 0,
          duration: 800,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (i === 19 && onComplete) {
          onComplete();
        }
      });
    }

    setParticles(newParticles);
  };

  if (!visible || particles.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Animated.Text
          key={particle.id}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: [
                { scale: particle.scale },
                { translateX: -15 }, // Centrar
                { translateY: -15 },
              ],
            },
          ]}
        >
          {particle.emoji}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  particle: {
    position: 'absolute',
    fontSize: 30,
  },
});

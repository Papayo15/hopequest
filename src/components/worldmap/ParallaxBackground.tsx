/**
 * Parallax Background Component
 * Capas de fondo con efecto parallax (nubes, océano)
 * Estilo Mario World - Múltiples capas moviéndose a diferentes velocidades
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { BodyText } from '../ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ParallaxBackgroundProps {
  scrollX?: Animated.Value; // Valor de scroll del mapa
  speed?: number; // Multiplicador de velocidad base
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  scrollX,
  speed = 1,
}) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Capa 1: Nubes lejanas (más lentas) */}
      <ParallaxLayer scrollX={scrollX} speed={speed * 0.2} zIndex={1}>
        <CloudLayer emoji="☁️" count={3} size={40} opacity={0.3} />
      </ParallaxLayer>

      {/* Capa 2: Nubes medias */}
      <ParallaxLayer scrollX={scrollX} speed={speed * 0.4} zIndex={2}>
        <CloudLayer emoji="☁️" count={4} size={50} opacity={0.5} />
      </ParallaxLayer>

      {/* Capa 3: Nubes cercanas (más rápidas) */}
      <ParallaxLayer scrollX={scrollX} speed={speed * 0.6} zIndex={3}>
        <CloudLayer emoji="☁️" count={5} size={60} opacity={0.7} />
      </ParallaxLayer>

      {/* Capa 4: Aves volando */}
      <ParallaxLayer scrollX={scrollX} speed={speed * 0.8} zIndex={4}>
        <BirdLayer />
      </ParallaxLayer>
    </View>
  );
};

// Capa individual con parallax
interface ParallaxLayerProps {
  children: React.ReactNode;
  scrollX?: Animated.Value;
  speed: number;
  zIndex: number;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  scrollX,
  speed,
  zIndex,
}) => {
  const [autoScrollAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Auto-scroll si no hay scroll manual
    if (!scrollX) {
      Animated.loop(
        Animated.timing(autoScrollAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 60000 / speed, // Más rápido = menos duración
          useNativeDriver: true,
        })
      ).start();
    }
  }, []);

  const translateX = scrollX
    ? scrollX.interpolate({
        inputRange: [0, SCREEN_WIDTH],
        outputRange: [0, -SCREEN_WIDTH * speed],
      })
    : autoScrollAnim;

  return (
    <Animated.View
      style={[
        styles.layer,
        {
          zIndex,
          transform: [{ translateX }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

// Capa de nubes
interface CloudLayerProps {
  emoji: string;
  count: number;
  size: number;
  opacity: number;
}

const CloudLayer: React.FC<CloudLayerProps> = ({ emoji, count, size, opacity }) => {
  const clouds = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (SCREEN_WIDTH / count) * i + Math.random() * 100,
    y: Math.random() * 150 + 20,
  }));

  return (
    <>
      {clouds.map((cloud) => (
        <View
          key={cloud.id}
          style={[
            styles.cloud,
            {
              left: cloud.x,
              top: cloud.y,
              opacity,
            },
          ]}
        >
          <BodyText style={{ fontSize: size }}>{emoji}</BodyText>
        </View>
      ))}
      {/* Duplicar para scroll continuo */}
      {clouds.map((cloud) => (
        <View
          key={`${cloud.id}-dup`}
          style={[
            styles.cloud,
            {
              left: cloud.x + SCREEN_WIDTH,
              top: cloud.y,
              opacity,
            },
          ]}
        >
          <BodyText style={{ fontSize: size }}>{emoji}</BodyText>
        </View>
      ))}
    </>
  );
};

// Capa de aves animadas
const BirdLayer: React.FC = () => {
  return (
    <>
      <AnimatedBird delay={0} startY={80} />
      <AnimatedBird delay={2000} startY={120} />
      <AnimatedBird delay={4000} startY={100} />
    </>
  );
};

const AnimatedBird: React.FC<{ delay: number; startY: number }> = ({
  delay,
  startY,
}) => {
  const [birdAnim] = useState(new Animated.Value(0));
  const [flapAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setTimeout(() => {
      // Movimiento horizontal
      Animated.loop(
        Animated.timing(birdAnim, {
          toValue: SCREEN_WIDTH * 2,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();

      // Aleteo
      Animated.loop(
        Animated.sequence([
          Animated.timing(flapAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(flapAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  const birdY = flapAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5], // Sube 5px al aletear
  });

  return (
    <Animated.View
      style={[
        styles.bird,
        {
          top: startY,
          transform: [{ translateX: birdAnim }, { translateY: birdY }],
        },
      ]}
    >
      <BodyText style={styles.birdEmoji}>🐦</BodyText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
    width: SCREEN_WIDTH * 2, // Doble para scroll continuo
    height: '100%',
    flexDirection: 'row',
  },
  cloud: {
    position: 'absolute',
  },
  bird: {
    position: 'absolute',
    left: -50, // Empezar fuera de pantalla
  },
  birdEmoji: {
    fontSize: 24,
  },
});

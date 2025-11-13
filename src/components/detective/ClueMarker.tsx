/**
 * Clue Marker Component
 * Marcador de pista en el mapa (Detective Mode)
 * Estilo Carmen Sandiego - Pistas brillantes y misteriosas
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Clue } from '../../types/detective';
import { Colors } from '../../constants';
import { useSFX } from '../../hooks/useAudio';

interface ClueMarkerProps {
  clue: Clue;
  isCollected: boolean;
  onCollect: () => void;
}

export const ClueMarker: React.FC<ClueMarkerProps> = ({
  clue,
  isCollected,
  onCollect,
}) => {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));
  const [collectAnim] = useState(new Animated.Value(0));

  const { playSFX } = useSFX();

  useEffect(() => {
    if (!isCollected) {
      // Animación de pulso
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animación de brillo
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isCollected]);

  const handleCollect = () => {
    if (isCollected) return;

    // Animación de recolección
    Animated.sequence([
      Animated.spring(collectAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(collectAnim, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    playSFX('coin_collect');
    onCollect();
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const collectScale = collectAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.5, 0],
  });

  const collectOpacity = collectAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1, 0],
  });

  if (isCollected && collectAnim._value === 2) {
    return null; // Ya fue recolectado y la animación terminó
  }

  return (
    <TouchableOpacity
      onPress={handleCollect}
      activeOpacity={0.8}
      disabled={isCollected}
      style={[
        styles.container,
        {
          left: clue.location.x,
          top: clue.location.y,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.marker,
          {
            transform: [
              { scale: isCollected ? collectScale : pulseAnim },
            ],
            opacity: isCollected ? collectOpacity : 1,
          },
        ]}
      >
        {/* Brillo detrás del marcador */}
        {!isCollected && (
          <Animated.View
            style={[
              styles.glow,
              {
                opacity: glowOpacity,
                backgroundColor: CLUE_TYPE_COLORS[clue.type],
              },
            ]}
          />
        )}

        {/* Marcador de pista */}
        <View
          style={[
            styles.markerBody,
            { backgroundColor: CLUE_TYPE_COLORS[clue.type] },
            isCollected && styles.collectedMarker,
          ]}
        >
          <BodyText style={styles.emoji}>{clue.emoji}</BodyText>
        </View>

        {/* Tipo de pista */}
        {!isCollected && (
          <View style={styles.typeLabel}>
            <SmallText style={styles.typeText}>
              {CLUE_TYPE_LABELS[clue.type]}
            </SmallText>
          </View>
        )}
      </Animated.View>

      {/* Efecto de partículas al recolectar */}
      {isCollected && collectAnim._value > 0 && collectAnim._value < 2 && (
        <CollectParticles />
      )}
    </TouchableOpacity>
  );
};

// Partículas al recolectar pista
const CollectParticles: React.FC = () => {
  const particles = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.particlesContainer}>
      {particles.map((i) => (
        <CollectParticle key={i} angle={(360 / particles.length) * i} />
      ))}
    </View>
  );
};

const CollectParticle: React.FC<{ angle: number }> = ({ angle }) => {
  const [particleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(particleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const distance = 40;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  const translateX = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, x],
  });

  const translateY = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, y],
  });

  const opacity = particleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          transform: [{ translateX }, { translateY }],
          opacity,
        },
      ]}
    >
      <BodyText style={styles.particleEmoji}>✨</BodyText>
    </Animated.View>
  );
};

const CLUE_TYPE_COLORS: Record<string, string> = {
  geography: '#4169E1',
  culture: '#FF6347',
  food: '#FFA500',
  history: '#8B4513',
  language: '#9370DB',
  tradition: '#20B2AA',
};

const CLUE_TYPE_LABELS: Record<string, string> = {
  geography: 'Geografía',
  culture: 'Cultura',
  food: 'Comida',
  history: 'Historia',
  language: 'Idioma',
  tradition: 'Tradición',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 50,
  },
  marker: {
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    top: -10,
    left: -10,
  },
  markerBody: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  collectedMarker: {
    opacity: 0,
  },
  emoji: {
    fontSize: 30,
  },
  typeLabel: {
    marginTop: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  particlesContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: -20,
    top: -20,
  },
  particle: {
    position: 'absolute',
    left: 50,
    top: 50,
  },
  particleEmoji: {
    fontSize: 16,
  },
});

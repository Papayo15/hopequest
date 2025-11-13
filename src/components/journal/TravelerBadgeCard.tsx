/**
 * Traveler Badge Card Component
 * Insignia de viajero para mostrar logros
 * Estilo logro/achievement desbloqueado
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';
import { TravelerBadge } from '../../types/journal';

interface TravelerBadgeCardProps {
  badge: TravelerBadge;
  progress?: number; // Progreso actual hacia el logro
  isNew?: boolean; // Si acaba de desbloquearse
}

export const TravelerBadgeCard: React.FC<TravelerBadgeCardProps> = ({
  badge,
  progress = 0,
  isNew = false,
}) => {
  const [scaleAnim] = useState(new Animated.Value(badge.unlocked ? 1 : 0.9));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isNew && badge.unlocked) {
      // Animación de desbloqueo
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();

      // Pulso continuo para nuevos logros
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
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

      // Brillo
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
  }, [isNew, badge.unlocked]);

  const percentage = Math.min(
    (progress / badge.requirement.value) * 100,
    100
  );

  return (
    <Animated.View
      style={[
        styles.card,
        !badge.unlocked && styles.lockedCard,
        {
          transform: [{ scale: isNew ? pulseAnim : scaleAnim }],
        },
      ]}
    >
      {/* Brillo para nuevos logros */}
      {isNew && badge.unlocked && (
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: glowAnim,
            },
          ]}
        />
      )}

      {/* Badge de NUEVO */}
      {isNew && badge.unlocked && (
        <View style={styles.newBadge}>
          <SmallText style={styles.newText}>¡NUEVO!</SmallText>
        </View>
      )}

      {/* Emoji del badge */}
      <View style={styles.emojiContainer}>
        <BodyText
          style={[styles.emoji, !badge.unlocked && styles.lockedEmoji]}
        >
          {badge.unlocked ? badge.emoji : '🔒'}
        </BodyText>
      </View>

      {/* Nombre */}
      <BodyText style={[styles.name, !badge.unlocked && styles.lockedText]}>
        {badge.name.es}
      </BodyText>

      {/* Descripción */}
      <SmallText
        style={[styles.description, !badge.unlocked && styles.lockedText]}
        numberOfLines={2}
      >
        {badge.description.es}
      </SmallText>

      {/* Progreso */}
      {!badge.unlocked && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${percentage}%` }]}
            />
          </View>
          <SmallText style={styles.progressText}>
            {progress}/{badge.requirement.value}
          </SmallText>
        </View>
      )}

      {/* Estado desbloqueado */}
      {badge.unlocked && (
        <View style={styles.unlockedBadge}>
          <SmallText style={styles.unlockedText}>✓ Desbloqueado</SmallText>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary.main,
    position: 'relative',
  },
  lockedCard: {
    backgroundColor: Colors.background.secondary,
    borderColor: Colors.text.disabled,
    opacity: 0.7,
  },
  glow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Colors.warning.main,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.error.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  newText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emojiContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  emoji: {
    fontSize: 50,
  },
  lockedEmoji: {
    opacity: 0.4,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.text.primary,
  },
  lockedText: {
    color: Colors.text.disabled,
  },
  description: {
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'center',
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.background.secondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.text.secondary,
  },
  unlockedBadge: {
    backgroundColor: Colors.success.main,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  unlockedText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

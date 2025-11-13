/**
 * Detective Case Card Component
 * Muestra un caso detective disponible
 * Estilo Carmen Sandiego - Misterio y aventura
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';
import { DetectiveCase } from '../../types/detective';

interface DetectiveCaseCardProps {
  detectiveCase: DetectiveCase;
  isCompleted: boolean;
  progress: { collected: number; total: number; percentage: number };
  onStartCase: () => void;
}

export const DetectiveCaseCard: React.FC<DetectiveCaseCardProps> = ({
  detectiveCase,
  isCompleted,
  progress,
  onStartCase,
}) => {
  const [hoverAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(hoverAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(hoverAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const difficultyColor =
    detectiveCase.difficulty === 'easy'
      ? Colors.success.main
      : detectiveCase.difficulty === 'medium'
      ? Colors.warning.main
      : Colors.error.main;

  return (
    <TouchableOpacity
      onPress={onStartCase}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      disabled={isCompleted}
    >
      <Animated.View
        style={[
          styles.card,
          isCompleted && styles.completedCard,
          {
            transform: [{ scale: hoverAnim }],
          },
        ]}
      >
        {/* Badge de completado */}
        {isCompleted && (
          <View style={styles.completedBadge}>
            <SmallText style={styles.completedText}>✓ RESUELTO</SmallText>
          </View>
        )}

        {/* Emoji del caso */}
        <View style={styles.emojiContainer}>
          <BodyText style={styles.emoji}>🔍</BodyText>
        </View>

        {/* Título y descripción */}
        <Heading2 style={styles.title}>{detectiveCase.title.es}</Heading2>
        <BodyText style={styles.description}>
          {detectiveCase.description.es}
        </BodyText>

        {/* Dificultad */}
        <View style={styles.difficultyContainer}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColor },
            ]}
          >
            <SmallText style={styles.difficultyText}>
              {detectiveCase.difficulty.toUpperCase()}
            </SmallText>
          </View>
        </View>

        {/* Progreso (si está en curso) */}
        {!isCompleted && progress.collected > 0 && (
          <View style={styles.progressContainer}>
            <SmallText style={styles.progressText}>
              Pistas: {progress.collected}/{progress.total}
            </SmallText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress.percentage}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Recompensas */}
        <View style={styles.rewardsContainer}>
          <View style={styles.reward}>
            <SmallText>⭐ {detectiveCase.starsReward}</SmallText>
          </View>
          <View style={styles.reward}>
            <SmallText>💰 {detectiveCase.coinsReward}</SmallText>
          </View>
          {detectiveCase.badge && (
            <View style={styles.reward}>
              <SmallText>{detectiveCase.badge} Insignia</SmallText>
            </View>
          )}
        </View>

        {/* Botón */}
        {!isCompleted && (
          <Button
            title="Investigar Caso"
            onPress={onStartCase}
            variant="primary"
            fullWidth
            style={styles.startButton}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary.main,
  },
  completedCard: {
    borderColor: Colors.success.main,
    opacity: 0.7,
  },
  completedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.success.main,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    zIndex: 10,
  },
  completedText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  emojiContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 50,
  },
  title: {
    textAlign: 'center',
    color: Colors.primary.main,
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    color: Colors.text.secondary,
  },
  difficultyContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  progressContainer: {
    marginVertical: 12,
  },
  progressText: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.background.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 4,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 12,
  },
  reward: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  startButton: {
    marginTop: 8,
  },
});

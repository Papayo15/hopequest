/**
 * Daily Challenge Card Component
 * Tarjeta de desafío diario con progreso y recompensas
 * Estilo motivador y colorido para niños
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';
import { DailyChallenge } from '../../types/challenges';

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  isNew?: boolean;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  isNew = false,
}) => {
  const [progressAnim] = useState(new Animated.Value(0));
  const [completeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animar progreso
    const percentage = (challenge.progress / challenge.target) * 100;
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animación de completado
    if (challenge.isCompleted) {
      Animated.sequence([
        Animated.spring(completeAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.05,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    }
  }, [challenge.progress, challenge.isCompleted]);

  const difficultyColor = DIFFICULTY_COLORS[challenge.difficulty];
  const percentage = Math.min((challenge.progress / challenge.target) * 100, 100);

  return (
    <Animated.View
      style={[
        styles.card,
        challenge.isCompleted && styles.completedCard,
        {
          transform: [{ scale: challenge.isCompleted ? pulseAnim : 1 }],
        },
      ]}
    >
      {/* Badge de completado */}
      {challenge.isCompleted && (
        <Animated.View
          style={[
            styles.completedBadge,
            {
              transform: [{ scale: completeAnim }],
            },
          ]}
        >
          <SmallText style={styles.completedText}>✓</SmallText>
        </Animated.View>
      )}

      {/* Badge de NUEVO */}
      {isNew && !challenge.isCompleted && (
        <View style={styles.newBadge}>
          <SmallText style={styles.newText}>¡NUEVO!</SmallText>
        </View>
      )}

      {/* Emoji */}
      <View style={styles.emojiContainer}>
        <BodyText style={styles.emoji}>{challenge.emoji}</BodyText>
      </View>

      {/* Título */}
      <BodyText style={styles.title}>{challenge.title.es}</BodyText>

      {/* Descripción */}
      <SmallText style={styles.description}>
        {challenge.description.es}
      </SmallText>

      {/* Dificultad */}
      <View
        style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}
      >
        <SmallText style={styles.difficultyText}>
          {DIFFICULTY_LABELS[challenge.difficulty]}
        </SmallText>
      </View>

      {/* Progreso */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <SmallText style={styles.progressLabel}>Progreso</SmallText>
          <SmallText style={styles.progressNumbers}>
            {challenge.progress}/{challenge.target}
          </SmallText>
        </View>

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: challenge.isCompleted
                  ? Colors.success.main
                  : Colors.primary.main,
              },
            ]}
          />
        </View>

        <SmallText style={styles.progressPercentage}>
          {Math.round(percentage)}%
        </SmallText>
      </View>

      {/* Recompensas */}
      <View style={styles.rewardsContainer}>
        <SmallText style={styles.rewardsLabel}>Recompensas:</SmallText>
        <View style={styles.rewardsRow}>
          <View style={styles.rewardItem}>
            <SmallText style={styles.rewardText}>
              💰 {challenge.rewards.coins}
            </SmallText>
          </View>
          {challenge.rewards.stars && (
            <View style={styles.rewardItem}>
              <SmallText style={styles.rewardText}>
                ⭐ {challenge.rewards.stars}
              </SmallText>
            </View>
          )}
          {challenge.rewards.badge && (
            <View style={styles.rewardItem}>
              <SmallText style={styles.rewardText}>
                {challenge.rewards.badge}
              </SmallText>
            </View>
          )}
        </View>
      </View>

      {/* Tiempo restante */}
      {!challenge.isCompleted && (
        <TimeRemaining expiresAt={challenge.expiresAt} />
      )}
    </Animated.View>
  );
};

// Componente de tiempo restante
const TimeRemaining: React.FC<{ expiresAt: Date }> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const expires = new Date(expiresAt);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Expirado');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${hours}h ${minutes}m restantes`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <View style={styles.timeContainer}>
      <SmallText style={styles.timeText}>⏰ {timeLeft}</SmallText>
    </View>
  );
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: Colors.success.main,
  medium: Colors.warning.main,
  hard: Colors.error.main,
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary.main,
    position: 'relative',
  },
  completedCard: {
    borderColor: Colors.success.main,
    backgroundColor: Colors.success.light,
  },
  completedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.success.main,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
  completedText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.error.main,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    zIndex: 10,
  },
  newText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  emojiContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.text.primary,
  },
  description: {
    textAlign: 'center',
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  difficultyBadge: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  difficultyText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  progressNumbers: {
    fontWeight: 'bold',
    color: Colors.primary.main,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  progressPercentage: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  rewardsContainer: {
    backgroundColor: Colors.info.light,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  rewardsLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rewardItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rewardText: {
    fontWeight: 'bold',
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeText: {
    color: Colors.warning.main,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

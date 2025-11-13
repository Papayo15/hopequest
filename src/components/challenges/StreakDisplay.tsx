/**
 * Streak Display Component
 * Muestra la racha de días consecutivos jugando
 * Motivador para que los niños vuelvan cada día
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Heading2, BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';
import { STREAK_REWARDS } from '../../types/challenges';

interface StreakDisplayProps {
  currentStreak: number;
  bestStreak: number;
  isNewStreak?: boolean; // Si acaba de incrementar la racha
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  currentStreak,
  bestStreak,
  isNewStreak = false,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [fireAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isNewStreak) {
      // Animación de celebración
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
    }

    // Animación de fuego
    if (currentStreak >= 3) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fireAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fireAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isNewStreak, currentStreak]);

  // Encontrar próxima recompensa
  const nextReward = STREAK_REWARDS.find((r) => r.days > currentStreak);

  const fireScale = fireAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Racha actual */}
      <View style={styles.currentStreakContainer}>
        <Animated.View
          style={[
            styles.fireContainer,
            {
              transform: [{ scale: currentStreak >= 3 ? fireScale : 1 }],
            },
          ]}
        >
          <BodyText style={styles.fireEmoji}>
            {currentStreak >= 3 ? '🔥' : '📅'}
          </BodyText>
        </Animated.View>

        <View style={styles.streakInfo}>
          <Heading2 style={styles.streakNumber}>{currentStreak}</Heading2>
          <SmallText style={styles.streakLabel}>
            {currentStreak === 1 ? 'día' : 'días'} seguidos
          </SmallText>
        </View>
      </View>

      {/* Mejor racha */}
      {bestStreak > currentStreak && (
        <View style={styles.bestStreakContainer}>
          <SmallText style={styles.bestStreakText}>
            🏆 Mejor racha: {bestStreak} días
          </SmallText>
        </View>
      )}

      {/* Próxima recompensa */}
      {nextReward && (
        <View style={styles.nextRewardContainer}>
          <SmallText style={styles.nextRewardLabel}>
            Próxima recompensa:
          </SmallText>
          <View style={styles.nextRewardContent}>
            <SmallText style={styles.nextRewardText}>
              {nextReward.badge || '🎁'} {nextReward.bonus} monedas
            </SmallText>
            <SmallText style={styles.nextRewardProgress}>
              ({currentStreak}/{nextReward.days} días)
            </SmallText>
          </View>

          {/* Barra de progreso hacia la recompensa */}
          <View style={styles.rewardProgressBar}>
            <View
              style={[
                styles.rewardProgressFill,
                {
                  width: `${(currentStreak / nextReward.days) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Mensajes motivacionales */}
      <StreakMessage streak={currentStreak} />
    </Animated.View>
  );
};

// Mensajes motivacionales según la racha
const StreakMessage: React.FC<{ streak: number }> = ({ streak }) => {
  let message = '';
  let emoji = '';

  if (streak === 0) {
    message = '¡Empieza tu racha jugando hoy!';
    emoji = '✨';
  } else if (streak === 1) {
    message = '¡Buen comienzo! Vuelve mañana';
    emoji = '👍';
  } else if (streak < 3) {
    message = '¡Vas bien! Sigue así';
    emoji = '💪';
  } else if (streak < 7) {
    message = '¡Excelente racha! 🔥';
    emoji = '🌟';
  } else if (streak < 14) {
    message = '¡Increíble compromiso!';
    emoji = '⚡';
  } else if (streak < 30) {
    message = '¡Eres una leyenda!';
    emoji = '👑';
  } else {
    message = '¡Maestro viajero!';
    emoji = '🎖️';
  }

  return (
    <View style={styles.messageContainer}>
      <SmallText style={styles.messageText}>
        {emoji} {message}
      </SmallText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: Colors.warning.main,
  },
  currentStreakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  fireContainer: {
    marginRight: 16,
  },
  fireEmoji: {
    fontSize: 60,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.warning.main,
  },
  streakLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  bestStreakContainer: {
    backgroundColor: Colors.warning.light,
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  bestStreakText: {
    fontWeight: 'bold',
  },
  nextRewardContainer: {
    backgroundColor: Colors.info.light,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  nextRewardLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 6,
  },
  nextRewardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextRewardText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  nextRewardProgress: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  rewardProgressBar: {
    height: 6,
    backgroundColor: Colors.background.secondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  rewardProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 3,
  },
  messageContainer: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary.main,
    textAlign: 'center',
  },
});

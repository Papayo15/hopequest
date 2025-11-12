/**
 * Achievement Notification Component
 * Toast-style notification cuando se desbloquea un logro
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Heading3, BodyText, SmallText } from './Typography';
import { Colors } from '@/constants';
import { Achievement, achievementTierColors } from '@/constants/achievements';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AchievementNotificationProps {
  achievement: Achievement;
  visible: boolean;
  onDismiss: () => void;
  autoHideDuration?: number; // ms
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  visible,
  onDismiss,
  autoHideDuration = 4000,
}) => {
  const translateY = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    } else {
      handleDismiss();
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!visible && translateY.__getValue() === -200) {
    return null;
  }

  const tierColor = achievementTierColors[achievement.tier];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          borderLeftColor: tierColor,
        },
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Heading3>{achievement.icon}</Heading3>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <SmallText color={Colors.primary.main} style={styles.unlocked}>
          🏆 ¡Logro Desbloqueado!
        </SmallText>
        <BodyText style={styles.name}>{achievement.name}</BodyText>
        <SmallText color={Colors.text.secondary} style={styles.description}>
          {achievement.description}
        </SmallText>

        {/* Rewards */}
        <View style={styles.rewards}>
          {achievement.rewards.coins > 0 && (
            <View style={styles.reward}>
              <SmallText>💰 +{achievement.rewards.coins}</SmallText>
            </View>
          )}
          {achievement.rewards.stars && achievement.rewards.stars > 0 && (
            <View style={styles.reward}>
              <SmallText>⭐ +{achievement.rewards.stars}</SmallText>
            </View>
          )}
          {achievement.rewards.title && (
            <View style={styles.reward}>
              <SmallText>🏅 {achievement.rewards.title}</SmallText>
            </View>
          )}
        </View>
      </View>

      {/* Tier badge */}
      <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
        <SmallText style={styles.tierText}>
          {achievement.tier.toUpperCase()}
        </SmallText>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    maxWidth: SCREEN_WIDTH - 40,
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 9999,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  unlocked: {
    fontWeight: '600',
    marginBottom: 2,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
  },
  rewards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reward: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  tierBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  tierText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

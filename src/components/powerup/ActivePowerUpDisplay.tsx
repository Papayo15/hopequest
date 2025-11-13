/**
 * Active Power-Up Display
 * Muestra los power-ups actualmente activos en la pantalla
 * Con barra de tiempo restante - Visual para niños
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SmallText, BodyText } from '../ui';
import { Colors } from '../../constants';
import { usePowerUpStore } from '../../stores/powerUpStore';

export const ActivePowerUpDisplay: React.FC = () => {
  const { activePowerUps, clearExpiredPowerUps } = usePowerUpStore();
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: number }>({});

  // Limpiar power-ups expirados cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      clearExpiredPowerUps();

      // Actualizar tiempo restante
      const newTimeRemaining: { [key: string]: number } = {};
      activePowerUps.forEach((ap) => {
        if (ap.isActive && ap.powerUp.duration > 0) {
          const remaining = Math.max(
            0,
            Math.ceil((ap.expiresAt.getTime() - Date.now()) / 1000)
          );
          newTimeRemaining[ap.powerUp.id] = remaining;
        }
      });
      setTimeRemaining(newTimeRemaining);
    }, 100);

    return () => clearInterval(interval);
  }, [activePowerUps]);

  if (activePowerUps.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {activePowerUps
        .filter((ap) => ap.isActive)
        .map((ap) => {
          const remaining = timeRemaining[ap.powerUp.id] || 0;
          const progress =
            ap.powerUp.duration > 0
              ? remaining / ap.powerUp.duration
              : 0;

          return (
            <PowerUpIndicator
              key={ap.powerUp.id}
              icon={ap.powerUp.icon}
              name={ap.powerUp.name.es}
              color={ap.powerUp.color}
              timeRemaining={remaining}
              progress={progress}
              isInstant={ap.powerUp.duration === 0}
            />
          );
        })}
    </View>
  );
};

interface PowerUpIndicatorProps {
  icon: string;
  name: string;
  color: string;
  timeRemaining: number;
  progress: number;
  isInstant: boolean;
}

const PowerUpIndicator: React.FC<PowerUpIndicatorProps> = ({
  icon,
  name,
  color,
  timeRemaining,
  progress,
  isInstant,
}) => {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animación de pulso constante
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  // Fade out cuando está por expirar
  useEffect(() => {
    if (timeRemaining <= 3 && timeRemaining > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [timeRemaining]);

  return (
    <Animated.View
      style={[
        styles.indicator,
        { borderColor: color, opacity: fadeAnim },
      ]}
    >
      <Animated.View
        style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}
      >
        <BodyText style={styles.icon}>{icon}</BodyText>
      </Animated.View>

      <View style={styles.info}>
        <SmallText style={styles.name} numberOfLines={1}>
          {name}
        </SmallText>

        {!isInstant && (
          <>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
            <SmallText style={styles.timeText}>{timeRemaining}s</SmallText>
          </>
        )}

        {isInstant && (
          <SmallText style={styles.instantText}>✨ ¡Activo!</SmallText>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 1000,
    gap: 8,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderWidth: 3,
    borderRadius: 12,
    padding: 8,
    minWidth: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  timeText: {
    fontSize: 10,
    color: Colors.text.secondary,
    textAlign: 'right',
  },
  instantText: {
    fontSize: 10,
    color: Colors.success.main,
    fontWeight: 'bold',
  },
});

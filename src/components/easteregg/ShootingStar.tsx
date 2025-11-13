/**
 * Shooting Star Easter Egg
 * Easter Egg #2: "Estrella Fugaz"
 *
 * Cuándo aparece: Después de las 8pm (hora del dispositivo)
 * Frecuencia: Cada 3-5 minutos aleatoriamente
 * Qué hacer: Tocarla antes de que desaparezca
 * Recompensa: +100 puntos
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SmallText } from '../ui';
import { Colors } from '../../constants';
import { useEasterEggStore } from '../../stores/easterEggStore';
import { useSFX } from '../../hooks/useAudio';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ShootingStarProps {
  onCaught?: () => void;
  onPointsEarned?: (points: number) => void;
}

export const ShootingStar: React.FC<ShootingStarProps> = ({
  onCaught,
  onPointsEarned,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [starPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [starOpacity] = useState(new Animated.Value(0));
  const [showReward, setShowReward] = useState(false);
  const [rewardPosition, setRewardPosition] = useState({ x: 0, y: 0 });

  const { playSFX } = useSFX();
  const { discoverEasterEgg, triggerEasterEgg, isDiscovered } = useEasterEggStore();

  const alreadyDiscovered = isDiscovered('shooting_star');

  useEffect(() => {
    // Verificar si es de noche (después de las 8pm o antes de las 6am)
    const checkTimeAndSpawn = () => {
      const currentHour = new Date().getHours();
      const isNightTime = currentHour >= 20 || currentHour < 6;

      if (isNightTime && !isVisible) {
        // Programar aparición aleatoria
        const delay = Math.random() * 120000 + 60000; // Entre 1-3 minutos
        setTimeout(() => {
          spawnStar();
        }, delay);
      }
    };

    checkTimeAndSpawn();

    // Verificar cada minuto
    const interval = setInterval(checkTimeAndSpawn, 60000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const spawnStar = () => {
    // Posición inicial (arriba a la derecha)
    const startX = SCREEN_WIDTH - 50;
    const startY = 50 + Math.random() * 100;

    // Posición final (abajo a la izquierda)
    const endX = 50 + Math.random() * 100;
    const endY = 300 + Math.random() * 200;

    starPosition.setValue({ x: startX, y: startY });
    setIsVisible(true);

    // Animación de movimiento y fade
    Animated.parallel([
      Animated.timing(starPosition, {
        toValue: { x: endX, y: endY },
        duration: 3000, // 3 segundos para atraparla
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(starOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(starOpacity, {
          toValue: 0,
          duration: 500,
          delay: 2300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIsVisible(false);
      starOpacity.setValue(0);
    });
  };

  const handleStarCatch = (event: any) => {
    if (!isVisible) return;

    // Obtener posición del toque
    const { locationX, locationY } = event.nativeEvent;

    // Detener animación
    starPosition.stopAnimation();
    starOpacity.stopAnimation();

    setIsVisible(false);
    starOpacity.setValue(0);

    // Marcar como descubierto
    if (!alreadyDiscovered) {
      discoverEasterEgg('shooting_star');
    }
    triggerEasterEgg('shooting_star');

    // Mostrar recompensa en la posición del toque
    setRewardPosition({ x: locationX, y: locationY });
    setShowReward(true);

    if (onCaught) {
      onCaught();
    }

    if (onPointsEarned) {
      onPointsEarned(100);
    }

    playSFX('star_earn');

    // Ocultar recompensa después de 2 segundos
    setTimeout(() => {
      setShowReward(false);
    }, 2000);
  };

  if (!isVisible && !showReward) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Estrella fugaz */}
      {isVisible && (
        <Animated.View
          style={[
            styles.starContainer,
            {
              transform: [
                { translateX: starPosition.x },
                { translateY: starPosition.y },
              ],
              opacity: starOpacity,
            },
          ]}
        >
          <TouchableOpacity onPress={handleStarCatch} activeOpacity={1}>
            <View>
              <ShootingStarGlow />
              <SmallText style={styles.starEmoji}>⭐</SmallText>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Recompensa */}
      {showReward && (
        <RewardPopup x={rewardPosition.x} y={rewardPosition.y} />
      )}
    </View>
  );
};

// Efecto de brillo detrás de la estrella
const ShootingStarGlow: React.FC = () => {
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  return (
    <Animated.View
      style={[
        styles.glow,
        {
          transform: [{ scale: glowScale }],
          opacity: glowAnim,
        },
      ]}
    />
  );
};

// Popup de recompensa
const RewardPopup: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const [popupAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.spring(popupAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(popupAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.rewardPopup,
        {
          left: x - 50,
          top: y - 50,
          transform: [{ scale: popupAnim }],
          opacity: popupAnim,
        },
      ]}
    >
      <SmallText style={styles.rewardText}>+100 ⭐</SmallText>
      <SmallText style={styles.rewardSubtext}>¡Atrapada!</SmallText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9998,
  },
  starContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starEmoji: {
    fontSize: 40,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  glow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    opacity: 0.5,
  },
  rewardPopup: {
    position: 'absolute',
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    alignItems: 'center',
  },
  rewardText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardSubtext: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 2,
  },
});

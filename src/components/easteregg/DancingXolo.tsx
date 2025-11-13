/**
 * Dancing Xolo Easter Egg
 * Easter Egg #1: "Ajolote Bailarín"
 *
 * Cómo activarlo: Tocar 10 veces rápido a Xolo en cualquier pantalla
 * Qué pasa: Xolo empieza a bailar con música mexicana
 * Recompensa: +50 monedas
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';
import { useEasterEggStore } from '../../stores/easterEggStore';
import { useSFX } from '../../hooks/useAudio';

interface DancingXoloProps {
  onDiscovered?: () => void;
  onCoinsEarned?: (coins: number) => void;
}

export const DancingXolo: React.FC<DancingXoloProps> = ({
  onDiscovered,
  onCoinsEarned,
}) => {
  const [isDancing, setIsDancing] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [danceAnim] = useState(new Animated.Value(0));
  const [bounceAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));

  const { playSFX } = useSFX();
  const {
    incrementXoloTap,
    resetXoloTap,
    discoverEasterEgg,
    isDiscovered,
  } = useEasterEggStore();

  const alreadyDiscovered = isDiscovered('dancing_xolo');

  const handleXoloTap = () => {
    const tapCount = incrementXoloTap();

    // Feedback visual en cada tap
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    playSFX('button_press');

    // Al llegar a 10 taps, activar el baile
    if (tapCount >= 10) {
      activateDance();
      resetXoloTap();
    }

    // Resetear contador después de 2 segundos sin tocar
    setTimeout(() => {
      resetXoloTap();
    }, 2000);
  };

  const activateDance = () => {
    setIsDancing(true);

    // Primera vez que se descubre
    if (!alreadyDiscovered) {
      discoverEasterEgg('dancing_xolo');
      if (onDiscovered) {
        onDiscovered();
      }
    }

    // Reproducir música mexicana festiva
    // TODO: Agregar música festiva mexicana

    // Animación de baile
    startDanceAnimation();

    // Mostrar recompensa
    setTimeout(() => {
      setShowReward(true);
      if (onCoinsEarned) {
        onCoinsEarned(50);
      }
      playSFX('coin_collect');
    }, 1500);

    // Terminar baile después de 5 segundos
    setTimeout(() => {
      stopDanceAnimation();
      setIsDancing(false);
      setShowReward(false);
    }, 5000);
  };

  const startDanceAnimation = () => {
    // Animación de baile (balanceo + rotación + saltos)
    Animated.loop(
      Animated.parallel([
        // Balanceo
        Animated.sequence([
          Animated.timing(danceAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(danceAnim, {
            toValue: -1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(danceAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        // Rotación
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopDanceAnimation = () => {
    danceAnim.setValue(0);
    rotateAnim.setValue(0);
  };

  const bounceInterpolate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const danceRotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const danceTranslateX = danceAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-10, 0, 10],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleXoloTap}
        activeOpacity={0.8}
        disabled={isDancing}
      >
        <Animated.View
          style={[
            styles.xoloContainer,
            {
              transform: [
                { scale: isDancing ? 1 : bounceInterpolate },
                { translateX: isDancing ? danceTranslateX : 0 },
                { rotate: isDancing ? danceRotateInterpolate : '0deg' },
              ],
            },
          ]}
        >
          <BodyText style={styles.xoloEmoji}>🦎</BodyText>
        </Animated.View>
      </TouchableOpacity>

      {/* Partículas de música durante el baile */}
      {isDancing && (
        <View style={styles.musicParticles}>
          <MusicNote delay={0} />
          <MusicNote delay={200} />
          <MusicNote delay={400} />
          <MusicNote delay={600} />
        </View>
      )}

      {/* Mensaje de recompensa */}
      {showReward && (
        <Animated.View style={styles.rewardContainer}>
          <BodyText style={styles.rewardText}>+50 💰</BodyText>
          <SmallText style={styles.rewardSubtext}>
            ¡Xolo baila contigo!
          </SmallText>
        </Animated.View>
      )}

      {/* Hint si no está descubierto */}
      {!alreadyDiscovered && !isDancing && (
        <View style={styles.hintContainer}>
          <SmallText style={styles.hintText}>
            💡 Toca rápido a Xolo 10 veces...
          </SmallText>
        </View>
      )}
    </View>
  );
};

// Componente de nota musical flotante
const MusicNote: React.FC<{ delay: number }> = ({ delay }) => {
  const [noteAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(noteAnim, {
            toValue: -100,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(noteAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  const randomX = Math.random() * 60 - 30;

  return (
    <Animated.Text
      style={[
        styles.musicNote,
        {
          left: randomX,
          transform: [{ translateY: noteAnim }],
        },
      ]}
    >
      🎵
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  xoloContainer: {
    padding: 20,
  },
  xoloEmoji: {
    fontSize: 80,
  },
  musicParticles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicNote: {
    position: 'absolute',
    fontSize: 24,
    opacity: 0.8,
  },
  rewardContainer: {
    position: 'absolute',
    top: -50,
    backgroundColor: Colors.success.main,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
  },
  rewardText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rewardSubtext: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  hintContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  hintText: {
    color: '#FFF',
    fontSize: 11,
    textAlign: 'center',
  },
});

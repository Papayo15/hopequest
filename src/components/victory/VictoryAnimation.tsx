/**
 * Victory Animation Component
 * Celebra las victorias con animaciones alegres y confetti
 * Personalizado por personaje para niños de 5-12 años
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Heading1, Heading2, BodyText } from '../ui';
import { Colors } from '../../constants';
import type { FamilyCharacter } from '../../constants/gameConfig';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VictoryAnimationProps {
  character: FamilyCharacter;
  stars: number; // 0-3
  message?: string;
  onComplete?: () => void;
}

// Animaciones por personaje (como Mario Bros)
const CHARACTER_ANIMATIONS: Record<FamilyCharacter, {
  emoji: string;
  animation: string;
  sound?: string;
}> = {
  marco: {
    emoji: '🦊',
    animation: 'jump_punch', // Salta y levanta puño
  },
  xolo: {
    emoji: '🦎',
    animation: 'tongue_celebration', // Lengua al aire
  },
  // Placeholder para otros personajes
  protagonist: {
    emoji: '🧒',
    animation: 'jump',
  },
  companion: {
    emoji: '👧',
    animation: 'dance',
  },
  isabella: {
    emoji: '👧',
    animation: 'twirl',
  },
};

export const VictoryAnimation: React.FC<VictoryAnimationProps> = ({
  character = 'marco',
  stars,
  message,
  onComplete,
}) => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [characterScale] = useState(new Animated.Value(0));
  const [characterRotate] = useState(new Animated.Value(0));
  const [starsScale] = useState(new Animated.Value(0));

  const characterAnim = CHARACTER_ANIMATIONS[character] || CHARACTER_ANIMATIONS.marco;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // 1. Crear confetti
    createConfetti();

    // 2. Animar personaje (entrada con rebote)
    Animated.sequence([
      Animated.spring(characterScale, {
        toValue: 1.3,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(characterScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Animar personaje (rotación celebratoria)
    if (characterAnim.animation === 'jump_punch') {
      // Marco: Salto con puño
      Animated.sequence([
        Animated.timing(characterRotate, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(characterRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (characterAnim.animation === 'twirl') {
      // Patricia/Isabella: Giro elegante
      Animated.timing(characterRotate, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }

    // 4. Animar estrellas (entrada escalonada)
    setTimeout(() => {
      Animated.stagger(
        150,
        Array(stars)
          .fill(0)
          .map(() =>
            Animated.spring(starsScale, {
              toValue: 1,
              friction: 5,
              tension: 40,
              useNativeDriver: true,
            })
          )
      ).start();
    }, 500);

    // 5. Callback de completado
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000);
  };

  const createConfetti = () => {
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#FFA07A', '#DDA0DD'];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 50; i++) {
      const startX = Math.random() * SCREEN_WIDTH;
      const startY = -50;
      const endY = SCREEN_HEIGHT + 100;
      const endX = startX + (Math.random() - 0.5) * 200;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = Math.random() > 0.5 ? 'circle' : 'square';
      const size = 8 + Math.random() * 8;
      const rotation = Math.random() * 360;

      const piece: ConfettiPiece = {
        id: `confetti_${i}`,
        x: new Animated.Value(startX),
        y: new Animated.Value(startY),
        rotate: new Animated.Value(0),
        opacity: new Animated.Value(1),
        color,
        shape,
        size,
      };

      pieces.push(piece);

      // Animar caída
      Animated.parallel([
        Animated.timing(piece.x, {
          toValue: endX,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(piece.y, {
          toValue: endY,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(piece.rotate, {
          toValue: rotation,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(piece.opacity, {
          toValue: 0,
          duration: 2500,
          delay: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setConfettiPieces(pieces);
  };

  const characterRotateInterpolate = characterRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <Animated.View
          key={piece.id}
          style={[
            styles.confetti,
            {
              left: piece.x,
              top: piece.y,
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.shape === 'circle' ? piece.size / 2 : 0,
              opacity: piece.opacity,
              transform: [
                {
                  rotate: piece.rotate.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}

      {/* Personaje celebrando */}
      <View style={styles.characterContainer}>
        <Animated.Text
          style={[
            styles.characterEmoji,
            {
              transform: [
                { scale: characterScale },
                { rotate: characterRotateInterpolate },
              ],
            },
          ]}
        >
          {characterAnim.emoji}
        </Animated.Text>

        {/* Estrellas */}
        <Animated.View
          style={[styles.starsContainer, { transform: [{ scale: starsScale }] }]}
        >
          <Heading1 style={styles.stars}>
            {'⭐'.repeat(stars)}
            {'☆'.repeat(3 - stars)}
          </Heading1>
        </Animated.View>

        {/* Mensaje */}
        {message && (
          <View style={styles.messageContainer}>
            <Heading2 style={styles.message}>{message}</Heading2>
          </View>
        )}

        {/* Mensaje motivacional por estrellas */}
        <View style={styles.motivationContainer}>
          <BodyText style={styles.motivation}>
            {stars === 3 && '🎉 ¡Perfecto! ¡Eres increíble!'}
            {stars === 2 && '👏 ¡Muy bien! ¡Sigue así!'}
            {stars === 1 && '👍 ¡Buen trabajo! ¡Puedes mejorar!'}
            {stars === 0 && '💪 ¡No te rindas! ¡Inténtalo de nuevo!'}
          </BodyText>
        </View>
      </View>

      {/* Efectos adicionales: fuegos artificiales para 3 estrellas */}
      {stars === 3 && <FireworksEffect />}
    </View>
  );
};

// Componente de fuegos artificiales (solo para 3 estrellas)
const FireworksEffect: React.FC = () => {
  const [fireworks, setFireworks] = useState<FireworkParticle[]>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF1493', '#00FFFF', '#00FF00'];
    const particles: FireworkParticle[] = [];

    // Crear 3 explosiones de fuegos artificiales
    for (let explosion = 0; explosion < 3; explosion++) {
      const centerX = SCREEN_WIDTH * (0.2 + explosion * 0.3);
      const centerY = 100 + Math.random() * 100;

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 50 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        const particle: FireworkParticle = {
          id: `firework_${explosion}_${i}`,
          x: new Animated.Value(centerX),
          y: new Animated.Value(centerY),
          opacity: new Animated.Value(0),
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        particles.push(particle);

        // Animar explosión
        Animated.parallel([
          Animated.timing(particle.x, {
            toValue: endX,
            duration: 800,
            delay: explosion * 400,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: endY,
            duration: 800,
            delay: explosion * 400,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: 1,
              duration: 100,
              delay: explosion * 400,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 700,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      }
    }

    setFireworks(particles);
  }, []);

  return (
    <>
      {fireworks.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.firework,
            {
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
    </>
  );
};

interface ConfettiPiece {
  id: string;
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  opacity: Animated.Value;
  color: string;
  shape: 'circle' | 'square';
  size: number;
}

interface FireworkParticle {
  id: string;
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  color: string;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  confetti: {
    position: 'absolute',
  },
  characterContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  characterEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  starsContainer: {
    marginBottom: 16,
  },
  stars: {
    fontSize: 48,
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.primary.main,
  },
  motivationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  motivation: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  firework: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

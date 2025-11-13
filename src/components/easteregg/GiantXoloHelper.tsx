/**
 * Giant Xolo Helper Easter Egg
 * Easter Egg #3: "Xolo Gigante"
 *
 * Cuándo aparece: Automático después de fallar 5 veces en el mismo nivel
 * Qué hace: Xolo se hace gigante y ayuda a completar el nivel
 * Propósito: Anti-frustración para niños pequeños
 * Mensaje educativo: "¡No te rindas! Xolo te ayuda"
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';
import { useEasterEggStore } from '../../stores/easterEggStore';
import { useSFX } from '../../hooks/useAudio';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GiantXoloHelperProps {
  countryId: string;
  failCount: number;
  onHelp: () => void; // Callback para ayudar a completar el nivel
  onDecline?: () => void; // Si el jugador rechaza la ayuda
}

export const GiantXoloHelper: React.FC<GiantXoloHelperProps> = ({
  countryId,
  failCount,
  onHelp,
  onDecline,
}) => {
  const [showHelper, setShowHelper] = useState(false);
  const [xoloScale] = useState(new Animated.Value(0));
  const [xoloRotate] = useState(new Animated.Value(0));
  const [helpAccepted, setHelpAccepted] = useState(false);

  const { playSFX } = useSFX();
  const { discoverEasterEgg, triggerEasterEgg, incrementLevelFail } = useEasterEggStore();

  useEffect(() => {
    // Mostrar ayuda automáticamente después de 5 fallos
    if (failCount >= 5 && !showHelper && !helpAccepted) {
      incrementLevelFail(countryId);
      setShowHelper(true);
      animateXoloEntrance();
    }
  }, [failCount]);

  const animateXoloEntrance = () => {
    // Animación de entrada dramática
    Animated.parallel([
      Animated.spring(xoloScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(xoloRotate, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(xoloRotate, {
            toValue: -1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(xoloRotate, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Sonido dramático
    playSFX('portal_enter'); // Reutilizar sonido existente
  };

  const handleAcceptHelp = () => {
    setHelpAccepted(true);

    // Descubrir easter egg
    discoverEasterEgg('giant_xolo_helper');
    triggerEasterEgg('giant_xolo_helper');

    // Animación de salida
    Animated.timing(xoloScale, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowHelper(false);
      onHelp(); // Activar la ayuda
    });

    playSFX('success');
  };

  const handleDeclineHelp = () => {
    // Animación de salida
    Animated.timing(xoloScale, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowHelper(false);
      if (onDecline) {
        onDecline();
      }
    });
  };

  const xoloRotateInterpolate = xoloRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  if (!showHelper) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* Xolo Gigante */}
        <Animated.View
          style={[
            styles.xoloContainer,
            {
              transform: [
                { scale: xoloScale },
                { rotate: xoloRotateInterpolate },
              ],
            },
          ]}
        >
          <BodyText style={styles.giantXolo}>🦎</BodyText>

          {/* Efecto de brillo */}
          <GlowEffect />
        </Animated.View>

        {/* Diálogo */}
        <View style={styles.dialogBox}>
          <Heading2 style={styles.dialogTitle}>
            ¡No te rindas! 💪
          </Heading2>

          <BodyText style={styles.dialogMessage}>
            Hola, soy Xolo. Veo que este nivel es difícil.
            ¿Quieres que te ayude a completarlo?
          </BodyText>

          <SmallText style={styles.dialogNote}>
            📚 Aprender también significa pedir ayuda cuando la necesitas.
            ¡Eso es ser valiente!
          </SmallText>

          {/* Botones */}
          <View style={styles.buttons}>
            <Button
              title="Sí, ayúdame Xolo 🦎"
              onPress={handleAcceptHelp}
              variant="primary"
              fullWidth
              style={styles.acceptButton}
            />

            <Button
              title="No gracias, lo intentaré de nuevo"
              onPress={handleDeclineHelp}
              variant="outline"
              fullWidth
              style={styles.declineButton}
            />
          </View>

          <SmallText style={styles.encouragement}>
            {helpAccepted
              ? '¡Juntos lo lograremos! 🌟'
              : '¡Tú puedes! Sigue intentando 💪'
            }
          </SmallText>
        </View>
      </View>

      {/* Partículas de apoyo */}
      <SupportParticles />
    </View>
  );
};

// Efecto de brillo alrededor de Xolo
const GlowEffect: React.FC = () => {
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <Animated.View
      style={[
        styles.glow,
        {
          opacity: glowOpacity,
        },
      ]}
    />
  );
};

// Partículas de corazones flotando
const SupportParticles: React.FC = () => {
  const particles = [0, 1, 2, 3, 4, 5];

  return (
    <View style={styles.particlesContainer}>
      {particles.map((i) => (
        <FloatingHeart key={i} delay={i * 400} />
      ))}
    </View>
  );
};

const FloatingHeart: React.FC<{ delay: number }> = ({ delay }) => {
  const [heartAnim] = useState(new Animated.Value(SCREEN_HEIGHT));

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(heartAnim, {
          toValue: -100,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();
    }, delay);
  }, []);

  const randomX = Math.random() * SCREEN_WIDTH;

  return (
    <Animated.Text
      style={[
        styles.heart,
        {
          left: randomX,
          transform: [{ translateY: heartAnim }],
        },
      ]}
    >
      💚
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  xoloContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giantXolo: {
    fontSize: 150,
    textShadowColor: '#98FB98',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#98FB98',
  },
  dialogBox: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    padding: 24,
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  dialogTitle: {
    textAlign: 'center',
    color: Colors.primary.main,
    marginBottom: 12,
  },
  dialogMessage: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  dialogNote: {
    backgroundColor: Colors.info.light,
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  buttons: {
    gap: 12,
    marginBottom: 12,
  },
  acceptButton: {
    backgroundColor: Colors.success.main,
  },
  declineButton: {
    borderColor: Colors.text.secondary,
  },
  encouragement: {
    textAlign: 'center',
    color: Colors.success.main,
    fontWeight: 'bold',
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  heart: {
    position: 'absolute',
    fontSize: 30,
    opacity: 0.6,
  },
});

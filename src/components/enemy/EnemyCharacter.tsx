/**
 * Enemy Character Component
 * Componente visual para enemigos educativos
 * Estilo Mario Bros - Enemigos cartoon sin violencia
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Enemy } from '../../types/enemies';
import { Colors } from '../../constants';

interface EnemyCharacterProps {
  enemy: Enemy;
  position: { x: number; y: number };
  currentHealth: number;
  onTouch: () => void; // Cuando el jugador toca al enemigo
  onDefeat?: () => void; // Cuando el enemigo es derrotado
  isActive?: boolean; // Si está activo en el nivel
}

export const EnemyCharacter: React.FC<EnemyCharacterProps> = ({
  enemy,
  position,
  currentHealth,
  onTouch,
  onDefeat,
  isActive = true,
}) => {
  const [bounceAnim] = useState(new Animated.Value(0));
  const [shakeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animación de rebote continuo (como Goomba)
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -8,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isActive]);

  useEffect(() => {
    // Animación de "daño" cuando pierde vida
    if (currentHealth < enemy.health && currentHealth > 0) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [currentHealth]);

  useEffect(() => {
    // Animación de derrota (desaparece con puff)
    if (currentHealth <= 0) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onDefeat) {
          onDefeat();
        }
      });
    }
  }, [currentHealth]);

  if (!isActive || currentHealth <= 0) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            left: position.x,
            top: position.y,
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Efecto de nube "puff" al desaparecer */}
        <DefeatCloud />
      </Animated.View>
    );
  }

  const sizeStyle = SIZE_STYLES[enemy.size];

  return (
    <TouchableOpacity onPress={onTouch} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.container,
          sizeStyle,
          {
            left: position.x,
            top: position.y,
            transform: [
              { translateY: bounceAnim },
              { translateX: shakeAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        {/* Cuerpo del enemigo */}
        <View
          style={[
            styles.enemyBody,
            {
              backgroundColor: enemy.color,
            },
          ]}
        >
          <BodyText style={styles.emoji}>{enemy.emoji}</BodyText>

          {/* Barra de vida */}
          <HealthBar current={currentHealth} max={enemy.health} />
        </View>

        {/* Nombre del enemigo */}
        <SmallText style={styles.enemyName}>{enemy.name.es}</SmallText>

        {/* Sombra */}
        <EnemyShadow />
      </Animated.View>
    </TouchableOpacity>
  );
};

// Barra de vida del enemigo
interface HealthBarProps {
  current: number;
  max: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max }) => {
  const percentage = (current / max) * 100;

  return (
    <View style={styles.healthBarContainer}>
      <View style={styles.healthBarBackground}>
        <View
          style={[
            styles.healthBarFill,
            {
              width: `${percentage}%`,
              backgroundColor:
                percentage > 50
                  ? Colors.success.main
                  : percentage > 25
                  ? Colors.warning.main
                  : Colors.error.main,
            },
          ]}
        />
      </View>
    </View>
  );
};

// Sombra debajo del enemigo
const EnemyShadow: React.FC = () => {
  return <View style={styles.shadow} />;
};

// Nube de derrota (puff)
const DefeatCloud: React.FC = () => {
  return (
    <View style={styles.defeatCloud}>
      <BodyText style={styles.cloudEmoji}>💨</BodyText>
    </View>
  );
};

const SIZE_STYLES = {
  small: {
    width: 50,
    height: 50,
  },
  medium: {
    width: 70,
    height: 70,
  },
  large: {
    width: 90,
    height: 90,
  },
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
  },
  enemyBody: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 32,
  },
  enemyName: {
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    color: '#FFF',
    fontSize: 10,
    textAlign: 'center',
    maxWidth: 100,
  },
  healthBarContainer: {
    position: 'absolute',
    bottom: 5,
    width: '80%',
  },
  healthBarBackground: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  shadow: {
    position: 'absolute',
    bottom: -8,
    width: '70%',
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  defeatCloud: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudEmoji: {
    fontSize: 50,
  },
});

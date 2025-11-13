/**
 * Route Lines Component
 * Líneas punteadas que conectan países en el mapa
 * Estilo Mario World - Caminos visuales entre niveles
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants';
import { SmallText } from '../ui';

interface Route {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface RouteLinesProps {
  routes: Route[];
  animated?: boolean; // Animación de "revelación"
}

export const RouteLines: React.FC<RouteLinesProps> = ({
  routes,
  animated = true,
}) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {routes.map((route, index) => (
        <RouteLine
          key={index}
          from={route.from}
          to={route.to}
          isUnlocked={route.isUnlocked}
          isCompleted={route.isCompleted}
          animated={animated}
          delay={index * 500}
        />
      ))}
    </View>
  );
};

interface RouteLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isUnlocked: boolean;
  isCompleted: boolean;
  animated: boolean;
  delay: number;
}

const RouteLine: React.FC<RouteLineProps> = ({
  from,
  to,
  isUnlocked,
  isCompleted,
  animated,
  delay,
}) => {
  const [revealAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (animated && isUnlocked) {
      setTimeout(() => {
        Animated.timing(revealAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, delay);
    } else if (isUnlocked) {
      revealAnim.setValue(1);
    }
  }, [isUnlocked]);

  // Calcular posición y rotación de la línea
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const lineColor = isCompleted
    ? Colors.success.main
    : isUnlocked
    ? Colors.primary.main
    : Colors.text.disabled;

  const lineOpacity = isUnlocked ? 1 : 0.3;

  return (
    <Animated.View
      style={[
        styles.lineContainer,
        {
          left: from.x,
          top: from.y,
          width: distance,
          opacity: revealAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, lineOpacity],
          }),
          transform: [
            {
              rotate: `${angle}deg`,
            },
          ],
        },
      ]}
    >
      {/* Línea punteada */}
      <DottedLine
        length={distance}
        color={lineColor}
        isCompleted={isCompleted}
        isUnlocked={isUnlocked}
      />
    </Animated.View>
  );
};

interface DottedLineProps {
  length: number;
  color: string;
  isCompleted: boolean;
  isUnlocked: boolean;
}

const DottedLine: React.FC<DottedLineProps> = ({
  length,
  color,
  isCompleted,
  isUnlocked,
}) => {
  const dotSize = 8;
  const dotSpacing = 15;
  const dotCount = Math.floor(length / dotSpacing);

  const dots = Array.from({ length: dotCount }, (_, i) => i);

  return (
    <View style={styles.line}>
      {dots.map((i) => (
        <DotWithAnimation
          key={i}
          color={color}
          size={dotSize}
          position={i * dotSpacing}
          isCompleted={isCompleted}
          isUnlocked={isUnlocked}
          delay={i * 50}
        />
      ))}
    </View>
  );
};

interface DotWithAnimationProps {
  color: string;
  size: number;
  position: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  delay: number;
}

const DotWithAnimation: React.FC<DotWithAnimationProps> = ({
  color,
  size,
  position,
  isCompleted,
  isUnlocked,
  delay,
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animación de aparición
    setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, delay);

    // Pulso si está completado
    if (isCompleted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isCompleted]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          left: position,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
        },
      ]}
    >
      {/* Estrella si está completado */}
      {isCompleted && (
        <SmallText style={styles.starIcon}>⭐</SmallText>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  lineContainer: {
    position: 'absolute',
    height: 10,
  },
  line: {
    flex: 1,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 6,
    position: 'absolute',
  },
});

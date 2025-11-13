/**
 * Day/Night Cycle Component
 * Cambia la apariencia del mapa según la hora del día
 * Estilo Mario World - El cielo cambia de color
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants';

interface DayNightCycleProps {
  children: React.ReactNode;
}

interface SkyColors {
  top: string;
  bottom: string;
  stars: boolean;
  moon: boolean;
}

const getSkyColors = (hour: number): SkyColors => {
  // Amanecer (5-7am)
  if (hour >= 5 && hour < 7) {
    return {
      top: '#FF7F50', // Coral
      bottom: '#FFD700', // Oro
      stars: false,
      moon: false,
    };
  }

  // Día (7am-5pm)
  if (hour >= 7 && hour < 17) {
    return {
      top: '#87CEEB', // Azul cielo
      bottom: '#B0E0E6', // Azul claro
      stars: false,
      moon: false,
    };
  }

  // Atardecer (5-8pm)
  if (hour >= 17 && hour < 20) {
    return {
      top: '#FF6347', // Tomate
      bottom: '#FFA500', // Naranja
      stars: false,
      moon: false,
    };
  }

  // Noche (8pm-5am)
  return {
    top: '#191970', // Azul medianoche
    bottom: '#000080', // Azul marino
    stars: true,
    moon: true,
  };
};

export const DayNightCycle: React.FC<DayNightCycleProps> = ({ children }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [skyColors, setSkyColors] = useState(getSkyColors(currentHour));
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Actualizar cada minuto
    const interval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== currentHour) {
        // Transición suave
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();

        setCurrentHour(newHour);
        setSkyColors(getSkyColors(newHour));
      }
    }, 60000); // Cada minuto

    return () => clearInterval(interval);
  }, [currentHour]);

  return (
    <View style={styles.container}>
      {/* Fondo del cielo con gradiente */}
      <Animated.View
        style={[
          styles.skyGradient,
          {
            backgroundColor: skyColors.top,
            opacity: fadeAnim,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.skyBottom,
          {
            backgroundColor: skyColors.bottom,
            opacity: fadeAnim,
          },
        ]}
      />

      {/* Estrellas en la noche */}
      {skyColors.stars && <Stars />}

      {/* Luna en la noche */}
      {skyColors.moon && <Moon />}

      {/* Contenido del mapa */}
      {children}
    </View>
  );
};

// Componente de estrellas parpadeantes
const Stars: React.FC = () => {
  const stars = Array.from({ length: 50 }, (_, i) => i);

  return (
    <View style={styles.starsContainer}>
      {stars.map((i) => (
        <TwinklingStar key={i} index={i} />
      ))}
    </View>
  );
};

const TwinklingStar: React.FC<{ index: number }> = ({ index }) => {
  const [opacity] = useState(new Animated.Value(Math.random()));

  useEffect(() => {
    // Parpadeo aleatorio
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const randomX = Math.random() * 100;
  const randomY = Math.random() * 50;
  const randomSize = 1 + Math.random() * 2;

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: `${randomX}%`,
          top: `${randomY}%`,
          width: randomSize,
          height: randomSize,
          opacity,
        },
      ]}
    />
  );
};

// Luna con brillo suave
const Moon: React.FC = () => {
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View style={styles.moonContainer}>
      {/* Brillo de la luna */}
      <Animated.View
        style={[
          styles.moonGlow,
          {
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Luna */}
      <View style={styles.moon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  skyGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  skyBottom: {
    position: 'absolute',
    top: '60%',
    left: 0,
    right: 0,
    bottom: 0,
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 1,
  },
  moonContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: 60,
    height: 60,
    zIndex: 2,
  },
  moon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
  },
  moonGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    top: -10,
    left: -10,
  },
});

/**
 * Country Marker Component
 * Marcadores interactivos para países en el mapa
 * Estilo Mario World - Punto con bandera que rebota
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';

interface CountryMarkerProps {
  country: {
    id: string;
    name: string;
    flag: string;
    position: { x: number; y: number };
  };
  isUnlocked: boolean;
  isCompleted: boolean;
  isActive?: boolean; // País actual
  onPress: () => void;
}

export const CountryMarker: React.FC<CountryMarkerProps> = ({
  country,
  isUnlocked,
  isCompleted,
  isActive = false,
  onPress,
}) => {
  const [bounceAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Rebote continuo (como Mario World)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
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

    // Pulso para país activo
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Brillo para país activo
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
    }
  }, [isActive]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: country.position.x,
          top: country.position.y,
          transform: [
            { translateY: bounceAnim },
            { scale: pulseAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={!isUnlocked}
      >
        <View style={styles.markerContainer}>
          {/* Brillo detrás del marcador (país activo) */}
          {isActive && (
            <Animated.View
              style={[
                styles.glow,
                {
                  opacity: glowAnim,
                },
              ]}
            />
          )}

          {/* Base del marcador */}
          <View
            style={[
              styles.markerBase,
              isCompleted && styles.completedBase,
              isActive && styles.activeBase,
              !isUnlocked && styles.lockedBase,
            ]}
          >
            {/* Contenido del marcador */}
            {!isUnlocked ? (
              // País bloqueado: signo de interrogación
              <LockedMarker />
            ) : (
              // País desbloqueado: bandera
              <View style={styles.flagContainer}>
                <BodyText style={styles.flag}>{country.flag}</BodyText>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <SmallText style={styles.completedIcon}>✓</SmallText>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Nombre del país */}
          {isUnlocked && (
            <View style={styles.nameContainer}>
              <SmallText style={styles.countryName}>
                {country.name}
              </SmallText>
            </View>
          )}

          {/* Sombra */}
          <MarkerShadow />
        </View>
      </TouchableOpacity>

      {/* Indicador de nuevo país disponible */}
      {isUnlocked && !isCompleted && !isActive && (
        <NewIndicator />
      )}
    </Animated.View>
  );
};

// Marcador bloqueado con signo de interrogación
const LockedMarker: React.FC = () => {
  return (
    <View style={styles.lockedContent}>
      <BodyText style={styles.questionMark}>?</BodyText>
    </View>
  );
};

// Sombra debajo del marcador
const MarkerShadow: React.FC = () => {
  return <View style={styles.shadow} />;
};

// Indicador de "NUEVO" para países disponibles
const NewIndicator: React.FC = () => {
  const [blinkAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.newBadge,
        {
          opacity: blinkAnim,
        },
      ]}
    >
      <SmallText style={styles.newText}>NUEVO</SmallText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerBase: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.background.primary,
    borderWidth: 3,
    borderColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  completedBase: {
    borderColor: Colors.success.main,
    backgroundColor: Colors.success.light,
  },
  activeBase: {
    borderColor: Colors.warning.main,
    borderWidth: 4,
  },
  lockedBase: {
    borderColor: Colors.text.disabled,
    backgroundColor: Colors.background.secondary,
  },
  glow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.warning.main,
    top: -10,
    left: -10,
  },
  flagContainer: {
    position: 'relative',
  },
  flag: {
    fontSize: 36,
  },
  completedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.success.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIcon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lockedContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 40,
    color: Colors.text.disabled,
  },
  nameContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    maxWidth: 100,
  },
  countryName: {
    color: '#FFF',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  shadow: {
    position: 'absolute',
    bottom: -10,
    width: 40,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  newBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: Colors.error.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 3,
  },
  newText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

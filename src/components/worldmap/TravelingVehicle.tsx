/**
 * Traveling Vehicle Component
 * Avión/Barco/Tren animado que viaja entre países
 * Estilo Mario World - Visual y divertido para niños
 */

import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { BodyText } from '../ui';

type VehicleType = 'plane' | 'boat' | 'train' | 'car';

interface TravelingVehicleProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  vehicleType: VehicleType;
  duration?: number; // Milisegundos
  onComplete?: () => void;
}

const VEHICLE_EMOJIS: Record<VehicleType, string> = {
  plane: '✈️',
  boat: '🚢',
  train: '🚂',
  car: '🚗',
};

export const TravelingVehicle: React.FC<TravelingVehicleProps> = ({
  from,
  to,
  vehicleType,
  duration = 2000,
  onComplete,
}) => {
  const [position] = useState(
    new Animated.ValueXY({ x: from.x, y: from.y })
  );
  const [rotation] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    // Calcular ángulo de rotación
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Animación de viaje
    Animated.sequence([
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Rotar hacia el destino
      Animated.timing(rotation, {
        toValue: angle,
        duration: 300,
        useNativeDriver: true,
      }),
      // Moverse al destino
      Animated.timing(position, {
        toValue: { x: to.x, y: to.y },
        duration,
        useNativeDriver: true,
      }),
      // Fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onComplete) {
        onComplete();
      }
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.vehicle,
        {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            {
              rotate: rotation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
          opacity,
        },
      ]}
    >
      <BodyText style={styles.vehicleEmoji}>
        {VEHICLE_EMOJIS[vehicleType]}
      </BodyText>

      {/* Estela/trail detrás del vehículo */}
      <VehicleTrail vehicleType={vehicleType} />
    </Animated.View>
  );
};

// Estela animada detrás del vehículo
const VehicleTrail: React.FC<{ vehicleType: VehicleType }> = ({ vehicleType }) => {
  const [trailOpacity] = useState(new Animated.Value(0.5));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(trailOpacity, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(trailOpacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  let trailEmoji = '💨'; // Default
  if (vehicleType === 'boat') trailEmoji = '🌊';
  if (vehicleType === 'plane') trailEmoji = '☁️';

  return (
    <Animated.Text
      style={[
        styles.trail,
        {
          opacity: trailOpacity,
        },
      ]}
    >
      {trailEmoji}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  vehicle: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleEmoji: {
    fontSize: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  trail: {
    position: 'absolute',
    left: -30,
    fontSize: 20,
  },
});

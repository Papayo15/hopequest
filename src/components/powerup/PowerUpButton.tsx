/**
 * Power-Up Button Component
 * Botón para activar power-ups durante el juego
 * Diseño simple y colorido para niños de 5-12 años
 */

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import { BodyText, SmallText, Modal } from '../ui';
import { Colors } from '../../constants';
import type { CulturalPowerUp } from '../../types/powerups';

interface PowerUpButtonProps {
  powerUp: CulturalPowerUp;
  onActivate: () => void;
  disabled?: boolean;
  count?: number; // Cuántos tiene de este power-up
}

export const PowerUpButton: React.FC<PowerUpButtonProps> = ({
  powerUp,
  onActivate,
  disabled = false,
  count = 1,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (disabled) return;

    // Animación de pulso
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onActivate();
  };

  const handleLongPress = () => {
    setShowInfo(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={disabled}
        style={[
          styles.button,
          { borderColor: powerUp.color, backgroundColor: `${powerUp.color}20` },
          disabled && styles.disabled,
        ]}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <BodyText style={styles.icon}>{powerUp.icon}</BodyText>
        </Animated.View>
        {count > 1 && (
          <View style={[styles.badge, { backgroundColor: powerUp.color }]}>
            <SmallText style={styles.badgeText}>×{count}</SmallText>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal de información */}
      <Modal
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        title={powerUp.name.es}
        size="medium"
      >
        <View style={styles.modalContent}>
          <BodyText style={styles.modalIcon}>{powerUp.icon}</BodyText>

          <BodyText style={styles.description}>
            {powerUp.description.es}
          </BodyText>

          <View style={styles.funFactCard}>
            <SmallText style={styles.funFactLabel}>💡 Dato Curioso:</SmallText>
            <SmallText style={styles.funFactText}>
              {powerUp.funFact.es}
            </SmallText>
          </View>

          <View style={styles.details}>
            <SmallText style={styles.detailText}>
              🌍 País: {powerUp.country.toUpperCase()}
            </SmallText>
            {powerUp.duration > 0 && (
              <SmallText style={styles.detailText}>
                ⏱️ Duración: {powerUp.duration} segundos
              </SmallText>
            )}
          </View>

          <TouchableOpacity
            style={[styles.activateButton, { backgroundColor: powerUp.color }]}
            onPress={() => {
              setShowInfo(false);
              handlePress();
            }}
          >
            <BodyText style={styles.activateButtonText}>
              ¡Usar Ahora!
            </BodyText>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 32,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalContent: {
    alignItems: 'center',
    padding: 16,
  },
  modalIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '600',
  },
  funFactCard: {
    backgroundColor: Colors.background.secondary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  funFactLabel: {
    fontWeight: 'bold',
    color: Colors.primary.main,
    marginBottom: 4,
  },
  funFactText: {
    lineHeight: 18,
  },
  details: {
    marginBottom: 16,
    alignItems: 'center',
  },
  detailText: {
    marginVertical: 2,
    color: Colors.text.secondary,
  },
  activateButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
  },
  activateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

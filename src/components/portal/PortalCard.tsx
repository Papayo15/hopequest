/**
 * PortalCard Component
 * Card visual para cada tipo de portal de migración
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Heading3, BodyText, SmallText } from '../ui/Typography';
import { Colors } from '../../constants';
import type { PortalType } from '../../types';

interface PortalCardProps {
  portalType: PortalType;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  costs: {
    time: number;
    emotional?: number;
  };
  risks: {
    health: number;
    detection: number;
  };
  onPress: () => void;
  selected?: boolean;
}

const PORTAL_COLORS: Record<PortalType, string> = {
  avion: '#4A90E2',      // Azul cielo (aire)
  barco: '#2E5C8A',      // Azul marino (mar)
  tren: '#8B7355',       // Café (terrestre)
  autobus: '#F4A261',    // Naranja (transporte común)
  carro: '#E27D60',      // Coral (personal)
  balsa: '#5A9FD4',      // Azul claro (agua arriesgado)
  tunel: '#5A5A5A',      // Gris (subterráneo)
  puente: '#A67C52',     // Tan (estructura)
  caminando: '#7CB342',  // Verde (naturaleza, básico)
};

const PORTAL_GRADIENTS: Record<PortalType, string[]> = {
  avion: ['#87CEEB', '#4A90E2'],
  barco: ['#4A90E2', '#2E5C8A'],
  tren: ['#D2B48C', '#8B7355'],
  autobus: ['#FFD54F', '#F4A261'],
  carro: ['#F4A261', '#E27D60'],
  balsa: ['#81D4FA', '#5A9FD4'],
  tunel: ['#808080', '#3A3A3A'],
  puente: ['#D7CCC8', '#A67C52'],
  caminando: ['#AED581', '#7CB342'],
};

export const PortalCard: React.FC<PortalCardProps> = ({
  portalType,
  name,
  description,
  icon,
  unlocked,
  costs,
  risks,
  onPress,
  selected = false,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const portalColor = PORTAL_COLORS[portalType];
  const riskLevel = (risks.health + risks.detection) / 2;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
        selected && styles.selected,
      ]}
    >
      <TouchableOpacity
        onPress={unlocked ? onPress : undefined}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={!unlocked}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <View
          style={[
            styles.card,
            { borderLeftColor: portalColor, borderLeftWidth: 4 },
            !unlocked && styles.locked,
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: portalColor }]}>
              <BodyText style={styles.icon}>{unlocked ? icon : '🔒'}</BodyText>
            </View>
            <View style={styles.headerText}>
              <Heading3 color={unlocked ? Colors.text.primary : Colors.text.tertiary}>
                {name}
              </Heading3>
              {!unlocked && (
                <SmallText color={Colors.warning}>Bloqueado</SmallText>
              )}
            </View>
          </View>

          {/* Description */}
          {unlocked && (
            <BodyText
              color={Colors.text.secondary}
              style={styles.description}
              numberOfLines={2}
            >
              {description}
            </BodyText>
          )}

          {/* Stats */}
          {unlocked && (
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <SmallText color={Colors.text.tertiary}>⏱️ Tiempo</SmallText>
                <BodyText color={Colors.info}>{costs.time}d</BodyText>
              </View>
              {costs.emotional !== undefined && costs.emotional > 0 && (
                <View style={styles.statItem}>
                  <SmallText color={Colors.text.tertiary}>💭 Emocional</SmallText>
                  <BodyText color={Colors.warning}>{costs.emotional}/10</BodyText>
                </View>
              )}
              <View style={styles.statItem}>
                <SmallText color={Colors.text.tertiary}>⚠️ Riesgo</SmallText>
                <BodyText
                  color={
                    riskLevel < 0.3
                      ? Colors.success
                      : riskLevel < 0.6
                      ? Colors.warning
                      : Colors.error
                  }
                >
                  {riskLevel < 0.3 ? 'Bajo' : riskLevel < 0.6 ? 'Medio' : 'Alto'}
                </BodyText>
              </View>
            </View>
          )}

          {/* Risk Details */}
          {unlocked && (
            <View style={styles.risks}>
              <View style={styles.riskBar}>
                <SmallText color={Colors.text.tertiary}>Salud</SmallText>
                <View style={styles.bar}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${risks.health * 100}%`,
                        backgroundColor:
                          risks.health < 0.3
                            ? Colors.success
                            : risks.health < 0.6
                            ? Colors.warning
                            : Colors.error,
                      },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.riskBar}>
                <SmallText color={Colors.text.tertiary}>Detección</SmallText>
                <View style={styles.bar}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${risks.detection * 100}%`,
                        backgroundColor:
                          risks.detection < 0.3
                            ? Colors.success
                            : risks.detection < 0.6
                            ? Colors.warning
                            : Colors.error,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Selected Indicator */}
          {selected && (
            <View style={styles.selectedBadge}>
              <SmallText color={Colors.primary.contrastText}>✓ Seleccionado</SmallText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  touchable: {
    borderRadius: 16,
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selected: {
    shadowColor: Colors.primary.main,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  locked: {
    opacity: 0.6,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  description: {
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background.tertiary,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  risks: {
    gap: 8,
  },
  riskBar: {
    gap: 4,
  },
  bar: {
    height: 6,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

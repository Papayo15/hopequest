/**
 * PackingItem Component
 * Componente visual para items en el mini-juego de equipaje
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BodyText, SmallText } from '../ui/Typography';
import { Colors } from '../../constants';
import type { PackingItem as PackingItemType } from '../../types';

interface PackingItemProps {
  item: PackingItemType;
  selected?: boolean;
  packed?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  documents: '#4A90E2',
  money: '#2ECC71',
  clothing: '#9B59B6',
  food: '#E67E22',
  personal: '#1ABC9C',
  sentimental: '#E74C3C',
  tools: '#95A5A6',
};

const CATEGORY_ICONS: Record<string, string> = {
  documents: '📄',
  money: '💰',
  clothing: '👕',
  food: '🍎',
  personal: '🧴',
  sentimental: '📸',
  tools: '🔧',
};

export const PackingItem: React.FC<PackingItemProps> = ({
  item,
  selected = false,
  packed = false,
  onPress,
  onLongPress,
  disabled = false,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (packed) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [packed]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: packed ? 0.9 : 1,
      useNativeDriver: true,
    }).start();
  };

  const categoryColor = CATEGORY_COLORS[item.category] || Colors.text.tertiary;
  const categoryIcon = CATEGORY_ICONS[item.category] || '📦';

  // Calculate total effect value for display
  const totalEffectValue = item.effects?.reduce((sum, effect) => {
    return sum + (effect.value || 0);
  }, 0) || 0;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        selected && styles.selected,
        packed && styles.packed,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <View
          style={[
            styles.card,
            { borderLeftColor: categoryColor, borderLeftWidth: 4 },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
              <BodyText style={styles.icon}>{categoryIcon}</BodyText>
            </View>
            <View style={styles.headerText}>
              <BodyText
                color={packed ? Colors.text.tertiary : Colors.text.primary}
                numberOfLines={1}
              >
                {item.name.es}
              </BodyText>
              <SmallText color={Colors.text.tertiary}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </SmallText>
            </View>
            {item.isMandatory && (
              <View style={styles.mandatoryBadge}>
                <SmallText color={Colors.error}>⚠️</SmallText>
              </View>
            )}
          </View>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <SmallText color={Colors.text.tertiary}>Peso</SmallText>
              <SmallText color={Colors.text.secondary}>{item.weight}kg</SmallText>
            </View>
            <View style={styles.statItem}>
              <SmallText color={Colors.text.tertiary}>Volumen</SmallText>
              <SmallText color={Colors.text.secondary}>{item.volume}L</SmallText>
            </View>
            {item.effects && item.effects.length > 0 && (
              <View style={styles.statItem}>
                <SmallText color={Colors.text.tertiary}>Efecto</SmallText>
                <SmallText
                  color={
                    totalEffectValue > 0
                      ? Colors.success
                      : totalEffectValue < 0
                      ? Colors.error
                      : Colors.text.secondary
                  }
                >
                  {totalEffectValue > 0 ? '+' : ''}
                  {totalEffectValue}
                </SmallText>
              </View>
            )}
          </View>

          {/* Effects Detail (when selected) */}
          {selected && item.effects && item.effects.length > 0 && (
            <View style={styles.effectsDetail}>
              {item.effects.map((effect, index) => (
                <View key={index} style={styles.effectItem}>
                  <SmallText color={Colors.text.tertiary}>
                    {effect.type === 'money' && '💰'}
                    {effect.type === 'health' && '❤️'}
                    {effect.type === 'moral' && '😊'}
                    {effect.type === 'story' && '📖'}
                  </SmallText>
                  <SmallText
                    color={Colors.text.secondary}
                    style={styles.effectDescription}
                    numberOfLines={2}
                  >
                    {effect.description.es}
                  </SmallText>
                </View>
              ))}
            </View>
          )}

          {/* Packed Indicator */}
          {packed && (
            <View style={styles.packedBadge}>
              <SmallText color={Colors.success}>✓ Empacado</SmallText>
            </View>
          )}

          {/* Selected Indicator */}
          {selected && !packed && (
            <View style={styles.selectedBadge}>
              <SmallText color={Colors.primary.contrastText}>
                Toca para {onPress ? 'empacar' : 'ver'}
              </SmallText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  touchable: {
    borderRadius: 12,
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selected: {
    shadowColor: Colors.primary.main,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  packed: {
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 18,
  },
  headerText: {
    flex: 1,
  },
  mandatoryBadge: {
    marginLeft: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.background.tertiary,
  },
  statItem: {
    alignItems: 'center',
  },
  effectsDetail: {
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  effectItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  effectDescription: {
    flex: 1,
    marginLeft: 8,
  },
  packedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedBadge: {
    marginTop: 8,
    backgroundColor: Colors.primary.main,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

/**
 * Memory Card Component
 * Tarjeta de recuerdo individual (foto, dato, logro, etc.)
 * Estilo coleccionable/trading card
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';
import { Memory } from '../../types/journal';

interface MemoryCardProps {
  memory: Memory;
  isNew?: boolean; // Si acaba de ser coleccionado
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  isNew = false,
}) => {
  const [flipAnim] = useState(new Animated.Value(0));
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isNew) {
      // Animación de revelación (flip)
      Animated.sequence([
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        // Brillo después de revelar
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
        ),
      ]).start();
    } else {
      flipAnim.setValue(1);
    }
  }, [isNew]);

  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rarityColor = RARITY_COLORS[memory.rarity];
  const rarityLabel = RARITY_LABELS[memory.rarity];
  const typeColor = TYPE_COLORS[memory.type];

  const dateCollected = new Date(memory.dateCollected).toLocaleDateString(
    'es-ES',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <Animated.View
      style={[
        styles.card,
        {
          borderColor: rarityColor,
          transform: [{ rotateY: flipInterpolate }],
        },
      ]}
    >
      {/* Brillo para recuerdos nuevos */}
      {isNew && (
        <Animated.View
          style={[
            styles.glow,
            {
              borderColor: rarityColor,
              opacity: glowAnim,
            },
          ]}
        />
      )}

      {/* Badge de rareza */}
      <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
        <SmallText style={styles.rarityText}>{rarityLabel}</SmallText>
      </View>

      {/* Emoji grande */}
      <View style={styles.emojiContainer}>
        <BodyText style={styles.emoji}>{memory.emoji}</BodyText>
      </View>

      {/* Título */}
      <BodyText style={styles.title}>{memory.title.es}</BodyText>

      {/* Tipo */}
      <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
        <SmallText style={styles.typeText}>
          {TYPE_LABELS[memory.type]}
        </SmallText>
      </View>

      {/* Descripción */}
      <SmallText style={styles.description} numberOfLines={3}>
        {memory.description.es}
      </SmallText>

      {/* Fecha */}
      <SmallText style={styles.date}>📅 {dateCollected}</SmallText>
    </Animated.View>
  );
};

const RARITY_COLORS: Record<string, string> = {
  common: '#A9A9A9', // Gris
  rare: '#4169E1', // Azul
  legendary: '#FFD700', // Dorado
};

const RARITY_LABELS: Record<string, string> = {
  common: 'Común',
  rare: 'Raro',
  legendary: 'Legendario',
};

const TYPE_COLORS: Record<string, string> = {
  photo: '#FF69B4',
  fact: '#4169E1',
  achievement: '#FFD700',
  friend: '#FF6347',
  food: '#FFA500',
  tradition: '#9370DB',
};

const TYPE_LABELS: Record<string, string> = {
  photo: '📸 Foto',
  fact: '📚 Dato',
  achievement: '🏆 Logro',
  friend: '👥 Amigo',
  food: '🍽️ Comida',
  tradition: '🎭 Tradición',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: 160,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 3,
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 16,
    borderWidth: 3,
  },
  rarityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  rarityText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emojiContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  emoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.text.primary,
  },
  typeBadge: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  typeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'center',
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  date: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.text.secondary,
  },
});

/**
 * Journal Entry Card Component
 * Tarjeta de entrada del diario para cada país visitado
 * Estilo scrapbook/álbum de fotos
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Heading2, BodyText, SmallText } from '../ui';
import { Colors } from '../../constants';
import { JournalEntry } from '../../types/journal';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onPress: () => void;
}

export const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
  entry,
  onPress,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));

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

  const visitDate = new Date(entry.visitDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.card,
          entry.completed && styles.completedCard,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Badges de estado */}
        <View style={styles.badges}>
          {entry.isFavorite && (
            <View style={styles.favoriteBadge}>
              <SmallText style={styles.badgeText}>❤️</SmallText>
            </View>
          )}
          {entry.completed && (
            <View style={styles.completeBadge}>
              <SmallText style={styles.badgeText}>✓</SmallText>
            </View>
          )}
        </View>

        {/* Bandera del país */}
        <View style={styles.flagContainer}>
          <BodyText style={styles.flag}>{entry.countryFlag}</BodyText>
        </View>

        {/* Información del país */}
        <Heading2 style={styles.countryName}>{entry.countryName}</Heading2>
        <SmallText style={styles.visitDate}>Visitado: {visitDate}</SmallText>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <SmallText style={styles.statValue}>
              {entry.stats.levelsCompleted}
            </SmallText>
            <SmallText style={styles.statLabel}>Niveles</SmallText>
          </View>

          <View style={styles.stat}>
            <SmallText style={styles.statValue}>
              {entry.stats.starsEarned}⭐
            </SmallText>
            <SmallText style={styles.statLabel}>Estrellas</SmallText>
          </View>

          <View style={styles.stat}>
            <SmallText style={styles.statValue}>
              {entry.memories.length}
            </SmallText>
            <SmallText style={styles.statLabel}>Recuerdos</SmallText>
          </View>
        </View>

        {/* Memorias preview */}
        {entry.memories.length > 0 && (
          <View style={styles.memoriesPreview}>
            {entry.memories.slice(0, 3).map((memory) => (
              <View key={memory.id} style={styles.memoryIcon}>
                <SmallText style={styles.memoryEmoji}>
                  {memory.emoji}
                </SmallText>
              </View>
            ))}
            {entry.memories.length > 3 && (
              <SmallText style={styles.moreMemories}>
                +{entry.memories.length - 3}
              </SmallText>
            )}
          </View>
        )}

        {/* Notas preview */}
        {entry.notes && (
          <View style={styles.notesPreview}>
            <SmallText style={styles.notesText} numberOfLines={2}>
              📝 {entry.notes}
            </SmallText>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9E6', // Color papel antiguo/scrapbook
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#D4A574', // Marrón papel
    position: 'relative',
  },
  completedCard: {
    borderColor: Colors.success.main,
  },
  badges: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 6,
    zIndex: 10,
  },
  favoriteBadge: {
    backgroundColor: Colors.error.main,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBadge: {
    backgroundColor: Colors.success.main,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 16,
  },
  flagContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  flag: {
    fontSize: 60,
  },
  countryName: {
    textAlign: 'center',
    color: '#5C4033', // Marrón oscuro
    marginBottom: 4,
  },
  visitDate: {
    textAlign: 'center',
    color: '#8B7355',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D4A574',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C4033',
  },
  statLabel: {
    fontSize: 11,
    color: '#8B7355',
    marginTop: 2,
  },
  memoriesPreview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  memoryIcon: {
    backgroundColor: '#FFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D4A574',
  },
  memoryEmoji: {
    fontSize: 20,
  },
  moreMemories: {
    fontSize: 14,
    color: '#8B7355',
    fontWeight: 'bold',
  },
  notesPreview: {
    marginTop: 12,
    backgroundColor: '#FFFACD',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  notesText: {
    fontSize: 12,
    color: '#5C4033',
    lineHeight: 16,
  },
});

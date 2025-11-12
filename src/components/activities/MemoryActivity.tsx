/**
 * Memory Activity Component
 * Juego de memoria (encontrar parejas) con temas culturales
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_BOARD_WIDTH = Math.min(SCREEN_WIDTH - 40, 400);

interface MemoryCard {
  id: string;
  pairId: number;
  content: string; // emoji or text
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryActivityProps {
  pairs: Array<{ id: number; content: string; }>; // Array of unique items to match
  onComplete: (moves: number, timeSpent: number) => void;
  difficulty?: 'easy' | 'medium' | 'hard'; // 6, 10, or 16 pairs
}

export const MemoryActivity: React.FC<MemoryActivityProps> = ({
  pairs,
  onComplete,
  difficulty = 'easy',
}) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6; // 4x4, 5x4, 6x4
  const columns = 4;
  const rows = Math.ceil((pairs.length * 2) / columns);
  const cardSize = (MAX_BOARD_WIDTH - ((columns + 1) * 8)) / columns;

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for match when 2 cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlip(false);
      checkForMatch();
    }
  }, [flippedCards]);

  // Check if game is complete
  useEffect(() => {
    if (matches === pairs.length && moves > 0) {
      setIsComplete(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setTimeout(() => {
        onComplete(moves, timeSpent);
      }, 1000);
    }
  }, [matches]);

  const initializeGame = () => {
    // Create pairs of cards
    const gameCards: MemoryCard[] = [];
    pairs.forEach((pair) => {
      // Add first card
      gameCards.push({
        id: `${pair.id}-a`,
        pairId: pair.id,
        content: pair.content,
        isFlipped: false,
        isMatched: false,
      });
      // Add second card
      gameCards.push({
        id: `${pair.id}-b`,
        pairId: pair.id,
        content: pair.content,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardPress = (cardId: string) => {
    if (!canFlip || isComplete) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Flip card
    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);
  };

  const checkForMatch = () => {
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);

    if (!firstCard || !secondCard) return;

    setMoves(moves + 1);

    if (firstCard.pairId === secondCard.pairId) {
      // Match!
      setTimeout(() => {
        const newCards = cards.map((c) =>
          c.id === firstId || c.id === secondId
            ? { ...c, isMatched: true }
            : c
        );
        setCards(newCards);
        setMatches(matches + 1);
        setFlippedCards([]);
        setCanFlip(true);
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        const newCards = cards.map((c) =>
          c.id === firstId || c.id === secondId
            ? { ...c, isFlipped: false }
            : c
        );
        setCards(newCards);
        setFlippedCards([]);
        setCanFlip(true);
      }, 1000);
    }
  };

  const handleReset = () => {
    setMoves(0);
    setMatches(0);
    setFlippedCards([]);
    setIsComplete(false);
    setCanFlip(true);
    initializeGame();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading2>Juego de Memoria</Heading2>
        <BodyText color={Colors.text.secondary}>
          Encuentra todas las parejas
        </BodyText>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <SmallText color={Colors.text.tertiary}>Movimientos</SmallText>
          <BodyText color={Colors.primary.main}>{moves}</BodyText>
        </View>
        <View style={styles.statItem}>
          <SmallText color={Colors.text.tertiary}>Parejas</SmallText>
          <BodyText color={Colors.success}>
            {matches}/{pairs.length}
          </BodyText>
        </View>
      </View>

      {/* Board */}
      <View style={styles.boardContainer}>
        <View
          style={[
            styles.board,
            {
              width: MAX_BOARD_WIDTH,
            },
          ]}
        >
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                {
                  width: cardSize,
                  height: cardSize,
                },
                card.isFlipped && styles.cardFlipped,
                card.isMatched && styles.cardMatched,
              ]}
              onPress={() => handleCardPress(card.id)}
              disabled={!canFlip || card.isFlipped || card.isMatched}
            >
              <View style={styles.cardInner}>
                {card.isFlipped || card.isMatched ? (
                  <BodyText style={styles.cardContent}>{card.content}</BodyText>
                ) : (
                  <BodyText style={styles.cardBack}>?</BodyText>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Complete Overlay */}
        {isComplete && (
          <View style={styles.completeOverlay}>
            <Heading2 color={Colors.success}>✅ ¡Completado!</Heading2>
            <BodyText color={Colors.text.secondary} style={{ marginTop: 8 }}>
              {moves} movimientos
            </BodyText>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="Reiniciar"
          onPress={handleReset}
          variant="outline"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    padding: 8,
  },
  card: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  cardFlipped: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.main,
  },
  cardMatched: {
    backgroundColor: Colors.success + '30',
    borderColor: Colors.success,
  },
  cardInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    fontSize: 32,
  },
  cardBack: {
    fontSize: 40,
    color: Colors.text.tertiary,
  },
  completeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background.primary + 'DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    padding: 20,
  },
});

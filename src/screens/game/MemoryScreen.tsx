/**
 * Memory Screen
 * Juego de memoria (Memory Game) con pares culturales
 * ENFOQUE EDUCATIVO: Memorizar símbolos culturales de cada país
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../../components/ui';
import { Colors } from '../../constants';
import { useUserStore } from '../../stores';
import { audioService } from '../../services/audio/audioService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = Math.min((SCREEN_WIDTH - 60) / 4, 80);

interface MemoryCard {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userAge = useUserStore((state) => state.age);

  const { countryName, countryFlag, memoryData } = route.params || {};

  // Determinar número de pares según edad
  const pairsCount = userAge && userAge <= 7 ? 6 : userAge && userAge <= 10 ? 10 : 16;

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Initialize cards
  useEffect(() => {
    initializeGame();
  }, [pairsCount]);

  const initializeGame = () => {
    const pairs = memoryData?.cards?.slice(0, pairsCount) || [];

    // Create pairs (duplicate each card)
    const duplicatedCards: MemoryCard[] = [];
    pairs.forEach((pair: { id: number; content: string }, index: number) => {
      duplicatedCards.push({
        id: index * 2,
        content: pair.content,
        isFlipped: false,
        isMatched: false,
      });
      duplicatedCards.push({
        id: index * 2 + 1,
        content: pair.content,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards (Fisher-Yates)
    for (let i = duplicatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicatedCards[i], duplicatedCards[j]] = [duplicatedCards[j], duplicatedCards[i]];
    }

    setCards(duplicatedCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsComplete(false);
  };

  const handleCardPress = (index: number) => {
    // Ignore if card is already flipped or matched
    if (cards[index].isFlipped || cards[index].isMatched) return;

    // Ignore if two cards are already flipped
    if (flippedIndices.length >= 2) return;

    audioService.playSFX('button_press');

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Check for match when two cards are flipped
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);

      const [first, second] = newFlippedIndices;
      const firstCard = newCards[first];
      const secondCard = newCards[second];

      if (firstCard.content === secondCard.content) {
        // Match!
        audioService.playSFX('success');
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
        setFlippedIndices([]);

        // Check if game is complete
        if (matchedPairs + 1 === pairsCount) {
          setTimeout(() => {
            audioService.playSFX('level_complete');
            audioService.playMusic('victory', true);
            setIsComplete(true);
          }, 500);
        }
      } else {
        // No match - flip back after delay
        audioService.playSFX('error');
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const calculateStars = (): number => {
    if (!isComplete) return 0;

    // Calculate stars based on moves efficiency
    const optimalMoves = pairsCount; // Perfect game = pairs count
    if (moves <= optimalMoves * 1.5) return 3;
    if (moves <= optimalMoves * 2) return 2;
    return 1;
  };

  const formatTime = (): string => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SmallText color={Colors.text.secondary}>{countryName}</SmallText>
        <Heading2>Juego de Memoria</Heading2>
        <View style={styles.stats}>
          <BodyText>Movimientos: {moves}</BodyText>
          <BodyText>Parejas: {matchedPairs}/{pairsCount}</BodyText>
          <BodyText>Tiempo: {formatTime()}</BodyText>
        </View>
      </View>

      {/* Educational Card */}
      {!isComplete && (
        <Card style={styles.educationalCard}>
          <SmallText color={Colors.text.secondary}>🧠 Instrucciones:</SmallText>
          <SmallText style={styles.educationalText}>
            Encuentra todos los pares de símbolos culturales de {countryName}.
            Toca dos cartas para voltearlas y busca las coincidencias.
          </SmallText>
        </Card>
      )}

      {/* Memory Grid */}
      <View style={styles.gameContainer}>
        <View style={[styles.grid, { maxWidth: CARD_SIZE * 4 + 40 }]}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                {
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                },
                card.isMatched && styles.cardMatched,
              ]}
              onPress={() => handleCardPress(index)}
              disabled={card.isFlipped || card.isMatched || isComplete}
            >
              {(card.isFlipped || card.isMatched) ? (
                <Heading1 style={styles.cardContent}>{card.content}</Heading1>
              ) : (
                <View style={styles.cardBack}>
                  <Heading2>{countryFlag}</Heading2>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reset Button */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            audioService.playSFX('button_press');
            initializeGame();
          }}
        >
          <BodyText color={Colors.primary}>🔄 Reiniciar</BodyText>
        </TouchableOpacity>
      </View>

      {/* Completion Modal */}
      {isComplete && (
        <View style={styles.completionOverlay}>
          <Card style={styles.completionCard}>
            <Heading1 style={styles.completionIcon}>🎉</Heading1>
            <Heading2>¡Memoria Completa!</Heading2>
            <View style={styles.starsContainer}>
              <Heading1>{'⭐'.repeat(calculateStars())}</Heading1>
            </View>
            <BodyText color={Colors.text.secondary}>
              Movimientos: {moves}
            </BodyText>
            <BodyText color={Colors.text.secondary}>
              Tiempo: {formatTime()}
            </BodyText>
            <View style={styles.completionButtons}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                  audioService.playSFX('button_press');
                  initializeGame();
                }}
              >
                <BodyText color={Colors.primary}>Jugar de Nuevo</BodyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  audioService.playSFX('button_press');
                  navigation.goBack();
                }}
              >
                <BodyText color={Colors.white}>Continuar</BodyText>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  educationalCard: {
    margin: 16,
    padding: 12,
    backgroundColor: Colors.info + '10',
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
  },
  educationalText: {
    marginTop: 6,
    lineHeight: 18,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardMatched: {
    backgroundColor: Colors.success + '20',
    borderColor: Colors.success,
  },
  cardContent: {
    fontSize: 36,
  },
  cardBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    borderRadius: 8,
  },
  actions: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginHorizontal: 8,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  completionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completionCard: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    alignItems: 'center',
  },
  completionIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  starsContainer: {
    marginVertical: 16,
  },
  completionButtons: {
    flexDirection: 'row',
    marginTop: 24,
  },
});

export default MemoryScreen;

/**
 * Puzzle Screen
 * Juego de rompecabezas deslizante (sliding puzzle)
 * ENFOQUE EDUCATIVO: Armar imágenes de landmarks culturales de cada país
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../../components/ui';
import { Colors } from '../../constants';
import { useUserStore, useGameStore } from '../../stores';
import { useBackgroundMusic, useSFX } from '../../hooks/useAudio';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PUZZLE_SIZE = Math.min(SCREEN_WIDTH - 40, 400);

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  isEmpty: boolean;
  emoji: string;
}

const PuzzleScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userAge = useUserStore((state) => state.age);
  const { incrementActivitiesCompleted } = useGameStore();

  const { countryName, countryFlag, puzzleEmoji } = route.params || {};

  // Background music and sound effects
  useBackgroundMusic('activity');
  const { playSFX } = useSFX();

  // Determinar tamaño del puzzle según edad
  const gridSize = userAge && userAge <= 7 ? 3 : userAge && userAge <= 10 ? 4 : 5;
  const totalPieces = gridSize * gridSize;
  const pieceSize = PUZZLE_SIZE / gridSize;

  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const initialPieces: PuzzlePiece[] = [];

    for (let i = 0; i < totalPieces; i++) {
      initialPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        isEmpty: i === totalPieces - 1, // Last piece is empty
        emoji: i === totalPieces - 1 ? '' : (puzzleEmoji || '🖼️'),
      });
    }

    // Shuffle the puzzle
    const shuffled = shufflePuzzle(initialPieces);
    setPieces(shuffled);
  };

  // Fisher-Yates shuffle with solvability validation
  const shufflePuzzle = (orderedPieces: PuzzlePiece[]): PuzzlePiece[] => {
    const shuffled = [...orderedPieces];

    // Perform 100 random valid moves to ensure solvability
    let emptyIndex = totalPieces - 1;

    for (let i = 0; i < 100; i++) {
      const validMoves = getValidMoves(emptyIndex);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];

      // Swap
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
      shuffled[emptyIndex].currentPosition = emptyIndex;
      shuffled[randomMove].currentPosition = randomMove;
      emptyIndex = randomMove;
    }

    return shuffled;
  };

  const getValidMoves = (emptyIndex: number): number[] => {
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;
    const validMoves: number[] = [];

    // Up
    if (row > 0) validMoves.push((row - 1) * gridSize + col);
    // Down
    if (row < gridSize - 1) validMoves.push((row + 1) * gridSize + col);
    // Left
    if (col > 0) validMoves.push(row * gridSize + (col - 1));
    // Right
    if (col < gridSize - 1) validMoves.push(row * gridSize + (col + 1));

    return validMoves;
  };

  // Check if piece can move (adjacent to empty space)
  const canMove = (pieceIndex: number): boolean => {
    const emptyIndex = pieces.findIndex((p) => p.isEmpty);
    const row = Math.floor(pieceIndex / gridSize);
    const col = pieceIndex % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  // Move piece logic with completion check
  const movePiece = (pieceIndex: number) => {
    if (!canMove(pieceIndex) || isComplete) return;

    playSFX('button_press');

    const emptyIndex = pieces.findIndex((p) => p.isEmpty);
    const newPieces = [...pieces];

    [newPieces[pieceIndex], newPieces[emptyIndex]] = [
      newPieces[emptyIndex],
      newPieces[pieceIndex],
    ];

    newPieces[pieceIndex].currentPosition = pieceIndex;
    newPieces[emptyIndex].currentPosition = emptyIndex;

    setPieces(newPieces);
    setMoves(moves + 1);

    // Check if puzzle is complete
    const complete = newPieces.every((piece) => piece.currentPosition === piece.correctPosition);
    if (complete) {
      setIsComplete(true);
      playSFX('success');
    }
  };

  // Star calculation based on efficiency
  const calculateStars = (): number => {
    if (!isComplete) return 0;
    const optimalMoves = totalPieces * 2;
    if (moves <= optimalMoves) return 3;
    if (moves <= optimalMoves * 1.5) return 2;
    return 1;
  };

  const getElapsedTime = (): string => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    playSFX('level_complete');
    // Track completion (perfect if got 3 stars)
    const isPerfect = calculateStars() === 3;
    incrementActivitiesCompleted(isPerfect);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading1 style={styles.title}>
          {countryFlag} {countryName}
        </Heading1>
        <BodyText style={styles.subtitle}>Rompecabezas Deslizante</BodyText>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <Card variant="outlined" style={styles.statCard}>
          <SmallText color={Colors.text.secondary}>Movimientos</SmallText>
          <Heading2 color={Colors.primary}>{moves}</Heading2>
        </Card>
        <Card variant="outlined" style={styles.statCard}>
          <SmallText color={Colors.text.secondary}>Tiempo</SmallText>
          <Heading2 color={Colors.info}>{getElapsedTime()}</Heading2>
        </Card>
      </View>

      {/* Puzzle Grid */}
      <Card variant="elevated" style={styles.puzzleContainer}>
        <View style={[styles.puzzleGrid, { width: PUZZLE_SIZE, height: PUZZLE_SIZE }]}>
          {pieces.map((piece, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            const isCorrect = piece.currentPosition === piece.correctPosition;

            return (
              <TouchableOpacity
                key={piece.id}
                style={[
                  styles.puzzlePiece,
                  {
                    width: pieceSize - 4,
                    height: pieceSize - 4,
                    left: col * pieceSize + 2,
                    top: row * pieceSize + 2,
                  },
                  piece.isEmpty && styles.emptyPiece,
                  isCorrect && !piece.isEmpty && styles.correctPiece,
                ]}
                onPress={() => movePiece(index)}
                disabled={piece.isEmpty || isComplete}
              >
                {!piece.isEmpty && (
                  <BodyText style={styles.pieceEmoji}>{piece.emoji}</BodyText>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Instructions */}
      {!isComplete && (
        <Card variant="outlined" style={styles.instructionsCard}>
          <SmallText color={Colors.text.secondary} style={styles.instructions}>
            Toca las piezas adyacentes al espacio vacío para moverlas y completar el rompecabezas.
          </SmallText>
        </Card>
      )}

      {/* Completion Message */}
      {isComplete && (
        <Card variant="elevated" style={styles.completionCard}>
          <Heading2 style={styles.completionTitle}>¡Felicitaciones! 🎉</Heading2>
          <BodyText style={styles.completionText}>
            Completaste el rompecabezas en {moves} movimientos
          </BodyText>
          <View style={styles.stars}>
            {'⭐'.repeat(calculateStars())}
            {'☆'.repeat(3 - calculateStars())}
          </View>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinish}
          >
            <BodyText style={styles.finishButtonText}>Continuar</BodyText>
          </TouchableOpacity>
        </Card>
      )}

      {/* Educational Message */}
      <Card variant="outlined" style={styles.educationalCard}>
        <SmallText color={Colors.text.secondary} style={styles.educationalText}>
          💡 Los rompecabezas ayudan a desarrollar habilidades de resolución de problemas y pensamiento espacial.
        </SmallText>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.text.secondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  puzzleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  puzzleGrid: {
    position: 'relative',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  puzzlePiece: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyPiece: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  correctPiece: {
    borderColor: Colors.success,
    borderWidth: 2,
  },
  pieceEmoji: {
    fontSize: 32,
  },
  instructionsCard: {
    padding: 16,
    marginBottom: 12,
  },
  instructions: {
    textAlign: 'center',
  },
  completionCard: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  completionTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  completionText: {
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.text.secondary,
  },
  stars: {
    fontSize: 32,
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  finishButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  educationalCard: {
    padding: 16,
  },
  educationalText: {
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PuzzleScreen;

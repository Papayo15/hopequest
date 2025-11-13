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
import { useUserStore } from '../../stores';

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

  const { countryName, countryFlag, puzzleEmoji } = route.params || {};

  // Determinar tamaño del puzzle según edad
  const gridSize = userAge && userAge <= 7 ? 3 : userAge && userAge <= 10 ? 4 : 5;
  const totalPieces = gridSize * gridSize;
  const pieceSize = PUZZLE_SIZE / gridSize;

  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Inicializar puzzle
  useEffect(() => {
    initializePuzzle();
  }, [gridSize]);

  const initializePuzzle = () => {
    // Crear piezas en orden
    const orderedPieces: PuzzlePiece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      currentPosition: i,
      correctPosition: i,
      isEmpty: i === totalPieces - 1, // Última pieza es el espacio vacío
      emoji: getEmojiForPiece(i),
    }));

    // Mezclar piezas (shuffle)
    const shuffled = shufflePuzzle(orderedPieces);
    setPieces(shuffled);
    setMoves(0);
    setIsComplete(false);
  };

  const getEmojiForPiece = (index: number): string => {
    if (index === totalPieces - 1) return ''; // Espacio vacío

    // Usar emoji del país o genérico
    const baseEmoji = puzzleEmoji || countryFlag || '🖼️';

    // Crear variaciones visuales para cada pieza
    const variations = ['🎨', '🏛️', '🌆', '🏞️', '🗺️', '🌍', '🎭', '🖼️', '🌄'];
    return variations[index % variations.length] || baseEmoji;
  };

  const shufflePuzzle = (orderedPieces: PuzzlePiece[]): PuzzlePiece[] => {
    const shuffled = [...orderedPieces];

    // Fisher-Yates shuffle con validación de solubilidad
    for (let i = shuffled.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Actualizar posiciones actuales
    return shuffled.map((piece, index) => ({
      ...piece,
      currentPosition: index,
    }));
  };

  const canMove = (pieceIndex: number): boolean => {
    const emptyIndex = pieces.findIndex((p) => p.isEmpty);
    const row = Math.floor(pieceIndex / gridSize);
    const col = pieceIndex % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    // Puede moverse si está adyacente al espacio vacío
    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const movePiece = (pieceIndex: number) => {
    if (!canMove(pieceIndex)) return;

    const emptyIndex = pieces.findIndex((p) => p.isEmpty);
    const newPieces = [...pieces];

    // Intercambiar pieza con espacio vacío
    [newPieces[pieceIndex], newPieces[emptyIndex]] = [
      newPieces[emptyIndex],
      newPieces[pieceIndex],
    ];

    // Actualizar posiciones actuales
    newPieces[pieceIndex].currentPosition = pieceIndex;
    newPieces[emptyIndex].currentPosition = emptyIndex;

    setPieces(newPieces);
    setMoves(moves + 1);

    // Verificar si está completo
    checkCompletion(newPieces);
  };

  const checkCompletion = (currentPieces: PuzzlePiece[]) => {
    const complete = currentPieces.every(
      (piece) => piece.currentPosition === piece.correctPosition
    );

    if (complete && !isComplete) {
      setIsComplete(true);
    }
  };

  const calculateStars = (): number => {
    if (!isComplete) return 0;

    // Calcular estrellas según movimientos
    const optimalMoves = totalPieces * 2; // Estimación de movimientos óptimos

    if (moves <= optimalMoves) return 3;
    if (moves <= optimalMoves * 1.5) return 2;
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
        <Heading2>Rompecabezas Cultural</Heading2>
        <View style={styles.stats}>
          <BodyText>Movimientos: {moves}</BodyText>
          <BodyText>Tiempo: {formatTime()}</BodyText>
        </View>
      </View>

      {/* Educational Card */}
      {!isComplete && (
        <Card style={styles.educationalCard}>
          <SmallText color={Colors.text.secondary}>🧩 Instrucciones:</SmallText>
          <SmallText style={styles.educationalText}>
            Toca las piezas adyacentes al espacio vacío para moverlas.
            Ordena todas las piezas para completar la imagen cultural de {countryName}.
          </SmallText>
        </Card>
      )}

      {/* Puzzle Grid */}
      <View style={styles.puzzleContainer}>
        <View style={[styles.puzzleGrid, { width: PUZZLE_SIZE, height: PUZZLE_SIZE }]}>
          {pieces.map((piece, index) => (
            <TouchableOpacity
              key={piece.id}
              style={[
                styles.puzzlePiece,
                {
                  width: pieceSize - 4,
                  height: pieceSize - 4,
                  backgroundColor: piece.isEmpty
                    ? Colors.backgroundSecondary
                    : canMove(index)
                    ? Colors.primary + '20'
                    : Colors.background,
                  borderColor:
                    piece.currentPosition === piece.correctPosition
                      ? Colors.success
                      : Colors.border,
                },
              ]}
              onPress={() => movePiece(index)}
              disabled={piece.isEmpty || isComplete}
            >
              {!piece.isEmpty && (
                <>
                  <Heading1 style={styles.pieceEmoji}>{piece.emoji}</Heading1>
                  <SmallText color={Colors.text.secondary} style={styles.pieceNumber}>
                    {piece.correctPosition + 1}
                  </SmallText>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hint */}
      {!isComplete && moves > totalPieces * 3 && (
        <Card style={styles.hintCard}>
          <SmallText color={Colors.warning}>
            💡 Consejo: Las piezas con borde verde están en su posición correcta
          </SmallText>
        </Card>
      )}

      {/* Reset Button */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryButton} onPress={initializePuzzle}>
          <BodyText color={Colors.primary}>🔄 Reiniciar</BodyText>
        </TouchableOpacity>
      </View>

      {/* Completion Modal */}
      {isComplete && (
        <View style={styles.completionOverlay}>
          <Card style={styles.completionCard}>
            <Heading1 style={styles.completionIcon}>🎉</Heading1>
            <Heading2>¡Puzzle Completado!</Heading2>
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
                onPress={initializePuzzle}
              >
                <BodyText color={Colors.primary}>Jugar de Nuevo</BodyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.goBack()}
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
  puzzleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  puzzleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.border,
    padding: 2,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  puzzlePiece: {
    margin: 2,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pieceEmoji: {
    fontSize: 32,
  },
  pieceNumber: {
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: 10,
    fontWeight: '600',
  },
  hintCard: {
    margin: 16,
    padding: 12,
    backgroundColor: Colors.warning + '10',
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

export default PuzzleScreen;

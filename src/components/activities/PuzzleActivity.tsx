/**
 * Puzzle Activity Component
 * Rompecabezas deslizable para armar imágenes culturales
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PUZZLE_SIZE = Math.min(SCREEN_WIDTH - 40, 400);

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number;
  isEmpty: boolean;
}

interface PuzzleActivityProps {
  imageUrl: string;
  gridSize: 3 | 4 | 5; // 3x3, 4x4, or 5x5
  title: string;
  description: string;
  onComplete: (moves: number, timeSpent: number) => void;
}

export const PuzzleActivity: React.FC<PuzzleActivityProps> = ({
  imageUrl,
  gridSize,
  title,
  description,
  onComplete,
}) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);

  const totalPieces = gridSize * gridSize;
  const pieceSize = PUZZLE_SIZE / gridSize;

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, []);

  // Check if puzzle is complete
  useEffect(() => {
    if (pieces.length === 0) return;

    const complete = pieces.every(
      (piece) => piece.currentPosition === piece.correctPosition
    );

    if (complete && moves > 0) {
      setIsComplete(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setTimeout(() => {
        onComplete(moves, timeSpent);
      }, 1000);
    }
  }, [pieces]);

  const initializePuzzle = () => {
    // Create pieces
    const initialPieces: PuzzlePiece[] = [];
    for (let i = 0; i < totalPieces; i++) {
      initialPieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        isEmpty: i === totalPieces - 1, // Last piece is empty
      });
    }

    // Shuffle
    const shuffled = shufflePuzzle(initialPieces);
    setPieces(shuffled);
  };

  const shufflePuzzle = (piecesArray: PuzzlePiece[]): PuzzlePiece[] => {
    const shuffled = [...piecesArray];
    const emptyIndex = shuffled.findIndex((p) => p.isEmpty);

    // Make 100 random valid moves
    let currentEmptyPos = emptyIndex;
    for (let i = 0; i < 100; i++) {
      const neighbors = getNeighbors(currentEmptyPos);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Swap
      [shuffled[currentEmptyPos], shuffled[randomNeighbor]] = [
        shuffled[randomNeighbor],
        shuffled[currentEmptyPos],
      ];

      // Update positions
      shuffled[currentEmptyPos].currentPosition = currentEmptyPos;
      shuffled[randomNeighbor].currentPosition = randomNeighbor;

      currentEmptyPos = randomNeighbor;
    }

    return shuffled;
  };

  const getNeighbors = (position: number): number[] => {
    const row = Math.floor(position / gridSize);
    const col = position % gridSize;
    const neighbors: number[] = [];

    // Up
    if (row > 0) neighbors.push(position - gridSize);
    // Down
    if (row < gridSize - 1) neighbors.push(position + gridSize);
    // Left
    if (col > 0) neighbors.push(position - 1);
    // Right
    if (col < gridSize - 1) neighbors.push(position + 1);

    return neighbors;
  };

  const handlePiecePress = (pressedPosition: number) => {
    if (isComplete) return;

    const emptyIndex = pieces.findIndex((p) => p.isEmpty);
    const emptyPosition = pieces[emptyIndex].currentPosition;

    // Check if clicked piece is adjacent to empty space
    const neighbors = getNeighbors(emptyPosition);
    if (!neighbors.includes(pressedPosition)) return;

    // Swap pieces
    const newPieces = [...pieces];
    const pressedIndex = newPieces.findIndex(
      (p) => p.currentPosition === pressedPosition
    );

    // Swap positions
    [newPieces[emptyIndex], newPieces[pressedIndex]] = [
      newPieces[pressedIndex],
      newPieces[emptyIndex],
    ];

    // Update current positions
    newPieces[emptyIndex].currentPosition = emptyPosition;
    newPieces[pressedIndex].currentPosition = pressedPosition;

    setPieces(newPieces);
    setMoves(moves + 1);
  };

  const handleReset = () => {
    setMoves(0);
    setIsComplete(false);
    initializePuzzle();
  };

  const getPiecePosition = (position: number) => {
    const row = Math.floor(position / gridSize);
    const col = position % gridSize;
    return {
      top: row * pieceSize,
      left: col * pieceSize,
    };
  };

  const getPieceImagePosition = (correctPosition: number) => {
    const row = Math.floor(correctPosition / gridSize);
    const col = Math.floor(correctPosition % gridSize);
    return {
      backgroundPositionX: `-${col * pieceSize}px`,
      backgroundPositionY: `-${row * pieceSize}px`,
    };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading2>{title}</Heading2>
        <BodyText color={Colors.text.secondary}>{description}</BodyText>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <SmallText color={Colors.text.tertiary}>Movimientos</SmallText>
          <BodyText color={Colors.primary.main}>{moves}</BodyText>
        </View>
        <View style={styles.statItem}>
          <SmallText color={Colors.text.tertiary}>Tamaño</SmallText>
          <BodyText color={Colors.info}>
            {gridSize}x{gridSize}
          </BodyText>
        </View>
      </View>

      {/* Puzzle Board */}
      <View style={styles.boardContainer}>
        <View
          style={[
            styles.board,
            {
              width: PUZZLE_SIZE,
              height: PUZZLE_SIZE,
            },
          ]}
        >
          {pieces.map((piece) => {
            const position = getPiecePosition(piece.currentPosition);
            const imagePosition = getPieceImagePosition(piece.correctPosition);

            return (
              <TouchableOpacity
                key={piece.id}
                style={[
                  styles.piece,
                  {
                    width: pieceSize - 2,
                    height: pieceSize - 2,
                    top: position.top,
                    left: position.left,
                  },
                  piece.isEmpty && styles.emptyPiece,
                ]}
                onPress={() => handlePiecePress(piece.currentPosition)}
                disabled={isComplete}
              >
                {!piece.isEmpty && (
                  <View
                    style={[
                      styles.pieceImage,
                      {
                        width: pieceSize - 2,
                        height: pieceSize - 2,
                      },
                    ]}
                  >
                    {/* TODO: Replace with actual image */}
                    <View
                      style={[
                        styles.pieceNumber,
                        {
                          backgroundColor:
                            piece.currentPosition === piece.correctPosition
                              ? Colors.success + '30'
                              : Colors.background.secondary,
                        },
                      ]}
                    >
                      <SmallText>{piece.correctPosition + 1}</SmallText>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Complete Overlay */}
          {isComplete && (
            <View style={styles.completeOverlay}>
              <Heading2 color={Colors.success}>✅ ¡Completado!</Heading2>
            </View>
          )}
        </View>
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
  },
  board: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  piece: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.background.tertiary,
    backgroundColor: Colors.background.primary,
  },
  emptyPiece: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  pieceImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieceNumber: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background.primary + 'CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    padding: 20,
  },
});

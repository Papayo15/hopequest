/**
 * Case Solver Modal Component
 * Modal para resolver el caso después de recolectar todas las pistas
 * Estilo Carmen Sandiego - Deducción y resolución de misterio
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';
import { DetectiveCase, Clue } from '../../types/detective';
import { useSFX } from '../../hooks/useAudio';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CaseSolverModalProps {
  detectiveCase: DetectiveCase;
  collectedClues: Clue[];
  onSolve: (isCorrect: boolean, selectedCountry: string) => void;
  onClose: () => void;
}

export const CaseSolverModal: React.FC<CaseSolverModalProps> = ({
  detectiveCase,
  collectedClues,
  onSolve,
  onClose,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH));

  const { playSFX } = useSFX();

  useEffect(() => {
    // Animación de entrada
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCountrySelect = (countryId: string) => {
    if (showResult) return;
    setSelectedCountry(countryId);
  };

  const handleSubmit = () => {
    if (!selectedCountry || showResult) return;

    const correct = selectedCountry === detectiveCase.finalQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    playSFX(correct ? 'success' : 'error');

    // Esperar 3 segundos antes de cerrar
    setTimeout(() => {
      handleClose(correct);
    }, 3000);
  };

  const handleClose = (solved: boolean) => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onSolve(solved, selectedCountry || '');
      onClose();
    });
  };

  // Mapeo de IDs de países a nombres y banderas
  const COUNTRY_INFO: Record<string, { name: string; flag: string }> = {
    mexico: { name: 'México', flag: '🇲🇽' },
    spain: { name: 'España', flag: '🇪🇸' },
    usa: { name: 'Estados Unidos', flag: '🇺🇸' },
    brazil: { name: 'Brasil', flag: '🇧🇷' },
    argentina: { name: 'Argentina', flag: '🇦🇷' },
    colombia: { name: 'Colombia', flag: '🇨🇴' },
    peru: { name: 'Perú', flag: '🇵🇪' },
    france: { name: 'Francia', flag: '🇫🇷' },
    italy: { name: 'Italia', flag: '🇮🇹' },
  };

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Título del caso */}
          <View style={styles.header}>
            <BodyText style={styles.headerEmoji}>🔍</BodyText>
            <Heading2 style={styles.title}>
              {detectiveCase.title.es}
            </Heading2>
            <SmallText style={styles.subtitle}>
              Has recolectado todas las pistas. ¡Es hora de resolver el caso!
            </SmallText>
          </View>

          {/* Pistas recolectadas */}
          <View style={styles.cluesSection}>
            <BodyText style={styles.sectionTitle}>
              📋 Pistas Recolectadas:
            </BodyText>
            {collectedClues.map((clue, index) => (
              <View key={clue.id} style={styles.clueCard}>
                <BodyText style={styles.clueEmoji}>{clue.emoji}</BodyText>
                <View style={styles.clueContent}>
                  <SmallText style={styles.clueNumber}>
                    Pista #{index + 1}
                  </SmallText>
                  <BodyText style={styles.clueHint}>
                    {clue.hint.es}
                  </BodyText>
                </View>
              </View>
            ))}
          </View>

          {/* Pregunta final */}
          <View style={styles.questionSection}>
            <BodyText style={styles.questionTitle}>
              ❓ Pregunta Final:
            </BodyText>
            <BodyText style={styles.questionText}>
              {detectiveCase.finalQuestion.question.es}
            </BodyText>
          </View>

          {/* Opciones de países */}
          <View style={styles.optionsSection}>
            {detectiveCase.finalQuestion.options.map((countryId) => {
              const country = COUNTRY_INFO[countryId];
              const isSelected = selectedCountry === countryId;
              const isCorrectAnswer =
                countryId === detectiveCase.finalQuestion.correctAnswer;

              return (
                <Button
                  key={countryId}
                  title={`${country.flag} ${country.name}`}
                  onPress={() => handleCountrySelect(countryId)}
                  disabled={showResult}
                  variant={
                    showResult
                      ? isCorrectAnswer
                        ? 'primary'
                        : isSelected
                        ? 'outline'
                        : 'outline'
                      : isSelected
                      ? 'primary'
                      : 'outline'
                  }
                  style={[
                    styles.countryButton,
                    showResult &&
                      isCorrectAnswer &&
                      styles.correctButton,
                    showResult &&
                      isSelected &&
                      !isCorrectAnswer &&
                      styles.wrongButton,
                  ]}
                />
              );
            })}
          </View>

          {/* Botón de resolver */}
          {!showResult && (
            <Button
              title="Resolver Caso"
              onPress={handleSubmit}
              variant="primary"
              fullWidth
              disabled={!selectedCountry}
              style={styles.solveButton}
            />
          )}

          {/* Resultado */}
          {showResult && (
            <Animated.View
              style={[
                styles.resultContainer,
                isCorrect ? styles.correctResult : styles.wrongResult,
              ]}
            >
              <BodyText style={styles.resultTitle}>
                {isCorrect ? '🎉 ¡Caso Resuelto!' : '❌ Incorrecto'}
              </BodyText>
              <SmallText style={styles.resultText}>
                {isCorrect
                  ? `¡Felicidades detective! Has resuelto el caso correctamente. ${
                      COUNTRY_INFO[detectiveCase.finalQuestion.correctAnswer]
                        .name
                    } es la respuesta correcta.`
                  : `El caso no está resuelto. La respuesta correcta era ${
                      COUNTRY_INFO[detectiveCase.finalQuestion.correctAnswer]
                        .name
                    } ${
                      COUNTRY_INFO[detectiveCase.finalQuestion.correctAnswer]
                        .flag
                    }.`}
              </SmallText>

              {/* Recompensas */}
              {isCorrect && (
                <View style={styles.rewardsContainer}>
                  <SmallText style={styles.rewardText}>
                    ⭐ +{detectiveCase.starsReward} estrellas
                  </SmallText>
                  <SmallText style={styles.rewardText}>
                    💰 +{detectiveCase.coinsReward} monedas
                  </SmallText>
                  {detectiveCase.badge && (
                    <SmallText style={styles.rewardText}>
                      {detectiveCase.badge} Insignia de Detective
                    </SmallText>
                  )}
                </View>
              )}
            </Animated.View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    maxWidth: SCREEN_WIDTH - 40,
    width: '90%',
    maxHeight: '90%',
    elevation: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    color: Colors.primary.main,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  cluesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 16,
  },
  clueCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  clueEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  clueContent: {
    flex: 1,
  },
  clueNumber: {
    fontWeight: 'bold',
    color: Colors.primary.main,
    marginBottom: 4,
  },
  clueHint: {
    lineHeight: 18,
  },
  questionSection: {
    marginBottom: 20,
    backgroundColor: Colors.info.light,
    padding: 16,
    borderRadius: 12,
  },
  questionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  optionsSection: {
    gap: 12,
    marginBottom: 20,
  },
  countryButton: {
    width: '100%',
  },
  correctButton: {
    backgroundColor: Colors.success.main,
    borderColor: Colors.success.main,
  },
  wrongButton: {
    backgroundColor: Colors.error.main,
    borderColor: Colors.error.main,
  },
  solveButton: {
    marginTop: 8,
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  correctResult: {
    backgroundColor: Colors.success.light,
  },
  wrongResult: {
    backgroundColor: Colors.error.light,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultText: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  rewardsContainer: {
    alignItems: 'center',
    gap: 8,
  },
  rewardText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

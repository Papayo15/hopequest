/**
 * Activity Screen
 * Pantalla de actividades (Trivia, Puzzle, Memory)
 * DEMO: Solo Trivia es funcional, Puzzle y Memory muestran placeholder
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../../components/ui';
import { Colors } from '../../constants';
import { useUserStore } from '../../stores';

const ActivityScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userAge = useUserStore((state) => state.age);

  const {
    countryName,
    activityTitle,
    activityType,
    activityData,
  } = route.params || {};

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Filtrar preguntas según la edad del usuario
  const filteredQuestions = useMemo(() => {
    const allQuestions = activityData?.questions || [];
    if (!userAge || !allQuestions.length) return allQuestions;

    // Determinar nivel máximo de dificultad según edad
    let maxDifficulties: string[] = [];
    if (userAge <= 7) {
      maxDifficulties = ['easy']; // 5-7 años: solo preguntas fáciles
    } else if (userAge <= 10) {
      maxDifficulties = ['easy', 'medium']; // 8-10 años: fáciles y medianas
    } else {
      maxDifficulties = ['easy', 'medium', 'hard']; // 11-12 años: todas
    }

    return allQuestions.filter((q: any) =>
      maxDifficulties.includes(q.difficulty || 'easy')
    );
  }, [activityData?.questions, userAge]);

  // TRIVIA (funcional)
  const renderTrivia = () => {
    const questions = filteredQuestions;
    const question = questions[currentQuestion];

    if (!question) {
      return (
        <View style={styles.centered}>
          <Heading2>No hay preguntas disponibles</Heading2>
        </View>
      );
    }

    if (completed) {
      const totalQuestions = questions.length;
      const percentage = (score / totalQuestions) * 100;
      const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : 1;

      return (
        <View style={styles.completedContainer}>
          <Heading1 style={styles.completedIcon}>🎉</Heading1>
          <Heading1>¡Completado!</Heading1>
          <BodyText style={styles.completedScore}>
            Puntaje: {score} de {totalQuestions}
          </BodyText>
          <View style={styles.starsContainer}>
            <Heading1>{'⭐'.repeat(stars)}</Heading1>
          </View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
          >
            <BodyText color={Colors.white} style={styles.buttonText}>
              Regresar
            </BodyText>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.triviaContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <SmallText color={Colors.text.secondary} style={styles.progressText}>
          Pregunta {currentQuestion + 1} de {questions.length}
        </SmallText>

        <Card style={styles.questionCard}>
          <Heading2 style={styles.question}>{question.question}</Heading2>
        </Card>

        <View style={styles.optionsContainer}>
          {question.options.map((option: string, index: number) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = showExplanation;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && !showResult && styles.optionSelected,
                  showResult && isSelected && !isCorrect && styles.optionWrong,
                  showResult && isCorrect && styles.optionCorrect,
                ]}
                onPress={() => !showExplanation && setSelectedAnswer(index)}
                disabled={showExplanation}
              >
                <BodyText
                  color={
                    showResult && (isCorrect || isSelected)
                      ? Colors.white
                      : Colors.text.primary
                  }
                >
                  {option}
                </BodyText>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <Card style={styles.explanationCard}>
            <SmallText style={styles.explanationTitle}>
              {selectedAnswer === question.correctAnswer ? '✓ Correcto!' : '✗ Incorrecto'}
            </SmallText>
            <BodyText>{question.explanation}</BodyText>
          </Card>
        )}

        {!showExplanation ? (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              selectedAnswer === null && styles.buttonDisabled,
            ]}
            onPress={() => {
              if (selectedAnswer !== null) {
                if (selectedAnswer === question.correctAnswer) {
                  setScore(score + 1);
                }
                setShowExplanation(true);
              }
            }}
            disabled={selectedAnswer === null}
          >
            <BodyText color={Colors.white} style={styles.buttonText}>
              Verificar Respuesta
            </BodyText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowExplanation(false);
              } else {
                setCompleted(true);
              }
            }}
          >
            <BodyText color={Colors.white} style={styles.buttonText}>
              {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            </BodyText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // PUZZLE / MEMORY (placeholder)
  const renderPlaceholder = (icon: string) => {
    return (
      <View style={styles.placeholderContainer}>
        <Heading1>{icon}</Heading1>
        <Heading2>{activityTitle}</Heading2>
        <BodyText style={styles.placeholderText}>
          Esta actividad se implementará próximamente
        </BodyText>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <BodyText color={Colors.white} style={styles.buttonText}>
            Regresar
          </BodyText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    switch (activityType) {
      case 'trivia':
        return renderTrivia();
      case 'puzzle':
        // Navegar a PuzzleScreen
        navigation.navigate('Puzzle', {
          countryName,
          countryFlag: route.params?.countryFlag || '🌍',
          puzzleEmoji: activityData?.imageUrl || '🖼️',
        });
        return null;
      case 'memory':
        return renderPlaceholder('🧠');
      default:
        return renderPlaceholder('🎮');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <SmallText color={Colors.text.secondary}>{countryName}</SmallText>
        <Heading1>{activityTitle}</Heading1>
      </View>
      {renderContent()}
    </ScrollView>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  triviaContainer: {
    padding: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
  },
  questionCard: {
    marginTop: 24,
    marginBottom: 24,
  },
  question: {
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  optionCorrect: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  optionWrong: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  explanationCard: {
    marginTop: 24,
    backgroundColor: Colors.info + '10',
  },
  explanationTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.text.disabled,
  },
  buttonText: {
    fontWeight: '600',
  },
  completedContainer: {
    padding: 40,
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  completedScore: {
    marginTop: 16,
    fontSize: 18,
  },
  starsContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  placeholderContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  placeholderText: {
    marginTop: 16,
    textAlign: 'center',
    color: Colors.text.secondary,
  },
});

export default ActivityScreen;

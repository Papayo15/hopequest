/**
 * Trivia Activity Component
 * Preguntas de opción múltiple sobre geografía y cultura
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TriviaActivityProps {
  questions: TriviaQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  timeLimit?: number; // seconds per question (optional)
}

export const TriviaActivity: React.FC<TriviaActivityProps> = ({
  questions,
  onComplete,
  timeLimit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 30);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // Timer effect
  useEffect(() => {
    if (!timeLimit || showExplanation) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up, automatically select null (wrong)
          handleAnswerSubmit();
          return timeLimit;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showExplanation]);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return; // Can't change after submission
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = () => {
    if (showExplanation) return; // Already submitted

    // Check if correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Complete activity
      onComplete(score + (isCorrect ? 1 : 0), questions.length);
    } else {
      // Next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeRemaining(timeLimit || 30);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <SmallText color={Colors.text.tertiary}>
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </SmallText>
      </View>

      {/* Timer */}
      {timeLimit && !showExplanation && (
        <View style={styles.timerContainer}>
          <BodyText
            color={timeRemaining <= 10 ? Colors.error : Colors.text.secondary}
          >
            ⏱️ {timeRemaining}s
          </BodyText>
        </View>
      )}

      {/* Question */}
      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <View style={styles.difficultyBadge}>
            <SmallText
              color={
                currentQuestion.difficulty === 'easy'
                  ? Colors.success
                  : currentQuestion.difficulty === 'medium'
                  ? Colors.warning
                  : Colors.error
              }
            >
              {currentQuestion.difficulty === 'easy' && '⭐ Fácil'}
              {currentQuestion.difficulty === 'medium' && '⭐⭐ Media'}
              {currentQuestion.difficulty === 'hard' && '⭐⭐⭐ Difícil'}
            </SmallText>
          </View>

          <Heading2 style={styles.question}>{currentQuestion.question}</Heading2>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              const showCorrect = showExplanation && isCorrectOption;
              const showWrong = showExplanation && isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  title={option}
                  onPress={() => handleAnswerSelect(index)}
                  variant={
                    showCorrect
                      ? 'success'
                      : showWrong
                      ? 'danger'
                      : isSelected
                      ? 'primary'
                      : 'outline'
                  }
                  fullWidth
                  style={styles.optionButton}
                  disabled={showExplanation}
                />
              );
            })}
          </View>

          {/* Explanation */}
          {showExplanation && (
            <View
              style={[
                styles.explanationContainer,
                isCorrect
                  ? styles.explanationCorrect
                  : styles.explanationWrong,
              ]}
            >
              <Heading2
                color={isCorrect ? Colors.success : Colors.error}
                style={styles.resultTitle}
              >
                {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
              </Heading2>
              <BodyText color={Colors.text.secondary} style={styles.explanation}>
                {currentQuestion.explanation}
              </BodyText>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        {!showExplanation ? (
          <Button
            title="Confirmar Respuesta"
            onPress={handleAnswerSubmit}
            variant="primary"
            fullWidth
            disabled={selectedAnswer === null}
          />
        ) : (
          <Button
            title={isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta'}
            onPress={handleNext}
            variant="primary"
            fullWidth
          />
        )}
      </View>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <SmallText color={Colors.text.tertiary}>
          Puntaje actual: {score}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
        </SmallText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  progressContainer: {
    padding: 20,
    paddingBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 3,
  },
  timerContainer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: 20,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  question: {
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    marginBottom: 0,
  },
  explanationContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  explanationCorrect: {
    backgroundColor: Colors.success + '10',
    borderColor: Colors.success,
  },
  explanationWrong: {
    backgroundColor: Colors.error + '10',
    borderColor: Colors.error,
  },
  resultTitle: {
    marginBottom: 8,
  },
  explanation: {
    lineHeight: 22,
  },
  actions: {
    padding: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background.tertiary,
  },
  scoreContainer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
});

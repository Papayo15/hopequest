/**
 * Enemy Quiz Challenge Component
 * Los enemigos se derrotan respondiendo preguntas educativas
 * NO con violencia - Con conocimiento y aprendizaje
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Heading2, BodyText, SmallText, Button } from '../ui';
import { Colors } from '../../constants';
import { Enemy } from '../../types/enemies';
import { useSFX } from '../../hooks/useAudio';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Índice de la respuesta correcta
  explanation: string;
}

interface EnemyQuizChallengeProps {
  enemy: Enemy;
  onCorrectAnswer: () => void; // Cuando responde correctamente
  onWrongAnswer: () => void; // Cuando responde incorrectamente
  onComplete: (defeated: boolean) => void; // Cuando termina el quiz
  attemptsLeft: number; // Intentos restantes = health del enemigo
}

export const EnemyQuizChallenge: React.FC<EnemyQuizChallengeProps> = ({
  enemy,
  onCorrectAnswer,
  onWrongAnswer,
  onComplete,
  attemptsLeft,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH));

  const { playSFX } = useSFX();

  useEffect(() => {
    // Generar pregunta basada en el tipo de enemigo
    const question = generateQuestion(enemy);
    setCurrentQuestion(question);

    // Animación de entrada
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Reproducir sonido
    playSFX(correct ? 'success' : 'error');

    // Notificar resultado
    if (correct) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }

    // Esperar 3 segundos antes de cerrar
    setTimeout(() => {
      handleClose(correct);
    }, 3000);
  };

  const handleClose = (defeated: boolean) => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onComplete(defeated);
    });
  };

  if (!currentQuestion) {
    return null;
  }

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
        {/* Enemigo en la parte superior */}
        <View style={styles.enemyHeader}>
          <BodyText style={styles.enemyEmoji}>{enemy.emoji}</BodyText>
          <Heading2 style={styles.enemyTitle}>{enemy.name.es}</Heading2>
          <SmallText style={styles.enemyDescription}>
            {enemy.description.es}
          </SmallText>

          {/* Intentos restantes */}
          <View style={styles.attemptsContainer}>
            {Array.from({ length: attemptsLeft }, (_, i) => (
              <View key={i} style={styles.attemptDot} />
            ))}
          </View>
        </View>

        {/* Pregunta */}
        <View style={styles.questionContainer}>
          <SmallText style={styles.questionLabel}>
            Derrota al enemigo con conocimiento:
          </SmallText>
          <BodyText style={styles.questionText}>
            {currentQuestion.question}
          </BodyText>
        </View>

        {/* Opciones */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              variant={
                selectedAnswer === null
                  ? 'outline'
                  : selectedAnswer === index
                  ? index === currentQuestion.correctAnswer
                    ? 'primary'
                    : 'outline'
                  : 'outline'
              }
              style={[
                styles.optionButton,
                selectedAnswer === index &&
                  index === currentQuestion.correctAnswer &&
                  styles.correctOption,
                selectedAnswer === index &&
                  index !== currentQuestion.correctAnswer &&
                  styles.wrongOption,
              ]}
            />
          ))}
        </View>

        {/* Explicación */}
        {showExplanation && (
          <Animated.View
            style={[
              styles.explanationContainer,
              isCorrect ? styles.correctExplanation : styles.wrongExplanation,
            ]}
          >
            <BodyText style={styles.explanationText}>
              {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
            </BodyText>
            <SmallText style={styles.explanationDetail}>
              {currentQuestion.explanation}
            </SmallText>

            {/* Mensaje educativo del enemigo */}
            {isCorrect && (
              <SmallText style={styles.educationalMessage}>
                💡 {enemy.educationalMessage.es}
              </SmallText>
            )}
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

// Genera una pregunta educativa basada en el tipo de enemigo
const generateQuestion = (enemy: Enemy): QuizQuestion => {
  const questions: Record<string, QuizQuestion[]> = {
    ignorance: [
      {
        question: '¿Por qué las personas migran a otros países?',
        options: [
          'Solo por diversión',
          'Por oportunidades, seguridad y familia',
          'Porque les gusta viajar',
          'No hay razón',
        ],
        correctAnswer: 1,
        explanation:
          'Las personas migran por muchas razones válidas: buscar mejores oportunidades, escapar de situaciones peligrosas, reunirse con familia.',
      },
      {
        question: '¿Qué aprenden los niños cuando conocen otras culturas?',
        options: [
          'Nada importante',
          'A ser más comprensivos y abiertos',
          'Solo idiomas',
          'A cocinar diferente',
        ],
        correctAnswer: 1,
        explanation:
          'Conocer otras culturas nos enseña empatía, comprensión y a valorar la diversidad del mundo.',
      },
    ],
    prejudice: [
      {
        question: '¿Qué significa tener empatía?',
        options: [
          'Ignorar a los demás',
          'Ponerse en el lugar de otros',
          'Ser egoísta',
          'No importa',
        ],
        correctAnswer: 1,
        explanation:
          'La empatía es la capacidad de entender y compartir los sentimientos de otra persona.',
      },
    ],
    bureaucracy: [
      {
        question: '¿Por qué son importantes los documentos legales en la migración?',
        options: [
          'No son importantes',
          'Para identificarte y tener derechos',
          'Solo para complicar',
          'Para gastar dinero',
        ],
        correctAnswer: 1,
        explanation:
          'Los documentos legales protegen tus derechos, te identifican y te permiten acceder a servicios importantes.',
      },
    ],
    misinformation: [
      {
        question: '¿Cómo puedes saber si una información es verdadera?',
        options: [
          'Creer todo lo que lees',
          'Verificar en fuentes confiables',
          'Solo creer a amigos',
          'No importa si es verdad',
        ],
        correctAnswer: 1,
        explanation:
          '¡Siempre verifica la información en fuentes confiables antes de creerla o compartirla!',
      },
    ],
    language_barrier: [
      {
        question: '¿Qué ayuda a aprender un nuevo idioma más rápido?',
        options: [
          'No practicar nunca',
          'Practicar todos los días y hablar con otros',
          'Solo estudiar gramática',
          'Esperar sin hacer nada',
        ],
        correctAnswer: 1,
        explanation:
          'La práctica constante y hablar con otras personas es la mejor forma de aprender un idioma.',
      },
    ],
    homesickness: [
      {
        question: '¿Qué puedes hacer si extrañas tu hogar?',
        options: [
          'Estar triste todo el tiempo',
          'Recordar buenos momentos y hacer nuevos amigos',
          'No hablar con nadie',
          'Olvidar todo',
        ],
        correctAnswer: 1,
        explanation:
          'Es normal extrañar tu hogar. Puedes honrar tus recuerdos mientras creas nuevas conexiones.',
      },
    ],
  };

  const enemyQuestions = questions[enemy.type] || questions.ignorance;
  const randomIndex = Math.floor(Math.random() * enemyQuestions.length);
  return enemyQuestions[randomIndex];
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    padding: 20,
    maxWidth: SCREEN_WIDTH - 40,
    width: '90%',
    elevation: 10,
  },
  enemyHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  enemyEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  enemyTitle: {
    textAlign: 'center',
    color: Colors.primary.main,
    marginBottom: 8,
  },
  enemyDescription: {
    textAlign: 'center',
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  attemptsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  attemptDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.error.main,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    color: Colors.text.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    width: '100%',
  },
  correctOption: {
    backgroundColor: Colors.success.main,
    borderColor: Colors.success.main,
  },
  wrongOption: {
    backgroundColor: Colors.error.main,
    borderColor: Colors.error.main,
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  correctExplanation: {
    backgroundColor: Colors.success.light,
  },
  wrongExplanation: {
    backgroundColor: Colors.error.light,
  },
  explanationText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanationDetail: {
    lineHeight: 18,
    marginBottom: 8,
  },
  educationalMessage: {
    backgroundColor: Colors.info.light,
    padding: 8,
    borderRadius: 8,
    lineHeight: 16,
  },
});

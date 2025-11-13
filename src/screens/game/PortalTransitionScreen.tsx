/**
 * Portal Transition Screen
 * Animación y narrativa durante el viaje por el portal
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { GameStackParamList, GameStackNavigationProp } from '../../navigation/types';
import { Heading1, Heading2, BodyText, SmallText, Button } from '../../components/ui';
import { Colors } from '../../constants';
import { usePortalStore, useEconomyStore } from '../../stores';
import type { PortalTransitionPhase } from '../../types';

type PortalTransitionRouteProp = RouteProp<GameStackParamList, 'PortalTransition'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PHASE_DURATION = 3000; // 3 seconds per phase
const TOTAL_PHASES: PortalTransitionPhase[] = ['preparation', 'journey', 'arrival', 'checkpoint'];

const PortalTransitionScreen: React.FC = () => {
  const navigation = useNavigation<GameStackNavigationProp>();
  const route = useRoute<PortalTransitionRouteProp>();
  const { portalId, routeId } = route.params;

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [outcome, setOutcome] = useState<'success' | 'failure' | 'partial' | null>(null);
  const [narrativeText, setNarrativeText] = useState('');

  const { currentTransition, setPhase, completeTransition } = usePortalStore();
  const { increaseHealth, decreaseHealth, increaseMoral, decreaseMoral } = useEconomyStore();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentPhase = TOTAL_PHASES[currentPhaseIndex];
  const portal = currentTransition?.portal;

  // Phase narratives
  const phaseNarratives: Record<PortalTransitionPhase, string> = {
    preparation: portal?.type === 'aereo'
      ? 'Marco y su familia se preparan en el aeropuerto. Los nervios se mezclan con la emoción.'
      : portal?.type === 'maritimo'
      ? 'La familia sube al barco. El mar se extiende infinito ante ellos.'
      : portal?.type === 'terrestre'
      ? 'Suben al autobús con todas sus pertenencias. El viaje será largo.'
      : portal?.type === 'clandestino'
      ? 'En la oscuridad, Marco sostiene la mano de Teo. Este es el momento más peligroso.'
      : 'El viaje comienza. Cada kilómetro los acerca a su destino.',

    journey: portal?.type === 'aereo'
      ? 'El avión surca las nubes. Marco mira por la ventana, pensando en lo que dejó atrás y lo que vendrá.'
      : portal?.type === 'maritimo'
      ? 'Días en el mar. Las olas mecen el barco. La familia comparte historias con otros viajeros.'
      : portal?.type === 'terrestre'
      ? 'El paisaje cambia lentamente. Montañas, desiertos, pueblos desconocidos. Todo es nuevo.'
      : portal?.type === 'clandestino'
      ? 'Caminan por el desierto. El sol es implacable. Cada paso es una lucha por sobrevivir.'
      : 'El viaje continúa. La esperanza los mantiene en movimiento.',

    arrival: portal?.type === 'aereo'
      ? '¡Aterrizaje! Los motores rugen al tocar tierra. Un nuevo país los espera.'
      : portal?.type === 'maritimo'
      ? 'El puerto aparece en el horizonte. Después de semanas en el mar, tierra firme.'
      : portal?.type === 'terrestre'
      ? 'El autobús se detiene. Han llegado. Exhaustos pero aliviados.'
      : portal?.type === 'clandestino'
      ? 'Lograron cruzar. Están vivos. El alivio es indescriptible.'
      : 'Han llegado a su destino. Un nuevo capítulo comienza.',

    checkpoint: portal?.type === 'aereo'
      ? 'Control migratorio. El oficial revisa sus documentos. El corazón de Marco late rápido.'
      : portal?.type === 'maritimo'
      ? 'Inspección en el puerto. Las autoridades verifican pasaportes y visas.'
      : portal?.type === 'terrestre'
      ? 'Punto de control fronterizo. Guardias revisan el autobús.'
      : portal?.type === 'clandestino'
      ? 'Deben esconderse. Patrullas cerca. Un momento de máxima tensión.'
      : 'Último obstáculo antes de la libertad.',
  };

  useEffect(() => {
    // Set initial phase
    setPhase(currentPhase);
    setNarrativeText(phaseNarratives[currentPhase]);

    // Animate entry
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: (currentPhaseIndex + 1) / TOTAL_PHASES.length,
      duration: PHASE_DURATION,
      useNativeDriver: false,
    }).start();

    // Auto-advance to next phase
    const timer = setTimeout(() => {
      if (currentPhaseIndex < TOTAL_PHASES.length - 1) {
        setCurrentPhaseIndex(currentPhaseIndex + 1);
      } else {
        // Journey complete, calculate outcome
        calculateOutcome();
      }
    }, PHASE_DURATION);

    return () => clearTimeout(timer);
  }, [currentPhaseIndex]);

  const calculateOutcome = () => {
    if (!portal) return;

    // Simple probability calculation based on portal risks
    const random = Math.random();
    const failureChance = portal.risks.health + portal.risks.detection;

    let calculatedOutcome: 'success' | 'partial' | 'failure';
    let healthChange = 0;
    let moralChange = 0;

    if (random < failureChance * 0.3) {
      // Failure
      calculatedOutcome = 'failure';
      healthChange = -30;
      moralChange = -40;
      setNarrativeText(
        portal.type === 'clandestino'
          ? 'Las autoridades los detuvieron. Pasarán días en detención antes de ser deportados.'
          : 'Algo salió mal. Los documentos no fueron aceptados. Deben regresar.'
      );
    } else if (random < failureChance * 0.6) {
      // Partial success
      calculatedOutcome = 'partial';
      healthChange = -15;
      moralChange = -10;
      setNarrativeText(
        'El viaje fue más difícil de lo esperado, pero lograron llegar. Están exhaustos pero vivos.'
      );
    } else {
      // Success
      calculatedOutcome = 'success';
      healthChange = -5;
      moralChange = 10;
      setNarrativeText(
        '¡Lo lograron! El viaje fue exitoso. Marco respira profundo. Están en un nuevo país, con nuevas oportunidades.'
      );
    }

    setOutcome(calculatedOutcome);

    // Apply effects
    if (healthChange < 0) {
      decreaseHealth(Math.abs(healthChange), `Viaje por ${portal.name}`);
    } else if (healthChange > 0) {
      increaseHealth(healthChange, `Viaje exitoso`);
    }

    if (moralChange < 0) {
      decreaseMoral(Math.abs(moralChange), `Viaje difícil`);
    } else if (moralChange > 0) {
      increaseMoral(moralChange, `Llegada exitosa`);
    }

    // Complete transition in store
    setTimeout(() => {
      completeTransition(calculatedOutcome);
    }, 2000);
  };

  const handleContinue = () => {
    // Navigate to country complete or next screen
    navigation.navigate('CountryComplete', {
      countryId: 'next_country', // TODO: Get from route
      stars: outcome === 'success' ? 3 : outcome === 'partial' ? 2 : 1,
      rewards: {
        items: [],
      },
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Portal-specific colors
  const portalColor =
    portal?.type === 'avion'
      ? '#4A90E2'
      : portal?.type === 'barco'
      ? '#2E5C8A'
      : portal?.type === 'tren'
      ? '#8B7355'
      : portal?.type === 'autobus'
      ? '#F4A261'
      : portal?.type === 'carro'
      ? '#E27D60'
      : portal?.type === 'balsa'
      ? '#5A9FD4'
      : portal?.type === 'tunel'
      ? '#5A5A5A'
      : portal?.type === 'puente'
      ? '#A67C52'
      : portal?.type === 'caminando'
      ? '#7CB342'
      : Colors.primary.main;

  return (
    <View style={[styles.container, { backgroundColor: portalColor + '20' }]}>
      {/* Portal Animation */}
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.portalCircle,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { rotate: spin }],
              borderColor: portalColor,
            },
          ]}
        >
          <Animated.Text style={[styles.portalIcon, { opacity: fadeAnim }]}>
            {portal?.icon}
          </Animated.Text>
        </Animated.View>

        {/* Particle effects (simple dots) */}
        {[...Array(12)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    rotate: `${(360 / 12) * i}deg`,
                  },
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={[styles.particleDot, { backgroundColor: portalColor }]} />
          </Animated.View>
        ))}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
                backgroundColor: portalColor,
              },
            ]}
          />
        </View>
        <SmallText color={Colors.text.tertiary} style={styles.progressText}>
          {currentPhase === 'preparation' && 'Preparación...'}
          {currentPhase === 'journey' && 'En viaje...'}
          {currentPhase === 'arrival' && 'Llegando...'}
          {currentPhase === 'checkpoint' && 'Control...'}
        </SmallText>
      </View>

      {/* Narrative */}
      <Animated.View style={[styles.narrativeContainer, { opacity: fadeAnim }]}>
        <Heading2 align="center" style={styles.phaseTitle}>
          {currentPhase === 'preparation' && '📋 Preparación'}
          {currentPhase === 'journey' && '🌍 En Viaje'}
          {currentPhase === 'arrival' && '🎯 Llegada'}
          {currentPhase === 'checkpoint' && '🛂 Control'}
        </Heading2>
        <BodyText
          color={Colors.text.secondary}
          align="center"
          style={styles.narrativeText}
        >
          {narrativeText}
        </BodyText>
      </Animated.View>

      {/* Outcome */}
      {outcome && (
        <Animated.View
          style={[
            styles.outcomeContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Heading1 align="center" style={styles.outcomeTitle}>
            {outcome === 'success' && '✅ ¡Éxito!'}
            {outcome === 'partial' && '⚠️ Éxito Parcial'}
            {outcome === 'failure' && '❌ Complicaciones'}
          </Heading1>
          <BodyText
            color={
              outcome === 'success'
                ? Colors.success
                : outcome === 'partial'
                ? Colors.warning
                : Colors.error
            }
            align="center"
            style={styles.outcomeDescription}
          >
            {narrativeText}
          </BodyText>
          <Button
            title="Continuar"
            onPress={handleContinue}
            variant="primary"
            fullWidth
            style={styles.continueButton}
          />
        </Animated.View>
      )}

      {/* Portal Info */}
      <View style={styles.infoContainer}>
        <SmallText color={Colors.text.tertiary} align="center">
          {portal?.name || 'Portal Desconocido'}
        </SmallText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  portalCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  portalIcon: {
    fontSize: 60,
  },
  particle: {
    position: 'absolute',
    width: 20,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  particleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressContainer: {
    width: SCREEN_WIDTH - 80,
    marginBottom: 40,
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
    borderRadius: 3,
  },
  progressText: {
    textAlign: 'center',
  },
  narrativeContainer: {
    width: SCREEN_WIDTH - 60,
    padding: 24,
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  phaseTitle: {
    marginBottom: 16,
  },
  narrativeText: {
    lineHeight: 24,
  },
  outcomeContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2 - 150,
    width: SCREEN_WIDTH - 60,
    padding: 24,
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  outcomeTitle: {
    marginBottom: 16,
  },
  outcomeDescription: {
    marginBottom: 24,
    lineHeight: 24,
  },
  continueButton: {
    marginTop: 8,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 40,
  },
});

export default PortalTransitionScreen;

/**
 * Boss Battle Screen - Batalla Final
 * ENFOQUE EDUCATIVO MIGRATORIO:
 * - Don Bowser = Representa las políticas anti-inmigrantes y barreras sistémicas
 * - Koopas de Hielo (❄️) = Agentes ICE y sistema de control migratorio
 * - Muros y Barreras = Obstáculos legales, fronterizos y burocráticos
 * - Victoria = Superación del viaje migratorio completo, llegada al destino soñado
 *
 * MENSAJE FINAL: Después de cruzar 35 países, superar innumerables desafíos,
 * el migrante finalmente enfrenta y vence el sistema que intentó detenerlo.
 * La perseverancia, educación y estrategia permiten lograr el sueño americano.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../../components/ui';
import { Colors, GameConfig } from '../../constants';
import { useUserStore, useGameStore } from '../../stores';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GAME_HEIGHT = 450;
const SLINGSHOT_X = 80;
const SLINGSHOT_Y = GAME_HEIGHT - 80;
const MAX_PULL = 100;

interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  destroyed: boolean;
  icon: string;
  isIce?: boolean;
}

interface Enemy {
  id: string;
  x: number;
  y: number;
  destroyed: boolean;
  icon: string;
  size: number;
  isBoss?: boolean;
  health?: number;
}

type BattlePhase = 'koopas' | 'ice_barriers' | 'boss' | 'complete';

const BossBattleScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userAge = useUserStore((state) => state.age);
  const completeCountry = useGameStore((state) => state.completeCountry);

  const { countryId, countryName } = route.params || {};

  // Determinar lanzamientos según edad (más lanzamientos para el jefe)
  const maxLaunches = userAge <= 7 ? 12 : userAge <= 10 ? 8 : 5;
  const showTrajectory = userAge <= 7 ? true : userAge <= 10 ? 'partial' : false;

  const [currentPhase, setCurrentPhase] = useState<BattlePhase>('koopas');
  const [launches, setLaunches] = useState(maxLaunches);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState({ x: 0, y: 0 });
  const [projectileActive, setProjectileActive] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [phaseMessage, setPhaseMessage] = useState('');

  const projectileX = useRef(new Animated.Value(SLINGSHOT_X)).current;
  const projectileY = useRef(new Animated.Value(SLINGSHOT_Y)).current;

  // Inicializar batalla
  useEffect(() => {
    initializeBattle();
  }, []);

  const initializeBattle = () => {
    setCurrentPhase('koopas');
    setupPhaseKoopas();
    setGameOver(false);
    setVictory(false);
    setLaunches(maxLaunches);
    setPhaseMessage('¡Derrota a los guardias Koopa!');
  };

  const setupPhaseKoopas = () => {
    // Fase 1: 3 Koopa guards
    const newObstacles: Obstacle[] = [
      { id: 'o1', x: 220, y: GAME_HEIGHT - 60, width: 35, height: 60, destroyed: false, icon: '📦' },
      { id: 'o2', x: 260, y: GAME_HEIGHT - 60, width: 35, height: 60, destroyed: false, icon: '📦' },
      { id: 'o3', x: 300, y: GAME_HEIGHT - 60, width: 35, height: 60, destroyed: false, icon: '📦' },
      { id: 'o4', x: 240, y: GAME_HEIGHT - 120, width: 35, height: 60, destroyed: false, icon: '📦' },
      { id: 'o5', x: 280, y: GAME_HEIGHT - 120, width: 35, height: 60, destroyed: false, icon: '📦' },
    ];

    const newEnemies: Enemy[] = [
      { id: 'k1', x: 230, y: GAME_HEIGHT - 90, destroyed: false, icon: '❄️', size: 35 },
      { id: 'k2', x: 270, y: GAME_HEIGHT - 90, destroyed: false, icon: '❄️', size: 35 },
      { id: 'k3', x: 310, y: GAME_HEIGHT - 90, destroyed: false, icon: '❄️', size: 35 },
    ];

    setObstacles(newObstacles);
    setEnemies(newEnemies);
  };

  const setupPhaseIceBarriers = () => {
    // Fase 2: Barreras de hielo
    const newObstacles: Obstacle[] = [
      { id: 'ice1', x: 200, y: GAME_HEIGHT - 80, width: 50, height: 80, destroyed: false, icon: '🧊', isIce: true },
      { id: 'ice2', x: 260, y: GAME_HEIGHT - 80, width: 50, height: 80, destroyed: false, icon: '🧊', isIce: true },
      { id: 'ice3', x: 320, y: GAME_HEIGHT - 80, width: 50, height: 80, destroyed: false, icon: '🧊', isIce: true },
      { id: 'ice4', x: 230, y: GAME_HEIGHT - 160, width: 50, height: 80, destroyed: false, icon: '🧊', isIce: true },
      { id: 'ice5', x: 290, y: GAME_HEIGHT - 160, width: 50, height: 80, destroyed: false, icon: '🧊', isIce: true },
    ];

    setObstacles(newObstacles);
    setEnemies([]);
    setPhaseMessage('¡Rompe las barreras de hielo!');
  };

  const setupPhaseBoss = () => {
    // Fase 3: Don Bowser
    const newObstacles: Obstacle[] = [
      { id: 'wall1', x: 180, y: GAME_HEIGHT - 100, width: 40, height: 100, destroyed: false, icon: '🧱' },
      { id: 'wall2', x: 340, y: GAME_HEIGHT - 100, width: 40, height: 100, destroyed: false, icon: '🧱' },
      { id: 'wall3', x: 210, y: GAME_HEIGHT - 60, width: 40, height: 60, destroyed: false, icon: '🧱' },
      { id: 'wall4', x: 310, y: GAME_HEIGHT - 60, width: 40, height: 60, destroyed: false, icon: '🧱' },
    ];

    const boss: Enemy[] = [
      {
        id: 'bowser',
        x: 270,
        y: GAME_HEIGHT - 120,
        destroyed: false,
        icon: '👑',
        size: 60,
        isBoss: true,
        health: 3,
      },
    ];

    setObstacles(newObstacles);
    setEnemies(boss);
    setPhaseMessage('¡BATALLA FINAL: Don Bowser!');
  };

  // PanResponder para controlar el tirachinas
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !projectileActive && launches > 0 && !gameOver,
      onPanResponderGrant: () => {
        setIsPulling(true);
      },
      onPanResponderMove: (_, gesture) => {
        const dx = Math.max(-MAX_PULL, Math.min(0, gesture.dx));
        const dy = Math.max(-MAX_PULL, Math.min(MAX_PULL, gesture.dy));
        setPullDistance({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {
        if (isPulling && launches > 0) {
          launchProjectile();
        }
        setIsPulling(false);
        setPullDistance({ x: 0, y: 0 });
      },
    })
  ).current;

  const launchProjectile = () => {
    setProjectileActive(true);
    setLaunches(launches - 1);

    // Calcular velocidad basada en la distancia de estiramiento
    const velocityX = -pullDistance.x * 3.5;
    const velocityY = -pullDistance.y * 3.5;

    // Simular trayectoria parabólica
    const duration = 1500;
    const gravity = 0.5;

    const targetX = SLINGSHOT_X + velocityX;
    const targetY = SLINGSHOT_Y + velocityY + (gravity * duration / 10);

    Animated.parallel([
      Animated.timing(projectileX, {
        toValue: targetX,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(projectileY, {
        toValue: Math.min(GAME_HEIGHT, targetY),
        duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Detectar colisiones
      checkCollisions(targetX, targetY);

      // Reiniciar proyectil
      resetProjectile();

      // Verificar estado del juego
      checkGameStatus();
    });
  };

  const resetProjectile = () => {
    projectileX.setValue(SLINGSHOT_X);
    projectileY.setValue(SLINGSHOT_Y);
    setProjectileActive(false);
  };

  const checkCollisions = (x: number, y: number) => {
    // Verificar colisión con obstáculos
    setObstacles((prevObstacles) =>
      prevObstacles.map((obstacle) => {
        if (
          !obstacle.destroyed &&
          x >= obstacle.x &&
          x <= obstacle.x + obstacle.width &&
          y >= obstacle.y &&
          y <= obstacle.y + obstacle.height
        ) {
          return { ...obstacle, destroyed: true };
        }
        return obstacle;
      })
    );

    // Verificar colisión con enemigos
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        const distance = Math.sqrt(
          Math.pow(x - enemy.x, 2) + Math.pow(y - enemy.y, 2)
        );
        if (!enemy.destroyed && distance < enemy.size + 15) {
          if (enemy.isBoss && enemy.health && enemy.health > 1) {
            // Boss tiene múltiples vidas
            return { ...enemy, health: enemy.health - 1 };
          } else {
            return { ...enemy, destroyed: true };
          }
        }
        return enemy;
      })
    );
  };

  const checkGameStatus = () => {
    const allEnemiesDestroyed = enemies.every((e) => e.destroyed);

    // Verificar progreso de fases
    if (currentPhase === 'koopas' && allEnemiesDestroyed) {
      setTimeout(() => {
        setCurrentPhase('ice_barriers');
        setupPhaseIceBarriers();
      }, 1000);
      return;
    }

    if (currentPhase === 'ice_barriers') {
      const allIceDestroyed = obstacles.filter((o) => o.isIce).every((o) => o.destroyed);
      if (allIceDestroyed) {
        setTimeout(() => {
          setCurrentPhase('boss');
          setupPhaseBoss();
        }, 1000);
        return;
      }
    }

    if (currentPhase === 'boss' && allEnemiesDestroyed) {
      setCurrentPhase('complete');
      setVictory(true);
      setGameOver(true);
      // Marcar país como completado
      if (countryId) {
        completeCountry(countryId, 3);
      }
      return;
    }

    // Verificar derrota
    if (launches <= 0 && !projectileActive && !allEnemiesDestroyed) {
      setGameOver(true);
      setVictory(false);
    }
  };

  useEffect(() => {
    checkGameStatus();
  }, [enemies, obstacles, launches, projectileActive]);

  const calculateStars = () => {
    if (!victory) return 0;
    const launchesUsed = maxLaunches - launches;
    const optimalLaunches = userAge <= 7 ? 8 : userAge <= 10 ? 5 : 3;

    if (launchesUsed <= optimalLaunches) return 3;
    if (launchesUsed <= optimalLaunches + 3) return 2;
    return 1;
  };

  const renderGameOver = () => {
    const stars = calculateStars();

    return (
      <View style={styles.gameOverContainer}>
        <Card style={styles.gameOverCard}>
          <Heading1 style={styles.gameOverIcon}>
            {victory ? '🎊' : '😔'}
          </Heading1>
          <Heading1>
            {victory ? '¡VICTORIA!' : 'Inténtalo de nuevo'}
          </Heading1>
          {victory && (
            <>
              <BodyText style={styles.victoryText}>
                ¡Has derrotado a Don Bowser y completado tu viaje!
              </BodyText>
              <View style={styles.starsContainer}>
                <Heading1>{'⭐'.repeat(stars)}</Heading1>
                <BodyText color={Colors.text.secondary}>
                  Lanzamientos: {maxLaunches - launches}/{maxLaunches}
                </BodyText>
              </View>
              <View style={styles.celebration}>
                <Heading1>🎉 🎊 🎈 🎁 🎉</Heading1>
              </View>
            </>
          )}
          <View style={styles.gameOverButtons}>
            {!victory && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={initializeBattle}
              >
                <BodyText color={Colors.primary}>Reintentar</BodyText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                if (victory) {
                  // Navegar al mapa con mensaje de victoria
                  navigation.navigate('MainTabs', { screen: 'WorldMap' });
                } else {
                  navigation.goBack();
                }
              }}
            >
              <BodyText color={Colors.white}>
                {victory ? 'Volver al Mapa' : 'Salir'}
              </BodyText>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SmallText color={Colors.text.secondary}>{countryName} - Batalla Final</SmallText>
        <Heading2>Don Bowser</Heading2>
        <View style={styles.stats}>
          <BodyText>Lanzamientos: {launches}/{maxLaunches}</BodyText>
          <BodyText color={Colors.accent}>Fase: {phaseMessage}</BodyText>
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameContainer}>
        {/* Background */}
        <View style={styles.gameBackground}>
          <SmallText style={styles.groundLabel}>Frontera</SmallText>
        </View>

        {/* Obstacles */}
        {obstacles.map((obstacle) =>
          !obstacle.destroyed ? (
            <View
              key={obstacle.id}
              style={[
                styles.obstacle,
                {
                  left: obstacle.x,
                  bottom: GAME_HEIGHT - obstacle.y - obstacle.height,
                  width: obstacle.width,
                  height: obstacle.height,
                  backgroundColor: obstacle.isIce
                    ? '#B0E0E6'
                    : Colors.warning + '40',
                  borderColor: obstacle.isIce ? '#4682B4' : Colors.warning,
                },
              ]}
            >
              <BodyText>{obstacle.icon}</BodyText>
            </View>
          ) : null
        )}

        {/* Enemies */}
        {enemies.map((enemy) =>
          !enemy.destroyed ? (
            <View
              key={enemy.id}
              style={[
                styles.enemy,
                {
                  left: enemy.x - enemy.size / 2,
                  bottom: GAME_HEIGHT - enemy.y - enemy.size,
                  width: enemy.size,
                  height: enemy.size,
                  backgroundColor: enemy.isBoss
                    ? Colors.error
                    : Colors.error + '20',
                },
              ]}
            >
              <Heading1 style={{ fontSize: enemy.isBoss ? 40 : 24 }}>
                {enemy.icon}
              </Heading1>
              {enemy.isBoss && enemy.health && (
                <SmallText style={styles.bossHealth}>
                  ❤️ {enemy.health}
                </SmallText>
              )}
            </View>
          ) : null
        )}

        {/* Slingshot */}
        <View style={[styles.slingshot, { left: SLINGSHOT_X - 20, bottom: 20 }]}>
          <BodyText>🏹</BodyText>
        </View>

        {/* Projectile */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.projectile,
            {
              transform: [
                { translateX: isPulling ? pullDistance.x : projectileX },
                { translateY: isPulling ? pullDistance.y : projectileY },
              ],
            },
          ]}
        >
          <Heading2>👤</Heading2>
        </Animated.View>

        {/* Trajectory hint */}
        {showTrajectory === true && isPulling && (
          <View style={styles.trajectoryHint}>
            <SmallText color={Colors.accent}>← Arrastra y suelta →</SmallText>
          </View>
        )}
      </View>

      {/* Instructions */}
      {!projectileActive && launches > 0 && !gameOver && (
        <Card style={styles.instructions}>
          <SmallText color={Colors.text.secondary}>
            {currentPhase === 'koopas' && 'Derrota a los 3 guardias Koopa'}
            {currentPhase === 'ice_barriers' && 'Rompe todas las barreras de hielo'}
            {currentPhase === 'boss' && '¡Golpea a Don Bowser 3 veces!'}
          </SmallText>
        </Card>
      )}

      {/* Game Over Overlay */}
      {gameOver && renderGameOver()}
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
    marginTop: 8,
    gap: 4,
  },
  gameContainer: {
    height: GAME_HEIGHT,
    backgroundColor: '#FFA07A',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: '#8B0000',
  },
  gameBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#CD853F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groundLabel: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  obstacle: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enemy: {
    position: 'absolute',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.error,
  },
  bossHealth: {
    position: 'absolute',
    top: -15,
    fontSize: 10,
    fontWeight: 'bold',
  },
  slingshot: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectile: {
    position: 'absolute',
    left: SLINGSHOT_X - 15,
    bottom: SLINGSHOT_Y - 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  trajectoryHint: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructions: {
    margin: 20,
    backgroundColor: Colors.info + '10',
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  gameOverCard: {
    margin: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: SCREEN_WIDTH - 80,
  },
  gameOverIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  victoryText: {
    marginTop: 16,
    textAlign: 'center',
    color: Colors.success,
  },
  starsContainer: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  celebration: {
    marginTop: 16,
  },
  gameOverButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});

export default BossBattleScreen;

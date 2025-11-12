/**
 * Physics Screen (Angry Birds Style)
 * ENFOQUE EDUCATIVO MIGRATORIO:
 * - Obstáculos (📦) = Barreras migratorias (muros fronterizos, burocracia)
 * - Enemigos (❄️ Koopas) = Agentes de control migratorio (ICE, autoridades)
 * - Lanzamiento del protagonista = Migrante superando obstáculos con estrategia
 * - Lanzamientos limitados = Recursos limitados en el viaje migratorio
 *
 * MENSAJE: La migración requiere planificación, perseverancia y superar múltiples barreras
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
import { useUserStore } from '../../stores';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GAME_HEIGHT = 400;
const SLINGSHOT_X = 80;
const SLINGSHOT_Y = GAME_HEIGHT - 80;
const MAX_PULL = 80;

interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  destroyed: boolean;
  icon: string;
}

interface Enemy {
  id: string;
  x: number;
  y: number;
  destroyed: boolean;
  icon: string;
  size: number;
}

const PhysicsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userAge = useUserStore((state) => state.age);

  const { countryId, countryName, isBossBattle } = route.params || {};

  // Determinar lanzamientos según edad
  const maxLaunches = userAge <= 7 ? 7 : userAge <= 10 ? 5 : 3;
  const showTrajectory = userAge <= 7 ? true : userAge <= 10 ? 'partial' : false;

  const [launches, setLaunches] = useState(maxLaunches);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState({ x: 0, y: 0 });
  const [projectileActive, setProjectileActive] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const projectileX = useRef(new Animated.Value(SLINGSHOT_X)).current;
  const projectileY = useRef(new Animated.Value(SLINGSHOT_Y)).current;

  // Inicializar nivel
  useEffect(() => {
    initializeLevel();
  }, []);

  const initializeLevel = () => {
    // Crear obstáculos
    const newObstacles: Obstacle[] = [
      { id: 'o1', x: 250, y: GAME_HEIGHT - 60, width: 40, height: 60, destroyed: false, icon: '📦' },
      { id: 'o2', x: 290, y: GAME_HEIGHT - 60, width: 40, height: 60, destroyed: false, icon: '📦' },
      { id: 'o3', x: 270, y: GAME_HEIGHT - 120, width: 40, height: 60, destroyed: false, icon: '📦' },
    ];

    // Crear enemigos (Koopas)
    const newEnemies: Enemy[] = [
      { id: 'e1', x: 260, y: GAME_HEIGHT - 80, destroyed: false, icon: '❄️', size: 30 },
      { id: 'e2', x: 300, y: GAME_HEIGHT - 80, destroyed: false, icon: '❄️', size: 30 },
    ];

    setObstacles(newObstacles);
    setEnemies(newEnemies);
    setGameOver(false);
    setVictory(false);
    setLaunches(maxLaunches);
  };

  // PanResponder para controlar el tirachinas
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !projectileActive && launches > 0,
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
    const velocityX = -pullDistance.x * 3;
    const velocityY = -pullDistance.y * 3;

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

      // Verificar victoria o derrota
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
          return { ...enemy, destroyed: true };
        }
        return enemy;
      })
    );
  };

  const checkGameStatus = () => {
    const allEnemiesDestroyed = enemies.every((e) => e.destroyed);

    if (allEnemiesDestroyed) {
      setVictory(true);
      setGameOver(true);
    } else if (launches <= 0 && !projectileActive) {
      setGameOver(true);
      setVictory(false);
    }
  };

  useEffect(() => {
    checkGameStatus();
  }, [enemies, launches, projectileActive]);

  const calculateStars = () => {
    if (!victory) return 0;
    const launchesUsed = maxLaunches - launches;
    const optimalLaunches = 2; // Lanzamientos óptimos para 3 estrellas

    if (launchesUsed <= optimalLaunches) return 3;
    if (launchesUsed <= optimalLaunches + 2) return 2;
    return 1;
  };

  const renderGameOver = () => {
    const stars = calculateStars();

    return (
      <View style={styles.gameOverContainer}>
        <Card style={styles.gameOverCard}>
          <Heading1 style={styles.gameOverIcon}>
            {victory ? '🎉' : '😔'}
          </Heading1>
          <Heading2>
            {victory ? '¡Victoria!' : 'Inténtalo de nuevo'}
          </Heading2>
          {victory && (
            <View style={styles.starsContainer}>
              <Heading1>{'⭐'.repeat(stars)}</Heading1>
              <BodyText color={Colors.text.secondary}>
                Lanzamientos usados: {maxLaunches - launches}/{maxLaunches}
              </BodyText>
            </View>
          )}
          <View style={styles.gameOverButtons}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={initializeLevel}
            >
              <BodyText color={Colors.primary}>Reintentar</BodyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.goBack()}
            >
              <BodyText color={Colors.white}>Continuar</BodyText>
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
        <SmallText color={Colors.text.secondary}>{countryName}</SmallText>
        <Heading2>Superando Barreras Migratorias</Heading2>
        <View style={styles.stats}>
          <BodyText>Intentos: {launches}/{maxLaunches}</BodyText>
        </View>
      </View>

      {/* Mensaje Educativo */}
      {!gameOver && (
        <Card style={styles.educationalCard}>
          <SmallText color={Colors.text.secondary}>📚 Aprende mientras juegas:</SmallText>
          <SmallText style={styles.educationalText}>
            Las <BodyText style={{fontWeight: '600'}}>cajas (📦)</BodyText> representan las barreras que enfrentan los migrantes:
            muros fronterizos, trámites burocráticos y obstáculos legales.
          </SmallText>
          <SmallText style={styles.educationalText}>
            Los <BodyText style={{fontWeight: '600'}}>agentes (❄️)</BodyText> simbolizan las autoridades migratorias
            que controlan el paso entre países.
          </SmallText>
          <SmallText style={{fontWeight: '600', color: Colors.primary}}>
            ¡Usa la estrategia para superar cada desafío!
          </SmallText>
        </Card>
      )}

      {/* Game Area */}
      <View style={styles.gameContainer}>
        {/* Background */}
        <View style={styles.gameBackground}>
          <SmallText style={styles.groundLabel}>Suelo</SmallText>
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
                },
              ]}
            >
              <Heading2>{enemy.icon}</Heading2>
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

        {/* Trajectory hint (for younger players) */}
        {showTrajectory === true && isPulling && (
          <View style={styles.trajectoryHint}>
            <SmallText color={Colors.accent}>← Arrastra y suelta →</SmallText>
          </View>
        )}
      </View>

      {/* Instructions */}
      {!projectileActive && launches > 0 && (
        <Card style={styles.instructions}>
          <SmallText color={Colors.text.secondary}>
            {isPulling
              ? '¡Suelta para lanzar!'
              : 'Arrastra el personaje hacia atrás y suelta para lanzar'}
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
  },
  educationalCard: {
    margin: 12,
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
    height: GAME_HEIGHT,
    backgroundColor: '#87CEEB',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: '#8B4513',
  },
  gameBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groundLabel: {
    color: '#006400',
  },
  obstacle: {
    position: 'absolute',
    backgroundColor: Colors.warning + '40',
    borderWidth: 2,
    borderColor: Colors.warning,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enemy: {
    position: 'absolute',
    backgroundColor: Colors.error + '20',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  gameOverCard: {
    margin: 20,
    padding: 30,
    alignItems: 'center',
  },
  gameOverIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  starsContainer: {
    marginTop: 24,
    alignItems: 'center',
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

export default PhysicsScreen;

/**
 * Bridge Physics Component
 * Motor de física con Matter.js para construir puentes y destruir muros
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Animated } from 'react-native';
import Matter from 'matter-js';
import { Colors } from '../../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GAME_WIDTH = SCREEN_WIDTH;
const GAME_HEIGHT = SCREEN_HEIGHT * 0.6;

interface BridgePhysicsProps {
  mode: 'build' | 'destroy';
  bridgeConfig?: BridgeBuildConfig;
  wallConfig?: WallDestroyConfig;
  onComplete: (success: boolean, stars: number) => void;
  onLaunchesUpdate: (remaining: number) => void;
}

interface BridgeBuildConfig {
  gapWidth: number;
  gapHeight: number;
  maxPieces: number;
  targetPosition: { x: number; y: number };
  availablePieces: BridgePieceType[];
}

interface WallDestroyConfig {
  wall: {
    width: number;
    height: number;
    layers: number;
    material: 'brick' | 'border_wall' | 'glass' | 'prejudice_wall' | 'bureaucracy_wall' | 'misinformation_wall';
  };
  maxLaunches: number;
  projectileType: 'stone' | 'cannonball' | 'bomb';
}

type BridgePieceType = 'beam_long' | 'beam_short' | 'pillar' | 'cable' | 'platform';

export const BridgePhysics: React.FC<BridgePhysicsProps> = ({
  mode,
  bridgeConfig,
  wallConfig,
  onComplete,
  onLaunchesUpdate,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [placedPieces, setPlacedPieces] = useState<Matter.Body[]>([]);
  const [selectedPieceType, setSelectedPieceType] = useState<BridgePieceType | null>(null);
  const [launchesRemaining, setLaunchesRemaining] = useState(
    mode === 'build' ? (bridgeConfig?.maxPieces || 10) : (wallConfig?.maxLaunches || 5)
  );
  const [bricks, setBricks] = useState<Matter.Body[]>([]);

  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    initializePhysics();
    return () => {
      cleanupPhysics();
    };
  }, []);

  const initializePhysics = () => {
    // Create Matter.js engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    const world = engine.world;

    engineRef.current = engine;
    worldRef.current = world;

    if (mode === 'build') {
      createBridgeScene(world);
    } else {
      createWallScene(world);
    }

    // Create runner for continuous updates
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
  };

  const createBridgeScene = (world: Matter.World) => {
    if (!bridgeConfig) return;

    const groundY = GAME_HEIGHT - 50;

    // Left platform
    const leftGround = Matter.Bodies.rectangle(
      100,
      groundY,
      200,
      20,
      { isStatic: true, label: 'ground' }
    );

    // Right platform
    const rightGround = Matter.Bodies.rectangle(
      GAME_WIDTH - 100,
      groundY,
      200,
      20,
      { isStatic: true, label: 'ground' }
    );

    // Add boundaries
    const leftWall = Matter.Bodies.rectangle(-10, GAME_HEIGHT / 2, 20, GAME_HEIGHT, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(GAME_WIDTH + 10, GAME_HEIGHT / 2, 20, GAME_HEIGHT, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(GAME_WIDTH / 2, -10, GAME_WIDTH, 20, { isStatic: true });

    Matter.World.add(world, [leftGround, rightGround, leftWall, rightWall, ceiling]);
  };

  const createWallScene = (world: Matter.World) => {
    if (!wallConfig) return;

    const { wall } = wallConfig;
    const groundY = GAME_HEIGHT - 30;

    // Ground
    const ground = Matter.Bodies.rectangle(
      GAME_WIDTH / 2,
      groundY,
      GAME_WIDTH,
      20,
      { isStatic: true, label: 'ground', friction: 1 }
    );

    // Create wall with bricks
    const brickWidth = 50;
    const brickHeight = 30;
    const wallCenterX = GAME_WIDTH / 2 + 100;
    const wallBottomY = groundY - brickHeight / 2 - 10;

    const createdBricks: Matter.Body[] = [];

    for (let layer = 0; layer < wall.layers; layer++) {
      const bricksInLayer = Math.floor(wall.width / brickWidth);
      const offsetX = (layer % 2) * (brickWidth / 2); // Alternate offset for stability

      for (let col = 0; col < bricksInLayer; col++) {
        const x = wallCenterX + (col - bricksInLayer / 2) * brickWidth + offsetX;
        const y = wallBottomY - layer * brickHeight;

        // Material properties based on wall type
        let density = 0.001;
        let friction = 0.8;

        switch (wall.material) {
          case 'glass':
            density = 0.0005;
            friction = 0.3;
            break;
          case 'border_wall':
            density = 0.002;
            friction = 1.0;
            break;
          case 'prejudice_wall':
            density = 0.0015;
            friction = 0.9;
            break;
          case 'bureaucracy_wall':
            density = 0.0018;
            friction = 0.85;
            break;
          case 'misinformation_wall':
            density = 0.0012;
            friction = 0.7;
            break;
        }

        const brick = Matter.Bodies.rectangle(x, y, brickWidth - 2, brickHeight - 2, {
          density,
          friction,
          restitution: 0.2,
          label: 'brick',
        });

        createdBricks.push(brick);
      }
    }

    setBricks(createdBricks);
    Matter.World.add(world, [ground, ...createdBricks]);
  };

  const handlePiecePlacement = (x: number, y: number) => {
    if (!selectedPieceType || launchesRemaining <= 0 || !worldRef.current) return;

    let body: Matter.Body | null = null;

    switch (selectedPieceType) {
      case 'beam_long':
        body = Matter.Bodies.rectangle(x, y, 100, 10, { friction: 0.8, density: 0.001 });
        break;
      case 'beam_short':
        body = Matter.Bodies.rectangle(x, y, 50, 10, { friction: 0.8, density: 0.001 });
        break;
      case 'pillar':
        body = Matter.Bodies.rectangle(x, y, 20, 60, { friction: 0.8, density: 0.002 });
        break;
      case 'platform':
        body = Matter.Bodies.rectangle(x, y, 80, 15, { friction: 1.0, density: 0.001 });
        break;
      case 'cable':
        // Cable would require constraints, simplified for now
        body = Matter.Bodies.rectangle(x, y, 2, 100, { friction: 0.5, density: 0.0005 });
        break;
    }

    if (body) {
      Matter.World.add(worldRef.current, body);
      setPlacedPieces([...placedPieces, body]);
      setLaunchesRemaining(launchesRemaining - 1);
      onLaunchesUpdate(launchesRemaining - 1);
    }
  };

  const handleProjectileLaunch = (angle: number = -45, power: number = 0.05) => {
    if (launchesRemaining <= 0 || !worldRef.current) return;

    const projectileX = 50;
    const projectileY = GAME_HEIGHT - 150;

    // Determine projectile properties based on type
    let radius = 15;
    let density = 0.005;
    let restitution = 0.6;

    switch (wallConfig?.projectileType) {
      case 'cannonball':
        radius = 20;
        density = 0.01;
        restitution = 0.3;
        break;
      case 'bomb':
        radius = 25;
        density = 0.015;
        restitution = 0.1;
        break;
      case 'stone':
      default:
        radius = 15;
        density = 0.005;
        restitution = 0.6;
        break;
    }

    const projectile = Matter.Bodies.circle(projectileX, projectileY, radius, {
      density,
      restitution,
      friction: 0.5,
      label: 'projectile',
    });

    // Convert angle to radians
    const angleRad = (angle * Math.PI) / 180;

    // Apply initial velocity
    const force = {
      x: Math.cos(angleRad) * power,
      y: Math.sin(angleRad) * power,
    };

    Matter.Body.applyForce(projectile, projectile.position, force);
    Matter.World.add(worldRef.current, projectile);

    setLaunchesRemaining(launchesRemaining - 1);
    onLaunchesUpdate(launchesRemaining - 1);

    // Check win condition after 3 seconds
    setTimeout(() => {
      checkWinCondition();
    }, 4000);
  };

  const startSimulation = () => {
    if (mode === 'build') {
      setIsSimulating(true);

      // Add character to test bridge
      if (worldRef.current && bridgeConfig) {
        const character = Matter.Bodies.circle(100, GAME_HEIGHT - 100, 20, {
          density: 0.002,
          friction: 0.8,
          restitution: 0.3,
          label: 'character',
        });

        Matter.World.add(worldRef.current, character);

        // Apply forward force
        Matter.Body.applyForce(character, character.position, { x: 0.01, y: 0 });
      }

      // Check after 5 seconds
      setTimeout(() => {
        checkWinCondition();
      }, 5000);
    }
  };

  const checkWinCondition = () => {
    let success = false;
    let stars = 0;

    if (mode === 'build' && bridgeConfig) {
      // Check if character reached target (simplified)
      // In real implementation, check character position
      const piecesUsed = placedPieces.length;
      const maxPieces = bridgeConfig.maxPieces;

      // Simplified success check
      success = piecesUsed > 0 && piecesUsed <= maxPieces;

      if (success) {
        if (piecesUsed <= maxPieces * 0.6) stars = 3;
        else if (piecesUsed <= maxPieces * 0.8) stars = 2;
        else stars = 1;
      }
    } else if (mode === 'destroy' && wallConfig) {
      // Count bricks that have fallen or moved significantly
      const bricksDestroyed = bricks.filter((brick) => {
        const groundY = GAME_HEIGHT - 30;
        // Brick is destroyed if it fell below ground or moved significantly
        return brick.position.y > groundY || Math.abs(brick.angle) > 0.3;
      }).length;

      const totalBricks = bricks.length;
      const destroyPercentage = totalBricks > 0 ? bricksDestroyed / totalBricks : 0;

      success = destroyPercentage >= 0.5; // 50% of wall destroyed

      const launchesUsed = (wallConfig.maxLaunches || 5) - launchesRemaining;

      if (success) {
        if (launchesUsed <= 2) stars = 3;
        else if (launchesUsed <= 3) stars = 2;
        else stars = 1;
      }
    }

    setIsSimulating(false);
    onComplete(success, stars);
  };

  const cleanupPhysics = () => {
    if (runnerRef.current && engineRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }

    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    if (worldRef.current) {
      Matter.World.clear(worldRef.current, false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Game Canvas */}
      <View style={[styles.canvas, { width: GAME_WIDTH, height: GAME_HEIGHT }]}>
        <Text style={styles.infoText}>
          {mode === 'build' ? 'Construye un puente' : 'Destruye el muro'}
        </Text>
        <Text style={styles.infoText}>
          Lanzamientos restantes: {launchesRemaining}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {mode === 'build' ? (
          <View style={styles.buildControls}>
            <Text style={styles.controlsTitle}>Selecciona pieza:</Text>
            {bridgeConfig?.availablePieces.map((piece) => (
              <TouchableOpacity
                key={piece}
                style={[
                  styles.pieceButton,
                  selectedPieceType === piece && styles.pieceButtonSelected,
                ]}
                onPress={() => setSelectedPieceType(piece)}
              >
                <Text style={styles.pieceText}>{piece}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.actionButton} onPress={startSimulation}>
              <Text style={styles.actionButtonText}>Probar Puente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.destroyControls}>
            <TouchableOpacity
              style={styles.launchButton}
              onPress={() => handleProjectileLaunch()}
              disabled={launchesRemaining <= 0}
            >
              <Text style={styles.launchButtonText}>
                🎯 Lanzar {wallConfig?.projectileType}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  canvas: {
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  controls: {
    padding: 15,
    backgroundColor: Colors.background.secondary,
  },
  buildControls: {
    gap: 10,
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  pieceButton: {
    padding: 12,
    backgroundColor: Colors.primary.main,
    borderRadius: 8,
    marginVertical: 4,
  },
  pieceButtonSelected: {
    backgroundColor: Colors.secondary.main,
  },
  pieceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButton: {
    padding: 15,
    backgroundColor: Colors.success.main,
    borderRadius: 8,
    marginTop: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  destroyControls: {
    alignItems: 'center',
  },
  launchButton: {
    padding: 20,
    backgroundColor: Colors.error.main,
    borderRadius: 12,
    minWidth: 200,
  },
  launchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

/**
 * Configuración de física para Matter.js - Hope Quest
 * Modo Híbrido: Construcción de Puentes (1-20) + Destrucción de Muros (21-35)
 */

export const PhysicsConfig = {
  // Motor de física general
  engine: {
    gravity: { x: 0, y: 0.8 },
    enableSleeping: true,
    velocityIterations: 4,
    positionIterations: 6,
  },

  // Mundo de física
  world: {
    bounds: {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    },
  },

  // Resortera (Slingshot)
  slingshot: {
    maxForce: 0.05,
    stiffness: 0.05,
    damping: 0.4,
    maxStretch: 100,
    anchor: { x: 80, y: 500 },
  },

  // Propiedades de La Familia (5 personajes lanzables)
  helpers: {
    marco: {
      // Marco - Agricultor mexicano (inspirado en Mario)
      // Habilidad: Golpe clásico potente
      mass: 1.2,
      restitution: 0.35,
      friction: 0.5,
      frictionAir: 0.01,
      radius: 20,
      specialAbility: 'punch',
      punchForce: 0.03,
      color: '#FF6347', // Rojo tomate
    },
    luis: {
      // Luis - Hermano menor (inspirado en Luigi)
      // Habilidad: Salto alto para alcanzar lugares difíciles
      mass: 1.0,
      restitution: 0.5,
      friction: 0.4,
      frictionAir: 0.015,
      radius: 20,
      specialAbility: 'jump',
      jumpForce: 0.04,
      color: '#32CD32', // Verde lima
    },
    patricia: {
      // Patricia - Pareja fuerte (inspirada en Peach)
      // Habilidad: Ondas sónicas (gritos que derriban)
      mass: 0.9,
      restitution: 0.4,
      friction: 0.45,
      frictionAir: 0.01,
      radius: 20,
      specialAbility: 'sonic',
      sonicRadius: 120,
      sonicForce: 0.025,
      color: '#FF69B4', // Rosa fuerte
    },
    teo: {
      // Teo - Niño migrante (inspirado en Toad)
      // Habilidad: Explosión de esperanza (área de efecto)
      mass: 0.7,
      restitution: 0.6,
      friction: 0.3,
      frictionAir: 0.02,
      radius: 18,
      specialAbility: 'hope_burst',
      burstRadius: 100,
      burstForce: 0.03,
      color: '#FFD700', // Dorado
    },
    xolo: {
      // Xolo - Ajolote sabio mexicano (reemplazo de Yoshi)
      // Habilidad: Lengua que agarra y jala bloques
      mass: 1.1,
      restitution: 0.3,
      friction: 0.6,
      frictionAir: 0.015,
      radius: 20,
      specialAbility: 'tongue_grab',
      tongueLength: 150,
      pullForce: 0.04,
      color: '#FF69B4', // Rosa coral
    },
  },

  // Materiales de bloques/estructuras
  materials: {
    // === MATERIALES DE CONSTRUCCIÓN (Modo Build: países 1-20) ===
    wood_plank: {
      density: 0.001,
      friction: 0.8,
      frictionStatic: 0.8,
      restitution: 0.2,
      health: 2,
      damageThreshold: 2,
      canConnect: true, // Puede conectarse con otros bloques
      color: '#8B4513',
    },
    rope: {
      density: 0.0003,
      friction: 1.2,
      frictionStatic: 1.5,
      restitution: 0.1,
      health: 1.5,
      damageThreshold: 1,
      flexible: true, // Material flexible
      canConnect: true,
      color: '#D2691E',
    },
    steel_beam: {
      density: 0.003,
      friction: 0.6,
      frictionStatic: 0.9,
      restitution: 0.4,
      health: 5,
      damageThreshold: 8,
      canConnect: true,
      color: '#708090',
    },

    // === MATERIALES DE DESTRUCCIÓN (Modo Destroy: países 21-34) ===
    prejudice_wall: {
      // Muro rojo - representa prejuicios
      density: 0.002,
      friction: 1.0,
      frictionStatic: 1.0,
      restitution: 0.1,
      health: 2,
      damageThreshold: 3,
      color: '#DC143C',
      symbolizes: 'prejudice',
    },
    bureaucracy_wall: {
      // Muro azul - representa burocracia
      density: 0.0018,
      friction: 0.8,
      frictionStatic: 0.9,
      restitution: 0.15,
      health: 2.5,
      damageThreshold: 4,
      color: '#4169E1',
      symbolizes: 'bureaucracy',
    },
    border_wall: {
      // Muro gris - representa fronteras físicas
      density: 0.0025,
      friction: 1.0,
      frictionStatic: 1.0,
      restitution: 0.1,
      health: 3,
      damageThreshold: 5,
      color: '#808080',
      symbolizes: 'borders',
    },
    misinformation_wall: {
      // Muro amarillo - representa desinformación
      density: 0.001,
      friction: 0.7,
      frictionStatic: 0.8,
      restitution: 0.3,
      health: 1.5,
      damageThreshold: 2,
      color: '#FFD700',
      symbolizes: 'misinformation',
    },

    // === MATERIALES COMUNES ===
    stone: {
      density: 0.002,
      friction: 1.0,
      frictionStatic: 1.0,
      restitution: 0.1,
      health: 2,
      damageThreshold: 4,
      color: '#696969',
    },
    metal: {
      density: 0.003,
      friction: 0.6,
      frictionStatic: 0.9,
      restitution: 0.4,
      health: 3,
      damageThreshold: 6,
      color: '#C0C0C0',
    },
    indestructible: {
      density: 0.005,
      friction: 1.0,
      frictionStatic: 1.0,
      restitution: 0.1,
      health: Infinity,
      damageThreshold: Infinity,
      color: '#2F4F4F',
    },
  },

  // Propiedades de enemigos (Koopas HIELO)
  enemies: {
    koopa_hielo: {
      mass: 1.5,
      restitution: 0.2,
      friction: 0.5,
      frictionAir: 0.01,
      radius: 22,
      health: 2,
      behavior: 'stationary', // No se mueven, solo obstaculizan
      color: '#87CEEB', // Azul hielo
      hasIceInsignia: true, // Tienen insignia de hielo (referencia ICE)
    },
  },

  // Colisiones
  collision: {
    minVelocityForDamage: 2,
    damageMultiplier: 1.0,
    chainReactionDelay: 100, // ms
  },

  // Partículas de destrucción
  particles: {
    count: 15,
    lifespan: 1000, // ms
    velocityRange: { min: -5, max: 5 },
    gravityScale: 0.5,
  },

  // Categorías de colisión (bitmask)
  categories: {
    helper: 0x0001, // Personajes de la familia (lanzables)
    block: 0x0002,
    ground: 0x0004,
    obstacle: 0x0008,
    wall: 0x0010,
    enemy: 0x0020, // Koopas HIELO
    gap: 0x0040, // Espacios a cruzar (modo build)
  },

  // Límites del mundo
  worldBounds: {
    leftWall: { x: 0, width: 10, height: 600 },
    rightWall: { x: 790, width: 10, height: 600 },
    ceiling: { x: 0, width: 800, height: 10 },
    ground: { x: 0, y: 590, width: 800, height: 10 },
  },
};

export type HelperType = keyof typeof PhysicsConfig.helpers;
export type MaterialType = keyof typeof PhysicsConfig.materials;
export type EnemyType = keyof typeof PhysicsConfig.enemies;

// Alias para compatibilidad (deprecated, usar HelperType)
export type SageType = HelperType;

/**
 * Educational Enemies Types
 * Enemigos que representan barreras sistémicas en el proceso migratorio
 *
 * IMPORTANTE: Los enemigos NO son personas, son conceptos educativos
 * Se derrotan con conocimiento y aprendizaje, no con violencia
 */

export type EnemyType =
  | 'ignorance' // Ignorancia - Falta de conocimiento
  | 'prejudice' // Prejuicio - Ideas preconcebidas
  | 'bureaucracy' // Burocracia - Procesos complicados
  | 'misinformation' // Desinformación - Información falsa
  | 'language_barrier' // Barrera idiomática
  | 'homesickness'; // Nostalgia/Tristeza por el hogar

export interface Enemy {
  id: string;
  type: EnemyType;
  name: LocalizedString;
  description: LocalizedString;
  emoji: string;
  color: string;

  // Comportamiento
  speed: number; // Velocidad de movimiento
  health: number; // Veces que hay que responder correctamente para derrotarlo
  damage: number; // Estrellas que quita si toca al jugador

  // Educativo
  weaknessType: 'knowledge' | 'empathy' | 'patience' | 'communication';
  educationalMessage: LocalizedString;
  defeatMessage: LocalizedString;

  // Visual
  movementPattern: 'patrol' | 'chase' | 'stationary' | 'random';
  size: 'small' | 'medium' | 'large';
}

export interface LocalizedString {
  es: string;
  en: string;
}

// Enemigos educativos definidos
export const EDUCATIONAL_ENEMIES: Record<EnemyType, Enemy> = {
  ignorance: {
    id: 'enemy_ignorance',
    type: 'ignorance',
    name: {
      es: 'Nube de Ignorancia',
      en: 'Cloud of Ignorance',
    },
    description: {
      es: 'Representa la falta de conocimiento sobre otras culturas. Se derrota aprendiendo datos culturales.',
      en: 'Represents lack of knowledge about other cultures. Defeated by learning cultural facts.',
    },
    emoji: '☁️❌',
    color: '#808080',
    speed: 0.5,
    health: 2,
    damage: 1,
    weaknessType: 'knowledge',
    educationalMessage: {
      es: '¡La educación ilumina la ignorancia!',
      en: 'Education illuminates ignorance!',
    },
    defeatMessage: {
      es: '¡Aprendiste algo nuevo! La ignorancia desapareció.',
      en: 'You learned something new! Ignorance disappeared.',
    },
    movementPattern: 'random',
    size: 'medium',
  },

  prejudice: {
    id: 'enemy_prejudice',
    type: 'prejudice',
    name: {
      es: 'Muro de Prejuicios',
      en: 'Wall of Prejudice',
    },
    description: {
      es: 'Representa ideas preconcebidas. Se derrota con empatía y comprensión.',
      en: 'Represents preconceived ideas. Defeated with empathy and understanding.',
    },
    emoji: '🧱',
    color: '#8B4513',
    speed: 0,
    health: 3,
    damage: 2,
    weaknessType: 'empathy',
    educationalMessage: {
      es: '¡La empatía rompe barreras!',
      en: 'Empathy breaks barriers!',
    },
    defeatMessage: {
      es: '¡Entendiste su perspectiva! El prejuicio se desmoronó.',
      en: 'You understood their perspective! The prejudice crumbled.',
    },
    movementPattern: 'stationary',
    size: 'large',
  },

  bureaucracy: {
    id: 'enemy_bureaucracy',
    type: 'bureaucracy',
    name: {
      es: 'Papeleo Burocrático',
      en: 'Bureaucratic Paperwork',
    },
    description: {
      es: 'Representa procesos complicados. Se derrota con paciencia y organización.',
      en: 'Represents complicated processes. Defeated with patience and organization.',
    },
    emoji: '📋',
    color: '#4169E1',
    speed: 0.3,
    health: 2,
    damage: 1,
    weaknessType: 'patience',
    educationalMessage: {
      es: '¡La paciencia vence la complejidad!',
      en: 'Patience overcomes complexity!',
    },
    defeatMessage: {
      es: '¡Completaste todos los formularios! La burocracia fue vencida.',
      en: 'You completed all the forms! Bureaucracy was defeated.',
    },
    movementPattern: 'patrol',
    size: 'medium',
  },

  misinformation: {
    id: 'enemy_misinformation',
    type: 'misinformation',
    name: {
      es: 'Nube de Desinformación',
      en: 'Cloud of Misinformation',
    },
    description: {
      es: 'Representa información falsa. Se derrota verificando hechos y pensando críticamente.',
      en: 'Represents false information. Defeated by fact-checking and critical thinking.',
    },
    emoji: '☁️📰',
    color: '#FF4500',
    speed: 0.7,
    health: 2,
    damage: 2,
    weaknessType: 'knowledge',
    educationalMessage: {
      es: '¡Verifica los hechos antes de creer!',
      en: 'Check the facts before believing!',
    },
    defeatMessage: {
      es: '¡Descubriste la verdad! La desinformación se disipó.',
      en: 'You discovered the truth! Misinformation dissipated.',
    },
    movementPattern: 'chase',
    size: 'medium',
  },

  language_barrier: {
    id: 'enemy_language_barrier',
    type: 'language_barrier',
    name: {
      es: 'Barrera del Idioma',
      en: 'Language Barrier',
    },
    description: {
      es: 'Representa dificultades de comunicación. Se derrota practicando el idioma.',
      en: 'Represents communication difficulties. Defeated by practicing the language.',
    },
    emoji: '🗣️❌',
    color: '#9370DB',
    speed: 0.4,
    health: 2,
    damage: 1,
    weaknessType: 'communication',
    educationalMessage: {
      es: '¡Cada palabra aprendida es un puente!',
      en: 'Every word learned is a bridge!',
    },
    defeatMessage: {
      es: '¡Aprendiste nuevas palabras! La barrera desapareció.',
      en: 'You learned new words! The barrier disappeared.',
    },
    movementPattern: 'patrol',
    size: 'medium',
  },

  homesickness: {
    id: 'enemy_homesickness',
    type: 'homesickness',
    name: {
      es: 'Nube de Nostalgia',
      en: 'Cloud of Homesickness',
    },
    description: {
      es: 'Representa la tristeza por extrañar el hogar. Se derrota recordando buenos momentos y haciendo nuevas conexiones.',
      en: 'Represents sadness from missing home. Defeated by remembering good moments and making new connections.',
    },
    emoji: '💭😢',
    color: '#4682B4',
    speed: 0.3,
    health: 1,
    damage: 1,
    weaknessType: 'empathy',
    educationalMessage: {
      es: '¡Está bien extrañar tu hogar! Crea nuevos recuerdos.',
      en: "It's okay to miss home! Create new memories.",
    },
    defeatMessage: {
      es: '¡Encontraste consuelo en nuevos amigos! La nostalgia se alivió.',
      en: 'You found comfort in new friends! Homesickness eased.',
    },
    movementPattern: 'stationary',
    size: 'small',
  },
};

// Store state para enemigos
export interface EnemyState {
  enemiesDefeated: Record<EnemyType, number>; // Contador por tipo
  totalEnemiesDefeated: number;
  currentLevelEnemies: string[]; // IDs de enemigos activos en el nivel actual
  defeatStreak: number; // Racha de enemigos derrotados consecutivamente
}

/**
 * Country Types
 * Definición de tipos TypeScript para el sistema de países
 */

export interface Country {
  id: string;
  name: string;
  region: 'North America' | 'Central America' | 'South America' | 'Caribbean' | 'Europe' | 'Africa' | 'Asia';
  flag: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };

  description: string;
  culturalFacts: string[];

  migrationContext: {
    reasons: string[];
    challenges: string[];
    destinations: string[];
    statistics: {
      emigrants?: string;
      immigrants?: string;
      refugees?: string;
      remittances?: string;
      topDestination?: string;
      topOrigin?: string;
    };
  };

  activities: Activity[];

  requiredStats: {
    minMoney: number;
    minHealth: number;
    minMoral: number;
    requiredDocuments: DocumentType[];
  };

  availablePortals: PortalType[];

  unlockConditions: {
    previousCountries: string[];
    minStars: number;
  };

  specialEvent?: {
    type: 'companion_discovery' | 'boss_encounter' | 'special_story';
    character?: string;
    description: string;
  };
}

export type DocumentType = 'passport' | 'visa' | 'work_permit' | 'refugee_status' | 'birth_certificate';

export type PortalType = 'avion' | 'barco' | 'tren' | 'autobus' | 'carro' | 'balsa' | 'tunel' | 'puente' | 'caminando';

export interface Activity {
  id: string;
  type: 'trivia' | 'puzzle' | 'memory';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard'; // Mantener para compatibilidad
  rewards: {
    stars: number;
    money: number;
    experience: number;
  };

  // Trivia specific
  questions?: TriviaQuestion[];

  // Puzzle specific (campo dinámico basado en edad)
  imageUrl?: string;
  gridSize?: 3 | 4 | 5; // Deprecated: usar puzzlePieces
  puzzlePieces?: number; // Nuevo: número de piezas según edad (6, 12, 20)

  // Memory specific (campo dinámico basado en edad)
  pairs?: MemoryPair[];
  maxPairs?: number; // Nuevo: número máximo de pares disponibles
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MemoryPair {
  id: number;
  content: string;
}

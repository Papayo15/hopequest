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

export type PortalType = 'aereo' | 'maritimo' | 'terrestre' | 'clandestino' | 'refugiado' | 'familiar';

export interface Activity {
  id: string;
  type: 'trivia' | 'puzzle' | 'memory';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: {
    stars: number;
    money: number;
    experience: number;
  };

  // Trivia specific
  questions?: TriviaQuestion[];

  // Puzzle specific
  imageUrl?: string;
  gridSize?: 3 | 4 | 5;

  // Memory specific
  pairs?: MemoryPair[];
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

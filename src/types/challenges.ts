/**
 * Daily Challenges Types
 * Desafíos diarios para mantener a los niños comprometidos
 * Se renuevan cada día con objetivos frescos
 */

export type ChallengeType =
  | 'collect_stars' // Colectar X estrellas
  | 'complete_levels' // Completar X niveles
  | 'defeat_enemies' // Derrotar X enemigos
  | 'collect_memories' // Colectar X recuerdos
  | 'visit_country' // Visitar un país específico
  | 'earn_coins' // Ganar X monedas
  | 'use_powerup' // Usar X power-ups
  | 'solve_detective' // Resolver un caso de detective
  | 'perfect_score' // Conseguir 3 estrellas en un nivel
  | 'play_time'; // Jugar por X minutos

export interface DailyChallenge {
  id: string;
  type: ChallengeType;
  title: LocalizedString;
  description: LocalizedString;
  emoji: string;

  // Objetivo
  target: number; // Meta a alcanzar
  progress: number; // Progreso actual

  // Recompensas
  rewards: {
    coins: number;
    stars?: number;
    powerUps?: string[]; // IDs de power-ups
    badge?: string; // Insignia especial
  };

  // Dificultad
  difficulty: 'easy' | 'medium' | 'hard';

  // Tiempo
  expiresAt: Date; // Cuándo expira el desafío
  completedAt?: Date; // Cuándo se completó

  // Estado
  isCompleted: boolean;
  isExpired: boolean;
}

export interface LocalizedString {
  es: string;
  en: string;
}

// Plantillas de desafíos diarios
export const CHALLENGE_TEMPLATES: Record<ChallengeType, {
  title: LocalizedString;
  description: (target: number) => LocalizedString;
  emoji: string;
  baseRewards: { coins: number };
}> = {
  collect_stars: {
    title: { es: 'Coleccionista de Estrellas', en: 'Star Collector' },
    description: (target) => ({
      es: `Colecta ${target} estrellas hoy`,
      en: `Collect ${target} stars today`,
    }),
    emoji: '⭐',
    baseRewards: { coins: 50 },
  },
  complete_levels: {
    title: { es: 'Aventurero del Día', en: 'Adventurer of the Day' },
    description: (target) => ({
      es: `Completa ${target} niveles hoy`,
      en: `Complete ${target} levels today`,
    }),
    emoji: '🎯',
    baseRewards: { coins: 100 },
  },
  defeat_enemies: {
    title: { es: 'Vencedor de Barreras', en: 'Barrier Breaker' },
    description: (target) => ({
      es: `Derrota ${target} enemigos educativos`,
      en: `Defeat ${target} educational enemies`,
    }),
    emoji: '⚔️',
    baseRewards: { coins: 75 },
  },
  collect_memories: {
    title: { es: 'Guardián de Recuerdos', en: 'Memory Keeper' },
    description: (target) => ({
      es: `Colecta ${target} recuerdos nuevos`,
      en: `Collect ${target} new memories`,
    }),
    emoji: '📸',
    baseRewards: { coins: 80 },
  },
  visit_country: {
    title: { es: 'Explorador Cultural', en: 'Cultural Explorer' },
    description: () => ({
      es: 'Visita un nuevo país hoy',
      en: 'Visit a new country today',
    }),
    emoji: '🗺️',
    baseRewards: { coins: 150 },
  },
  earn_coins: {
    title: { es: 'Cazador de Tesoros', en: 'Treasure Hunter' },
    description: (target) => ({
      es: `Gana ${target} monedas hoy`,
      en: `Earn ${target} coins today`,
    }),
    emoji: '💰',
    baseRewards: { coins: 50 },
  },
  use_powerup: {
    title: { es: 'Maestro de Power-Ups', en: 'Power-Up Master' },
    description: (target) => ({
      es: `Usa ${target} power-ups culturales`,
      en: `Use ${target} cultural power-ups`,
    }),
    emoji: '✨',
    baseRewards: { coins: 60 },
  },
  solve_detective: {
    title: { es: 'Detective del Día', en: 'Detective of the Day' },
    description: () => ({
      es: 'Resuelve un caso de detective',
      en: 'Solve a detective case',
    }),
    emoji: '🔍',
    baseRewards: { coins: 200 },
  },
  perfect_score: {
    title: { es: 'Perfeccionista', en: 'Perfectionist' },
    description: () => ({
      es: 'Consigue 3 estrellas en un nivel',
      en: 'Get 3 stars in a level',
    }),
    emoji: '🌟',
    baseRewards: { coins: 120 },
  },
  play_time: {
    title: { es: 'Viajero Dedicado', en: 'Dedicated Traveler' },
    description: (target) => ({
      es: `Juega por ${target} minutos hoy`,
      en: `Play for ${target} minutes today`,
    }),
    emoji: '⏰',
    baseRewards: { coins: 100 },
  },
};

// Estado de Daily Challenges
export interface DailyChallengesState {
  todaysChallenges: DailyChallenge[];
  lastRefreshDate: string; // YYYY-MM-DD
  completedToday: number;
  totalCompleted: number;

  // Racha de días consecutivos
  streak: {
    current: number;
    best: number;
    lastPlayedDate: string; // YYYY-MM-DD
  };

  // Historial de desafíos completados
  history: {
    date: string;
    challenges: string[]; // IDs de desafíos completados
  }[];
}

// Configuración de dificultad
export const DIFFICULTY_CONFIG: Record<string, {
  targetMultiplier: number;
  coinsMultiplier: number;
}> = {
  easy: {
    targetMultiplier: 1,
    coinsMultiplier: 1,
  },
  medium: {
    targetMultiplier: 1.5,
    coinsMultiplier: 1.5,
  },
  hard: {
    targetMultiplier: 2,
    coinsMultiplier: 2,
  },
};

// Recompensas por racha
export const STREAK_REWARDS: { days: number; bonus: number; badge?: string }[] = [
  { days: 3, bonus: 100 },
  { days: 7, bonus: 300, badge: '🔥' },
  { days: 14, bonus: 600, badge: '⚡' },
  { days: 30, bonus: 1500, badge: '👑' },
];

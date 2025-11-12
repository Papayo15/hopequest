/**
 * Achievement System
 * Definiciones de logros y sistema de progresión
 */

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type AchievementCategory =
  | 'exploration'
  | 'education'
  | 'social'
  | 'skill'
  | 'collection'
  | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string; // emoji or icon name
  requirement: AchievementRequirement;
  rewards: AchievementReward;
  hidden?: boolean; // Secret achievements
}

export interface AchievementRequirement {
  type:
    | 'countries_completed'
    | 'stars_earned'
    | 'portals_used'
    | 'activities_completed'
    | 'perfect_activities'
    | 'companions_met'
    | 'total_distance'
    | 'money_saved'
    | 'trivia_correct'
    | 'special_event';
  target: number;
  specificType?: string; // For specific portal types, activity types, etc.
}

export interface AchievementReward {
  coins: number;
  stars?: number;
  specialItem?: string;
  title?: string; // Unlockable player title
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: Date;
  progress: number; // 0-100
  claimed: boolean;
}

/**
 * All achievements in the game
 */
export const achievements: Achievement[] = [
  // ====== EXPLORATION ACHIEVEMENTS ======
  {
    id: 'first_steps',
    name: 'Primeros Pasos',
    description: 'Completa tu primer país',
    category: 'exploration',
    tier: 'bronze',
    icon: '👣',
    requirement: {
      type: 'countries_completed',
      target: 1,
    },
    rewards: {
      coins: 100,
    },
  },
  {
    id: 'continental_traveler',
    name: 'Viajero Continental',
    description: 'Completa 5 países',
    category: 'exploration',
    tier: 'silver',
    icon: '🌎',
    requirement: {
      type: 'countries_completed',
      target: 5,
    },
    rewards: {
      coins: 500,
      title: 'Viajero',
    },
  },
  {
    id: 'global_explorer',
    name: 'Explorador Global',
    description: 'Completa 15 países',
    category: 'exploration',
    tier: 'gold',
    icon: '🌍',
    requirement: {
      type: 'countries_completed',
      target: 15,
    },
    rewards: {
      coins: 1500,
      title: 'Explorador',
    },
  },
  {
    id: 'world_wanderer',
    name: 'Trotamundos',
    description: 'Completa todos los 35 países',
    category: 'exploration',
    tier: 'platinum',
    icon: '🌏',
    requirement: {
      type: 'countries_completed',
      target: 35,
    },
    rewards: {
      coins: 5000,
      stars: 10,
      title: 'Trotamundos',
      specialItem: 'golden_passport',
    },
  },

  // ====== EDUCATION ACHIEVEMENTS ======
  {
    id: 'star_student',
    name: 'Estudiante Estrella',
    description: 'Gana 50 estrellas',
    category: 'education',
    tier: 'bronze',
    icon: '⭐',
    requirement: {
      type: 'stars_earned',
      target: 50,
    },
    rewards: {
      coins: 300,
    },
  },
  {
    id: 'brilliant_mind',
    name: 'Mente Brillante',
    description: 'Gana 150 estrellas',
    category: 'education',
    tier: 'silver',
    icon: '🌟',
    requirement: {
      type: 'stars_earned',
      target: 150,
    },
    rewards: {
      coins: 800,
      title: 'Sabio',
    },
  },
  {
    id: 'genius',
    name: 'Genio',
    description: 'Gana 300 estrellas',
    category: 'education',
    tier: 'gold',
    icon: '✨',
    requirement: {
      type: 'stars_earned',
      target: 300,
    },
    rewards: {
      coins: 2000,
      title: 'Genio',
    },
  },
  {
    id: 'trivia_master',
    name: 'Maestro del Trivia',
    description: 'Responde 100 preguntas correctamente',
    category: 'education',
    tier: 'gold',
    icon: '🎓',
    requirement: {
      type: 'trivia_correct',
      target: 100,
    },
    rewards: {
      coins: 1000,
      title: 'Maestro del Trivia',
    },
  },
  {
    id: 'perfect_score',
    name: 'Puntuación Perfecta',
    description: 'Completa 10 actividades con puntuación perfecta',
    category: 'education',
    tier: 'gold',
    icon: '💯',
    requirement: {
      type: 'perfect_activities',
      target: 10,
    },
    rewards: {
      coins: 1500,
      title: 'Perfeccionista',
    },
  },

  // ====== SOCIAL ACHIEVEMENTS ======
  {
    id: 'make_a_friend',
    name: 'Hacer un Amigo',
    description: 'Conoce a tu primer compañero de viaje',
    category: 'social',
    tier: 'bronze',
    icon: '🤝',
    requirement: {
      type: 'companions_met',
      target: 1,
    },
    rewards: {
      coins: 200,
    },
  },
  {
    id: 'family_reunion',
    name: 'Reunión Familiar',
    description: 'Conoce a todos tus compañeros de viaje',
    category: 'social',
    tier: 'silver',
    icon: '👨‍👩‍👧',
    requirement: {
      type: 'companions_met',
      target: 3, // Companion + Isabella + Xolo
    },
    rewards: {
      coins: 1000,
      title: 'Líder del Grupo',
    },
  },

  // ====== SKILL ACHIEVEMENTS ======
  {
    id: 'portal_novice',
    name: 'Novato del Portal',
    description: 'Usa 5 portales diferentes',
    category: 'skill',
    tier: 'bronze',
    icon: '🚪',
    requirement: {
      type: 'portals_used',
      target: 5,
    },
    rewards: {
      coins: 250,
    },
  },
  {
    id: 'portal_expert',
    name: 'Experto del Portal',
    description: 'Usa 20 portales',
    category: 'skill',
    tier: 'silver',
    icon: '🌀',
    requirement: {
      type: 'portals_used',
      target: 20,
    },
    rewards: {
      coins: 800,
      title: 'Experto en Portales',
    },
  },
  {
    id: 'activity_enthusiast',
    name: 'Entusiasta de Actividades',
    description: 'Completa 30 actividades',
    category: 'skill',
    tier: 'silver',
    icon: '🎮',
    requirement: {
      type: 'activities_completed',
      target: 30,
    },
    rewards: {
      coins: 700,
    },
  },
  {
    id: 'activity_master',
    name: 'Maestro de Actividades',
    description: 'Completa 100 actividades',
    category: 'skill',
    tier: 'gold',
    icon: '🏆',
    requirement: {
      type: 'activities_completed',
      target: 100,
    },
    rewards: {
      coins: 2000,
      title: 'Maestro de Actividades',
    },
  },

  // ====== COLLECTION ACHIEVEMENTS ======
  {
    id: 'money_saver',
    name: 'Ahorrador',
    description: 'Ahorra 5000 monedas',
    category: 'collection',
    tier: 'silver',
    icon: '💰',
    requirement: {
      type: 'money_saved',
      target: 5000,
    },
    rewards: {
      coins: 500,
      title: 'Ahorrador',
    },
  },
  {
    id: 'wealthy_traveler',
    name: 'Viajero Adinerado',
    description: 'Ahorra 15000 monedas',
    category: 'collection',
    tier: 'gold',
    icon: '💎',
    requirement: {
      type: 'money_saved',
      target: 15000,
    },
    rewards: {
      coins: 2000,
      title: 'Magnate',
    },
  },

  // ====== SPECIAL ACHIEVEMENTS (Hidden) ======
  {
    id: 'lucky_traveler',
    name: 'Viajero Afortunado',
    description: 'Completa un portal con resultado "Éxito" cuando las probabilidades eran bajas',
    category: 'special',
    tier: 'gold',
    icon: '🍀',
    requirement: {
      type: 'special_event',
      target: 1,
    },
    rewards: {
      coins: 1000,
      title: 'Afortunado',
    },
    hidden: true,
  },
  {
    id: 'resilient_spirit',
    name: 'Espíritu Resiliente',
    description: 'Completa un país después de 3 intentos fallidos',
    category: 'special',
    tier: 'gold',
    icon: '💪',
    requirement: {
      type: 'special_event',
      target: 1,
    },
    rewards: {
      coins: 1200,
      title: 'Resiliente',
    },
    hidden: true,
  },
  {
    id: 'speed_runner',
    name: 'Corredor Veloz',
    description: 'Completa un país en menos de 10 minutos',
    category: 'special',
    tier: 'platinum',
    icon: '⚡',
    requirement: {
      type: 'special_event',
      target: 1,
    },
    rewards: {
      coins: 3000,
      title: 'Velocista',
      specialItem: 'speed_boots',
    },
    hidden: true,
  },
  {
    id: 'xolo_best_friend',
    name: 'Mejor Amigo de Xolo',
    description: 'Interactúa con Xolo 50 veces',
    category: 'special',
    tier: 'silver',
    icon: '🐕',
    requirement: {
      type: 'special_event',
      target: 50,
    },
    rewards: {
      coins: 800,
      title: 'Amigo de Xolo',
      specialItem: 'xolo_collar',
    },
    hidden: true,
  },
];

/**
 * Achievement tier colors
 */
export const achievementTierColors: Record<AchievementTier, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
};

/**
 * Achievement tier order (for sorting)
 */
export const achievementTierOrder: Record<AchievementTier, number> = {
  bronze: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
};

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return achievements.filter((a) => a.category === category);
}

/**
 * Get achievements by tier
 */
export function getAchievementsByTier(tier: AchievementTier): Achievement[] {
  return achievements.filter((a) => a.tier === tier);
}

/**
 * Get total possible coins from all achievements
 */
export function getTotalAchievementCoins(): number {
  return achievements.reduce((sum, achievement) => sum + achievement.rewards.coins, 0);
}

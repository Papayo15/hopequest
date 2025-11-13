/**
 * Travel Journal Types
 * Diario de viaje/scrapbook para registrar la aventura
 * Los niños coleccionan recuerdos, fotos y aprendizajes
 */

export interface JournalEntry {
  id: string;
  countryId: string;
  countryName: string;
  countryFlag: string;
  visitDate: Date;
  completed: boolean;

  // Recuerdos coleccionados
  memories: Memory[];

  // Estadísticas del país
  stats: {
    levelsCompleted: number;
    starsEarned: number;
    timeSpent: number; // Minutos
    factsLearned: number;
  };

  // Favorito del niño
  isFavorite: boolean;
  notes?: string; // Notas personales del niño
}

export interface Memory {
  id: string;
  type: 'photo' | 'fact' | 'achievement' | 'friend' | 'food' | 'tradition';
  title: LocalizedString;
  description: LocalizedString;
  emoji: string;
  dateCollected: Date;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface LocalizedString {
  es: string;
  en: string;
}

// Recuerdos predefinidos por país
export const COUNTRY_MEMORIES: Record<string, Memory[]> = {
  mexico: [
    {
      id: 'memory_mexico_tacos',
      type: 'food',
      title: { es: 'Tacos Auténticos', en: 'Authentic Tacos' },
      description: {
        es: 'Los tacos son parte esencial de la cultura mexicana. ¡Cada región tiene su propia variedad!',
        en: 'Tacos are an essential part of Mexican culture. Each region has its own variety!',
      },
      emoji: '🌮',
      dateCollected: new Date(),
      rarity: 'common',
    },
    {
      id: 'memory_mexico_pyramids',
      type: 'fact',
      title: { es: 'Pirámides Aztecas', en: 'Aztec Pyramids' },
      description: {
        es: 'Las pirámides aztecas como Teotihuacán tienen más de 2000 años de antigüedad.',
        en: 'Aztec pyramids like Teotihuacan are over 2000 years old.',
      },
      emoji: '🏛️',
      dateCollected: new Date(),
      rarity: 'rare',
    },
    {
      id: 'memory_mexico_xolo',
      type: 'friend',
      title: { es: 'Conocí a Xolo', en: 'I met Xolo' },
      description: {
        es: '¡Hice amistad con Xolo, el ajolote mexicano! Es mi guía en esta aventura.',
        en: 'I made friends with Xolo, the Mexican axolotl! He is my guide on this adventure.',
      },
      emoji: '🦎',
      dateCollected: new Date(),
      rarity: 'legendary',
    },
  ],

  spain: [
    {
      id: 'memory_spain_flamenco',
      type: 'tradition',
      title: { es: 'Baile Flamenco', en: 'Flamenco Dance' },
      description: {
        es: 'El flamenco es un arte que combina canto, guitarra y baile apasionado.',
        en: 'Flamenco is an art that combines singing, guitar and passionate dance.',
      },
      emoji: '💃',
      dateCollected: new Date(),
      rarity: 'rare',
    },
    {
      id: 'memory_spain_paella',
      type: 'food',
      title: { es: 'Paella Valenciana', en: 'Valencian Paella' },
      description: {
        es: 'La paella es un plato tradicional de arroz con mariscos o pollo.',
        en: 'Paella is a traditional rice dish with seafood or chicken.',
      },
      emoji: '🥘',
      dateCollected: new Date(),
      rarity: 'common',
    },
  ],

  brazil: [
    {
      id: 'memory_brazil_carnival',
      type: 'tradition',
      title: { es: 'Carnaval de Río', en: 'Rio Carnival' },
      description: {
        es: 'El carnaval de Río es una de las fiestas más grandes y coloridas del mundo.',
        en: 'The Rio carnival is one of the largest and most colorful festivals in the world.',
      },
      emoji: '🎉',
      dateCollected: new Date(),
      rarity: 'legendary',
    },
    {
      id: 'memory_brazil_amazon',
      type: 'fact',
      title: { es: 'Selva Amazónica', en: 'Amazon Rainforest' },
      description: {
        es: 'La Amazonía es el pulmón del planeta y hogar de miles de especies.',
        en: 'The Amazon is the lungs of the planet and home to thousands of species.',
      },
      emoji: '🌳',
      dateCollected: new Date(),
      rarity: 'rare',
    },
  ],
};

// Estado del Travel Journal
export interface TravelJournalState {
  entries: Record<string, JournalEntry>; // countryId -> JournalEntry
  totalCountriesVisited: number;
  totalMemoriesCollected: number;
  totalFactsLearned: number;
  totalTimeSpent: number; // Minutos totales
  favoriteCountry: string | null;

  // Estadísticas globales
  globalStats: {
    mostVisitedCountry: string;
    fastestCompletion: string; // Country ID
    highestScore: string; // Country ID
    rareMemoriesCount: number;
    legendaryMemoriesCount: number;
  };
}

// Badges/Insignias de viajero
export interface TravelerBadge {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  emoji: string;
  requirement: {
    type: 'countries' | 'memories' | 'facts' | 'time' | 'special';
    value: number;
  };
  unlocked: boolean;
}

export const TRAVELER_BADGES: TravelerBadge[] = [
  {
    id: 'badge_first_trip',
    name: { es: 'Primer Viaje', en: 'First Trip' },
    description: { es: 'Visitaste tu primer país', en: 'Visited your first country' },
    emoji: '🎒',
    requirement: { type: 'countries', value: 1 },
    unlocked: false,
  },
  {
    id: 'badge_explorer',
    name: { es: 'Explorador', en: 'Explorer' },
    description: { es: 'Visitaste 5 países', en: 'Visited 5 countries' },
    emoji: '🗺️',
    requirement: { type: 'countries', value: 5 },
    unlocked: false,
  },
  {
    id: 'badge_world_traveler',
    name: { es: 'Viajero Mundial', en: 'World Traveler' },
    description: { es: 'Visitaste 10 países', en: 'Visited 10 countries' },
    emoji: '🌍',
    requirement: { type: 'countries', value: 10 },
    unlocked: false,
  },
  {
    id: 'badge_collector',
    name: { es: 'Coleccionista', en: 'Collector' },
    description: { es: 'Coleccionaste 20 recuerdos', en: 'Collected 20 memories' },
    emoji: '📸',
    requirement: { type: 'memories', value: 20 },
    unlocked: false,
  },
  {
    id: 'badge_scholar',
    name: { es: 'Erudito', en: 'Scholar' },
    description: { es: 'Aprendiste 50 datos culturales', en: 'Learned 50 cultural facts' },
    emoji: '📚',
    requirement: { type: 'facts', value: 50 },
    unlocked: false,
  },
  {
    id: 'badge_legend',
    name: { es: 'Leyenda Viajera', en: 'Traveler Legend' },
    description: {
      es: 'Coleccionaste un recuerdo legendario',
      en: 'Collected a legendary memory',
    },
    emoji: '⭐',
    requirement: { type: 'special', value: 1 },
    unlocked: false,
  },
];

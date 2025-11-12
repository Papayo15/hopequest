/**
 * Reino Unido - País 30
 */

import { Country } from './types';

export const reinounido: Country = {
  id: 'reinounido',
  name: 'Reino Unido',
  region: 'Europe',
  flag: '🇬🇧',
  coordinates: { latitude: 55.3781, longitude: -3.436 },

  description: 'Ex imperio global. Historia de inmigración de excolonias (India, Caribe, África).',

  culturalFacts: [
    'Londres, ciudad multicultural',
    'Idioma inglés, lingua franca mundial',
    'Monarquía parlamentaria',
    'Beatles y cultura pop británica',
  ],

  migrationContext: {
    reasons: [
      'Conexión con excolonias (Commonwealth)',
      'Idioma inglés',
      'Oportunidades laborales',
      'Brexit cambió las reglas migratorias',
    ],
    challenges: [
      'Brexit y restricciones post-2020',
      'Costo de vida muy elevado',
      'Racismo y xenofobia',
      'Windrush scandal',
    ],
    destinations: ['Australia', 'Canadá', 'España', 'Francia'],
    statistics: {
      emigrants: '5.5 millones de británicos en el exterior',
      immigrants: '9 millones de inmigrantes en Reino Unido',
      topOrigin: 'India, Polonia, Pakistán',
    },
  },

  activities: [
    {
      id: 'reinounido_trivia',
      type: 'trivia',
      title: 'Reino Unido',
      description: 'Descubre el Reino Unido',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué evento cambió la migración al Reino Unido en 2020?',
          options: ['COVID-19', 'Brexit', 'Elecciones', 'Olimpiadas'],
          correctAnswer: 1,
          explanation: 'Brexit cambió significativamente las reglas migratorias del Reino Unido.',
          difficulty: 'medium',
        },
        {
          question: '¿De dónde proviene la mayor comunidad de inmigrantes?',
          options: ['Polonia', 'India', 'Nigeria', 'Jamaica'],
          correctAnswer: 1,
          explanation: 'India es el país con más inmigrantes en el Reino Unido.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué banda británica es la más famosa de la historia?',
          options: ['The Rolling Stones', 'The Beatles', 'Queen', 'Led Zeppelin'],
          correctAnswer: 1,
          explanation: 'The Beatles son la banda más influyente de la historia.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos inmigrantes viven en el Reino Unido?',
          options: ['3 millones', '6 millones', '9 millones', '12 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 9 millones de inmigrantes viven en el Reino Unido.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 270,
        experience: 160,
      },
    },
    {
      id: 'reinounido_puzzle',
      type: 'puzzle',
      title: 'Big Ben',
      description: 'Arma el reloj de Londres',
      difficulty: 'medium',
      imageUrl: 'big_ben.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 200,
        experience: 120,
      },
    },
    {
      id: 'reinounido_memory',
      type: 'memory',
      title: 'Cultura Británica',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '☕' },
        { id: 2, content: '🏰' },
        { id: 3, content: '🎸' },
        { id: 4, content: '⚽' },
        { id: 5, content: '👑' },
        { id: 6, content: '🚌' },
      ],
      rewards: {
        stars: 2,
        money: 170,
        experience: 110,
      },
    },
  ],

  requiredStats: {
    minMoney: 1200,
    minHealth: 90,
    minMoral: 85,
    requiredDocuments: ['passport', 'visa', 'work_permit'],
  },

  availablePortals: ['aereo', 'maritimo'],

  unlockConditions: {
    previousCountries: ['francia'],
    minStars: 74,
  },
};

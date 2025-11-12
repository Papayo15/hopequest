/**
 * Jamaica - País 15
 */

import { Country } from './types';

export const jamaica: Country = {
  id: 'jamaica',
  name: 'Jamaica',
  region: 'Caribbean',
  flag: '🇯🇲',
  coordinates: { latitude: 18.1096, longitude: -77.2975 },

  description: 'Isla caribeña famosa por su música, cultura y atletas. Emigración histórica al Reino Unido y América del Norte.',

  culturalFacts: [
    'Cuna del reggae y Bob Marley',
    'Potencia olímpica en atletismo (Usain Bolt)',
    'Idioma: Inglés y patois jamaicano',
    'Filosofía rastafari',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de oportunidades educativas',
      'Economía dependiente del turismo',
      'Violencia y crimen organizado',
      'Conexiones históricas con Reino Unido y Canadá',
    ],
    challenges: [
      'Discriminación racial en países angloparlantes',
      'Estereotipos culturales',
      'Deportaciones desde Reino Unido (Windrush scandal)',
      'Pérdida de "cerebros" (brain drain)',
    ],
    destinations: ['Estados Unidos', 'Reino Unido', 'Canadá', 'Islas Caimán'],
    statistics: {
      emigrants: '1.3 millones de jamaicanos en el exterior',
      remittances: '$3 mil millones USD (16% del PIB)',
      topDestination: 'Estados Unidos (50% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'jamaica_trivia',
      type: 'trivia',
      title: 'Isla del Reggae',
      description: 'Conoce Jamaica',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué género musical nació en Jamaica?',
          options: ['Calypso', 'Reggae', 'Soca', 'Salsa'],
          correctAnswer: 1,
          explanation: 'El reggae nació en Jamaica en los años 60, con Bob Marley como máximo exponente.',
          difficulty: 'easy',
        },
        {
          question: '¿Quién es el velocista más rápido del mundo?',
          options: ['Carl Lewis', 'Usain Bolt', 'Michael Johnson', 'Jesse Owens'],
          correctAnswer: 1,
          explanation: 'Usain Bolt, jamaicano, es el hombre más rápido del mundo con récord de 9.58s.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes jamaicanos?',
          options: ['Canadá', 'Reino Unido', 'Estados Unidos', 'Francia'],
          correctAnswer: 2,
          explanation: 'Estados Unidos recibe el 50% de los emigrantes jamaicanos.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué idioma hablan los jamaicanos además del inglés?',
          options: ['Español', 'Francés', 'Patois', 'Criollo'],
          correctAnswer: 2,
          explanation: 'El patois jamaicano es un criollo basado en inglés hablado en la isla.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 160,
        experience: 110,
      },
    },
    {
      id: 'jamaica_puzzle',
      type: 'puzzle',
      title: 'Montego Bay',
      description: 'Arma la bahía jamaicana',
      difficulty: 'medium',
      imageUrl: 'montego_bay.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
    {
      id: 'jamaica_memory',
      type: 'memory',
      title: 'Cultura Jamaicana',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' },
        { id: 2, content: '🏃' },
        { id: 3, content: '🏝️' },
        { id: 4, content: '🌴' },
        { id: 5, content: '☀️' },
        { id: 6, content: '🥥' },
      ],
      rewards: {
        stars: 2,
        money: 90,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 450,
    minHealth: 70,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'maritimo'],

  unlockConditions: {
    previousCountries: ['republicadominicana'],
    minStars: 32,
  },
};

/**
 * Cuba - País 12
 */

import { Country } from './types';

export const cuba: Country = {
  id: 'cuba',
  name: 'Cuba',
  region: 'Caribbean',
  flag: '🇨🇺',
  coordinates: { latitude: 21.5218, longitude: -77.7812 },

  description: 'Isla caribeña con historia revolucionaria. Migraciones constantes hacia Estados Unidos desde 1959.',

  culturalFacts: [
    'Cuna del son, la salsa y el mambo',
    'La Habana Vieja es Patrimonio de la Humanidad',
    'Inventores del mojito y el daiquiri',
    'Sistema de salud y educación gratuitos',
  ],

  migrationContext: {
    reasons: [
      'Sistema político de partido único',
      'Restricciones de libertades civiles',
      'Crisis económica crónica',
      'Búsqueda de oportunidades',
    ],
    challenges: [
      'Balseros (migración por mar)',
      'Política de pies secos/pies mojados (hasta 2017)',
      'Separación familiar por décadas',
      'Restricciones para regresar',
    ],
    destinations: ['Estados Unidos (Florida)', 'España', 'México', 'Canadá'],
    statistics: {
      emigrants: '2 millones de cubanos en el exterior',
      remittances: '$3.7 mil millones USD anuales',
      topDestination: 'Estados Unidos (70% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'cuba_trivia',
      type: 'trivia',
      title: 'Cuba y su Historia',
      description: 'Aprende sobre Cuba',
      difficulty: 'hard',
      questions: [
        {
          question: '¿En qué año fue la Revolución Cubana?',
          options: ['1950', '1959', '1962', '1970'],
          correctAnswer: 1,
          explanation: 'La Revolución Cubana triunfó en 1959, liderada por Fidel Castro.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué género musical se originó en Cuba?',
          options: ['Reggae', 'Salsa', 'Tango', 'Samba'],
          correctAnswer: 1,
          explanation: 'La salsa tiene sus raíces en el son cubano y otros ritmos de la isla.',
          difficulty: 'easy',
        },
        {
          question: '¿Dónde vive la mayoría de cubanos en Estados Unidos?',
          options: ['Nueva York', 'California', 'Florida', 'Texas'],
          correctAnswer: 2,
          explanation: 'Florida, especialmente Miami, tiene la mayor población cubana en EE.UU.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué son los "balseros"?',
          options: ['Pescadores', 'Bailarines', 'Migrantes que cruzan en balsas', 'Músicos'],
          correctAnswer: 2,
          explanation: 'Los balseros son cubanos que intentan llegar a EE.UU. en balsas improvisadas.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 120,
      },
    },
    {
      id: 'cuba_puzzle',
      type: 'puzzle',
      title: 'La Habana Vieja',
      description: 'Arma la histórica Habana',
      difficulty: 'hard',
      imageUrl: 'havana_old.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'cuba_memory',
      type: 'memory',
      title: 'Cultura Cubana',
      description: 'Encuentra parejas cubanas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🎺' },
        { id: 2, content: '🍹' },
        { id: 3, content: '🚗' },
        { id: 4, content: '🎭' },
        { id: 5, content: '⚾' },
        { id: 6, content: '🏛️' },
        { id: 7, content: '🎵' },
      ],
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
  ],

  requiredStats: {
    minMoney: 500,
    minHealth: 60,
    minMoral: 50,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['maritimo', 'aereo', 'clandestino'],

  unlockConditions: {
    previousCountries: ['panama'],
    minStars: 23,
  },
};

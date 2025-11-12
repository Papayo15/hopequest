/**
 * Italia - País 28
 */

import { Country } from './types';

export const italia: Country = {
  id: 'italia',
  name: 'Italia',
  region: 'Europe',
  flag: '🇮🇹',
  coordinates: { latitude: 41.8719, longitude: 12.5674 },

  description: 'Cuna del Renacimiento y el Imperio Romano. Destino de latinoamericanos y africanos.',

  culturalFacts: [
    'Coliseo Romano y Vaticano',
    'Pizza y pasta mundialmente famosas',
    'Renacimiento italiano (Leonardo, Miguel Ángel)',
    'Moda y diseño italiano',
  ],

  migrationContext: {
    reasons: [
      'Conexión familiar italiana (descendientes)',
      'Economía del sur de Europa',
      'Puerta de entrada desde África',
      'Ciudadanía italiana para descendientes',
    ],
    challenges: [
      'Xenofobia y racismo crecientes',
      'Llegadas por mar desde África',
      'Políticas migratorias restrictivas',
      'Desempleo juvenil alto',
    ],
    destinations: ['Suiza', 'Alemania', 'Francia', 'Reino Unido'],
    statistics: {
      emigrants: '5.5 millones de italianos en el exterior',
      immigrants: '5 millones de inmigrantes en Italia',
      topOrigin: 'Rumania, Albania, Marruecos',
    },
  },

  activities: [
    {
      id: 'italia_trivia',
      type: 'trivia',
      title: 'La Bella Italia',
      description: 'Descubre Italia',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué movimiento artístico nació en Italia?',
          options: ['Barroco', 'Renacimiento', 'Impresionismo', 'Surrealismo'],
          correctAnswer: 1,
          explanation: 'El Renacimiento nació en Italia en el siglo XIV.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos italianos viven en el exterior?',
          options: ['2 millones', '5.5 millones', '10 millones', '15 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 5.5 millones de italianos viven fuera de Italia.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué país tiene más inmigrantes en Italia?',
          options: ['Marruecos', 'Rumania', 'China', 'India'],
          correctAnswer: 1,
          explanation: 'Rumania es el país con más inmigrantes en Italia.',
          difficulty: 'hard',
        },
        {
          question: '¿Dónde está el Vaticano?',
          options: ['Florencia', 'Roma', 'Venecia', 'Milán'],
          correctAnswer: 1,
          explanation: 'El Vaticano es un estado independiente dentro de Roma.',
          difficulty: 'easy',
        },
      ],
      rewards: {
        stars: 3,
        money: 210,
        experience: 135,
      },
    },
    {
      id: 'italia_puzzle',
      type: 'puzzle',
      title: 'Coliseo Romano',
      description: 'Arma el anfiteatro antiguo',
      difficulty: 'hard',
      imageUrl: 'colosseum.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 170,
        experience: 115,
      },
    },
    {
      id: 'italia_memory',
      type: 'memory',
      title: 'Cultura Italiana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🍕' },
        { id: 2, content: '🍝' },
        { id: 3, content: '🏛️' },
        { id: 4, content: '🎨' },
        { id: 5, content: '🍷' },
        { id: 6, content: '⚽' },
      ],
      rewards: {
        stars: 2,
        money: 140,
        experience: 95,
      },
    },
  ],

  requiredStats: {
    minMoney: 850,
    minHealth: 80,
    minMoral: 75,
    requiredDocuments: ['passport', 'visa', 'work_permit'],
  },

  availablePortals: ['aereo', 'maritimo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['francia'],
    minStars: 68,
  },
};

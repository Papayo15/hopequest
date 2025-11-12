/**
 * Argentina - País 20
 */

import { Country } from './types';

export const argentina: Country = {
  id: 'argentina',
  name: 'Argentina',
  region: 'South America',
  flag: '🇦🇷',
  coordinates: { latitude: -38.4161, longitude: -63.6167 },

  description: 'Segundo país más grande de Sudamérica. Historia de inmigración europea y destino regional.',

  culturalFacts: [
    'Cuna del tango y Maradona',
    'Patagonia y glaciares imponentes',
    'Buenos Aires, la "París de Sudamérica"',
    'Asado y vino Malbec',
  ],

  migrationContext: {
    reasons: [
      'Crisis económicas recurrentes',
      'Inflación crónica',
      'Búsqueda de estabilidad',
      'Fuga de cerebros',
    ],
    challenges: [
      'Deterioro económico',
      'Recibe migrantes de países vecinos',
      'Xenofobia hacia bolivianos, paraguayos',
      'Pobreza creciente',
    ],
    destinations: ['España', 'Italia', 'Estados Unidos', 'Uruguay', 'Chile'],
    statistics: {
      emigrants: '1 millón de argentinos en el exterior',
      immigrants: '2 millones de inmigrantes en Argentina',
      topDestination: 'España (principal destino)',
    },
  },

  activities: [
    {
      id: 'argentina_trivia',
      type: 'trivia',
      title: 'Tierra del Tango',
      description: 'Descubre Argentina',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué baile se originó en Argentina?',
          options: ['Salsa', 'Tango', 'Samba', 'Cumbia'],
          correctAnswer: 1,
          explanation: 'El tango nació en Buenos Aires a fines del siglo XIX.',
          difficulty: 'easy',
        },
        {
          question: '¿Cómo se llama la región al sur de Argentina?',
          options: ['Pampas', 'Patagonia', 'Amazonía', 'Atacama'],
          correctAnswer: 1,
          explanation: 'La Patagonia es la región sur de Argentina, conocida por su belleza natural.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes argentinos?',
          options: ['Estados Unidos', 'Brasil', 'España', 'Chile'],
          correctAnswer: 2,
          explanation: 'España es el principal destino por conexiones históricas e idioma.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué vino es famoso en Argentina?',
          options: ['Cabernet', 'Malbec', 'Merlot', 'Chardonnay'],
          correctAnswer: 1,
          explanation: 'El Malbec es el vino emblemático de Argentina.',
          difficulty: 'easy',
        },
      ],
      rewards: {
        stars: 3,
        money: 160,
        experience: 110,
      },
    },
    {
      id: 'argentina_puzzle',
      type: 'puzzle',
      title: 'Buenos Aires',
      description: 'Arma la capital porteña',
      difficulty: 'medium',
      imageUrl: 'buenos_aires.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 120,
        experience: 90,
      },
    },
    {
      id: 'argentina_memory',
      type: 'memory',
      title: 'Cultura Argentina',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '💃' },
        { id: 2, content: '⚽' },
        { id: 3, content: '🥩' },
        { id: 4, content: '🍷' },
        { id: 5, content: '🏔️' },
        { id: 6, content: '🌃' },
      ],
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
  ],

  requiredStats: {
    minMoney: 480,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['chile'],
    minStars: 47,
  },
};

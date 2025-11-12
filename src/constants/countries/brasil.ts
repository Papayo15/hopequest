/**
 * Brasil - País 21
 */

import { Country } from './types';

export const brasil: Country = {
  id: 'brasil',
  name: 'Brasil',
  region: 'South America',
  flag: '🇧🇷',
  coordinates: { latitude: -14.235, longitude: -51.9253 },

  description: 'País más grande de Sudamérica. Idioma portugués. Destino y origen de migrantes.',

  culturalFacts: [
    'Amazonia: pulmón del mundo',
    'Carnaval de Río, el más famoso',
    'Fútbol y Pelé/Neymar',
    'Samba y bossa nova',
  ],

  migrationContext: {
    reasons: [
      'Desigualdad económica severa',
      'Violencia urbana',
      'Búsqueda de oportunidades',
      'Crisis política y corrupción',
    ],
    challenges: [
      'Xenofobia hacia venezolanos y bolivianos',
      'Economía inestable',
      'Inmigración ilegal',
      'Barreras de idioma (portugués)',
    ],
    destinations: ['Estados Unidos', 'Japón', 'Portugal', 'España', 'Reino Unido'],
    statistics: {
      emigrants: '4 millones de brasileños en el exterior',
      immigrants: '1.3 millones de inmigrantes en Brasil',
      topDestination: 'Estados Unidos (principal destino)',
    },
  },

  activities: [
    {
      id: 'brasil_trivia',
      type: 'trivia',
      title: 'Gigante de Sudamérica',
      description: 'Conoce Brasil',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué idioma se habla en Brasil?',
          options: ['Español', 'Portugués', 'Inglés', 'Francés'],
          correctAnswer: 1,
          explanation: 'Brasil es el único país de Sudamérica que habla portugués.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué selva importante está en Brasil?',
          options: ['Congo', 'Amazonía', 'Taiga', 'Borneo'],
          correctAnswer: 1,
          explanation: 'La Amazonía brasileña es la selva tropical más grande del mundo.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos brasileños viven en el exterior?',
          options: ['1 millón', '2 millones', '4 millones', '8 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 4 millones de brasileños viven fuera del país.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué música se originó en Brasil?',
          options: ['Tango', 'Salsa', 'Samba', 'Merengue'],
          correctAnswer: 2,
          explanation: 'La samba es el género musical más icónico de Brasil.',
          difficulty: 'easy',
        },
      ],
      rewards: {
        stars: 3,
        money: 180,
        experience: 120,
      },
    },
    {
      id: 'brasil_puzzle',
      type: 'puzzle',
      title: 'Cristo Redentor',
      description: 'Arma el ícono de Río',
      difficulty: 'medium',
      imageUrl: 'cristo_redentor.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 130,
        experience: 95,
      },
    },
    {
      id: 'brasil_memory',
      type: 'memory',
      title: 'Cultura Brasileña',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '⚽' },
        { id: 2, content: '🎭' },
        { id: 3, content: '🎵' },
        { id: 4, content: '🌴' },
        { id: 5, content: '🏖️' },
        { id: 6, content: '🦜' },
      ],
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
  ],

  requiredStats: {
    minMoney: 520,
    minHealth: 75,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['argentina'],
    minStars: 50,
  },
};

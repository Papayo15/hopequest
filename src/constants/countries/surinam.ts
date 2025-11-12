/**
 * Surinam - País 25
 */

import { Country } from './types';

export const surinam: Country = {
  id: 'surinam',
  name: 'Surinam',
  region: 'South America',
  flag: '🇸🇷',
  coordinates: { latitude: 3.9193, longitude: -56.0278 },

  description: 'Pequeño país multicultural en la costa norte de Sudamérica. Idioma oficial: neerlandés.',

  culturalFacts: [
    'Ex colonia holandesa, idioma oficial: neerlandés',
    'Sociedad muy multicultural',
    'Mezcla de culturas: india, africana, javanesa, china',
    'Selva amazónica cubre 80% del territorio',
  ],

  migrationContext: {
    reasons: [
      'Economía pequeña y limitada',
      'Conexión histórica con Países Bajos',
      'Búsqueda de oportunidades',
      'Educación superior',
    ],
    challenges: [
      'Barrera de idioma (neerlandés)',
      'Población pequeña (600 mil)',
      'Dependencia de recursos naturales',
      'Integración en Países Bajos',
    ],
    destinations: ['Países Bajos', 'Francia Guayana', 'Brasil', 'Estados Unidos'],
    statistics: {
      emigrants: '350 mil surinameses en el exterior',
      remittances: '$150 millones USD',
      topDestination: 'Países Bajos (60% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'surinam_trivia',
      type: 'trivia',
      title: 'Surinam Multicultural',
      description: 'Descubre Surinam',
      difficulty: 'hard',
      questions: [
        {
          question: '¿Qué idioma se habla en Surinam?',
          options: ['Español', 'Inglés', 'Portugués', 'Neerlandés'],
          correctAnswer: 3,
          explanation: 'Surinam es el único país de Sudamérica donde se habla neerlandés.',
          difficulty: 'medium',
        },
        {
          question: '¿De qué país fue colonia Surinam?',
          options: ['España', 'Portugal', 'Países Bajos', 'Francia'],
          correctAnswer: 2,
          explanation: 'Surinam fue colonia holandesa hasta 1975.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje del territorio es selva?',
          options: ['50%', '60%', '80%', '90%'],
          correctAnswer: 2,
          explanation: 'El 80% de Surinam está cubierto por selva amazónica.',
          difficulty: 'hard',
        },
        {
          question: '¿Dónde migran principalmente los surinameses?',
          options: ['Brasil', 'Venezuela', 'Países Bajos', 'Francia'],
          correctAnswer: 2,
          explanation: 'El 60% de los emigrantes van a Países Bajos por la conexión histórica.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 160,
        experience: 130,
      },
    },
    {
      id: 'surinam_puzzle',
      type: 'puzzle',
      title: 'Paramaribo',
      description: 'Arma la capital caribeña',
      difficulty: 'medium',
      imageUrl: 'paramaribo.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 110,
        experience: 90,
      },
    },
    {
      id: 'surinam_memory',
      type: 'memory',
      title: 'Diversidad Surinamesa',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🌴' },
        { id: 2, content: '🏛️' },
        { id: 3, content: '🎭' },
        { id: 4, content: '🌊' },
        { id: 5, content: '🦜' },
        { id: 6, content: '🍃' },
      ],
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
  ],

  requiredStats: {
    minMoney: 450,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'maritimo'],

  unlockConditions: {
    previousCountries: ['brasil'],
    minStars: 59,
  },
};

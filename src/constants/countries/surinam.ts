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
          explanation: 'Surinam es el único país de Sudamérica donde se habla neerlandés, herencia de la colonización holandesa.',
          difficulty: 'easy',
        },
        {
          question: '¿De qué país fue colonia Surinam?',
          options: ['España', 'Portugal', 'Países Bajos', 'Francia'],
          correctAnswer: 2,
          explanation: 'Surinam fue colonia holandesa hasta 1975, cuando obtuvo su independencia.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué porcentaje del territorio es selva?',
          options: ['50%', '60%', '80%', '90%'],
          correctAnswer: 2,
          explanation: 'El 80% de Surinam está cubierto por selva amazónica, una de las zonas más biodiversas del mundo.',
          difficulty: 'hard',
        },
        {
          question: '¿Dónde migran principalmente los surinameses?',
          options: ['Brasil', 'Venezuela', 'Países Bajos', 'Francia'],
          correctAnswer: 2,
          explanation: 'El 60% de los emigrantes van a Países Bajos por la conexión histórica y el idioma compartido.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántas personas viven en Surinam?',
          options: ['300 mil', '600 mil', '1 millón', '2 millones'],
          correctAnswer: 1,
          explanation: 'Surinam tiene aproximadamente 600 mil habitantes, siendo uno de los países menos poblados de Sudamérica.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos surinameses viven en el exterior?',
          options: ['100 mil', '350 mil', '600 mil', '1 millón'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 350 mil surinameses viven en el exterior, principalmente en Países Bajos.',
          difficulty: 'hard',
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
      maxPairs: 16,
      pairs: [
        { id: 1, content: '🌴' },
        { id: 2, content: '🏛️' },
        { id: 3, content: '🎭' },
        { id: 4, content: '🌊' },
        { id: 5, content: '🦜' },
        { id: 6, content: '🍃' },
        { id: 7, content: '🏝️' },
        { id: 8, content: '🕌' },
        { id: 9, content: '⛪' },
        { id: 10, content: '🎨' },
        { id: 11, content: '🛶' },
        { id: 12, content: '🌺' },
        { id: 13, content: '🐒' },
        { id: 14, content: '🌿' },
        { id: 15, content: '🏞️' },
        { id: 16, content: '🎪' },
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

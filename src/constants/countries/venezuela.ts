/**
 * Venezuela - País 1 (ORIGEN)
 */

import { Country } from './types';

export const venezuela: Country = {
  id: 'venezuela',
  name: 'Venezuela',
  region: 'South America',
  flag: '🇻🇪',
  coordinates: { latitude: 6.4238, longitude: -66.5897 },

  description: 'País de origen. Crisis humanitaria genera la mayor migración de la historia latinoamericana.',

  culturalFacts: [
    'Salto Ángel, la cascada más alta del mundo',
    'Petróleo: mayores reservas del mundo',
    'Arepas, plato nacional',
    'Miss Universo: 7 coronas',
  ],

  migrationContext: {
    reasons: [
      'Crisis económica severa (hiperinflación)',
      'Escasez de alimentos y medicinas',
      'Represión política',
      'Inseguridad y violencia',
    ],
    challenges: [
      'Éxodo masivo (7+ millones)',
      'Familias separadas',
      'Xenofobia en países receptores',
      'Pérdida de profesionales',
    ],
    destinations: ['Colombia', 'Perú', 'Chile', 'Ecuador', 'España', 'Estados Unidos'],
    statistics: {
      emigrants: '7.3 millones de venezolanos en el exterior',
      topDestination: 'Colombia (2.5 millones)',
    },
  },

  activities: [
    {
      id: 'venezuela_trivia',
      type: 'trivia',
      title: 'Conoce Venezuela',
      description: 'Aprende sobre tu país de origen',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Cuál es la cascada más alta del mundo?',
          options: ['Cataratas del Niágara', 'Salto Ángel', 'Cataratas Victoria', 'Iguazú'],
          correctAnswer: 1,
          explanation: 'El Salto Ángel en Venezuela es la cascada más alta del mundo con 979 metros.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el plato nacional de Venezuela?',
          options: ['Tacos', 'Arepas', 'Empanadas', 'Tamales'],
          correctAnswer: 1,
          explanation: 'Las arepas son el plato más tradicional de Venezuela.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos venezolanos han emigrado por la crisis?',
          options: ['1 millón', '3 millones', '7 millones', '10 millones'],
          correctAnswer: 2,
          explanation: 'Más de 7 millones de venezolanos han emigrado, la mayor crisis migratoria de América Latina.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 2,
        money: 50,
        experience: 50,
      },
    },
    {
      id: 'venezuela_puzzle',
      type: 'puzzle',
      title: 'Salto Ángel',
      description: 'Arma la cascada más alta del mundo',
      difficulty: 'easy',
      imageUrl: 'angel_falls.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 50,
        experience: 40,
      },
    },
    {
      id: 'venezuela_memory',
      type: 'memory',
      title: 'Símbolos Venezolanos',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🌊' },
        { id: 2, content: '⛰️' },
        { id: 3, content: '🎭' },
        { id: 4, content: '⚽' },
        { id: 5, content: '🎵' },
      ],
      rewards: {
        stars: 1,
        money: 30,
        experience: 30,
      },
    },
  ],

  requiredStats: {
    minMoney: 0,
    minHealth: 100,
    minMoral: 100,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo'],

  unlockConditions: {
    previousCountries: [],
    minStars: 0,
  },
};

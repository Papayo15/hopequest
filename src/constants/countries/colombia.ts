/**
 * Colombia - País 2
 */

import { Country } from './types';

export const colombia: Country = {
  id: 'colombia',
  name: 'Colombia',
  region: 'South America',
  flag: '🇨🇴',
  coordinates: { latitude: 4.5709, longitude: -74.2973 },

  description: 'Primer destino de venezolanos. País cafetero y diverso. Aquí conoces a tu compañero de viaje.',

  culturalFacts: [
    'Café colombiano de fama mundial',
    'Cartagena, ciudad amurallada colonial',
    'Shakira y la cumbia',
    'Biodiversidad: segundo país más biodiverso',
  ],

  migrationContext: {
    reasons: [
      'País receptor de 2.5 millones de venezolanos',
      'Frontera compartida facilita llegada',
      'Oportunidades laborales',
      'Solidaridad inicial',
    ],
    challenges: [
      'Xenofobia creciente',
      'Saturación de servicios',
      'Explotación laboral',
      'Regularización difícil',
    ],
    destinations: ['Estados Unidos', 'España', 'Chile', 'Ecuador'],
    statistics: {
      emigrants: '5 millones de colombianos en el exterior',
      immigrants: '2.5 millones de venezolanos en Colombia',
      topDestination: 'Estados Unidos (mayor destino colombiano)',
    },
  },

  activities: [
    {
      id: 'colombia_trivia',
      type: 'trivia',
      title: 'Colombia Tierra Querida',
      description: 'Aprende sobre Colombia',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Por qué es famoso Colombia en el mundo?',
          options: ['Café', 'Té', 'Cacao', 'Azúcar'],
          correctAnswer: 0,
          explanation: 'El café colombiano es considerado uno de los mejores del mundo.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos venezolanos viven en Colombia?',
          options: ['500 mil', '1 millón', '2.5 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Colombia acoge aproximadamente 2.5 millones de venezolanos.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué cantante colombiana es famosa mundialmente?',
          options: ['Madonna', 'Shakira', 'Beyoncé', 'Adele'],
          correctAnswer: 1,
          explanation: 'Shakira es la cantante colombiana más famosa del mundo.',
          difficulty: 'easy',
        },
      ],
      rewards: {
        stars: 2,
        money: 80,
        experience: 60,
      },
    },
    {
      id: 'colombia_puzzle',
      type: 'puzzle',
      title: 'Cartagena Colonial',
      description: 'Arma la ciudad amurallada',
      difficulty: 'easy',
      imageUrl: 'cartagena.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 70,
        experience: 50,
      },
    },
    {
      id: 'colombia_memory',
      type: 'memory',
      title: 'Cultura Colombiana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '☕' },
        { id: 2, content: '🏰' },
        { id: 3, content: '🎵' },
        { id: 4, content: '⚽' },
        { id: 5, content: '🦜' },
      ],
      rewards: {
        stars: 2,
        money: 60,
        experience: 50,
      },
    },
  ],

  requiredStats: {
    minMoney: 100,
    minHealth: 80,
    minMoral: 70,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo', 'clandestino'],

  unlockConditions: {
    previousCountries: ['venezuela'],
    minStars: 2,
  },

  specialEvent: {
    type: 'companion_discovery',
    character: 'companion',
    description: 'Aquí conoces a tu compañero de viaje (Pepe o Paula según tu elección)',
  },
};

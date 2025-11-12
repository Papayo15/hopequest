/**
 * Bolivia - País 18
 */

import { Country } from './types';

export const bolivia: Country = {
  id: 'bolivia',
  name: 'Bolivia',
  region: 'South America',
  flag: '🇧🇴',
  coordinates: { latitude: -16.2902, longitude: -63.5887 },

  description: 'País sin salida al mar, plurinacional. Emigración hacia Argentina, España y Brasil.',

  culturalFacts: [
    'País plurinacional: 36 pueblos indígenas',
    'Salar de Uyuni, el desierto de sal más grande',
    'La Paz, capital administrativa más alta del mundo',
    'Idiomas oficiales: 37 lenguas',
  ],

  migrationContext: {
    reasons: [
      'Pobreza (37% bajo línea de pobreza)',
      'Falta de oportunidades laborales',
      'Búsqueda de educación',
      'Conflictos sociales y políticos',
    ],
    challenges: [
      'Discriminación hacia población indígena',
      'Explotación en talleres clandestinos',
      'Xenofobia en países vecinos',
      'Trata de personas',
    ],
    destinations: ['Argentina', 'España', 'Brasil', 'Chile', 'Estados Unidos'],
    statistics: {
      emigrants: '1.2 millones de bolivianos en el exterior',
      remittances: '$1.3 mil millones USD',
      topDestination: 'Argentina (50% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'bolivia_trivia',
      type: 'trivia',
      title: 'Plurinacionalidad',
      description: 'Descubre Bolivia',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuántos idiomas oficiales tiene Bolivia?',
          options: ['1', '3', '10', '37'],
          correctAnswer: 3,
          explanation: 'Bolivia reconoce 37 lenguas oficiales, incluyendo español, quechua, aymara y más.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué es el Salar de Uyuni?',
          options: ['Un lago', 'Un desierto de sal', 'Una montaña', 'Una ciudad'],
          correctAnswer: 1,
          explanation: 'El Salar de Uyuni es el desierto de sal más grande del mundo.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es la capital más alta del mundo?',
          options: ['Quito', 'Bogotá', 'La Paz', 'Cusco'],
          correctAnswer: 2,
          explanation: 'La Paz, Bolivia, es la capital administrativa más alta del mundo (3,650 m).',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de bolivianos?',
          options: ['España', 'Brasil', 'Argentina', 'Estados Unidos'],
          correctAnswer: 2,
          explanation: 'Argentina recibe el 50% de los emigrantes bolivianos.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'bolivia_puzzle',
      type: 'puzzle',
      title: 'Salar de Uyuni',
      description: 'Arma el espejo del cielo',
      difficulty: 'medium',
      imageUrl: 'salar_uyuni.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
    {
      id: 'bolivia_memory',
      type: 'memory',
      title: 'Cultura Boliviana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🏔️' },
        { id: 2, content: '🦙' },
        { id: 3, content: '🎭' },
        { id: 4, content: '🌄' },
        { id: 5, content: '💎' },
        { id: 6, content: '🎵' },
      ],
      rewards: {
        stars: 2,
        money: 85,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 380,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['peru'],
    minStars: 41,
  },
};

/**
 * Paraguay - País 23
 */

import { Country } from './types';

export const paraguay: Country = {
  id: 'paraguay',
  name: 'Paraguay',
  region: 'South America',
  flag: '🇵🇾',
  coordinates: { latitude: -23.4425, longitude: -58.4438 },

  description: 'País bilingüe (español-guaraní) sin salida al mar. Migración hacia Argentina y España.',

  culturalFacts: [
    'Único país bilingüe de América (español y guaraní)',
    'Arpa paraguaya, instrumento nacional',
    'Ñandutí, encaje tradicional',
    'Guerra de la Triple Alianza marcó su historia',
  ],

  migrationContext: {
    reasons: [
      'Pobreza (23% bajo línea de pobreza)',
      'Falta de oportunidades',
      'Economía informal',
      'Búsqueda de educación',
    ],
    challenges: [
      'Discriminación en Argentina',
      'Explotación laboral',
      'Trata de personas',
      'Xenofobia',
    ],
    destinations: ['Argentina', 'España', 'Brasil', 'Estados Unidos'],
    statistics: {
      emigrants: '850 mil paraguayos en el exterior',
      remittances: '$700 millones USD',
      topDestination: 'Argentina (70% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'paraguay_trivia',
      type: 'trivia',
      title: 'Corazón de América',
      description: 'Conoce Paraguay',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué idiomas son oficiales en Paraguay?',
          options: ['Solo español', 'Español e inglés', 'Español y guaraní', 'Portugués y español'],
          correctAnswer: 2,
          explanation: 'Paraguay es bilingüe, con español y guaraní como idiomas oficiales.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el instrumento nacional de Paraguay?',
          options: ['Guitarra', 'Arpa paraguaya', 'Charango', 'Quena'],
          correctAnswer: 1,
          explanation: 'El arpa paraguaya es el instrumento nacional y característico.',
          difficulty: 'medium',
        },
        {
          question: '¿Dónde migran la mayoría de paraguayos?',
          options: ['Brasil', 'España', 'Argentina', 'Estados Unidos'],
          correctAnswer: 2,
          explanation: 'El 70% de los paraguayos emigrantes viven en Argentina.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué es el ñandutí?',
          options: ['Una danza', 'Un encaje tradicional', 'Una comida', 'Un instrumento'],
          correctAnswer: 1,
          explanation: 'El ñandutí es un encaje tradicional paraguayo muy elaborado.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'paraguay_puzzle',
      type: 'puzzle',
      title: 'Misiones Jesuíticas',
      description: 'Arma las ruinas jesuíticas',
      difficulty: 'medium',
      imageUrl: 'paraguay_missions.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
    {
      id: 'paraguay_memory',
      type: 'memory',
      title: 'Cultura Paraguaya',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' },
        { id: 2, content: '🧉' },
        { id: 3, content: '🎭' },
        { id: 4, content: '🌺' },
        { id: 5, content: '🏛️' },
      ],
      rewards: {
        stars: 2,
        money: 85,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 350,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo'],

  unlockConditions: {
    previousCountries: ['uruguay'],
    minStars: 56,
  },
};

/**
 * Sudáfrica - País 32
 */

import { Country} from './types';

export const sudafrica: Country = {
  id: 'sudafrica',
  name: 'Sudáfrica',
  region: 'Africa',
  flag: '🇿🇦',
  coordinates: { latitude: -30.5595, longitude: 22.9375 },

  description: 'Nación arcoíris post-apartheid. Economía más desarrollada de África. Encuentro con Isabella.',

  culturalFacts: [
    'Nelson Mandela y fin del apartheid (1994)',
    '11 idiomas oficiales',
    'Diversidad étnica y cultural',
    'Safari y fauna africana',
  ],

  migrationContext: {
    reasons: [
      'Desempleo y crimen',
      'Desigualdad económica',
      'Xenofobia hacia otros africanos',
      'Búsqueda de seguridad',
    ],
    challenges: [
      'Crisis de energía (load shedding)',
      'Alto índice de criminalidad',
      'Xenofobia interna',
      'Desempleo juvenil (60%)',
    ],
    destinations: ['Reino Unido', 'Australia', 'Nueva Zelanda', 'Canadá', 'Estados Unidos'],
    statistics: {
      emigrants: '900 mil sudafricanos en el exterior',
      immigrants: '4 millones de inmigrantes en Sudáfrica',
      topOrigin: 'Zimbabwe, Mozambique, Lesoto',
    },
  },

  activities: [
    {
      id: 'sudafrica_trivia',
      type: 'trivia',
      title: 'Nación Arcoíris',
      description: 'Descubre Sudáfrica',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuántos idiomas oficiales tiene Sudáfrica?',
          options: ['2', '5', '11', '20'],
          correctAnswer: 2,
          explanation: 'Sudáfrica tiene 11 idiomas oficiales, la mayor cantidad en el mundo.',
          difficulty: 'hard',
        },
        {
          question: '¿Quién fue el líder contra el apartheid?',
          options: ['Desmond Tutu', 'Nelson Mandela', 'Oliver Tambo', 'Steve Biko'],
          correctAnswer: 1,
          explanation: 'Nelson Mandela lideró la lucha contra el apartheid y fue el primer presidente negro.',
          difficulty: 'easy',
        },
        {
          question: '¿En qué año terminó el apartheid?',
          options: ['1990', '1994', '2000', '1985'],
          correctAnswer: 1,
          explanation: 'El apartheid terminó oficialmente en 1994 con las primeras elecciones democráticas.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué animal es icónico en safaris sudafricanos?',
          options: ['Tigre', 'León', 'Oso', 'Lobo'],
          correctAnswer: 1,
          explanation: 'El león es uno de los "Big Five" del safari africano.',
          difficulty: 'easy',
        },
      ],
      rewards: {
        stars: 3,
        money: 170,
        experience: 140,
      },
    },
    {
      id: 'sudafrica_puzzle',
      type: 'puzzle',
      title: 'Table Mountain',
      description: 'Arma la montaña de Ciudad del Cabo',
      difficulty: 'medium',
      imageUrl: 'table_mountain.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 140,
        experience: 100,
      },
    },
    {
      id: 'sudafrica_memory',
      type: 'memory',
      title: 'Fauna Africana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🦁' },
        { id: 2, content: '🐘' },
        { id: 3, content: '🦏' },
        { id: 4, content: '🦒' },
        { id: 5, content: '🦓' },
        { id: 6, content: '🏔️' },
      ],
      rewards: {
        stars: 2,
        money: 120,
        experience: 90,
      },
    },
  ],

  requiredStats: {
    minMoney: 700,
    minHealth: 70,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'maritimo'],

  unlockConditions: {
    previousCountries: ['brasil'],
    minStars: 80,
  },

  // EVENTO ESPECIAL: Encuentro con Isabella
  specialEvent: {
    type: 'companion_discovery',
    character: 'isabella',
    description: 'Aquí conoces a Isabella, la niña que se unirá a tu viaje',
  },
};

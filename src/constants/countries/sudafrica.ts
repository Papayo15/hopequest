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
          explanation: 'Sudáfrica tiene 11 idiomas oficiales, la mayor cantidad en el mundo, reflejando su diversidad étnica.',
          difficulty: 'hard',
        },
        {
          question: '¿Quién fue el líder contra el apartheid?',
          options: ['Desmond Tutu', 'Nelson Mandela', 'Oliver Tambo', 'Steve Biko'],
          correctAnswer: 1,
          explanation: 'Nelson Mandela lideró la lucha contra el apartheid y fue el primer presidente negro de Sudáfrica en 1994.',
          difficulty: 'easy',
        },
        {
          question: '¿En qué año terminó el apartheid?',
          options: ['1990', '1994', '2000', '1985'],
          correctAnswer: 1,
          explanation: 'El apartheid terminó oficialmente en 1994 con las primeras elecciones democráticas donde Mandela fue elegido presidente.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué animal es icónico en safaris sudafricanos?',
          options: ['Tigre', 'León', 'Oso', 'Lobo'],
          correctAnswer: 1,
          explanation: 'El león es uno de los "Big Five" del safari africano, junto con el elefante, rinoceronte, búfalo y leopardo.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos sudafricanos viven en el exterior?',
          options: ['300 mil', '900 mil', '2 millones', '5 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 900 mil sudafricanos viven en el exterior, principalmente en Reino Unido y Australia.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos inmigrantes vive en Sudáfrica?',
          options: ['1 millón', '4 millones', '7 millones', '10 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 4 millones de inmigrantes viven en Sudáfrica, principalmente de Zimbabwe, Mozambique y Lesoto.',
          difficulty: 'medium',
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
      maxPairs: 16,
      pairs: [
        { id: 1, content: '🦁' },
        { id: 2, content: '🐘' },
        { id: 3, content: '🦏' },
        { id: 4, content: '🦒' },
        { id: 5, content: '🦓' },
        { id: 6, content: '🏔️' },
        { id: 7, content: '🐆' },
        { id: 8, content: '🦛' },
        { id: 9, content: '🦅' },
        { id: 10, content: '🌍' },
        { id: 11, content: '🏞️' },
        { id: 12, content: '🌅' },
        { id: 13, content: '⚽' },
        { id: 14, content: '🎭' },
        { id: 15, content: '🏛️' },
        { id: 16, content: '🌊' },
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

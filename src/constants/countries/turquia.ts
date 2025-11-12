/**
 * Turquía - País 33
 */

import { Country } from './types';

export const turquia: Country = {
  id: 'turquia',
  name: 'Turquía',
  region: 'Asia',
  flag: '🇹🇷',
  coordinates: { latitude: 38.9637, longitude: 35.2433 },

  description: 'Puente entre Europa y Asia. Acoge millones de refugiados sirios.',

  culturalFacts: [
    'Estambul, única ciudad en dos continentes',
    'Santa Sofía y Mezquita Azul',
    'Baklava y kebab turco',
    'Imperio Otomano gobernó durante 600 años',
  ],

  migrationContext: {
    reasons: [
      'Crisis siria: 3.6 millones de refugiados',
      'País de tránsito hacia Europa',
      'Economía afectada por refugiados',
      'Puente geográfico estratégico',
    ],
    challenges: [
      'Mayor población refugiada del mundo',
      'Acuerdo con UE para contener migración',
      'Tensiones sociales',
      'Crisis económica y inflación',
    ],
    destinations: ['Alemania', 'Francia', 'Países Bajos', 'Austria'],
    statistics: {
      emigrants: '3 millones de turcos en el exterior',
      refugees: '3.6 millones de refugiados sirios en Turquía',
      topDestination: 'Alemania (mayor comunidad turca)',
    },
  },

  activities: [
    {
      id: 'turquia_trivia',
      type: 'trivia',
      title: 'Encrucijada de Civilizaciones',
      description: 'Conoce Turquía',
      difficulty: 'hard',
      questions: [
        {
          question: '¿En cuántos continentes está Estambul?',
          options: ['1', '2', '3', 'Ninguno'],
          correctAnswer: 1,
          explanation: 'Estambul es la única ciudad que está en dos continentes: Europa y Asia, separada por el Estrecho del Bósforo.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos refugiados sirios acoge Turquía?',
          options: ['500 mil', '1 millón', '3.6 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Turquía acoge 3.6 millones de refugiados sirios, más que cualquier otro país del mundo.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué imperio gobernó desde Turquía?',
          options: ['Romano', 'Persa', 'Otomano', 'Mongol'],
          correctAnswer: 2,
          explanation: 'El Imperio Otomano gobernó desde Turquía durante 600 años (1299-1922), controlando gran parte de Europa, Asia y África.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué dulce es típico turco?',
          options: ['Baklava', 'Tiramisu', 'Churros', 'Strudel'],
          correctAnswer: 0,
          explanation: 'El baklava es el dulce más famoso de Turquía, hecho con capas de masa filo, nueces y miel.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el monumento más famoso de Estambul?',
          options: ['Mezquita Azul', 'Torre de Gálata', 'Palacio Topkapi', 'Santa Sofía'],
          correctAnswer: 3,
          explanation: 'Santa Sofía (Hagia Sophia) es el monumento más icónico de Estambul, construido en el año 537.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos turcos viven en el exterior?',
          options: ['1 millón', '3 millones', '6 millones', '10 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 3 millones de turcos viven en el exterior, principalmente en Alemania.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 190,
        experience: 150,
      },
    },
    {
      id: 'turquia_puzzle',
      type: 'puzzle',
      title: 'Mezquita Azul',
      description: 'Arma la mezquita de Estambul',
      difficulty: 'hard',
      imageUrl: 'blue_mosque.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 160,
        experience: 120,
      },
    },
    {
      id: 'turquia_memory',
      type: 'memory',
      title: 'Cultura Turca',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      maxPairs: 16,
      pairs: [
        { id: 1, content: '🕌' },
        { id: 2, content: '🍖' },
        { id: 3, content: '☕' },
        { id: 4, content: '🏛️' },
        { id: 5, content: '🌉' },
        { id: 6, content: '🎨' },
        { id: 7, content: '🧿' },
        { id: 8, content: '🌙' },
        { id: 9, content: '🎭' },
        { id: 10, content: '🏺' },
        { id: 11, content: '🍯' },
        { id: 12, content: '🎪' },
        { id: 13, content: '🏔️' },
        { id: 14, content: '🌊' },
        { id: 15, content: '🎵' },
        { id: 16, content: '🧳' },
      ],
      rewards: {
        stars: 2,
        money: 140,
        experience: 105,
      },
    },
  ],

  requiredStats: {
    minMoney: 650,
    minHealth: 70,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo', 'refugiado'],

  unlockConditions: {
    previousCountries: ['alemania'],
    minStars: 83,
  },
};

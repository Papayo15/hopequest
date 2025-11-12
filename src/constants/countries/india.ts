/**
 * India - País 34
 */

import { Country } from './types';

export const india: Country = {
  id: 'india',
  name: 'India',
  region: 'Asia',
  flag: '🇮🇳',
  coordinates: { latitude: 20.5937, longitude: 78.9629 },
  description: 'Mayor diáspora del mundo. Potencia tecnológica y cultural.',
  culturalFacts: [
    'Taj Mahal, maravilla del mundo',
    'Bollywood, mayor industria del cine',
    'Yoga y meditación',
    'Más de 700 lenguas habladas',
  ],
  migrationContext: {
    reasons: ['Oportunidades en tecnología', 'Educación superior', 'Movilidad profesional', 'Reunificación'],
    challenges: ['Brain drain', 'Discriminación', 'Visas restrictivas', 'Estereotipos'],
    destinations: ['Emiratos Árabes', 'Estados Unidos', 'Reino Unido', 'Canadá', 'Australia'],
    statistics: { emigrants: '18 millones (mayor diáspora)', remittances: '$87 mil millones USD (mayor receptor)' },
  },
  activities: [
    {
      id: 'india_trivia',
      type: 'trivia',
      title: 'India Milenaria',
      description: 'Descubre India',
      difficulty: 'hard',
      questions: [
        {
          question: '¿Qué país tiene la mayor diáspora del mundo?',
          options: ['China', 'India', 'México', 'Filipinas'],
          correctAnswer: 1,
          explanation: 'India tiene 18 millones de personas en el exterior, la mayor diáspora.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué país recibe más remesas del mundo?',
          options: ['México', 'Filipinas', 'India', 'China'],
          correctAnswer: 2,
          explanation: 'India recibe $87 mil millones USD anuales, el mayor receptor mundial.',
          difficulty: 'hard',
        },
      ],
      rewards: { stars: 3, money: 200, experience: 160 },
    },
    {
      id: 'india_puzzle',
      type: 'puzzle',
      title: 'Taj Mahal',
      description: 'Arma el palacio del amor',
      difficulty: 'hard',
      imageUrl: 'taj_mahal.jpg',
      gridSize: 5,
      rewards: { stars: 3, money: 170, experience: 130 },
    },
    {
      id: 'india_memory',
      type: 'memory',
      title: 'Cultura India',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🕉️' },
        { id: 2, content: '🏛️' },
        { id: 3, content: '🎭' },
        { id: 4, content: '🐘' },
        { id: 5, content: '🧘' },
        { id: 6, content: '🍛' },
        { id: 7, content: '🎬' },
      ],
      rewards: { stars: 2, money: 150, experience: 110 },
    },
  ],
  requiredStats: {
    minMoney: 750,
    minHealth: 75,
    minMoral: 70,
    requiredDocuments: ['passport', 'visa'],
  },
  availablePortals: ['aereo'],
  unlockConditions: {
    previousCountries: ['turquia'],
    minStars: 86,
  },
};

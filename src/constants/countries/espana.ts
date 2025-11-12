/**
 * España - País 6
 */

import { Country } from './types';

export const espana: Country = {
  id: 'espana',
  name: 'España',
  region: 'Europe',
  flag: '🇪🇸',
  coordinates: { latitude: 40.4637, longitude: -3.7492 },
  description: 'Puerta de entrada a Europa. Conexiones históricas con Latinoamérica.',
  culturalFacts: [
    'Sagrada Familia de Gaudí',
    'Flamenco y paella',
    'Don Quijote de Cervantes',
    'Segunda lengua más hablada del mundo',
  ],
  migrationContext: {
    reasons: ['Idioma compartido', 'Crisis latinoamericanas', 'Conexiones familiares', 'Puerta a UE'],
    challenges: ['Xenofobia y racismo', 'Crisis económica 2008', 'Desempleo juvenil', 'Papeles difíciles'],
    destinations: ['Francia', 'Alemania', 'Reino Unido', 'Retorno'],
    statistics: { immigrants: '5.8 millones de inmigrantes', topOrigin: 'Marruecos, Rumania, Ecuador' },
  },
  activities: [
    {
      id: 'espana_trivia',
      type: 'trivia',
      title: 'La Madre Patria',
      description: 'Descubre España',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Quién diseñó la Sagrada Familia?',
          options: ['Picasso', 'Dalí', 'Gaudí', 'Velázquez'],
          correctAnswer: 2,
          explanation: 'Antoni Gaudí diseñó la Sagrada Familia, aún en construcción.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué idioma es el segundo más hablado del mundo?',
          options: ['Inglés', 'Español', 'Chino', 'Francés'],
          correctAnswer: 1,
          explanation: 'El español es el segundo idioma más hablado por número de hablantes nativos.',
          difficulty: 'easy',
        },
      ],
      rewards: { stars: 3, money: 180, experience: 120 },
    },
    {
      id: 'espana_puzzle',
      type: 'puzzle',
      title: 'Sagrada Familia',
      description: 'Arma la basílica de Gaudí',
      difficulty: 'hard',
      imageUrl: 'sagrada_familia.jpg',
      gridSize: 5,
      rewards: { stars: 3, money: 150, experience: 110 },
    },
    {
      id: 'espana_memory',
      type: 'memory',
      title: 'Cultura Española',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '💃' },
        { id: 2, content: '🏰' },
        { id: 3, content: '🥘' },
        { id: 4, content: '⚽' },
        { id: 5, content: '🎨' },
        { id: 6, content: '🐂' },
        { id: 7, content: '🌊' },
      ],
      rewards: { stars: 2, money: 130, experience: 95 },
    },
  ],
  requiredStats: {
    minMoney: 800,
    minHealth: 80,
    minMoral: 70,
    requiredDocuments: ['passport', 'visa'],
  },
  availablePortals: ['aereo', 'maritimo'],
  unlockConditions: {
    previousCountries: ['estadosunidos'],
    minStars: 14,
  },
};

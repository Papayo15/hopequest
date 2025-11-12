/**
 * Marruecos - País 31
 */

import { Country } from './types';

export const marruecos: Country = {
  id: 'marruecos',
  name: 'Marruecos',
  region: 'Africa',
  flag: '🇲🇦',
  coordinates: { latitude: 31.7917, longitude: -7.0926 },

  description: 'Puerta entre África y Europa. Conexiones históricas con España y Francia.',

  culturalFacts: [
    'Mezquita de Hassan II en Casablanca',
    'Medinas y mercados tradicionales (zocos)',
    'Tagine y cuscús, cocina marroquí',
    'Idiomas: árabe, bereber, francés, español',
  ],

  migrationContext: {
    reasons: [
      'Proximidad geográfica a Europa',
      'Conexiones con España y Francia',
      'Desempleo juvenil',
      'Búsqueda de oportunidades',
    ],
    challenges: [
      'Estrecho de Gibraltar (cruce peligroso)',
      'Tráfico de personas',
      'Discriminación en Europa',
      'Migración irregular',
    ],
    destinations: ['España', 'Francia', 'Italia', 'Bélgica', 'Países Bajos'],
    statistics: {
      emigrants: '5 millones de marroquíes en el exterior',
      remittances: '$8 mil millones USD',
      topDestination: 'Francia (principal destino)',
    },
  },

  activities: [
    {
      id: 'marruecos_trivia',
      type: 'trivia',
      title: 'Perla del Magreb',
      description: 'Conoce Marruecos',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué estrecho separa Marruecos de España?',
          options: ['Estrecho de Magallanes', 'Estrecho de Gibraltar', 'Canal de la Mancha', 'Bósforo'],
          correctAnswer: 1,
          explanation: 'El Estrecho de Gibraltar separa Marruecos de España por solo 14 km.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el plato típico marroquí?',
          options: ['Paella', 'Tagine', 'Sushi', 'Pizza'],
          correctAnswer: 1,
          explanation: 'El tagine es el plato más característico de Marruecos.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos marroquíes viven en el exterior?',
          options: ['1 millón', '3 millones', '5 millones', '10 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 5 millones de marroquíes viven fuera del país.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes marroquíes?',
          options: ['España', 'Francia', 'Alemania', 'Reino Unido'],
          correctAnswer: 1,
          explanation: 'Francia es el principal destino por conexiones históricas.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 180,
        experience: 130,
      },
    },
    {
      id: 'marruecos_puzzle',
      type: 'puzzle',
      title: 'Mezquita Hassan II',
      description: 'Arma la mezquita de Casablanca',
      difficulty: 'hard',
      imageUrl: 'hassan_ii_mosque.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 150,
        experience: 110,
      },
    },
    {
      id: 'marruecos_memory',
      type: 'memory',
      title: 'Cultura Marroquí',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🕌' },
        { id: 2, content: '🏜️' },
        { id: 3, content: '🐪' },
        { id: 4, content: '☕' },
        { id: 5, content: '🎨' },
        { id: 6, content: '🌴' },
      ],
      rewards: {
        stars: 2,
        money: 130,
        experience: 95,
      },
    },
  ],

  requiredStats: {
    minMoney: 600,
    minHealth: 75,
    minMoral: 70,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'maritimo', 'terrestre', 'clandestino'],

  unlockConditions: {
    previousCountries: ['espana'],
    minStars: 77,
  },
};

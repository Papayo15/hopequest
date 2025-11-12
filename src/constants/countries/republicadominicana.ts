/**
 * República Dominicana - País 14
 */

import { Country } from './types';

export const republicadominicana: Country = {
  id: 'republicadominicana',
  name: 'República Dominicana',
  region: 'Caribbean',
  flag: '🇩🇴',
  coordinates: { latitude: 18.7357, longitude: -70.1627 },

  description: 'Comparte la isla con Haití. Destino turístico y país de emigración e inmigración simultánea.',

  culturalFacts: [
    'Cuna del merengue y la bachata',
    'Primera ciudad europea en América: Santo Domingo (1496)',
    'Paraíso del béisbol - muchos jugadores en MLB',
    'Playas paradisíacas del Caribe',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de mejores oportunidades',
      'Reunificación familiar en Estados Unidos',
      'Crisis económicas periódicas',
      'Destino de haitianos (750 mil)',
    ],
    challenges: [
      'Discriminación de dominicanos en el exterior',
      'Conflictos con inmigración haitiana',
      'Trata de personas',
      'Deportaciones desde EE.UU.',
    ],
    destinations: ['Estados Unidos', 'España', 'Italia', 'Suiza'],
    statistics: {
      emigrants: '2 millones de dominicanos en el exterior',
      remittances: '$8 mil millones USD (8% del PIB)',
      topDestination: 'Estados Unidos (Nueva York, Miami)',
    },
  },

  activities: [
    {
      id: 'republicadominicana_trivia',
      type: 'trivia',
      title: 'Quisqueya la Bella',
      description: 'Descubre República Dominicana',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué música se originó en República Dominicana?',
          options: ['Salsa', 'Merengue y Bachata', 'Reggaeton', 'Cumbia'],
          correctAnswer: 1,
          explanation: 'El merengue y la bachata son géneros musicales originarios de República Dominicana.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál fue la primera ciudad europea en América?',
          options: ['La Habana', 'Cartagena', 'Santo Domingo', 'San Juan'],
          correctAnswer: 2,
          explanation: 'Santo Domingo, fundada en 1496, fue la primera ciudad europea en América.',
          difficulty: 'medium',
        },
        {
          question: '¿Por qué deporte es famosa la República Dominicana?',
          options: ['Fútbol', 'Béisbol', 'Boxeo', 'Baloncesto'],
          correctAnswer: 1,
          explanation: 'República Dominicana es una potencia del béisbol, con muchos jugadores en MLB.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos dominicanos viven en el exterior?',
          options: ['500 mil', '1 millón', '2 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 2 millones de dominicanos viven fuera del país.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 100,
      },
    },
    {
      id: 'republicadominicana_puzzle',
      type: 'puzzle',
      title: 'Playas del Caribe',
      description: 'Arma una playa dominicana',
      difficulty: 'easy',
      imageUrl: 'punta_cana.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 90,
        experience: 70,
      },
    },
    {
      id: 'republicadominicana_memory',
      type: 'memory',
      title: 'Símbolos Dominicanos',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' },
        { id: 2, content: '⚾' },
        { id: 3, content: '🏖️' },
        { id: 4, content: '🏛️' },
        { id: 5, content: '🌴' },
        { id: 6, content: '💃' },
      ],
      rewards: {
        stars: 2,
        money: 85,
        experience: 65,
      },
    },
  ],

  requiredStats: {
    minMoney: 380,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'maritimo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['haiti'],
    minStars: 29,
  },
};

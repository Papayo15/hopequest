/**
 * Alemania - País 29
 */

import { Country } from './types';

export const alemania: Country = {
  id: 'alemania',
  name: 'Alemania',
  region: 'Europe',
  flag: '🇩🇪',
  coordinates: { latitude: 51.1657, longitude: 10.4515 },

  description: 'Potencia económica europea. Destino de refugiados sirios y trabajadores cualificados.',

  culturalFacts: [
    'Economía más grande de Europa',
    'Caída del Muro de Berlín (1989)',
    'Oktoberfest y cerveza alemana',
    'Ingeniería y tecnología alemana',
  ],

  migrationContext: {
    reasons: [
      'Oportunidades laborales',
      'Sistema de refugio (Willkommenskultur)',
      'Crisis siria (2015-2016)',
      'Educación gratuita de calidad',
    ],
    challenges: [
      'Barrera del idioma alemán',
      'Xenofobia y extrema derecha',
      'Burocracia compleja',
      'Integración cultural',
    ],
    destinations: ['Suiza', 'Austria', 'Estados Unidos', 'España'],
    statistics: {
      emigrants: '3.5 millones de alemanes en el exterior',
      immigrants: '15 millones de inmigrantes en Alemania',
      topOrigin: 'Turquía, Siria, Polonia',
    },
  },

  activities: [
    {
      id: 'alemania_trivia',
      type: 'trivia',
      title: 'Alemania Moderna',
      description: 'Conoce Alemania',
      difficulty: 'medium',
      questions: [
        {
          question: '¿En qué año cayó el Muro de Berlín?',
          options: ['1985', '1989', '1991', '1995'],
          correctAnswer: 1,
          explanation: 'El Muro de Berlín cayó el 9 de noviembre de 1989, marcando el fin de la Guerra Fría en Europa.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos inmigrantes viven en Alemania?',
          options: ['5 millones', '10 millones', '15 millones', '20 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 15 millones de inmigrantes viven en Alemania, representando el 18% de la población.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué festival es famoso en Alemania?',
          options: ['Carnaval', 'Oktoberfest', 'Tomatina', 'Fallas'],
          correctAnswer: 1,
          explanation: 'El Oktoberfest es el festival de cerveza más grande del mundo, celebrado en Múnich cada septiembre.',
          difficulty: 'easy',
        },
        {
          question: '¿De dónde proviene la comunidad más grande de inmigrantes?',
          options: ['Polonia', 'Turquía', 'Siria', 'Italia'],
          correctAnswer: 1,
          explanation: 'Turquía tiene la comunidad de inmigrantes más grande en Alemania, con más de 3 millones de personas.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es la capital de Alemania?',
          options: ['Múnich', 'Hamburgo', 'Berlín', 'Frankfurt'],
          correctAnswer: 2,
          explanation: 'Berlín es la capital de Alemania y su ciudad más poblada, con 3.7 millones de habitantes.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos alemanes viven en el exterior?',
          options: ['1 millón', '3.5 millones', '7 millones', '10 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 3.5 millones de alemanes viven en el exterior, principalmente en Suiza, Austria y Estados Unidos.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 250,
        experience: 150,
      },
    },
    {
      id: 'alemania_puzzle',
      type: 'puzzle',
      title: 'Puerta de Brandeburgo',
      description: 'Arma el símbolo de Berlín',
      difficulty: 'medium',
      imageUrl: 'brandenburg_gate.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 180,
        experience: 110,
      },
    },
    {
      id: 'alemania_memory',
      type: 'memory',
      title: 'Cultura Alemana',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      maxPairs: 16,
      pairs: [
        { id: 1, content: '🍺' },
        { id: 2, content: '🏰' },
        { id: 3, content: '🚗' },
        { id: 4, content: '⚽' },
        { id: 5, content: '🥨' },
        { id: 6, content: '🎵' },
        { id: 7, content: '🌭' },
        { id: 8, content: '🏛️' },
        { id: 9, content: '🎄' },
        { id: 10, content: '📚' },
        { id: 11, content: '🏭' },
        { id: 12, content: '🎪' },
        { id: 13, content: '🎭' },
        { id: 14, content: '🧪' },
        { id: 15, content: '🏔️' },
        { id: 16, content: '🍻' },
      ],
      rewards: {
        stars: 2,
        money: 160,
        experience: 105,
      },
    },
  ],

  requiredStats: {
    minMoney: 1000,
    minHealth: 85,
    minMoral: 80,
    requiredDocuments: ['passport', 'visa', 'work_permit'],
  },

  availablePortals: ['aereo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['francia'],
    minStars: 71,
  },
};

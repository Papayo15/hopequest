/**
 * Chile - País 19
 */

import { Country } from './types';

export const chile: Country = {
  id: 'chile',
  name: 'Chile',
  region: 'South America',
  flag: '🇨🇱',
  coordinates: { latitude: -35.6751, longitude: -71.543 },

  description: 'País largo y estrecho entre Andes y Pacífico. Destino de inmigrantes y país de emigración.',

  culturalFacts: [
    'Más de 4,000 km de longitud',
    'Desierto de Atacama, el más seco del mundo',
    'Isla de Pascua (Rapa Nui) y sus moais',
    'Economía más estable de Sudamérica',
  ],

  migrationContext: {
    reasons: [
      'Golpe militar de 1973 generó exilio masivo',
      'Búsqueda de oportunidades económicas',
      'Estudios y desarrollo profesional',
      'País receptor de venezolanos, haitianos, peruanos',
    ],
    challenges: [
      'Crisis migratoria reciente (2015-2020)',
      'Xenofobia hacia nuevos migrantes',
      'Explotación laboral de migrantes',
      'Políticas migratorias cambiantes',
    ],
    destinations: ['Argentina', 'Estados Unidos', 'Suecia', 'España', 'Australia'],
    statistics: {
      emigrants: '800 mil chilenos en el exterior',
      immigrants: '1.5 millones de inmigrantes en Chile',
      topOrigin: 'Venezuela y Haití (principales inmigrantes)',
    },
  },

  activities: [
    {
      id: 'chile_trivia',
      type: 'trivia',
      title: 'País Largo y Angosto',
      description: 'Conoce Chile',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuántos kilómetros de longitud tiene Chile?',
          options: ['1,000 km', '2,000 km', '4,000 km', '6,000 km'],
          correctAnswer: 2,
          explanation: 'Chile tiene más de 4,000 km de longitud, siendo el país más largo del mundo.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué es la Isla de Pascua famosa?',
          options: ['Playas', 'Moais (estatuas gigantes)', 'Volcanes', 'Pingüinos'],
          correctAnswer: 1,
          explanation: 'La Isla de Pascua es famosa por los moais, estatuas monolíticas de piedra.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el desierto más seco del mundo?',
          options: ['Sahara', 'Gobi', 'Atacama', 'Kalahari'],
          correctAnswer: 2,
          explanation: 'El desierto de Atacama en Chile es el más seco del mundo.',
          difficulty: 'easy',
        },
        {
          question: '¿De dónde provienen la mayoría de los inmigrantes actuales?',
          options: ['Argentina y Perú', 'Venezuela y Haití', 'Bolivia y Colombia', 'España e Italia'],
          correctAnswer: 1,
          explanation: 'Venezuela y Haití son los principales orígenes de inmigrantes recientes en Chile.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 170,
        experience: 120,
      },
    },
    {
      id: 'chile_puzzle',
      type: 'puzzle',
      title: 'Moais de Rapa Nui',
      description: 'Arma las estatuas misteriosas',
      difficulty: 'hard',
      imageUrl: 'easter_island.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 140,
        experience: 110,
      },
    },
    {
      id: 'chile_memory',
      type: 'memory',
      title: 'Geografía Chilena',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🗿' },
        { id: 2, content: '🏔️' },
        { id: 3, content: '🏜️' },
        { id: 4, content: '🌊' },
        { id: 5, content: '🍇' },
        { id: 6, content: '⛷️' },
        { id: 7, content: '🐧' },
      ],
      rewards: {
        stars: 2,
        money: 110,
        experience: 85,
      },
    },
  ],

  requiredStats: {
    minMoney: 500,
    minHealth: 75,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['bolivia'],
    minStars: 44,
  },
};

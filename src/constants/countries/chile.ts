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
          question: '¿Cuál es el desierto más seco del mundo?',
          options: ['Sahara', 'Gobi', 'Atacama', 'Kalahari'],
          correctAnswer: 2,
          explanation: 'El desierto de Atacama en Chile es el más seco del mundo. Hay áreas donde nunca se ha registrado lluvia.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué es la Isla de Pascua famosa por tener?',
          options: ['Playas', 'Moais (estatuas gigantes)', 'Volcanes', 'Pingüinos'],
          correctAnswer: 1,
          explanation: 'La Isla de Pascua (Rapa Nui) es famosa por los moais, estatuas monolíticas de piedra creadas por la cultura polinesia. Son Patrimonio de la Humanidad.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos kilómetros de longitud tiene Chile aproximadamente?',
          options: ['1,000 km', '2,000 km', '4,000 km', '6,000 km'],
          correctAnswer: 2,
          explanation: 'Chile tiene más de 4,000 km de longitud de norte a sur, pero solo 180 km de ancho promedio. Es el país más largo y angosto del mundo.',
          difficulty: 'medium',
        },
        {
          question: '¿De dónde provienen la mayoría de los inmigrantes recientes en Chile?',
          options: ['Argentina y Perú', 'Venezuela y Haití', 'Bolivia y Colombia', 'España e Italia'],
          correctAnswer: 1,
          explanation: 'Venezuela y Haití son los principales orígenes de inmigrantes recientes en Chile (2015-2020). Chile se convirtió en destino importante por su estabilidad económica relativa.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos inmigrantes aproximadamente viven en Chile actualmente?',
          options: ['500 mil', '1.5 millones', '3 millones', '5 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 1.5 millones de inmigrantes viven en Chile, representando cerca del 8% de la población. Esta cifra creció significativamente en la última década.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué evento en 1973 generó un exilio masivo de chilenos?',
          options: ['Un terremoto', 'El golpe militar', 'Una crisis económica', 'Una guerra'],
          correctAnswer: 1,
          explanation: 'El golpe militar de 1973 contra el presidente Salvador Allende generó un exilio masivo de chilenos hacia Argentina, Suecia, Francia, España y otros países. Miles buscaron asilo político.',
          difficulty: 'hard',
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
        { id: 1, content: '🗿' }, // Moais de Isla de Pascua
        { id: 2, content: '🏔️' }, // Cordillera de los Andes
        { id: 3, content: '🏜️' }, // Desierto de Atacama
        { id: 4, content: '🌊' }, // Costa del Pacífico
        { id: 5, content: '🍇' }, // Vinos chilenos
        { id: 6, content: '⛷️' }, // Esquí en los Andes
        { id: 7, content: '🐧' }, // Pingüinos de la Patagonia
        { id: 8, content: '🌋' }, // Volcanes
        { id: 9, content: '🎿' }, // Torres del Paine
        { id: 10, content: '☀️' }, // Astronomía en Atacama
        { id: 11, content: '🏛️' }, // Valparaíso
        { id: 12, content: '🦙' }, // Llamas del norte
        { id: 13, content: '🍷' }, // Valle del vino
        { id: 14, content: '🏖️' }, // Playas
        { id: 15, content: '🌲' }, // Bosques del sur
        { id: 16, content: '🎨' }, // Pablo Neruda
      ],
      maxPairs: 16,
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

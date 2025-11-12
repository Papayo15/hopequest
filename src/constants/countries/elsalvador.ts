/**
 * El Salvador - País 9
 * El país más pequeño de Centroamérica
 */

import { Country } from './types';

export const elsalvador: Country = {
  id: 'elsalvador',
  name: 'El Salvador',
  region: 'Central America',
  flag: '🇸🇻',
  coordinates: { latitude: 13.7942, longitude: -88.8965 },

  description: 'El país más pequeño y densamente poblado de Centroamérica. Alta emigración debido a violencia de pandillas y falta de oportunidades.',

  culturalFacts: [
    'Las pupusas son el platillo nacional',
    'El dólar estadounidense es la moneda oficial desde 2001',
    'Joya de Cerén es una Pompeya maya',
    'Tiene más de 20 volcanes',
  ],

  migrationContext: {
    reasons: [
      'Violencia extrema de pandillas (MS-13, Barrio 18)',
      'Alta tasa de homicidios',
      'Economía dependiente de remesas',
      'Terremotos y desastres naturales',
    ],
    challenges: [
      'Extorsión de pandillas',
      'Deportaciones masivas desde EE.UU.',
      'TPS (Temporary Protected Status) incierto',
      'Reintegración difícil de deportados',
    ],
    destinations: ['Estados Unidos', 'Canadá', 'Australia'],
    statistics: {
      emigrants: '3 millones de salvadoreños en el exterior (más que en El Salvador)',
      remittances: '$7.5 mil millones USD (24% del PIB)',
      topDestination: 'Estados Unidos (95% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'elsalvador_trivia',
      type: 'trivia',
      title: 'El Salvador y la Migración',
      description: 'Comprende la realidad salvadoreña',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuál es el platillo nacional de El Salvador?',
          options: ['Tacos', 'Pupusas', 'Arepas', 'Tamales'],
          correctAnswer: 1,
          explanation: 'Las pupusas son el platillo nacional de El Salvador, tortillas de maíz rellenas de queso, frijoles o chicharrón. Son deliciosas y parte importante de la cultura salvadoreña.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué moneda oficial usa El Salvador desde 2001?',
          options: ['El peso', 'El colón', 'El dólar estadounidense', 'El euro'],
          correctAnswer: 2,
          explanation: 'El Salvador adoptó el dólar estadounidense como moneda oficial en 2001, reemplazando el colón salvadoreño.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos volcanes aproximadamente tiene El Salvador?',
          options: ['5 volcanes', 'Más de 20 volcanes', '10 volcanes', '50 volcanes'],
          correctAnswer: 1,
          explanation: 'El Salvador tiene más de 20 volcanes, siendo uno de los países con mayor densidad volcánica del mundo. Algunos están activos como el volcán de Santa Ana.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué es Joya de Cerén y por qué es famosa?',
          options: ['Un volcán activo', 'Una playa turística', 'Una ciudad maya preservada', 'Una montaña sagrada'],
          correctAnswer: 2,
          explanation: 'Joya de Cerén es conocida como la "Pompeya de América". Es una ciudad maya que quedó preservada bajo ceniza volcánica en el año 600 d.C. Es Patrimonio de la Humanidad.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos salvadoreños aproximadamente viven en el exterior?',
          options: ['1 millón', '2 millones', '3 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 3 millones de salvadoreños viven en el exterior, principalmente en Estados Unidos. Esta cifra es casi igual a la población que vive dentro del país.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué porcentaje del PIB salvadoreño representan las remesas?',
          options: ['10%', '16%', '24%', '35%'],
          correctAnswer: 2,
          explanation: 'Las remesas representan aproximadamente el 24% del PIB de El Salvador, lo que significa que la economía del país depende enormemente del dinero que envían los salvadoreños desde el exterior.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'elsalvador_puzzle',
      type: 'puzzle',
      title: 'Volcanes de El Salvador',
      description: 'Arma el paisaje volcánico salvadoreño',
      difficulty: 'medium',
      imageUrl: 'el_salvador_volcanoes.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
    {
      id: 'elsalvador_memory',
      type: 'memory',
      title: 'Cultura Salvadoreña',
      description: 'Encuentra parejas de símbolos de El Salvador',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🌮' }, // Pupusas
        { id: 2, content: '🌋' }, // Volcanes (más de 20)
        { id: 3, content: '💵' }, // Dólar estadounidense
        { id: 4, content: '🏛️' }, // Joya de Cerén
        { id: 5, content: '🌊' }, // Playas
        { id: 6, content: '☕' }, // Café salvadoreño
        { id: 7, content: '🦜' }, // Torogoz (ave nacional)
        { id: 8, content: '🌺' }, // Izote (flor nacional)
        { id: 9, content: '🏖️' }, // Costa del Pacífico
        { id: 10, content: '🎨' }, // Artesanías
        { id: 11, content: '🌴' }, // Coco
        { id: 12, content: '🎭' }, // Danza folklórica
        { id: 13, content: '🏔️' }, // Cerro Verde
        { id: 14, content: '🌽' }, // Maíz
        { id: 15, content: '🥥' }, // Cocos
        { id: 16, content: '🎶' }, // Música tradicional
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 80,
        experience: 60,
      },
    },
  ],

  requiredStats: {
    minMoney: 280,
    minHealth: 60,
    minMoral: 50,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo', 'clandestino', 'refugiado'],

  unlockConditions: {
    previousCountries: ['honduras'],
    minStars: 14,
  },
};

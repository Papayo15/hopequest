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
          question: '¿Cuántos salvadoreños viven fuera del país?',
          options: ['1 millón', '2 millones', '3 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 3 millones de salvadoreños viven en el exterior, más que la población que permanece en el país.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el platillo nacional de El Salvador?',
          options: ['Tacos', 'Pupusas', 'Arepas', 'Tamales'],
          correctAnswer: 1,
          explanation: 'Las pupusas son el platillo nacional, tortillas rellenas de queso, frijoles o chicharrón.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué moneda usa El Salvador?',
          options: ['Peso', 'Colón', 'Dólar estadounidense', 'Euro'],
          correctAnswer: 2,
          explanation: 'El Salvador adoptó el dólar estadounidense como moneda oficial en 2001.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué es Joya de Cerén?',
          options: ['Un volcán', 'Una playa', 'Una ciudad maya preservada', 'Una montaña'],
          correctAnswer: 2,
          explanation: 'Joya de Cerén es conocida como la "Pompeya de América", una ciudad maya preservada por ceniza volcánica.',
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
        { id: 2, content: '🌋' }, // Volcanes
        { id: 3, content: '💵' }, // Dólar
        { id: 4, content: '🏛️' }, // Joya de Cerén
        { id: 5, content: '🌊' }, // Playas
        { id: 6, content: '☕' }, // Café
      ],
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

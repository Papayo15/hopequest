/**
 * Honduras - País 8
 * Triángulo Norte de Centroamérica
 */

import { Country } from './types';

export const honduras: Country = {
  id: 'honduras',
  name: 'Honduras',
  region: 'Central America',
  flag: '🇭🇳',
  coordinates: { latitude: 15.2000, longitude: -86.2419 },

  description: 'País centroamericano con costa en dos océanos. Enfrenta desafíos económicos y de seguridad que impulsan la migración.',

  culturalFacts: [
    'Las ruinas de Copán son un sitio maya importante',
    'El café hondureño es reconocido mundialmente',
    'Tiene costa en el Caribe y el Pacífico',
    'Las Islas de la Bahía son destino turístico',
  ],

  migrationContext: {
    reasons: [
      'Alta tasa de violencia y crimen organizado',
      'Pobreza extrema (60% de la población)',
      'Falta de oportunidades laborales',
      'Desastres naturales frecuentes (huracanes)',
    ],
    challenges: [
      'Violencia de pandillas (maras)',
      'Extorsión durante la ruta migratoria',
      'Deportaciones masivas',
      'Separación familiar',
    ],
    destinations: ['Estados Unidos', 'España', 'México'],
    statistics: {
      emigrants: '800 mil hondureños en el exterior',
      remittances: '$8 mil millones USD anuales (25% del PIB)',
      topDestination: 'Estados Unidos (90% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'honduras_trivia',
      type: 'trivia',
      title: 'Honduras y sus Desafíos',
      description: 'Conoce la realidad hondureña',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué porcentaje de hondureños vive en pobreza?',
          options: ['30%', '40%', '60%', '80%'],
          correctAnswer: 2,
          explanation: 'Aproximadamente el 60% de la población hondureña vive en condiciones de pobreza.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el sitio arqueológico maya más importante de Honduras?',
          options: ['Tikal', 'Copán', 'Chichen Itzá', 'Uxmal'],
          correctAnswer: 1,
          explanation: 'Copán es el sitio maya más importante de Honduras, conocido por sus estelas talladas.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué representan las remesas en el PIB de Honduras?',
          options: ['10%', '15%', '25%', '35%'],
          correctAnswer: 2,
          explanation: 'Las remesas representan el 25% del PIB hondureño, vitales para la economía.',
          difficulty: 'hard',
        },
        {
          question: '¿En cuántos océanos tiene costa Honduras?',
          options: ['Ninguno', 'Uno', 'Dos', 'Tres'],
          correctAnswer: 2,
          explanation: 'Honduras tiene costa en el Océano Pacífico y el Mar Caribe (Atlántico).',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 120,
        experience: 100,
      },
    },
    {
      id: 'honduras_puzzle',
      type: 'puzzle',
      title: 'Copán Ruinas',
      description: 'Arma las antiguas ruinas mayas de Copán',
      difficulty: 'medium',
      imageUrl: 'copan_ruins.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
    {
      id: 'honduras_memory',
      type: 'memory',
      title: 'Cultura Hondureña',
      description: 'Encuentra parejas de símbolos hondureños',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '☕' }, // Café
        { id: 2, content: '🏛️' }, // Copán
        { id: 3, content: '🏝️' }, // Islas
        { id: 4, content: '🌴' }, // Palmeras
        { id: 5, content: '🌊' }, // Océanos
        { id: 6, content: '🦜' }, // Guacamaya
      ],
      rewards: {
        stars: 2,
        money: 80,
        experience: 60,
      },
    },
  ],

  requiredStats: {
    minMoney: 250,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'clandestino', 'refugiado'],

  unlockConditions: {
    previousCountries: ['guatemala'],
    minStars: 11,
  },
};

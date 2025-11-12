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
          question: '¿Cuál es el sitio arqueológico maya más importante de Honduras?',
          options: ['Tikal', 'Copán', 'Chichen Itzá', 'Uxmal'],
          correctAnswer: 1,
          explanation: 'Copán es el sitio maya más importante de Honduras, famoso por sus estelas talladas y su gran plaza ceremonial. Es Patrimonio de la Humanidad.',
          difficulty: 'easy',
        },
        {
          question: '¿En cuántos océanos tiene costa Honduras?',
          options: ['Ninguno', 'Uno', 'Dos', 'Tres'],
          correctAnswer: 2,
          explanation: 'Honduras es uno de los pocos países centroamericanos con costa en dos océanos: el Océano Pacífico y el Mar Caribe (Océano Atlántico).',
          difficulty: 'easy',
        },
        {
          question: '¿Qué producto hondureño es reconocido mundialmente?',
          options: ['El cacao', 'El café', 'El azúcar', 'El té'],
          correctAnswer: 1,
          explanation: 'El café hondureño es reconocido internacionalmente por su alta calidad. Honduras es uno de los principales exportadores de café en América Central.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje aproximado de hondureños vive en condiciones de pobreza?',
          options: ['30%', '40%', '60%', '80%'],
          correctAnswer: 2,
          explanation: 'Aproximadamente el 60% de la población hondureña vive en condiciones de pobreza. Esta es una de las principales razones por las que muchos hondureños emigran.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje del PIB hondureño representan las remesas enviadas desde el exterior?',
          options: ['10%', '15%', '25%', '35%'],
          correctAnswer: 2,
          explanation: 'Las remesas representan aproximadamente el 25% del PIB hondureño, lo que significa que son vitales para la economía del país. La mayoría viene de Estados Unidos.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos hondureños aproximadamente viven en el exterior?',
          options: ['200 mil', '500 mil', '800 mil', '1.5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 800 mil hondureños viven en el exterior, principalmente en Estados Unidos (90%). Muchos dejaron Honduras por la violencia y falta de oportunidades.',
          difficulty: 'hard',
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
        { id: 3, content: '🏝️' }, // Islas de la Bahía
        { id: 4, content: '🌴' }, // Palmeras
        { id: 5, content: '🌊' }, // Dos océanos
        { id: 6, content: '🦜' }, // Guacamaya
        { id: 7, content: '🌽' }, // Maíz
        { id: 8, content: '🎭' }, // Cultura garífuna
        { id: 9, content: '🐠' }, // Arrecifes de coral
        { id: 10, content: '🏔️' }, // Montañas
        { id: 11, content: '🌺' }, // Flores tropicales
        { id: 12, content: '🥥' }, // Coco
        { id: 13, content: '🦅' }, // Águila harpía
        { id: 14, content: '🏺' }, // Cerámica maya
        { id: 15, content: '🎶' }, // Música punta
        { id: 16, content: '🍌' }, // Banano
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

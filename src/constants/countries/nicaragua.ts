/**
 * Nicaragua - País 10
 */

import { Country } from './types';

export const nicaragua: Country = {
  id: 'nicaragua',
  name: 'Nicaragua',
  region: 'Central America',
  flag: '🇳🇮',
  coordinates: { latitude: 12.8654, longitude: -85.2072 },

  description: 'El país más grande de Centroamérica. Crisis política y económica ha generado olas migratorias recientes.',

  culturalFacts: [
    'Tierra de lagos y volcanes',
    'Granada es una de las ciudades coloniales más antiguas',
    'La poesía es parte fundamental de la cultura',
    'Rubén Darío es el poeta nacional',
  ],

  migrationContext: {
    reasons: [
      'Crisis política desde 2018',
      'Represión gubernamental',
      'Crisis económica severa',
      'Falta de libertades civiles',
    ],
    challenges: [
      'Solicitud de asilo político',
      'Persecución de opositores',
      'Economía en deterioro',
      'Exilio forzado',
    ],
    destinations: ['Costa Rica', 'Estados Unidos', 'España', 'Panamá'],
    statistics: {
      emigrants: '1.5 millones de nicaragüenses en el exterior',
      remittances: '$2 mil millones USD anuales',
      topDestination: 'Costa Rica (50% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'nicaragua_trivia',
      type: 'trivia',
      title: 'Nicaragua: Tierra de Lagos',
      description: 'Conoce Nicaragua',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Por qué se conoce a Nicaragua?',
          options: ['Tierra de montañas', 'Tierra de lagos y volcanes', 'Tierra de playas', 'Tierra de selvas'],
          correctAnswer: 1,
          explanation: 'Nicaragua es conocida como la tierra de lagos y volcanes por su geografía única.',
          difficulty: 'easy',
        },
        {
          question: '¿Quién es Rubén Darío?',
          options: ['Un presidente', 'Un poeta famoso', 'Un conquistador', 'Un volcán'],
          correctAnswer: 1,
          explanation: 'Rubén Darío es el poeta más importante de Nicaragua y padre del modernismo literario.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes nicaragüenses?',
          options: ['México', 'Costa Rica', 'Estados Unidos', 'España'],
          correctAnswer: 1,
          explanation: 'Costa Rica recibe el 50% de los emigrantes nicaragüenses debido a su proximidad.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué evento causó la reciente ola migratoria?',
          options: ['Terremoto', 'Crisis política de 2018', 'Huracán', 'Guerra'],
          correctAnswer: 1,
          explanation: 'La crisis política iniciada en 2018 generó una ola migratoria significativa.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 140,
        experience: 100,
      },
    },
    {
      id: 'nicaragua_puzzle',
      type: 'puzzle',
      title: 'Granada Colonial',
      description: 'Arma la hermosa ciudad colonial',
      difficulty: 'medium',
      imageUrl: 'granada_nicaragua.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
    {
      id: 'nicaragua_memory',
      type: 'memory',
      title: 'Símbolos Nicaragüenses',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🌋' },
        { id: 2, content: '🏞️' },
        { id: 3, content: '📚' },
        { id: 4, content: '🏛️' },
        { id: 5, content: '🌺' },
        { id: 6, content: '🦜' },
      ],
      rewards: {
        stars: 2,
        money: 80,
        experience: 60,
      },
    },
  ],

  requiredStats: {
    minMoney: 300,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo', 'refugiado'],

  unlockConditions: {
    previousCountries: ['elsalvador'],
    minStars: 17,
  },
};

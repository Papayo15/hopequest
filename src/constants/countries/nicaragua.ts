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
          question: '¿Por qué se conoce a Nicaragua como "tierra de lagos y volcanes"?',
          options: ['Por sus montañas', 'Por sus lagos y volcanes', 'Por sus playas', 'Por sus selvas'],
          correctAnswer: 1,
          explanation: 'Nicaragua tiene el lago Nicaragua (el más grande de Centroamérica) y numerosos volcanes activos, lo que le da este apodo especial.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es una de las ciudades coloniales más antiguas de América en Nicaragua?',
          options: ['Managua', 'Granada', 'León', 'Masaya'],
          correctAnswer: 1,
          explanation: 'Granada fue fundada en 1524 y es una de las ciudades coloniales españolas más antiguas de América. Su arquitectura colonial está muy bien conservada.',
          difficulty: 'easy',
        },
        {
          question: '¿Quién es Rubén Darío?',
          options: ['Un presidente', 'El poeta nacional', 'Un conquistador', 'Un músico'],
          correctAnswer: 1,
          explanation: 'Rubén Darío es el poeta más importante de Nicaragua y padre del modernismo literario en español. Es considerado el príncipe de las letras castellanas.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de los emigrantes nicaragüenses?',
          options: ['México', 'Costa Rica', 'Estados Unidos', 'España'],
          correctAnswer: 1,
          explanation: 'Costa Rica recibe aproximadamente el 50% de los emigrantes nicaragüenses debido a su proximidad geográfica y mejores condiciones económicas.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué evento en 2018 generó una nueva ola migratoria desde Nicaragua?',
          options: ['Un terremoto', 'La crisis política', 'Un huracán', 'Una guerra civil'],
          correctAnswer: 1,
          explanation: 'La crisis política iniciada en 2018 con represión gubernamental y falta de libertades civiles generó una ola migratoria significativa, especialmente de jóvenes y opositores políticos.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos nicaragüenses aproximadamente viven en el exterior?',
          options: ['500 mil', '1 millón', '1.5 millones', '2 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 1.5 millones de nicaragüenses viven en el exterior, principalmente en Costa Rica, Estados Unidos y España.',
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
        { id: 1, content: '🌋' }, // Volcanes activos
        { id: 2, content: '🏞️' }, // Lago Nicaragua
        { id: 3, content: '📚' }, // Rubén Darío (poesía)
        { id: 4, content: '🏛️' }, // Granada colonial
        { id: 5, content: '🌺' }, // Flor de sacuanjoche
        { id: 6, content: '🦜' }, // Guacamaya
        { id: 7, content: '🌴' }, // Palmeras
        { id: 8, content: '🎨' }, // Artesanías
        { id: 9, content: '☕' }, // Café nicaragüense
        { id: 10, content: '🦈' }, // Tiburones de agua dulce
        { id: 11, content: '🎭' }, // Teatro
        { id: 12, content: '🌊' }, // Dos océanos
        { id: 13, content: '🥭' }, // Frutas tropicales
        { id: 14, content: '🏖️' }, // Playas del Pacífico
        { id: 15, content: '🎶' }, // Música tradicional
        { id: 16, content: '🌽' }, // Maíz
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

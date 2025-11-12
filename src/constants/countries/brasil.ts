/**
 * Brasil - País 21
 */

import { Country } from './types';

export const brasil: Country = {
  id: 'brasil',
  name: 'Brasil',
  region: 'South America',
  flag: '🇧🇷',
  coordinates: { latitude: -14.235, longitude: -51.9253 },

  description: 'País más grande de Sudamérica. Idioma portugués. Destino y origen de migrantes.',

  culturalFacts: [
    'Amazonia: pulmón del mundo',
    'Carnaval de Río, el más famoso',
    'Fútbol y Pelé/Neymar',
    'Samba y bossa nova',
  ],

  migrationContext: {
    reasons: [
      'Desigualdad económica severa',
      'Violencia urbana',
      'Búsqueda de oportunidades',
      'Crisis política y corrupción',
    ],
    challenges: [
      'Xenofobia hacia venezolanos y bolivianos',
      'Economía inestable',
      'Inmigración ilegal',
      'Barreras de idioma (portugués)',
    ],
    destinations: ['Estados Unidos', 'Japón', 'Portugal', 'España', 'Reino Unido'],
    statistics: {
      emigrants: '4 millones de brasileños en el exterior',
      immigrants: '1.3 millones de inmigrantes en Brasil',
      topDestination: 'Estados Unidos (principal destino)',
    },
  },

  activities: [
    {
      id: 'brasil_trivia',
      type: 'trivia',
      title: 'Gigante de Sudamérica',
      description: 'Conoce Brasil',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué idioma se habla en Brasil?',
          options: ['Español', 'Portugués', 'Inglés', 'Francés'],
          correctAnswer: 1,
          explanation: 'Brasil es el único país de Sudamérica que habla portugués, herencia de la colonización portuguesa que comenzó en 1500.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué selva importante está en Brasil?',
          options: ['Congo', 'Amazonía', 'Taiga', 'Borneo'],
          correctAnswer: 1,
          explanation: 'La Amazonía brasileña es la selva tropical más grande del mundo y produce el 20% del oxígeno de la Tierra.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos brasileños viven en el exterior?',
          options: ['1 millón', '2 millones', '4 millones', '8 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 4 millones de brasileños viven fuera del país, principalmente en Estados Unidos, Japón y Portugal.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué música se originó en Brasil?',
          options: ['Tango', 'Salsa', 'Samba', 'Merengue'],
          correctAnswer: 2,
          explanation: 'La samba es el género musical más icónico de Brasil, nacido en Río de Janeiro y tocado en el famoso Carnaval.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el principal destino de los brasileños que emigran?',
          options: ['Argentina', 'Estados Unidos', 'España', 'Francia'],
          correctAnswer: 1,
          explanation: 'Estados Unidos es el principal destino de emigrantes brasileños, seguido de Japón y Portugal.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos inmigrantes viven en Brasil?',
          options: ['500 mil', '1.3 millones', '3 millones', '5 millones'],
          correctAnswer: 1,
          explanation: 'Brasil acoge aproximadamente 1.3 millones de inmigrantes, principalmente de Venezuela, Bolivia y Haití.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 180,
        experience: 120,
      },
    },
    {
      id: 'brasil_puzzle',
      type: 'puzzle',
      title: 'Cristo Redentor',
      description: 'Arma el ícono de Río',
      difficulty: 'medium',
      imageUrl: 'cristo_redentor.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 130,
        experience: 95,
      },
    },
    {
      id: 'brasil_memory',
      type: 'memory',
      title: 'Cultura Brasileña',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      maxPairs: 16,
      pairs: [
        { id: 1, content: '⚽' },
        { id: 2, content: '🎭' },
        { id: 3, content: '🎵' },
        { id: 4, content: '🌴' },
        { id: 5, content: '🏖️' },
        { id: 6, content: '🦜' },
        { id: 7, content: '☕' },
        { id: 8, content: '🌺' },
        { id: 9, content: '🥁' },
        { id: 10, content: '🏟️' },
        { id: 11, content: '🗿' },
        { id: 12, content: '🍹' },
        { id: 13, content: '🐆' },
        { id: 14, content: '🌊' },
        { id: 15, content: '🎪' },
        { id: 16, content: '🏆' },
      ],
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
  ],

  requiredStats: {
    minMoney: 520,
    minHealth: 75,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['argentina'],
    minStars: 50,
  },
};

/**
 * Portugal - País 26
 */

import { Country } from './types';

export const portugal: Country = {
  id: 'portugal',
  name: 'Portugal',
  region: 'Europe',
  flag: '🇵🇹',
  coordinates: { latitude: 39.3999, longitude: -8.2245 },

  description: 'País ibérico con conexiones históricas con Brasil. Destino de brasileños y africanos lusófonos.',

  culturalFacts: [
    'Idioma portugués hablado por 250 millones',
    'Fado, música tradicional melancólica',
    'Era de los descubrimientos (siglo XV-XVI)',
    'Pastéis de nata, dulce icónico',
  ],

  migrationContext: {
    reasons: [
      'Puerta de entrada a la Unión Europea',
      'Idioma compartido con Brasil',
      'Economía en crecimiento',
      'Visa para nómadas digitales',
    ],
    challenges: [
      'Costo de vida en Lisboa subiendo',
      'Saturación de vivienda',
      'Salarios bajos comparados con Europa',
      'Xenofobia hacia africanos',
    ],
    destinations: ['Francia', 'Suiza', 'Reino Unido', 'Luxemburgo'],
    statistics: {
      emigrants: '2.3 millones de portugueses en el exterior',
      immigrants: '600 mil inmigrantes en Portugal',
      topOrigin: 'Brasil (mayor comunidad inmigrante)',
    },
  },

  activities: [
    {
      id: 'portugal_trivia',
      type: 'trivia',
      title: 'Tierra del Fado',
      description: 'Descubre Portugal',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuántas personas hablan portugués en el mundo?',
          options: ['50 millones', '150 millones', '250 millones', '500 millones'],
          correctAnswer: 2,
          explanation: 'El portugués es hablado por aproximadamente 250 millones de personas.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué es el fado?',
          options: ['Una danza', 'Un género musical', 'Una comida', 'Un festival'],
          correctAnswer: 1,
          explanation: 'El fado es un género musical tradicional portugués melancólico.',
          difficulty: 'easy',
        },
        {
          question: '¿De dónde proviene la mayoría de inmigrantes en Portugal?',
          options: ['Angola', 'Brasil', 'Cabo Verde', 'Mozambique'],
          correctAnswer: 1,
          explanation: 'Brasil tiene la mayor comunidad de inmigrantes en Portugal.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué dulce es típico portugués?',
          options: ['Churros', 'Pastéis de nata', 'Alfajores', 'Cannoli'],
          correctAnswer: 1,
          explanation: 'Los pastéis de nata son el dulce más icónico de Portugal.',
          difficulty: 'easy',
        },
      ],
      rewards: {
        stars: 3,
        money: 200,
        experience: 130,
      },
    },
    {
      id: 'portugal_puzzle',
      type: 'puzzle',
      title: 'Torre de Belém',
      description: 'Arma el monumento de Lisboa',
      difficulty: 'medium',
      imageUrl: 'belem_tower.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 150,
        experience: 100,
      },
    },
    {
      id: 'portugal_memory',
      type: 'memory',
      title: 'Cultura Portuguesa',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' },
        { id: 2, content: '🏰' },
        { id: 3, content: '🚃' },
        { id: 4, content: '🌊' },
        { id: 5, content: '⚽' },
        { id: 6, content: '🍷' },
      ],
      rewards: {
        stars: 2,
        money: 130,
        experience: 90,
      },
    },
  ],

  requiredStats: {
    minMoney: 800,
    minHealth: 80,
    minMoral: 75,
    requiredDocuments: ['passport', 'visa', 'work_permit'],
  },

  availablePortals: ['aereo', 'maritimo'],

  unlockConditions: {
    previousCountries: ['espana'],
    minStars: 62,
  },
};

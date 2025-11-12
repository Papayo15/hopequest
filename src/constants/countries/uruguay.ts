/**
 * Uruguay - País 22
 */

import { Country } from './types';

export const uruguay: Country = {
  id: 'uruguay',
  name: 'Uruguay',
  region: 'South America',
  flag: '🇺🇾',
  coordinates: { latitude: -32.5228, longitude: -55.7658 },

  description: 'País pequeño y estable. Alta calidad de vida. Origen y destino migratorio.',

  culturalFacts: [
    'País más estable de Sudamérica',
    'Mate, bebida nacional',
    'Tango también parte de su cultura',
    'Punta del Este, balneario famoso',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de mejor economía',
      'Reunificación familiar',
      'Pequeño mercado laboral',
      'Atracción por Europa',
    ],
    challenges: [
      'Población pequeña (3.5 millones)',
      'Fuga de talentos',
      'Recibe argentinos por crisis',
      'Salarios profesionales bajos',
    ],
    destinations: ['España', 'Argentina', 'Estados Unidos', 'Italia'],
    statistics: {
      emigrants: '500 mil uruguayos en el exterior',
      immigrants: '150 mil inmigrantes en Uruguay',
      topDestination: 'Argentina (principal destino histórico)',
    },
  },

  activities: [
    {
      id: 'uruguay_trivia',
      type: 'trivia',
      title: 'La Suiza de América',
      description: 'Descubre Uruguay',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Cuál es la bebida nacional de Uruguay?',
          options: ['Café', 'Mate', 'Té', 'Chicha'],
          correctAnswer: 1,
          explanation: 'El mate es la bebida nacional, compartida con Argentina y Paraguay.',
          difficulty: 'easy',
        },
        {
          question: '¿Por qué es famoso Punta del Este?',
          options: ['Industria', 'Balneario de lujo', 'Puerto comercial', 'Agricultura'],
          correctAnswer: 1,
          explanation: 'Punta del Este es el balneario más exclusivo de Sudamérica.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos habitantes tiene aproximadamente Uruguay?',
          options: ['1.5 millones', '3.5 millones', '10 millones', '20 millones'],
          correctAnswer: 1,
          explanation: 'Uruguay tiene aproximadamente 3.5 millones de habitantes.',
          difficulty: 'medium',
        },
        {
          question: '¿Por qué se le llama "Suiza de América"?',
          options: ['Por sus montañas', 'Por su estabilidad y calidad de vida', 'Por su chocolate', 'Por sus bancos'],
          correctAnswer: 1,
          explanation: 'Se le llama así por su estabilidad política y social.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 100,
      },
    },
    {
      id: 'uruguay_puzzle',
      type: 'puzzle',
      title: 'Montevideo',
      description: 'Arma la capital uruguaya',
      difficulty: 'easy',
      imageUrl: 'montevideo.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
    {
      id: 'uruguay_memory',
      type: 'memory',
      title: 'Cultura Uruguaya',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🧉' },
        { id: 2, content: '⚽' },
        { id: 3, content: '🏖️' },
        { id: 4, content: '🌊' },
        { id: 5, content: '🏛️' },
      ],
      rewards: {
        stars: 2,
        money: 90,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 550,
    minHealth: 80,
    minMoral: 70,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['brasil'],
    minStars: 53,
  },
};

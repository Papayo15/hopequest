/**
 * Francia - País 27
 */

import { Country } from './types';

export const francia: Country = {
  id: 'francia',
  name: 'Francia',
  region: 'Europe',
  flag: '🇫🇷',
  coordinates: { latitude: 46.2276, longitude: 2.2137 },

  description: 'Potencia europea con larga historia de inmigración de excolonias africanas y latinoamericanas.',

  culturalFacts: [
    'Ciudad de la luz: París',
    'Torre Eiffel, símbolo mundial',
    'Gastronomía reconocida como Patrimonio',
    'Idioma francés hablado en 5 continentes',
  ],

  migrationContext: {
    reasons: [
      'Conexión con excolonias (África, Caribe)',
      'Sistema de salud y educación',
      'Oportunidades laborales',
      'Reunificación familiar',
    ],
    challenges: [
      'Racismo y xenofobia',
      'Discriminación en empleo y vivienda',
      'Barreras de idioma',
      'Tensiones con comunidades musulmanas',
    ],
    destinations: ['Bélgica', 'Suiza', 'España', 'Canadá'],
    statistics: {
      emigrants: '2.5 millones de franceses en el exterior',
      immigrants: '8 millones de inmigrantes en Francia',
      topOrigin: 'Argelia, Marruecos, Portugal (principales orígenes)',
    },
  },

  activities: [
    {
      id: 'francia_trivia',
      type: 'trivia',
      title: 'La República Francesa',
      description: 'Conoce Francia',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuál es el lema de Francia?',
          options: ['Unidad y Fuerza', 'Libertad, Igualdad, Fraternidad', 'Dios y Patria', 'Orden y Progreso'],
          correctAnswer: 1,
          explanation: 'Liberté, Égalité, Fraternité es el lema de la República Francesa desde la Revolución de 1789.',
          difficulty: 'easy',
        },
        {
          question: '¿En cuántos continentes se habla francés?',
          options: ['2', '3', '5', '6'],
          correctAnswer: 2,
          explanation: 'El francés se habla en 5 continentes (Europa, África, América, Asia y Oceanía), herencia del imperio colonial francés.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos inmigrantes viven en Francia?',
          options: ['2 millones', '5 millones', '8 millones', '12 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 8 millones de inmigrantes viven en Francia, representando cerca del 12% de la población.',
          difficulty: 'hard',
        },
        {
          question: '¿De dónde provienen la mayoría de inmigrantes?',
          options: ['África del Norte', 'América Latina', 'Asia del Este', 'Europa del Este'],
          correctAnswer: 0,
          explanation: 'La mayoría proviene del Norte de África, especialmente Argelia y Marruecos, por conexiones coloniales históricas.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué monumento es el símbolo más famoso de París?',
          options: ['Arco del Triunfo', 'Torre Eiffel', 'Louvre', 'Notre Dame'],
          correctAnswer: 1,
          explanation: 'La Torre Eiffel es el monumento más visitado del mundo con más de 7 millones de visitantes anuales.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos franceses viven en el exterior?',
          options: ['1 millón', '2.5 millones', '5 millones', '10 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 2.5 millones de franceses viven en el exterior, principalmente en Bélgica, Suiza y Canadá.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 220,
        experience: 140,
      },
    },
    {
      id: 'francia_puzzle',
      type: 'puzzle',
      title: 'Torre Eiffel',
      description: 'Arma el ícono parisino',
      difficulty: 'hard',
      imageUrl: 'eiffel_tower.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 180,
        experience: 120,
      },
    },
    {
      id: 'francia_memory',
      type: 'memory',
      title: 'Cultura Francesa',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      maxPairs: 16,
      pairs: [
        { id: 1, content: '🗼' },
        { id: 2, content: '🥐' },
        { id: 3, content: '🍷' },
        { id: 4, content: '🎨' },
        { id: 5, content: '🏛️' },
        { id: 6, content: '⚽' },
        { id: 7, content: '🧀' },
        { id: 8, content: '🥖' },
        { id: 9, content: '👗' },
        { id: 10, content: '💄' },
        { id: 11, content: '🎭' },
        { id: 12, content: '🏰' },
        { id: 13, content: '🍾' },
        { id: 14, content: '🎬' },
        { id: 15, content: '🌹' },
        { id: 16, content: '🎪' },
      ],
      rewards: {
        stars: 2,
        money: 150,
        experience: 100,
      },
    },
  ],

  requiredStats: {
    minMoney: 900,
    minHealth: 85,
    minMoral: 80,
    requiredDocuments: ['passport', 'visa', 'work_permit'],
  },

  availablePortals: ['aereo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['espana'],
    minStars: 65,
  },
};

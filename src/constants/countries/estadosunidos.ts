/**
 * Estados Unidos - País 5
 */

import { Country } from './types';

export const estadosunidos: Country = {
  id: 'estadosunidos',
  name: 'Estados Unidos',
  region: 'North America',
  flag: '🇺🇸',
  coordinates: { latitude: 37.0902, longitude: -95.7129 },
  description: 'País de inmigrantes. Destino soñado de millones.',
  culturalFacts: [
    'Estatua de la Libertad, símbolo de inmigración',
    'Nueva York, ciudad más diversa',
    'Hollywood y la cultura pop',
    'Silicon Valley y tecnología',
  ],
  migrationContext: {
    reasons: ['Oportunidades económicas', 'Reunificación familiar', 'Asilo político', 'Educación'],
    challenges: ['Políticas antiinmigrantes', 'ICE y deportaciones', 'Muro fronterizo', 'Discriminación'],
    destinations: ['Retorno a país de origen', 'Canadá', 'España'],
    statistics: { immigrants: '50 millones de inmigrantes', topOrigin: 'México (24% de inmigrantes)' },
  },
  activities: [
    {
      id: 'usa_trivia',
      type: 'trivia',
      title: 'Tierra de Oportunidades',
      description: 'Conoce Estados Unidos',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué simboliza la Estatua de la Libertad?',
          options: ['Guerra', 'Inmigración y libertad', 'Riqueza', 'Poder'],
          correctAnswer: 1,
          explanation: 'La Estatua de la Libertad recibió a millones de inmigrantes en Ellis Island.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos inmigrantes viven en EE.UU.?',
          options: ['20 millones', '30 millones', '50 millones', '100 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 50 millones de inmigrantes viven en Estados Unidos.',
          difficulty: 'hard',
        },
      ],
      rewards: { stars: 3, money: 150, experience: 100 },
    },
    {
      id: 'usa_puzzle',
      type: 'puzzle',
      title: 'Estatua de la Libertad',
      description: 'Arma el símbolo de esperanza',
      difficulty: 'medium',
      imageUrl: 'statue_of_liberty.jpg',
      gridSize: 4,
      rewards: { stars: 2, money: 120, experience: 85 },
    },
    {
      id: 'usa_memory',
      type: 'memory',
      title: 'Cultura Americana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🗽' },
        { id: 2, content: '🍔' },
        { id: 3, content: '🏈' },
        { id: 4, content: '🎬' },
        { id: 5, content: '🚀' },
        { id: 6, content: '🗺️' },
      ],
      rewards: { stars: 2, money: 100, experience: 75 },
    },
  ],
  requiredStats: {
    minMoney: 600,
    minHealth: 75,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },
  availablePortals: ['aereo', 'terrestre', 'clandestino'],
  unlockConditions: {
    previousCountries: ['mexico'],
    minStars: 11,
  },
};

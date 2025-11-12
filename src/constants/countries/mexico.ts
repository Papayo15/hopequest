/**
 * México - País 4
 */

import { Country } from './types';

export const mexico: Country = {
  id: 'mexico',
  name: 'México',
  region: 'North America',
  flag: '🇲🇽',
  coordinates: { latitude: 23.6345, longitude: -102.5528 },
  description: 'País puente entre América Latina y Estados Unidos. Cultura milenaria.',
  culturalFacts: [
    'Civilizaciones mayas y aztecas',
    'Día de Muertos Patrimonio de la Humanidad',
    'Tacos, origen de comida mexicana',
    'Frida Kahlo y Diego Rivera',
  ],
  migrationContext: {
    reasons: ['País de tránsito masivo', 'Frontera con EE.UU.', 'Ruta de caravanas migrantes'],
    challenges: ['Violencia del crimen organizado', 'Detenciones migratorias', 'Muros y vigilancia'],
    destinations: ['Estados Unidos', 'Canadá', 'España'],
    statistics: { emigrants: '12 millones de mexicanos en EE.UU.', topDestination: 'Estados Unidos (97%)' },
  },
  activities: [
    {
      id: 'mexico_trivia',
      type: 'trivia',
      title: 'México Lindo',
      description: 'Conoce México',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Qué civilizaciones antiguas vivieron en México?',
          options: ['Incas', 'Mayas y Aztecas', 'Vikingos', 'Romanos'],
          correctAnswer: 1,
          explanation: 'Los mayas y aztecas construyeron grandes ciudades en México.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos mexicanos viven en Estados Unidos?',
          options: ['5 millones', '12 millones', '20 millones', '30 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 12 millones de mexicanos viven en EE.UU.',
          difficulty: 'medium',
        },
      ],
      rewards: { stars: 3, money: 120, experience: 80 },
    },
    {
      id: 'mexico_puzzle',
      type: 'puzzle',
      title: 'Chichen Itzá',
      description: 'Arma la pirámide maya',
      difficulty: 'medium',
      imageUrl: 'chichen_itza.jpg',
      gridSize: 4,
      rewards: { stars: 2, money: 100, experience: 70 },
    },
    {
      id: 'mexico_memory',
      type: 'memory',
      title: 'Cultura Mexicana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🌮' },
        { id: 2, content: '🏺' },
        { id: 3, content: '💀' },
        { id: 4, content: '🎺' },
        { id: 5, content: '🌶️' },
        { id: 6, content: '🦅' },
      ],
      rewards: { stars: 2, money: 80, experience: 60 },
    },
  ],
  requiredStats: {
    minMoney: 300,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },
  availablePortals: ['terrestre', 'aereo', 'clandestino'],
  unlockConditions: {
    previousCountries: ['panama'],
    minStars: 8,
  },
};

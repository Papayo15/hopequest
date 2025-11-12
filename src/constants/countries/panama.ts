/**
 * Panamá - País 3
 */

import { Country } from './types';

export const panama: Country = {
  id: 'panama',
  name: 'Panamá',
  region: 'Central America',
  flag: '🇵🇦',
  coordinates: { latitude: 8.538, longitude: -80.7821 },
  description: 'Puente entre dos océanos y dos continentes.',
  culturalFacts: [
    'Canal de Panamá conecta Atlántico y Pacífico',
    'Casco Viejo colonial Patrimonio de la Humanidad',
    'Primera línea transcontinental del mundo',
    'Dolarizado desde 1904',
  ],
  migrationContext: {
    reasons: ['País de tránsito hacia el norte', 'Hub de conexiones', 'Economía dolarizada'],
    challenges: ['Selva del Darién peligrosa', 'Tráfico de personas', 'Costos elevados'],
    destinations: ['Estados Unidos', 'España', 'Costa Rica'],
    statistics: { emigrants: '130 mil panameños fuera', topDestination: 'Estados Unidos' },
  },
  activities: [
    {
      id: 'panama_trivia',
      type: 'trivia',
      title: 'Puente del Mundo',
      description: 'Aprende sobre Panamá',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué conecta el Canal de Panamá?',
          options: ['Dos ríos', 'Dos océanos', 'Dos lagos', 'Dos países'],
          correctAnswer: 1,
          explanation: 'Conecta el Océano Atlántico con el Pacífico.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué selva peligrosa cruzan migrantes?',
          options: ['Amazonía', 'Darién', 'Congo', 'Borneo'],
          correctAnswer: 1,
          explanation: 'El Darién es una de las rutas más peligrosas.',
          difficulty: 'medium',
        },
      ],
      rewards: { stars: 2, money: 100, experience: 70 },
    },
    {
      id: 'panama_puzzle',
      type: 'puzzle',
      title: 'Canal de Panamá',
      description: 'Arma la maravilla de ingeniería',
      difficulty: 'medium',
      imageUrl: 'panama_canal.jpg',
      gridSize: 4,
      rewards: { stars: 2, money: 90, experience: 65 },
    },
    {
      id: 'panama_memory',
      type: 'memory',
      title: 'Símbolos Panameños',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🚢' },
        { id: 2, content: '🏛️' },
        { id: 3, content: '🌴' },
        { id: 4, content: '🦜' },
        { id: 5, content: '🌊' },
      ],
      rewards: { stars: 2, money: 70, experience: 55 },
    },
  ],
  requiredStats: {
    minMoney: 200,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },
  availablePortals: ['terrestre', 'aereo', 'maritimo', 'clandestino'],
  unlockConditions: {
    previousCountries: ['colombia'],
    minStars: 5,
  },
};

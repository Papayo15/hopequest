/**
 * Costa Rica - País 11
 */

import { Country } from './types';

export const costarica: Country = {
  id: 'costarica',
  name: 'Costa Rica',
  region: 'Central America',
  flag: '🇨🇷',
  coordinates: { latitude: 9.7489, longitude: -83.7534 },

  description: 'País conocido por su estabilidad democrática y conservación ambiental. Destino y tránsito migratorio.',

  culturalFacts: [
    'No tiene ejército desde 1948',
    '25% del territorio son áreas protegidas',
    'Pura Vida es la frase nacional',
    'Líder en energía renovable',
  ],

  migrationContext: {
    reasons: [
      'País de tránsito hacia Panamá y Estados Unidos',
      'Destino para nicaragüenses y venezolanos',
      'Economía relativamente estable',
      'Sistema de salud público',
    ],
    challenges: [
      'Xenofobia hacia migrantes',
      'Saturación de servicios públicos',
      'Requisitos migratorios estrictos',
      'Costo de vida elevado',
    ],
    destinations: ['Estados Unidos', 'España', 'Canadá'],
    statistics: {
      emigrants: '150 mil costarricenses en el exterior',
      immigrants: '500 mil inmigrantes en Costa Rica (10% población)',
      topOrigin: 'Nicaragua (principal origen de inmigrantes)',
    },
  },

  activities: [
    {
      id: 'costarica_trivia',
      type: 'trivia',
      title: 'Pura Vida',
      description: 'Descubre Costa Rica',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Desde cuándo Costa Rica no tiene ejército?',
          options: ['1848', '1948', '2000', '1900'],
          correctAnswer: 1,
          explanation: 'Costa Rica abolió el ejército en 1948, siendo uno de los pocos países sin fuerzas armadas.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje del territorio son áreas protegidas?',
          options: ['10%', '25%', '50%', '75%'],
          correctAnswer: 1,
          explanation: 'El 25% del territorio costarricense está protegido, líder en conservación.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué significa "Pura Vida"?',
          options: ['Buena suerte', 'Filosofía de vida positiva', 'Adiós', 'Bienvenido'],
          correctAnswer: 1,
          explanation: 'Pura Vida es más que una frase, es una filosofía de vida positiva y relajada.',
          difficulty: 'easy',
        },
        {
          question: '¿De dónde provienen la mayoría de inmigrantes en Costa Rica?',
          options: ['Venezuela', 'Nicaragua', 'Colombia', 'Honduras'],
          correctAnswer: 1,
          explanation: 'Nicaragua es el principal país de origen de inmigrantes en Costa Rica.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 160,
        experience: 110,
      },
    },
    {
      id: 'costarica_puzzle',
      type: 'puzzle',
      title: 'Biodiversidad Tica',
      description: 'Arma la selva tropical',
      difficulty: 'medium',
      imageUrl: 'costarica_rainforest.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
    {
      id: 'costarica_memory',
      type: 'memory',
      title: 'Flora y Fauna',
      description: 'Encuentra parejas de animales',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🦥' },
        { id: 2, content: '🦜' },
        { id: 3, content: '🐸' },
        { id: 4, content: '🦋' },
        { id: 5, content: '🌴' },
        { id: 6, content: '🌊' },
      ],
      rewards: {
        stars: 2,
        money: 90,
        experience: 65,
      },
    },
  ],

  requiredStats: {
    minMoney: 400,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['nicaragua'],
    minStars: 20,
  },
};

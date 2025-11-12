/**
 * Perú - País 17
 */

import { Country } from './types';

export const peru: Country = {
  id: 'peru',
  name: 'Perú',
  region: 'South America',
  flag: '🇵🇪',
  coordinates: { latitude: -9.19, longitude: -75.0152 },

  description: 'Cuna del Imperio Inca. Rica herencia cultural y migración hacia Chile, Argentina y España.',

  culturalFacts: [
    'Machu Picchu, una de las 7 maravillas modernas',
    'Gastronomía reconocida mundialmente',
    'Idiomas: Español, quechua, aymara',
    'Líneas de Nazca, misterio arqueológico',
  ],

  migrationContext: {
    reasons: [
      'Crisis económica de los 80-90',
      'Terrorismo (Sendero Luminoso)',
      'Desempleo profesional',
      'Búsqueda de estudios superiores',
    ],
    challenges: [
      'Xenofobia en Chile y Argentina',
      'Subvaloración profesional',
      'Explotación laboral',
      'Discriminación',
    ],
    destinations: ['Estados Unidos', 'España', 'Chile', 'Argentina', 'Italia'],
    statistics: {
      emigrants: '3 millones de peruanos en el exterior',
      remittances: '$3.7 mil millones USD',
      topDestination: 'Estados Unidos (30% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'peru_trivia',
      type: 'trivia',
      title: 'Imperio Inca',
      description: 'Conoce el Perú',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Dónde está Machu Picchu?',
          options: ['Chile', 'Perú', 'Bolivia', 'Ecuador'],
          correctAnswer: 1,
          explanation: 'Machu Picchu está en Perú, es una antigua ciudad inca en los Andes.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos idiomas oficiales tiene Perú?',
          options: ['1', '2', '3', 'Más de 3'],
          correctAnswer: 3,
          explanation: 'Perú tiene español, quechua, aymara y otras lenguas oficiales.',
          difficulty: 'medium',
        },
        {
          question: '¿Por qué es famosa la gastronomía peruana?',
          options: ['Por ser picante', 'Por su diversidad y fusión', 'Por ser vegetariana', 'Por usar pescado'],
          correctAnswer: 1,
          explanation: 'La gastronomía peruana es reconocida por su increíble diversidad y fusión de culturas.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos peruanos viven en el exterior?',
          options: ['1 millón', '2 millones', '3 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 3 millones de peruanos viven fuera del país.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 110,
      },
    },
    {
      id: 'peru_puzzle',
      type: 'puzzle',
      title: 'Machu Picchu',
      description: 'Arma la maravilla inca',
      difficulty: 'hard',
      imageUrl: 'machu_picchu.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'peru_memory',
      type: 'memory',
      title: 'Cultura Peruana',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🏔️' },
        { id: 2, content: '🦙' },
        { id: 3, content: '🏛️' },
        { id: 4, content: '🍴' },
        { id: 5, content: '🎭' },
        { id: 6, content: '🌄' },
        { id: 7, content: '🦜' },
      ],
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
  ],

  requiredStats: {
    minMoney: 450,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['ecuador'],
    minStars: 38,
  },
};

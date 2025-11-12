/**
 * Colombia - País 2
 */

import { Country } from './types';

export const colombia: Country = {
  id: 'colombia',
  name: 'Colombia',
  region: 'South America',
  flag: '🇨🇴',
  coordinates: { latitude: 4.5709, longitude: -74.2973 },

  description: 'Primer destino de venezolanos. País cafetero y diverso. Aquí conoces a tu compañero de viaje.',

  culturalFacts: [
    'Café colombiano de fama mundial',
    'Cartagena, ciudad amurallada colonial',
    'Shakira y la cumbia',
    'Biodiversidad: segundo país más biodiverso',
  ],

  migrationContext: {
    reasons: [
      'País receptor de 2.5 millones de venezolanos',
      'Frontera compartida facilita llegada',
      'Oportunidades laborales',
      'Solidaridad inicial',
    ],
    challenges: [
      'Xenofobia creciente',
      'Saturación de servicios',
      'Explotación laboral',
      'Regularización difícil',
    ],
    destinations: ['Estados Unidos', 'España', 'Chile', 'Ecuador'],
    statistics: {
      emigrants: '5 millones de colombianos en el exterior',
      immigrants: '2.5 millones de venezolanos en Colombia',
      topDestination: 'Estados Unidos (mayor destino colombiano)',
    },
  },

  activities: [
    {
      id: 'colombia_trivia',
      type: 'trivia',
      title: 'Colombia Tierra Querida',
      description: 'Aprende sobre Colombia',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Por qué es famoso el café de Colombia en el mundo?',
          options: ['Por su color', 'Por su calidad y sabor', 'Por ser barato', 'Por su tamaño'],
          correctAnswer: 1,
          explanation: 'El café colombiano es considerado uno de los mejores del mundo por su suave sabor y alta calidad. Las montañas colombianas tienen el clima perfecto para cultivar café.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué ciudad colombiana tiene murallas coloniales famosas?',
          options: ['Bogotá', 'Medellín', 'Cartagena', 'Cali'],
          correctAnswer: 2,
          explanation: 'Cartagena de Indias es una ciudad amurallada en la costa caribeña de Colombia. Sus murallas fueron construidas en el siglo XVI para proteger la ciudad de piratas.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué cantante colombiana es famosa mundialmente?',
          options: ['Madonna', 'Shakira', 'Beyoncé', 'Adele'],
          correctAnswer: 1,
          explanation: 'Shakira es la cantante colombiana más famosa del mundo, conocida por éxitos como "Hips Don\'t Lie" y "Waka Waka". También es famosa la cumbia, un ritmo colombiano.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos venezolanos aproximadamente viven en Colombia?',
          options: ['500 mil', '1 millón', '2.5 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Colombia acoge aproximadamente 2.5 millones de venezolanos que dejaron su país por la crisis económica y política. Colombia ha sido generoso abriendo sus fronteras.',
          difficulty: 'medium',
        },
        {
          question: '¿En qué posición está Colombia en biodiversidad mundial?',
          options: ['Primera', 'Segunda', 'Quinta', 'Décima'],
          correctAnswer: 1,
          explanation: 'Colombia es el segundo país más biodiverso del mundo, después de Brasil. Tiene una increíble variedad de plantas, animales, aves y ecosistemas desde playas hasta montañas.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos colombianos aproximadamente viven en el exterior?',
          options: ['1 millón', '3 millones', '5 millones', '7 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 5 millones de colombianos viven en el exterior, principalmente en Estados Unidos, España, Venezuela, Ecuador y Chile, buscando mejores oportunidades.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 2,
        money: 80,
        experience: 60,
      },
    },
    {
      id: 'colombia_puzzle',
      type: 'puzzle',
      title: 'Cartagena Colonial',
      description: 'Arma la ciudad amurallada',
      difficulty: 'easy',
      imageUrl: 'cartagena.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 70,
        experience: 50,
      },
    },
    {
      id: 'colombia_memory',
      type: 'memory',
      title: 'Cultura Colombiana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '☕' },
        { id: 2, content: '🏰' },
        { id: 3, content: '🎵' },
        { id: 4, content: '⚽' },
        { id: 5, content: '🦜' },
        { id: 6, content: '🌺' },
        { id: 7, content: '🏔️' },
        { id: 8, content: '🎭' },
        { id: 9, content: '🌴' },
        { id: 10, content: '💃' },
        { id: 11, content: '🎸' },
        { id: 12, content: '🌊' },
        { id: 13, content: '🍌' },
        { id: 14, content: '💚' },
        { id: 15, content: '🦋' },
        { id: 16, content: '🏖️' },
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 60,
        experience: 50,
      },
    },
  ],

  requiredStats: {
    minMoney: 100,
    minHealth: 80,
    minMoral: 70,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo', 'clandestino'],

  unlockConditions: {
    previousCountries: ['venezuela'],
    minStars: 2,
  },

  specialEvent: {
    type: 'companion_discovery',
    character: 'companion',
    description: 'Aquí conoces a tu compañero de viaje (Pepe o Paula según tu elección)',
  },
};

/**
 * República Dominicana - País 14
 */

import { Country } from './types';

export const republicadominicana: Country = {
  id: 'republicadominicana',
  name: 'República Dominicana',
  region: 'Caribbean',
  flag: '🇩🇴',
  coordinates: { latitude: 18.7357, longitude: -70.1627 },

  description: 'Comparte la isla con Haití. Destino turístico y país de emigración e inmigración simultánea.',

  culturalFacts: [
    'Cuna del merengue y la bachata',
    'Primera ciudad europea en América: Santo Domingo (1496)',
    'Paraíso del béisbol - muchos jugadores en MLB',
    'Playas paradisíacas del Caribe',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de mejores oportunidades',
      'Reunificación familiar en Estados Unidos',
      'Crisis económicas periódicas',
      'Destino de haitianos (750 mil)',
    ],
    challenges: [
      'Discriminación de dominicanos en el exterior',
      'Conflictos con inmigración haitiana',
      'Trata de personas',
      'Deportaciones desde EE.UU.',
    ],
    destinations: ['Estados Unidos', 'España', 'Italia', 'Suiza'],
    statistics: {
      emigrants: '2 millones de dominicanos en el exterior',
      remittances: '$8 mil millones USD (8% del PIB)',
      topDestination: 'Estados Unidos (Nueva York, Miami)',
    },
  },

  activities: [
    {
      id: 'republicadominicana_trivia',
      type: 'trivia',
      title: 'Quisqueya la Bella',
      description: 'Descubre República Dominicana',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué música se originó en República Dominicana?',
          options: ['Salsa', 'Merengue y Bachata', 'Reggaeton', 'Cumbia'],
          correctAnswer: 1,
          explanation: 'El merengue y la bachata son géneros musicales originarios de República Dominicana. El merengue es el baile nacional y la bachata ha ganado popularidad mundial.',
          difficulty: 'easy',
        },
        {
          question: '¿Por qué deporte es famosa la República Dominicana?',
          options: ['Fútbol', 'Béisbol', 'Boxeo', 'Baloncesto'],
          correctAnswer: 1,
          explanation: 'República Dominicana es una potencia del béisbol, con cientos de jugadores en las Grandes Ligas (MLB). El béisbol es prácticamente una religión nacional.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál fue la primera ciudad europea en América?',
          options: ['La Habana', 'Cartagena', 'Santo Domingo', 'San Juan'],
          correctAnswer: 2,
          explanation: 'Santo Domingo, fundada en 1496 por Bartolomé Colón, fue la primera ciudad europea permanente en América. Su zona colonial es Patrimonio de la Humanidad.',
          difficulty: 'medium',
        },
        {
          question: '¿Con qué país comparte República Dominicana la isla La Española?',
          options: ['Cuba', 'Jamaica', 'Haití', 'Puerto Rico'],
          correctAnswer: 2,
          explanation: 'República Dominicana comparte la isla La Española (Hispaniola) con Haití. La frontera entre ambos países tiene aproximadamente 750 mil haitianos viviendo en territorio dominicano.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos dominicanos aproximadamente viven en el exterior?',
          options: ['500 mil', '1 millón', '2 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 2 millones de dominicanos viven fuera del país, principalmente en Estados Unidos (Nueva York, Miami), España, Italia y Suiza. Envían $8 mil millones anuales en remesas.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué porcentaje del PIB dominicano representan las remesas?',
          options: ['3%', '8%', '15%', '25%'],
          correctAnswer: 1,
          explanation: 'Las remesas representan aproximadamente el 8% del PIB dominicano, equivalente a unos $8 mil millones USD anuales. Son una fuente importante de ingresos para muchas familias.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 100,
      },
    },
    {
      id: 'republicadominicana_puzzle',
      type: 'puzzle',
      title: 'Playas del Caribe',
      description: 'Arma una playa dominicana',
      difficulty: 'easy',
      imageUrl: 'punta_cana.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 90,
        experience: 70,
      },
    },
    {
      id: 'republicadominicana_memory',
      type: 'memory',
      title: 'Símbolos Dominicanos',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' }, // Merengue y bachata
        { id: 2, content: '⚾' }, // Béisbol
        { id: 3, content: '🏖️' }, // Playas paradisíacas
        { id: 4, content: '🏛️' }, // Santo Domingo colonial
        { id: 5, content: '🌴' }, // Palmeras
        { id: 6, content: '💃' }, // Baile merengue
        { id: 7, content: '🥥' }, // Coco
        { id: 8, content: '🎸' }, // Música
        { id: 9, content: '🌊' }, // Mar Caribe
        { id: 10, content: '🍹' }, // Mamajuana
        { id: 11, content: '🐚' }, // Conchas marinas
        { id: 12, content: '🏝️' }, // Islas
        { id: 13, content: '🎺' }, // Instrumentos musicales
        { id: 14, content: '🦜' }, // Cotorra dominicana
        { id: 15, content: '🌺' }, // Flores tropicales
        { id: 16, content: '🏐' }, // Voleibol de playa
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 85,
        experience: 65,
      },
    },
  ],

  requiredStats: {
    minMoney: 380,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'maritimo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['haiti'],
    minStars: 29,
  },
};

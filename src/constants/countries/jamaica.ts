/**
 * Jamaica - País 15
 */

import { Country } from './types';

export const jamaica: Country = {
  id: 'jamaica',
  name: 'Jamaica',
  region: 'Caribbean',
  flag: '🇯🇲',
  coordinates: { latitude: 18.1096, longitude: -77.2975 },

  description: 'Isla caribeña famosa por su música, cultura y atletas. Emigración histórica al Reino Unido y América del Norte.',

  culturalFacts: [
    'Cuna del reggae y Bob Marley',
    'Potencia olímpica en atletismo (Usain Bolt)',
    'Idioma: Inglés y patois jamaicano',
    'Filosofía rastafari',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de oportunidades educativas',
      'Economía dependiente del turismo',
      'Violencia y crimen organizado',
      'Conexiones históricas con Reino Unido y Canadá',
    ],
    challenges: [
      'Discriminación racial en países angloparlantes',
      'Estereotipos culturales',
      'Deportaciones desde Reino Unido (Windrush scandal)',
      'Pérdida de "cerebros" (brain drain)',
    ],
    destinations: ['Estados Unidos', 'Reino Unido', 'Canadá', 'Islas Caimán'],
    statistics: {
      emigrants: '1.3 millones de jamaicanos en el exterior',
      remittances: '$3 mil millones USD (16% del PIB)',
      topDestination: 'Estados Unidos (50% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'jamaica_trivia',
      type: 'trivia',
      title: 'Isla del Reggae',
      description: 'Conoce Jamaica',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué género musical nació en Jamaica?',
          options: ['Calypso', 'Reggae', 'Soca', 'Salsa'],
          correctAnswer: 1,
          explanation: 'El reggae nació en Jamaica en los años 60, con Bob Marley como su máximo exponente mundial. Este género musical se ha convertido en símbolo de la cultura jamaicana.',
          difficulty: 'easy',
        },
        {
          question: '¿Quién es el velocista más rápido del mundo?',
          options: ['Carl Lewis', 'Usain Bolt', 'Michael Johnson', 'Jesse Owens'],
          correctAnswer: 1,
          explanation: 'Usain Bolt, jamaicano, es el hombre más rápido del mundo con récord de 9.58 segundos en los 100 metros. Jamaica es una potencia olímpica en atletismo.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes jamaicanos?',
          options: ['Canadá', 'Reino Unido', 'Estados Unidos', 'Francia'],
          correctAnswer: 2,
          explanation: 'Estados Unidos recibe aproximadamente el 50% de los emigrantes jamaicanos, especialmente en ciudades como Nueva York y Miami. Reino Unido y Canadá también son destinos importantes.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué idioma hablan los jamaicanos además del inglés?',
          options: ['Español', 'Francés', 'Patois', 'Criollo'],
          correctAnswer: 2,
          explanation: 'El patois jamaicano es un criollo basado en inglés con influencias africanas. Es hablado por la mayoría de la población de forma coloquial, mientras el inglés es el idioma oficial.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje del PIB jamaicano representan las remesas?',
          options: ['5%', '10%', '16%', '25%'],
          correctAnswer: 2,
          explanation: 'Las remesas representan aproximadamente el 16% del PIB de Jamaica, equivalente a unos $3 mil millones USD anuales. Son vitales para muchas familias jamaicanas.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos jamaicanos aproximadamente viven en el exterior?',
          options: ['500 mil', '1.3 millones', '2 millones', '3 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 1.3 millones de jamaicanos viven en el exterior, una cifra significativa considerando que la población de Jamaica es de 3 millones. Esta diáspora tiene gran influencia cultural y económica.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 160,
        experience: 110,
      },
    },
    {
      id: 'jamaica_puzzle',
      type: 'puzzle',
      title: 'Montego Bay',
      description: 'Arma la bahía jamaicana',
      difficulty: 'medium',
      imageUrl: 'montego_bay.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
    {
      id: 'jamaica_memory',
      type: 'memory',
      title: 'Cultura Jamaicana',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' }, // Reggae
        { id: 2, content: '🏃' }, // Usain Bolt (atletismo)
        { id: 3, content: '🏝️' }, // Isla caribeña
        { id: 4, content: '🌴' }, // Palmeras
        { id: 5, content: '☀️' }, // Sol tropical
        { id: 6, content: '🥥' }, // Coco
        { id: 7, content: '🎸' }, // Bob Marley
        { id: 8, content: '🏖️' }, // Playas
        { id: 9, content: '🌊' }, // Mar Caribe
        { id: 10, content: '🎭' }, // Cultura rastafari
        { id: 11, content: '☕' }, // Café Blue Mountain
        { id: 12, content: '🍹' }, // Ron jamaicano
        { id: 13, content: '🦜' }, // Aves tropicales
        { id: 14, content: '🥇' }, // Medallas olímpicas
        { id: 15, content: '🌺' }, // Flores tropicales
        { id: 16, content: '🎶' }, // Música (ska, dancehall)
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 90,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 450,
    minHealth: 70,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'maritimo'],

  unlockConditions: {
    previousCountries: ['republicadominicana'],
    minStars: 32,
  },
};

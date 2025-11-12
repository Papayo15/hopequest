/**
 * Venezuela - País 1 (ORIGEN)
 */

import { Country } from './types';

export const venezuela: Country = {
  id: 'venezuela',
  name: 'Venezuela',
  region: 'South America',
  flag: '🇻🇪',
  coordinates: { latitude: 6.4238, longitude: -66.5897 },

  description: 'País de origen. Crisis humanitaria genera la mayor migración de la historia latinoamericana.',

  culturalFacts: [
    'Salto Ángel, la cascada más alta del mundo',
    'Petróleo: mayores reservas del mundo',
    'Arepas, plato nacional',
    'Miss Universo: 7 coronas',
  ],

  migrationContext: {
    reasons: [
      'Crisis económica severa (hiperinflación)',
      'Escasez de alimentos y medicinas',
      'Represión política',
      'Inseguridad y violencia',
    ],
    challenges: [
      'Éxodo masivo (7+ millones)',
      'Familias separadas',
      'Xenofobia en países receptores',
      'Pérdida de profesionales',
    ],
    destinations: ['Colombia', 'Perú', 'Chile', 'Ecuador', 'España', 'Estados Unidos'],
    statistics: {
      emigrants: '7.3 millones de venezolanos en el exterior',
      topDestination: 'Colombia (2.5 millones)',
    },
  },

  activities: [
    {
      id: 'venezuela_trivia',
      type: 'trivia',
      title: 'Conoce Venezuela',
      description: 'Aprende sobre tu país de origen',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Cuál es la cascada más alta del mundo?',
          options: ['Cataratas del Niágara', 'Salto Ángel', 'Cataratas Victoria', 'Iguazú'],
          correctAnswer: 1,
          explanation: 'El Salto Ángel en Venezuela es la cascada más alta del mundo con 979 metros de altura. Está en el Parque Nacional Canaima y fue descubierta en 1933.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el plato nacional de Venezuela?',
          options: ['Tacos', 'Arepas', 'Empanadas', 'Tamales'],
          correctAnswer: 1,
          explanation: 'Las arepas son el plato más tradicional de Venezuela. Son tortillas de maíz redondas que se pueden rellenar con queso, carne, aguacate y muchas otras cosas deliciosas.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué recurso natural tiene Venezuela en grandes reservas?',
          options: ['Oro', 'Petróleo', 'Diamantes', 'Carbón'],
          correctAnswer: 1,
          explanation: 'Venezuela tiene las mayores reservas de petróleo del mundo. El petróleo ha sido la base de su economía durante décadas, aunque la crisis ha afectado su producción.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántas coronas de Miss Universo ha ganado Venezuela?',
          options: ['3', '5', '7', '10'],
          correctAnswer: 2,
          explanation: 'Venezuela ha ganado 7 coronas de Miss Universo, siendo uno de los países más exitosos en concursos de belleza. Esto refleja el valor cultural que tiene la belleza en Venezuela.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos venezolanos aproximadamente han emigrado por la crisis?',
          options: ['1 millón', '3 millones', '7.3 millones', '10 millones'],
          correctAnswer: 2,
          explanation: 'Más de 7.3 millones de venezolanos han emigrado desde 2015, convirtiéndose en la mayor crisis migratoria de la historia de América Latina. Colombia, Perú, Chile, Ecuador y España son los principales destinos.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuál es el principal país de destino para venezolanos?',
          options: ['Estados Unidos', 'Colombia', 'España', 'Brasil'],
          correctAnswer: 1,
          explanation: 'Colombia ha recibido aproximadamente 2.5 millones de venezolanos, siendo el principal país de destino por su frontera compartida y las conexiones históricas y culturales entre ambos países.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 2,
        money: 50,
        experience: 50,
      },
    },
    {
      id: 'venezuela_puzzle',
      type: 'puzzle',
      title: 'Salto Ángel',
      description: 'Arma la cascada más alta del mundo',
      difficulty: 'easy',
      imageUrl: 'angel_falls.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 50,
        experience: 40,
      },
    },
    {
      id: 'venezuela_memory',
      type: 'memory',
      title: 'Símbolos Venezolanos',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🌊' },
        { id: 2, content: '⛰️' },
        { id: 3, content: '🎭' },
        { id: 4, content: '⚽' },
        { id: 5, content: '🎵' },
        { id: 6, content: '🫓' },
        { id: 7, content: '💎' },
        { id: 8, content: '🎪' },
        { id: 9, content: '👑' },
        { id: 10, content: '🌺' },
        { id: 11, content: '🦜' },
        { id: 12, content: '🏞️' },
        { id: 13, content: '🌴' },
        { id: 14, content: '🎤' },
        { id: 15, content: '🌅' },
        { id: 16, content: '🛢️' },
      ],
      maxPairs: 16,
      rewards: {
        stars: 1,
        money: 30,
        experience: 30,
      },
    },
  ],

  requiredStats: {
    minMoney: 0,
    minHealth: 100,
    minMoral: 100,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo'],

  unlockConditions: {
    previousCountries: [],
    minStars: 0,
  },
};

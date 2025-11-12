/**
 * Cuba - País 12
 */

import { Country } from './types';

export const cuba: Country = {
  id: 'cuba',
  name: 'Cuba',
  region: 'Caribbean',
  flag: '🇨🇺',
  coordinates: { latitude: 21.5218, longitude: -77.7812 },

  description: 'Isla caribeña con historia revolucionaria. Migraciones constantes hacia Estados Unidos desde 1959.',

  culturalFacts: [
    'Cuna del son, la salsa y el mambo',
    'La Habana Vieja es Patrimonio de la Humanidad',
    'Inventores del mojito y el daiquiri',
    'Sistema de salud y educación gratuitos',
  ],

  migrationContext: {
    reasons: [
      'Sistema político de partido único',
      'Restricciones de libertades civiles',
      'Crisis económica crónica',
      'Búsqueda de oportunidades',
    ],
    challenges: [
      'Balseros (migración por mar)',
      'Política de pies secos/pies mojados (hasta 2017)',
      'Separación familiar por décadas',
      'Restricciones para regresar',
    ],
    destinations: ['Estados Unidos (Florida)', 'España', 'México', 'Canadá'],
    statistics: {
      emigrants: '2 millones de cubanos en el exterior',
      remittances: '$3.7 mil millones USD anuales',
      topDestination: 'Estados Unidos (70% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'cuba_trivia',
      type: 'trivia',
      title: 'Cuba y su Historia',
      description: 'Aprende sobre Cuba',
      difficulty: 'hard',
      questions: [
        {
          question: '¿Dónde vive la mayoría de cubanos en Estados Unidos?',
          options: ['Nueva York', 'California', 'Florida', 'Texas'],
          correctAnswer: 2,
          explanation: 'Florida, especialmente Miami, tiene la mayor población cubana en Estados Unidos. La proximidad geográfica y las conexiones históricas hacen de Florida el principal destino.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué género musical se originó en Cuba?',
          options: ['Reggae', 'Salsa', 'Tango', 'Samba'],
          correctAnswer: 1,
          explanation: 'La salsa tiene sus raíces en el son cubano y otros ritmos de la isla. Cuba también es cuna del mambo, el chachachá y el bolero.',
          difficulty: 'easy',
        },
        {
          question: '¿En qué año fue la Revolución Cubana?',
          options: ['1950', '1959', '1962', '1970'],
          correctAnswer: 1,
          explanation: 'La Revolución Cubana triunfó en 1959, liderada por Fidel Castro. Este evento cambió radicalmente la historia de Cuba y generó olas migratorias hacia Estados Unidos.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué zona histórica de La Habana es Patrimonio de la Humanidad?',
          options: ['Vedado', 'La Habana Vieja', 'Miramar', 'Centro Habana'],
          correctAnswer: 1,
          explanation: 'La Habana Vieja es el centro histórico de la capital cubana, declarada Patrimonio de la Humanidad por la UNESCO en 1982 por su arquitectura colonial excepcional.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué son los "balseros"?',
          options: ['Pescadores', 'Bailarines', 'Migrantes que cruzan en balsas', 'Músicos'],
          correctAnswer: 2,
          explanation: 'Los balseros son cubanos que intentan llegar a Estados Unidos en balsas improvisadas, arriesgando sus vidas en el Estrecho de Florida. Esta forma de migración aumentó especialmente durante el Periodo Especial de los años 90.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos cubanos aproximadamente viven en el exterior?',
          options: ['500 mil', '1 millón', '2 millones', '3 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 2 millones de cubanos viven en el exterior, principalmente en Estados Unidos (70%). Esta diáspora envía remesas que representan $3.7 mil millones anuales para la economía cubana.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 120,
      },
    },
    {
      id: 'cuba_puzzle',
      type: 'puzzle',
      title: 'La Habana Vieja',
      description: 'Arma la histórica Habana',
      difficulty: 'hard',
      imageUrl: 'havana_old.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'cuba_memory',
      type: 'memory',
      title: 'Cultura Cubana',
      description: 'Encuentra parejas cubanas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🎺' }, // Música (salsa, son)
        { id: 2, content: '🍹' }, // Mojito y daiquiri
        { id: 3, content: '🚗' }, // Autos clásicos
        { id: 4, content: '🎭' }, // Teatro y danza
        { id: 5, content: '⚾' }, // Béisbol
        { id: 6, content: '🏛️' }, // La Habana Vieja
        { id: 7, content: '🎵' }, // Son cubano
        { id: 8, content: '🥃' }, // Ron cubano
        { id: 9, content: '🌴' }, // Palmeras
        { id: 10, content: '💃' }, // Salsa
        { id: 11, content: '🏖️' }, // Playas del Caribe
        { id: 12, content: '🎨' }, // Arte cubano
        { id: 13, content: '📚' }, // Literatura
        { id: 14, content: '🚢' }, // Balseros
        { id: 15, content: '🌊' }, // Malecón
        { id: 16, content: '🎸' }, // Trova
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
  ],

  requiredStats: {
    minMoney: 500,
    minHealth: 60,
    minMoral: 50,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['maritimo', 'aereo', 'clandestino'],

  unlockConditions: {
    previousCountries: ['panama'],
    minStars: 23,
  },
};

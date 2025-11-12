/**
 * Australia - País #35 (FINAL alternativo en Oceanía)
 * Nación multicultural construida por inmigrantes
 */

import { Country } from './types';

export const australia: Country = {
  id: 'australia',
  name: 'Australia',
  region: 'Asia', // Oceanía se clasifica bajo Asia para simplificar
  flag: '🇦🇺',
  coordinates: {
    latitude: -25.2744,
    longitude: 133.7751,
  },

  description: 'La isla continente más lejana. Una nación construida por inmigrantes: desde convictos británicos hasta refugiados modernos. El 30% de australianos nacieron en otro país.',

  culturalFacts: [
    'Ópera de Sídney diseñada por arquitecto danés inmigrante',
    'Aborígenes viven aquí desde hace 65,000 años',
    'White Australia Policy (1901-1973) prohibía no-blancos',
    'Hoy es ejemplo de multiculturalismo',
    'Más de 250 idiomas hablados en Sídney',
    'Boomerang símbolo de migración circular',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de mejores oportunidades laborales',
      'Reunificación familiar',
      'Refugio político',
      'Sistema de puntos para profesionales calificados',
    ],
    challenges: [
      'Distancia extrema de otros continentes',
      'Política de detención offshore controversial',
      'Alto costo de vida en ciudades principales',
      'Proceso de visa largo y complejo',
    ],
    destinations: [
      'Sídney (ciudad más multicultural)',
      'Melbourne (centro cultural)',
      'Perth (industria minera)',
      'Brisbane (clima tropical)',
    ],
    statistics: {
      immigrants: '30% de población nacida en el extranjero',
      topOrigin: 'Reino Unido, China, India',
      emigrants: 'Pocos (país de destino, no origen)',
      refugees: '13,000 refugiados por año (programa humanitario)',
    },
  },

  activities: [
    // Actividad 1: Trivia sobre Australia multicultural
    {
      id: 'australia_trivia_1',
      type: 'trivia',
      title: 'Historia de Inmigración Australiana',
      description: 'Aprende sobre cómo Australia pasó de política racista a multicultural',
      difficulty: 'hard',
      rewards: {
        stars: 3,
        money: 150,
        experience: 200,
      },
      questions: [
        {
          question: '¿Qué porcentaje de australianos nacieron en otro país?',
          options: ['10%', '30%', '50%'],
          correctAnswer: 1,
          explanation: 'El 30% de australianos nacieron en el extranjero. Australia es literalmente una nación de inmigrantes.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos años duró la "White Australia Policy" (política racista)?',
          options: ['25 años (1901-1926)', '72 años (1901-1973)', '100 años (1850-1950)'],
          correctAnswer: 1,
          explanation: 'Duró 72 años, desde 1901 hasta 1973. Durante ese tiempo, Australia rechazaba inmigrantes no-europeos.',
          difficulty: 'hard',
        },
        {
          question: '¿Quiénes fueron los primeros inmigrantes europeos en Australia?',
          options: ['Exploradores españoles', 'Convictos británicos', 'Buscadores de oro'],
          correctAnswer: 1,
          explanation: 'Entre 1788-1868, Reino Unido envió 162,000 convictos (prisioneros) a Australia. La nación fue fundada como colonia penal.',
          difficulty: 'hard',
        },
      ],
    },

    // Actividad 2: Puzzle de la Ópera de Sídney
    {
      id: 'australia_puzzle_1',
      type: 'puzzle',
      title: 'Ópera de Sídney',
      description: 'Arma el ícono diseñado por un arquitecto inmigrante danés',
      difficulty: 'medium',
      rewards: {
        stars: 2,
        money: 100,
        experience: 150,
      },
      imageUrl: 'backgrounds/australia_sydney_opera.jpg',
      gridSize: 4, // 4x4 = 16 piezas
    },

    // Actividad 3: Memory - Culturas en Australia
    {
      id: 'australia_memory_1',
      type: 'memory',
      title: 'Culturas de Australia',
      description: 'Encuentra parejas de símbolos culturales de diferentes comunidades',
      difficulty: 'medium',
      rewards: {
        stars: 2,
        money: 100,
        experience: 150,
      },
      pairs: [
        { id: 1, content: '🪃' }, // Boomerang aborigen
        { id: 1, content: 'Boomerang Aborigen' },
        { id: 2, content: '🏮' }, // Chinatown
        { id: 2, content: 'Chinatown' },
        { id: 3, content: '🍝' }, // Little Italy
        { id: 3, content: 'Little Italy' },
        { id: 4, content: '🕌' }, // Mezquita (comunidad musulmana)
        { id: 4, content: 'Mezquita' },
        { id: 5, content: '🎨' }, // Arte aborigen
        { id: 5, content: 'Arte Aborigen' },
        { id: 6, content: '🦘' }, // Canguro (símbolo nacional)
        { id: 6, content: 'Canguro' },
      ],
    },
  ],

  requiredStats: {
    minMoney: 800, // Australia es caro
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport', 'visa'], // Visa obligatoria
  },

  availablePortals: [
    'aereo', // Única forma realista de llegar
  ],

  unlockConditions: {
    previousCountries: ['india'], // Después de India
    minStars: 90, // Casi al final del juego
  },

  specialEvent: {
    type: 'special_story',
    description: '¡Has llegado al punto más lejano del viaje! Australia representa el final de una era de migración y el comienzo de una nueva vida. Aquí, todos son inmigrantes o descendientes de inmigrantes. Has completado el viaje alrededor del mundo.',
  },
};

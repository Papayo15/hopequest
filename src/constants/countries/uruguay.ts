/**
 * Uruguay - País 22
 */

import { Country } from './types';

export const uruguay: Country = {
  id: 'uruguay',
  name: 'Uruguay',
  region: 'South America',
  flag: '🇺🇾',
  coordinates: { latitude: -32.5228, longitude: -55.7658 },

  description: 'País pequeño y estable. Alta calidad de vida. Origen y destino migratorio.',

  culturalFacts: [
    'País más estable de Sudamérica',
    'Mate, bebida nacional',
    'Tango también parte de su cultura',
    'Punta del Este, balneario famoso',
  ],

  migrationContext: {
    reasons: [
      'Búsqueda de mejor economía',
      'Reunificación familiar',
      'Pequeño mercado laboral',
      'Atracción por Europa',
    ],
    challenges: [
      'Población pequeña (3.5 millones)',
      'Fuga de talentos',
      'Recibe argentinos por crisis',
      'Salarios profesionales bajos',
    ],
    destinations: ['España', 'Argentina', 'Estados Unidos', 'Italia'],
    statistics: {
      emigrants: '500 mil uruguayos en el exterior',
      immigrants: '150 mil inmigrantes en Uruguay',
      topDestination: 'Argentina (principal destino histórico)',
    },
  },

  activities: [
    {
      id: 'uruguay_trivia',
      type: 'trivia',
      title: 'La Suiza de América',
      description: 'Descubre Uruguay',
      difficulty: 'easy',
      questions: [
        {
          question: '¿Cuál es la bebida nacional de Uruguay?',
          options: ['Café', 'Mate', 'Té', 'Chicha'],
          correctAnswer: 1,
          explanation: 'El mate es la bebida nacional de Uruguay, compartida con Argentina y Paraguay. Los uruguayos lo toman a todas horas y siempre lo llevan consigo.',
          difficulty: 'easy',
        },
        {
          question: '¿Por qué es famoso Punta del Este?',
          options: ['Industria', 'Balneario de lujo', 'Puerto comercial', 'Agricultura'],
          correctAnswer: 1,
          explanation: 'Punta del Este es el balneario más exclusivo de Sudamérica, conocido por sus playas, casinos y la escultura "La Mano" en la playa.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos habitantes tiene aproximadamente Uruguay?',
          options: ['1.5 millones', '3.5 millones', '10 millones', '20 millones'],
          correctAnswer: 1,
          explanation: 'Uruguay tiene aproximadamente 3.5 millones de habitantes, siendo el segundo país menos poblado de Sudamérica después de Surinam. La mitad vive en Montevideo.',
          difficulty: 'medium',
        },
        {
          question: '¿Por qué se le llama a Uruguay "La Suiza de América"?',
          options: ['Por sus montañas', 'Por su estabilidad y calidad de vida', 'Por su chocolate', 'Por sus bancos'],
          correctAnswer: 1,
          explanation: 'Se le llama así por su estabilidad política y democrática, bajo nivel de corrupción, y alta calidad de vida. Es uno de los países más seguros y prósperos de América Latina.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos uruguayos aproximadamente viven en el exterior?',
          options: ['200 mil', '500 mil', '800 mil', '1.5 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 500 mil uruguayos viven en el exterior, principalmente en Argentina y España. Esto representa cerca del 15% de la población uruguaya.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuál es el principal destino histórico de emigrantes uruguayos?',
          options: ['España', 'Brasil', 'Argentina', 'Estados Unidos'],
          correctAnswer: 2,
          explanation: 'Argentina ha sido históricamente el principal destino de uruguayos por su proximidad, conexiones familiares y mayores oportunidades laborales, especialmente en Buenos Aires.',
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
      id: 'uruguay_puzzle',
      type: 'puzzle',
      title: 'Montevideo',
      description: 'Arma la capital uruguaya',
      difficulty: 'easy',
      imageUrl: 'montevideo.jpg',
      gridSize: 3,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
    {
      id: 'uruguay_memory',
      type: 'memory',
      title: 'Cultura Uruguaya',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🧉' }, // Mate
        { id: 2, content: '⚽' }, // Fútbol (Campeón del Mundo 1930, 1950)
        { id: 3, content: '🏖️' }, // Punta del Este
        { id: 4, content: '🌊' }, // Playas del Atlántico
        { id: 5, content: '🏛️' }, // Montevideo
        { id: 6, content: '✋' }, // La Mano (escultura)
        { id: 7, content: '🌅' }, // Atardeceres en la Rambla
        { id: 8, content: '🎵' }, // Candombe
        { id: 9, content: '🥩' }, // Asado uruguayo
        { id: 10, content: '📚' }, // Literatura
        { id: 11, content: '🎭' }, // Teatro Solís
        { id: 12, content: '🏘️' }, // Colonia del Sacramento
        { id: 13, content: '🌾' }, // Ganadería
        { id: 14, content: '🍷' }, // Vino (Tannat)
        { id: 15, content: '🎪' }, // Carnaval (el más largo del mundo)
        { id: 16, content: '🏄' }, // Surf
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
    minMoney: 550,
    minHealth: 80,
    minMoral: 70,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['brasil'],
    minStars: 53,
  },
};

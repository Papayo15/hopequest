/**
 * Argentina - País 20
 */

import { Country } from './types';

export const argentina: Country = {
  id: 'argentina',
  name: 'Argentina',
  region: 'South America',
  flag: '🇦🇷',
  coordinates: { latitude: -38.4161, longitude: -63.6167 },

  description: 'Segundo país más grande de Sudamérica. Historia de inmigración europea y destino regional.',

  culturalFacts: [
    'Cuna del tango y Maradona',
    'Patagonia y glaciares imponentes',
    'Buenos Aires, la "París de Sudamérica"',
    'Asado y vino Malbec',
  ],

  migrationContext: {
    reasons: [
      'Crisis económicas recurrentes',
      'Inflación crónica',
      'Búsqueda de estabilidad',
      'Fuga de cerebros',
    ],
    challenges: [
      'Deterioro económico',
      'Recibe migrantes de países vecinos',
      'Xenofobia hacia bolivianos, paraguayos',
      'Pobreza creciente',
    ],
    destinations: ['España', 'Italia', 'Estados Unidos', 'Uruguay', 'Chile'],
    statistics: {
      emigrants: '1 millón de argentinos en el exterior',
      immigrants: '2 millones de inmigrantes en Argentina',
      topDestination: 'España (principal destino)',
    },
  },

  activities: [
    {
      id: 'argentina_trivia',
      type: 'trivia',
      title: 'Tierra del Tango',
      description: 'Descubre Argentina',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué baile se originó en Argentina?',
          options: ['Salsa', 'Tango', 'Samba', 'Cumbia'],
          correctAnswer: 1,
          explanation: 'El tango nació en Buenos Aires a fines del siglo XIX en los barrios de inmigrantes. Es Patrimonio Cultural Inmaterial de la Humanidad.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué vino es emblemático de Argentina?',
          options: ['Cabernet', 'Malbec', 'Merlot', 'Chardonnay'],
          correctAnswer: 1,
          explanation: 'El Malbec es el vino emblemático de Argentina. Mendoza es la principal región vitivinícola del país.',
          difficulty: 'easy',
        },
        {
          question: '¿Cómo se llama la región al sur de Argentina?',
          options: ['Pampas', 'Patagonia', 'Amazonía', 'Atacama'],
          correctAnswer: 1,
          explanation: 'La Patagonia es la región sur de Argentina, conocida por sus glaciares, montañas y belleza natural. Incluye el Parque Nacional Los Glaciares.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes argentinos?',
          options: ['Estados Unidos', 'Brasil', 'España', 'Chile'],
          correctAnswer: 2,
          explanation: 'España es el principal destino de argentinos por las conexiones históricas, el idioma común y la doble nacionalidad que muchos tienen por descendencia europea.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos argentinos aproximadamente viven en el exterior?',
          options: ['500 mil', '1 millón', '2 millones', '3 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 1 millón de argentinos viven en el exterior. Las crisis económicas recurrentes han causado varias olas migratorias, especialmente en 2001-2002.',
          difficulty: 'hard',
        },
        {
          question: '¿Por qué Buenos Aires es llamada "La París de Sudamérica"?',
          options: ['Por su torre Eiffel', 'Por su arquitectura europea e influencia francesa', 'Por su idioma', 'Por su comida'],
          correctAnswer: 1,
          explanation: 'Buenos Aires es llamada así por su arquitectura europea, sus amplias avenidas, cafés literarios y fuerte influencia cultural francesa, especialmente a principios del siglo XX.',
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
      id: 'argentina_puzzle',
      type: 'puzzle',
      title: 'Buenos Aires',
      description: 'Arma la capital porteña',
      difficulty: 'medium',
      imageUrl: 'buenos_aires.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 120,
        experience: 90,
      },
    },
    {
      id: 'argentina_memory',
      type: 'memory',
      title: 'Cultura Argentina',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '💃' }, // Tango
        { id: 2, content: '⚽' }, // Fútbol (Maradona, Messi)
        { id: 3, content: '🥩' }, // Asado
        { id: 4, content: '🍷' }, // Vino Malbec
        { id: 5, content: '🏔️' }, // Patagonia
        { id: 6, content: '🌃' }, // Buenos Aires
        { id: 7, content: '🧉' }, // Mate
        { id: 8, content: '🏛️' }, // Teatro Colón
        { id: 9, content: '🌊' }, // Cataratas del Iguazú
        { id: 10, content: '🎭' }, // Cultura
        { id: 11, content: '🐄' }, // Ganadería
        { id: 12, content: '🌾' }, // Pampas
        { id: 13, content: '🏖️' }, // Mar del Plata
        { id: 14, content: '🎵' }, // Música
        { id: 15, content: '📚' }, // Literatura (Borges)
        { id: 16, content: '🧊' }, // Glaciares
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
    minMoney: 480,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['chile'],
    minStars: 47,
  },
};

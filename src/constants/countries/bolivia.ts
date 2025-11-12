/**
 * Bolivia - País 18
 */

import { Country } from './types';

export const bolivia: Country = {
  id: 'bolivia',
  name: 'Bolivia',
  region: 'South America',
  flag: '🇧🇴',
  coordinates: { latitude: -16.2902, longitude: -63.5887 },

  description: 'País sin salida al mar, plurinacional. Emigración hacia Argentina, España y Brasil.',

  culturalFacts: [
    'País plurinacional: 36 pueblos indígenas',
    'Salar de Uyuni, el desierto de sal más grande',
    'La Paz, capital administrativa más alta del mundo',
    'Idiomas oficiales: 37 lenguas',
  ],

  migrationContext: {
    reasons: [
      'Pobreza (37% bajo línea de pobreza)',
      'Falta de oportunidades laborales',
      'Búsqueda de educación',
      'Conflictos sociales y políticos',
    ],
    challenges: [
      'Discriminación hacia población indígena',
      'Explotación en talleres clandestinos',
      'Xenofobia en países vecinos',
      'Trata de personas',
    ],
    destinations: ['Argentina', 'España', 'Brasil', 'Chile', 'Estados Unidos'],
    statistics: {
      emigrants: '1.2 millones de bolivianos en el exterior',
      remittances: '$1.3 mil millones USD',
      topDestination: 'Argentina (50% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'bolivia_trivia',
      type: 'trivia',
      title: 'Plurinacionalidad',
      description: 'Descubre Bolivia',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué es el Salar de Uyuni?',
          options: ['Un lago', 'Un desierto de sal', 'Una montaña', 'Una ciudad'],
          correctAnswer: 1,
          explanation: 'El Salar de Uyuni es el desierto de sal más grande del mundo con 10,582 km². Durante la temporada de lluvias se convierte en un espejo gigante que refleja el cielo.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es la capital administrativa más alta del mundo?',
          options: ['Quito', 'Bogotá', 'La Paz', 'Cusco'],
          correctAnswer: 2,
          explanation: 'La Paz, Bolivia, es la capital administrativa más alta del mundo, ubicada a 3,650 metros sobre el nivel del mar. Sucre es la capital constitucional.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos idiomas oficiales tiene Bolivia?',
          options: ['1', '3', '10', '37'],
          correctAnswer: 3,
          explanation: 'Bolivia reconoce 37 lenguas oficiales, incluyendo español, quechua, aymara y 34 lenguas indígenas más. Es el país con más idiomas oficiales en América.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes bolivianos?',
          options: ['España', 'Brasil', 'Argentina', 'Estados Unidos'],
          correctAnswer: 2,
          explanation: 'Argentina recibe aproximadamente el 50% de los emigrantes bolivianos. Muchos trabajan en agricultura, construcción y talleres textiles, especialmente en Buenos Aires.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje de la población boliviana vive bajo la línea de pobreza?',
          options: ['15%', '25%', '37%', '50%'],
          correctAnswer: 2,
          explanation: 'Aproximadamente el 37% de la población boliviana vive bajo la línea de pobreza. Esta pobreza es una de las principales causas de emigración hacia países vecinos.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos bolivianos aproximadamente viven en el exterior?',
          options: ['500 mil', '1.2 millones', '2 millones', '3 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 1.2 millones de bolivianos viven en el exterior, principalmente en Argentina, España y Brasil. Envían remesas de $1.3 mil millones anuales.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'bolivia_puzzle',
      type: 'puzzle',
      title: 'Salar de Uyuni',
      description: 'Arma el espejo del cielo',
      difficulty: 'medium',
      imageUrl: 'salar_uyuni.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
    {
      id: 'bolivia_memory',
      type: 'memory',
      title: 'Cultura Boliviana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🏔️' }, // Andes
        { id: 2, content: '🦙' }, // Llamas
        { id: 3, content: '🎭' }, // Cultura indígena
        { id: 4, content: '🌄' }, // Salar de Uyuni
        { id: 5, content: '💎' }, // Minerales
        { id: 6, content: '🎵' }, // Música andina
        { id: 7, content: '🏛️' }, // Tiwanaku
        { id: 8, content: '🌿' }, // Hoja de coca
        { id: 9, content: '🎪' }, // Carnaval de Oruro
        { id: 10, content: '🦅' }, // Cóndor
        { id: 11, content: '🌾' }, // Quinoa
        { id: 12, content: '☀️' }, // Altiplano
        { id: 13, content: '🏞️' }, // Lago Titicaca
        { id: 14, content: '🎨' }, // Textiles andinos
        { id: 15, content: '🥔' }, // Papa (más de 1000 variedades)
        { id: 16, content: '🌋' }, // Volcanes
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 85,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 380,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre'],

  unlockConditions: {
    previousCountries: ['peru'],
    minStars: 41,
  },
};

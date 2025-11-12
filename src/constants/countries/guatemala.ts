/**
 * Guatemala - País 7
 * Ruta de migración centroamericana
 */

import { Country } from './types';

export const guatemala: Country = {
  id: 'guatemala',
  name: 'Guatemala',
  region: 'Central America',
  flag: '🇬🇹',
  coordinates: { latitude: 15.7835, longitude: -90.2308 },

  description: 'País centroamericano conocido por su cultura maya y belleza natural. Es parte de la ruta migratoria hacia México y Estados Unidos.',

  culturalFacts: [
    'Más de 20 lenguas mayas se hablan en Guatemala',
    'Antigua Guatemala es Patrimonio de la Humanidad',
    'El quetzal es el ave nacional y la moneda',
    'Tikal es una de las ciudades mayas más grandes',
  ],

  migrationContext: {
    reasons: [
      'Pobreza y falta de oportunidades económicas',
      'Violencia de pandillas en áreas urbanas',
      'Desastres naturales (huracanes, terremotos)',
      'Búsqueda de reunificación familiar',
    ],
    challenges: [
      'Cruce peligroso hacia México',
      'Extorsión y violencia en la ruta',
      'Falta de documentación legal',
      'Discriminación hacia población indígena',
    ],
    destinations: ['México', 'Estados Unidos', 'España'],
    statistics: {
      emigrants: '1.6 millones de guatemaltecos en el exterior',
      remittances: '$15 mil millones USD anuales (15% del PIB)',
      topDestination: 'Estados Unidos (98% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'guatemala_trivia',
      type: 'trivia',
      title: 'Cultura Maya',
      description: 'Aprende sobre la rica herencia maya de Guatemala',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuántas lenguas mayas se hablan en Guatemala?',
          options: ['5 lenguas', 'Más de 20 lenguas', '10 lenguas', '50 lenguas'],
          correctAnswer: 1,
          explanation: 'Guatemala tiene una increíble diversidad lingüística con más de 20 lenguas mayas vivas.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué ciudad maya importante está en Guatemala?',
          options: ['Chichen Itzá', 'Machu Picchu', 'Tikal', 'Teotihuacán'],
          correctAnswer: 2,
          explanation: 'Tikal es una de las ciudades mayas más grandes y está en Guatemala, es Patrimonio de la Humanidad.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué representa el quetzal para Guatemala?',
          options: ['Un dios maya', 'El ave nacional y la moneda', 'Una montaña sagrada', 'Un guerrero legendario'],
          correctAnswer: 1,
          explanation: 'El quetzal es el ave nacional de Guatemala y también el nombre de su moneda.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuánto representan las remesas en el PIB de Guatemala?',
          options: ['5%', '10%', '15%', '25%'],
          correctAnswer: 2,
          explanation: 'Las remesas de guatemaltecos en el exterior representan el 15% del PIB, vitales para muchas familias.',
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
      id: 'guatemala_puzzle',
      type: 'puzzle',
      title: 'Antigua Guatemala',
      description: 'Arma el rompecabezas de la colonial Antigua Guatemala',
      difficulty: 'medium',
      imageUrl: 'antigua_guatemala.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 75,
      },
    },
    {
      id: 'guatemala_memory',
      type: 'memory',
      title: 'Símbolos Guatemaltecos',
      description: 'Encuentra las parejas de símbolos de Guatemala',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🦜' }, // Quetzal
        { id: 2, content: '🏛️' }, // Tikal
        { id: 3, content: '🌋' }, // Volcanes
        { id: 4, content: '🎭' }, // Máscaras mayas
        { id: 5, content: '🌺' }, // Flores
        { id: 6, content: '🥖' }, // Pan
      ],
      rewards: {
        stars: 2,
        money: 80,
        experience: 60,
      },
    },
  ],

  requiredStats: {
    minMoney: 300,
    minHealth: 60,
    minMoral: 50,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo', 'clandestino'],

  unlockConditions: {
    previousCountries: ['mexico'],
    minStars: 8,
  },
};

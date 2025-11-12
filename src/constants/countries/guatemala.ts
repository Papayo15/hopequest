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
          question: '¿Qué ave nacional de Guatemala también es el nombre de su moneda?',
          options: ['El águila', 'El quetzal', 'El tucán', 'El cóndor'],
          correctAnswer: 1,
          explanation: 'El quetzal es un ave sagrada para los mayas y el símbolo nacional de Guatemala. También es el nombre de la moneda guatemalteca.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué ciudad maya importante está en Guatemala?',
          options: ['Chichen Itzá', 'Machu Picchu', 'Tikal', 'Teotihuacán'],
          correctAnswer: 2,
          explanation: 'Tikal es una de las ciudades mayas más grandes y poderosas. Está ubicada en la selva de Petén y es Patrimonio de la Humanidad de la UNESCO.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántas lenguas mayas se hablan actualmente en Guatemala?',
          options: ['5 lenguas', 'Más de 20 lenguas', '10 lenguas', '50 lenguas'],
          correctAnswer: 1,
          explanation: 'Guatemala tiene una increíble diversidad lingüística con más de 20 lenguas mayas vivas, además del español. Esto la convierte en uno de los países más diversos lingüísticamente de América.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué ciudad colonial guatemalteca es Patrimonio de la Humanidad?',
          options: ['Ciudad de Guatemala', 'Antigua Guatemala', 'Quetzaltenango', 'Flores'],
          correctAnswer: 1,
          explanation: 'Antigua Guatemala es famosa por su arquitectura colonial española bien conservada y sus calles empedradas. Fue la capital de Guatemala hasta 1773.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje del PIB guatemalteco representan las remesas de emigrantes?',
          options: ['5%', '10%', '15%', '25%'],
          correctAnswer: 2,
          explanation: 'Las remesas enviadas por guatemaltecos en el exterior representan aproximadamente el 15% del PIB nacional. Son enviadas principalmente desde Estados Unidos y son vitales para muchas familias.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos guatemaltecos aproximadamente viven en el exterior?',
          options: ['500,000', '1.6 millones', '3 millones', '5 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 1.6 millones de guatemaltecos viven fuera del país, principalmente en Estados Unidos (98%). Muchos dejaron Guatemala buscando mejores oportunidades económicas.',
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
        { id: 7, content: '🎨' }, // Artesanías
        { id: 8, content: '☕' }, // Café guatemalteco
        { id: 9, content: '🏺' }, // Cerámica maya
        { id: 10, content: '🌽' }, // Maíz (base de alimentación)
        { id: 11, content: '🎺' }, // Marimba (instrumento nacional)
        { id: 12, content: '🌴' }, // Palma
        { id: 13, content: '⛰️' }, // Montañas
        { id: 14, content: '🦅' }, // Águila
        { id: 15, content: '🎪' }, // Festivales
        { id: 16, content: '🌊' }, // Lagos
      ],
      maxPairs: 16, // Máximo para nivel difícil (11-12 años)
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

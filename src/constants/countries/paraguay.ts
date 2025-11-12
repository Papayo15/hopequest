/**
 * Paraguay - País 23
 */

import { Country } from './types';

export const paraguay: Country = {
  id: 'paraguay',
  name: 'Paraguay',
  region: 'South America',
  flag: '🇵🇾',
  coordinates: { latitude: -23.4425, longitude: -58.4438 },

  description: 'País bilingüe (español-guaraní) sin salida al mar. Migración hacia Argentina y España.',

  culturalFacts: [
    'Único país bilingüe de América (español y guaraní)',
    'Arpa paraguaya, instrumento nacional',
    'Ñandutí, encaje tradicional',
    'Guerra de la Triple Alianza marcó su historia',
  ],

  migrationContext: {
    reasons: [
      'Pobreza (23% bajo línea de pobreza)',
      'Falta de oportunidades',
      'Economía informal',
      'Búsqueda de educación',
    ],
    challenges: [
      'Discriminación en Argentina',
      'Explotación laboral',
      'Trata de personas',
      'Xenofobia',
    ],
    destinations: ['Argentina', 'España', 'Brasil', 'Estados Unidos'],
    statistics: {
      emigrants: '850 mil paraguayos en el exterior',
      remittances: '$700 millones USD',
      topDestination: 'Argentina (70% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'paraguay_trivia',
      type: 'trivia',
      title: 'Corazón de América',
      description: 'Conoce Paraguay',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué idiomas son oficiales en Paraguay?',
          options: ['Solo español', 'Español e inglés', 'Español y guaraní', 'Portugués y español'],
          correctAnswer: 2,
          explanation: 'Paraguay es el único país oficialmente bilingüe de América Latina, con español y guaraní. El 90% de la población habla guaraní, una lengua indígena.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es el instrumento nacional de Paraguay?',
          options: ['Guitarra', 'Arpa paraguaya', 'Charango', 'Quena'],
          correctAnswer: 1,
          explanation: 'El arpa paraguaya es el instrumento nacional y característico. Su sonido es único y forma parte esencial de la música tradicional paraguaya.',
          difficulty: 'easy',
        },
        {
          question: '¿Dónde migran la mayoría de paraguayos?',
          options: ['Brasil', 'España', 'Argentina', 'Estados Unidos'],
          correctAnswer: 2,
          explanation: 'Aproximadamente el 70% de los paraguayos emigrantes viven en Argentina, especialmente en Buenos Aires. Buscan mejores oportunidades económicas y laborales.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué es el ñandutí?',
          options: ['Una danza', 'Un encaje tradicional', 'Una comida', 'Un instrumento'],
          correctAnswer: 1,
          explanation: 'El ñandutí es un encaje tradicional paraguayo muy elaborado y delicado. Su nombre en guaraní significa "tela de araña" por su diseño circular.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos paraguayos aproximadamente viven en el exterior?',
          options: ['300 mil', '850 mil', '1.5 millones', '2 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 850 mil paraguayos viven en el exterior, enviando remesas de $700 millones anuales. La mayoría emigró buscando mejores oportunidades económicas.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué porcentaje de la población paraguaya vive bajo la línea de pobreza?',
          options: ['10%', '15%', '23%', '35%'],
          correctAnswer: 2,
          explanation: 'Aproximadamente el 23% de la población paraguaya vive bajo la línea de pobreza. Esta situación económica difícil es una de las principales causas de emigración.',
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
      id: 'paraguay_puzzle',
      type: 'puzzle',
      title: 'Misiones Jesuíticas',
      description: 'Arma las ruinas jesuíticas',
      difficulty: 'medium',
      imageUrl: 'paraguay_missions.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
    {
      id: 'paraguay_memory',
      type: 'memory',
      title: 'Cultura Paraguaya',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎵' }, // Arpa paraguaya
        { id: 2, content: '🧉' }, // Tereré (mate frío)
        { id: 3, content: '🎭' }, // Cultura guaraní
        { id: 4, content: '🌺' }, // Flores
        { id: 5, content: '🏛️' }, // Misiones jesuíticas
        { id: 6, content: '🕸️' }, // Ñandutí (encaje)
        { id: 7, content: '🌊' }, // Río Paraguay
        { id: 8, content: '🦎' }, // Fauna del Chaco
        { id: 9, content: '🎶' }, // Música folclórica
        { id: 10, content: '🌳' }, // Bosques
        { id: 11, content: '🏰' }, // Asunción
        { id: 12, content: '🦜' }, // Aves tropicales
        { id: 13, content: '🌿' }, // Yerba mate
        { id: 14, content: '🎨' }, // Artesanías
        { id: 15, content: '💚' }, // Naturaleza
        { id: 16, content: '🏞️' }, // Pantanal
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
    minMoney: 350,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['terrestre', 'aereo'],

  unlockConditions: {
    previousCountries: ['uruguay'],
    minStars: 56,
  },
};

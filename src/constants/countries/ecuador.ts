/**
 * Ecuador - País 16
 */

import { Country } from './types';

export const ecuador: Country = {
  id: 'ecuador',
  name: 'Ecuador',
  region: 'South America',
  flag: '🇪🇨',
  coordinates: { latitude: -1.8312, longitude: -78.1834 },

  description: 'País andino atravesado por la línea ecuatorial. Crisis económicas han generado olas migratorias.',

  culturalFacts: [
    'Las Islas Galápagos son Patrimonio Natural',
    'Mitad del Mundo: línea ecuatorial',
    'Diversidad: Costa, Sierra, Amazonía y Galápagos',
    'Quito es Patrimonio Cultural de la Humanidad',
  ],

  migrationContext: {
    reasons: [
      'Crisis económica del 2000 (dolarización)',
      'Desempleo y subempleo elevado',
      'Inestabilidad política',
      'Búsqueda de mejores oportunidades',
    ],
    challenges: [
      'Explotación laboral en España',
      'Discriminación',
      'Separación familiar',
      'Deportaciones',
    ],
    destinations: ['España', 'Estados Unidos', 'Italia', 'Chile'],
    statistics: {
      emigrants: '1.2 millones de ecuatorianos en el exterior',
      remittances: '$3.4 mil millones USD (3% del PIB)',
      topDestination: 'España (40% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'ecuador_trivia',
      type: 'trivia',
      title: 'Mitad del Mundo',
      description: 'Descubre Ecuador',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Por qué Ecuador se llama así?',
          options: ['Por un río', 'Por la línea ecuatorial', 'Por un volcán', 'Por un héroe'],
          correctAnswer: 1,
          explanation: 'Ecuador toma su nombre de la línea ecuatorial que atraviesa el país.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué islas famosas pertenecen a Ecuador?',
          options: ['Maldivas', 'Galápagos', 'Canarias', 'Baleares'],
          correctAnswer: 1,
          explanation: 'Las Islas Galápagos, donde Darwin estudió la evolución, son de Ecuador.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuándo adoptó Ecuador el dólar estadounidense?',
          options: ['1990', '2000', '2010', '2015'],
          correctAnswer: 1,
          explanation: 'Ecuador adoptó el dólar en 2000 durante una grave crisis económica.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes ecuatorianos?',
          options: ['Estados Unidos', 'España', 'Italia', 'Chile'],
          correctAnswer: 1,
          explanation: 'España recibe el 40% de los emigrantes ecuatorianos.',
          difficulty: 'medium',
        },
      ],
      rewards: {
        stars: 3,
        money: 140,
        experience: 100,
      },
    },
    {
      id: 'ecuador_puzzle',
      type: 'puzzle',
      title: 'Galápagos',
      description: 'Arma las islas encantadas',
      difficulty: 'medium',
      imageUrl: 'galapagos.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
    {
      id: 'ecuador_memory',
      type: 'memory',
      title: 'Biodiversidad Ecuatoriana',
      description: 'Encuentra las parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🐢' },
        { id: 2, content: '🦎' },
        { id: 3, content: '🌋' },
        { id: 4, content: '🏔️' },
        { id: 5, content: '🌴' },
        { id: 6, content: '🐧' },
      ],
      rewards: {
        stars: 2,
        money: 90,
        experience: 70,
      },
    },
  ],

  requiredStats: {
    minMoney: 400,
    minHealth: 65,
    minMoral: 55,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['colombia'],
    minStars: 35,
  },
};

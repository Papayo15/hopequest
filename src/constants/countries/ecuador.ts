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
          explanation: 'Ecuador toma su nombre de la línea ecuatorial (latitud 0°) que atraviesa el país. El monumento "Mitad del Mundo" marca este punto.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué islas famosas pertenecen a Ecuador?',
          options: ['Maldivas', 'Galápagos', 'Canarias', 'Baleares'],
          correctAnswer: 1,
          explanation: 'Las Islas Galápagos, donde Charles Darwin estudió la evolución, pertenecen a Ecuador. Son Patrimonio Natural de la Humanidad por su biodiversidad única.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuándo adoptó Ecuador el dólar estadounidense?',
          options: ['1990', '2000', '2010', '2015'],
          correctAnswer: 1,
          explanation: 'Ecuador adoptó el dólar estadounidense en el año 2000 durante una grave crisis económica que causó la quiebra de varios bancos y pérdida de ahorros.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de emigrantes ecuatorianos?',
          options: ['Estados Unidos', 'España', 'Italia', 'Chile'],
          correctAnswer: 1,
          explanation: 'España recibe aproximadamente el 40% de los emigrantes ecuatorianos. La gran ola migratoria ocurrió tras la crisis del 2000, especialmente hacia Madrid y Barcelona.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué ciudad ecuatoriana fue la primera declarada Patrimonio Cultural de la Humanidad?',
          options: ['Guayaquil', 'Cuenca', 'Quito', 'Loja'],
          correctAnswer: 2,
          explanation: 'Quito fue una de las primeras ciudades en ser declarada Patrimonio Cultural de la Humanidad en 1978, junto con Cracovia. Su centro histórico colonial está muy bien preservado.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuántos ecuatorianos aproximadamente viven en el exterior?',
          options: ['500 mil', '1.2 millones', '2 millones', '3 millones'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 1.2 millones de ecuatorianos viven en el exterior, enviando remesas de $3.4 mil millones anuales. La mayoría emigró tras la crisis económica del 2000.',
          difficulty: 'hard',
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
        { id: 1, content: '🐢' }, // Tortugas Galápagos
        { id: 2, content: '🦎' }, // Iguanas marinas
        { id: 3, content: '🌋' }, // Volcanes
        { id: 4, content: '🏔️' }, // Andes
        { id: 5, content: '🌴' }, // Amazonía
        { id: 6, content: '🐧' }, // Pingüinos de Galápagos
        { id: 7, content: '🦩' }, // Flamencos
        { id: 8, content: '🏛️' }, // Quito colonial
        { id: 9, content: '💵' }, // Dólar estadounidense
        { id: 10, content: '🌎' }, // Línea ecuatorial
        { id: 11, content: '🐒' }, // Monos amazónicos
        { id: 12, content: '🌺' }, // Flores tropicales
        { id: 13, content: '🦜' }, // Loros amazónicos
        { id: 14, content: '🥥' }, // Coco
        { id: 15, content: '🌊' }, // Costa del Pacífico
        { id: 16, content: '🎭' }, // Cultura indígena
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

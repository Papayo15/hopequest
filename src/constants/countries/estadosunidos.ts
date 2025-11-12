/**
 * Estados Unidos - País 5
 */

import { Country } from './types';

export const estadosunidos: Country = {
  id: 'estadosunidos',
  name: 'Estados Unidos',
  region: 'North America',
  flag: '🇺🇸',
  coordinates: { latitude: 37.0902, longitude: -95.7129 },
  description: 'País de inmigrantes. Destino soñado de millones.',
  culturalFacts: [
    'Estatua de la Libertad, símbolo de inmigración',
    'Nueva York, ciudad más diversa',
    'Hollywood y la cultura pop',
    'Silicon Valley y tecnología',
  ],
  migrationContext: {
    reasons: ['Oportunidades económicas', 'Reunificación familiar', 'Asilo político', 'Educación'],
    challenges: ['Políticas antiinmigrantes', 'ICE y deportaciones', 'Muro fronterizo', 'Discriminación'],
    destinations: ['Retorno a país de origen', 'Canadá', 'España'],
    statistics: { immigrants: '50 millones de inmigrantes', topOrigin: 'México (24% de inmigrantes)' },
  },
  activities: [
    {
      id: 'usa_trivia',
      type: 'trivia',
      title: 'Tierra de Oportunidades',
      description: 'Conoce Estados Unidos',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué simboliza la Estatua de la Libertad?',
          options: ['Guerra', 'Inmigración y libertad', 'Riqueza', 'Poder'],
          correctAnswer: 1,
          explanation: 'La Estatua de la Libertad es el símbolo de la inmigración y la libertad en Estados Unidos. Durante décadas recibió a millones de inmigrantes que llegaban a Ellis Island buscando una nueva vida.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuál es la ciudad más diversa de Estados Unidos?',
          options: ['Los Ángeles', 'Nueva York', 'Chicago', 'Miami'],
          correctAnswer: 1,
          explanation: 'Nueva York es la ciudad más diversa de Estados Unidos, donde se hablan más de 800 idiomas y viven personas de todos los países del mundo. Es conocida como la "capital del mundo".',
          difficulty: 'easy',
        },
        {
          question: '¿Qué representa Hollywood para la cultura estadounidense?',
          options: ['Deportes', 'Tecnología', 'Cine y entretenimiento', 'Agricultura'],
          correctAnswer: 2,
          explanation: 'Hollywood en Los Ángeles es el centro mundial del cine y el entretenimiento. Las películas y series americanas se ven en todo el planeta, haciendo de Estados Unidos un exportador cultural.',
          difficulty: 'medium',
        },
        {
          question: '¿De qué país proviene la mayoría de inmigrantes en EE.UU.?',
          options: ['China', 'India', 'México', 'Filipinas'],
          correctAnswer: 2,
          explanation: 'México es el país de origen del 24% de todos los inmigrantes en Estados Unidos. La frontera compartida y las conexiones históricas hacen que millones de mexicanos vivan en EE.UU.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos inmigrantes aproximadamente viven en Estados Unidos?',
          options: ['20 millones', '30 millones', '50 millones', '70 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 50 millones de inmigrantes viven en Estados Unidos, representando cerca del 15% de la población total. EE.UU. es el país con más inmigrantes del mundo.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué zona tecnológica de EE.UU. es famosa mundialmente?',
          options: ['Silicon Valley', 'Wall Street', 'Broadway', 'Times Square'],
          correctAnswer: 0,
          explanation: 'Silicon Valley en California es el centro mundial de la tecnología, donde están empresas como Apple, Google, Facebook y Tesla. Ha atraído talento de todo el mundo, incluyendo muchos inmigrantes.',
          difficulty: 'hard',
        },
      ],
      rewards: { stars: 3, money: 150, experience: 100 },
    },
    {
      id: 'usa_puzzle',
      type: 'puzzle',
      title: 'Estatua de la Libertad',
      description: 'Arma el símbolo de esperanza',
      difficulty: 'medium',
      imageUrl: 'statue_of_liberty.jpg',
      gridSize: 4,
      rewards: { stars: 2, money: 120, experience: 85 },
    },
    {
      id: 'usa_memory',
      type: 'memory',
      title: 'Cultura Americana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🗽' }, // Estatua de la Libertad
        { id: 2, content: '🍔' }, // Hamburguesas
        { id: 3, content: '🏈' }, // Fútbol americano
        { id: 4, content: '🎬' }, // Hollywood
        { id: 5, content: '🚀' }, // NASA/tecnología espacial
        { id: 6, content: '🗺️' }, // 50 estados
        { id: 7, content: '🦅' }, // Águila calva (símbolo nacional)
        { id: 8, content: '🏙️' }, // Nueva York
        { id: 9, content: '🌉' }, // Golden Gate
        { id: 10, content: '🎸' }, // Rock and Roll
        { id: 11, content: '🍕' }, // Pizza americana
        { id: 12, content: '🏀' }, // Basketball (NBA)
        { id: 13, content: '⚾' }, // Béisbol
        { id: 14, content: '💻' }, // Silicon Valley
        { id: 15, content: '🎓' }, // Universidades
        { id: 16, content: '🌟' }, // American Dream
      ],
      maxPairs: 16,
      rewards: { stars: 2, money: 100, experience: 75 },
    },
  ],
  requiredStats: {
    minMoney: 600,
    minHealth: 75,
    minMoral: 65,
    requiredDocuments: ['passport', 'visa'],
  },
  availablePortals: ['aereo', 'terrestre', 'clandestino'],
  unlockConditions: {
    previousCountries: ['mexico'],
    minStars: 11,
  },
};

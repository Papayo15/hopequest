/**
 * España - País 6
 */

import { Country } from './types';

export const espana: Country = {
  id: 'espana',
  name: 'España',
  region: 'Europe',
  flag: '🇪🇸',
  coordinates: { latitude: 40.4637, longitude: -3.7492 },
  description: 'Puerta de entrada a Europa. Conexiones históricas con Latinoamérica.',
  culturalFacts: [
    'Sagrada Familia de Gaudí',
    'Flamenco y paella',
    'Don Quijote de Cervantes',
    'Segunda lengua más hablada del mundo',
  ],
  migrationContext: {
    reasons: ['Idioma compartido', 'Crisis latinoamericanas', 'Conexiones familiares', 'Puerta a UE'],
    challenges: ['Xenofobia y racismo', 'Crisis económica 2008', 'Desempleo juvenil', 'Papeles difíciles'],
    destinations: ['Francia', 'Alemania', 'Reino Unido', 'Retorno'],
    statistics: { immigrants: '5.8 millones de inmigrantes', topOrigin: 'Marruecos, Rumania, Ecuador' },
  },
  activities: [
    {
      id: 'espana_trivia',
      type: 'trivia',
      title: 'La Madre Patria',
      description: 'Descubre España',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Cuál es el plato típico más famoso de España?',
          options: ['Tacos', 'Paella', 'Sushi', 'Pizza'],
          correctAnswer: 1,
          explanation: 'La paella es el plato más famoso de España, originario de Valencia. Se hace con arroz, azafrán, mariscos o pollo y verduras.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué idioma es el segundo más hablado del mundo?',
          options: ['Inglés', 'Español', 'Chino', 'Francés'],
          correctAnswer: 1,
          explanation: 'El español es el segundo idioma más hablado por número de hablantes nativos, con más de 500 millones de personas que lo hablan en el mundo.',
          difficulty: 'easy',
        },
        {
          question: '¿Quién diseñó la famosa Sagrada Familia en Barcelona?',
          options: ['Picasso', 'Dalí', 'Gaudí', 'Velázquez'],
          correctAnswer: 2,
          explanation: 'Antoni Gaudí diseñó la Sagrada Familia, una basílica única que comenzó en 1882 y todavía está en construcción. Es el símbolo más famoso de Barcelona.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué baile tradicional es famoso en España?',
          options: ['Tango', 'Salsa', 'Flamenco', 'Samba'],
          correctAnswer: 2,
          explanation: 'El flamenco es el baile tradicional más famoso de España, originario de Andalucía. Combina cante, baile y guitarra con mucha pasión y emoción.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos inmigrantes aproximadamente viven en España?',
          options: ['2 millones', '3.5 millones', '5.8 millones', '8 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 5.8 millones de inmigrantes viven en España. Muchos son de Latinoamérica debido al idioma compartido y las conexiones históricas.',
          difficulty: 'hard',
        },
        {
          question: '¿Quién escribió la famosa novela Don Quijote de la Mancha?',
          options: ['Gabriel García Márquez', 'Miguel de Cervantes', 'Pablo Neruda', 'Federico García Lorca'],
          correctAnswer: 1,
          explanation: 'Miguel de Cervantes escribió Don Quijote de la Mancha en 1605. Es considerada una de las mejores novelas de la historia y el libro más importante de la literatura española.',
          difficulty: 'hard',
        },
      ],
      rewards: { stars: 3, money: 180, experience: 120 },
    },
    {
      id: 'espana_puzzle',
      type: 'puzzle',
      title: 'Sagrada Familia',
      description: 'Arma la basílica de Gaudí',
      difficulty: 'hard',
      imageUrl: 'sagrada_familia.jpg',
      gridSize: 5,
      rewards: { stars: 3, money: 150, experience: 110 },
    },
    {
      id: 'espana_memory',
      type: 'memory',
      title: 'Cultura Española',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '💃' }, // Flamenco
        { id: 2, content: '🏰' }, // Castillos y palacios
        { id: 3, content: '🥘' }, // Paella
        { id: 4, content: '⚽' }, // Fútbol (Real Madrid, Barcelona)
        { id: 5, content: '🎨' }, // Arte (Picasso, Dalí, Velázquez)
        { id: 6, content: '🐂' }, // Toros
        { id: 7, content: '🌊' }, // Costas mediterráneas
        { id: 8, content: '🏛️' }, // Sagrada Familia
        { id: 9, content: '🎸' }, // Guitarra española
        { id: 10, content: '🍷' }, // Vino español
        { id: 11, content: '👑' }, // Monarquía
        { id: 12, content: '📚' }, // Don Quijote
        { id: 13, content: '🌞' }, // Sol mediterráneo
        { id: 14, content: '🥖' }, // Pan y jamón
        { id: 15, content: '🎭' }, // Teatro y cultura
        { id: 16, content: '🗺️' }, // Imperio español histórico
      ],
      maxPairs: 16,
      rewards: { stars: 2, money: 130, experience: 95 },
    },
  ],
  requiredStats: {
    minMoney: 800,
    minHealth: 80,
    minMoral: 70,
    requiredDocuments: ['passport', 'visa'],
  },
  availablePortals: ['aereo', 'maritimo'],
  unlockConditions: {
    previousCountries: ['estadosunidos'],
    minStars: 14,
  },
};

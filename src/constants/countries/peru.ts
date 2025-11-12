/**
 * Perú - País 17
 */

import { Country } from './types';

export const peru: Country = {
  id: 'peru',
  name: 'Perú',
  region: 'South America',
  flag: '🇵🇪',
  coordinates: { latitude: -9.19, longitude: -75.0152 },

  description: 'Cuna del Imperio Inca. Rica herencia cultural y migración hacia Chile, Argentina y España.',

  culturalFacts: [
    'Machu Picchu, una de las 7 maravillas modernas',
    'Gastronomía reconocida mundialmente',
    'Idiomas: Español, quechua, aymara',
    'Líneas de Nazca, misterio arqueológico',
  ],

  migrationContext: {
    reasons: [
      'Crisis económica de los 80-90',
      'Terrorismo (Sendero Luminoso)',
      'Desempleo profesional',
      'Búsqueda de estudios superiores',
    ],
    challenges: [
      'Xenofobia en Chile y Argentina',
      'Subvaloración profesional',
      'Explotación laboral',
      'Discriminación',
    ],
    destinations: ['Estados Unidos', 'España', 'Chile', 'Argentina', 'Italia'],
    statistics: {
      emigrants: '3 millones de peruanos en el exterior',
      remittances: '$3.7 mil millones USD',
      topDestination: 'Estados Unidos (30% de emigrantes)',
    },
  },

  activities: [
    {
      id: 'peru_trivia',
      type: 'trivia',
      title: 'Imperio Inca',
      description: 'Conoce el Perú',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Dónde está Machu Picchu?',
          options: ['Chile', 'Perú', 'Bolivia', 'Ecuador'],
          correctAnswer: 1,
          explanation: 'Machu Picchu está en Perú, es una antigua ciudadela inca en los Andes. Fue construida en el siglo XV y es una de las Siete Maravillas del Mundo Moderno.',
          difficulty: 'easy',
        },
        {
          question: '¿Por qué es famosa la gastronomía peruana?',
          options: ['Por ser picante', 'Por su diversidad y fusión', 'Por ser vegetariana', 'Por usar pescado'],
          correctAnswer: 1,
          explanation: 'La gastronomía peruana es reconocida mundialmente por su increíble diversidad y fusión de culturas (inca, española, africana, china, japonesa). El ceviche es su plato más famoso.',
          difficulty: 'easy',
        },
        {
          question: '¿Cuántos idiomas oficiales tiene Perú?',
          options: ['1', '2', '3', 'Más de 3'],
          correctAnswer: 3,
          explanation: 'Perú reconoce el español, quechua, aymara y otras 47 lenguas amazónicas como idiomas oficiales. El quechua era la lengua del Imperio Inca.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué son las Líneas de Nazca?',
          options: ['Carreteras incas', 'Geoglifos antiguos', 'Ríos secos', 'Caminos de sal'],
          correctAnswer: 1,
          explanation: 'Las Líneas de Nazca son geoglifos gigantes trazados en el desierto hace más de 2000 años por la cultura Nazca. Solo pueden verse completamente desde el aire y su propósito exacto sigue siendo un misterio.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos peruanos aproximadamente viven en el exterior?',
          options: ['1 millón', '2 millones', '3 millones', '5 millones'],
          correctAnswer: 2,
          explanation: 'Aproximadamente 3 millones de peruanos viven fuera del país, principalmente en Estados Unidos, España, Chile y Argentina. Muchos emigraron durante la crisis económica y el terrorismo de los años 80-90.',
          difficulty: 'hard',
        },
        {
          question: '¿Cuál fue el principal motivo de emigración peruana en los años 80-90?',
          options: ['Terremotos', 'Terrorismo y crisis económica', 'Inundaciones', 'Búsqueda de aventura'],
          correctAnswer: 1,
          explanation: 'Durante los años 80-90, la violencia terrorista de Sendero Luminoso y la grave crisis económica (hiperinflación) causaron una masiva emigración de peruanos, especialmente profesionales y familias de clase media.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 150,
        experience: 110,
      },
    },
    {
      id: 'peru_puzzle',
      type: 'puzzle',
      title: 'Machu Picchu',
      description: 'Arma la maravilla inca',
      difficulty: 'hard',
      imageUrl: 'machu_picchu.jpg',
      gridSize: 5,
      rewards: {
        stars: 3,
        money: 130,
        experience: 100,
      },
    },
    {
      id: 'peru_memory',
      type: 'memory',
      title: 'Cultura Peruana',
      description: 'Encuentra parejas',
      difficulty: 'medium',
      pairs: [
        { id: 1, content: '🏔️' }, // Machu Picchu
        { id: 2, content: '🦙' }, // Llamas y alpacas
        { id: 3, content: '🏛️' }, // Ruinas incas
        { id: 4, content: '🍴' }, // Gastronomía (ceviche)
        { id: 5, content: '🎭' }, // Cultura inca
        { id: 6, content: '🌄' }, // Andes
        { id: 7, content: '🦜' }, // Guacamayo
        { id: 8, content: '🌊' }, // Costa del Pacífico
        { id: 9, content: '🌿' }, // Amazonía peruana
        { id: 10, content: '🎶' }, // Música andina
        { id: 11, content: '🍵' }, // Mate de coca
        { id: 12, content: '🏺' }, // Cerámica precolombina
        { id: 13, content: '☀️' }, // Líneas de Nazca
        { id: 14, content: '🐠' }, // Ceviche
        { id: 15, content: '🎪' }, // Festividades
        { id: 16, content: '💎' }, // Oro inca
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
  ],

  requiredStats: {
    minMoney: 450,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['ecuador'],
    minStars: 38,
  },
};

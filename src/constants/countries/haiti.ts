/**
 * Haiti - País 13
 */

import { Country } from './types';

export const haiti: Country = {
  id: 'haiti',
  name: 'Haití',
  region: 'Caribbean',
  flag: '🇭🇹',
  coordinates: { latitude: 18.9712, longitude: -72.2852 },

  description: 'Primera república negra independiente. Enfrenta desafíos de pobreza, desastres naturales e inestabilidad.',

  culturalFacts: [
    'Primera revolución de esclavos exitosa (1804)',
    'Idiomas: Criollo haitiano y francés',
    'Arte y música vibrantes (compas, rara)',
    'Religión: Vudú y cristianismo',
  ],

  migrationContext: {
    reasons: [
      'Pobreza extrema (60% bajo línea de pobreza)',
      'Terremotos devastadores (2010, 2021)',
      'Inestabilidad política y violencia de pandillas',
      'Falta de servicios básicos',
    ],
    challenges: [
      'Discriminación y racismo en países receptores',
      'Viajes peligrosos por mar',
      'Explotación laboral',
      'Deportaciones masivas',
    ],
    destinations: ['República Dominicana', 'Estados Unidos', 'Chile', 'Brasil'],
    statistics: {
      emigrants: '1.6 millones de haitianos en el exterior',
      remittances: '$3.8 mil millones USD (37% del PIB)',
      topDestination: 'República Dominicana (750 mil haitianos)',
    },
  },

  activities: [
    {
      id: 'haiti_trivia',
      type: 'trivia',
      title: 'Haití: Historia y Resiliencia',
      description: 'Conoce la historia haitiana',
      difficulty: 'hard',
      questions: [
        {
          question: '¿Qué desastre natural golpeó fuertemente a Haití en 2010?',
          options: ['Huracán', 'Terremoto', 'Tsunami', 'Inundación'],
          correctAnswer: 1,
          explanation: 'El terremoto de 2010 devastó Haití, causando más de 200,000 muertes y dejando a millones sin hogar. Fue uno de los desastres más mortales de la historia reciente.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué idiomas se hablan en Haití?',
          options: ['Solo francés', 'Español y francés', 'Criollo haitiano y francés', 'Solo inglés'],
          correctAnswer: 2,
          explanation: 'En Haití se hablan dos idiomas oficiales: el criollo haitiano (hablado por toda la población) y el francés (usado en educación y gobierno). El criollo es una mezcla de francés con lenguas africanas.',
          difficulty: 'easy',
        },
        {
          question: '¿En qué año obtuvo Haití su independencia?',
          options: ['1791', '1804', '1821', '1850'],
          correctAnswer: 1,
          explanation: 'Haití obtuvo independencia en 1804, siendo la primera república negra del mundo y el resultado de la única revolución de esclavos exitosa en la historia. Fue la segunda nación independiente de América después de Estados Unidos.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuál es el principal destino de migrantes haitianos?',
          options: ['Estados Unidos', 'República Dominicana', 'Canadá', 'Francia'],
          correctAnswer: 1,
          explanation: 'República Dominicana alberga aproximadamente 750 mil haitianos, siendo el principal destino. Muchos haitianos cruzan la frontera terrestre buscando trabajo en agricultura y construcción.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje del PIB haitiano representan las remesas?',
          options: ['10%', '20%', '37%', '50%'],
          correctAnswer: 2,
          explanation: 'Las remesas representan el 37% del PIB haitiano, siendo vitales para la economía del país. Aproximadamente $3.8 mil millones USD son enviados anualmente por haitianos en el exterior.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué porcentaje de la población haitiana vive bajo la línea de pobreza?',
          options: ['30%', '45%', '60%', '75%'],
          correctAnswer: 2,
          explanation: 'Aproximadamente el 60% de la población haitiana vive bajo la línea de pobreza. Esta pobreza extrema, combinada con desastres naturales e inestabilidad política, es una de las principales causas de migración.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 140,
        experience: 130,
      },
    },
    {
      id: 'haiti_puzzle',
      type: 'puzzle',
      title: 'Arte Haitiano',
      description: 'Arma una pintura haitiana',
      difficulty: 'medium',
      imageUrl: 'haiti_art.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 100,
        experience: 80,
      },
    },
    {
      id: 'haiti_memory',
      type: 'memory',
      title: 'Cultura Haitiana',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🎨' }, // Arte haitiano vibrante
        { id: 2, content: '🥁' }, // Tambores (compas, rara)
        { id: 3, content: '🌴' }, // Palmeras
        { id: 4, content: '🏝️' }, // Isla caribeña
        { id: 5, content: '⛪' }, // Cristianismo y vudú
        { id: 6, content: '🎭' }, // Cultura y teatro
        { id: 7, content: '🏛️' }, // Palacio Sans-Souci
        { id: 8, content: '⛰️' }, // Montañas
        { id: 9, content: '🌊' }, // Mar Caribe
        { id: 10, content: '🎵' }, // Música compas
        { id: 11, content: '📚' }, // Literatura creole
        { id: 12, content: '🌺' }, // Hibisco
        { id: 13, content: '🍚' }, // Arroz y frijoles
        { id: 14, content: '🦜' }, // Aves tropicales
        { id: 15, content: '🏖️' }, // Playas
        { id: 16, content: '🎪' }, // Carnaval
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 85,
        experience: 60,
      },
    },
  ],

  requiredStats: {
    minMoney: 350,
    minHealth: 55,
    minMoral: 45,
    requiredDocuments: ['passport'],
  },

  availablePortals: ['maritimo', 'clandestino', 'refugiado'],

  unlockConditions: {
    previousCountries: ['cuba'],
    minStars: 26,
  },
};

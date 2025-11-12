/**
 * Costa Rica - País 11
 */

import { Country } from './types';

export const costarica: Country = {
  id: 'costarica',
  name: 'Costa Rica',
  region: 'Central America',
  flag: '🇨🇷',
  coordinates: { latitude: 9.7489, longitude: -83.7534 },

  description: 'País conocido por su estabilidad democrática y conservación ambiental. Destino y tránsito migratorio.',

  culturalFacts: [
    'No tiene ejército desde 1948',
    '25% del territorio son áreas protegidas',
    'Pura Vida es la frase nacional',
    'Líder en energía renovable',
  ],

  migrationContext: {
    reasons: [
      'País de tránsito hacia Panamá y Estados Unidos',
      'Destino para nicaragüenses y venezolanos',
      'Economía relativamente estable',
      'Sistema de salud público',
    ],
    challenges: [
      'Xenofobia hacia migrantes',
      'Saturación de servicios públicos',
      'Requisitos migratorios estrictos',
      'Costo de vida elevado',
    ],
    destinations: ['Estados Unidos', 'España', 'Canadá'],
    statistics: {
      emigrants: '150 mil costarricenses en el exterior',
      immigrants: '500 mil inmigrantes en Costa Rica (10% población)',
      topOrigin: 'Nicaragua (principal origen de inmigrantes)',
    },
  },

  activities: [
    {
      id: 'costarica_trivia',
      type: 'trivia',
      title: 'Pura Vida',
      description: 'Descubre Costa Rica',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué significa la frase "Pura Vida" en Costa Rica?',
          options: ['Buena suerte', 'Una filosofía de vida positiva', 'Adiós', 'Bienvenido'],
          correctAnswer: 1,
          explanation: 'Pura Vida es la frase nacional de Costa Rica. Es más que un saludo, representa una filosofía de vida positiva, relajada y apreciando las cosas simples.',
          difficulty: 'easy',
        },
        {
          question: '¿Desde cuándo Costa Rica no tiene ejército?',
          options: ['1848', '1948', '2000', '1900'],
          correctAnswer: 1,
          explanation: 'Costa Rica abolió su ejército en 1948 tras una guerra civil. Es uno de los pocos países del mundo sin fuerzas armadas, invirtiendo esos recursos en educación y salud.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué porcentaje del territorio costarricense son áreas protegidas?',
          options: ['10%', '25%', '50%', '75%'],
          correctAnswer: 1,
          explanation: 'Aproximadamente el 25% del territorio costarricense está protegido en parques nacionales y reservas. Costa Rica es líder mundial en conservación ambiental.',
          difficulty: 'medium',
        },
        {
          question: '¿De qué país provienen la mayoría de los inmigrantes en Costa Rica?',
          options: ['Venezuela', 'Nicaragua', 'Colombia', 'Honduras'],
          correctAnswer: 1,
          explanation: 'Nicaragua es el principal país de origen de inmigrantes en Costa Rica, representando aproximadamente el 70% de la población inmigrante debido a la proximidad y búsqueda de mejores oportunidades.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué porcentaje de la población costarricense son inmigrantes?',
          options: ['5%', '10%', '15%', '20%'],
          correctAnswer: 1,
          explanation: 'Aproximadamente el 10% de la población en Costa Rica son inmigrantes (cerca de 500 mil personas), principalmente nicaragüenses y venezolanos.',
          difficulty: 'hard',
        },
        {
          question: '¿En qué destaca Costa Rica a nivel energético?',
          options: ['Petróleo', 'Energía renovable', 'Gas natural', 'Carbón'],
          correctAnswer: 1,
          explanation: 'Costa Rica es líder mundial en energía renovable. El país ha logrado operar varios años consecutivos con casi 100% de su electricidad proveniente de fuentes renovables como hidroeléctrica, eólica y geotérmica.',
          difficulty: 'hard',
        },
      ],
      rewards: {
        stars: 3,
        money: 160,
        experience: 110,
      },
    },
    {
      id: 'costarica_puzzle',
      type: 'puzzle',
      title: 'Biodiversidad Tica',
      description: 'Arma la selva tropical',
      difficulty: 'medium',
      imageUrl: 'costarica_rainforest.jpg',
      gridSize: 4,
      rewards: {
        stars: 2,
        money: 110,
        experience: 80,
      },
    },
    {
      id: 'costarica_memory',
      type: 'memory',
      title: 'Flora y Fauna',
      description: 'Encuentra parejas de animales',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🦥' }, // Perezosos
        { id: 2, content: '🦜' }, // Guacamayas
        { id: 3, content: '🐸' }, // Rana de ojos rojos
        { id: 4, content: '🦋' }, // Mariposas
        { id: 5, content: '🌴' }, // Palmeras
        { id: 6, content: '🌊' }, // Playas
        { id: 7, content: '🌋' }, // Volcán Arenal
        { id: 8, content: '☕' }, // Café costarricense
        { id: 9, content: '🐢' }, // Tortugas marinas
        { id: 10, content: '🌺' }, // Guaria morada (flor nacional)
        { id: 11, content: '🦎' }, // Reptiles
        { id: 12, content: '🌿' }, // Selva tropical
        { id: 13, content: '🏞️' }, // Parques nacionales
        { id: 14, content: '🐵' }, // Monos
        { id: 15, content: '🎋' }, // Bambú
        { id: 16, content: '🦅' }, // Águila harpía
      ],
      maxPairs: 16,
      rewards: {
        stars: 2,
        money: 90,
        experience: 65,
      },
    },
  ],

  requiredStats: {
    minMoney: 400,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport', 'visa'],
  },

  availablePortals: ['aereo', 'terrestre', 'maritimo'],

  unlockConditions: {
    previousCountries: ['nicaragua'],
    minStars: 20,
  },
};

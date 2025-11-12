/**
 * Panamá - País 3
 */

import { Country } from './types';

export const panama: Country = {
  id: 'panama',
  name: 'Panamá',
  region: 'Central America',
  flag: '🇵🇦',
  coordinates: { latitude: 8.538, longitude: -80.7821 },
  description: 'Puente entre dos océanos y dos continentes.',
  culturalFacts: [
    'Canal de Panamá conecta Atlántico y Pacífico',
    'Casco Viejo colonial Patrimonio de la Humanidad',
    'Primera línea transcontinental del mundo',
    'Dolarizado desde 1904',
  ],
  migrationContext: {
    reasons: ['País de tránsito hacia el norte', 'Hub de conexiones', 'Economía dolarizada'],
    challenges: ['Selva del Darién peligrosa', 'Tráfico de personas', 'Costos elevados'],
    destinations: ['Estados Unidos', 'España', 'Costa Rica'],
    statistics: { emigrants: '130 mil panameños fuera', topDestination: 'Estados Unidos' },
  },
  activities: [
    {
      id: 'panama_trivia',
      type: 'trivia',
      title: 'Puente del Mundo',
      description: 'Aprende sobre Panamá',
      difficulty: 'medium',
      questions: [
        {
          question: '¿Qué conecta el famoso Canal de Panamá?',
          options: ['Dos ríos', 'Dos océanos', 'Dos lagos', 'Dos países'],
          correctAnswer: 1,
          explanation: 'El Canal de Panamá conecta el Océano Atlántico con el Océano Pacífico. Es una de las obras de ingeniería más importantes del mundo y permite que los barcos crucen sin rodear toda Sudamérica.',
          difficulty: 'easy',
        },
        {
          question: '¿Desde qué año Panamá usa el dólar como moneda?',
          options: ['1904', '1950', '1980', '2000'],
          correctAnswer: 0,
          explanation: 'Panamá ha usado el dólar estadounidense como su moneda oficial desde 1904. Esto ha proporcionado estabilidad económica al país.',
          difficulty: 'easy',
        },
        {
          question: '¿Qué zona histórica de Panamá es Patrimonio de la Humanidad?',
          options: ['Zona del Canal', 'Casco Viejo', 'Panamá Viejo', 'Bocas del Toro'],
          correctAnswer: 1,
          explanation: 'El Casco Viejo (también llamado Casco Antiguo) es el barrio colonial de Ciudad de Panamá, declarado Patrimonio de la Humanidad por la UNESCO por su arquitectura e historia.',
          difficulty: 'medium',
        },
        {
          question: '¿Qué selva peligrosa deben cruzar muchos migrantes en su camino hacia el norte?',
          options: ['La Amazonía', 'El Darién', 'El Congo', 'Borneo'],
          correctAnswer: 1,
          explanation: 'La selva del Darién, entre Colombia y Panamá, es una de las rutas migratorias más peligrosas del mundo. Es densa, sin caminos, con animales salvajes y grupos criminales.',
          difficulty: 'medium',
        },
        {
          question: '¿Cuántos panameños aproximadamente viven en el exterior?',
          options: ['50 mil', '130 mil', '300 mil', '500 mil'],
          correctAnswer: 1,
          explanation: 'Aproximadamente 130 mil panameños viven fuera del país, principalmente en Estados Unidos, donde buscan mejores oportunidades educativas y laborales.',
          difficulty: 'hard',
        },
        {
          question: '¿Qué significa que Panamá sea el "Puente del Mundo"?',
          options: ['Tiene muchos puentes', 'Conecta continentes y océanos', 'Es una isla', 'Tiene un puente famoso'],
          correctAnswer: 1,
          explanation: 'Panamá es llamado "Puente del Mundo, Corazón del Universo" porque conecta América del Norte con América del Sur y, a través del canal, une el Atlántico con el Pacífico, siendo un punto estratégico del comercio mundial.',
          difficulty: 'hard',
        },
      ],
      rewards: { stars: 2, money: 100, experience: 70 },
    },
    {
      id: 'panama_puzzle',
      type: 'puzzle',
      title: 'Canal de Panamá',
      description: 'Arma la maravilla de ingeniería',
      difficulty: 'medium',
      imageUrl: 'panama_canal.jpg',
      gridSize: 4,
      rewards: { stars: 2, money: 90, experience: 65 },
    },
    {
      id: 'panama_memory',
      type: 'memory',
      title: 'Símbolos Panameños',
      description: 'Encuentra parejas',
      difficulty: 'easy',
      pairs: [
        { id: 1, content: '🚢' }, // Canal de Panamá
        { id: 2, content: '🏛️' }, // Casco Viejo
        { id: 3, content: '🌴' }, // Palmeras
        { id: 4, content: '🦜' }, // Guacamaya
        { id: 5, content: '🌊' }, // Dos océanos
        { id: 6, content: '💵' }, // Dólar
        { id: 7, content: '🌿' }, // Selva del Darién
        { id: 8, content: '🏝️' }, // Islas San Blas
        { id: 9, content: '🎭' }, // Cultura indígena
        { id: 10, content: '🐊' }, // Caimanes
        { id: 11, content: '🦅' }, // Águila harpía
        { id: 12, content: '🌺' }, // Flor del Espíritu Santo
        { id: 13, content: '🎺' }, // Música típica
        { id: 14, content: '🥥' }, // Coco
        { id: 15, content: '🌉' }, // Puente del Mundo
        { id: 16, content: '🐠' }, // Peces tropicales
      ],
      maxPairs: 16,
      rewards: { stars: 2, money: 70, experience: 55 },
    },
  ],
  requiredStats: {
    minMoney: 200,
    minHealth: 70,
    minMoral: 60,
    requiredDocuments: ['passport'],
  },
  availablePortals: ['terrestre', 'aereo', 'maritimo', 'clandestino'],
  unlockConditions: {
    previousCountries: ['colombia'],
    minStars: 5,
  },
};

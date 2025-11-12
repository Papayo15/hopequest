/**
 * Configuración general del juego Hope Quest
 * Educational game about migration, geography and cultural diversity
 */

export const GameConfig = {
  // Información del juego
  name: 'Hope Quest',
  version: '1.0.0',
  targetAgeMin: 6,
  targetAgeMax: 14,

  // Países
  totalCountries: 35,
  freeCountries: 10, // Países gratuitos en versión free
  countriesPerContinent: 7,

  // Ruta completa del juego (35 países en orden narrativo)
  // Historia: Familia huye de Venezuela hacia Estados Unidos (el sueño americano)
  // Viajan por Centroamérica, luego exploran el mundo, y finalmente llegan a USA
  // Final: Enfrentan a Don Bowser en Estados Unidos
  countryRoute: [
    'venezuela',      // 1 - INICIO: Hogar, deben huir por crisis
    'colombia',       // 2 - Encuentro con Xolo (guía)
    'panama',         // 3 - Canal de Panamá (checkpoint importante)
    'costarica',      // 4 - Descanso y esperanza
    'nicaragua',      // 5 - Desafíos del camino
    'honduras',       // 6 - Caravana de migrantes
    'elsalvador',     // 7 - Violencia y supervivencia
    'guatemala',      // 8 - Frontera peligrosa
    'mexico',         // 9 - Último tramo antes de USA
    'cuba',           // 10 - Desvío por vía marítima
    'haiti',          // 11 - Refugiados y solidaridad
    'republicadominicana', // 12 - Apoyo de comunidad
    'jamaica',        // 13 - Pausa cultural
    'ecuador',        // 14 - Retorno a Sudamérica (flashback)
    'peru',           // 15 - Historia de incas
    'bolivia',        // 16 - Altiplano y resistencia
    'chile',          // 17 - Frontera sur
    'argentina',      // 18 - Refugio temporal
    'uruguay',        // 19 - Paz relativa
    'paraguay',       // 20 - Paso por interior
    'brasil',         // 21 - Amazonía y diversidad
    'surinam',        // 22 - Ruta al norte
    'espana',         // 23 - Puente a Europa
    'portugal',       // 24 - Hermanos ibéricos
    'francia',        // 25 - Capital europea
    'italia',         // 26 - Roma y cultura
    'alemania',       // 27 - Refugiados en Europa
    'reinounido',     // 28 - Brexit y migración
    'marruecos',      // 29 - Gateway África
    'sudafrica',      // 30 - Encuentro con Isabella (adoptada)
    'turquia',        // 31 - Puente Asia-Europa
    'india',          // 32 - Diversidad extrema
    'filipinas',      // 33 - Migración laboral
    'australia',      // 34 - Isla de inmigrantes
    'estadosunidos',  // 35 - FINAL: Batalla contra Don Bowser, logran el sueño
  ] as const,

  // Continentes
  continents: ['americas', 'europe', 'asia', 'africa', 'oceania'] as const,

  // Sistema de dificultad (ajustado para 5-12 años)
  difficulty: {
    levels: 3,
    level1: {
      name: 'Exploradores Jóvenes',
      ageRange: [5, 7],
      countries: [1, 12], // IDs de países
      puzzlePieces: 6,
      memoryPairs: 6,
      physicsLaunches: 7,
      showTrajectory: true,
      questionDifficulty: 'easy' as const,
    },
    level2: {
      name: 'Aventureros Valientes',
      ageRange: [8, 10],
      countries: [13, 25],
      puzzlePieces: 12,
      memoryPairs: 10,
      physicsLaunches: 5,
      showTrajectory: 'partial',
      questionDifficulty: 'medium' as const,
    },
    level3: {
      name: 'Viajeros Expertos',
      ageRange: [11, 12],
      countries: [26, 35],
      puzzlePieces: 20,
      memoryPairs: 16,
      physicsLaunches: 3,
      showTrajectory: false,
      questionDifficulty: 'hard' as const,
    },
  },

  // Sistema de estrellas
  stars: {
    maxPerMode: 3, // Máximo de estrellas por modo (aventura o físico)
    maxPerCountry: 6, // 3 aventura + 3 físico
    maxTotal: 210, // 35 países × 6 estrellas
    thresholds: {
      adventure: {
        3: 100, // % de preguntas correctas
        2: 70,
        1: 40,
      },
      physics: {
        // Basado en lanzamientos usados vs disponibles
        3: 'optimal', // Usar <= lanzamientos óptimos
        2: 'optimal + 2',
        1: 'complete', // Solo completar
      },
    },
  },

  // Actividades educativas
  activities: {
    typesCount: 12,
    perCountry: 3,
    types: [
      'tap_explorer',
      'puzzle',
      'memory',
      'whats_different',
      'match_colors',
      'trivia',
      'sequence_order',
      'hidden_objects',
      'connect_dots',
      'logic_puzzle',
      'timeline',
      'map_navigator',
    ] as const,
  },

  // Personajes (La Familia Migrante + Aliados)
  // NUEVO SISTEMA: Usuario elige el género del protagonista
  characters: {
    familyCount: 5,
    villainCount: 1,
    // Protagonista puede ser niño o niña (usuario elige nombre)
    protagonist: {
      boy: 'custom_boy', // Usuario pone nombre, default "Pepe"
      girl: 'custom_girl', // Usuario pone nombre, default "Paula"
    },
    // Familia completa se descubre durante el juego
    family: ['protagonist', 'companion', 'isabella', 'xolo'] as const,
    // Compañero es el género opuesto al protagonista
    companion: {
      ifProtagonistBoy: 'paula', // Niña que encuentran en la ruta
      ifProtagonistGirl: 'pepe', // Niño que encuentran en la ruta
    },
    // Isabella es siempre la niña adoptada (reemplaza a Teo)
    adoptedChild: 'isabella',
    villain: 'don_bowser',
    enemies: ['koopa_hielo'] as const,
    descriptions: {
      custom_boy: 'Niño valiente que inicia el viaje migratorio (elegido por usuario)',
      custom_girl: 'Niña valiente que inicia el viaje migratorio (elegida por usuario)',
      pepe: 'Niño encontrado durante la ruta, se une a la aventura',
      paula: 'Niña encontrada durante la ruta, se une a la aventura',
      isabella: 'Niña adoptada por la familia durante el viaje',
      xolo: 'Ajolote sabio, guía espiritual mexicano',
      don_bowser: 'Empresario viejo autoritario, sátira de Trump (inspirado en Bowser)',
      koopa_hielo: 'Guardias con insignias de hielo, representan ICE/sistema migratorio',
    },
  },

  // Modo físico
  physics: {
    maxLaunchesDefault: 5,
    trajectoryDotsCount: 30,
    trajectoryDotSpacing: 10, // pixels
  },

  // Recompensas
  rewards: {
    culturalObjects: 35, // Uno por país
    passportStamps: 35,
    avatarItems: 35, // Ropa cultural
    achievements: 30, // Logros especiales
  },

  // Audio
  audio: {
    musicThemes: 5,
    sfxCount: 50,
    defaultVolume: {
      music: 0.6,
      sfx: 0.8,
    },
  },

  // Localización (5 idiomas más hablados)
  localization: {
    supportedLanguages: [
      'es', // Español (lengua materna de Marco)
      'en', // Inglés (destino principal)
      'zh', // Mandarín (más hablado del mundo)
      'hi', // Hindi (segundo más hablado)
      'ar', // Árabe (importante en rutas migratorias)
    ] as const,
    defaultLanguage: 'es',
  },

  // Monetización (Juego de pago)
  monetization: {
    paidApp: {
      downloadPrice: 3.99, // Precio de descarga única
      subscriptionYearly: 9.99, // Alternativa: membresía anual
      allCountries: 35, // Todos los países incluidos
    },
    noAds: true, // Sin publicidad (mejor experiencia)
    schoolVersion: {
      yearlyPricePerClassroom: 99, // Licencia para aula de 30 estudiantes
      maxStudents: 30,
      includesTeacherDashboard: true,
      includesLessonPlans: true, // 35 PDFs descargables
    },
  },

  // Límites y rangos
  limits: {
    minSessionTime: 60, // segundos (1 minuto)
    maxSessionTime: 3600, // segundos (1 hora)
    minAge: 6,
    maxAge: 14,
    maxUsernameLength: 20,
    minPasswordLength: 6,
  },

  // URLs
  urls: {
    privacyPolicy: 'https://hopequest.app/privacy',
    termsOfService: 'https://hopequest.app/terms',
    support: 'https://hopequest.app/support',
    feedback: 'https://hopequest.app/feedback',
  },

  // Firebase collections
  firebase: {
    collections: {
      users: 'users',
      progress: 'progress',
      leaderboards: 'leaderboards',
      analytics: 'analytics',
    },
  },

  // Feature flags
  features: {
    enableMultiplayer: false, // Futuro
    enableVoiceRecording: false, // Futuro
    enableAR: false, // Futuro
    enableOfflineMode: true,
    enableParentalControls: true,
    enableLeaderboards: true,
    enableAds: false, // Sin ads (juego de pago)
    enableMigrationContent: true, // Contenido de migración (15%)
    enableContentFilter: true, // Filtro de sensibilidad (nivel 1-5)
  },

  // Debug
  debug: {
    showFPS: false,
    showPhysicsDebug: false,
    unlockAllCountries: false,
    skipTutorial: false,
  },
};

export type Continent = typeof GameConfig.continents[number];
export type ActivityType = typeof GameConfig.activities.types[number];
export type FamilyCharacter = typeof GameConfig.characters.family[number];
export type VillainCharacter = typeof GameConfig.characters.villain;
export type EnemyCharacter = typeof GameConfig.characters.enemies[number];
export type SupportedLanguage = typeof GameConfig.localization.supportedLanguages[number];

// Nivel de sensibilidad del contenido migratorio (1 = muy suave, 5 = realista)
export type ContentSensitivityLevel = 1 | 2 | 3 | 4 | 5;

// NUEVO: Género del protagonista
export type ProtagonistGender = 'boy' | 'girl';

// NUEVO: Todos los personajes posibles (incluyendo custom)
export type CharacterName = 'pepe' | 'paula' | 'isabella' | 'xolo' | 'don_bowser' | 'koopa_hielo' | string; // string permite nombres custom

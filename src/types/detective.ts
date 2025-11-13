/**
 * Detective Mode Types
 * Modo investigación estilo Carmen Sandiego
 * Los niños recopilan pistas sobre países y culturas
 */

export interface DetectiveCase {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  targetCountry: string; // País que deben descubrir
  difficulty: 'easy' | 'medium' | 'hard';

  // Pistas distribuidas por el mapa
  clues: Clue[];

  // Pregunta final para resolver el caso
  finalQuestion: {
    question: LocalizedString;
    options: string[]; // IDs de países
    correctAnswer: string; // ID del país correcto
  };

  // Recompensas
  starsReward: number;
  coinsReward: number;
  badge?: string; // Insignia de detective
}

export interface Clue {
  id: string;
  type: 'geography' | 'culture' | 'food' | 'history' | 'language' | 'tradition';
  location: { x: number; y: number }; // Ubicación en el mapa
  description: LocalizedString;
  hint: LocalizedString; // Pista que da
  emoji: string;
  isCollected: boolean;
}

export interface LocalizedString {
  es: string;
  en: string;
}

// Casos de detective disponibles
export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case_mystery_tacos',
    title: {
      es: 'El Misterio de los Tacos Desaparecidos',
      en: 'The Mystery of the Disappearing Tacos',
    },
    description: {
      es: '¡Los tacos han desaparecido! Sigue las pistas para descubrir de qué país son originarios.',
      en: 'The tacos have disappeared! Follow the clues to discover which country they originated from.',
    },
    targetCountry: 'mexico',
    difficulty: 'easy',
    clues: [
      {
        id: 'clue_tacos_1',
        type: 'geography',
        location: { x: 100, y: 150 },
        description: {
          es: 'Este país está en América del Norte',
          en: 'This country is in North America',
        },
        hint: {
          es: '🗺️ Pista Geográfica: Busca un país entre Estados Unidos y Centroamérica',
          en: '🗺️ Geographic Clue: Look for a country between the United States and Central America',
        },
        emoji: '🗺️',
        isCollected: false,
      },
      {
        id: 'clue_tacos_2',
        type: 'culture',
        location: { x: 200, y: 180 },
        description: {
          es: 'Los aztecas vivieron aquí hace muchos años',
          en: 'The Aztecs lived here many years ago',
        },
        hint: {
          es: '🏛️ Pista Cultural: Busca pirámides antiguas y civilización azteca',
          en: '🏛️ Cultural Clue: Look for ancient pyramids and Aztec civilization',
        },
        emoji: '🏛️',
        isCollected: false,
      },
      {
        id: 'clue_tacos_3',
        type: 'food',
        location: { x: 150, y: 200 },
        description: {
          es: 'Aquí se inventaron los tacos, tamales y guacamole',
          en: 'Tacos, tamales and guacamole were invented here',
        },
        hint: {
          es: '🌮 Pista Gastronómica: Este país es famoso por sus tortillas de maíz',
          en: '🌮 Food Clue: This country is famous for its corn tortillas',
        },
        emoji: '🌮',
        isCollected: false,
      },
    ],
    finalQuestion: {
      question: {
        es: '¿De qué país son originarios los tacos?',
        en: 'Which country are tacos originally from?',
      },
      options: ['mexico', 'spain', 'usa', 'peru'],
      correctAnswer: 'mexico',
    },
    starsReward: 3,
    coinsReward: 200,
    badge: '🔍',
  },

  {
    id: 'case_mystery_flamenco',
    title: {
      es: 'El Caso del Baile Misterioso',
      en: 'The Case of the Mysterious Dance',
    },
    description: {
      es: '¡Alguien está bailando flamenco! ¿De dónde viene este baile tradicional?',
      en: 'Someone is dancing flamenco! Where does this traditional dance come from?',
    },
    targetCountry: 'spain',
    difficulty: 'easy',
    clues: [
      {
        id: 'clue_flamenco_1',
        type: 'geography',
        location: { x: 400, y: 200 },
        description: {
          es: 'Este país está en Europa, cerca del océano Atlántico',
          en: 'This country is in Europe, near the Atlantic Ocean',
        },
        hint: {
          es: '🗺️ Pista: Busca la península ibérica en Europa',
          en: '🗺️ Clue: Look for the Iberian Peninsula in Europe',
        },
        emoji: '🗺️',
        isCollected: false,
      },
      {
        id: 'clue_flamenco_2',
        type: 'language',
        location: { x: 450, y: 180 },
        description: {
          es: 'Aquí se habla español como idioma principal',
          en: 'Spanish is the main language here',
        },
        hint: {
          es: '💬 Pista: El español se originó en este país europeo',
          en: '💬 Clue: Spanish originated in this European country',
        },
        emoji: '💬',
        isCollected: false,
      },
      {
        id: 'clue_flamenco_3',
        type: 'tradition',
        location: { x: 420, y: 230 },
        description: {
          es: 'El flamenco es un baile tradicional con castañuelas',
          en: 'Flamenco is a traditional dance with castanets',
        },
        hint: {
          es: '💃 Pista: Busca el país donde nació el flamenco',
          en: '💃 Clue: Look for the country where flamenco was born',
        },
        emoji: '💃',
        isCollected: false,
      },
    ],
    finalQuestion: {
      question: {
        es: '¿De qué país es tradicional el baile flamenco?',
        en: 'Which country is flamenco dance traditional to?',
      },
      options: ['spain', 'mexico', 'italy', 'france'],
      correctAnswer: 'spain',
    },
    starsReward: 3,
    coinsReward: 200,
    badge: '🕵️',
  },

  {
    id: 'case_mystery_samba',
    title: {
      es: 'El Enigma del Carnaval',
      en: 'The Carnival Enigma',
    },
    description: {
      es: '¡Hay un carnaval enorme con samba! ¿En qué país se celebra el carnaval más famoso?',
      en: 'There is a huge carnival with samba! Which country celebrates the most famous carnival?',
    },
    targetCountry: 'brazil',
    difficulty: 'medium',
    clues: [
      {
        id: 'clue_samba_1',
        type: 'geography',
        location: { x: 300, y: 400 },
        description: {
          es: 'Es el país más grande de América del Sur',
          en: 'It is the largest country in South America',
        },
        hint: {
          es: '🗺️ Pista: Ocupa casi la mitad de Sudamérica',
          en: '🗺️ Clue: It occupies almost half of South America',
        },
        emoji: '🗺️',
        isCollected: false,
      },
      {
        id: 'clue_samba_2',
        type: 'language',
        location: { x: 330, y: 420 },
        description: {
          es: 'Aquí se habla portugués, no español',
          en: 'Portuguese is spoken here, not Spanish',
        },
        hint: {
          es: '💬 Pista: Único país de Sudamérica que habla portugués',
          en: '💬 Clue: The only South American country that speaks Portuguese',
        },
        emoji: '💬',
        isCollected: false,
      },
      {
        id: 'clue_samba_3',
        type: 'tradition',
        location: { x: 280, y: 450 },
        description: {
          es: 'El carnaval de Río es famoso en todo el mundo',
          en: 'The Rio carnival is famous worldwide',
        },
        hint: {
          es: '🎉 Pista: Busca la ciudad de Río de Janeiro',
          en: '🎉 Clue: Look for the city of Rio de Janeiro',
        },
        emoji: '🎉',
        isCollected: false,
      },
    ],
    finalQuestion: {
      question: {
        es: '¿En qué país se celebra el carnaval de Río?',
        en: 'Which country celebrates the Rio carnival?',
      },
      options: ['brazil', 'argentina', 'colombia', 'peru'],
      correctAnswer: 'brazil',
    },
    starsReward: 3,
    coinsReward: 250,
    badge: '🎭',
  },
];

// Estado del detective mode
export interface DetectiveModeState {
  activeCaseId: string | null;
  completedCases: string[];
  collectedClues: Record<string, string[]>; // caseId -> clueIds[]
  badges: string[];
  totalCasesSolved: number;
}

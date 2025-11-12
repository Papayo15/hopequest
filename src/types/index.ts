/**
 * Tipos TypeScript centralizados para Hope Quest
 * Educational game about migration, geography and cultural diversity
 */

import {
  SupportedLanguage,
  ActivityType,
  FamilyCharacter,
  VillainCharacter,
  EnemyCharacter,
  Continent,
  ContentSensitivityLevel
} from '@constants/gameConfig';

// ========== TIPOS DE PAÍS Y GEOGRAFÍA ==========

export interface Country {
  id: string;
  name: LocalizedString;
  continent: Continent;
  difficulty: 1 | 2 | 3;
  order: number; // 1-35

  culturalObject: CulturalObject;
  adventure: AdventureMode;
  bridgeBuilding: BridgeBuildingMode; // Renombrado de physicsGame
  metadata: CountryMetadata;

  // Contenido narrativo de la familia
  familyDialogue?: {
    character: FamilyCharacter;
    text: LocalizedString;
  }[];

  // NUEVO: Portal de salida al completar el país
  portalExit?: PortalExit;
}

export interface CulturalObject {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  funFact: LocalizedString;
  image: string; // path to asset
  model3D?: string; // optional 3D model path
}

export interface LocalizedString {
  es: string; // Español (lengua materna de Marco)
  en: string; // Inglés (destino principal)
  zh?: string; // Mandarín (más hablado del mundo)
  hi?: string; // Hindi (segundo más hablado)
  ar?: string; // Árabe (importante en rutas migratorias)
}

// ========== MODO AVENTURA ==========

export interface AdventureMode {
  intro: Cutscene;
  locations: Location[];
  clues: LocalizedString[];
  estimatedDuration: number; // minutes
}

export interface Cutscene {
  dialogue: LocalizedString;
  character: FamilyCharacter | VillainCharacter | EnemyCharacter;
  animation?: string; // Lottie file path
  duration: number; // seconds
}

export interface Location {
  id: string;
  name: LocalizedString;
  background: string; // asset path
  interactiveElements?: InteractiveElement[];
  activity: Activity;
  migrationContent?: MigrationContent; // NUEVO: Contenido de migración (15% del juego)
}

export interface InteractiveElement {
  id: string;
  type: 'monument' | 'object' | 'character';
  name: LocalizedString;
  position: Position;
  fact: LocalizedString;
  image?: string;
  sound?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  config: ActivityConfig;
}

// Configuraciones específicas por tipo de actividad
export type ActivityConfig =
  | TapExplorerConfig
  | PuzzleConfig
  | MemoryConfig
  | WhatsDifferentConfig
  | MatchColorsConfig
  | TriviaConfig
  | SequenceOrderConfig
  | HiddenObjectsConfig
  | ConnectDotsConfig
  | LogicPuzzleConfig
  | TimelineConfig
  | MapNavigatorConfig;

export interface TapExplorerConfig {
  elements: InteractiveElement[];
  minTapsRequired: number;
}

export interface PuzzleConfig {
  image: string;
  pieces: number; // 4, 6, 9, 12, 16, 20
  canRotate: boolean;
}

export interface MemoryConfig {
  pairs: number; // 6, 10, 16
  cards: MemoryCard[];
}

export interface MemoryCard {
  id: string;
  image: string;
  name?: LocalizedString;
}

export interface WhatsDifferentConfig {
  image1: string;
  image2: string;
  differences: Position[];
  differencesCount: number;
}

export interface MatchColorsConfig {
  items: Array<{
    id: string;
    name: LocalizedString;
    image: string;
    color: string;
  }>;
}

export interface TriviaConfig {
  question: LocalizedString;
  options: LocalizedString[];
  correctAnswer: number; // index
  explanation?: LocalizedString;
  image?: string;
  difficulty: 1 | 2 | 3;
}

export interface SequenceOrderConfig {
  title: LocalizedString;
  items: Array<{
    id: string;
    text: LocalizedString;
    image?: string;
    correctOrder: number;
  }>;
}

export interface HiddenObjectsConfig {
  backgroundImage: string;
  objectsToFind: Array<{
    id: string;
    name: LocalizedString;
    position: Position;
    size: Size;
  }>;
  timeLimit?: number; // seconds
}

export interface ConnectDotsConfig {
  dots: Position[];
  resultImage: string; // final monument/object
}

export interface LogicPuzzleConfig {
  type: 'crossword' | 'fill_blanks';
  clues: Array<{
    text: LocalizedString;
    answer: string;
  }>;
}

export interface TimelineConfig {
  events: Array<{
    id: string;
    name: LocalizedString;
    year: number;
    description: LocalizedString;
  }>;
}

export interface MapNavigatorConfig {
  targetCountry: string;
  neighboringCountries: string[];
  capital: LocalizedString;
}

// ========== CONTENIDO DE MIGRACIÓN (15% del juego) ==========

export interface MigrationContent {
  historicalContext?: MigrationFact;
  famousMigrants?: FamousMigrant[];
  culturalContributions?: CulturalContribution;
  modernReality?: MigrationFact;
  hopefulMessage: LocalizedString;
}

export interface MigrationFact {
  text: LocalizedString;
  sensitivityLevel: ContentSensitivityLevel; // 1-5
  parentalControlRequired?: boolean; // true si nivel >= 4
}

export interface FamousMigrant {
  name: string;
  origin: string;
  destination?: string;
  achievement: LocalizedString;
  quote?: LocalizedString;
  image?: string;
  sensitivityLevel: ContentSensitivityLevel;
}

export interface CulturalContribution {
  description: LocalizedString;
  examples: string[]; // Lista de ejemplos concretos
  sensitivityLevel: ContentSensitivityLevel;
}

// ========== MODO FÍSICO HÍBRIDO (Construcción + Destrucción) ==========

export interface BridgeBuildingMode {
  theme: string;
  background: string;
  music?: string;
  mode: 'build' | 'destroy' | 'boss'; // build (1-20), destroy (21-34), boss (35)
  objective: LocalizedString;
  structures: Structure[];
  helpersAvailable: number; // Renombrado de sagesAvailable
  optimalSolutions: number; // Renombrado de optimalLaunches
  starThresholds: StarThresholds;
  specialMechanics?: SpecialMechanic[];
}

// Alias para compatibilidad (deprecated, usar BridgeBuildingMode)
export type PhysicsMode = BridgeBuildingMode;

export interface Structure {
  id: string;
  type: 'gap' | 'wall' | 'tower' | 'castle' | 'custom'; // gap=construir, wall=destruir, castle=boss
  blocks: Block[];
  gap?: {
    width: number;
    height: number;
    startPosition: Position;
    endPosition: Position;
  }; // Solo para modo build
  culturalObjectPosition?: Position; // Where the object is hidden
  koopaPositions?: Position[]; // Posiciones de enemigos Koopa HIELO
}

export interface Block {
  id: string;
  shape: 'rectangle' | 'square' | 'circle' | 'triangle';
  material:
    // Materiales de construcción (modo build)
    | 'wood_plank'
    | 'rope'
    | 'steel_beam'
    // Materiales de destrucción (modo destroy)
    | 'prejudice_wall' // Muro rojo (prejuicios)
    | 'bureaucracy_wall' // Muro azul (burocracia)
    | 'border_wall' // Muro gris (fronteras)
    | 'misinformation_wall' // Muro amarillo (desinformación)
    // Materiales comunes
    | 'stone'
    | 'metal'
    | 'indestructible';
  size: Size;
  position: Position;
  rotation: number; // degrees
  isStatic?: boolean;
  canConnect?: boolean; // Solo para modo build (tablas, cuerdas)
  health?: number; // Solo para modo destroy (puntos de vida del bloque)
}

export interface StarThresholds {
  3: number; // launches for 3 stars
  2: number; // launches for 2 stars
  1: number; // launches for 1 star (completion)
}

export interface SpecialMechanic {
  type: 'wind' | 'low_gravity' | 'moving_platform' | 'rotating_obstacle';
  config: any; // Specific to mechanic type
}

// ========== PROGRESO DEL JUGADOR ==========

export interface UserProgress {
  userId: string;
  createdAt: Date;
  lastPlayed: Date;

  profile: UserProfile;
  progression: Progression;
  collection: Collection;
  stats: Statistics;
  settings: UserSettings;
}

export interface UserProfile {
  age: number;
  preferredLanguage: SupportedLanguage;
  avatarCustomization: AvatarConfig;
  parentalControlsEnabled: boolean;
}

export interface AvatarConfig {
  baseCharacter: FamilyCharacter;
  unlockedItems: string[]; // IDs of unlocked clothing items
  equippedItems: {
    head?: string;
    body?: string;
    accessory?: string;
  };
}

export interface Progression {
  countriesCompleted: string[]; // Country IDs
  currentCountry: string | null;
  totalStars: number;

  starsPerCountry: {
    [countryId: string]: CountryProgress;
  };

  unlockedSages: FamilyCharacter[];
  currentDifficultyLevel: 1 | 2 | 3;
}

export interface CountryProgress {
  adventure: {
    completed: boolean;
    stars: 0 | 1 | 2 | 3;
    activitiesCompleted: number;
    correctAnswers: number;
    totalAnswers: number;
    timeSpent: number; // seconds
  };
  physics: {
    completed: boolean;
    stars: 0 | 1 | 2 | 3;
    bestLaunches: number;
    attempts: number;
    timeSpent: number;
  };
  totalTime: number;
  attempts: number;
  lastPlayed: Date;
}

export interface Collection {
  culturalObjects: string[]; // IDs
  photos: string[]; // IDs
  passportStamps: string[]; // Country IDs
  achievements: Achievement[];
  avatarItems: string[]; // IDs
}

export interface Achievement {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  unlockedAt: Date;
  category: 'adventure' | 'physics' | 'collection' | 'special';
}

export interface Statistics {
  totalPlayTime: number; // seconds
  totalSessions: number;
  activitiesCompleted: number;
  perfectScores: number;
  favoriteSage: FamilyCharacter | null;
  physicsAccuracy: number; // percentage
  averageSessionTime: number;
  countriesVisited: number;
  totalStarsEarned: number;
}

export interface UserSettings {
  musicVolume: number; // 0-1
  sfxVolume: number; // 0-1
  language: SupportedLanguage;
  difficultyMode: 'auto' | 'easy' | 'normal' | 'hard';
  showTutorials: boolean;
  parentalControlsEnabled: boolean;
  offlineMode: boolean;
}

// ========== FÍSICA Y JUEGO ==========

export interface PhysicsBody {
  id: string;
  type: 'sage' | 'block' | 'ground' | 'obstacle';
  shape: 'circle' | 'rectangle' | 'polygon';
  position: Position;
  velocity: Velocity;
  size: Size;
  mass: number;
  health?: number;
  material?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface LaunchData {
  force: Velocity;
  angle: number;
  sage: FamilyCharacter;
  timestamp: number;
}

export interface CollisionData {
  bodyA: PhysicsBody;
  bodyB: PhysicsBody;
  impactVelocity: number;
  damage: number;
}

// ========== UI Y NAVEGACIÓN ==========

export interface NavigationParams {
  SplashScreen: undefined;
  HomeScreen: undefined;
  WorldMapScreen: undefined;
  CountryIntroScreen: { countryId: string };
  AdventureScreen: { countryId: string };
  PhysicsGameScreen: { countryId: string };
  VictoryScreen: {
    countryId: string;
    mode: 'adventure' | 'physics';
    stars: number;
    score: number;
  };
  DefeatScreen: {
    countryId: string;
    mode: 'adventure' | 'physics';
  };
  MuseumScreen: undefined;
  AvatarScreen: undefined;
  LeaderboardScreen: undefined;
  SettingsScreen: undefined;
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content?: any; // ReactNode - will be properly typed in component files
}

// ========== LEADERBOARD ==========

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: AvatarConfig;
  totalStars: number;
  countriesCompleted: number;
  rank: number;
  timestamp: Date;
}

export interface CountryLeaderboard {
  countryId: string;
  mode: 'adventure' | 'physics';
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}

// ========== MONETIZACIÓN ==========

export interface PurchaseProduct {
  id: string;
  type: 'premium' | 'continent_pack' | 'powerup' | 'cosmetic';
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  currency: string;
  unlocks?: string[]; // Country IDs or item IDs
}

export interface AdConfig {
  type: 'banner' | 'interstitial' | 'rewarded';
  unitId: string;
  frequency?: number; // For interstitial
  reward?: {
    type: 'extra_launches' | 'hint' | 'unlock_item';
    value: number;
  };
}

// ========== ANALYTICS ==========

export interface AnalyticsEvent {
  eventName: string;
  timestamp: Date;
  userId: string;
  sessionId: string;
  data: {
    [key: string]: any;
  };
}

export interface GameSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  countriesPlayed: string[];
  activitiesCompleted: number;
  starsEarned: number;
}

// ========== TIPOS DE RESPUESTA API ==========

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface FirebaseUserData {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  lastLogin: Date;
}

// ========== TIPOS DE CONTEXTO ==========

export interface GameContextType {
  currentCountry: Country | null;
  setCurrentCountry: (country: Country | null) => void;
  userProgress: UserProgress | null;
  updateProgress: (progress: Partial<UserProgress>) => void;
  isLoading: boolean;
}

export interface AudioContextType {
  playMusic: (track: string) => void;
  stopMusic: () => void;
  playSFX: (sound: string) => void;
  setMusicVolume: (volume: number) => void;
  setSFXVolume: (volume: number) => void;
}

// ========== PORTALES DE MIGRACIÓN ==========

export type PortalType = 'aereo' | 'maritimo' | 'terrestre' | 'clandestino' | 'refugiado' | 'familiar';
export type PortalStatus = 'locked' | 'available' | 'inaccesible' | 'active' | 'in_use';

export interface MigrationPortal {
  id: string;
  type: PortalType;
  name: LocalizedString;
  description: LocalizedString;

  // Visual y audio
  visual: PortalVisual;
  audio: PortalAudio;

  // Mecánica de juego
  requirements: PortalRequirements;
  costs: PortalCosts;
  risks: PortalRisks;

  // Contenido educativo
  educationalContent: PortalEducationalContent;

  // Configuración
  unlockAtCountry: number; // Qué país desbloquea este portal
  sensitivityLevel: ContentSensitivityLevel;
  requiresParentalControl: boolean;
}

export interface PortalVisual {
  entranceImage: string; // Imagen del portal en el país de origen
  tunnelAnimation: string; // Animación Lottie del viaje
  exitImage: string; // Imagen del portal en el país destino
  particleEffects?: ParticleEffect[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface ParticleEffect {
  type: 'clouds' | 'waves' | 'dust' | 'sparks' | 'leaves';
  density: number; // 0-1
  speed: number;
  color: string;
}

export interface PortalAudio {
  ambient: string; // Sonido ambiente del portal
  enter: string; // Efecto de sonido al entrar
  travel: string; // Música durante el viaje
  exit: string; // Efecto de sonido al salir
  voiceNarration?: LocalizedString; // Narración opcional durante el viaje
}

export interface PortalRequirements {
  documents: DocumentType[];
  minLevel?: number; // Nivel mínimo del jugador
  completedCountries?: string[]; // Países que deben estar completados
  familyMembers?: FamilyCharacter[]; // Miembros de familia necesarios
  specialConditions?: SpecialCondition[];
}

export type DocumentType = 'passport' | 'visa' | 'id' | 'refugee_status' | 'family_proof' | 'sponsor_letter' | 'work_permit';

export interface SpecialCondition {
  type: 'persecution_proof' | 'job_offer' | 'family_in_destination' | 'savings_amount';
  value: any; // Valor específico de la condición
  description: LocalizedString;
}

export interface PortalCosts {
  money: number; // Costo en moneda del juego
  time: number; // Días en el juego
  documents: DocumentType[];
  emotional?: number; // Costo emocional (afecta la moral de la familia)
}

export interface PortalRisks {
  failureChance: number; // 0-1 (0 = seguro, 1 = muy peligroso)
  consequences: PortalConsequence[];
  canRetry: boolean;
  maxAttempts?: number;
}

export interface PortalConsequence {
  type: 'deportation' | 'detention' | 'injury' | 'loss_money' | 'loss_documents' | 'family_separation' | 'success' | 'partial_success';
  probability: number; // 0-1
  description: LocalizedString;
  outcome: ConsequenceOutcome;
}

export interface ConsequenceOutcome {
  nextCountry?: string; // null = quedas donde estás
  lostItems?: string[]; // IDs de items perdidos
  gainedItems?: string[]; // IDs de items ganados
  healthChange?: number; // +/- salud
  moralChange?: number; // +/- moral
  moneyChange?: number; // +/- dinero
  storyEvent?: string; // ID de evento narrativo especial
}

export interface PortalEducationalContent {
  statistics: MigrationStatistic[];
  testimonials: MigrantTestimonial[];
  historicalContext: LocalizedString;
  funFacts: LocalizedString[];
  reflectionQuestion: ReflectionQuestion;
  culturalPreparation?: CulturalPreparation;
}

export interface MigrationStatistic {
  label: LocalizedString;
  value: string | number;
  source?: string; // Fuente de datos (ej: "UN Refugee Agency 2023")
  icon?: string;
}

export interface MigrantTestimonial {
  name: string; // Nombre del migrante (puede ser anónimo)
  origin: string; // País de origen
  destination: string; // País destino
  year: number; // Año de la migración
  quote: LocalizedString;
  photo?: string; // Ilustración (no foto real por privacidad)
  context: LocalizedString; // Contexto breve de su historia
  sensitivityLevel: ContentSensitivityLevel;
}

export interface ReflectionQuestion {
  question: LocalizedString;
  type: 'open' | 'multiple_choice' | 'scale';
  options?: LocalizedString[]; // Si es multiple choice
  scale?: { min: number; max: number; labels: LocalizedString[] }; // Si es scale
  educationalNote?: LocalizedString; // Nota educativa después de responder
}

export interface CulturalPreparation {
  language: {
    basicPhrases: Array<{
      phrase: LocalizedString;
      pronunciation?: string;
      context: LocalizedString;
    }>;
  };
  customs: {
    dos: LocalizedString[];
    donts: LocalizedString[];
  };
  practicalInfo: LocalizedString[];
}

// ========== RUTAS DE PORTALES ==========

export interface PortalRoute {
  id: string;
  fromCountry: string; // Country ID
  toCountry: string; // Country ID
  availablePortals: PortalType[]; // Qué portales se pueden usar para esta ruta
  recommendedPortal: PortalType;
  distance: number; // km en mundo real
  historicalContext?: LocalizedString; // Contexto histórico de esta ruta migratoria
}

// ========== MINI-JUEGO: EMPACAR ==========

export interface PackingGame {
  maxWeight: number; // kg máximo permitido
  maxVolume?: number; // volumen máximo (algunas rutas limitan ambos)
  availableItems: PackingItem[];
  mandatoryItems: string[]; // IDs de items obligatorios
  recommendedItems: string[]; // IDs de items recomendados
}

export interface PackingItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  category: 'documents' | 'money' | 'clothing' | 'food' | 'personal' | 'tools' | 'sentimental';
  weight: number; // kg
  volume?: number; // litros
  effects: ItemEffect[];
  image: string;
  isMandatory: boolean;
}

export interface ItemEffect {
  type: 'moral' | 'health' | 'money' | 'communication' | 'culture' | 'survival';
  value: number; // Valor del efecto (+/-)
  description: LocalizedString;
}

// ========== PROGRESO DE PORTALES ==========

export interface PortalProgress {
  unlockedPortals: PortalType[];
  portalsUsed: Array<{
    portalType: PortalType;
    route: string; // PortalRoute ID
    timestamp: Date;
    outcome: 'success' | 'failure' | 'partial';
    itemsPacked?: string[]; // IDs de items que empacó
  }>;
  documentsOwned: DocumentType[];
  currentMoney: number;
  currentMoral: number; // 0-100
  currentHealth: number; // 0-100
}

// ========== TRANSICIÓN DE PORTAL ==========

export interface PortalTransition {
  portal: MigrationPortal;
  route: PortalRoute;
  packedItems: PackingItem[];
  phase: PortalTransitionPhase;
  startTime: Date;
  estimatedEndTime: Date;
}

export type PortalTransitionPhase =
  | 'preparation' // Eligiendo portal y empacando
  | 'entering' // Animación de entrada
  | 'traveling' // Mostrando contenido educativo
  | 'event' // Evento aleatorio durante el viaje
  | 'exiting' // Animación de salida
  | 'arrival'; // Llegada al nuevo país

export interface PortalEvent {
  id: string;
  type: 'checkpoint' | 'weather' | 'encounter' | 'mechanical' | 'opportunity';
  description: LocalizedString;
  choices: PortalEventChoice[];
  consequences: PortalConsequence[];
  sensitivityLevel: ContentSensitivityLevel;
}

export interface PortalEventChoice {
  id: string;
  text: LocalizedString;
  risk: number; // 0-1
  possibleOutcomes: string[]; // IDs de PortalConsequence
}

// ========== PORTAL EXIT (Salida de país) ==========

export interface PortalExit {
  availablePortals: PortalType[]; // Qué portales puede usar el jugador
  recommendedPortal?: PortalType; // Portal sugerido para la narrativa
  nextCountries: string[]; // IDs de países a los que puede ir (orden cronológico)
  narrativeContext?: LocalizedString; // Contexto narrativo al salir
  specialConditions?: {
    unlocksPortal?: PortalType; // Este país desbloquea un nuevo tipo de portal
    requiredCharacters?: FamilyCharacter[]; // Personajes necesarios para ciertas rutas
  };
}

// ========== METADATA DE PAÍS ==========

export interface CountryMetadata {
  releaseVersion: string; // ej: "2.0_HopeQuest"
  premium: boolean; // ¿Requiere compra?
  requiredLevel?: number; // Nivel mínimo del jugador
  isStartingCountry: boolean; // ¿Es país inicial?
  characterIntroductions: FamilyCharacter[]; // Personajes que se unen en este país
  migrationThemes: string[]; // Tags de temas migratorios
  educationalFocus: string[]; // Tags de enfoque educativo
  sources?: string[]; // Fuentes de información
}

// ========== EXPORTS ==========

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'adventure' | 'physics';
export type ScreenOrientation = 'portrait' | 'landscape';

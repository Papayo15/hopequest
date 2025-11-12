/**
 * Paleta de colores de Hope Quest
 * Estilo Pixar - Colores cálidos, vibrantes y esperanzadores para niños de 6-14 años
 */

export const Colors = {
  // Colores principales (inspirados en Mario Bros + Pixar)
  primary: '#E52521',      // Rojo (Marco - gorra roja)
  secondary: '#F5A623',    // Naranja cálido (esperanza)
  accent: '#7ED321',       // Verde lima (crecimiento)

  // Colores de personajes (La Familia + Villanos)
  characters: {
    marco: '#FF6347',      // Rojo tomate (Marco - zorro agricultor, gorra roja)
    luis: '#32CD32',       // Verde lima (Luis - hermano verde)
    patricia: '#FF69B4',   // Rosa fuerte (Patricia - pareja fuerte)
    teo: '#FFD700',        // Dorado (Teo - niño con gorra de hongos)
    xolo: '#FF69B4',       // Rosa coral (Xolo - ajolote rosa mexicano)
    don_bowser: '#FF8C00', // Naranja oscuro (Don Bowser - sátira de Trump)
    koopa_hielo: '#87CEEB', // Azul hielo (Koopas HIELO - guardias ICE)
  },

  // Colores de continentes
  continents: {
    americas: '#2ECC71',   // Verde
    europe: '#5DADE2',     // Azul
    asia: '#F39C12',       // Naranja
    africa: '#E67E22',     // Naranja tierra
    oceania: '#1ABC9C',    // Turquesa
  },

  // Colores de dificultad
  difficulty: {
    level1: '#27AE60',     // Verde (4-6 años)
    level2: '#F39C12',     // Naranja (7-9 años)
    level3: '#E74C3C',     // Rojo (10-12 años)
  },

  // Colores de UI
  background: '#FFFFFF',
  backgroundSecondary: '#F7F9FC',
  surface: '#FFFFFF',
  surfaceVariant: '#E8EEF5',

  // Textos
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    disabled: '#BDC3C7',
    inverse: '#FFFFFF',
    hint: '#95A5A6',
  },

  // Estados
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',

  // Bordes y sombras
  border: '#E0E6ED',
  borderLight: '#F0F3F7',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
  shadowStrong: 'rgba(0, 0, 0, 0.25)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',

  // Recompensas/Insignias/Estrellas
  rewards: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    star: '#FFC107',
    starGray: '#E0E0E0',
  },

  // Minijuegos
  games: {
    puzzle: '#9C27B0',
    memory: '#FF5722',
    trivia: '#2196F3',
    search: '#4CAF50',
    sequence: '#FF9800',
    match: '#00BCD4',
  },

  // Físicas (materiales de bloques)
  materials: {
    wood: '#8B4513',
    ice: '#ADD8E6',
    stone: '#808080',
    metal: '#696969',
    cloth: '#DDA0DD',
    paper: '#FFF8DC',
    tnt: '#FF0000',
  },

  // Gradientes (para botones y cards)
  gradients: {
    primary: ['#4A90E2', '#357ABD'],
    secondary: ['#F5A623', '#E8960F'],
    success: ['#27AE60', '#1E8449'],
    danger: ['#E74C3C', '#C0392B'],
    purple: ['#9013FE', '#6A0DAD'],
    ocean: ['#1ABC9C', '#16A085'],
  },

  // Transparencias
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
};

export type ColorKey = keyof typeof Colors;
export type CharacterColor = keyof typeof Colors.characters;
export type ContinentColor = keyof typeof Colors.continents;
export type DifficultyColor = keyof typeof Colors.difficulty;

// Helper para obtener color de personaje
export const getCharacterColor = (character: CharacterColor): string => {
  return Colors.characters[character];
};

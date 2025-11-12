import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Tamaños y espaciados de Wisdom Quest
 * Optimizado para pantallas de tablets y smartphones
 */

export const Sizes = {
  // Dimensiones de pantalla
  screen: {
    width,
    height,
    isSmall: width < 375,
    isMedium: width >= 375 && width < 768,
    isLarge: width >= 768,
    isTablet: width >= 768,
    isPhone: width < 768,
  },

  // Espaciado
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  // Bordes redondeados
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    round: 9999, // Completamente redondo
  },

  // Tamaños de fuente
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    massive: 48,
    // Roles semánticos
    caption: 12,
    body: 16,
    subtitle: 18,
    title: 24,
    heading: 32,
    display: 40,
  },

  // Peso de fuente
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Iconos
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
    huge: 80,
  },

  // Avatares de personajes
  avatar: {
    xs: 32,
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120,
    xxl: 160,
  },

  // Botones
  button: {
    height: {
      sm: 32,
      md: 44,
      lg: 56,
      xl: 64,
    },
    minWidth: 100,
    iconSize: 20,
  },

  // Cards
  card: {
    padding: 16,
    minHeight: 100,
    imageHeight: 180,
  },

  // Navegación
  header: {
    height: Platform.OS === 'ios' ? 88 : 56,
    heightWithoutStatusBar: 56,
  },

  tabBar: {
    height: Platform.OS === 'ios' ? 84 : 60,
    iconSize: 24,
  },

  // Sombras
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    xlarge: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 16,
    },
  },

  // Mapa mundial
  map: {
    countryMarkerSize: 48,
    countryMarkerSizeSmall: 32,
    continentLabelSize: 24,
  },

  // Minijuegos - Modo Aventura
  adventure: {
    puzzlePieceSize: Math.min(width * 0.25, 120),
    memoryCardSize: Math.min(width * 0.22, 100),
    memoryCardSizeSmall: Math.min(width * 0.18, 80),
    objectSearchItemSize: 60,
    triviaOptionHeight: 60,
  },

  // Minijuegos - Modo Físico
  physics: {
    slingshotSize: 80,
    slingshotPositionLeft: 40,
    slingshotPositionBottom: 100,
    sageSize: 40,
    sageSizeSmall: 32,
    blockSizeSmall: 32,
    blockSizeMedium: 48,
    blockSizeLarge: 64,
    trajectoryDotSize: 4,
  },

  // HUD (Heads-Up Display) durante juego
  hud: {
    height: 60,
    iconSize: 28,
    fontSize: 16,
  },

  // Modal/Dialog
  modal: {
    padding: 24,
    maxWidth: Math.min(width * 0.9, 400),
    borderRadius: 16,
  },

  // Input fields
  input: {
    height: 48,
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
  },

  // Dividers
  divider: {
    thin: 1,
    medium: 2,
    thick: 4,
  },

  // Animations
  animation: {
    durationFast: 150,
    durationNormal: 300,
    durationSlow: 500,
    durationVerySlow: 800,
  },

  // Z-Index layers
  zIndex: {
    background: 0,
    content: 1,
    header: 10,
    overlay: 100,
    modal: 1000,
    toast: 2000,
    tooltip: 3000,
  },
};

export type SpacingKey = keyof typeof Sizes.spacing;
export type RadiusKey = keyof typeof Sizes.radius;
export type FontSizeKey = keyof typeof Sizes.fontSize;
export type IconSizeKey = keyof typeof Sizes.icon;

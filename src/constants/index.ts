/**
 * Exportación centralizada de constantes
 */

export { Colors } from './colors';
export { Sizes } from './sizes';
export { PhysicsConfig } from './physics';
export { GameConfig } from './gameConfig';

// Re-export all countries
export * from './countries';

// Export achievements
export * from './achievements';

export type { ColorKey, CharacterColor, ContinentColor, DifficultyColor } from './colors';
export type { SpacingKey, RadiusKey, FontSizeKey, IconSizeKey } from './sizes';
export type { SageType, MaterialType } from './physics';
export type { Continent, ActivityType, FamilyCharacter, SupportedLanguage } from './gameConfig';

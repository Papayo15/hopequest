/**
 * Navigation Types
 * Definición de tipos para React Navigation
 */

import type { StackNavigationProp } from '@react-navigation/stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';

// Root Stack Navigator
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  WorldMap: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Game Stack Navigator
export type GameStackParamList = {
  CountryOverview: { countryId: string };
  LocationSelection: { countryId: string };
  Activity: {
    countryId: string;
    locationId: string;
    activityType: 'trivia' | 'puzzle' | 'memory' | 'hidden_objects' | 'sorting';
  };
  BridgeGame: {
    countryId: string;
    locationId: string;
  };
  PortalEntrance: {
    countryId: string;
    fromCountry: string;
  };
  PortalPacking: {
    portalId: string;
    routeId: string;
  };
  PortalTransition: {
    portalId: string;
    routeId: string;
    phase: 'preparation' | 'journey' | 'arrival' | 'checkpoint';
  };
  CountryComplete: {
    countryId: string;
    stars: number;
    rewards: {
      money: number;
      items: string[];
    };
  };
};

// Portal Stack Navigator
export type PortalStackParamList = {
  PortalSelection: { fromCountryId: string };
  RouteSelection: { portalType: string };
  PackingGame: { portalId: string; routeId: string };
  PortalJourney: { transitionId: string };
  PortalCheckpoint: {
    transitionId: string;
    checkpointType: 'border' | 'random' | 'weather';
  };
};

// Profile Stack Navigator
export type ProfileStackParamList = {
  ProfileHome: undefined;
  Achievements: undefined;
  Statistics: undefined;
  Collection: undefined;
  PortalHistory: undefined;
};

// Settings Stack Navigator
export type SettingsStackParamList = {
  SettingsHome: undefined;
  ParentalControls: undefined;
  Language: undefined;
  Audio: undefined;
  About: undefined;
};

// Navigation Props Types

// Root Stack
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

// Main Tab
export type MainTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  RootStackNavigationProp
>;

// Game Stack
export type GameStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<GameStackParamList>,
  MainTabNavigationProp
>;

// Portal Stack
export type PortalStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PortalStackParamList>,
  GameStackNavigationProp
>;

// Profile Stack
export type ProfileStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList>,
  MainTabNavigationProp
>;

// Settings Stack
export type SettingsStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList>,
  MainTabNavigationProp
>;

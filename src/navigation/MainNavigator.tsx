/**
 * Main Navigator
 * Stack Navigator que contiene los tabs y las pantallas de juego
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './types';
import { Colors } from '../constants';

// Tab Screens
import HomeScreen from '../screens/HomeScreen';
import WorldMapScreen from '../screens/WorldMapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Game Screens
import CountryOverviewScreen from '../screens/game/CountryOverviewScreen';
import ActivityScreen from '../screens/game/ActivityScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator();

// Tabs Component
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.hint,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: () => null, // TODO: Add icons
        }}
      />
      <Tab.Screen
        name="WorldMap"
        component={WorldMapScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: () => null, // TODO: Add icons
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: () => null, // TODO: Add icons
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: () => null, // TODO: Add icons
        }}
      />
    </Tab.Navigator>
  );
};

// Main Navigator with Stack for modals/game screens
const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        },
        headerTintColor: Colors.text.primary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CountryOverview"
        component={CountryOverviewScreen}
        options={({ route }: any) => ({
          title: route.params?.countryName || 'País',
        })}
      />
      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: 'Actividad' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

/**
 * Game Stack Navigator
 * Navegador para el flujo de juego (países, actividades, portales)
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { GameStackParamList } from './types';
import { Colors } from '../constants';

// Screens (to be created)
import CountryOverviewScreen from '../screens/game/CountryOverviewScreen';
import LocationSelectionScreen from '../screens/game/LocationSelectionScreen';
import ActivityScreen from '../screens/game/ActivityScreen';
import BridgeGameScreen from '../screens/game/BridgeGameScreen';
import PortalEntranceScreen from '../screens/game/PortalEntranceScreen';
import PortalPackingScreen from '../screens/game/PortalPackingScreen';
import PortalTransitionScreen from '../screens/game/PortalTransitionScreen';
import CountryCompleteScreen from '../screens/game/CountryCompleteScreen';

const Stack = createStackNavigator<GameStackParamList>();

const GameStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.background.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.background.secondary,
        },
        headerTintColor: Colors.text.primary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        cardStyle: { backgroundColor: Colors.background.primary },
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="CountryOverview"
        component={CountryOverviewScreen}
        options={{ title: 'País' }}
      />
      <Stack.Screen
        name="LocationSelection"
        component={LocationSelectionScreen}
        options={{ title: 'Selecciona Ubicación' }}
      />
      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: 'Actividad' }}
      />
      <Stack.Screen
        name="BridgeGame"
        component={BridgeGameScreen}
        options={{
          title: 'Construye el Puente',
          headerShown: false, // Full screen for physics game
        }}
      />
      <Stack.Screen
        name="PortalEntrance"
        component={PortalEntranceScreen}
        options={{ title: 'Portal de Migración' }}
      />
      <Stack.Screen
        name="PortalPacking"
        component={PortalPackingScreen}
        options={{ title: 'Prepara tu Equipaje' }}
      />
      <Stack.Screen
        name="PortalTransition"
        component={PortalTransitionScreen}
        options={{
          title: 'Viajando...',
          headerShown: false, // Full screen for transition
          gestureEnabled: false, // No back during transition
        }}
      />
      <Stack.Screen
        name="CountryComplete"
        component={CountryCompleteScreen}
        options={{
          title: '¡País Completado!',
          headerLeft: () => null, // No back button
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default GameStackNavigator;

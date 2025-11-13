import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import GenerateQRScreen from './src/screens/GenerateQRScreen';
import HistoryScreen from './src/screens/HistoryScreen';

// API Config
import { API_URL } from './src/config';

const Stack = createStackNavigator();

// Configurar notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
    setupNotifications();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupNotifications = async () => {
    // Pedir permisos para notificaciones
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permisos de notificaciones denegados');
      return;
    }

    // Obtener token de Expo
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Token:', token);

    // Registrar token en backend
    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      try {
        await fetch(`${API_URL}/api/qr/register-push-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            push_token: token,
            plataforma: Platform.OS,
          }),
        });
      } catch (error) {
        console.error('Error registering push token:', error);
      }
    }
  };

  if (isLoading) {
    return null; // O un splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3B82F6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Condominio360' }}
        />
        <Stack.Screen
          name="GenerateQR"
          component={GenerateQRScreen}
          options={{ title: 'Generar Código QR' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'Historial de Códigos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

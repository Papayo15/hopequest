import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🛡️</Text>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.userName}>{user?.nombre || 'Vigilante'}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.menuItem, styles.scanButton]}
          onPress={() => navigation.navigate('ScanQR')}
        >
          <Text style={styles.scanIcon}>📷</Text>
          <Text style={styles.menuTitle}>Escanear Código QR</Text>
          <Text style={styles.menuSubtitle}>
            Validar acceso de visitantes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.menuIcon}>📋</Text>
          <Text style={styles.menuTitle}>Historial de Accesos</Text>
          <Text style={styles.menuSubtitle}>
            Ver registros del día
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Stats')}
        >
          <Text style={styles.menuIcon}>📊</Text>
          <Text style={styles.menuTitle}>Estadísticas</Text>
          <Text style={styles.menuSubtitle}>
            Resumen de accesos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={[styles.menuTitle, styles.logoutText]}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    backgroundColor: '#1F2937',
    padding: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  scanButton: {
    backgroundColor: '#10B981',
  },
  scanIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  logoutButton: {
    backgroundColor: '#7F1D1D',
    marginTop: 20,
  },
  logoutText: {
    color: '#FCA5A5',
  },
});

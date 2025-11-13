import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function StatsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      const condominioId = user.id_condominio || 1;
      const today = new Date().toISOString().split('T')[0];

      const response = await fetch(
        `${API_URL}/api/qr/estadisticas/${condominioId}?fecha_inicio=${today}&fecha_fin=${today}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStats(data.estadisticas);
      }
    } catch (error) {
      console.error('Load stats error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStats();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#10B981']}
          tintColor="#10B981"
        />
      }
    >
      <View style={styles.content}>
        <Text style={styles.title}>Estadísticas del Día</Text>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.primaryCard]}>
            <Text style={styles.statValue}>
              {stats?.total_accesos || 0}
            </Text>
            <Text style={styles.statLabel}>Total de Accesos</Text>
          </View>

          <View style={[styles.statCard, styles.successCard]}>
            <Text style={styles.statValue}>
              {stats?.accesos_exitosos || 0}
            </Text>
            <Text style={styles.statLabel}>Exitosos</Text>
          </View>

          <View style={[styles.statCard, styles.errorCard]}>
            <Text style={styles.statValue}>
              {stats?.accesos_rechazados || 0}
            </Text>
            <Text style={styles.statLabel}>Rechazados</Text>
          </View>

          <View style={[styles.statCard, styles.infoCard]}>
            <Text style={styles.statValue}>
              {stats?.visitantes_unicos || 0}
            </Text>
            <Text style={styles.statLabel}>Visitantes Únicos</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Las estadísticas se actualizan en tiempo real
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  primaryCard: {
    backgroundColor: '#1F2937',
  },
  successCard: {
    backgroundColor: '#064E3B',
  },
  errorCard: {
    backgroundColor: '#7F1D1D',
  },
  infoCard: {
    backgroundColor: '#1E3A8A',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#1F2937',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
  },
});

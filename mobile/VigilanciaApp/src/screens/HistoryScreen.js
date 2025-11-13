import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function HistoryScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      // Obtener historial del condominio
      const condominioId = user.id_condominio || 1;

      const response = await fetch(
        `${API_URL}/api/qr/historial-condominio/${condominioId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setHistory(data.historial || []);
      }
    } catch (error) {
      console.error('Load history error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.visitorName}>{item.nombre_visitante}</Text>
          <Text style={styles.time}>
            {new Date(item.fecha_ingreso).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.detail}>
            Unidad: {item.numero_unidad || 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Vigilante: {item.vigilante || 'No especificado'}
          </Text>
          {item.notas && (
            <Text style={styles.notes}>{item.notas}</Text>
          )}
        </View>

        <Text style={styles.date}>
          {new Date(item.fecha_ingreso).toLocaleDateString('es-ES')}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>📋</Text>
        <Text style={styles.emptyText}>No hay registros de accesos</Text>
        <Text style={styles.emptySubtext}>
          Los accesos validados aparecerán aquí
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#10B981']}
            tintColor="#10B981"
          />
        }
      />
    </View>
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
    padding: 20,
    backgroundColor: '#111827',
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  visitorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  time: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  notes: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 5,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 10,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

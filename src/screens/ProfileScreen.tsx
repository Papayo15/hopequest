/**
 * Profile Screen
 * Pantalla de perfil del usuario
 */

import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../components/ui';
import { Colors } from '../constants';
import { useUserStore, useGameStore } from '../stores';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    username,
    age,
    totalPlayTime,
    totalSessions,
    achievements,
    createdAt,
    logout,
  } = useUserStore();
  const { completedCountries, totalStars } = useGameStore();

  const handleLogout = () => {
    if (Platform.OS === 'web' && typeof (global as any).window !== 'undefined') {
      const confirmLogout = (global as any).window.confirm(
        '¿Estás seguro de que quieres cerrar sesión?\n\nTu progreso se guardará y podrás volver más tarde.'
      );
      if (confirmLogout) {
        logout();
        // No resetear el juego, solo cerrar sesión
        // El progreso se mantiene en AsyncStorage
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }
    } else {
      Alert.alert(
        'Cerrar Sesión',
        'Tu progreso se guardará y podrás volver más tarde.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Cerrar Sesión',
            style: 'destructive',
            onPress: () => {
              logout();
              (navigation as any).reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            },
          },
        ]
      );
    }
  };

  const formatPlayTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Heading1 style={styles.title}>Mi Perfil</Heading1>

      {/* User Info */}
      <Card variant="elevated" style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Heading1>👤</Heading1>
          </View>
        </View>
        <Heading2 align="center">{username}</Heading2>
        <SmallText align="center" color={Colors.text.secondary}>
          {age} años
        </SmallText>
      </Card>

      {/* Stats */}
      <Card variant="outlined" style={styles.card}>
        <Heading2 style={styles.sectionTitle}>Estadísticas</Heading2>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Heading2 color={Colors.primary}>{completedCountries.length}</Heading2>
            <SmallText color={Colors.text.secondary}>Países Visitados</SmallText>
          </View>
          <View style={styles.statItem}>
            <Heading2 color={Colors.warning}>{totalStars}</Heading2>
            <SmallText color={Colors.text.secondary}>Estrellas</SmallText>
          </View>
          <View style={styles.statItem}>
            <Heading2 color={Colors.success}>{totalSessions}</Heading2>
            <SmallText color={Colors.text.secondary}>Sesiones</SmallText>
          </View>
          <View style={styles.statItem}>
            <Heading2 color={Colors.info}>{formatPlayTime(totalPlayTime)}</Heading2>
            <SmallText color={Colors.text.secondary}>Tiempo de Juego</SmallText>
          </View>
        </View>
      </Card>

      {/* Achievements */}
      <Card variant="outlined" style={styles.card}>
        <View style={styles.sectionHeader}>
          <Heading2 style={styles.sectionTitle}>
            Logros ({achievements.length})
          </Heading2>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => (navigation as any).navigate('Achievements')}
          >
            <SmallText color={Colors.primary} style={styles.viewAllText}>
              Ver Todos →
            </SmallText>
          </TouchableOpacity>
        </View>
        {achievements.length === 0 ? (
          <BodyText color={Colors.text.secondary}>
            Aún no has desbloqueado ningún logro. ¡Sigue jugando!
          </BodyText>
        ) : (
          achievements.slice(0, 5).map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <BodyText>{achievement.icon}</BodyText>
              <View style={styles.achievementInfo}>
                <BodyText>{achievement.name}</BodyText>
                <SmallText color={Colors.text.secondary}>
                  {achievement.description}
                </SmallText>
              </View>
            </View>
          ))
        )}
      </Card>

      {/* Member Since */}
      {createdAt && (
        <SmallText align="center" color={Colors.text.secondary} style={styles.memberSince}>
          Miembro desde {new Date(createdAt).toLocaleDateString()}
        </SmallText>
      )}

      {/* Logout Button */}
      <Card variant="outlined" style={styles.card}>
        <Heading2 style={styles.sectionTitle}>Cambiar de Usuario</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.logoutDescription}>
          Si otra persona quiere jugar, puedes cerrar sesión. Tu progreso se guardará automáticamente.
        </BodyText>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <BodyText color={Colors.error} style={styles.logoutButtonText}>
            🚪 Cerrar Sesión
          </BodyText>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewAllText: {
    fontWeight: '600',
  },
  memberSince: {
    marginBottom: 16,
  },
  logoutDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  logoutButton: {
    padding: 16,
    backgroundColor: Colors.error + '10',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.error,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;

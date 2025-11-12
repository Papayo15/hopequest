/**
 * Profile Screen
 * Pantalla de perfil del usuario
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../components/ui';
import { Colors } from '../constants';
import { useUserStore, useGameStore } from '../stores';

const ProfileScreen: React.FC = () => {
  const {
    username,
    age,
    totalPlayTime,
    totalSessions,
    achievements,
    createdAt,
  } = useUserStore();
  const { countriesCompleted, totalStars } = useGameStore();

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
            <Heading2 color={Colors.primary.main}>{countriesCompleted.length}</Heading2>
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
        <Heading2 style={styles.sectionTitle}>
          Logros ({achievements.length})
        </Heading2>
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
        <SmallText align="center" color={Colors.text.tertiary}>
          Miembro desde {new Date(createdAt).toLocaleDateString()}
        </SmallText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
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
    backgroundColor: Colors.primary.light,
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
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 12,
  },
});

export default ProfileScreen;

/**
 * Home Screen
 * Pantalla principal del juego
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { MainTabNavigationProp } from '../navigation/types';
import { Heading1, Heading2, BodyText, Button, Card } from '../components/ui';
import { Colors } from '../constants';
import { useUserStore, useGameStore, useEconomyStore } from '../stores';
import { audioService } from '../services/audio/audioService';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const username = useUserStore((state) => state.username);
  const currentCountry = useGameStore((state) => state.currentCountry);
  const money = useEconomyStore((state) => state.money);
  const health = useEconomyStore((state) => state.health);
  const moral = useEconomyStore((state) => state.moral);

  // Play menu music on mount
  useEffect(() => {
    audioService.playMusic('menu', true);

    return () => {
      // Optional: stop music when leaving
      // audioService.stopMusic(true);
    };
  }, []);

  const handleContinueAdventure = () => {
    // TODO: Navigate to current country or world map
    navigation.navigate('WorldMap');
  };

  const handleNewGame = () => {
    // TODO: Show confirmation dialog
    // TODO: Reset game state
    navigation.navigate('WorldMap');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Heading1 style={styles.greeting}>¡Hola, {username}!</Heading1>
      <BodyText style={styles.subtitle}>
        Continúa la aventura de Marco por el mundo
      </BodyText>

      {/* Current Progress */}
      {currentCountry && (
        <Card variant="elevated" style={styles.progressCard}>
          <Heading2 style={styles.cardTitle}>Tu Progreso</Heading2>
          <BodyText>País actual: {currentCountry}</BodyText>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <BodyText color={Colors.text.tertiary}>Dinero</BodyText>
              <Heading2 color={Colors.success}>${money}</Heading2>
            </View>
            <View style={styles.stat}>
              <BodyText color={Colors.text.tertiary}>Salud</BodyText>
              <Heading2 color={health > 50 ? Colors.success : Colors.warning}>
                {health}%
              </Heading2>
            </View>
            <View style={styles.stat}>
              <BodyText color={Colors.text.tertiary}>Moral</BodyText>
              <Heading2 color={moral > 50 ? Colors.success : Colors.warning}>
                {moral}%
              </Heading2>
            </View>
          </View>
          <Button
            title="Continuar Aventura"
            onPress={handleContinueAdventure}
            variant="primary"
            fullWidth
          />
        </Card>
      )}

      {/* Quick Actions */}
      <Card variant="outlined" style={styles.actionsCard}>
        <Heading2 style={styles.cardTitle}>Acciones Rápidas</Heading2>
        <Button
          title="Ver Mapa del Mundo"
          onPress={() => navigation.navigate('WorldMap')}
          variant="secondary"
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Mi Perfil"
          onPress={() => navigation.navigate('Profile')}
          variant="secondary"
          fullWidth
          style={styles.actionButton}
        />
        {!currentCountry && (
          <Button
            title="Nueva Aventura"
            onPress={handleNewGame}
            variant="primary"
            fullWidth
          />
        )}
      </Card>

      {/* Educational Message */}
      <Card variant="flat" style={styles.messageCard}>
        <BodyText color={Colors.text.secondary}>
          💡 Cada país que visites te enseñará sobre su cultura, geografía e
          historia. ¡Prepárate para aprender mientras te diviertes!
        </BodyText>
      </Card>
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
  greeting: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  progressCard: {
    marginBottom: 16,
  },
  actionsCard: {
    marginBottom: 16,
  },
  messageCard: {
    marginBottom: 16,
    backgroundColor: Colors.primary.light,
  },
  cardTitle: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  stat: {
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default HomeScreen;

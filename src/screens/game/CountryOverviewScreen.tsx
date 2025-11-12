/**
 * Country Overview Screen
 * Vista general de un país con sus 3 actividades: Trivia, Puzzle, Memory
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../../components/ui';
import { Colors } from '../../constants';
import * as CountriesData from '../../constants/countries';
import { useGameStore } from '../../stores';

const CountryOverviewScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const completeCountry = useGameStore((state) => state.completeCountry);
  const completedCountries = useGameStore((state) => state.completedCountries);

  const { countryId, countryName, countryFlag, orderIndex } = route.params || {};

  // Cargar datos del país
  const countryData = useMemo(() => {
    return (CountriesData as any)[countryId];
  }, [countryId]);

  if (!countryData) {
    return (
      <View style={styles.container}>
        <Heading1>País no encontrado</Heading1>
        <BodyText>No se pudo cargar la información del país.</BodyText>
      </View>
    );
  }

  const isCompleted = completedCountries.includes(countryId);

  const handleActivityPress = (activity: any) => {
    navigation.navigate('Activity', {
      countryId,
      countryName,
      activityId: activity.id,
      activityType: activity.type,
      activityTitle: activity.title,
      activityData: activity,
    });
  };

  const handleCompleteCountry = () => {
    completeCountry(countryId, 3); // 3 estrellas por defecto
    if (typeof window !== 'undefined') {
      window.alert(`¡Has completado ${countryName}! 🎉\n\n+3 estrellas ⭐⭐⭐\n\nAhora puedes avanzar al siguiente país.`);
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header del país */}
      <View style={styles.header}>
        <View style={styles.flagContainer}>
          <Heading1 style={styles.flag}>{countryFlag}</Heading1>
        </View>
        <Heading1>{countryName}</Heading1>
        <SmallText color={Colors.text.secondary}>
          País #{orderIndex} • {countryData.region}
        </SmallText>
        {isCompleted && (
          <View style={styles.completedBadge}>
            <SmallText color={Colors.success}>✓ Completado ⭐⭐⭐</SmallText>
          </View>
        )}
      </View>

      {/* Descripción del país */}
      <Card style={styles.descriptionCard}>
        <Heading2>Sobre {countryName}</Heading2>
        <BodyText style={styles.description}>{countryData.description}</BodyText>

        <View style={styles.factsSection}>
          <SmallText style={styles.factsTitle} color={Colors.text.secondary}>
            Datos Culturales:
          </SmallText>
          {countryData.culturalFacts?.map((fact: string, index: number) => (
            <SmallText key={index} style={styles.factItem}>
              • {fact}
            </SmallText>
          ))}
        </View>
      </Card>

      {/* Actividades */}
      <View style={styles.activitiesSection}>
        <Heading2 style={styles.sectionTitle}>Actividades</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.subtitle}>
          Completa las 3 actividades para dominar este país
        </BodyText>

        {countryData.activities?.map((activity: any, index: number) => (
          <Card
            key={activity.id}
            style={styles.activityCard}
            variant="elevated"
            onPress={() => handleActivityPress(activity)}
          >
            <View style={styles.activityContent}>
              <View style={styles.activityIcon}>
                <Heading2>
                  {activity.type === 'trivia' && '🤔'}
                  {activity.type === 'puzzle' && '🧩'}
                  {activity.type === 'memory' && '🧠'}
                </Heading2>
              </View>
              <View style={styles.activityInfo}>
                <Heading2>{activity.title}</Heading2>
                <BodyText color={Colors.text.secondary}>
                  {activity.description}
                </BodyText>
                <View style={styles.activityMeta}>
                  <SmallText color={Colors.text.hint}>
                    {activity.type === 'trivia' && 'Preguntas y respuestas'}
                    {activity.type === 'puzzle' && 'Rompecabezas'}
                    {activity.type === 'memory' && 'Juego de memoria'}
                  </SmallText>
                  <SmallText color={Colors.text.hint}>
                    ⭐ {activity.rewards?.stars || 0} estrellas
                  </SmallText>
                </View>
              </View>
              <View style={styles.activityArrow}>
                <SmallText>→</SmallText>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Botón de completar (para testing) */}
      {!isCompleted && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteCountry}
        >
          <BodyText color={Colors.white} style={styles.completeButtonText}>
            Marcar como Completado (Testing)
          </BodyText>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <View style={styles.completedMessage}>
          <Heading2 style={styles.completedText}>
            ✓ País Completado
          </Heading2>
          <BodyText color={Colors.text.secondary}>
            Regresa al mapa para continuar tu viaje
          </BodyText>
        </View>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  flagContainer: {
    marginBottom: 12,
  },
  flag: {
    fontSize: 72,
  },
  completedBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.success + '20',
    borderRadius: 12,
  },
  descriptionCard: {
    margin: 20,
    marginBottom: 12,
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
  },
  factsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  factsTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  factItem: {
    marginLeft: 8,
    marginTop: 4,
    lineHeight: 20,
  },
  activitiesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 12,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  activityArrow: {
    marginLeft: 12,
  },
  completeButton: {
    margin: 20,
    padding: 16,
    backgroundColor: Colors.success,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    fontWeight: '600',
  },
  completedMessage: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.success + '20',
    borderRadius: 12,
    alignItems: 'center',
  },
  completedText: {
    color: Colors.success,
    marginBottom: 8,
  },
  spacer: {
    height: 40,
  },
});

export default CountryOverviewScreen;

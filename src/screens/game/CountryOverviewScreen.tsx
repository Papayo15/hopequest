/**
 * Country Overview Screen
 * Vista general de un país con sus 3 actividades: Trivia, Puzzle, Memory
 */

import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Heading1, Heading2, BodyText, SmallText, Card } from '../../components/ui';
import { Colors } from '../../constants';
import * as CountriesData from '../../constants/countries';
import { useGameStore } from '../../stores';
import type { PortalType } from '../../constants/countries/types';

const CountryOverviewScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const completeCountry = useGameStore((state) => state.completeCountry);
  const completedCountries = useGameStore((state) => state.completedCountries);

  const { countryId, countryName, countryFlag, orderIndex } = route.params || {};

  const [showPortalModal, setShowPortalModal] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState<PortalType | null>(null);

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

  const getPortalIcon = (portalType: PortalType): string => {
    const icons: Record<PortalType, string> = {
      terrestre: '🚂',
      aereo: '✈️',
      maritimo: '⛴️',
      clandestino: '🚶',
      refugiado: '🆘',
      familiar: '👨‍👩‍👧‍👦',
    };
    return icons[portalType] || '🚪';
  };

  const getPortalName = (portalType: PortalType): string => {
    const names: Record<PortalType, string> = {
      terrestre: 'Terrestre',
      aereo: 'Aéreo',
      maritimo: 'Marítimo',
      clandestino: 'Clandestino',
      refugiado: 'Refugiado',
      familiar: 'Reunificación Familiar',
    };
    return names[portalType] || 'Desconocido';
  };

  const getPortalDescription = (portalType: PortalType): string => {
    const descriptions: Record<PortalType, string> = {
      terrestre: 'Viaje por tierra: seguro pero lento. Costo medio.',
      aereo: 'Viaje en avión: rápido y seguro. Alto costo.',
      maritimo: 'Viaje en barco: moderado. Costo bajo.',
      clandestino: 'Ruta peligrosa: riesgoso, afecta salud. Sin costo.',
      refugiado: 'Solicitud de asilo: proceso largo. Bajo costo.',
      familiar: 'Reunificación: más seguro con familia. Costo variable.',
    };
    return descriptions[portalType] || 'Método de viaje';
  };

  const handlePhysicsMode = () => {
    // Verificar si es Estados Unidos (batalla final)
    if (countryId === 'estadosunidos') {
      navigation.navigate('BossBattle', {
        countryId,
        countryName,
        isBossBattle: true,
      });
    } else {
      navigation.navigate('Physics', {
        countryId,
        countryName,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
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

      {/* Portal Selection */}
      {countryData.availablePortals && countryData.availablePortals.length > 0 && (
        <View style={styles.portalsSection}>
          <Heading2 style={styles.sectionTitle}>Método de Viaje</Heading2>
          <BodyText color={Colors.text.secondary} style={styles.subtitle}>
            Elige cómo viajar a este país
          </BodyText>
          <TouchableOpacity
            style={styles.portalButton}
            onPress={() => setShowPortalModal(true)}
          >
            <Heading2>🚪</Heading2>
            <BodyText>Seleccionar Portal</BodyText>
            {selectedPortal && (
              <SmallText color={Colors.success}>
                {getPortalIcon(selectedPortal)} {getPortalName(selectedPortal)}
              </SmallText>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Actividades */}
      <View style={styles.activitiesSection}>
        <Heading2 style={styles.sectionTitle}>Actividades</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.subtitle}>
          Completa las actividades para dominar este país
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

        {/* Physics Activity Button */}
        <Card
          style={[styles.activityCard, styles.physicsCard]}
          variant="elevated"
          onPress={handlePhysicsMode}
        >
          <View style={styles.activityContent}>
            <View style={styles.activityIcon}>
              <Heading2>
                {countryId === 'estadosunidos' ? '👑' : '🎯'}
              </Heading2>
            </View>
            <View style={styles.activityInfo}>
              <Heading2>
                {countryId === 'estadosunidos' ? 'Batalla Final' : 'Modo Físico'}
              </Heading2>
              <BodyText color={Colors.text.secondary}>
                {countryId === 'estadosunidos'
                  ? 'Enfrenta a Don Bowser en la batalla épica'
                  : 'Juego de física estilo Angry Birds'}
              </BodyText>
              <View style={styles.activityMeta}>
                <SmallText color={Colors.text.hint}>
                  {countryId === 'estadosunidos' ? 'Boss Battle' : 'Acción y física'}
                </SmallText>
                <SmallText color={Colors.text.hint}>⭐ 3 estrellas</SmallText>
              </View>
            </View>
            <View style={styles.activityArrow}>
              <SmallText>→</SmallText>
            </View>
          </View>
        </Card>
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

      {/* Portal Selection Modal */}
      <Modal
        visible={showPortalModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPortalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Heading2 style={styles.modalTitle}>Selecciona tu Método de Viaje</Heading2>
            <BodyText color={Colors.text.secondary} style={styles.modalSubtitle}>
              Cada portal tiene diferentes costos y riesgos
            </BodyText>

            <View style={styles.portalsList}>
              {countryData.availablePortals?.map((portal: PortalType) => (
                <TouchableOpacity
                  key={portal}
                  style={[
                    styles.portalOption,
                    selectedPortal === portal && styles.portalOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedPortal(portal);
                    setShowPortalModal(false);
                  }}
                >
                  <Heading1 style={styles.portalOptionIcon}>
                    {getPortalIcon(portal)}
                  </Heading1>
                  <View style={styles.portalOptionInfo}>
                    <Heading2>{getPortalName(portal)}</Heading2>
                    <SmallText color={Colors.text.secondary}>
                      {getPortalDescription(portal)}
                    </SmallText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPortalModal(false)}
            >
              <BodyText color={Colors.text.secondary}>Cerrar</BodyText>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
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
  portalsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  portalButton: {
    padding: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    gap: 8,
  },
  physicsCard: {
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: 400,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  portalsList: {
    gap: 12,
  },
  portalOption: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 16,
  },
  portalOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  portalOptionIcon: {
    fontSize: 40,
  },
  portalOptionInfo: {
    flex: 1,
  },
  modalCloseButton: {
    marginTop: 24,
    padding: 16,
    alignItems: 'center',
  },
});

export default CountryOverviewScreen;

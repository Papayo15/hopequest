/**
 * Portal Entrance Screen
 * Pantalla de selección de portal de migración
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { GameStackParamList, GameStackNavigationProp } from '../../navigation/types';
import { Heading1, Heading2, BodyText, SmallText, Button, Modal } from '../../components/ui';
import { PortalCard } from '../../components/portal/PortalCard';
import { Colors } from '../../constants';
import { usePortalStore, useEconomyStore, useUserStore } from '../../stores';
import type { PortalType, MigrationPortal } from '../../types';

// Import portal definitions
import portalDefinitionsData from '../../data/portals/portalDefinitions.json';

type PortalEntranceRouteProp = RouteProp<GameStackParamList, 'PortalEntrance'>;

const PORTAL_ICONS: Record<PortalType, string> = {
  avion: '✈️',
  barco: '🚢',
  tren: '🚂',
  autobus: '🚌',
  carro: '🚗',
  balsa: '🛶',
  tunel: '🚇',
  puente: '🌉',
  caminando: '🚶',
};

const PortalEntranceScreen: React.FC = () => {
  const navigation = useNavigation<GameStackNavigationProp>();
  const route = useRoute<PortalEntranceRouteProp>();
  const { countryId, fromCountry } = route.params;

  const [selectedPortalType, setSelectedPortalType] = useState<PortalType | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { unlockedPortals, selectPortal } = usePortalStore();
  const { money, documents, getStatus } = useEconomyStore();
  const { contentSensitivityLevel, parentalControlsEnabled } = useUserStore();

  const economyStatus = getStatus();

  // Parse portal definitions from JSON
  const portalDefinitions = portalDefinitionsData.portals;

  // Convert to MigrationPortal array
  const availablePortals: MigrationPortal[] = Object.values(portalDefinitions).map((portal: any) => ({
    id: portal.id,
    type: portal.type as PortalType,
    name: portal.name.es,
    description: portal.description.es,
    icon: PORTAL_ICONS[portal.type as PortalType],
    unlocked: unlockedPortals.includes(portal.type as PortalType),
    visual: portal.visual,
    audio: portal.audio,
    requirements: portal.requirements,
    costs: portal.costs,
    risks: {
      health: portal.risks.failureChance * 0.5,
      detection: portal.risks.failureChance,
      consequences: portal.risks.consequences,
    },
    educationalContent: portal.educationalContent,
    sensitivityLevel: portal.sensitivityLevel,
  }));

  // Filter by sensitivity level
  const filteredPortals = availablePortals.filter((portal) => {
    // Check sensitivity level
    if (portal.sensitivityLevel > contentSensitivityLevel) {
      return false;
    }
    return true;
  });

  const selectedPortal = selectedPortalType
    ? availablePortals.find((p) => p.type === selectedPortalType)
    : null;

  const hasRequiredDocuments = (portal: MigrationPortal): boolean => {
    const requiredDocs = portal.requirements.documents || [];
    return requiredDocs.every((doc) => documents.includes(doc as any));
  };

  const handlePortalSelect = (portalType: PortalType) => {
    setSelectedPortalType(portalType);
  };

  const handleContinue = () => {
    if (!selectedPortal) return;

    // NOTE: Los portales son GRATIS - el dinero es solo puntos/score
    // La progresión se desbloquea completando países, no pagando

    // Validate documents (parte de la narrativa educativa)
    if (!hasRequiredDocuments(selectedPortal)) {
      const missingDocs = (selectedPortal.requirements.documents || [])
        .filter((doc) => !documents.includes(doc as any))
        .join(', ');
      Alert.alert(
        'Documentos faltantes',
        `Necesitas los siguientes documentos: ${missingDocs}`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Educational warning about health (no bloquea, solo advierte)
    if (economyStatus === 'critical') {
      Alert.alert(
        'Salud Crítica',
        'Tu salud está muy baja. Deberías descansar antes de viajar.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Continuar de todas formas',
            style: 'destructive',
            onPress: () => proceedToRoute(),
          },
        ]
      );
      return;
    }

    proceedToRoute();
  };

  const proceedToRoute = () => {
    if (!selectedPortal) return;

    // Select portal in store
    selectPortal(selectedPortal);

    // Navigate to route selection (TODO: create RouteSelectionScreen)
    // For now, navigate directly to packing
    navigation.navigate('PortalPacking', {
      portalId: selectedPortal.id,
      routeId: 'default_route', // TODO: implement route selection
    });
  };

  const handleShowInfo = (portal: MigrationPortal) => {
    setSelectedPortalType(portal.type);
    setShowInfoModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading1>Portal de Viaje 🌀</Heading1>
        <BodyText color={Colors.text.secondary}>
          Saliendo de: {fromCountry}
        </BodyText>
        <BodyText color={Colors.text.secondary}>
          Destino: {countryId}
        </BodyText>
        <SmallText color={Colors.success} style={{ marginTop: 8, fontWeight: '600' }}>
          ✨ Los portales son GRATIS - ¡Solo completa actividades para avanzar!
        </SmallText>
      </View>

      {/* Economy Status - Solo informativo, NO bloquea */}
      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <SmallText color={Colors.text.tertiary}>⭐ Puntos</SmallText>
          <BodyText color={Colors.success}>${money}</BodyText>
        </View>
        <View style={styles.statusItem}>
          <SmallText color={Colors.text.tertiary}>📄 Documentos</SmallText>
          <BodyText>{documents.length}</BodyText>
        </View>
        <View style={styles.statusItem}>
          <SmallText color={Colors.text.tertiary}>Estado</SmallText>
          <BodyText
            color={
              economyStatus === 'stable'
                ? Colors.success
                : economyStatus === 'struggling'
                ? Colors.warning
                : Colors.error
            }
          >
            {economyStatus === 'stable'
              ? 'Estable'
              : economyStatus === 'struggling'
              ? 'Difícil'
              : 'Crítico'}
          </BodyText>
        </View>
      </View>

      {/* Portal List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Heading2 style={styles.sectionTitle}>
          Selecciona un Portal Mágico
        </Heading2>
        <BodyText color={Colors.text.secondary} style={styles.sectionSubtitle}>
          Cada portal representa diferentes formas de migración (educativo)
        </BodyText>

        {filteredPortals.map((portal) => (
          <PortalCard
            key={portal.id}
            portalType={portal.type}
            name={portal.name}
            description={portal.description}
            icon={portal.icon}
            unlocked={portal.unlocked}
            costs={{
              time: portal.costs.time,
              emotional: portal.costs.emotional,
            }}
            risks={{
              health: portal.risks.health,
              detection: portal.risks.detection,
            }}
            onPress={() => handlePortalSelect(portal.type)}
            selected={selectedPortalType === portal.type}
          />
        ))}

        {filteredPortals.length === 0 && (
          <View style={styles.emptyState}>
            <BodyText color={Colors.text.secondary} align="center">
              No hay portales disponibles con tu nivel de sensibilidad actual.
            </BodyText>
            <SmallText color={Colors.text.tertiary} align="center" style={{ marginTop: 8 }}>
              Ajusta la configuración de sensibilidad en Ajustes para ver más
              opciones.
            </SmallText>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      {selectedPortalType && selectedPortal && (
        <View style={styles.actions}>
          <Button
            title="Ver Información Educativa"
            onPress={() => handleShowInfo(selectedPortal)}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title={`Continuar con ${selectedPortal.name}`}
            onPress={handleContinue}
            variant="primary"
            fullWidth
            disabled={!selectedPortal.unlocked}
          />
        </View>
      )}

      {/* Info Modal */}
      {selectedPortal && (
        <Modal
          visible={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          title={`${selectedPortal.name} - Información`}
          size="large"
        >
          <ScrollView>
            <Heading2 style={styles.modalSection}>Contexto Histórico</Heading2>
            <BodyText color={Colors.text.secondary} style={styles.modalText}>
              {selectedPortal.educationalContent.historicalContext.es}
            </BodyText>

            {selectedPortal.educationalContent.statistics && (
              <>
                <Heading2 style={styles.modalSection}>Estadísticas</Heading2>
                {selectedPortal.educationalContent.statistics.map((stat: any, index: number) => (
                  <View key={index} style={styles.statCard}>
                    <SmallText color={Colors.text.tertiary}>
                      {stat.label.es}
                    </SmallText>
                    <Heading2 color={Colors.primary.main}>{stat.value}</Heading2>
                    <SmallText color={Colors.text.tertiary}>
                      Fuente: {stat.source}
                    </SmallText>
                  </View>
                ))}
              </>
            )}

            {selectedPortal.educationalContent.funFacts &&
              selectedPortal.educationalContent.funFacts.length > 0 && (
                <>
                  <Heading2 style={styles.modalSection}>Datos Curiosos</Heading2>
                  {selectedPortal.educationalContent.funFacts.map((fact: any, index: number) => (
                    <BodyText
                      key={index}
                      color={Colors.text.secondary}
                      style={styles.factItem}
                    >
                      • {fact.es}
                    </BodyText>
                  ))}
                </>
              )}

            <Button
              title="Cerrar"
              onPress={() => setShowInfoModal(false)}
              variant="primary"
              fullWidth
              style={{ marginTop: 20 }}
            />
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.background.tertiary,
  },
  statusItem: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionSubtitle: {
    marginBottom: 20,
  },
  emptyState: {
    padding: 40,
  },
  actions: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.background.tertiary,
  },
  actionButton: {
    marginBottom: 12,
  },
  modalSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    marginBottom: 12,
  },
  statCard: {
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    marginBottom: 12,
  },
  factItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
});

export default PortalEntranceScreen;

/**
 * Portal Packing Screen
 * Mini-juego interactivo de empacar equipaje
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { GameStackParamList, GameStackNavigationProp } from '../../navigation/types';
import { Heading1, Heading2, BodyText, SmallText, Button } from '../../components/ui';
import { PackingItem } from '../../components/portal/PackingItem';
import { Colors } from '../../constants';
import { usePortalStore, useEconomyStore } from '../../stores';
import type { PackingItem as PackingItemType } from '../../types';

// Import packing items
import packingItemsData from '../../data/portals/packingItems.json';

type PortalPackingRouteProp = RouteProp<GameStackParamList, 'PortalPacking'>;

const PortalPackingScreen: React.FC = () => {
  const navigation = useNavigation<GameStackNavigationProp>();
  const route = useRoute<PortalPackingRouteProp>();
  const { portalId, routeId } = route.params;

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const {
    selectedPortal,
    selectedItems,
    currentWeight,
    currentVolume,
    addItem,
    removeItem,
    canPackItem,
    startTransition,
  } = usePortalStore();

  const { spendMoney } = useEconomyStore();

  // Calculate max capacity based on portal type
  const maxWeight = selectedPortal?.type === 'avion' ? 23 :
                    selectedPortal?.type === 'barco' ? 50 :
                    selectedPortal?.type === 'tren' ? 30 :
                    selectedPortal?.type === 'autobus' ? 25 :
                    selectedPortal?.type === 'carro' ? 20 :
                    15; // balsa, tunel, puente, caminando

  const maxVolume = selectedPortal?.type === 'avion' ? 40 :
                    selectedPortal?.type === 'barco' ? 80 :
                    selectedPortal?.type === 'tren' ? 60 :
                    selectedPortal?.type === 'autobus' ? 50 :
                    selectedPortal?.type === 'carro' ? 40 :
                    30; // balsa, tunel, puente, caminando

  // Parse all available items from JSON
  const allItems: PackingItemType[] = Object.values(packingItemsData.items).flat() as PackingItemType[];

  // Separate mandatory and optional items
  const mandatoryItems = allItems.filter(item => item.isMandatory);
  const optionalItems = allItems.filter(item => !item.isMandatory);

  // Check if all mandatory items are packed
  const allMandatoryPacked = mandatoryItems.every(item =>
    selectedItems.some(selected => selected.id === item.id)
  );

  const weightPercentage = (currentWeight / maxWeight) * 100;
  const volumePercentage = (currentVolume / maxVolume) * 100;

  const isItemPacked = (itemId: string): boolean => {
    return selectedItems.some(item => item.id === itemId);
  };

  const handleItemPress = (item: PackingItemType) => {
    if (isItemPacked(item.id)) {
      // Unpacking item
      if (item.isMandatory) {
        Alert.alert(
          'Item Obligatorio',
          'Este item es obligatorio y no puede ser removido.',
          [{ text: 'OK' }]
        );
        return;
      }
      removeItem(item.id);
      setSelectedItemId(null);
    } else {
      // Packing item
      if (selectedItemId === item.id) {
        // Try to pack
        const canPack = canPackItem(item, maxWeight, maxVolume);
        if (canPack) {
          const success = addItem(item);
          if (success) {
            setSelectedItemId(null);
          }
        } else {
          Alert.alert(
            'No cabe',
            'No tienes suficiente espacio para este item. Intenta remover otros items primero.',
            [{ text: 'OK' }]
          );
        }
      } else {
        // Just select to show info
        setSelectedItemId(item.id);
      }
    }
  };

  const handleContinue = () => {
    if (!allMandatoryPacked) {
      Alert.alert(
        'Items Faltantes',
        'Debes empacar todos los items obligatorios antes de continuar.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Confirm and proceed
    Alert.alert(
      'Confirmar Equipaje',
      `Has empacado ${selectedItems.length} items (${currentWeight.toFixed(1)}kg, ${currentVolume.toFixed(1)}L).\n\n¿Estás listo para comenzar el viaje?`,
      [
        { text: 'Revisar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => {
            if (!selectedPortal) return;

            // NOTE: Portales son GRATIS - no money deduction

            // Start transition
            startTransition();

            // Navigate to transition screen
            navigation.navigate('PortalTransition', {
              portalId,
              routeId,
              phase: 'preparation',
            });
          },
        },
      ]
    );
  };

  const handleAutoPackRecommended = () => {
    // Clear current selection
    selectedItems.forEach(item => {
      if (!item.isMandatory) {
        removeItem(item.id);
      }
    });

    // Auto-pack recommended items based on portal type
    const recommendedCategories = selectedPortal?.type === 'avion'
      ? ['documents', 'personal']
      : selectedPortal?.type === 'barco'
      ? ['documents', 'clothing', 'food']
      : selectedPortal?.type === 'tren' || selectedPortal?.type === 'autobus'
      ? ['documents', 'personal', 'food']
      : ['documents', 'tools']; // carro, balsa, tunel, puente, caminando

    let currentW = currentWeight;
    let currentV = currentVolume;

    optionalItems
      .filter(item => recommendedCategories.includes(item.category))
      .sort((a, b) => {
        // Prioritize by effect value
        const aValue = a.effects?.reduce((sum, e) => sum + (e.value || 0), 0) || 0;
        const bValue = b.effects?.reduce((sum, e) => sum + (e.value || 0), 0) || 0;
        return bValue - aValue;
      })
      .forEach(item => {
        if (currentW + item.weight <= maxWeight && currentV + item.volume <= maxVolume) {
          addItem(item);
          currentW += item.weight;
          currentV += item.volume;
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading1>Prepara tu Equipaje</Heading1>
        <BodyText color={Colors.text.secondary}>
          Portal: {selectedPortal?.name || 'Desconocido'}
        </BodyText>
      </View>

      {/* Capacity Bars */}
      <View style={styles.capacityContainer}>
        <View style={styles.capacityRow}>
          <SmallText color={Colors.text.tertiary}>
            Peso: {currentWeight.toFixed(1)} / {maxWeight}kg
          </SmallText>
          <SmallText
            color={
              weightPercentage > 90
                ? Colors.error
                : weightPercentage > 70
                ? Colors.warning
                : Colors.success
            }
          >
            {weightPercentage.toFixed(0)}%
          </SmallText>
        </View>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min(weightPercentage, 100)}%`,
                backgroundColor:
                  weightPercentage > 90
                    ? Colors.error
                    : weightPercentage > 70
                    ? Colors.warning
                    : Colors.success,
              },
            ]}
          />
        </View>

        <View style={[styles.capacityRow, { marginTop: 12 }]}>
          <SmallText color={Colors.text.tertiary}>
            Volumen: {currentVolume.toFixed(1)} / {maxVolume}L
          </SmallText>
          <SmallText
            color={
              volumePercentage > 90
                ? Colors.error
                : volumePercentage > 70
                ? Colors.warning
                : Colors.success
            }
          >
            {volumePercentage.toFixed(0)}%
          </SmallText>
        </View>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min(volumePercentage, 100)}%`,
                backgroundColor:
                  volumePercentage > 90
                    ? Colors.error
                    : volumePercentage > 70
                    ? Colors.warning
                    : Colors.success,
              },
            ]}
          />
        </View>
      </View>

      {/* Auto Pack Button */}
      <View style={styles.autoPackContainer}>
        <Button
          title="Auto-empacar Recomendados"
          onPress={handleAutoPackRecommended}
          variant="outline"
          size="small"
        />
      </View>

      {/* Items List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mandatory Items */}
        <Heading2 style={styles.sectionTitle}>Items Obligatorios ⚠️</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.sectionSubtitle}>
          Estos items son necesarios para el viaje
        </BodyText>
        {mandatoryItems.map(item => (
          <PackingItem
            key={item.id}
            item={item}
            selected={selectedItemId === item.id}
            packed={isItemPacked(item.id)}
            onPress={() => handleItemPress(item)}
          />
        ))}

        {/* Optional Items */}
        <Heading2 style={[styles.sectionTitle, { marginTop: 24 }]}>
          Items Opcionales
        </Heading2>
        <BodyText color={Colors.text.secondary} style={styles.sectionSubtitle}>
          Selecciona items que te ayudarán en el viaje
        </BodyText>
        {optionalItems.map(item => (
          <PackingItem
            key={item.id}
            item={item}
            selected={selectedItemId === item.id}
            packed={isItemPacked(item.id)}
            onPress={() => handleItemPress(item)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.actionInfo}>
          <SmallText color={Colors.text.tertiary}>Items empacados</SmallText>
          <BodyText color={Colors.primary.main}>
            {selectedItems.length} items
          </BodyText>
        </View>
        <Button
          title="Comenzar Viaje"
          onPress={handleContinue}
          variant="primary"
          disabled={!allMandatoryPacked}
        />
      </View>
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
  capacityContainer: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: Colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.tertiary,
  },
  capacityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barContainer: {
    height: 8,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  autoPackContainer: {
    padding: 16,
    paddingBottom: 8,
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
    marginBottom: 16,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.background.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  actionInfo: {
    flex: 1,
  },
});

export default PortalPackingScreen;

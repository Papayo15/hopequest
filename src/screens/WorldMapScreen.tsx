/**
 * World Map Screen
 * Mapa interactivo del mundo para seleccionar países
 * HISTORIA: Inicia en México (con Xolo), progresión lineal hasta Estados Unidos
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { MainTabNavigationProp } from '../navigation/types';
import { Heading2, BodyText, SmallText, Card } from '../components/ui';
import { Colors, GameConfig } from '../constants';
import { useGameStore } from '../stores';
import * as CountriesData from '../constants/countries';
import Svg, { Line, Circle } from 'react-native-svg';
import { useBackgroundMusic } from '../hooks/useAudio';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CountryPin {
  id: string;
  name: string;
  region: string;
  flag: string;
  position: { x: number; y: number };
  unlocked: boolean;
  completed: boolean;
  stars?: number;
  isNext: boolean;
  orderIndex: number;
}

// Posiciones aproximadas en el mapa (% desde left, top)
const COUNTRY_POSITIONS: Record<string, { x: number; y: number }> = {
  mexico: { x: 18, y: 38 },
  venezuela: { x: 32, y: 52 },
  colombia: { x: 30, y: 54 },
  panama: { x: 28, y: 50 },
  costarica: { x: 26, y: 48 },
  nicaragua: { x: 26, y: 47 },
  honduras: { x: 25, y: 46 },
  elsalvador: { x: 25, y: 47 },
  guatemala: { x: 24, y: 46 },
  cuba: { x: 28, y: 42 },
  haiti: { x: 30, y: 43 },
  republicadominicana: { x: 31, y: 43 },
  jamaica: { x: 28, y: 44 },
  ecuador: { x: 30, y: 56 },
  peru: { x: 31, y: 60 },
  bolivia: { x: 32, y: 63 },
  chile: { x: 31, y: 70 },
  argentina: { x: 33, y: 72 },
  uruguay: { x: 35, y: 71 },
  paraguay: { x: 34, y: 66 },
  brasil: { x: 37, y: 62 },
  surinam: { x: 35, y: 54 },
  espana: { x: 48, y: 32 },
  portugal: { x: 46, y: 33 },
  francia: { x: 50, y: 30 },
  italia: { x: 52, y: 33 },
  alemania: { x: 51, y: 29 },
  reinounido: { x: 48, y: 28 },
  marruecos: { x: 47, y: 35 },
  sudafrica: { x: 54, y: 72 },
  turquia: { x: 56, y: 33 },
  india: { x: 68, y: 42 },
  filipinas: { x: 78, y: 46 },
  australia: { x: 80, y: 70 },
  estadosunidos: { x: 22, y: 32 },
};

const WorldMapScreen: React.FC = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const completedCountries = useGameStore((state) => state.completedCountries);
  const currentLevel = useGameStore((state) => state.currentLevel);
  const setCurrentCountryId = useGameStore((state) => state.setCurrentCountryId);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Background music
  useBackgroundMusic('map');

  // Regiones disponibles (basadas en los datos de países)
  const regions = [
    'All',
    'North America',
    'Central America',
    'South America',
    'Caribbean',
    'Europe',
    'Africa',
    'Asia',
  ];

  // NUEVA RUTA: Empieza en México (donde está Xolo)
  // Nota: Modificamos countryRoute para empezar en México
  const countryRoute = [
    'mexico',         // 1 - INICIO: Encuentro con Xolo, el guía
    'guatemala',      // 2 - Frontera norte
    'honduras',       // 3 - Caravana migrante
    'elsalvador',     // 4 - Desafíos
    'nicaragua',      // 5 - Ruta centroamericana
    'costarica',      // 6 - Descanso
    'panama',         // 7 - Canal importante
    'colombia',       // 8 - Puerta a Sudamérica
    'venezuela',      // 9 - Origen de la crisis (flashback)
    'ecuador',        // 10
    'peru',           // 11
    'bolivia',        // 12
    'chile',          // 13
    'argentina',      // 14
    'uruguay',        // 15
    'paraguay',       // 16
    'brasil',         // 17
    'surinam',        // 18
    'cuba',           // 19
    'haiti',          // 20
    'republicadominicana', // 21
    'jamaica',        // 22
    'espana',         // 23
    'portugal',       // 24
    'francia',        // 25
    'italia',         // 26
    'alemania',       // 27
    'reinounido',     // 28
    'marruecos',      // 29
    'sudafrica',      // 30
    'turquia',        // 31
    'india',          // 32
    'filipinas',      // 33
    'australia',      // 34
    'estadosunidos',  // 35 - FINAL: Batalla contra Don Bowser
  ];

  // Generar lista de países con estado de desbloqueo
  const countryPins = useMemo<CountryPin[]>(() => {
    return countryRoute.map((countryId, index) => {
      const countryData = (CountriesData as any)[countryId];

      if (!countryData) {
        console.warn(`Country data not found for: ${countryId}`);
        return null;
      }

      const isCompleted = completedCountries.includes(countryId);
      const isUnlocked = index === 0 || completedCountries.includes(countryRoute[index - 1]);
      const isNext = !isCompleted && isUnlocked;

      return {
        id: countryId,
        name: countryData.name,
        region: countryData.region,
        flag: countryData.flag,
        position: COUNTRY_POSITIONS[countryId] || { x: 50, y: 50 },
        unlocked: isUnlocked,
        completed: isCompleted,
        stars: isCompleted ? 3 : undefined, // TODO: Get actual stars from gameStore
        isNext,
        orderIndex: index + 1,
      };
    }).filter(Boolean) as CountryPin[];
  }, [completedCountries]);

  // Filtrar países por región
  const filteredCountries = useMemo(() => {
    if (!selectedRegion || selectedRegion === 'All') {
      return countryPins;
    }
    return countryPins.filter((country) => country.region === selectedRegion);
  }, [countryPins, selectedRegion]);

  const handleCountryPress = (country: CountryPin) => {
    if (!country.unlocked) {
      return;
    }

    // Guardar el país actual en el store
    setCurrentCountryId(country.id);

    // Navegar a CountryOverview
    console.log('Navigate to country:', country.id, country.name);
    (navigation as any).navigate('CountryOverview', {
      countryId: country.id,
      countryName: country.name,
      countryFlag: country.flag,
      orderIndex: country.orderIndex,
    });
  };

  // Obtener icono de portal basado en el tipo
  const getPortalIcon = (countryId: string): string => {
    const countryData = (CountriesData as any)[countryId];
    if (!countryData || !countryData.availablePortals || countryData.availablePortals.length === 0) {
      return '🚶';
    }

    const portalType = countryData.availablePortals[0];
    const icons: Record<string, string> = {
      terrestre: '🚂',
      aereo: '✈️',
      maritimo: '⛴️',
      clandestino: '🚶',
      refugiado: '🆘',
      familiar: '👨‍👩‍👧‍👦',
    };
    return icons[portalType] || '🚪';
  };

  // Renderizar líneas de conexión entre países
  const renderPortalConnections = () => {
    const connections = [];
    const mapHeight = 300;
    const mapWidth = SCREEN_WIDTH - 40;

    for (let i = 0; i < countryPins.length - 1; i++) {
      const current = countryPins[i];
      const next = countryPins[i + 1];

      if (!current || !next) continue;

      const x1 = (current.position.x / 100) * mapWidth;
      const y1 = (current.position.y / 100) * mapHeight;
      const x2 = (next.position.x / 100) * mapWidth;
      const y2 = (next.position.y / 100) * mapHeight;

      const isActive = current.completed || current.unlocked;
      const strokeColor = isActive ? Colors.primary : Colors.text.disabled;
      const strokeWidth = current.isNext ? 3 : 2;

      connections.push(
        <Line
          key={`line-${current.id}-${next.id}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={isActive ? undefined : '5,5'}
          opacity={isActive ? 0.8 : 0.3}
        />
      );

      // Portal icon at midpoint
      if (isActive) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        connections.push(
          <Circle
            key={`portal-${current.id}-${next.id}`}
            cx={midX}
            cy={midY}
            r={8}
            fill={Colors.accent}
            opacity={0.9}
          />
        );
      }
    }

    return connections;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading2>Mapa del Mundo</Heading2>
        <BodyText color={Colors.text.secondary}>
          País {currentLevel} de 35 • {completedCountries.length} completados
        </BodyText>
      </View>

      {/* Region Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {regions.map((region) => (
          <TouchableOpacity
            key={region}
            onPress={() => setSelectedRegion(region === 'All' ? null : region)}
            style={[
              styles.filterButton,
              (selectedRegion === region ||
                (region === 'All' && selectedRegion === null)) &&
                styles.filterButtonActive,
            ]}
          >
            <SmallText
              color={
                selectedRegion === region ||
                (region === 'All' && selectedRegion === null)
                  ? Colors.white
                  : Colors.text.primary
              }
            >
              {region}
            </SmallText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          {/* Portal Connections */}
          <Svg
            height={300}
            width={SCREEN_WIDTH - 40}
            style={styles.connectionsLayer}
          >
            {renderPortalConnections()}
          </Svg>

          {/* Country Pins */}
          {filteredCountries.map((country) => (
            <TouchableOpacity
              key={country.id}
              style={[
                styles.countryPin,
                {
                  left: `${country.position.x}%`,
                  top: `${country.position.y}%`,
                },
                !country.unlocked && styles.countryPinLocked,
              ]}
              onPress={() => handleCountryPress(country)}
              disabled={!country.unlocked}
            >
              <View
                style={[
                  styles.pin,
                  !country.unlocked && styles.pinLocked,
                  country.completed && styles.pinCompleted,
                  country.isNext && styles.pinNext,
                ]}
              >
                <SmallText>
                  {country.unlocked ? country.flag : '🔒'}
                </SmallText>
              </View>
              <SmallText style={styles.countryLabel}>
                {country.orderIndex}. {country.name}
              </SmallText>
              {country.completed && country.stars && (
                <SmallText style={styles.stars}>
                  {'⭐'.repeat(country.stars)}
                </SmallText>
              )}
              {/* Portal icon for unlocked/completed */}
              {(country.unlocked || country.completed) && (
                <SmallText style={styles.portalIcon}>
                  {getPortalIcon(country.id)}
                </SmallText>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Country List (Alternative view) */}
      <ScrollView style={styles.listContainer}>
        {filteredCountries.map((country) => (
          <Card
            key={country.id}
            variant={country.unlocked ? 'elevated' : 'flat'}
            style={[
              styles.countryCard,
              country.isNext && styles.countryCardNext,
            ]}
            onPress={country.unlocked ? () => handleCountryPress(country) : undefined}
          >
            <View style={styles.countryCardContent}>
              <View style={styles.countryInfo}>
                <Heading2>
                  {country.flag} {country.orderIndex}. {country.name}
                </Heading2>
                <SmallText color={Colors.text.secondary}>
                  {country.region}
                  {country.isNext && ' • ¡Siguiente destino!'}
                  {country.completed && ' • Completado'}
                  {!country.unlocked && ' • Bloqueado'}
                </SmallText>
              </View>
              {country.completed && country.stars && (
                <View style={styles.countryStats}>
                  <SmallText>{'⭐'.repeat(country.stars)}</SmallText>
                </View>
              )}
              {!country.unlocked && (
                <View style={styles.lockIcon}>
                  <SmallText>🔒</SmallText>
                </View>
              )}
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  filterContainer: {
    maxHeight: 50,
    marginBottom: 12,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  mapContainer: {
    height: 300,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    position: 'relative',
  },
  countryPin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  countryPinLocked: {
    opacity: 0.4,
  },
  pin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  pinLocked: {
    backgroundColor: Colors.text.disabled,
  },
  pinCompleted: {
    backgroundColor: Colors.success,
  },
  pinNext: {
    backgroundColor: Colors.secondary,
    borderWidth: 3,
    borderColor: Colors.accent,
  },
  countryLabel: {
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 10,
    maxWidth: 60,
  },
  stars: {
    fontSize: 10,
  },
  portalIcon: {
    fontSize: 12,
    marginTop: 2,
  },
  connectionsLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  countryCard: {
    marginBottom: 12,
  },
  countryCardNext: {
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  countryCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryInfo: {
    flex: 1,
  },
  countryStats: {
    alignItems: 'flex-end',
  },
  lockIcon: {
    marginLeft: 8,
  },
});

export default WorldMapScreen;

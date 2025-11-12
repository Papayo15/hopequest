/**
 * Location Selection Screen
 * Selección de ubicación dentro de un país
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heading1, BodyText } from '../../components/ui';
import { Colors } from '../../constants';

const LocationSelectionScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Heading1>Location Selection</Heading1>
      <BodyText>TODO: Implement location selection</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationSelectionScreen;

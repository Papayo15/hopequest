import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heading1, BodyText } from '../../components/ui';
import { Colors } from '../../constants';

const CountryCompleteScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Heading1>Country Complete!</Heading1>
      <BodyText>TODO: Implement completion screen with rewards</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary, padding: 20, justifyContent: 'center', alignItems: 'center' },
});

export default CountryCompleteScreen;

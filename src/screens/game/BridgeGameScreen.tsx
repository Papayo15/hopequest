import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heading1, BodyText } from '../../components/ui';
import { Colors } from '../../constants';

const BridgeGameScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Heading1>Bridge Game</Heading1>
      <BodyText>TODO: Implement Matter.js physics bridge/wall game</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary, padding: 20, justifyContent: 'center', alignItems: 'center' },
});

export default BridgeGameScreen;

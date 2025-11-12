/**
 * Parental Controls Screen
 * Sistema de controles parentales con PIN
 */

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Heading1, Heading2, BodyText, SmallText, Button, Card } from '../../components/ui';
import { Colors } from '../../constants';
import { useUserStore } from '../../stores';

const ParentalControlsScreen: React.FC = () => {
  const {
    parentalControlsEnabled,
    parentalPin,
    contentSensitivityLevel,
    setParentalControls,
    setContentLevel,
  } = useUserStore();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleUnlock = () => {
    if (pinInput === parentalPin) {
      setIsUnlocked(true);
      setPinInput('');
    } else {
      Alert.alert('Error', 'PIN incorrecto');
      setPinInput('');
    }
  };

  const handleSetPin = () => {
    if (newPin.length !== 4) {
      Alert.alert('Error', 'El PIN debe tener 4 dígitos');
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert('Error', 'Los PINs no coinciden');
      return;
    }

    setParentalControls(true, newPin);
    Alert.alert('Éxito', 'PIN establecido correctamente');
    setNewPin('');
    setConfirmPin('');
  };

  const handleDisable = () => {
    Alert.alert(
      'Desactivar Controles Parentales',
      '¿Estás seguro? Esto permitirá acceso a todo el contenido.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desactivar',
          style: 'destructive',
          onPress: () => {
            setParentalControls(false);
            setIsUnlocked(false);
          },
        },
      ]
    );
  };

  // If controls are enabled and not unlocked, show PIN entry
  if (parentalControlsEnabled && !isUnlocked && parentalPin) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Heading1 align="center">🔒 Controles Parentales</Heading1>
          <BodyText align="center" style={styles.subtitle}>
            Ingresa el PIN para acceder
          </BodyText>

          <Card variant="outlined" style={styles.pinCard}>
            <TextInput
              style={styles.pinInput}
              value={pinInput}
              onChangeText={setPinInput}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
              placeholder="••••"
              placeholderTextColor={Colors.text.tertiary}
            />
            <Button
              title="Desbloquear"
              onPress={handleUnlock}
              variant="primary"
              fullWidth
              disabled={pinInput.length !== 4}
            />
          </Card>

          <SmallText align="center" color={Colors.text.tertiary}>
            Solo adultos deben tener acceso a estos ajustes
          </SmallText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading1>Controles Parentales</Heading1>
        <BodyText color={Colors.text.secondary} style={styles.subtitle}>
          Configura el acceso a contenido sensible
        </BodyText>

        {/* Set PIN Section */}
        {!parentalPin ? (
          <Card variant="outlined" style={styles.card}>
            <Heading2>Establecer PIN</Heading2>
            <BodyText color={Colors.text.secondary} style={styles.cardSubtitle}>
              Crea un PIN de 4 dígitos para proteger estos ajustes
            </BodyText>

            <View style={styles.form}>
              <BodyText style={styles.label}>Nuevo PIN</BodyText>
              <TextInput
                style={styles.input}
                value={newPin}
                onChangeText={setNewPin}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                placeholder="••••"
                placeholderTextColor={Colors.text.tertiary}
              />

              <BodyText style={styles.label}>Confirmar PIN</BodyText>
              <TextInput
                style={styles.input}
                value={confirmPin}
                onChangeText={setConfirmPin}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                placeholder="••••"
                placeholderTextColor={Colors.text.tertiary}
              />

              <Button
                title="Establecer PIN"
                onPress={handleSetPin}
                variant="primary"
                fullWidth
                disabled={newPin.length !== 4 || confirmPin.length !== 4}
              />
            </View>
          </Card>
        ) : (
          <>
            {/* Content Sensitivity Level */}
            <Card variant="outlined" style={styles.card}>
              <Heading2>Nivel de Contenido</Heading2>
              <BodyText color={Colors.text.secondary} style={styles.cardSubtitle}>
                Nivel actual: {contentSensitivityLevel}/5
              </BodyText>

              <View style={styles.levelDescriptions}>
                <SmallText color={Colors.text.tertiary}>
                  • Nivel 1: Solo contenido muy suave
                </SmallText>
                <SmallText color={Colors.text.tertiary}>
                  • Nivel 2: Contenido educativo básico
                </SmallText>
                <SmallText color={Colors.text.tertiary}>
                  • Nivel 3: Contenido moderado (recomendado)
                </SmallText>
                <SmallText color={Colors.text.tertiary}>
                  • Nivel 4: Contenido más realista
                </SmallText>
                <SmallText color={Colors.text.tertiary}>
                  • Nivel 5: Todo el contenido educativo (incluye temas sensibles)
                </SmallText>
              </View>

              <View style={styles.levelButtons}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    title={level.toString()}
                    onPress={() => setContentLevel(level as 1 | 2 | 3 | 4 | 5)}
                    variant={contentSensitivityLevel === level ? 'primary' : 'outline'}
                    size="small"
                  />
                ))}
              </View>
            </Card>

            {/* Protected Content Info */}
            <Card variant="flat" style={styles.infoCard}>
              <Heading2>Contenido Protegido</Heading2>
              <BodyText color={Colors.text.secondary} style={styles.infoText}>
                Con nivel {contentSensitivityLevel}, el jugador {contentSensitivityLevel < 3 ? 'NO' : 'SÍ'} podrá acceder a:
              </BodyText>
              <View style={styles.contentList}>
                <BodyText>• Portales con riesgos moderados</BodyText>
                <BodyText>• Narrativas sobre migración difícil</BodyText>
                {contentSensitivityLevel >= 5 && (
                  <BodyText color={Colors.warning}>
                    • Portal Clandestino (Nivel 5 requerido)
                  </BodyText>
                )}
              </View>
            </Card>

            {/* Disable Controls */}
            <Card variant="outlined" style={styles.dangerCard}>
              <Heading2 color={Colors.error}>Desactivar Controles</Heading2>
              <BodyText color={Colors.text.secondary} style={styles.dangerText}>
                Esto permitirá acceso sin restricciones a todo el contenido
              </BodyText>
              <Button
                title="Desactivar Controles Parentales"
                onPress={handleDisable}
                variant="danger"
                fullWidth
              />
            </Card>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    marginBottom: 24,
  },
  pinCard: {
    marginVertical: 40,
    padding: 24,
  },
  pinInput: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 20,
    fontSize: 32,
    color: Colors.text.primary,
    borderWidth: 2,
    borderColor: Colors.primary.main,
    textAlign: 'center',
    letterSpacing: 20,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardSubtitle: {
    marginTop: 8,
    marginBottom: 16,
  },
  form: {
    gap: 4,
  },
  label: {
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.background.tertiary,
    textAlign: 'center',
    letterSpacing: 10,
  },
  levelDescriptions: {
    marginBottom: 16,
    gap: 8,
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: Colors.info + '10',
  },
  infoText: {
    marginVertical: 12,
  },
  contentList: {
    gap: 8,
  },
  dangerCard: {
    borderColor: Colors.error,
    backgroundColor: Colors.error + '10',
  },
  dangerText: {
    marginVertical: 12,
  },
});

export default ParentalControlsScreen;

/**
 * Auth Screen
 * Pantalla de autenticación/bienvenida con selección de personaje
 */

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../navigation/types';
import { Heading1, Heading2, BodyText, SmallText, Button } from '../components/ui';
import { Colors } from '../constants';
import { useUserStore } from '../stores';
import type { ProtagonistGender } from '../constants/gameConfig';

// Helper function for cross-platform alerts
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const setUser = useUserStore((state) => state.setUser);
  const setProtagonist = useUserStore((state) => state.setProtagonist);
  const incrementSessions = useUserStore((state) => state.incrementSessions);

  const [step, setStep] = useState<'user_info' | 'character_selection'>('user_info');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [selectedGender, setSelectedGender] = useState<ProtagonistGender | null>(null);
  const [protagonistName, setProtagonistName] = useState('');

  const handleContinueToCharacter = () => {
    // Validate input
    if (!username.trim()) {
      showAlert('Error', 'Por favor ingresa tu nombre');
      return;
    }

    const parsedAge = parseInt(age, 10);
    if (!parsedAge || parsedAge < 5 || parsedAge > 99) {
      showAlert('Error', 'Por favor ingresa una edad válida (5-99 años)');
      return;
    }

    setStep('character_selection');
  };

  const handleStartGame = () => {
    if (!selectedGender) {
      showAlert('Error', 'Por favor selecciona si quieres ser niño o niña');
      return;
    }

    const finalProtagonistName = protagonistName.trim() || (selectedGender === 'boy' ? 'Pepe' : 'Paula');

    // Create/update user
    setUser({
      userId: `user_${Date.now()}`,
      username: username.trim(),
      age: parseInt(age, 10),
      email: null,
      avatar: null,
    });

    // Set protagonist
    setProtagonist(selectedGender, finalProtagonistName);

    incrementSessions();

    // Navigate to main app
    navigation.replace('Main');
  };

  if (step === 'character_selection') {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Heading1 align="center" style={styles.title}>
            ¡Elige tu personaje!
          </Heading1>
          <BodyText align="center" style={styles.subtitle}>
            ¿Quién serás en esta aventura?
          </BodyText>

          {/* Gender Selection */}
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderCard,
                selectedGender === 'boy' && styles.genderCardSelected,
              ]}
              onPress={() => {
                setSelectedGender('boy');
                setProtagonistName('');
              }}
            >
              <View style={styles.genderIcon}>
                <Heading1>👦</Heading1>
              </View>
              <Heading2 align="center">Niño</Heading2>
              <SmallText align="center" color={Colors.text.secondary}>
                Encontrarás a Paula en tu viaje
              </SmallText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderCard,
                selectedGender === 'girl' && styles.genderCardSelected,
              ]}
              onPress={() => {
                setSelectedGender('girl');
                setProtagonistName('');
              }}
            >
              <View style={styles.genderIcon}>
                <Heading1>👧</Heading1>
              </View>
              <Heading2 align="center">Niña</Heading2>
              <SmallText align="center" color={Colors.text.secondary}>
                Encontrarás a Pepe en tu viaje
              </SmallText>
            </TouchableOpacity>
          </View>

          {/* Custom Name */}
          {selectedGender && (
            <View style={styles.nameContainer}>
              <BodyText style={styles.label}>
                ¿Cómo se llama tu personaje? (Opcional)
              </BodyText>
              <TextInput
                style={styles.input}
                value={protagonistName}
                onChangeText={setProtagonistName}
                placeholder={selectedGender === 'boy' ? 'Pepe' : 'Paula'}
                placeholderTextColor={Colors.text.tertiary}
                maxLength={20}
              />
              <SmallText color={Colors.text.tertiary} style={styles.hint}>
                Dejar vacío usará el nombre por defecto
              </SmallText>
            </View>
          )}

          {/* Companion Info */}
          {selectedGender && (
            <View style={styles.companionInfo}>
              <BodyText color={Colors.text.secondary} align="center">
                Durante tu aventura conocerás a:
              </BodyText>
              <View style={styles.companionCard}>
                <BodyText>
                  🌟 {selectedGender === 'boy' ? 'Paula' : 'Pepe'} - Tu compañero/a de viaje
                </BodyText>
                <BodyText>
                  👧 Isabella - Niña adoptada por la familia
                </BodyText>
                <BodyText>
                  🦎 Xolo - Ajolote sabio, tu guía
                </BodyText>
              </View>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title="Volver"
              onPress={() => setStep('user_info')}
              variant="outline"
              fullWidth
              style={styles.backButton}
            />
            <Button
              title="Comenzar Aventura"
              onPress={handleStartGame}
              variant="primary"
              size="large"
              fullWidth
              disabled={!selectedGender}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading1 align="center" style={styles.title}>
          ¡Bienvenido a Hope Quest!
        </Heading1>
        <BodyText align="center" style={styles.subtitle}>
          Una aventura por el mundo llena de aprendizaje
        </BodyText>

        <View style={styles.form}>
          <BodyText style={styles.label}>¿Cómo te llamas?</BodyText>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Tu nombre"
            placeholderTextColor={Colors.text.tertiary}
            maxLength={20}
          />

          <BodyText style={styles.label}>¿Cuántos años tienes?</BodyText>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Edad"
            placeholderTextColor={Colors.text.tertiary}
            keyboardType="number-pad"
            maxLength={2}
          />

          <Button
            title="Continuar"
            onPress={handleContinueToCharacter}
            variant="primary"
            size="large"
            fullWidth
            style={styles.continueButton}
          />
        </View>

        <BodyText
          align="center"
          style={styles.disclaimer}
          color={Colors.text.tertiary}
        >
          Al jugar, aceptas aprender sobre geografía, culturas y migración de
          forma respetuosa
        </BodyText>
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
    justifyContent: 'center',
    padding: 24,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 40,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.background.tertiary,
  },
  hint: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  continueButton: {
    marginTop: 8,
  },
  disclaimer: {
    fontSize: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  genderCard: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  genderCardSelected: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.light,
  },
  genderIcon: {
    marginBottom: 12,
  },
  nameContainer: {
    marginBottom: 24,
  },
  companionInfo: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  companionCard: {
    marginTop: 12,
    gap: 8,
  },
  actions: {
    gap: 12,
  },
  backButton: {
    marginBottom: 4,
  },
});

export default AuthScreen;

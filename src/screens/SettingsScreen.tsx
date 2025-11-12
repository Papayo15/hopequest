/**
 * Settings Screen
 * Pantalla de configuración
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { Heading1, Heading2, BodyText, SmallText, Card, Button } from '../components/ui';
import { Colors } from '../constants';
import { useUserStore } from '../stores';

const SettingsScreen: React.FC = () => {
  const {
    parentalControlsEnabled,
    contentSensitivityLevel,
    setParentalControls,
    setContentLevel,
  } = useUserStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Heading1 style={styles.title}>Ajustes</Heading1>

      {/* Parental Controls */}
      <Card variant="outlined" style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Heading2>Controles Parentales</Heading2>
            <SmallText color={Colors.text.secondary}>
              Protege el contenido sensible
            </SmallText>
          </View>
          <Switch
            value={parentalControlsEnabled}
            onValueChange={(value) => setParentalControls(value)}
            trackColor={{
              false: Colors.background.tertiary,
              true: Colors.primary.light,
            }}
            thumbColor={
              parentalControlsEnabled ? Colors.primary.main : Colors.text.tertiary
            }
          />
        </View>
      </Card>

      {/* Content Sensitivity Level */}
      <Card variant="outlined" style={styles.card}>
        <Heading2 style={styles.cardTitle}>Nivel de Sensibilidad del Contenido</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.cardSubtitle}>
          Nivel actual: {contentSensitivityLevel}/5
        </BodyText>
        <SmallText color={Colors.text.tertiary} style={styles.hint}>
          Nivel 1: Solo contenido básico
          {'\n'}Nivel 3: Contenido moderado (recomendado)
          {'\n'}Nivel 5: Todo el contenido educativo
        </SmallText>
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

      {/* Language */}
      <Card variant="outlined" style={styles.card}>
        <Heading2>Idioma</Heading2>
        <BodyText color={Colors.text.secondary}>
          Español (ES)
        </BodyText>
        <SmallText color={Colors.text.tertiary} style={styles.hint}>
          Próximamente: EN, ZH, HI, AR
        </SmallText>
      </Card>

      {/* Audio */}
      <Card variant="outlined" style={styles.card}>
        <Heading2>Audio</Heading2>
        <BodyText color={Colors.text.secondary}>
          Música y efectos de sonido
        </BodyText>
        <SmallText color={Colors.text.tertiary} style={styles.hint}>
          Configuración de audio próximamente
        </SmallText>
      </Card>

      {/* About */}
      <Card variant="flat" style={styles.card}>
        <Heading2>Acerca de Hope Quest</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.aboutText}>
          Hope Quest es un juego educativo sobre geografía, migración y
          diversidad cultural. Aprende mientras viajas por 35 países con Marco
          y su familia.
        </BodyText>
        <SmallText color={Colors.text.tertiary}>
          Versión 1.0.0
        </SmallText>
      </Card>

      {/* Danger Zone */}
      <Card variant="outlined" style={[styles.card, styles.dangerCard]}>
        <Heading2 color={Colors.error}>Zona de Peligro</Heading2>
        <BodyText color={Colors.text.secondary} style={styles.dangerText}>
          Estas acciones no se pueden deshacer
        </BodyText>
        <Button
          title="Reiniciar Progreso"
          onPress={() => {
            // TODO: Show confirmation dialog
          }}
          variant="danger"
          fullWidth
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardSubtitle: {
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  hint: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  aboutText: {
    marginVertical: 12,
  },
  dangerCard: {
    borderColor: Colors.error,
    backgroundColor: `${Colors.error}10`,
  },
  dangerText: {
    marginVertical: 12,
  },
});

export default SettingsScreen;

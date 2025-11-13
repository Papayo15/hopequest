import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { API_URL } from '../config';

export default function GenerateQRScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [formData, setFormData] = useState({
    nombre_visitante: '',
    documento_visitante: '',
    telefono_visitante: '',
    motivo_visita: '',
    horas_validez: '24',
  });

  const handleGenerate = async () => {
    if (!formData.nombre_visitante) {
      Alert.alert('Error', 'El nombre del visitante es requerido');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      const response = await fetch(`${API_URL}/api/qr/generar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          id_condominio: user.id_condominio || 1, // Ajustar según tu lógica
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.codigo_qr);
        Alert.alert('Éxito', 'Código QR generado correctamente');
      } else {
        Alert.alert('Error', data.error || 'No se pudo generar el código');
      }
    } catch (error) {
      console.error('Generate QR error:', error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setQrCode(null);
    setFormData({
      nombre_visitante: '',
      documento_visitante: '',
      telefono_visitante: '',
      motivo_visita: '',
      horas_validez: '24',
    });
  };

  if (qrCode) {
    return (
      <View style={styles.qrContainer}>
        <Text style={styles.qrTitle}>Código QR Generado</Text>

        <View style={styles.qrBox}>
          <QRCode
            value={qrCode.codigo}
            size={250}
          />
        </View>

        <View style={styles.qrInfo}>
          <Text style={styles.infoLabel}>Visitante:</Text>
          <Text style={styles.infoValue}>{qrCode.nombre_visitante}</Text>

          <Text style={styles.infoLabel}>Estado:</Text>
          <Text style={[styles.infoValue, styles.statusActive]}>
            {qrCode.estado}
          </Text>

          <Text style={styles.infoLabel}>Válido hasta:</Text>
          <Text style={styles.infoValue}>
            {new Date(qrCode.fecha_expiracion).toLocaleString('es-ES')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={handleNew}
        >
          <Text style={styles.buttonText}>Generar Otro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre del Visitante *</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre_visitante}
          onChangeText={(text) =>
            setFormData({ ...formData, nombre_visitante: text })
          }
          placeholder="Ej: Juan Pérez"
        />

        <Text style={styles.label}>Documento</Text>
        <TextInput
          style={styles.input}
          value={formData.documento_visitante}
          onChangeText={(text) =>
            setFormData({ ...formData, documento_visitante: text })
          }
          placeholder="Ej: 12345678"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={formData.telefono_visitante}
          onChangeText={(text) =>
            setFormData({ ...formData, telefono_visitante: text })
          }
          placeholder="Ej: +573001234567"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Motivo de Visita</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.motivo_visita}
          onChangeText={(text) =>
            setFormData({ ...formData, motivo_visita: text })
          }
          placeholder="Ej: Visita familiar"
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Válido por (horas)</Text>
        <View style={styles.picker}>
          {['1', '2', '4', '8', '24', '48'].map((hours) => (
            <TouchableOpacity
              key={hours}
              style={[
                styles.pickerItem,
                formData.horas_validez === hours && styles.pickerItemSelected,
              ]}
              onPress={() => setFormData({ ...formData, horas_validez: hours })}
            >
              <Text
                style={[
                  styles.pickerText,
                  formData.horas_validez === hours && styles.pickerTextSelected,
                ]}
              >
                {hours}h
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generar Código QR</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  pickerItem: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerItemSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  pickerText: {
    color: '#666',
    fontWeight: '600',
  },
  pickerTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  qrTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 20,
  },
  qrBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  qrInfo: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  statusActive: {
    color: '#10B981',
  },
  newButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
});

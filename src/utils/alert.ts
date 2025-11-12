/**
 * Cross-platform alert utility
 * Works on web, iOS, and Android
 */

import { Alert, Platform } from 'react-native';

export const showAlert = (title: string, message: string, onOk?: () => void) => {
  if (Platform.OS === 'web') {
    // Use native browser alert for web
    window.alert(`${title}\n\n${message}`);
    if (onOk) onOk();
  } else {
    // Use React Native Alert for iOS/Android
    Alert.alert(title, message, onOk ? [{ text: 'OK', onPress: onOk }] : undefined);
  }
};

export const showConfirm = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  if (Platform.OS === 'web') {
    // Use native browser confirm for web
    const result = window.confirm(`${title}\n\n${message}`);
    if (result && onConfirm) {
      onConfirm();
    } else if (!result && onCancel) {
      onCancel();
    }
  } else {
    // Use React Native Alert for iOS/Android
    Alert.alert(title, message, [
      { text: 'Cancelar', onPress: onCancel, style: 'cancel' },
      { text: 'OK', onPress: onConfirm },
    ]);
  }
};

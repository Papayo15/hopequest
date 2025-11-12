/**
 * Modal Component
 * Modal reutilizable con animaciones
 */

import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Colors } from '../../constants';
import { Button } from './Button';

const { width, height } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  showCloseButton?: boolean;
  closeButtonText?: string;
  actions?: ModalAction[];
}

interface ModalAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  loading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeButtonText = 'Cerrar',
  actions,
}) => {
  const modalWidth = size === 'full' ? width : width * (size === 'small' ? 0.8 : size === 'medium' ? 0.9 : 0.95);
  const modalHeight = size === 'full' ? height : undefined;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={[styles.modal, { width: modalWidth, height: modalHeight }]}>
          {/* Header */}
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeIcon}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeIconText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {/* Actions */}
          {(showCloseButton || actions) && (
            <View style={styles.footer}>
              {actions ? (
                <View style={styles.actions}>
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      title={action.label}
                      onPress={action.onPress}
                      variant={action.variant || 'primary'}
                      loading={action.loading}
                      style={styles.actionButton}
                    />
                  ))}
                </View>
              ) : (
                showCloseButton && (
                  <Button
                    title={closeButtonText}
                    onPress={onClose}
                    variant="outline"
                    fullWidth
                  />
                )
              )}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modal: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    maxHeight: height * 0.9,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    flex: 1,
  },

  closeIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Colors.background.secondary,
  },

  closeIconText: {
    fontSize: 20,
    color: Colors.text.secondary,
    fontWeight: '600',
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
  },

  actionButton: {
    flex: 1,
  },
});

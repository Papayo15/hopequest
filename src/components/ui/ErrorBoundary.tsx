/**
 * ErrorBoundary Component
 * Componente para capturar errores de React y mostrar UI de fallback
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Heading2, BodyText } from './Typography';
import { Button } from './Button';
import { Colors } from '../../constants';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error reporting service
    console.error('ErrorBoundary caught error:', error, errorInfo);

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Heading2 color={Colors.error} align="center">
              ¡Ups! Algo salió mal
            </Heading2>
            <BodyText style={styles.message} align="center">
              Ha ocurrido un error inesperado. Por favor, intenta reiniciar.
            </BodyText>
            {__DEV__ && this.state.error && (
              <BodyText style={styles.errorDetails} color={Colors.text.tertiary}>
                {this.state.error.toString()}
              </BodyText>
            )}
            <Button
              title="Reintentar"
              onPress={this.handleReset}
              variant="primary"
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    maxWidth: 400,
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
    marginBottom: 24,
  },
  errorDetails: {
    marginBottom: 24,
    fontSize: 12,
    fontFamily: 'monospace',
    padding: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
});

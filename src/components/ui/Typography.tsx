/**
 * Typography Components
 * Componentes de texto reutilizables
 */

import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

export const Heading1: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.text.primary,
  align = 'left',
  numberOfLines,
}) => (
  <Text
    style={[styles.h1, { color, textAlign: align }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const Heading2: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.text.primary,
  align = 'left',
  numberOfLines,
}) => (
  <Text
    style={[styles.h2, { color, textAlign: align }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const Heading3: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.text.primary,
  align = 'left',
  numberOfLines,
}) => (
  <Text
    style={[styles.h3, { color, textAlign: align }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const BodyText: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.text.secondary,
  align = 'left',
  numberOfLines,
}) => (
  <Text
    style={[styles.body, { color, textAlign: align }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const SmallText: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.text.tertiary,
  align = 'left',
  numberOfLines,
}) => (
  <Text
    style={[styles.small, { color, textAlign: align }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const Caption: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.text.tertiary,
  align = 'left',
  numberOfLines,
}) => (
  <Text
    style={[styles.caption, { color, textAlign: align }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
});

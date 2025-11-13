/**
 * Music Player Component
 * Control de música con visualizador para niños
 * Permite ajustar volumen y ver qué está sonando
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SmallText } from '../ui';
import { Colors } from '../../constants';
import { useAdaptiveMusic } from '../../hooks/useDynamicMusic';

interface MusicPlayerProps {
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  position = 'top-right',
}) => {
  const music = useAdaptiveMusic();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(expandAnim, {
      toValue: isExpanded ? 1 : 0,
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVolumeChange = (change: number) => {
    const newVolume = Math.max(0, Math.min(1, music.volume + change));
    music.changeVolume(newVolume);
  };

  const positionStyle = POSITION_STYLES[position];

  const expandedWidth = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 200],
  });

  const expandedHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 120],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          width: expandedWidth,
          height: expandedHeight,
        },
      ]}
    >
      {/* Botón principal */}
      <TouchableOpacity
        onPress={handleToggleExpand}
        style={styles.mainButton}
        activeOpacity={0.8}
      >
        <SmallText style={styles.musicIcon}>
          {music.isPlaying ? '🎵' : '🔇'}
        </SmallText>
      </TouchableOpacity>

      {/* Controles expandidos */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Nombre del track */}
          {music.currentTrack && (
            <SmallText style={styles.trackName} numberOfLines={1}>
              {music.currentTrack.name}
            </SmallText>
          )}

          {/* Controles de volumen */}
          <View style={styles.volumeControls}>
            <TouchableOpacity
              onPress={() => handleVolumeChange(-0.1)}
              style={styles.volumeButton}
            >
              <SmallText style={styles.volumeIcon}>🔉</SmallText>
            </TouchableOpacity>

            {/* Barra de volumen */}
            <VolumeBar volume={music.volume} />

            <TouchableOpacity
              onPress={() => handleVolumeChange(0.1)}
              style={styles.volumeButton}
            >
              <SmallText style={styles.volumeIcon}>🔊</SmallText>
            </TouchableOpacity>
          </View>

          {/* Visualizador de audio */}
          {music.isPlaying && <AudioVisualizer />}
        </View>
      )}
    </Animated.View>
  );
};

// Barra de volumen
const VolumeBar: React.FC<{ volume: number }> = ({ volume }) => {
  return (
    <View style={styles.volumeBarContainer}>
      <View
        style={[
          styles.volumeBarFill,
          {
            width: `${volume * 100}%`,
          },
        ]}
      />
    </View>
  );
};

// Visualizador de audio animado
const AudioVisualizer: React.FC = () => {
  const bars = [0, 1, 2, 3, 4];

  return (
    <View style={styles.visualizer}>
      {bars.map((i) => (
        <AnimatedBar key={i} delay={i * 100} />
      ))}
    </View>
  );
};

const AnimatedBar: React.FC<{ delay: number }> = ({ delay }) => {
  const [heightAnim] = useState(new Animated.Value(0.2));

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(heightAnim, {
            toValue: 1,
            duration: 300 + Math.random() * 200,
            useNativeDriver: false,
          }),
          Animated.timing(heightAnim, {
            toValue: 0.2,
            duration: 300 + Math.random() * 200,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  const barHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.bar,
        {
          height: barHeight,
        },
      ]}
    />
  );
};

const POSITION_STYLES = {
  'top-right': {
    top: 60,
    right: 16,
  },
  'bottom-right': {
    bottom: 80,
    right: 16,
  },
  'bottom-left': {
    bottom: 80,
    left: 16,
  },
  'top-left': {
    top: 60,
    left: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.primary.main,
    borderRadius: 30,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 9999,
  },
  mainButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicIcon: {
    fontSize: 24,
  },
  expandedContent: {
    marginTop: 10,
    gap: 8,
  },
  trackName: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  volumeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeIcon: {
    fontSize: 16,
  },
  volumeBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  volumeBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  visualizer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 30,
    gap: 4,
  },
  bar: {
    width: 6,
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
});

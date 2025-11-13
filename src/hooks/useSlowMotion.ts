/**
 * Slow Motion Hook
 * Hook para controlar la velocidad del juego (slow motion)
 * Inspirado en Angry Birds - Momentos épicos en cámara lenta
 */

import { useState, useEffect, useRef } from 'react';

interface SlowMotionConfig {
  normalSpeed: number; // 1.0 = velocidad normal
  slowSpeed: number; // 0.3 = 30% velocidad
  duration: number; // Milisegundos que dura el slow motion
}

export const useSlowMotion = (config: SlowMotionConfig = {
  normalSpeed: 1.0,
  slowSpeed: 0.3,
  duration: 2000,
}) => {
  const [gameSpeed, setGameSpeed] = useState(config.normalSpeed);
  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Activar slow motion
  const activateSlowMotion = () => {
    if (isSlowMotion) return; // Ya está activo

    setGameSpeed(config.slowSpeed);
    setIsSlowMotion(true);

    // Volver a velocidad normal después del duration
    timeoutRef.current = setTimeout(() => {
      setGameSpeed(config.normalSpeed);
      setIsSlowMotion(false);
    }, config.duration);
  };

  // Desactivar slow motion manualmente
  const deactivateSlowMotion = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGameSpeed(config.normalSpeed);
    setIsSlowMotion(false);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    gameSpeed,
    isSlowMotion,
    activateSlowMotion,
    deactivateSlowMotion,
  };
};

/**
 * Hook para detectar momentos épicos y activar slow motion automático
 */
export const useAutoSlowMotion = (config?: SlowMotionConfig) => {
  const { gameSpeed, isSlowMotion, activateSlowMotion } = useSlowMotion(config);

  // Verificar si un impacto es "épico" y merece slow motion
  const checkEpicMoment = (velocity: number, damage: number) => {
    const EPIC_VELOCITY_THRESHOLD = 50;
    const EPIC_DAMAGE_THRESHOLD = 100;

    if (velocity > EPIC_VELOCITY_THRESHOLD || damage > EPIC_DAMAGE_THRESHOLD) {
      activateSlowMotion();
      return true;
    }
    return false;
  };

  return {
    gameSpeed,
    isSlowMotion,
    checkEpicMoment,
  };
};

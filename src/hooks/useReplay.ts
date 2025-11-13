/**
 * Replay Hook
 * Hook para grabar y reproducir lanzamientos (estilo Angry Birds)
 * Para niños de 5-12 años - visual y divertido
 */

import { useState, useRef } from 'react';

interface ReplayFrame {
  timestamp: number;
  x: number;
  y: number;
  rotation?: number;
  velocity?: { x: number; y: number };
}

interface ReplayData {
  id: string;
  character: string;
  frames: ReplayFrame[];
  success: boolean;
  stars: number;
  startTime: number;
  endTime: number;
}

export const useReplay = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [lastReplay, setLastReplay] = useState<ReplayData | null>(null);
  const [allReplays, setAllReplays] = useState<ReplayData[]>([]);

  const recordingFrames = useRef<ReplayFrame[]>([]);
  const recordingStart = useRef<number>(0);

  // Empezar a grabar
  const startRecording = (character: string) => {
    setIsRecording(true);
    recordingFrames.current = [];
    recordingStart.current = Date.now();
  };

  // Grabar un frame
  const recordFrame = (x: number, y: number, rotation?: number, velocity?: { x: number; y: number }) => {
    if (!isRecording) return;

    const frame: ReplayFrame = {
      timestamp: Date.now() - recordingStart.current,
      x,
      y,
      rotation,
      velocity,
    };

    recordingFrames.current.push(frame);
  };

  // Terminar grabación
  const stopRecording = (character: string, success: boolean, stars: number = 0) => {
    if (!isRecording) return;

    const replay: ReplayData = {
      id: `replay_${Date.now()}`,
      character,
      frames: [...recordingFrames.current],
      success,
      stars,
      startTime: recordingStart.current,
      endTime: Date.now(),
    };

    setLastReplay(replay);

    // Guardar solo los últimos 5 replays
    setAllReplays((prev) => {
      const updated = [replay, ...prev];
      return updated.slice(0, 5);
    });

    setIsRecording(false);
    recordingFrames.current = [];
  };

  // Reproducir replay
  const playReplay = (replayId?: string): ReplayData | null => {
    const replayToPlay = replayId
      ? allReplays.find((r) => r.id === replayId)
      : lastReplay;

    if (!replayToPlay) return null;

    setIsReplaying(true);

    // Simular el fin del replay
    const duration = replayToPlay.endTime - replayToPlay.startTime;
    setTimeout(() => {
      setIsReplaying(false);
    }, duration);

    return replayToPlay;
  };

  // Obtener replay por ID
  const getReplay = (replayId: string): ReplayData | null => {
    return allReplays.find((r) => r.id === replayId) || null;
  };

  // Limpiar replays
  const clearReplays = () => {
    setAllReplays([]);
    setLastReplay(null);
  };

  return {
    // Estado
    isRecording,
    isReplaying,
    lastReplay,
    allReplays,

    // Acciones
    startRecording,
    recordFrame,
    stopRecording,
    playReplay,
    getReplay,
    clearReplays,
  };
};

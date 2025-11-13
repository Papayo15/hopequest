/**
 * Daily Challenges Store
 * Gestiona el estado de los desafíos diarios
 * Usa Zustand con persistencia en AsyncStorage
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DailyChallengesState,
  DailyChallenge,
  ChallengeType,
  CHALLENGE_TEMPLATES,
  DIFFICULTY_CONFIG,
} from '../types/challenges';

interface ChallengesStoreState extends DailyChallengesState {
  // Acciones
  refreshChallenges: () => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  completeChallenge: (challengeId: string) => void;
  checkAndUpdateStreak: () => void;
  getChallengeById: (challengeId: string) => DailyChallenge | undefined;
  isNewDay: () => boolean;
}

const initialState: DailyChallengesState = {
  todaysChallenges: [],
  lastRefreshDate: '',
  completedToday: 0,
  totalCompleted: 0,
  streak: {
    current: 0,
    best: 0,
    lastPlayedDate: '',
  },
  history: [],
};

// Generar desafíos diarios basados en la fecha
const generateDailyChallenges = (date: Date): DailyChallenge[] => {
  const dateStr = date.toISOString().split('T')[0];
  const seed = dateStr.split('-').reduce((acc, val) => acc + parseInt(val), 0);

  // Usar seed para generar desafíos consistentes para el día
  const random = (min: number, max: number, offset: number = 0) => {
    const value = ((seed + offset) * 9301 + 49297) % 233280;
    return min + (value / 233280) * (max - min);
  };

  const challenges: DailyChallenge[] = [];
  const challengeTypes: ChallengeType[] = [
    'collect_stars',
    'complete_levels',
    'defeat_enemies',
    'collect_memories',
    'use_powerup',
  ];

  // Generar 3 desafíos diarios
  for (let i = 0; i < 3; i++) {
    const typeIndex = Math.floor(random(0, challengeTypes.length, i));
    const type = challengeTypes[typeIndex];
    const template = CHALLENGE_TEMPLATES[type];

    // Determinar dificultad
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const difficultyIndex = Math.floor(random(0, difficulties.length, i + 10));
    const difficulty = difficulties[difficultyIndex];
    const config = DIFFICULTY_CONFIG[difficulty];

    // Determinar objetivo según el tipo
    let baseTarget = 5;
    if (type === 'collect_stars') baseTarget = 10;
    if (type === 'complete_levels') baseTarget = 3;
    if (type === 'defeat_enemies') baseTarget = 5;
    if (type === 'collect_memories') baseTarget = 3;
    if (type === 'earn_coins') baseTarget = 100;
    if (type === 'use_powerup') baseTarget = 2;
    if (type === 'play_time') baseTarget = 15;

    const target = Math.floor(baseTarget * config.targetMultiplier);

    // Calcular recompensas
    const coins = Math.floor(template.baseRewards.coins * config.coinsMultiplier);

    const expiresAt = new Date(date);
    expiresAt.setHours(23, 59, 59, 999);

    challenges.push({
      id: `challenge_${dateStr}_${type}_${i}`,
      type,
      title: template.title,
      description: template.description(target),
      emoji: template.emoji,
      target,
      progress: 0,
      rewards: {
        coins,
      },
      difficulty,
      expiresAt,
      isCompleted: false,
      isExpired: false,
    });
  }

  return challenges;
};

export const useChallengesStore = create<ChallengesStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      refreshChallenges: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();

        // Solo refrescar si es un nuevo día
        if (state.lastRefreshDate !== today) {
          const newChallenges = generateDailyChallenges(new Date());

          set({
            todaysChallenges: newChallenges,
            lastRefreshDate: today,
            completedToday: 0,
          });
        }
      },

      updateChallengeProgress: (challengeId: string, progress: number) => {
        const state = get();
        const updatedChallenges = state.todaysChallenges.map((challenge) => {
          if (challenge.id === challengeId) {
            const newProgress = Math.min(progress, challenge.target);
            const wasCompleted = challenge.isCompleted;
            const isNowCompleted = newProgress >= challenge.target;

            // Si acaba de completarse
            if (!wasCompleted && isNowCompleted) {
              return {
                ...challenge,
                progress: newProgress,
                isCompleted: true,
                completedAt: new Date(),
              };
            }

            return {
              ...challenge,
              progress: newProgress,
            };
          }
          return challenge;
        });

        // Contar completados
        const completedCount = updatedChallenges.filter(
          (c) => c.isCompleted
        ).length;

        set({
          todaysChallenges: updatedChallenges,
          completedToday: completedCount,
        });
      },

      completeChallenge: (challengeId: string) => {
        const state = get();
        const challenge = state.todaysChallenges.find(
          (c) => c.id === challengeId
        );

        if (!challenge || challenge.isCompleted) return;

        const updatedChallenges = state.todaysChallenges.map((c) => {
          if (c.id === challengeId) {
            return {
              ...c,
              progress: c.target,
              isCompleted: true,
              completedAt: new Date(),
            };
          }
          return c;
        });

        const completedCount = updatedChallenges.filter(
          (c) => c.isCompleted
        ).length;

        // Actualizar historial
        const today = new Date().toISOString().split('T')[0];
        const history = [...state.history];
        const todayEntry = history.find((h) => h.date === today);

        if (todayEntry) {
          todayEntry.challenges.push(challengeId);
        } else {
          history.push({
            date: today,
            challenges: [challengeId],
          });
        }

        set({
          todaysChallenges: updatedChallenges,
          completedToday: completedCount,
          totalCompleted: state.totalCompleted + 1,
          history,
        });
      },

      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        const lastPlayed = state.streak.lastPlayedDate;

        if (lastPlayed === today) {
          return; // Ya jugó hoy
        }

        // Verificar si jugó ayer
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = state.streak.current;

        if (lastPlayed === yesterdayStr) {
          // Continúa la racha
          newStreak = state.streak.current + 1;
        } else if (lastPlayed === '') {
          // Primera vez jugando
          newStreak = 1;
        } else {
          // Rompió la racha
          newStreak = 1;
        }

        const newBest = Math.max(newStreak, state.streak.best);

        set({
          streak: {
            current: newStreak,
            best: newBest,
            lastPlayedDate: today,
          },
        });
      },

      getChallengeById: (challengeId: string) => {
        return get().todaysChallenges.find((c) => c.id === challengeId);
      },

      isNewDay: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().lastRefreshDate !== today;
      },
    }),
    {
      name: 'hope-quest-challenges',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

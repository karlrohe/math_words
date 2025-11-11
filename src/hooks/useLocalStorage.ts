import { useEffect, useCallback } from 'react';
import { GameState } from '../types';

const STORAGE_KEY = 'mathWords_gameState';

export interface StoredGameState {
  totalScore: number;
  currentWordIndex: number;
}

export function usePersistGameState(state: GameState) {
  // Save to localStorage whenever score or word index changes
  useEffect(() => {
    const toStore: StoredGameState = {
      totalScore: state.totalScore,
      currentWordIndex: state.currentWordIndex,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [state.totalScore, state.currentWordIndex]);
}

export function useLoadGameState(): StoredGameState | null {
  const load = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as StoredGameState;
      }
    } catch (error) {
      console.error('Failed to load game state from localStorage:', error);
    }
    return null;
  }, []);

  return load();
}

/**
 * Clear all saved game data
 */
export function clearGameState() {
  localStorage.removeItem(STORAGE_KEY);
}

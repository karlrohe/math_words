import { GameMode } from '../types';

/**
 * Check if selected indices are consecutive (in order)
 */
function areContinuous(indices: number[]): boolean {
  if (indices.length === 0) return false;
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] !== indices[i - 1] + 1) {
      return false;
    }
  }
  return true;
}

/**
 * Check if indices maintain order (but can skip)
 */
function areInOrder(indices: number[]): boolean {
  if (indices.length === 0) return false;
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] <= indices[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Check if indices are consecutive AND reversed
 */
function areReversed(indices: number[]): boolean {
  if (indices.length === 0) return false;
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] !== indices[i - 1] - 1) {
      return false;
    }
  }
  return true;
}

/**
 * Validate word based on game mode
 */
export function validateIndices(
  selectedIndices: number[],
  mode: GameMode
): { valid: boolean; reason?: string } {
  if (selectedIndices.length < 2) {
    return { valid: false, reason: 'Word too short (need 2+ letters)' };
  }

  switch (mode) {
    case 'continuous':
      if (!areContinuous(selectedIndices)) {
        return { valid: false, reason: 'Letters must be next to each other' };
      }
      break;

    case 'skip':
      if (!areInOrder(selectedIndices)) {
        return { valid: false, reason: 'Letters must stay in order' };
      }
      break;

    case 'backwards':
      if (!areReversed(selectedIndices)) {
        return { valid: false, reason: 'Letters must be reversed' };
      }
      break;

    case 'anyOrder':
      // Any order is always valid structurally
      break;
  }

  return { valid: true };
}

/**
 * Extract word from base word using indices
 */
export function extractWord(baseWord: string, indices: number[]): string {
  return indices.map(i => baseWord[i]).join('').toUpperCase();
}

/**
 * Check if word exists in dictionary
 */
export async function isRealWord(
  word: string,
  dictionary: Set<string>
): Promise<boolean> {
  return dictionary.has(word.toLowerCase());
}

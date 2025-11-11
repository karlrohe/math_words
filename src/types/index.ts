export type GameMode = 'continuous' | 'skip' | 'backwards' | 'anyOrder';

export interface FoundWord {
  word: string;
  points: number;
  timestamp: number;
}

export interface MathProblem {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
}

export interface GameState {
  // Current game
  currentBaseWord: string;
  selectedLetterIndices: number[];
  mode: GameMode;
  foundWords: FoundWord[];

  // Math challenge
  mathProblem: MathProblem | null;
  pendingWord: string | null;

  // Persistent
  totalScore: number;
  currentWordIndex: number;

  // Feedback
  message: string;
  messageType: 'error' | 'success' | 'info' | '';
}

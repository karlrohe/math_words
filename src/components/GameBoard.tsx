import { BaseWord } from './BaseWord';
import { CurrentWord } from './CurrentWord';
import { Controls } from './Controls';
import { FoundWords } from './FoundWords';
import { ScoreDisplay } from './ScoreDisplay';
import { ModeSelector } from './ModeSelector';
import { Message } from './Message';
import { GameMode } from '../types';

interface GameBoardProps {
  baseWord: string;
  selectedIndices: number[];
  foundWords: any[];
  totalScore: number;
  mode: GameMode;
  message: string;
  messageType: 'error' | 'success' | 'info' | '';
  onLetterClick: (index: number) => void;
  onBackspace: () => void;
  onClear: () => void;
  onCheck: () => void;
  onModeChange: (mode: GameMode) => void;
  onNextWord?: () => void;
}

export function GameBoard({
  baseWord,
  selectedIndices,
  foundWords,
  totalScore,
  mode,
  message,
  messageType,
  onLetterClick,
  onBackspace,
  onClear,
  onCheck,
  onModeChange,
  onNextWord,
}: GameBoardProps) {
  const maxHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <div
      className="w-full mx-auto p-4 overflow-y-auto"
      style={{
        maxHeight: `${maxHeight}px`,
        backgroundColor: 'var(--color-dark)',
      }}
    >
      {/* Header with Score */}
      <div className="flex justify-between items-center mb-8">
        <div style={{ width: '100px' }}></div>
        <ScoreDisplay score={totalScore} />
        <div style={{ width: '100px' }}></div>
      </div>

      {/* Mode Selector */}
      <ModeSelector currentMode={mode} onModeChange={onModeChange} />

      {/* Message */}
      <Message message={message} type={messageType} />

      {/* Base Word */}
      <BaseWord
        word={baseWord}
        selectedIndices={selectedIndices}
        mode={mode}
        onLetterClick={onLetterClick}
      />

      {/* Current Word Being Built */}
      <CurrentWord baseWord={baseWord} selectedIndices={selectedIndices} />

      {/* Controls */}
      <div className="mb-8">
        <Controls
          hasSelection={selectedIndices.length > 0}
          onBackspace={onBackspace}
          onClear={onClear}
          onCheck={onCheck}
        />
      </div>

      {/* Found Words */}
      <FoundWords words={foundWords} />

      {/* Next Word Button */}
      {onNextWord && (
        <div className="mt-8 text-center">
          <button
            onClick={onNextWord}
            className="voxel-btn text-lg px-6 py-3 font-bold"
            style={{
              backgroundColor: 'var(--color-blue)',
              color: 'white',
            }}
          >
            → Next Word
          </button>
        </div>
      )}

      {/* Footer spacer for scrolling on mobile */}
      <div style={{ height: '2rem' }}></div>
    </div>
  );
}

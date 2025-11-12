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
  onLetterDeselect?: (index: number) => void;
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
  onLetterDeselect,
  onBackspace,
  onClear,
  onCheck,
  onModeChange,
  onNextWord,
}: GameBoardProps) {
  const maxHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <div
      className="w-full mx-auto p-3 overflow-y-auto"
      style={{
        maxHeight: `${maxHeight}px`,
        backgroundColor: 'var(--color-dark)',
      }}
    >
      {/* Header with Score in top-right */}
      <div className="mb-3 text-right">
        <ScoreDisplay score={totalScore} />
      </div>

      {/* Mode Selector */}
      <ModeSelector currentMode={mode} onModeChange={onModeChange} />

      {/* Message */}
      <Message message={message} type={messageType} />

      {/* Consolidated Play Area */}
      <div className="mb-4 bg-opacity-10 p-3 rounded" style={{ backgroundColor: 'rgba(74, 144, 226, 0.05)' }}>
        {/* Base Word */}
        <BaseWord
          word={baseWord}
          selectedIndices={selectedIndices}
          mode={mode}
          onLetterClick={onLetterClick}
          onLetterDeselect={onLetterDeselect}
        />

        {/* Current Word Being Built */}
        <CurrentWord baseWord={baseWord} selectedIndices={selectedIndices} />

        {/* Controls */}
        <div className="mt-3">
          <Controls
            hasSelection={selectedIndices.length > 0}
            onCheck={onCheck}
          />
        </div>
      </div>

      {/* Found Words */}
      <FoundWords words={foundWords} />

      {/* Next Word Button */}
      {onNextWord && (
        <div className="mt-4 text-center">
          <button
            onClick={onNextWord}
            className="voxel-btn text-sm px-4 py-2 font-bold"
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
      <div style={{ height: '1rem' }}></div>
    </div>
  );
}

import { Letter } from './Letter';
import { GameMode } from '../types';

interface BaseWordProps {
  word: string;
  selectedIndices: number[];
  mode: GameMode;
  onLetterClick: (index: number) => void;
}

export function BaseWord({ word, selectedIndices, mode, onLetterClick }: BaseWordProps) {
  // For continuous mode, disable letters that aren't consecutive
  const getDisabledState = (index: number): boolean => {
    if (mode !== 'continuous' || selectedIndices.length === 0) return false;

    const lastIndex = selectedIndices[selectedIndices.length - 1];
    // Can select adjacent letters or new letter at boundaries
    return index !== lastIndex + 1 && index !== lastIndex - 1 && !selectedIndices.includes(index);
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-gold)' }}>
          BASE WORD
        </h2>
        <p className="text-4xl font-bold tracking-widest mb-4" style={{ color: 'var(--color-blue)' }}>
          {word}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center bg-opacity-20 p-6 rounded"
           style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
        {word.split('').map((letter, index) => (
          <Letter
            key={index}
            letter={letter}
            index={index}
            isSelected={selectedIndices.includes(index)}
            isDisabled={getDisabledState(index)}
            selectionOrder={
              selectedIndices.includes(index)
                ? selectedIndices.indexOf(index) + 1
                : undefined
            }
            onClick={() => {
              if (!getDisabledState(index) && !selectedIndices.includes(index)) {
                onLetterClick(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

import { Letter } from './Letter';
import { GameMode } from '../types';

interface BaseWordProps {
  word: string;
  selectedIndices: number[];
  mode: GameMode;
  onLetterClick: (index: number) => void;
  onLetterDeselect?: (index: number) => void;
}

export function BaseWord({ word, selectedIndices, mode, onLetterClick, onLetterDeselect }: BaseWordProps) {
  // For continuous mode, disable letters that aren't consecutive
  const getDisabledState = (index: number): boolean => {
    if (mode !== 'continuous' || selectedIndices.length === 0) return false;

    const lastIndex = selectedIndices[selectedIndices.length - 1];
    // Can select adjacent letters or new letter at boundaries
    return index !== lastIndex + 1 && index !== lastIndex - 1 && !selectedIndices.includes(index);
  };

  return (
    <div className="mb-4">
      <p className="text-3xl font-bold tracking-widest mb-4 text-center" style={{ color: 'var(--color-blue)' }}>
        {word}
      </p>

      <div className="flex flex-wrap gap-3 justify-center p-3"
           style={{ backgroundColor: 'transparent' }}>
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
            onDeselect={() => {
              if (onLetterDeselect) {
                onLetterDeselect(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

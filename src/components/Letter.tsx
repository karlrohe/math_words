interface LetterProps {
  letter: string;
  index: number;
  isSelected: boolean;
  isDisabled: boolean;
  selectionOrder?: number;
  onClick: () => void;
}

export function Letter({
  letter,
  index,
  isSelected,
  isDisabled,
  selectionOrder,
  onClick,
}: LetterProps) {
  return (
    <button
      className={`voxel-letter ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
      data-index={selectionOrder ?? ''}
      title={`Letter ${letter} at position ${index}`}
    >
      {letter}
    </button>
  );
}

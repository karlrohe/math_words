interface LetterProps {
  letter: string;
  index: number;
  isSelected: boolean;
  isDisabled: boolean;
  selectionOrder?: number;
  onClick: () => void;
  onDeselect?: () => void;
}

export function Letter({
  letter,
  index,
  isSelected,
  isDisabled,
  selectionOrder,
  onClick,
  onDeselect,
}: LetterProps) {
  const handleClick = () => {
    if (isSelected && onDeselect) {
      onDeselect();
    } else if (!isSelected) {
      onClick();
    }
  };

  return (
    <button
      className={`voxel-letter ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
      data-index={selectionOrder ?? ''}
      title={`Letter ${letter} at position ${index}`}
    >
      {letter}
    </button>
  );
}

interface ControlsProps {
  hasSelection: boolean;
  onBackspace: () => void;
  onClear: () => void;
  onCheck: () => void;
}

export function Controls({ hasSelection, onBackspace, onClear, onCheck }: ControlsProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={onBackspace}
        disabled={!hasSelection}
        className="voxel-btn disabled:opacity-40 disabled:cursor-not-allowed"
        title="Remove last letter"
      >
        ← Backspace
      </button>

      <button
        onClick={onClear}
        disabled={!hasSelection}
        className="voxel-btn disabled:opacity-40 disabled:cursor-not-allowed"
        title="Clear all letters"
      >
        Clear
      </button>

      <button
        onClick={onCheck}
        disabled={!hasSelection}
        className="voxel-btn disabled:opacity-40 disabled:cursor-not-allowed font-bold"
        style={{
          backgroundColor: hasSelection ? 'var(--color-gold)' : 'var(--color-orange)',
          color: hasSelection ? 'var(--color-dark)' : 'white',
        }}
        title="Check if word is valid"
      >
        ✓ Check
      </button>
    </div>
  );
}

export function Controls({ hasSelection, onCheck }: { hasSelection: boolean; onCheck: () => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onCheck}
        disabled={!hasSelection}
        className="voxel-btn text-sm px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
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

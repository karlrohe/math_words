interface CurrentWordProps {
  baseWord: string;
  selectedIndices: number[];
}

export function CurrentWord({ baseWord, selectedIndices }: CurrentWordProps) {
  const buildingWord = selectedIndices
    .map(index => baseWord[index])
    .join('');

  return (
    <div className="text-center mb-6">
      <p className="text-sm mb-2" style={{ color: 'var(--color-orange)' }}>
        Building...
      </p>
      <div className="text-3xl font-bold tracking-widest p-4 rounded-sm"
           style={{
             backgroundColor: 'rgba(255, 140, 66, 0.15)',
             color: buildingWord ? 'var(--color-gold)' : 'rgba(255, 215, 0, 0.4)',
             minHeight: '3rem',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
           }}>
        {buildingWord || '_ _ _'}
      </div>
      {selectedIndices.length > 0 && (
        <p className="text-xs mt-2" style={{ color: 'var(--color-blue)' }}>
          {selectedIndices.length} letter{selectedIndices.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}

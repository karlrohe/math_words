interface CurrentWordProps {
  baseWord: string;
  selectedIndices: number[];
}

export function CurrentWord({ baseWord, selectedIndices }: CurrentWordProps) {
  const buildingWord = selectedIndices
    .map(index => baseWord[index])
    .join('');

  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-bold tracking-widest p-3 rounded-sm"
           style={{
             backgroundColor: 'rgba(255, 140, 66, 0.1)',
             color: buildingWord ? 'var(--color-gold)' : 'rgba(255, 215, 0, 0.3)',
             minHeight: '2.5rem',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
           }}>
        {buildingWord || '_ _ _'}
      </div>
    </div>
  );
}

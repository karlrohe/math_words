import { useEffect, useState } from 'react';

interface CurrentWordProps {
  baseWord: string;
  selectedIndices: number[];
}

export function CurrentWord({ baseWord, selectedIndices }: CurrentWordProps) {
  const [prevLength, setPrevLength] = useState(0);
  const [newTileIndex, setNewTileIndex] = useState(-1);

  const selectedLetters = selectedIndices.map((index, order) => ({
    letter: baseWord[index],
    order: order + 1,
  }));

  useEffect(() => {
    if (selectedIndices.length !== prevLength) {
      setNewTileIndex(selectedIndices.length - 1);
      const timer = setTimeout(() => setNewTileIndex(-1), 400);
      setPrevLength(selectedIndices.length);
      return () => clearTimeout(timer);
    }
  }, [selectedIndices.length, prevLength]);

  return (
    <div className="text-center mb-4">
      <div className="p-3 rounded-sm"
           style={{
             backgroundColor: 'rgba(255, 140, 66, 0.1)',
             minHeight: '3.5rem',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '0.5rem',
             flexWrap: 'wrap',
           }}>
        {selectedLetters.length === 0 ? (
          <div style={{ color: 'rgba(255, 215, 0, 0.3)', fontSize: '1.875rem' }}>_ _ _</div>
        ) : (
          selectedLetters.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex items-center justify-center font-bold text-white rounded-sm transition-all ${
                newTileIndex === idx ? 'tile-pop' : ''
              }`}
              style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, var(--color-orange), var(--color-orange-dark))',
                boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
                fontSize: '1.5rem',
              }}
            >
              {item.letter}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

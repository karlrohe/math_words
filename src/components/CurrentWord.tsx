import { useEffect, useState } from 'react';

interface CurrentWordProps {
  baseWord: string;
  selectedIndices: number[];
}

export function CurrentWord({ baseWord, selectedIndices }: CurrentWordProps) {
  const [animate, setAnimate] = useState(false);
  const [prevLength, setPrevLength] = useState(0);

  const buildingWord = selectedIndices
    .map(index => baseWord[index])
    .join('');

  useEffect(() => {
    if (selectedIndices.length !== prevLength) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      setPrevLength(selectedIndices.length);
      return () => clearTimeout(timer);
    }
  }, [selectedIndices.length, prevLength]);

  return (
    <div className="text-center mb-4">
      <div className={`text-2xl font-bold tracking-widest p-3 rounded-sm transition-smooth ${animate ? 'word-updated' : ''}`}
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

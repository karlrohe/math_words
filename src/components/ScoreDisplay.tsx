import { useEffect, useState } from 'react';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (score !== displayScore) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setDisplayScore(score);
        setAnimate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [score, displayScore]);

  return (
    <div className={`text-center transition-all ${animate ? 'score-update' : ''}`}>
      <div
        className="text-2xl font-bold px-3 py-1 rounded-sm inline-block"
        style={{
          backgroundColor: 'rgba(255, 215, 0, 0.15)',
          color: 'var(--color-gold)',
          border: '2px solid var(--color-gold)',
        }}
      >
        {displayScore}
      </div>
    </div>
  );
}

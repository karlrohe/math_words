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
    <div className="text-center mb-6">
      <p className="text-sm mb-2" style={{ color: 'var(--color-orange)' }}>
        Total Score
      </p>
      <div
        className={`text-5xl font-bold p-4 rounded-sm inline-block transition-all ${
          animate ? 'score-update' : ''
        }`}
        style={{
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          color: 'var(--color-gold)',
          border: '3px solid var(--color-gold)',
        }}
      >
        {displayScore}
      </div>
    </div>
  );
}

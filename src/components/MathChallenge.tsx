import { useState, useEffect } from 'react';
import { MathProblem } from '../types';
import { GoldCoinAnimation } from './GoldCoinAnimation';

interface MathChallengeProps {
  problem: MathProblem | null;
  word: string;
  points: number;
  onComplete: (isCorrect: boolean) => void;
}

export function MathChallenge({
  problem,
  word,
  points,
  onComplete,
}: MathChallengeProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
    if (problem) {
      setUserAnswer('');
      setFeedback('');
      setIsCorrect(false);
      setShowAnimation(false);
      setGuessCount(0);
    }
  }, [problem]);

  if (!problem) return null;

  const handleSubmit = () => {
    const answer = parseInt(userAnswer, 10);
    setGuessCount(count => count + 1);

    if (answer === problem.answer) {
      setIsCorrect(true);
      setFeedback('🎉 Correct! Great job!');
      setShowAnimation(true);
      // Wait for animation, then complete
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else {
      setFeedback('Try again!');
      setUserAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="modal-backdrop">
        <div
          className="p-8 rounded-lg text-center max-w-sm"
          style={{
            backgroundColor: 'var(--color-dark)',
            border: `4px solid var(--color-gold)`,
          }}
        >
          {/* Word being solved */}
          <div className="mb-6">
            <p className="text-sm" style={{ color: 'var(--color-orange)' }}>
              You found:
            </p>
            <p
              className="text-4xl font-bold tracking-widest"
              style={{ color: 'var(--color-gold)' }}
            >
              {word}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-blue)' }}>
              {points} points!
            </p>
          </div>

          {/* Math problem */}
          <div className="mb-6 p-4 rounded-sm"
               style={{ backgroundColor: 'rgba(255, 140, 66, 0.15)' }}>
            <p className="text-sm mb-3" style={{ color: 'var(--color-orange)' }}>
              Now solve this:
            </p>
            <p className="text-5xl font-bold mb-4" style={{ color: 'var(--color-blue)' }}>
              {problem.num1} {problem.operation} {problem.num2} = ?
            </p>

            {/* Input and button */}
            <div className="flex gap-2 justify-center mb-4">
              <input
                type="number"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter answer"
                autoFocus
                className="px-3 py-2 rounded-sm text-center text-lg font-bold"
                style={{
                  backgroundColor: 'white',
                  color: 'var(--color-dark)',
                  border: 'none',
                  width: '120px',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer}
                className="voxel-btn"
                style={{
                  opacity: userAnswer ? 1 : 0.5,
                }}
              >
                Submit
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <p className="text-lg font-bold" style={{
                color: isCorrect ? 'var(--color-gold)' : '#FF6464',
              }}>
                {feedback}
              </p>
            )}

            {/* Guess count */}
            {!isCorrect && guessCount > 0 && (
              <p className="text-xs mt-2" style={{ color: 'var(--color-orange)' }}>
                Attempt {guessCount}
              </p>
            )}
          </div>

          {/* Help text */}
          {!isCorrect && (
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              You can try as many times as you need!
            </p>
          )}
        </div>
      </div>

      {/* Gold coin animation */}
      {showAnimation && <GoldCoinAnimation points={points} />}
    </>
  );
}

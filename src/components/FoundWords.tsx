import { useState } from 'react';
import { FoundWord } from '../types';

interface FoundWordsProps {
  words: FoundWord[];
}

export function FoundWords({ words }: FoundWordsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const displayLimit = 8;
  const hasMore = words.length > displayLimit;
  const displayedWords = isExpanded ? words : words.slice(0, displayLimit);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center mb-2 py-1 rounded-sm transition-all"
        style={{
          backgroundColor: words.length > 0 ? 'rgba(255, 140, 66, 0.1)' : 'transparent',
          color: 'var(--color-orange)',
        }}
      >
        <span className="text-sm font-bold">Found Words ({words.length}) {hasMore && !isExpanded ? '▼' : isExpanded && hasMore ? '▲' : ''}</span>
      </button>

      {words.length === 0 ? (
        <p className="text-center text-xs opacity-50">
          Find a word to get started!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
            {displayedWords.map((found, idx) => (
              <div
                key={idx}
                className="p-1 rounded-sm text-center text-xs font-bold transition-all"
                style={{
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  color: 'var(--color-gold)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                }}
              >
                <div>{found.word}</div>
                <div className="text-xs opacity-60">+{found.points}</div>
              </div>
            ))}
          </div>
          {hasMore && isExpanded && (
            <p className="text-center text-xs opacity-50 mt-2">
              Showing all {words.length} words
            </p>
          )}
        </>
      )}
    </div>
  );
}

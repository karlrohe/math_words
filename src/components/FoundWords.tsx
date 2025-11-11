import { FoundWord } from '../types';

interface FoundWordsProps {
  words: FoundWord[];
}

export function FoundWords({ words }: FoundWordsProps) {
  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold" style={{ color: 'var(--color-orange)' }}>
          Found Words ({words.length})
        </h3>
      </div>

      {words.length === 0 ? (
        <p className="text-center text-sm opacity-60">
          Find a word to get started!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {words.map((found, idx) => (
            <div
              key={idx}
              className="p-2 rounded-sm text-center text-sm font-bold transition-all"
              style={{
                backgroundColor: 'rgba(255, 215, 0, 0.15)',
                color: 'var(--color-gold)',
                border: '2px solid var(--color-gold)',
              }}
            >
              <div>{found.word}</div>
              <div className="text-xs opacity-75">+{found.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

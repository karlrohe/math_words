import { GameMode } from '../types';

interface ModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const MODES: { value: GameMode; label: string; description: string }[] = [
  {
    value: 'continuous',
    label: '→ Continuous',
    description: 'Letters must be next to each other',
  },
  {
    value: 'skip',
    label: '↗ Skip Letters',
    description: 'Can skip but must stay in order',
  },
  {
    value: 'backwards',
    label: '← Backwards',
    description: 'Letters in reverse order',
  },
  {
    value: 'anyOrder',
    label: '⚡ Any Order',
    description: 'Use letters in any order',
  },
];

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="mb-6">
      <p className="text-sm mb-3 text-center" style={{ color: 'var(--color-orange)' }}>
        Challenge Mode:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {MODES.map(mode => (
          <button
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            className="px-3 py-2 rounded-sm text-sm font-bold transition-all"
            style={{
              backgroundColor:
                currentMode === mode.value
                  ? 'var(--color-orange)'
                  : 'rgba(74, 144, 226, 0.3)',
              color:
                currentMode === mode.value ? 'var(--color-dark)' : 'white',
              border: `2px solid ${
                currentMode === mode.value
                  ? 'var(--color-orange)'
                  : 'var(--color-blue)'
              }`,
            }}
            title={mode.description}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}

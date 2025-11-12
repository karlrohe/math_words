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
    <div className="mb-3">
      <div className="flex flex-wrap gap-1 justify-center">
        {MODES.map(mode => (
          <button
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            className="px-2 py-1 rounded-sm text-xs font-bold transition-all"
            style={{
              backgroundColor:
                currentMode === mode.value
                  ? 'var(--color-orange)'
                  : 'rgba(74, 144, 226, 0.2)',
              color:
                currentMode === mode.value ? 'var(--color-dark)' : 'white',
              border: `1px solid ${
                currentMode === mode.value
                  ? 'var(--color-orange)'
                  : 'rgba(74, 144, 226, 0.5)'
              }`,
            }}
            title={mode.description}
          >
            {mode.label.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

import { useGameState } from './hooks/useGameState';
import { GameBoard } from './components/GameBoard';
import { MathChallenge } from './components/MathChallenge';
import { validateIndices, extractWord } from './utils/wordValidator';
import { isDictionaryWord } from './utils/dictionary';

export default function App() {
  const {
    state,
    selectLetter,
    deselectLetter,
    deselectLastLetter,
    clearSelection,
    setMode,
    addFoundWord,
    completeMathChallenge,
    setMessage,
    nextWord,
  } = useGameState();

  const handleCheck = () => {
    // Extract the word
    const word = extractWord(state.currentBaseWord, state.selectedLetterIndices);

    // Check indices follow mode rules
    const validation = validateIndices(state.selectedLetterIndices, state.mode);
    if (!validation.valid) {
      setMessage(validation.reason || 'Invalid selection!', 'error');
      return;
    }

    // Check for duplicates
    const isDuplicate = state.foundWords.some(
      w => w.word.toUpperCase() === word.toUpperCase()
    );
    if (isDuplicate) {
      setMessage(`Already found "${word}"!`, 'error');
      return;
    }

    // Check if it's a real word
    if (!isDictionaryWord(word)) {
      setMessage(`"${word}" is not a word!`, 'error');
      return;
    }

    // Valid word! Add it
    addFoundWord(word);
  };

  const handleMathComplete = (isCorrect: boolean) => {
    if (isCorrect && state.pendingWord && state.mathProblem) {
      const points = state.pendingWord.length;
      completeMathChallenge(state.pendingWord, points);
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <GameBoard
        baseWord={state.currentBaseWord}
        selectedIndices={state.selectedLetterIndices}
        foundWords={state.foundWords}
        totalScore={state.totalScore}
        mode={state.mode}
        message={state.message}
        messageType={state.messageType}
        onLetterClick={selectLetter}
        onLetterDeselect={deselectLetter}
        onCheck={handleCheck}
        onModeChange={setMode}
        onNextWord={nextWord}
      />

      <MathChallenge
        problem={state.mathProblem}
        word={state.pendingWord || ''}
        points={state.pendingWord?.length || 0}
        onComplete={handleMathComplete}
      />
    </div>
  );
}

# Math Words Game - Implementation Plan

## Game Overview
A word-finding game where Leo discovers smaller words hidden inside bigger words, solves math problems, and collects gold coins! Features a voxel-based cubic aesthetic with blue, orange, rainbow, and gold colors.

## Core Game Mechanics

### 1. Word Discovery
- **Base Word Display**: One large word shown at a time (e.g., "BUTTERFLY", "CHOCOLATE")
- **Letter Selection**: Tap individual letters to build potential words
- **Validation**: Check if selected letters form a real English word
- **Success**: Valid word triggers a math challenge

### 2. Four Difficulty Modes

#### Continuous Mode (Easiest)
- Letters must be consecutive in the base word
- Example: "HORSE" in "HORSESHOE" ✓
- Example: "HOSE" in "HORSESHOE" ✗ (skips R)

#### Skip Letters Mode
- Letters maintain order but can skip between them
- Example: "HOSE" in "HORSESHOE" ✓
- Example: "SORE" in "HORSESHOE" ✗ (wrong order)

#### Backwards Mode
- Letters must be consecutive but in reverse order
- Example: "TAB" in "COMBAT" ✓ (BA→AB reversed)
- Example: "BAT" in "COMBAT" ✗ (already forward)

#### Any Order Mode (Hardest)
- Letters can be used in any order (anagram style)
- Example: "BEAT" in "TABLE" ✓
- Example: "BEAD" in "TABLE" ✗ (no D)

### 3. Math Challenge System
- **Trigger**: Appears when valid word is found
- **Problem Types**: Simple addition and subtraction
  - Numbers: 0-9
  - Answers: 0-20
  - Examples: "3 + 5", "8 - 2", "7 + 9"
- **Unlimited Guesses**: Leo can try as many times as needed
- **Feedback**: "Try again!" or "Correct!"
- **Reward**: Gold coin animation + points added to score

### 4. Scoring System
- **Points = Word Length**: 3-letter word = 3 points, 5-letter word = 5 points
- **Persistent Score**: Total score saved across sessions
- **No Duplicates**: Can't submit the same word twice for same base word

### 5. Navigation & Progress
- **Next Word Button**: Move to a new base word anytime
- **Mode Selector**: Switch difficulty at any time
- **Progress Persistence**: Remember found words and score via localStorage

---

## UI/UX Design Details

### Main Game Screen Layout

```
┌─────────────────────────────────────┐
│  [Mode: Continuous ▼]    Score: 47 │
├─────────────────────────────────────┤
│                                     │
│        BASE WORD: BUTTERFLY         │
│        [B][U][T][T][E][R][F][L][Y]  │
│                                     │
│        Building: "BUTT"             │
│        [Clear] [Backspace] [Check]  │
│                                     │
│        Found Words (6):             │
│        ✓ BUT (3 pts)                │
│        ✓ BUTT (4 pts)               │
│        ✓ FLY (3 pts)                │
│        ✓ BUTTERFLY (9 pts)          │
│        ✓ BUTTER (6 pts)             │
│        ✓ FRY (3 pts)                │
│                                     │
│        [Next Word →]                │
└─────────────────────────────────────┘
```

### Letter Selection Visual States

1. **Default State**: Unselected letter (blue/orange voxel cube)
2. **Selected State**: Highlighted with different color, shows selection order
3. **Used State** (Continuous mode only): Dimmed/disabled letters that can't be selected
4. **Hover State**: Slight elevation/glow on tap/hover

### Letter Selection Interaction Flow

1. Leo taps first letter → it highlights, shows "1" badge
2. Leo taps second letter → it highlights, shows "2" badge
3. "Building" display updates: "AB"
4. Leo taps [Backspace] → second letter unhighlights, "A" remains
5. Leo taps [Clear] → all selections cleared
6. Leo taps [Check] → validation runs

### Math Challenge Modal

```
┌─────────────────────────────────┐
│                                 │
│    🎉 You found: BUTTERFLY!     │
│                                 │
│    Now solve this:              │
│                                 │
│         7 + 5 = ?               │
│                                 │
│    [  Input box  ]  [Submit]    │
│                                 │
│    (Feedback message here)      │
│                                 │
└─────────────────────────────────┘
```

When correct:
- Gold coins rain/bounce across screen
- Points counter animates upward
- Word added to "Found Words" list
- Modal closes automatically

---

## Technical Architecture

### Project Structure

```
math_words/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── public/
│   └── dictionary.json          # English word list
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── GameBoard.tsx        # Main game container
│   │   ├── BaseWord.tsx         # Displays base word with clickable letters
│   │   ├── Letter.tsx           # Individual letter button
│   │   ├── CurrentWord.tsx      # Shows building word
│   │   ├── FoundWords.tsx       # List of discovered words
│   │   ├── ScoreDisplay.tsx     # Total score
│   │   ├── MathChallenge.tsx    # Modal for math problems
│   │   ├── ModeSelector.tsx     # Difficulty selector
│   │   ├── GoldCoinAnimation.tsx # Animated coins
│   │   └── Controls.tsx         # Clear/Backspace/Check buttons
│   ├── hooks/
│   │   ├── useGameState.ts      # Game state management
│   │   ├── useWordValidation.ts # Word checking logic
│   │   └── useLocalStorage.ts   # Persistence
│   ├── utils/
│   │   ├── wordValidator.ts     # Validation for 4 modes
│   │   ├── mathGenerator.ts     # Generate random math problems
│   │   └── dictionary.ts        # Load and search dictionary
│   ├── data/
│   │   └── baseWords.ts         # Curated list of 100-200 long words
│   └── types/
│       └── index.ts             # TypeScript interfaces
```

### State Management

```typescript
interface GameState {
  // Current game
  currentBaseWord: string;
  selectedLetterIndices: number[];
  mode: 'continuous' | 'skip' | 'backwards' | 'anyOrder';
  foundWords: FoundWord[];

  // Math challenge
  mathProblem: MathProblem | null;
  pendingWord: string | null;

  // Persistent
  totalScore: number;
  currentWordIndex: number;

  // Data
  dictionary: Set<string>;
  baseWords: string[];
}

interface FoundWord {
  word: string;
  points: number;
  timestamp: number;
}

interface MathProblem {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
}
```

### Word Validation Logic

```typescript
function validateWord(
  baseWord: string,
  selectedIndices: number[],
  mode: Mode,
  dictionary: Set<string>
): boolean {
  const word = selectedIndices.map(i => baseWord[i]).join('');

  // Check if it's a real word
  if (!dictionary.has(word.toLowerCase())) return false;

  // Check if indices follow mode rules
  switch(mode) {
    case 'continuous':
      return areContinuous(selectedIndices);
    case 'skip':
      return areInOrder(selectedIndices);
    case 'backwards':
      return areContinuous(selectedIndices) && areReversed(selectedIndices);
    case 'anyOrder':
      return true; // Any order allowed
  }
}
```

### localStorage Schema

```typescript
{
  "mathWords_totalScore": 147,
  "mathWords_currentWordIndex": 5,
  "mathWords_progress": {
    "BUTTERFLY": ["BUT", "FLY", "BUTTER"],
    "CHOCOLATE": ["COAL", "LATE"],
    // ...
  }
}
```

---

## Visual Design - Voxel Aesthetic

### Design Principles
- **Voxel/Cube Foundation**: Everything built from cubic units on a grid
- **Isometric Projection**: 2D but with 3D appearance using CSS transforms
- **Pixelated Textures**: Low-res, 8-bit style textures
- **Geometric Reduction**: No curves, pure rectangular forms
- **Modular System**: Every element visibly constructed from blocks

### Color Palette
- **Primary Blue**: `#4A90E2` - Base word letters, backgrounds
- **Orange Accent**: `#FF8C42` - Selected letters, highlights
- **Rainbow Mode**: Cycle through `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#FFA07A`, `#98D8C8`
- **Gold**: `#FFD700` - Coins, score, success states
- **Shadows**: `#1A1A2E` - Depth and elevation

### CSS Styling Approach

```css
/* Voxel letter button */
.letter {
  background: linear-gradient(145deg, #5AA8F5, #3A7AC8);
  box-shadow:
    4px 4px 0 rgba(0,0,0,0.3),
    inset -2px -2px 0 rgba(0,0,0,0.2),
    inset 2px 2px 0 rgba(255,255,255,0.3);
  transform: perspective(200px) rotateX(5deg);
  image-rendering: pixelated;
}

/* Selected state */
.letter.selected {
  background: linear-gradient(145deg, #FF9F5A, #FF7A2F);
  transform: perspective(200px) rotateX(5deg) translateY(-4px);
  box-shadow:
    6px 6px 0 rgba(0,0,0,0.3),
    inset -2px -2px 0 rgba(0,0,0,0.2);
}
```

### Animation Details

**Gold Coin Animation:**
- 5-10 coins spawn from center
- Each follows arc trajectory (parabola)
- Coins rotate while moving
- Land in score counter
- Score counter bounces and increments

**Letter Selection:**
- Smooth 100ms transition on state change
- Slight bounce when selected
- Selection number badge fades in

---

## Implementation Steps

### Phase 1: Project Setup ✓
1. Create `math_words/` directory
2. Initialize Vite project: `npm create vite@latest . -- --template react-ts`
3. Install dependencies:
   ```bash
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
4. Configure Tailwind for voxel aesthetic (custom colors, shadows)
5. Configure `vite.config.ts` for GitHub Pages (`base: '/math_words/'`)
6. Write this PLAN.md file ✓

### Phase 2: Core UI Components
7. Create basic layout in `App.tsx`
8. Build `Letter.tsx` with voxel styling and three states
9. Build `BaseWord.tsx` to render array of Letter components
10. Build `CurrentWord.tsx` to show building word
11. Build `Controls.tsx` (Clear, Backspace, Check buttons)
12. Build `ScoreDisplay.tsx` with voxel styling
13. Build `ModeSelector.tsx` dropdown

### Phase 3: Letter Selection Logic
14. Create `useGameState.ts` hook with state management
15. Implement letter click handler (add to selectedIndices)
16. Implement backspace (remove last index)
17. Implement clear (reset selectedIndices)
18. Add visual feedback (show selection numbers)
19. Handle disabled states in continuous mode

### Phase 4: Dictionary & Validation
20. Find and download English word dictionary JSON (~10,000 common words)
21. Create `dictionary.ts` utility to load into Set for O(1) lookup
22. Implement `wordValidator.ts` with four mode algorithms
23. Create `useWordValidation.ts` hook
24. Wire up validation to "Check" button
25. Add feedback for invalid words ("Not a word!" message)

### Phase 5: Math Challenge System
26. Create `mathGenerator.ts` to create random problems
27. Build `MathChallenge.tsx` modal component
28. Implement input handling and answer checking
29. Add unlimited guess logic with feedback
30. Create `GoldCoinAnimation.tsx` component
31. Trigger animation on correct answer
32. Update score state

### Phase 6: Found Words & Scoring
33. Build `FoundWords.tsx` list component
34. Implement duplicate detection
35. Calculate points (word length = points)
36. Animate score counter on points added
37. Save found words to state

### Phase 7: Persistence
38. Create `useLocalStorage.ts` hook
39. Save/load total score
40. Save/load current word index
41. Save/load found words per base word
42. Test persistence across page reloads

### Phase 8: Word List & Navigation
43. Curate list of 100-200 long, interesting base words
44. Store in `baseWords.ts`
45. Implement "Next Word" button
46. Handle loading new word (clear selections, keep found words)
47. Cycle through word list

### Phase 9: Polish & Testing
48. Refine voxel visual styling
49. Add smooth transitions and animations
50. Test on desktop Safari
51. Test on iPod Safari (touch interactions, scrolling)
52. Optimize for old iPod (remove 300ms tap delay)
53. Add loading state while dictionary loads
54. Handle edge cases (1-letter words, etc.)

### Phase 10: Deployment
55. Build for production: `npm run build`
56. Configure for GitHub Pages
57. Test deployed version
58. Create README with game instructions

---

## Dictionary Source

**Recommended**: Use a curated English word list like:
- SCOWL (Spell Checker Oriented Word Lists)
- Corncob list (~58K words)
- Or manually curate ~10,000 common words

Filter to include only:
- 2-letter words minimum
- Common English words (no super obscure ones)
- No proper nouns
- Lowercase only

---

## Base Word Curation Strategy

### Selection Criteria
1. **Length**: 8-15 letters ideal
2. **Letter Variety**: Mix of vowels and consonants
3. **Known to Leo**: Words he can read and understand
4. **Hidden Word Potential**: Rich with subwords

### Example Base Words (100-200 total)

**Easy (8-10 letters):**
- BUTTERFLY, BASEBALL, BASKETBALL, FOOTBALL, SNOWMAN, RAINBOW
- SUNSHINE, BIRTHDAY, CHOCOLATE, BREAKFAST, PLAYGROUND, ELEPHANT

**Medium (10-12 letters):**
- UNDERGROUND, WATERMELON, STRAWBERRY, MOTORCYCLE, TRAMPOLINE
- ROLLERCOASTER, THUNDERSTORM, FIREFIGHTER, CHEESEBURGER

**Hard (12-15 letters):**
- EXTRAORDINARILY, UNFORGETTABLE, CONCENTRATION, CONGRATULATIONS
- INDEPENDENTLY, CHARACTERISTIC, SOPHISTICATED, REVOLUTIONARY

**Super Hard (15+ letters):**
- INCOMPREHENSIBLE, MULTIDIMENSIONAL, PHOTOSYNTHESIS
- ANTHROPOMORPHIC, ELECTROMAGNETIC

---

## Testing Checklist

### Functionality
- [ ] Letter selection works in all 4 modes
- [ ] Dictionary loads correctly
- [ ] Word validation accurate for each mode
- [ ] Math problems generate correctly (0-20 range)
- [ ] Unlimited guesses work
- [ ] Points calculated correctly (word length)
- [ ] No duplicate words allowed
- [ ] localStorage persists across sessions
- [ ] Next Word button loads new words
- [ ] Mode switching works mid-game

### UI/UX
- [ ] Letters respond to taps/clicks immediately
- [ ] Selection order visible (numbers or sequence)
- [ ] Backspace removes last letter
- [ ] Clear removes all letters
- [ ] Found words display correctly
- [ ] Score animates on update
- [ ] Gold coin animation plays on correct answer
- [ ] Math modal appears/disappears smoothly
- [ ] Mode selector dropdown works

### Visual Design
- [ ] Voxel aesthetic applied consistently
- [ ] Blue/orange/gold colors throughout
- [ ] Pixelated textures visible
- [ ] CSS shadows create depth
- [ ] Responsive layout works on iPod screen
- [ ] No 300ms tap delay on old iOS

### Performance
- [ ] Dictionary loads quickly (<2 seconds)
- [ ] No lag on letter selection
- [ ] Smooth animations (60fps)
- [ ] Small bundle size (<500KB)

---

## Future Enhancement Ideas

### Phase 2 Features (Post-MVP)
- Sound effects (coin clink, letter tap, success chime)
- High score leaderboard (saved locally)
- Hints system ("There are 3 more 4-letter words")
- Daily challenge (same word for everyone each day)
- Achievement badges (Find 10 words in one base word, etc.)
- Word definitions (show definition when found)
- Multiplayer mode (pass-and-play on same device)
- Timer mode (optional challenge)
- Custom word lists (Leo can add his own base words)

### Advanced Modes
- **Palindrome Mode**: Find words that read same backwards
- **Rhyme Mode**: Find words that rhyme with base word
- **Category Mode**: Find only words in a category (animals, colors, etc.)

---

## Resources & Links

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **English Word Lists**: https://github.com/dwyl/english-words
- **CSS Transform Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS/transform

---

## Success Criteria

The game is successful when:
1. ✅ Leo can discover words inside bigger words
2. ✅ Leo practices spelling and reading
3. ✅ Leo solves simple math problems
4. ✅ The UI is intuitive for a 5-year-old
5. ✅ The game runs smoothly on iPod Safari
6. ✅ Leo has fun and wants to play more!

---

**Let's build this! 🚀**

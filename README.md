# Math Words - Leo's Word Finding Game

A fun, interactive word puzzle game for kids who love reading and spelling! 🎮📚

## How to Play

1. **Pick a Challenge Mode**: Choose how to find words:
   - **Continuous**: Letters must be next to each other
   - **Skip Letters**: Keep the order but skip between letters
   - **Backwards**: Find words spelled backwards
   - **Any Order**: Use letters in any combination

2. **Find Words**: Click letters in the big word to spell smaller words inside it
3. **Solve Math**: When you find a valid word, solve a quick math problem to earn points!
4. **Keep Track**: Your score is saved automatically - come back anytime!

## Features

- ✨ **4 Difficulty Modes** for different word-finding challenges
- 🏆 **Points System** based on word length
- 📊 **Auto-Saving Progress** via browser memory (localStorage)
- 🎨 **Voxel Aesthetic** - Cool blocky pixel art style with blue, orange, and gold colors
- 📝 **100+ Base Words** carefully curated for Leo
- 🔢 **Math Challenges** with fun coin animations
- 📱 **Mobile Friendly** - Works great on iPod Safari!

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Deploy to GitHub Pages

The game is configured to deploy to `/math_words/` path. To deploy:

```bash
npm run build
# Then push the dist/ folder to gh-pages branch
```

## Technical Details

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + custom CSS for voxel effects
- **Build Tool**: Vite 7
- **State Management**: React Hooks
- **Persistence**: Browser localStorage

## File Structure

```
src/
├── components/          # UI components
│   ├── GameBoard.tsx   # Main game layout
│   ├── Letter.tsx      # Letter button
│   ├── BaseWord.tsx    # Base word display
│   ├── CurrentWord.tsx # Building word display
│   ├── Controls.tsx    # Backspace, Clear, Check buttons
│   ├── FoundWords.tsx  # List of found words
│   ├── ScoreDisplay.tsx # Score counter
│   ├── ModeSelector.tsx # Difficulty selector
│   ├── MathChallenge.tsx # Math problem modal
│   ├── GoldCoinAnimation.tsx # Coin animation
│   └── Message.tsx     # Feedback messages
├── hooks/
│   ├── useGameState.ts # Main game state management
│   └── useLocalStorage.ts # Persistence
├── utils/
│   ├── wordValidator.ts # Word validation logic
│   ├── dictionary.ts    # Dictionary word list
│   └── mathGenerator.ts # Math problem generation
├── types/
│   └── index.ts        # TypeScript interfaces
├── App.tsx             # Main app component
└── index.css           # Global styles & animations
```

## Word Validation

The game validates words in 4 modes:

1. **Continuous**: `validateIndices()` checks if selected indices are consecutive
2. **Skip**: Checks if indices maintain order (but allow gaps)
3. **Backwards**: Checks if indices are consecutive but reversed
4. **Any Order**: Any selection is valid structurally

All words are validated against a curated English dictionary with 1000+ common words.

## Game State

Game progress is saved to localStorage including:
- Total score
- Current word index
- Found words (per session)

## Customization

### Adding More Words

Edit `src/hooks/useGameState.ts` and add words to the `BASE_WORDS` array.

### Adjusting Difficulty

Math problems are generated with:
- Numbers 0-9
- Operations: + and -
- Answer range: 0-20

Edit `src/utils/mathGenerator.ts` to change difficulty.

### Changing Colors

Color scheme is defined in `src/index.css` using CSS variables:
- `--color-blue`: Primary color
- `--color-orange`: Accent color
- `--color-gold`: Coins and success
- `--color-dark`: Background

## Known Limitations

- Dictionary is English only
- Words must be 2+ letters
- Math problems are simple addition/subtraction (intentional for age appropriateness!)
- Found words don't persist between different base words (by design - encourages exploring all words!)

## Future Enhancements

- Sound effects
- Difficulty levels
- Hint system
- Achievements/badges
- Leaderboard
- Theme customization
- Multi-player mode

## Credits

Made with ❤️ for Leo! Built with React, Vite, and Tailwind CSS.

---

**Have fun finding words and solving math problems! 🎉**

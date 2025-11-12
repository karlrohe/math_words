# Math Words - How to Play

## 🎮 What is This Game?

**Math Words** is a word puzzle game where you find hidden words inside bigger words, then solve math problems to earn points! It's perfect for practicing spelling and mental math.

**For Leo:** You get to be a word detective! Find smaller words hiding inside big words, solve quick math puzzles, and watch gold coins burst when you're right!

---

## 🚀 Quick Start (3 Steps)

### 1️⃣ **Tap Letters to Build Words**
Look at the big word. Tap letters to spell smaller words you find inside it.
- Example: In **BUTTERFLY**, you can find BUT, FLY, BUTTER, etc.

### 2️⃣ **Press the Check Button**
When you think you have a real word, tap the **✓ Check** button.

### 3️⃣ **Solve the Math Problem**
A math question appears! Solve it (addition or subtraction, numbers under 10).
- Example: "3 + 5 = ?"
- You can guess as many times as you need!

**When you get it right:** 🎉 Gold coins burst out, and your score goes up!

---

## 🎯 Understanding the Game Screen

### Top Section
- **Score Counter** (top center): Shows your total points
- **Mode Selector** (below score): Choose your challenge level

### Middle Section
- **BASE WORD** (big letters): The main word you're searching in
- **Letter Buttons**: Tap these to select letters
- **Building Word** (below letters): Shows the word you're currently building

### Bottom Section
- **Control Buttons**:
  - **← Backspace**: Remove the last letter you selected
  - **Clear**: Remove all letters and start over
  - **✓ Check**: See if your word is valid
- **Found Words**: List of all the words you've discovered so far

---

## 🎮 Game Modes (Choose Your Challenge!)

### Mode 1: Continuous (⭐ Easiest)
Letters must be **next to each other** in the base word.
- Example in "BUTTERFLY":
  - ✅ BUT (letters B-U-T are consecutive)
  - ✅ FLY (letters F-L-Y are consecutive)
  - ❌ BUY (B and U are not next to Y)

### Mode 2: Skip Letters (⭐⭐ Medium)
Letters must **stay in order** but you can skip between them.
- Example in "BUTTERFLY":
  - ✅ BRY (B→skip U,T,T,E,R,F→R→skip L→Y)
  - ❌ RUB (R comes after U and B, wrong order)

### Mode 3: Backwards (⭐⭐ Medium)
Find words spelled **in reverse order** (consecutive only).
- Example in "COMBAT":
  - ✅ TAB (reading backwards: T-A-B)
  - ❌ BAT (wrong - that's forward)

### Mode 4: Any Order (⭐⭐⭐ Hardest)
Use letters from anywhere in any combination (like an anagram).
- Example in "BUTTERFLY":
  - ✅ BELT, BUTTER, FRY, LETTER, etc.
  - Only rule: the word has to be real English!

---

## 💰 Scoring System

### How Points Work
- **Points = Word Length**
- 3-letter word = 3 points
- 5-letter word = 5 points
- 10-letter word = 10 points!

### To Earn Points
1. Find a word in the base word
2. Tap Check
3. Word must be in the dictionary (10,000+ English words)
4. Solve the math problem correctly
5. Gold coins appear = points added!

### Score is Saved!
Your score automatically saves to your device. Come back anytime and it will remember your progress!

---

## ✅ Dictionary Rules

The game has **10,000 English words** in its dictionary. A word is valid if:
- ✅ It's a real English word
- ✅ It's at least 2 letters long
- ✅ You haven't already found it in this base word
- ❌ Single letters don't count
- ❌ Made-up words won't work

### What Happens When You Check
- **Word is valid:** Math problem appears!
- **Word not in dictionary:** "X is not a word!" message
- **Word already found:** "Already found 'X'!" message
- **Too short:** "Word too short! Need at least 2 letters." message

---

## 🧮 Math Problems

### The Challenge
When you find a valid word, you get a math problem!
- **Numbers:** 0 through 9
- **Operations:** Addition (+) or Subtraction (-)
- **Answers:** Always between 0 and 20
- **Examples:** 3+5, 8-2, 7+9, 2+11

### How to Answer
1. Type your answer in the input box
2. Tap **Submit** or press Enter
3. Get feedback: "Correct!" or "Try again!"
4. **You can guess unlimited times!**

### When You're Right
- Gold coins burst onto screen! 🪙✨
- Score updates with points (word length)
- Math modal closes
- Ready for next word!

---

## 🎮 Navigation & Controls

### Next Word Button
- **Location:** Bottom of the screen
- **What it does:** Moves to the next base word
- **What happens:** Clears your current selection, but keeps your score!
- **Found words reset:** Each base word has its own list of found words

### Mode Selector
- **Location:** Top, below the score
- **Options:** Continuous, Skip Letters, Backwards, Any Order
- **When to change:** Anytime! No penalty, your score is safe

### Clear Button
- **Removes all selected letters**
- **Useful when:** You change your mind or make a mistake

### Backspace Button
- **Removes only the last letter you selected**
- **Useful when:** You selected one wrong letter

---

## 📱 Playing on Different Devices

### On Computer/Laptop
- Click letter buttons with mouse
- Type math answers with keyboard
- Type or click Submit button

### On Tablet/iPad/iPod
- Tap letter buttons with finger
- Tap input field and use on-screen keyboard
- Tap Submit button
- Score saves automatically!

### Browser Support
- Works best in Safari (especially on iPad/iPod)
- Also works in Chrome, Firefox, Edge
- Game runs entirely in your browser - no app download needed!

---

## 🏆 Tips for Success

### Finding More Words
- Start with common 2-3 letter words (THE, AND, BUT, FRY)
- Then try longer words
- Switch modes to find different words in the same base word

### Math Tips
- These are easy problems! They're designed for kids
- You have unlimited tries - no pressure
- Use your fingers or write on paper if that helps

### Exploring the Game
- Try all 4 modes - each finds different words!
- Challenge yourself to find as many words as possible in each base word
- Come back tomorrow - your score will be waiting!

---

## 🛠️ Technical Details (For Developers/Future Agents)

### Project Info
- **Name:** Math Words
- **Purpose:** Educational word game for children
- **Target Age:** 5+ (for Leo!)
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS + custom CSS (voxel aesthetic)
- **Build Tool:** Vite
- **Deployment:** GitHub Pages
- **Base Path:** `/math_words/`

### Key Files
- `PLAN.md` - Detailed technical implementation plan
- `README.md` - Project overview and setup instructions
- `src/components/` - 13+ React components
- `src/hooks/useGameState.ts` - Main game state management
- `src/utils/dictionary.ts` - 10,000 word English dictionary
- `src/utils/wordValidator.ts` - Word validation logic (4 modes)

### Game Modes Implementation
- **Continuous:** `areContinuous()` - checks if indices are consecutive
- **Skip:** `areInOrder()` - checks if indices maintain order
- **Backwards:** `areReversed()` - checks if indices are reversed consecutive
- **Any Order:** No structural check, just dictionary validation

### State Management
- Uses React hooks (useState, useCallback)
- localStorage for persistence (score, word index)
- Modal system for math challenges
- Animation system for coin effects

### Dictionary
- 10,000 most common English words (Google's list)
- Source: https://github.com/first20hours/google-10000-english
- Loaded as Set for O(1) lookup performance
- Case-insensitive validation

### Colors (Voxel Aesthetic)
- Primary Blue: `#5BA3FF`
- Orange Accent: `#FFB347`
- Gold (Coins): `#FFE44D`
- Background: `#2D2D5F`
- All in CSS variables for easy customization

### Next Steps for Agents
1. Deploy to GitHub Pages (see DEPLOYMENT.md or use deploy prompt)
2. Test on multiple devices (especially mobile/iPad)
3. Monitor performance metrics
4. Consider future enhancements (sound, achievements, custom words)

---

## ❓ FAQ

**Q: Can I play offline?**
A: Once loaded, yes! The game downloads all 10,000 words upfront.

**Q: Does my score save?**
A: Yes! Score is saved in your browser's storage automatically.

**Q: What if I found a word but the game says it's not in the dictionary?**
A: The game has 10,000 common English words. Very obscure words might not be included.

**Q: Can I play on my iPod?**
A: Yes! Open the game URL in Safari on your iPod and it works perfectly.

**Q: How many base words are there?**
A: 120+ carefully selected words, ranging from easy to very challenging!

**Q: Can I change the difficulty during a game?**
A: Yes! Switch modes anytime with the Mode Selector button. Your score stays safe!

---

## 🎉 Have Fun!

This game is all about exploring words and having fun with language! There's no way to "lose" - just keep finding words, solving math problems, and watching those gold coins burst!

**For Leo:** You're a word detective on an adventure! Keep discovering hidden words and you'll become a super reader and speller! 🦸‍♂️

---

**Made with ❤️ for Leo!**

Questions or feedback? The game is saved in `/Users/karlrohe/data_peeks/math_words/`

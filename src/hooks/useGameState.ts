import { useState, useCallback } from 'react';
import { GameState, GameMode, FoundWord } from '../types';
import { generateMathProblem } from '../utils/mathGenerator';
import { useLoadGameState, usePersistGameState } from './useLocalStorage';

const BASE_WORDS = [
  // Animals
  'BUTTERFLY', 'ELEPHANT', 'DINOSAUR', 'RHINOCEROS', 'CATERPILLAR', 'GRASSHOPPER', 'DRAGONFLY', 'SALAMANDER', 'TARANTULA', 'PEACOCK', 'PORCUPINE', 'PELICAN', 'ANTELOPE', 'CENTIPEDE',

  // Food & Drink
  'CHOCOLATE', 'STRAWBERRY', 'WATERMELON', 'CHEESEBURGER', 'SPAGHETTI', 'BROCCOLI', 'PINEAPPLE', 'BLUEBERRY', 'POPCORN', 'SANDWICH', 'HAMBURGER', 'MACARONI', 'LICORICE', 'CRANBERRY',

  // Sports & Games
  'BASKETBALL', 'FOOTBALL', 'SKATEBOARD', 'ROLLERBLADES', 'BADMINTON', 'BOWLING', 'CRICKET', 'VOLLEYBALL', 'BASEBALL',

  // Nature
  'RAINBOW', 'SNOWFLAKE', 'THUNDERSTORM', 'SUNSHINE', 'WATERFALL', 'SEASHELL', 'LIGHTNING', 'HURRICANE', 'VOLCANO', 'GLACIER', 'TORNADO', 'MOUNTAIN',

  // Places & Buildings
  'PLAYGROUND', 'UNDERWATER', 'LIGHTHOUSE', 'SKYSCRAPER', 'TREEHOUSE', 'CASTLE', 'CATHEDRAL', 'GRAVEYARD',

  // Transportation
  'MOTORCYCLE', 'BICYCLE', 'AUTOMOBILE', 'HELICOPTER', 'SPACESHIP', 'SUBMARINE', 'AMBULANCE', 'SKATEBOARD', 'SNOWMOBILE',

  // Fantasy & Adventure
  'ASTRONAUT', 'ASTRONOMER', 'TREASURE', 'MONSTER', 'WEREWOLF', 'VAMPIRE', 'UNICORN', 'DRAGON', 'WIZARD', 'MAGICIAN', 'PIRATE', 'NINJA', 'SUPERHERO', 'VILLAIN',

  // Objects
  'TELESCOPE', 'MICROSCOPE', 'THERMOMETER', 'BAROMETER', 'KALEIDOSCOPE', 'PERISCOPE',

  // Concepts & Actions
  'FIREPLACE', 'BASKETBALL', 'SKATEBOARD', 'ROLLERBLADES', 'TRAMPOLINE', 'WATERSLIDE', 'ROLLERCOASTER', 'CARNIVAL', 'FIREWORKS', 'LAMPLIGHT', 'MOONLIGHT', 'CANDLELIGHT',

  // Longer words (9-15 letters)
  'GRANDFATHER', 'GRANDMOTHER', 'INFORMATION', 'COMFORTABLE', 'REFRIGERATOR', 'INDEPENDENCE', 'DETERMINATION', 'ILLUSTRATION', 'PERSONALITY', 'TEMPERATURE', 'ELECTRICITY', 'MATHEMATICS', 'PRESCRIPTION', 'ENCYCLOPEDIA', 'CONCENTRATE', 'MICROSCOPIC', 'THUNDERBOLT', 'EXTRAORDINARY', 'CHARACTERISTIC', 'RESPONSIBILITY',

  // More variety
  'TELEPHONE', 'PHOTOGRAPH', 'TELEVISION', 'COMPUTER', 'CALCULATOR', 'DICTIONARY', 'ENCYCLOPEDIA', 'HOSPITAL', 'LIBRARIAN', 'FIREFIGHTER', 'POLICEMAN', 'CARPENTER', 'GARDENER', 'MAILMAN', 'MILKMAN',

  // Nature-themed
  'BUTTERFLY', 'CATERPILLAR', 'HONEYBEE', 'LADYBUG', 'DRAGONFLY', 'FIREFLY', 'GRASSHOPPER', 'LOCUST', 'SCORPION', 'CENTIPEDE', 'MILLIPEDE',

  // More activities
  'BASKETBALL', 'SKATEBOARDING', 'SNOWBOARDING', 'ROLLERBLADING', 'ICE-SKATING', 'HORSEBACK-RIDING', 'PARASAILING', 'SKYDIVING', 'SWIMMING', 'WRESTLING', 'GYMNASTICS',

  // Additional fun words
  'HALLOWEEN', 'CHRISTMAS', 'THANKSGIVING', 'VALENTINE', 'BIRTHDAY', 'SPARKLE', 'TREASURE', 'ADVENTURE', 'WONDERLAND', 'FAIRYTALE', 'STORYBOOK', 'MASTERPIECE', 'NIGHTMARE', 'DAYDREAM', 'SANDCASTLE', 'SNOWMAN', 'SCARECROW', 'PATCHWORK', 'CLOTHESLINE', 'SLEEPWALKER', 'GOALKEEPER', 'SCHOOLHOUSE', 'FARMHOUSE', 'TREEHOUSE', 'PLAYHOUSE', 'BOARDWALK', 'CARDBOARD', 'BOOKMARK', 'FISHERMAN', 'SHOPKEEPER', 'CLOCKMAKER', 'MAPMAKER', 'PEACEMAKER', 'MATCHMAKER', 'FILMMAKERS', 'HORSESHOE', 'WATERMELON', 'SUNFLOWER', 'WILDFLOWER', 'WALLFLOWER', 'BELLHOP', 'JACKPOT', 'SNAPSHOT', 'SCRAPBOOK', 'HAIRBRUSH', 'TOOTHBRUSH', 'PAINTBRUSH', 'FLASHLIGHT', 'SPOTLIGHT', 'STREETLIGHT', 'FOOTPRINT', 'FINGERPRINT', 'BLUEPRINT', 'MOTORCYCLE', 'BICYCLE', 'TRICYCLE', 'ICICLE', 'POPSICLE', 'OBSTACLE', 'SPECTACLE', 'TENTACLE', 'BARNACLE', 'PINWHEEL', 'CARTWHEEL', 'TREADMILL', 'WINDMILL', 'WATERMILL', 'CORNBREAD', 'GINGERBREAD', 'SHORTBREAD', 'SOMEBODY', 'EVERYBODY', 'NOBODY', 'SOMEBODY', 'FIRECRACKER', 'BACKPACK', 'BACKYARD', 'BLACKBIRD', 'BACKWARD', 'FLATBED', 'FLATFOOT', 'FLATWORM', 'FLATFISH', 'SHIPWRECK', 'SHIPYARD', 'SHIPMENT', 'CHILDHOOD', 'FALSEHOOD', 'LIKELIHOOD', 'LIKELIHOOD', 'LIKELIHOOD', 'NEIGHBORHOOD', 'BROTHERHOOD', 'SISTERHOOD', 'PARENTHOOD', 'PRIESTHOOD', 'LIKELIHOOD', 'GIRLHOOD',
];

export function useGameState() {
  const savedState = useLoadGameState();

  const [state, setState] = useState<GameState>(() => {
    const wordIndex = savedState?.currentWordIndex ?? 0;
    return {
      currentBaseWord: BASE_WORDS[wordIndex],
      selectedLetterIndices: [],
      mode: 'continuous',
      foundWords: [],
      mathProblem: null,
      pendingWord: null,
      totalScore: savedState?.totalScore ?? 0,
      currentWordIndex: wordIndex,
      message: '',
      messageType: '',
    };
  });

  // Persist state to localStorage
  usePersistGameState(state);

  const selectLetter = useCallback((index: number) => {
    setState(prev => {
      const newIndices = [...prev.selectedLetterIndices, index];
      return {
        ...prev,
        selectedLetterIndices: newIndices,
        message: '',
        messageType: '',
      };
    });
  }, []);

  const deselectLastLetter = useCallback(() => {
    setState(prev => {
      const newIndices = prev.selectedLetterIndices.slice(0, -1);
      return {
        ...prev,
        selectedLetterIndices: newIndices,
      };
    });
  }, []);

  const deselectLetter = useCallback((index: number) => {
    setState(prev => {
      const newIndices = prev.selectedLetterIndices.filter(i => i !== index);
      return {
        ...prev,
        selectedLetterIndices: newIndices,
      };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedLetterIndices: [],
      message: '',
      messageType: '',
    }));
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    setState(prev => ({
      ...prev,
      mode,
      selectedLetterIndices: [],
      message: '',
      messageType: '',
    }));
  }, []);

  const addFoundWord = useCallback((word: string) => {
    setState(prev => {
      const mathProblem = generateMathProblem();
      return {
        ...prev,
        selectedLetterIndices: [],
        message: '',
        messageType: '',
        pendingWord: word.toUpperCase(),
        mathProblem,
      };
    });
  }, []);

  const completeMathChallenge = useCallback((word: string, points: number) => {
    setState(prev => {
      const newFoundWord: FoundWord = {
        word: word.toUpperCase(),
        points,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        foundWords: [...prev.foundWords, newFoundWord],
        totalScore: prev.totalScore + points,
        mathProblem: null,
        pendingWord: null,
        message: `Great! "${word}" = ${points} points!`,
        messageType: 'success',
      };
    });
  }, []);

  const setMessage = useCallback((message: string, type: 'error' | 'success' | 'info' = 'info') => {
    setState(prev => ({
      ...prev,
      message,
      messageType: type,
    }));
  }, []);

  const nextWord = useCallback(() => {
    setState(prev => {
      const nextIndex = (prev.currentWordIndex + 1) % BASE_WORDS.length;
      return {
        ...prev,
        currentBaseWord: BASE_WORDS[nextIndex],
        currentWordIndex: nextIndex,
        selectedLetterIndices: [],
        foundWords: [],
        message: '',
        messageType: '',
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      currentBaseWord: BASE_WORDS[0],
      selectedLetterIndices: [],
      mode: 'continuous',
      foundWords: [],
      mathProblem: null,
      pendingWord: null,
      totalScore: 0,
      currentWordIndex: 0,
      message: '',
      messageType: '',
    });
  }, []);

  return {
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
    reset,
  };
}

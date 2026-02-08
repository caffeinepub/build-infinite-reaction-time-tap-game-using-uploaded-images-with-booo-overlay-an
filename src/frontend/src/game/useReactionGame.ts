import { useState, useCallback, useRef, useEffect } from 'react';
import { GAME_CONSTANTS } from './constants';

type GameState = 
  | 'idle'           // Initial state, show start button
  | 'waiting'        // Image A visible, waiting for random delay
  | 'ready'          // Image B visible, timing reaction
  | 'success'        // Successful tap, showing overlay (transient)
  | 'result'         // Result screen with reaction time
  | 'tooEarly';      // Premature tap penalty

interface GameData {
  state: GameState;
  lastReactionTime: number | null;
  showBoooOverlay: boolean;
  showTooEarlyMessage: boolean;
}

export function useReactionGame() {
  const [gameData, setGameData] = useState<GameData>({
    state: 'idle',
    lastReactionTime: null,
    showBoooOverlay: false,
    showTooEarlyMessage: false,
  });
  
  const reactionStartTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startGame = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Show Image A and start waiting
    setGameData({
      state: 'waiting',
      lastReactionTime: null,
      showBoooOverlay: false,
      showTooEarlyMessage: false,
    });
    
    // Schedule random delay before showing Image B
    const delay = GAME_CONSTANTS.MIN_DELAY + 
      Math.random() * (GAME_CONSTANTS.MAX_DELAY - GAME_CONSTANTS.MIN_DELAY);
    
    timeoutRef.current = setTimeout(() => {
      // Switch to Image B and start timing
      reactionStartTimeRef.current = performance.now();
      setGameData(prev => ({
        ...prev,
        state: 'ready',
      }));
    }, delay);
  }, []);

  const handleTap = useCallback(() => {
    if (gameData.state === 'waiting') {
      // Too early! Show penalty
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setGameData(prev => ({
        ...prev,
        state: 'tooEarly',
        showTooEarlyMessage: true,
      }));
      
      // Wait briefly, then restart automatically (existing behavior)
      timeoutRef.current = setTimeout(() => {
        setGameData(prev => ({
          ...prev,
          showTooEarlyMessage: false,
        }));
        
        // Small delay before restarting
        setTimeout(() => {
          startGame();
        }, GAME_CONSTANTS.RESTART_DELAY);
      }, GAME_CONSTANTS.TOO_EARLY_DURATION);
      
    } else if (gameData.state === 'ready') {
      // Success! Calculate reaction time
      const reactionTime = Math.round(performance.now() - (reactionStartTimeRef.current || 0));
      
      setGameData({
        state: 'success',
        lastReactionTime: reactionTime,
        showBoooOverlay: true,
        showTooEarlyMessage: false,
      });
      
      // Hide overlay and transition to result screen (no auto-restart)
      timeoutRef.current = setTimeout(() => {
        setGameData(prev => ({
          ...prev,
          state: 'result',
          showBoooOverlay: false,
        }));
      }, GAME_CONSTANTS.BOOO_OVERLAY_DURATION);
    }
  }, [gameData.state, startGame]);

  const playAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGameData({
      state: 'idle',
      lastReactionTime: null,
      showBoooOverlay: false,
      showTooEarlyMessage: false,
    });
  }, []);

  return {
    gameState: gameData.state,
    lastReactionTime: gameData.lastReactionTime,
    showBoooOverlay: gameData.showBoooOverlay,
    showTooEarlyMessage: gameData.showTooEarlyMessage,
    startGame,
    handleTap,
    playAgain,
    reset,
  };
}

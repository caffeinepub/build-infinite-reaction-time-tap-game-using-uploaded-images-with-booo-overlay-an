// Game timing constants - centralized for easy tuning
export const GAME_CONSTANTS = {
  // Random delay range before showing Image B (ms)
  MIN_DELAY: 1000,
  MAX_DELAY: 3500,
  
  // Overlay display duration (ms)
  BOOO_OVERLAY_DURATION: 800,
  
  // Penalty message duration (ms)
  TOO_EARLY_DURATION: 1200,
  
  // Delay before restarting after penalty (ms)
  RESTART_DELAY: 400,
} as const;

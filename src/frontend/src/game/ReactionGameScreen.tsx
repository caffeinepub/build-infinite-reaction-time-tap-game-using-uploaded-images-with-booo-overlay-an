import { useState } from 'react';
import { useReactionGame } from './useReactionGame';
import { GAME_IMAGES } from './assets';
import { Button } from '@/components/ui/button';
import { Share2, RotateCcw, Play } from 'lucide-react';
import ResultScreen from './ResultScreen';
import SharePreviewScreen from './SharePreviewScreen';
import { pixelStyles } from './pixelStyles';
import { GAME_INTRO_TEXT } from './copy';

export default function ReactionGameScreen() {
  const {
    gameState,
    lastReactionTime,
    showBoooOverlay,
    showTooEarlyMessage,
    startGame,
    handleTap,
    playAgain,
    reset,
  } = useReactionGame();

  const [showSharePreview, setShowSharePreview] = useState(false);

  const handleShareButtonClick = () => {
    setShowSharePreview(true);
  };

  const handleCloseSharePreview = () => {
    setShowSharePreview(false);
  };

  // Show share preview screen when requested
  if (showSharePreview && lastReactionTime !== null) {
    return (
      <SharePreviewScreen 
        reactionTime={lastReactionTime}
        onClose={handleCloseSharePreview}
      />
    );
  }

  // Show result screen when in result state
  if (gameState === 'result' && lastReactionTime !== null) {
    return (
      <ResultScreen 
        reactionTime={lastReactionTime}
        onShare={handleShareButtonClick}
        onPlayAgain={playAgain}
      />
    );
  }

  // Live game states: waiting, ready, success (transient overlay), tooEarly
  const isGameActive = gameState === 'waiting' || gameState === 'ready' || gameState === 'success' || gameState === 'tooEarly';
  const currentImage = (gameState === 'ready' || gameState === 'success') ? GAME_IMAGES.imageB : GAME_IMAGES.imageA;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header HUD - glass panel */}
      <div className={`mb-6 text-center space-y-4 p-6 ${pixelStyles.glassPanel}`}>
        <h1 className={`text-xl md:text-2xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
          boogame
        </h1>
        <p className={`text-xs md:text-sm ${pixelStyles.text} ${pixelStyles.statusReady}`}>
          {GAME_INTRO_TEXT.line1}
          <br />
          {GAME_INTRO_TEXT.line2}
        </p>
        
        {/* Status indicator */}
        <div className={`text-sm md:text-base ${pixelStyles.text}`}>
          {gameState === 'idle' && (
            <span className={pixelStyles.statusReady}>Ready to play?</span>
          )}
          {gameState === 'waiting' && (
            <span className={`${pixelStyles.statusWait} animate-pulse`}>Wait for it...</span>
          )}
          {gameState === 'ready' && (
            <span className={`${pixelStyles.statusReady} animate-pulse`}>TAP NOW!</span>
          )}
          {(gameState === 'success' || gameState === 'tooEarly') && (
            <span className={pixelStyles.statusReady}>Get ready...</span>
          )}
        </div>

        {/* Last reaction time - only show during active game, not on result screen */}
        {lastReactionTime !== null && gameState !== 'result' && (
          <div className={`text-2xl md:text-3xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
            {lastReactionTime} ms
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="relative">
        {/* Main game card */}
        <div 
          className={`
            relative overflow-hidden
            ${gameState === 'ready' ? pixelStyles.cardActive : pixelStyles.card}
            transition-all duration-300
            ${isGameActive ? 'cursor-pointer' : ''}
          `}
          onClick={isGameActive ? handleTap : undefined}
        >
          {/* Image display */}
          {isGameActive ? (
            <div className="relative aspect-[16/10] bg-card/10">
              <img 
                src={currentImage} 
                alt="Game" 
                className="w-full h-full object-cover"
              />
              
              {/* Booo!!! Overlay */}
              {showBoooOverlay && (
                <div className={`absolute inset-0 flex items-center justify-center ${pixelStyles.overlay} animate-in fade-in zoom-in-95 duration-200`}>
                  <div className={`text-5xl md:text-7xl ${pixelStyles.heading} ${pixelStyles.statusSuccess} animate-pulse`}>
                    Booo!!!
                  </div>
                </div>
              )}
              
              {/* Too Early Message */}
              {showTooEarlyMessage && (
                <div className={`absolute inset-0 flex items-center justify-center ${pixelStyles.overlay} animate-in fade-in zoom-in-95 duration-200`}>
                  <div className="text-center space-y-4">
                    <div className={`text-4xl md:text-6xl ${pixelStyles.heading} ${pixelStyles.statusError}`}>
                      Too Early!
                    </div>
                    <div className={`text-sm md:text-base ${pixelStyles.text} ${pixelStyles.statusWait}`}>
                      Wait for the signal...
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Idle state - show start prompt with glass panel
            <div className="aspect-[16/10] bg-card/10 flex items-center justify-center">
              <div className={`text-center space-y-6 p-8 ${pixelStyles.glassPanelStrong} max-w-md mx-4`}>
                <div className={`text-3xl md:text-4xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
                  Ready?
                </div>
                <div className={`text-xs md:text-sm ${pixelStyles.text} text-muted-foreground`}>
                  Wait for the image to change, then tap as fast as you can!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tap instruction overlay for active game */}
        {isGameActive && !showBoooOverlay && !showTooEarlyMessage && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className={`text-xs md:text-sm ${pixelStyles.text} text-foreground px-4 py-2 ${pixelStyles.glassPanel}`}>
              {gameState === 'waiting' ? 'Wait...' : 'Tap anywhere!'}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {gameState === 'idle' ? (
          <Button
            onClick={startGame}
            size="lg"
            className={`${pixelStyles.button} ${pixelStyles.buttonPrimary} text-sm px-6`}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Game
          </Button>
        ) : (
          <Button
            onClick={reset}
            size="lg"
            className={`${pixelStyles.button} ${pixelStyles.buttonOutline} text-sm px-6`}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}

        {lastReactionTime !== null && gameState !== 'result' && (
          <Button
            onClick={handleShareButtonClick}
            size="lg"
            className={`${pixelStyles.button} ${pixelStyles.buttonSecondary} text-sm px-6`}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Result
          </Button>
        )}
      </div>

      {/* Footer */}
      <footer className={`mt-12 text-center text-xs ${pixelStyles.text} text-muted-foreground`}>
        © 2026. Built with love using{' '}
        <a 
          href="https://caffeine.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-accent transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

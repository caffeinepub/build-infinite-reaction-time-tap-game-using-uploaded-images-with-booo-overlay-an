import { Button } from '@/components/ui/button';
import { Share2, Play } from 'lucide-react';
import { pixelStyles } from './pixelStyles';
import { GAME_INTRO_TEXT } from './copy';

interface ResultScreenProps {
  reactionTime: number;
  onShare: () => void;
  onPlayAgain: () => void;
}

export default function ResultScreen({ 
  reactionTime, 
  onShare, 
  onPlayAgain
}: ResultScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header - glass panel */}
      <div className={`mb-6 text-center space-y-4 p-6 ${pixelStyles.glassPanel}`}>
        <h1 className={`text-xl md:text-2xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
          boogame
        </h1>
        <p className={`text-xs md:text-sm ${pixelStyles.text} ${pixelStyles.statusReady}`}>
          {GAME_INTRO_TEXT.line1}
          <br />
          {GAME_INTRO_TEXT.line2}
        </p>
      </div>

      {/* Result Card */}
      <div className={`${pixelStyles.cardActive} bg-card/30`}>
        <div className="p-8 md:p-12 text-center space-y-6">
          <div className={`text-sm md:text-base ${pixelStyles.text} ${pixelStyles.statusReady}`}>
            Your Reaction Time
          </div>
          
          <div className={`text-5xl md:text-7xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
            {reactionTime} ms
          </div>
          
          <div className={`text-base md:text-lg ${pixelStyles.text} text-muted-foreground`}>
            {reactionTime < 200 ? 'Lightning fast! ⚡' :
             reactionTime < 300 ? 'Excellent! 🎯' :
             reactionTime < 400 ? 'Good job! 👍' :
             'Keep practicing! 💪'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className={`${pixelStyles.button} ${pixelStyles.buttonPrimary} text-sm px-6`}
        >
          <Play className="mr-2 h-4 w-4" />
          Play Again
        </Button>

        <Button
          onClick={onShare}
          size="lg"
          className={`${pixelStyles.button} ${pixelStyles.buttonSecondary} text-sm px-6`}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
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

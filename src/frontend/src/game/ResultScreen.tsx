import { Button } from '@/components/ui/button';
import { Share2, Play } from 'lucide-react';
import { pixelStyles } from './pixelStyles';

interface ResultScreenProps {
  reactionTime: number;
  onShare: () => void;
  onPlayAgain: () => void;
  shareMessage?: string | null;
}

export default function ResultScreen({ 
  reactionTime, 
  onShare, 
  onPlayAgain,
  shareMessage 
}: ResultScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header - glass panel */}
      <div className={`mb-6 text-center space-y-4 p-6 ${pixelStyles.glassPanel}`}>
        <h1 className={`text-xl md:text-2xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
          Milan 2026 olympic games reaction game!
        </h1>
        <p className={`text-xs md:text-sm ${pixelStyles.text} ${pixelStyles.statusReady}`}>
          You also can be an Olympic winner!!
        </p>
      </div>

      {/* Result Card */}
      <div className="relative">
        <div className={`overflow-hidden ${pixelStyles.cardActive} bg-card/30`}>
          <div className="aspect-[16/10] flex items-center justify-center p-8">
            <div className="text-center space-y-6">
              <div className={`text-sm md:text-base ${pixelStyles.text} ${pixelStyles.statusReady}`}>
                Your Reaction Time
              </div>
              <div className={`text-5xl md:text-7xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
                {reactionTime}
                <span className="text-2xl md:text-3xl ml-2">ms</span>
              </div>
              <div className={`text-xs md:text-sm ${pixelStyles.text} text-muted-foreground max-w-md mx-auto`}>
                Nice reflexes! Ready for another round?
              </div>
            </div>
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
          Share Result
        </Button>
      </div>

      {/* Share confirmation message */}
      {shareMessage && (
        <div className="mt-4 text-center">
          <div className={`inline-block ${pixelStyles.toast} text-accent px-4 py-2 text-xs animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {shareMessage}
          </div>
        </div>
      )}

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


import { Button } from '@/components/ui/button';
import { Share2, X } from 'lucide-react';
import { pixelStyles } from './pixelStyles';
import { GAME_IMAGES } from './assets';

interface SharePreviewScreenProps {
  reactionTime: number;
  onShare: () => void;
  onClose: () => void;
  shareMessage?: string | null;
}

export default function SharePreviewScreen({ 
  reactionTime, 
  onShare, 
  onClose,
  shareMessage 
}: SharePreviewScreenProps) {
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

      {/* Share Preview Card */}
      <div className="relative">
        <div className={`overflow-hidden ${pixelStyles.cardActive} bg-card/30`}>
          {/* Image with Booo!!! overlay */}
          <div className="relative aspect-[16/10] bg-card/10">
            <img 
              src={GAME_IMAGES.imageB} 
              alt="Reaction result" 
              className="w-full h-full object-cover"
            />
            
            {/* Booo!!! Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center ${pixelStyles.overlay}`}>
              <div className={`text-5xl md:text-7xl ${pixelStyles.heading} ${pixelStyles.statusSuccess}`}>
                Booo!!!
              </div>
            </div>
          </div>

          {/* Reaction time message */}
          <div className="p-6 text-center space-y-4">
            <div className={`text-base md:text-lg ${pixelStyles.text} ${pixelStyles.statusReady}`}>
              your reaction time to Boo is {reactionTime}. Excellent!
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <Button
          onClick={onClose}
          size="lg"
          className={`${pixelStyles.button} ${pixelStyles.buttonOutline} text-sm px-6`}
        >
          <X className="mr-2 h-4 w-4" />
          Close
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

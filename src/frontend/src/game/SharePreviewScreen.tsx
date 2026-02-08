import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, X, Camera } from 'lucide-react';
import { pixelStyles } from './pixelStyles';
import { GAME_IMAGES } from './assets';
import { elementToPngBlob } from './domToPng';
import { shareImageFile } from './share';
import { GAME_INTRO_TEXT } from './copy';

interface SharePreviewScreenProps {
  reactionTime: number;
  onClose: () => void;
}

export default function SharePreviewScreen({ 
  reactionTime, 
  onClose
}: SharePreviewScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showScreenshotHint, setShowScreenshotHint] = useState(false);

  const handleShare = async () => {
    if (!cardRef.current) return;
    
    setIsSharing(true);
    setShowScreenshotHint(false);
    
    try {
      const blob = await elementToPngBlob(cardRef.current);
      const result = await shareImageFile(
        blob,
        `boogame-${reactionTime}ms.png`,
        'boogame',
        `Nice, you have boooed Vance in ${reactionTime} ms`
      );
      
      if (!result.success) {
        // Show screenshot instruction when share is not available or fails
        setShowScreenshotHint(true);
      }
    } catch (error) {
      console.error('Share failed:', error);
      setShowScreenshotHint(true);
    } finally {
      setIsSharing(false);
    }
  };

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

      {/* Share Preview Card */}
      <div className="relative">
        <div 
          ref={cardRef}
          className={`overflow-hidden ${pixelStyles.cardActive} bg-card/30`}
        >
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

          {/* Reaction time message with emphasized number */}
          <div className="p-6 text-center space-y-4">
            <div className={`text-base md:text-lg ${pixelStyles.text} ${pixelStyles.statusReady}`}>
              your reaction time to Boo is{' '}
              <span className={`${pixelStyles.emphasizedNumber}`}>
                {reactionTime}ms
              </span>
              . Excellent!
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Hint - shown when share is not available */}
      {showScreenshotHint && (
        <div className={`mt-6 ${pixelStyles.glassPanel} p-4 text-center space-y-2`}>
          <div className="flex items-center justify-center gap-2">
            <Camera className="h-5 w-5 text-accent" />
            <span className={`text-sm ${pixelStyles.text} text-accent`}>
              Screenshot & Share
            </span>
          </div>
          <p className={`text-xs ${pixelStyles.text} text-muted-foreground`}>
            Take a screenshot of this card and share it on social media!
          </p>
        </div>
      )}

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
          onClick={handleShare}
          size="lg"
          disabled={isSharing}
          className={`${pixelStyles.button} ${pixelStyles.buttonPrimary} text-sm px-6`}
        >
          <Share2 className="mr-2 h-4 w-4" />
          {isSharing ? 'Sharing...' : 'Share'}
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

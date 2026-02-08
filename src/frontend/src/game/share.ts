// Share functionality with Web Share API and clipboard fallback

export interface ShareResult {
  success: boolean;
  method: 'webshare' | 'clipboard' | 'none';
  error?: string;
}

export async function shareReactionTime(reactionTimeMs: number): Promise<ShareResult> {
  const shareText = `Nice, you have boooed Vance in ${reactionTimeMs} ms`;
  
  // Try Web Share API first (mobile-friendly)
  if (navigator.share) {
    try {
      await navigator.share({
        text: shareText,
      });
      return { success: true, method: 'webshare' };
    } catch (error) {
      // User cancelled or share failed, fall through to clipboard
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, method: 'none', error: 'Share cancelled' };
      }
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(shareText);
    return { success: true, method: 'clipboard' };
  } catch (error) {
    return { 
      success: false, 
      method: 'none', 
      error: 'Failed to copy to clipboard' 
    };
  }
}

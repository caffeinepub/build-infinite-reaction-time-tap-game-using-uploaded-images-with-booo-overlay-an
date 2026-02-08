// Share functionality with Web Share API only

export interface ShareResult {
  success: boolean;
  method: 'webshare' | 'none';
  error?: string;
}

/**
 * Share an image file using Web Share API
 * Returns failure if Web Share is not available or user cancels
 */
export async function shareImageFile(
  blob: Blob,
  filename: string,
  title: string,
  text: string
): Promise<ShareResult> {
  // Create File object from blob
  const file = new File([blob], filename, { type: blob.type });
  const shareData = {
    files: [file],
    title,
    text,
  };

  // Try Web Share API (mobile-friendly)
  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'webshare' };
    } catch (error) {
      // User cancelled or share failed
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, method: 'none', error: 'Share cancelled' };
      }
      return { 
        success: false, 
        method: 'none', 
        error: 'Share failed' 
      };
    }
  }
  
  // Web Share not available
  return { 
    success: false, 
    method: 'none', 
    error: 'Share not available' 
  };
}

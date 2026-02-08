/**
 * Converts a DOM element to a PNG image and returns as Blob
 * Uses canvas and foreignObject for rendering
 */
export async function elementToPngBlob(
  element: HTMLElement
): Promise<Blob> {
  try {
    // Get element dimensions
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Get computed styles from the original element
    const computedStyle = window.getComputedStyle(element);
    
    // Apply inline styles to ensure they're captured
    clonedElement.style.cssText = computedStyle.cssText;
    clonedElement.style.width = `${width}px`;
    clonedElement.style.height = `${height}px`;

    // Create SVG with foreignObject
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width: ${width}px; height: ${height}px;">
            ${clonedElement.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width * 2; // 2x for better quality
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    ctx.scale(2, 2);

    // Load SVG as image
    const img = new Image();
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          resolve(blob);
        }, 'image/png');
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  } catch (error) {
    console.error('Error converting element to PNG:', error);
    throw error;
  }
}

/**
 * Downloads a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

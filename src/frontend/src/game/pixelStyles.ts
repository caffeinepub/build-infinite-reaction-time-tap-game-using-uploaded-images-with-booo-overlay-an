/**
 * Shared minimalist winter glass style constants for consistent styling across game screens
 */

export const pixelStyles = {
  // Typography
  heading: 'font-pixel text-shadow-none tracking-wider',
  text: 'font-pixel leading-relaxed',
  
  // Game card/frame - minimalist with thin borders and glass effect
  card: 'rounded-lg border border-primary/30 shadow-pixel bg-card/20 backdrop-blur-md',
  cardActive: 'rounded-lg border border-accent/60 shadow-[0_0_0_1px_oklch(var(--accent)/0.6)] bg-card/30 backdrop-blur-md',
  
  // Overlays - glass effect
  overlay: 'bg-background/90 backdrop-blur-sm',
  
  // Glass panels for HUD/prompts
  glassPanel: 'bg-card/30 backdrop-blur-md border border-primary/20 rounded-lg',
  glassPanelStrong: 'bg-card/50 backdrop-blur-lg border border-primary/30 rounded-lg',
  
  // Buttons - transparent glass style
  button: 'rounded-lg border font-pixel shadow-pixel hover:shadow-pixel-lg transition-all backdrop-blur-md',
  buttonPrimary: 'bg-primary/20 border-primary/40 text-primary-foreground hover:bg-primary/30 hover:border-primary/60',
  buttonSecondary: 'bg-accent/20 border-accent/40 text-accent-foreground hover:bg-accent/30 hover:border-accent/60',
  buttonOutline: 'bg-card/20 border-border/40 text-foreground hover:bg-card/30 hover:border-border/60',
  
  // Toast/message - glass effect
  toast: 'rounded-lg border border-accent/40 bg-card/40 backdrop-blur-md font-pixel shadow-pixel',
  
  // Status colors - winter palette
  statusReady: 'text-accent',
  statusWait: 'text-primary',
  statusError: 'text-destructive',
  statusSuccess: 'text-accent',
};


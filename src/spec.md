# Specification

## Summary
**Goal:** Update the reaction game to use the new Image B asset and introduce a share-preview step before executing sharing.

**Planned changes:**
- Replace the existing Image B static asset reference with `/assets/IMG_5761.png` via the existing centralized `GAME_IMAGES.imageB` constant in `frontend/src/game/assets.ts` (leave Image A unchanged).
- Update the Result screen “Share Result” button behavior to open a new share-preview card/screen instead of immediately invoking share/copy.
- Implement the share-preview UI to display Image B with overlay text exactly “Booo!!!”, plus the exact line: “your reaction time to Boo is <XY>. Excellent!” where `<XY>` is the latest reaction time in milliseconds.
- Add explicit actions within the share-preview UI: a primary button that triggers the existing share behavior (unchanged logic from `shareReactionTime(lastReactionTime)`) and a secondary Back/Close action that returns to the Result screen without starting a new round.
- Style the share-preview to match the existing minimalist winter glass UI and ensure it is responsive on mobile/desktop; disable any gameplay tap-anywhere handler while the preview is visible.

**User-visible outcome:** Image B in the game is updated to the newly uploaded image, and tapping “Share Result” now shows a preview card with the Boo image and reaction-time message, letting the user choose to share or go back without sharing.

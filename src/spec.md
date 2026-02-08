# Specification

## Summary
**Goal:** Fix the Share Preview experience by removing the broken download fallback, adding clear screenshot-sharing guidance, and making the reaction-time value stand out more on the share card.

**Planned changes:**
- Remove the non-working share-card save/download fallback behavior from the Share Preview flow (including any “Image downloaded!” messaging).
- When native Web Share (with files) is unavailable or fails, show a clearly visible English instruction telling users to take a screenshot and share it on social media.
- Update the Share Preview card styling so the reaction time number in the sentence “your reaction time to Boo is <XY>ms. Excellent!” is larger and uses a higher-contrast, more prominent color than the surrounding text (without changing the sentence text).

**User-visible outcome:** On the Share Preview screen, users can attempt to share normally; if sharing isn’t supported/doesn’t work, they’re prompted to take a screenshot and share it manually, and the reaction-time number is easier to notice and read on the card.

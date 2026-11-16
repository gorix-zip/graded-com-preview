# graded vault demo

A mobile-first, static demo of the Graded vault and card-scan flow. Open `/vault-demo/` from the existing local Graded site, or serve this repository root with any static file server.

## Public preview

https://gorix-zip.github.io/graded-com-preview/vault-demo/

## Demo paths

- Tap the floating **scan** action. A short vault-door reveal plays each time the app reloads. Tap **Skip** to continue immediately. A sample Charizard card enters the frame and is scanned automatically.
- Choose **match** to review the possible match and add it to a local draft.
- Choose **no match** to inspect the recovery path. The sample stays in frame; nothing is added until a card is selected and confirmed.
- Tap a vault card to open its interactive preview. Drag across the card to tilt it and reveal a subtle chrome foil sheen; tap it to flip to the Graded back. Soft synthesized touch sounds can be muted under Account → Sound effects.
- Every reload plays the short vault-opening reveal with the Graded emblem centered on the door. The matching Figma animation is in Draft 03; its MP4 is saved as `vault-opening.mp4`.
- The dark interface uses the Graded palette (yellow, orange, pink, magenta and violet). The floating scan action remains centered just above the bottom navigation, with larger touch targets and safe-area spacing for one-handed reach.

This demo does not request camera access, upload images, authenticate users, create shipments, or claim grading/verification. The match and card records are illustrative sample data. Added draft cards and the sound preference are saved only in this browser's local storage; no data is sent to a server.

## Run

From the existing site root:

```sh
python3 -m http.server 8942
```

Open <http://localhost:8942/vault-demo/>. The app reuses the local Graded fonts, wordmark, card fronts, and card-back artwork in `../assets/`.

# Vibrant Watch Company

A mobile-first, frontend-only Next.js landing page for hand-painted watches.
   
## Run

```sh
npm install
npm run dev
```              

Open http://localhost:3000. Production: `npm run build` then        `npm start`.

## Included

- Exact burgundy sampled from the supplied brand artwork: `#600235`.
- Cream canvas, Cormorant Garamond display type reflecting the supplied serif identity, Manrope body type.
- Responsive design gallery, mobile navigation, accessible native FAQs, reduced-motion support.
- Selecting a gallery watch preselects it in the enquiry form.
- Frontend form validation and explicit preview confirmation. No server endpoint, network submission, storage, or marketing integration.
- Three generated concept images, optimized as WebP, in `public/images/`.

The design gallery contains illustrative concepts, not verified inventory. Replace these with real product photographs when available. Configure actual enquiry delivery before using the page to collect leads.

## Validation

```sh
npm run typecheck
npm run build
node scripts/check-ui.mjs
```

The browser check uses installed Microsoft Edge and a running production server on port 3001 (`npm start -- --port 3001`). It checks five viewport widths, image loading, navigation, design selection, frontend-only form behaviour, reduced motion, and axe accessibility. Screenshots are written to `artifacts/`.

## Design skill

Installed the requested `Leonxlnx/taste-skill` bundle with `npx skills add Leonxlnx/taste-skill --yes` and applied `design-taste-frontend`. Design dials: variance 7, motion 4, density 3. User-specified cream and burgundy override the skill's palette defaults. The luxury serif identity in the provided brand image supports the display-font choice. The requested cream theme stays consistent regardless of system dark mode.

The reference https://www.basically.agency/ informed bold typographic hierarchy and generous composition, adapted to a luxury watch storefront.

Image-generation prompts and asset details are recorded in `ASSETS.md`.

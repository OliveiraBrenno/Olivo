# Verification

Production build: `npm run build` passed. `npm test` passed after the gallery overflow correction and the final cardápio heading/card collision fix at 701 and 768 px. The suite asserts that the heading does not overlap the first card at both widths. The independent follow-up review inspected both corrected cardápio captures and resolved F1; final disposition: **ship**.

All five routes loaded with one h1, correct active navigation, no empty links, no broken images, no HTTP or browser errors and no horizontal document overflow at 320, 390, 600, 700, 701, 768, 1024, 1440 and 1920 px. Content width capped at 1120 px.

Flows: all six carousel slides and wraparound, keyboard arrows and dialog focus return; accent-insensitive menu search, category filters, empty and reset states; date plus category intersection and event-to-contact prefill; gallery filters and keyboard lightbox; validated form, escaped user data, WhatsApp draft without recipient, future-date calendar download, FAQ, and reduced motion.

Images: native source dimensions checked with Sharp against actual rendered dimensions and selected production image URLs at device scale 2. Every displayed main image has at least 1.5 source pixels per rendered CSS pixel in both dimensions, including cover cropping. Exact per-image evidence is in `image-audit.json`. Six cocktail masters are 1122 × 1402, scene masters 1536 × 1024, hero master 1672 × 941. No upscaling.

Gestures: horizontal and vertical touch sequences synthesized with Chrome DevTools Protocol in mobile Chromium. Horizontal swipe advances a drink without opening a dialog; vertical swipe leaves carousel selection unchanged and actually scrolls the page. Physical touch devices, Safari and Firefox were not exercised.

Visual captures: every page at 1440 × 900, 768 × 1024 and 390 × 844, plus the cardápio boundary capture at 701 px: 16 final captures, with zero broken images and zero document overflow. Full-page PNGs named `<route>-desktop.png`, `<route>-tablet.png`, `<route>-mobile.png`, plus `cardapio-boundary.png`; `layout.json` records loading and geometry.

Hook: deterministic design checks ran on CSS writes and reported no findings. This is an ordinary extension using five user-supplied compositions, not a new visual direction.

Documentation: `PRODUCT.md`, `DESIGN.md` and `README.md` were compared with the finished CSS, page generator, client interactions, data, Vite configuration, image manifest/dimensions and review evidence. The merge records the five screens, 1120 px cap, responsive contracts, image provenance, illustrative commercial details and local contact behavior. The existing visual authority and identity paragraph were preserved. Its historical palette values differ from the incumbent CSS tokens (wine, olive and ink); that pre-existing drift was reported without changing CSS or normalizing unrelated design tokens. This incremental contract merge does not regenerate the design-token spec or introduce a new sidecar.

# design-sync notes (idev-creative-coders)

Project: claude.ai/design "IDEV Creative Coders" (id in config.json). Shape: package, **synthesized from a curated entry** - this repo is an app, not a published library.

## How the build works
- **Entry**: `.design-sync/entry.tsx` re-exports only the 18 reusable components, the real `projects` data, and `MemoryRouter` (preview provider). Page sections, Navbar, Footer, ContactForm, CustomCursor and the WebGL hero are deliberately out. Add a new reusable component = export it there AND add it to `componentSrcMap` AND write `.design-sync/docs/<Name>.md` + `dtsPropsFor.<Name>` in config.
- **No .d.ts tree exists**, so every `<Name>Props` is the hand-written `cfg.dtsPropsFor.<Name>` (one per component). Changing a component's props means updating its entry there; nothing detects drift.
- **CSS**: `.design-sync/.cache/app.css` is produced by `cfg.buildCmd` = `npm run build` (Tailwind v4 output) with the Google Fonts `@import` prepended. Run `buildCmd` before the converter whenever `src/` changed - the cache copy goes stale silently.
- Previews: `.design-sync/previews/<Name>.tsx` (all 18 authored), shared harness in `.design-sync/preview-kit.tsx`.
- Converter staged in `.ds-sync/` (gitignored). Re-copy it from the skill dir before each re-sync.
- Command: `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle [--remote .design-sync/.cache/remote-sync.json]`. Playwright 1.63.0 is installed in `.ds-sync` (matches the cached chromium-1243).

## Gotchas
- `--node-modules ./node_modules` + `cfg.entry` is required; without an entry the converter looks for `node_modules/idev-creative-coders`, which doesn't exist.
- The compiled stylesheet only contains utility classes the app already uses (not a full Tailwind). `ImageFrame` sizing in previews uses classes that exist (`aspect-[4/3]`, `sm:aspect-[16/10]`, ...). A class like `aspect-[16/10]` or `rounded-r-none` unprefixed does NOT exist; a preview using it collapses silently. The conventions header lists the verified-safe classes.
- The generated card page paints a white body. `preview-kit.tsx` overrides body/html to `var(--background)` and patches `window.matchMedia` so `prefers-reduced-motion` matches: cards then show settled, non-animated states (otherwise captures land mid-animation).
- `ThemeSelector` mounts and flips `html.light` + writes `localStorage.theme`; its card renders in the light palette. Expected.
- Components needing a Router (Button `to`, ViewCaseStudyLink, FloatingInfoCard, ProjectShowcase) rely on `cfg.provider` = MemoryRouter.
- `ProjectShowcase` compositions depend on the `lg` breakpoint: its card uses `viewport 1280x1000`, `cardMode: column`.
- Fintech Startup Platform's `ProjectPreview` intentionally shows the same mock text as Direct Market Access ("PROGRESSIVE WEB APP"): that is how the site itself renders it (no dedicated mock in the source).

## Known render warns
- none (render check 18/18 clean; all GRID_OVERFLOW warns resolved with `cardMode: column` on PageHeader, SectionHeader, ScrollReveal, EditorialHeading, FloatingInfoCard, ProjectShowcase).

## Re-sync risks
- **Props drift**: `dtsPropsFor` is hand-written; a changed prop in `src/components/*` is invisible to the converter until edited here.
- **Stale CSS**: forgetting `buildCmd` ships yesterday's styles.
- **Design changes**: the site's palette is theme-driven (`html.light`). Previews and conventions describe the current crimson/maroon palette and the dark default; update `conventions.md` if either changes.
- **Classes named in conventions.md** were verified against the built CSS on the sync date; a refactor that stops using one removes it from the compiled CSS.
- Fonts come from a remote Google Fonts `@import` (needs network at view time); no font files are shipped.
- Only the reusable UI is synced by design; sections like Hero/Services/Footer are not in the design system.

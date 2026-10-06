# IDEV Creative Coders - how to build with this system

IDEV is a dark-first, editorial creative-studio look: oversized light display type (Outfit), mono-caps micro labels (JetBrains Mono), plain body copy (Plus Jakarta Sans), 28-40px rounded surfaces, one crimson accent. Everything is on `window.IDEV`; fonts, tokens and component CSS arrive through `styles.css` - link nothing else.

## Setup
- **Router.** `Button` with `to`, `ViewCaseStudyLink`, `FloatingInfoCard` and `ProjectShowcase` render router links and throw without one. Wrap the app once in `window.IDEV.MemoryRouter`.
- **Page colour.** Put `background: var(--background); color: var(--text-primary)` on `body`. Components assume it: their text is light on this dark page.
- **Theme.** Dark is the default. Adding the class `light` to `<html>` swaps the whole palette (cream page, maroon accent); no other change is needed. `ThemeSelector` does this itself and persists the choice.
- **Real content.** `window.IDEV.projects` holds the seven real portfolio projects (title, description, technologies, metrics). Use them for anything project-shaped instead of inventing copy.

## Styling idiom
No component takes colours as props; style with tokens. Use CSS variables in inline `style` for your own layout glue:
`--background` `--surface` `--surface-secondary` `--text-primary` `--text-secondary` `--accent` `--accent-secondary` `--border-subtle` `--glass` `--glass-strong` `--glass-border` `--shadow-float` `--shadow-soft` `--stage` `--font-sans` `--font-display` `--font-mono`.
Pattern: `style={{ color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}`.

The stylesheet is the compiled app CSS, **not a full Tailwind build**: a utility class only exists if the app already uses it. Safe, verified classes: `bg-background bg-surface text-text-primary text-text-secondary text-accent border-border-subtle font-display font-mono rounded-full flex grid flex-col flex-wrap items-center justify-between gap-2 gap-3 gap-4 gap-6 gap-8 p-6 p-8 mb-4 mt-4 w-full relative absolute overflow-hidden text-center text-sm text-base text-lg max-w-3xl grid-cols-1`, plus the system's own surface classes `glass` `panel` `nav-pill` `stage` `stage-grid` `card-premium`, and type helpers `eyebrow` (mono caps label) and `ghost-numeral` (outlined oversized number). For anything else (sizes, spacing, columns) use inline `style` with tokens rather than guessing a class name.

## Where the truth lives
Read `styles.css` (it imports `_ds_bundle.css`, where every token is defined under `:root` and `html.light`), then each component's `<Name>.d.ts` for props and `<Name>.prompt.md` for when to use it. Reach for these components for headings (`EditorialHeading`), page blocks (`Section`, `SectionHeader`, `PageHeader`), surfaces (`GlassPanel`, `ImageFrame`), actions (`Button`) and project presentation (`ProjectShowcase`) before building your own.

## One idiomatic block
```jsx
const { MemoryRouter, Section, SectionHeader, ProjectShowcase, projects } = window.IDEV;

<MemoryRouter>
  <Section id="work">
    <SectionHeader
      eyebrow="07 // PORTFOLIO"
      lines={["Selected Work."]}
      description="A selection of digital products, applications, and experiments."
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 160 }}>
      {projects.slice(0, 3).map((p, i) => (
        <ProjectShowcase key={p.id} project={p} index={i} />
      ))}
    </div>
  </Section>
</MemoryRouter>
```

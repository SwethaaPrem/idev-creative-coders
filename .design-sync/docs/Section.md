---
category: Layout
---

Page-width content section with the shared gutter (`px-6 md:px-12`), a 1400px max width and the vertical rhythm (`py-24 sm:py-32`). Wrap every page block in one. Put `SectionHeader` first, then the content.

```jsx
<Section id="work">
  <SectionHeader eyebrow="07 // PORTFOLIO" lines={["Selected Work."]} description="A selection of digital products." />
  {/* content */}
</Section>
```

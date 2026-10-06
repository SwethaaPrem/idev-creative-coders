---
category: Surfaces
---

Large rounded media container (32-40px radius) for project visuals and photography. The media layer is oversized so the scroll scale/drift never exposes an edge, and it eases in on hover. Give the frame an explicit size via `className` (an aspect ratio like `aspect-[16/10]`, or a height like `lg:h-[640px]`); children are positioned `absolute inset-0` inside the media layer. Use `overlay` for text or badges that must not scale with the media. `radius` takes Tailwind `rounded-*` classes to override the corners; like every utility class here it only applies if that class exists in the compiled stylesheet (see the README's styling notes).

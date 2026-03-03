# Experience Section Accordion Design

**Date:** 2026-03-03
**Status:** Approved

## Goal

Enrich the experience section with job descriptions and skill tags without visual clutter. Use click-to-expand accordion to keep the page clean by default.

## Design Decisions

- **Approach:** Pure CSS class toggle + JS (方案 B) — best browser compatibility, consistent animation, matches existing code patterns
- **Scope:** All 5 timeline entries get expand/collapse capability
- **Interaction:** Accordion mode — only one item expanded at a time
- **Animation:** Smooth transition via `max-height` + `opacity` (~0.3s)
- **Content:** Placeholder text initially, real content added later

## HTML Structure

Each `timeline-item` gains:
- `timeline-header` becomes clickable (`role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls`)
- New `expand-icon` SVG chevron inside header (right-aligned)
- New `timeline-details` div containing:
  - `<p>` for job description (with `data-i18n-en/zh`)
  - `<div class="skill-tags">` with `<span class="skill-tag">` children

## CSS

- `.timeline-header` gets `cursor: pointer`
- `.expand-icon` right-aligned via `margin-left: auto`, rotates 180deg when expanded
- `.timeline-details` uses `max-height: 0` → `300px` with `opacity` transition
- `.skill-tag` styled with `--font-mono`, bordered pill style matching site aesthetics

## JavaScript

- Click handler on `.timeline-header` toggles `.expanded` class
- Accordion: closes all other expanded items before opening clicked one
- Keyboard: Enter/Space trigger click
- `aria-expanded` kept in sync

## Accessibility

- `role="button"` + `tabindex="0"` for keyboard navigation
- `aria-expanded` + `aria-controls` for screen readers
- Enter/Space key support

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Minimalist, bilingual (EN/ZH) portfolio website for Hongliang Zeng (Xavier), an AI & Embodied Intelligence researcher. Pure static site — no frameworks, no build step.

## Tech Stack

- Vanilla HTML5, CSS3 (custom properties, grid, flexbox), ES6+ JavaScript
- Google Fonts: Inter (EN), Noto Sans SC (ZH), JetBrains Mono (code/tags)
- Deployed on GitHub Pages (`.nojekyll` disables Jekyll processing)

## Architecture

Single-page site (`index.html`) with scroll-based navigation. Three files handle everything:

- **`index.html`** — All sections: nav, hero, about, projects, publications, experience, footer
- **`css/style.css`** — Design system via CSS custom properties (`:root`), component styles, responsive breakpoints at 768px and 480px
- **`js/main.js`** — i18n toggle (localStorage key `site-lang`), nav scroll shadow, IntersectionObserver fade-in, lightbox for publication figures

## Bilingual System

All translatable text uses `data-i18n-en` and `data-i18n-zh` attributes. JS swaps `textContent` on toggle. Default language: English. When adding new text content, always include both attributes.

## Key Patterns

- **Publications with figures**: Use `pub-featured` class with `pub-figure` + `pub-info` children for image+text layout. Figures auto-register with the lightbox via `.pub-figure img` selector.
- **Publication badges**: Use `<span class="pub-badge">Oral</span>` after venue text for acceptance type.
- **Section headings**: Include inline SVG icons with `class="section-icon"` before a `<span>` containing the i18n text.
- **Section animations**: Add `class="section-fade"` to any `<section>` for scroll-triggered fade-in.
- **CSS variables**: Colors (`--color-accent: #2563EB`), fonts (`--font-en`, `--font-zh`, `--font-mono`), layout (`--max-width: 800px`, `--nav-height: 64px`).

## Development

Open `index.html` directly in a browser — no server required. For local server:

```
python -m http.server 8080
```

## File Locations

- Publication PDFs go in `assets/files/`
- Publication/project images go in `assets/images/`
- Source paper PDFs (not served) are in `paper/`
- Design docs and plans are in `docs/plans/`

# Personal Website Design

## Overview

A minimalist portfolio website for an AI & Embodied Intelligence researcher/engineer, focused on job seeking and showcasing work. Deployed on GitHub Pages with bilingual (Chinese/English) support.

## Tech Stack

- Pure static HTML/CSS/JS (no frameworks)
- GitHub Pages for hosting
- Google Fonts (Inter, Noto Sans SC, JetBrains Mono)

## File Structure

```
personal_website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── files/
└── favicon.ico
```

## Page Structure (Single Page, Scroll-based)

### 1. Navigation Bar
- Sticky top navigation
- Section links: About / Projects / Publications / Experience
- Language toggle button (中 / EN) on the right
- Subtle shadow on scroll

### 2. Hero Section
- Left: Name (large) + tagline ("AI & Embodied Intelligence Researcher") + social icons (GitHub, LinkedIn, Google Scholar, Email)
- Right: Profile photo (rounded)
- Below: "Download CV" button

### 3. About Section
- 2-3 paragraphs introducing background and research interests
- Max width 800px, centered

### 4. Projects Section
- Card grid layout (2 per row)
- Each card: title, 1-2 sentence description, tech tags, links (GitHub/Demo/Paper)
- 4-6 representative projects

### 5. Publications Section
- Clean list style
- Each entry: paper title (bold), authors (self highlighted), venue + year, links (PDF/ArXiv/DOI)

### 6. Experience Timeline
- Vertical timeline, year on left, content on right
- Institution + role/degree + 1-2 line description
- Education and work mixed, reverse chronological

### 7. Footer
- Centered, minimal: "Built with HTML/CSS/JS" + copyright + email

## Visual Design System

### Colors
- Background: `#FFFFFF`
- Primary text: `#1a1a1a`
- Secondary text: `#666666`
- Accent: `#2563EB` (links, hover states)
- Borders/dividers: `#E5E7EB`

### Typography
- English: Inter (Google Fonts)
- Chinese: Noto Sans SC
- Code/tags: JetBrains Mono
- Headings: weight 600-700
- Body: weight 400, line-height 1.6-1.8

### Layout
- Content max-width: 800px, centered
- Generous whitespace
- No decorative elements

### Interactions (restrained)
- Scroll fade-in for sections
- Subtle hover color/shadow on links and cards
- Nav shadow on scroll
- No flashy animations

## Bilingual (i18n) Approach

- `data-i18n-zh` and `data-i18n-en` attributes on translatable elements
- JS toggles text content based on selected language
- `localStorage` persists user choice
- Default language: English
- Content adapted per audience, not literal translation
- Project names and paper titles kept in original language

## Deployment

- GitHub Pages from repository root or `/docs` folder
- Repository name: `username.github.io` for custom domain
- No build step required

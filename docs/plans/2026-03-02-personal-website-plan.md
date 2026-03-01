# Personal Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimalist, bilingual (CN/EN) portfolio website for an AI & Embodied Intelligence researcher, deployed on GitHub Pages.

**Architecture:** Single-page static site with scroll-based navigation. Pure HTML/CSS/JS, no build tools or frameworks. Bilingual support via `data-i18n` attributes toggled by JS. Sections: Nav, Hero, About, Projects, Publications, Experience, Footer.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS (ES6+), Google Fonts (Inter, Noto Sans SC, JetBrains Mono)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `assets/images/.gitkeep`
- Create: `assets/files/.gitkeep`

**Step 1: Create directory structure**

```bash
mkdir -p css js assets/images assets/files
touch assets/images/.gitkeep assets/files/.gitkeep
```

**Step 2: Create base `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — AI & Embodied Intelligence</title>
  <meta name="description" content="Personal portfolio of [Your Name], AI and Embodied Intelligence researcher.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Content will be added in subsequent tasks -->

  <script src="js/main.js"></script>
</body>
</html>
```

**Step 3: Create empty `css/style.css` and `js/main.js`**

`css/style.css`:
```css
/* Styles will be added in subsequent tasks */
```

`js/main.js`:
```js
// Scripts will be added in subsequent tasks
```

**Step 4: Verify by opening `index.html` in browser**

Expected: Blank white page, no console errors, fonts loading in Network tab.

**Step 5: Commit**

```bash
git add index.html css/ js/ assets/
git commit -m "feat: project scaffolding with base HTML structure"
```

---

### Task 2: CSS Foundation — Reset, Variables, Typography, Layout

**Files:**
- Modify: `css/style.css`

**Step 1: Write CSS reset and custom properties**

```css
/* === Reset === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* === Custom Properties === */
:root {
  --color-bg: #FFFFFF;
  --color-text: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent: #2563EB;
  --color-accent-hover: #1d4ed8;
  --color-border: #E5E7EB;
  --color-card-bg: #F9FAFB;

  --font-en: 'Inter', sans-serif;
  --font-zh: 'Noto Sans SC', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --max-width: 800px;
  --nav-height: 64px;
  --section-padding: 96px 24px;
}

/* === Base === */
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  font-family: var(--font-en), var(--font-zh);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === Typography === */
h1, h2, h3, h4 {
  font-weight: 600;
  line-height: 1.3;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 1.75rem; margin-bottom: 48px; }
h3 { font-size: 1.25rem; }

p {
  margin-bottom: 16px;
  color: var(--color-text-secondary);
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-accent-hover);
}

/* === Layout === */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

section {
  padding: var(--section-padding);
}

/* === Utilities === */
.section-fade {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-fade.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Verify by opening browser**

Expected: White page with no default margins, smooth scroll enabled.

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: CSS foundation with reset, variables, typography, layout"
```

---

### Task 3: Navigation Bar

**Files:**
- Modify: `index.html` (add nav HTML)
- Modify: `css/style.css` (add nav styles)

**Step 1: Add nav HTML to `index.html`** (inside `<body>`, before the comment)

```html
<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="#" class="nav-logo" data-i18n-en="YourName" data-i18n-zh="你的名字">YourName</a>
    <div class="nav-links">
      <a href="#about" data-i18n-en="About" data-i18n-zh="关于">About</a>
      <a href="#projects" data-i18n-en="Projects" data-i18n-zh="项目">Projects</a>
      <a href="#publications" data-i18n-en="Publications" data-i18n-zh="论文">Publications</a>
      <a href="#experience" data-i18n-en="Experience" data-i18n-zh="经历">Experience</a>
      <button class="lang-toggle" id="langToggle" aria-label="Toggle language">EN</button>
    </div>
  </div>
</nav>
```

**Step 2: Add nav CSS to `css/style.css`**

```css
/* === Navigation === */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  transition: box-shadow 0.3s ease;
}

.nav.scrolled {
  box-shadow: 0 1px 0 var(--color-border);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-text);
}

.nav-logo:hover {
  color: var(--color-text);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--color-text);
}

.lang-toggle {
  font-family: var(--font-en);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-toggle:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}
```

**Step 3: Verify in browser**

Expected: Fixed nav bar at top with links and language toggle button. Links should have hover effects.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add navigation bar with language toggle button"
```

---

### Task 4: Hero Section

**Files:**
- Modify: `index.html` (add hero HTML after nav)
- Modify: `css/style.css` (add hero styles)

**Step 1: Add hero HTML to `index.html`** (after `</nav>`)

```html
<section class="hero" id="hero">
  <div class="container hero-grid">
    <div class="hero-content">
      <h1 data-i18n-en="Your Name" data-i18n-zh="你的名字">Your Name</h1>
      <p class="hero-tagline" data-i18n-en="AI &amp; Embodied Intelligence Researcher" data-i18n-zh="AI与具身智能研究者">AI &amp; Embodied Intelligence Researcher</p>
      <div class="hero-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://scholar.google.com/citations?user=YOURID" target="_blank" rel="noopener" aria-label="Google Scholar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z"/></svg>
        </a>
        <a href="mailto:your@email.com" aria-label="Email">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
        </a>
      </div>
      <a href="assets/files/cv.pdf" class="btn" target="_blank" data-i18n-en="Download CV" data-i18n-zh="下载简历">Download CV</a>
    </div>
    <div class="hero-photo">
      <div class="hero-photo-placeholder" data-i18n-en="Photo" data-i18n-zh="照片">Photo</div>
    </div>
  </div>
</section>
```

**Step 2: Add hero CSS to `css/style.css`**

```css
/* === Hero === */
.hero {
  padding-top: calc(var(--nav-height) + 80px);
  padding-bottom: 80px;
}

.hero-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  margin-bottom: 8px;
}

.hero-tagline {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.hero-links {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.hero-links a {
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.hero-links a:hover {
  color: var(--color-accent);
}

.hero-photo {
  flex-shrink: 0;
}

.hero-photo img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.hero-photo-placeholder {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--color-card-bg);
  border: 2px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.btn {
  display: inline-block;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn:hover {
  background: var(--color-accent);
  color: #FFFFFF;
}
```

**Step 3: Verify in browser**

Expected: Hero section with name, tagline, social icons, CV button on left; circular photo placeholder on right.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add hero section with social links and CV button"
```

---

### Task 5: About Section

**Files:**
- Modify: `index.html` (add about HTML after hero)
- Modify: `css/style.css` (add about styles)

**Step 1: Add about HTML to `index.html`** (after hero `</section>`)

```html
<section id="about" class="section-fade">
  <div class="container">
    <h2 data-i18n-en="About" data-i18n-zh="关于我">About</h2>
    <div class="about-content">
      <p data-i18n-en="I am a researcher and engineer working at the intersection of artificial intelligence and embodied intelligence. My work focuses on enabling intelligent agents to perceive, reason, and interact with the physical world." data-i18n-zh="我是一名从事人工智能与具身智能交叉领域的研究者和工程师。我的工作专注于让智能体能够感知、推理并与物理世界交互。">I am a researcher and engineer working at the intersection of artificial intelligence and embodied intelligence. My work focuses on enabling intelligent agents to perceive, reason, and interact with the physical world.</p>
      <p data-i18n-en="My research interests include robot learning, manipulation, computer vision, and large language models for robotics. I am passionate about building systems that bridge the gap between digital intelligence and physical capability." data-i18n-zh="我的研究兴趣包括机器人学习、操作、计算机视觉以及面向机器人的大语言模型。我热衷于构建连接数字智能与物理能力的系统。">My research interests include robot learning, manipulation, computer vision, and large language models for robotics. I am passionate about building systems that bridge the gap between digital intelligence and physical capability.</p>
    </div>
  </div>
</section>
```

**Step 2: Add about CSS to `css/style.css`**

```css
/* === About === */
.about-content {
  max-width: 640px;
}

.about-content p {
  font-size: 1.0625rem;
  line-height: 1.8;
}
```

**Step 3: Verify in browser**

Expected: Clean "About" section with two paragraphs, left-aligned within 640px max-width.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add about section with bilingual content"
```

---

### Task 6: Projects Section

**Files:**
- Modify: `index.html` (add projects HTML after about)
- Modify: `css/style.css` (add project card styles)

**Step 1: Add projects HTML to `index.html`** (after about `</section>`)

```html
<section id="projects" class="section-fade">
  <div class="container">
    <h2 data-i18n-en="Projects" data-i18n-zh="项目">Projects</h2>
    <div class="project-grid">

      <div class="project-card">
        <h3>Project Title One</h3>
        <p data-i18n-en="A brief description of what this project does and why it matters. One to two sentences." data-i18n-zh="简要描述这个项目的功能和意义。一到两句话。">A brief description of what this project does and why it matters. One to two sentences.</p>
        <div class="project-tags">
          <span class="tag">Python</span>
          <span class="tag">PyTorch</span>
          <span class="tag">ROS2</span>
        </div>
        <div class="project-links">
          <a href="#" target="_blank">GitHub</a>
          <a href="#" target="_blank">Paper</a>
        </div>
      </div>

      <div class="project-card">
        <h3>Project Title Two</h3>
        <p data-i18n-en="A brief description of what this project does and why it matters. One to two sentences." data-i18n-zh="简要描述这个项目的功能和意义。一到两句话。">A brief description of what this project does and why it matters. One to two sentences.</p>
        <div class="project-tags">
          <span class="tag">C++</span>
          <span class="tag">CUDA</span>
        </div>
        <div class="project-links">
          <a href="#" target="_blank">GitHub</a>
          <a href="#" target="_blank">Demo</a>
        </div>
      </div>

      <div class="project-card">
        <h3>Project Title Three</h3>
        <p data-i18n-en="A brief description of what this project does and why it matters. One to two sentences." data-i18n-zh="简要描述这个项目的功能和意义。一到两句话。">A brief description of what this project does and why it matters. One to two sentences.</p>
        <div class="project-tags">
          <span class="tag">Python</span>
          <span class="tag">LLM</span>
        </div>
        <div class="project-links">
          <a href="#" target="_blank">GitHub</a>
        </div>
      </div>

      <div class="project-card">
        <h3>Project Title Four</h3>
        <p data-i18n-en="A brief description of what this project does and why it matters. One to two sentences." data-i18n-zh="简要描述这个项目的功能和意义。一到两句话。">A brief description of what this project does and why it matters. One to two sentences.</p>
        <div class="project-tags">
          <span class="tag">Python</span>
          <span class="tag">Sim2Real</span>
        </div>
        <div class="project-links">
          <a href="#" target="_blank">GitHub</a>
          <a href="#" target="_blank">Paper</a>
        </div>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Add projects CSS to `css/style.css`**

```css
/* === Projects === */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.project-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: box-shadow 0.2s ease;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.project-card h3 {
  margin-bottom: 8px;
}

.project-card p {
  font-size: 0.9375rem;
  margin-bottom: 16px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 2px 10px;
  background: var(--color-card-bg);
  border-radius: 4px;
  color: var(--color-text-secondary);
}

.project-links {
  display: flex;
  gap: 16px;
}

.project-links a {
  font-size: 0.875rem;
  font-weight: 500;
}
```

**Step 3: Verify in browser**

Expected: 2-column grid of project cards, each with title, description, tags, and links. Cards have hover shadow effect.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add projects section with card grid layout"
```

---

### Task 7: Publications Section

**Files:**
- Modify: `index.html` (add publications HTML after projects)
- Modify: `css/style.css` (add publication styles)

**Step 1: Add publications HTML to `index.html`** (after projects `</section>`)

```html
<section id="publications" class="section-fade">
  <div class="container">
    <h2 data-i18n-en="Publications" data-i18n-zh="论文发表">Publications</h2>
    <ul class="pub-list">

      <li class="pub-item">
        <p class="pub-title">Paper Title: A Long and Descriptive Academic Paper Title</p>
        <p class="pub-authors"><strong>Your Name</strong>, Co-Author One, Co-Author Two</p>
        <p class="pub-venue">Conference Name (CONF), 2025</p>
        <div class="pub-links">
          <a href="#" target="_blank">PDF</a>
          <a href="#" target="_blank">ArXiv</a>
          <a href="#" target="_blank">Code</a>
        </div>
      </li>

      <li class="pub-item">
        <p class="pub-title">Another Paper Title About Embodied Intelligence</p>
        <p class="pub-authors">Co-Author One, <strong>Your Name</strong>, Co-Author Three</p>
        <p class="pub-venue">Journal Name, 2024</p>
        <div class="pub-links">
          <a href="#" target="_blank">PDF</a>
          <a href="#" target="_blank">DOI</a>
        </div>
      </li>

    </ul>
  </div>
</section>
```

**Step 2: Add publications CSS to `css/style.css`**

```css
/* === Publications === */
.pub-list {
  list-style: none;
}

.pub-item {
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);
}

.pub-item:first-child {
  padding-top: 0;
}

.pub-item:last-child {
  border-bottom: none;
}

.pub-title {
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.pub-authors {
  font-size: 0.9375rem;
  margin-bottom: 2px;
}

.pub-authors strong {
  color: var(--color-accent);
}

.pub-venue {
  font-size: 0.875rem;
  font-style: italic;
  margin-bottom: 8px;
}

.pub-links {
  display: flex;
  gap: 16px;
}

.pub-links a {
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.pub-links a:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

**Step 3: Verify in browser**

Expected: Clean list of publications with title in bold, author name highlighted in accent color, venue in italics, and link buttons.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add publications section with clean list style"
```

---

### Task 8: Experience Timeline Section

**Files:**
- Modify: `index.html` (add experience HTML after publications)
- Modify: `css/style.css` (add timeline styles)

**Step 1: Add experience HTML to `index.html`** (after publications `</section>`)

```html
<section id="experience" class="section-fade">
  <div class="container">
    <h2 data-i18n-en="Experience" data-i18n-zh="经历">Experience</h2>
    <div class="timeline">

      <div class="timeline-item">
        <div class="timeline-date">2024 — Present</div>
        <div class="timeline-content">
          <h3 data-i18n-en="Research Engineer" data-i18n-zh="研究工程师">Research Engineer</h3>
          <p class="timeline-org" data-i18n-en="Company / Lab Name" data-i18n-zh="公司/实验室名称">Company / Lab Name</p>
          <p data-i18n-en="Working on embodied AI systems, integrating perception and manipulation." data-i18n-zh="从事具身AI系统开发，整合感知与操作能力。">Working on embodied AI systems, integrating perception and manipulation.</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">2021 — 2024</div>
        <div class="timeline-content">
          <h3 data-i18n-en="M.S. in Computer Science" data-i18n-zh="计算机科学硕士">M.S. in Computer Science</h3>
          <p class="timeline-org" data-i18n-en="University Name" data-i18n-zh="大学名称">University Name</p>
          <p data-i18n-en="Research focus on robot learning and computer vision." data-i18n-zh="研究方向为机器人学习和计算机视觉。">Research focus on robot learning and computer vision.</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-date">2017 — 2021</div>
        <div class="timeline-content">
          <h3 data-i18n-en="B.S. in Computer Science" data-i18n-zh="计算机科学学士">B.S. in Computer Science</h3>
          <p class="timeline-org" data-i18n-en="University Name" data-i18n-zh="大学名称">University Name</p>
          <p data-i18n-en="Foundation in algorithms, systems, and AI fundamentals." data-i18n-zh="打下算法、系统和人工智能基础。">Foundation in algorithms, systems, and AI fundamentals.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Add timeline CSS to `css/style.css`**

```css
/* === Timeline === */
.timeline {
  position: relative;
  padding-left: 140px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 120px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-bottom: 40px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -24px;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
}

.timeline-date {
  position: absolute;
  left: -140px;
  top: 0;
  width: 100px;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  text-align: right;
}

.timeline-content h3 {
  margin-bottom: 2px;
}

.timeline-org {
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
}

.timeline-content > p:last-child {
  font-size: 0.9375rem;
}
```

**Step 3: Verify in browser**

Expected: Vertical timeline with dates on left, blue dots as markers, and content blocks on right.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add experience section with vertical timeline"
```

---

### Task 9: Footer

**Files:**
- Modify: `index.html` (add footer HTML after experience)
- Modify: `css/style.css` (add footer styles)

**Step 1: Add footer HTML to `index.html`** (after experience `</section>`, before `<script>`)

```html
<footer class="footer">
  <div class="container">
    <p data-i18n-en="Built with HTML, CSS &amp; JS" data-i18n-zh="使用 HTML、CSS 和 JS 构建">Built with HTML, CSS &amp; JS</p>
    <p>&copy; 2025 Your Name</p>
  </div>
</footer>
```

**Step 2: Add footer CSS to `css/style.css`**

```css
/* === Footer === */
.footer {
  padding: 48px 24px;
  text-align: center;
  border-top: 1px solid var(--color-border);
}

.footer p {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}
```

**Step 3: Verify in browser**

Expected: Minimal footer at bottom with two centered lines of text, separated from content by a thin border.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add minimal footer"
```

---

### Task 10: Bilingual (i18n) JavaScript

**Files:**
- Modify: `js/main.js`

**Step 1: Write the i18n toggle logic in `js/main.js`**

```js
// === i18n ===
const LANG_KEY = 'site-lang';
const langToggle = document.getElementById('langToggle');

function getStoredLang() {
  return localStorage.getItem(LANG_KEY) || 'en';
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n-en]').forEach(el => {
    const text = el.getAttribute(`data-i18n-${lang}`);
    if (text) el.textContent = text;
  });

  langToggle.textContent = lang === 'en' ? 'EN' : '中';
}

langToggle.addEventListener('click', () => {
  const current = getStoredLang();
  setLang(current === 'en' ? 'zh' : 'en');
});

// Initialize language on load
setLang(getStoredLang());
```

**Step 2: Verify in browser**

Expected: Clicking "EN" button switches all text to Chinese, button changes to "中". Clicking again switches back. Refresh page preserves choice.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add bilingual i18n toggle with localStorage persistence"
```

---

### Task 11: Scroll Animations & Nav Interactions

**Files:**
- Modify: `js/main.js` (add scroll logic)

**Step 1: Add scroll-based interactions to `js/main.js`**

```js
// === Nav scroll shadow ===
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// === Section fade-in on scroll ===
const faders = document.querySelectorAll('.section-fade');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

faders.forEach(section => fadeObserver.observe(section));
```

**Step 2: Verify in browser**

Expected: Scrolling down reveals sections with a subtle fade-in. Nav gets a thin bottom shadow when scrolled.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add scroll fade-in animations and nav shadow"
```

---

### Task 12: Responsive Design

**Files:**
- Modify: `css/style.css` (add media queries)

**Step 1: Add responsive styles at the bottom of `css/style.css`**

```css
/* === Responsive === */
@media (max-width: 768px) {
  :root {
    --section-padding: 64px 20px;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; margin-bottom: 32px; }

  .nav-inner {
    padding: 0 20px;
  }

  .nav-links {
    gap: 20px;
  }

  .nav-links a {
    font-size: 0.8125rem;
  }

  .hero-grid {
    flex-direction: column-reverse;
    text-align: center;
  }

  .hero-links {
    justify-content: center;
  }

  .hero-photo-placeholder,
  .hero-photo img {
    width: 150px;
    height: 150px;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .timeline {
    padding-left: 0;
  }

  .timeline::before {
    left: 0;
  }

  .timeline-item::before {
    left: -4px;
  }

  .timeline-date {
    position: static;
    width: auto;
    text-align: left;
    margin-bottom: 4px;
  }
}

@media (max-width: 480px) {
  .nav-links a:not(.lang-toggle) {
    display: none;
  }

  h1 { font-size: 1.75rem; }
}
```

**Step 2: Verify in browser**

Open DevTools, toggle device toolbar. Test at 768px and 480px widths.

Expected at 768px: Hero stacks vertically (photo on top), project grid is single column, timeline loses left positioning.

Expected at 480px: Nav links hidden (only language toggle remains), smaller heading size.

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add responsive design for tablet and mobile"
```

---

### Task 13: GitHub Pages Deployment Setup

**Files:**
- Create: `.nojekyll` (empty file, tells GitHub Pages not to process with Jekyll)
- Create: `.gitignore`

**Step 1: Create `.nojekyll` and `.gitignore`**

`.nojekyll`: empty file

`.gitignore`:
```
.DS_Store
Thumbs.db
*.swp
*~
```

**Step 2: Commit**

```bash
git add .nojekyll .gitignore
git commit -m "feat: add GitHub Pages deployment config"
```

**Step 3: Deployment instructions** (inform user, do not execute)

1. Create a GitHub repository named `yourusername.github.io`
2. Add remote: `git remote add origin git@github.com:yourusername/yourusername.github.io.git`
3. Push: `git push -u origin master`
4. Go to repo Settings > Pages > Source: Deploy from branch `master` / root
5. Site will be live at `https://yourusername.github.io`

---

## Summary

| Task | Description | Est. |
|------|-------------|------|
| 1 | Project scaffolding | 2 min |
| 2 | CSS foundation | 5 min |
| 3 | Navigation bar | 5 min |
| 4 | Hero section | 5 min |
| 5 | About section | 3 min |
| 6 | Projects section | 5 min |
| 7 | Publications section | 5 min |
| 8 | Experience timeline | 5 min |
| 9 | Footer | 2 min |
| 10 | Bilingual i18n JS | 5 min |
| 11 | Scroll animations | 3 min |
| 12 | Responsive design | 5 min |
| 13 | GitHub Pages setup | 2 min |

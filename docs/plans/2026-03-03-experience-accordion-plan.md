# Experience Accordion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add expandable details (job descriptions + skill tags) to all 5 experience timeline entries with accordion behavior and smooth animation.

**Architecture:** CSS class toggle (`.expanded`) on `.timeline-item` controls visibility of a new `.timeline-details` div via `max-height`/`opacity` transition. JS handles click events, accordion logic (close others), and keyboard accessibility.

**Tech Stack:** Vanilla HTML5, CSS3 transitions, ES6+ JavaScript (no dependencies)

---

### Task 1: Add accordion CSS styles

**Files:**
- Modify: `css/style.css:474-496` (timeline section)

**Step 1: Add the new CSS rules after the existing `.timeline-content > p:last-child` rule (line 496) and before `/* === Lightbox === */` (line 498)**

Insert at `css/style.css:497`:

```css
.timeline-header {
  cursor: pointer;
  user-select: none;
}

.expand-icon {
  margin-left: auto;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--color-text-secondary);
}

.timeline-item.expanded .expand-icon {
  transform: rotate(180deg);
}

.timeline-details {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.timeline-item.expanded .timeline-details {
  max-height: 300px;
  opacity: 1;
}

.timeline-details > p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin-top: 8px;
  line-height: 1.6;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
```

**Note:** The existing `.timeline-header` rule at line 474 already has `display: flex; align-items: center; gap: 12px; margin-bottom: 8px;`. We add `cursor: pointer` and `user-select: none` to it. Rather than duplicating the block, merge these two properties into the existing rule at line 474-479.

**Step 2: Verify no CSS conflicts**

Open `index.html` in browser, confirm experience section still renders correctly (no visual changes yet since HTML hasn't changed).

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add accordion CSS styles for experience timeline"
```

---

### Task 2: Update HTML for all 5 timeline entries

**Files:**
- Modify: `index.html:241-305` (experience section timeline items)

**Step 1: Update each of the 5 timeline items**

For each `.timeline-item`, make these changes:
1. Add `role="button"`, `tabindex="0"`, `aria-expanded="false"`, `aria-controls="exp-{id}"` to `.timeline-header`
2. Add expand-icon SVG as last child of `.timeline-header`
3. Add `.timeline-details` div after `.timeline-header` inside `.timeline-content`

The expand-icon SVG to use in every header:
```html
<svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
```

**Entry 1: Astribot Full-time (lines 241-252)**

Replace lines 241-252 with:
```html
        <div class="timeline-item">
          <div class="timeline-date" data-i18n-en="Jul 2025 — Present" data-i18n-zh="2025.07 — 至今">Jul 2025 — Present</div>
          <div class="timeline-content">
            <div class="timeline-header" role="button" tabindex="0" aria-expanded="false" aria-controls="exp-astribot-ft">
              <img src="assets/images/astribot-logo.png" alt="Astribot" class="timeline-logo">
              <div>
                <h3 data-i18n-en="Embodied Intelligence Algorithm Engineer" data-i18n-zh="具身智能算法工程师">Embodied Intelligence Algorithm Engineer</h3>
                <p class="timeline-org" data-i18n-en="Astribot, Shenzhen" data-i18n-zh="星尘智能，深圳">Astribot, Shenzhen</p>
              </div>
              <svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
            </div>
            <div class="timeline-details" id="exp-astribot-ft">
              <p data-i18n-en="Developing embodied intelligence algorithms for humanoid robots." data-i18n-zh="研发人形机器人具身智能算法。">Developing embodied intelligence algorithms for humanoid robots.</p>
              <div class="skill-tags">
                <span class="skill-tag">Python</span>
                <span class="skill-tag">PyTorch</span>
                <span class="skill-tag">Robotics</span>
              </div>
            </div>
          </div>
        </div>
```

**Entry 2: Astribot Intern (lines 254-265)**

Replace with:
```html
        <div class="timeline-item">
          <div class="timeline-date" data-i18n-en="Jun 2024 — Jun 2025" data-i18n-zh="2024.06 — 2025.06">Jun 2024 — Jun 2025</div>
          <div class="timeline-content">
            <div class="timeline-header" role="button" tabindex="0" aria-expanded="false" aria-controls="exp-astribot-intern">
              <img src="assets/images/astribot-logo.png" alt="Astribot" class="timeline-logo">
              <div>
                <h3 data-i18n-en="Embodied Intelligence Algorithm Intern" data-i18n-zh="具身智能算法实习生">Embodied Intelligence Algorithm Intern</h3>
                <p class="timeline-org" data-i18n-en="Astribot, Shenzhen" data-i18n-zh="星尘智能，深圳">Astribot, Shenzhen</p>
              </div>
              <svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
            </div>
            <div class="timeline-details" id="exp-astribot-intern">
              <p data-i18n-en="Research and development of embodied intelligence algorithms." data-i18n-zh="具身智能算法研发。">Research and development of embodied intelligence algorithms.</p>
              <div class="skill-tags">
                <span class="skill-tag">Python</span>
                <span class="skill-tag">PyTorch</span>
                <span class="skill-tag">Robotics</span>
              </div>
            </div>
          </div>
        </div>
```

**Entry 3: Ph.D. (lines 267-279)**

Replace with (note: move existing research description into timeline-details):
```html
        <div class="timeline-item">
          <div class="timeline-date" data-i18n-en="Sep 2020 — Jun 2025" data-i18n-zh="2020.09 — 2025.06">Sep 2020 — Jun 2025</div>
          <div class="timeline-content">
            <div class="timeline-header" role="button" tabindex="0" aria-expanded="false" aria-controls="exp-phd">
              <img src="assets/images/scut-logo.png" alt="SCUT" class="timeline-logo">
              <div>
                <h3 data-i18n-en="Ph.D. in Computer Science (Combined M.S./Ph.D.)" data-i18n-zh="计算机科学与技术博士（硕博连读）">Ph.D. in Computer Science (Combined M.S./Ph.D.)</h3>
                <p class="timeline-org" data-i18n-en="South China University of Technology, School of Computer Science and Engineering" data-i18n-zh="华南理工大学 计算机科学与工程学院">South China University of Technology, School of Computer Science and Engineering</p>
              </div>
              <svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
            </div>
            <div class="timeline-details" id="exp-phd">
              <p data-i18n-en="Research on embodied intelligence and computer vision, advised by Prof. Ping Zhang." data-i18n-zh="研究方向为具身智能和计算机视觉，导师为张平教授。">Research on embodied intelligence and computer vision, advised by Prof. Ping Zhang.</p>
              <div class="skill-tags">
                <span class="skill-tag">Computer Vision</span>
                <span class="skill-tag">Deep Learning</span>
                <span class="skill-tag">PyTorch</span>
              </div>
            </div>
          </div>
        </div>
```

**Entry 4: HYNN Mechanical Engineer (lines 281-292)**

Replace with:
```html
        <div class="timeline-item">
          <div class="timeline-date" data-i18n-en="Jul 2018 — Jun 2019" data-i18n-zh="2018.07 — 2019.06">Jul 2018 — Jun 2019</div>
          <div class="timeline-content">
            <div class="timeline-header" role="button" tabindex="0" aria-expanded="false" aria-controls="exp-hynn">
              <img src="assets/images/hynn-logo.png" alt="HYNN" class="timeline-logo">
              <div>
                <h3 data-i18n-en="Mechanical Engineer" data-i18n-zh="机械工程师">Mechanical Engineer</h3>
                <p class="timeline-org" data-i18n-en="Guangdong HYNN Technology Co., Ltd." data-i18n-zh="广东恒翼能科技股份有限公司">Guangdong HYNN Technology Co., Ltd.</p>
              </div>
              <svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
            </div>
            <div class="timeline-details" id="exp-hynn">
              <p data-i18n-en="Mechanical design and engineering." data-i18n-zh="机械设计与工程。">Mechanical design and engineering.</p>
              <div class="skill-tags">
                <span class="skill-tag">SolidWorks</span>
                <span class="skill-tag">AutoCAD</span>
                <span class="skill-tag">Mechanical Design</span>
              </div>
            </div>
          </div>
        </div>
```

**Entry 5: B.E. (lines 294-305)**

Replace with:
```html
        <div class="timeline-item">
          <div class="timeline-date" data-i18n-en="Sep 2014 — Jun 2018" data-i18n-zh="2014.09 — 2018.06">Sep 2014 — Jun 2018</div>
          <div class="timeline-content">
            <div class="timeline-header" role="button" tabindex="0" aria-expanded="false" aria-controls="exp-be">
              <img src="assets/images/scut-logo.png" alt="SCUT" class="timeline-logo">
              <div>
                <h3 data-i18n-en="B.E. in Mechanical Engineering" data-i18n-zh="机械工程学士">B.E. in Mechanical Engineering</h3>
                <p class="timeline-org" data-i18n-en="South China University of Technology, School of Mechanical and Automotive Engineering" data-i18n-zh="华南理工大学 机械与汽车工程学院">South China University of Technology, School of Mechanical and Automotive Engineering</p>
              </div>
              <svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
            </div>
            <div class="timeline-details" id="exp-be">
              <p data-i18n-en="Undergraduate studies in mechanical engineering." data-i18n-zh="机械工程本科学习。">Undergraduate studies in mechanical engineering.</p>
              <div class="skill-tags">
                <span class="skill-tag">Mechanical Engineering</span>
                <span class="skill-tag">MATLAB</span>
              </div>
            </div>
          </div>
        </div>
```

**Step 2: Open in browser and verify**

Open `index.html` — experience items should show headers with chevron arrows. Details should be hidden (max-height: 0). Clicking doesn't work yet (no JS).

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add expandable details and skill tags to all experience entries"
```

---

### Task 3: Add accordion JavaScript

**Files:**
- Modify: `js/main.js` (append after lightbox section, before end of file — after line 89)

**Step 1: Add accordion JS at end of `js/main.js`**

Append after line 89:

```javascript

// === Timeline accordion ===
document.querySelectorAll('.timeline-header[role="button"]').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.timeline-item');
    const isExpanded = item.classList.contains('expanded');

    // Accordion: close all open items
    document.querySelectorAll('.timeline-item.expanded').forEach(openItem => {
      openItem.classList.remove('expanded');
      openItem.querySelector('.timeline-header').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked item (open if was closed)
    if (!isExpanded) {
      item.classList.add('expanded');
      header.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard: Enter/Space
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});
```

**Step 2: Test in browser**

1. Open `index.html`
2. Click first experience header → details expand with animation, chevron rotates
3. Click second header → first closes, second opens (accordion)
4. Click same header again → it closes
5. Press Tab to focus a header, press Enter → it expands
6. Press Space on focused header → it toggles
7. Toggle language to Chinese → expanded details show Chinese text
8. Verify mobile view (resize to <768px) → logos hidden, accordion still works

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add accordion JS for experience timeline with keyboard support"
```

---

### Task 4: Final visual polish and responsive check

**Files:**
- Possibly modify: `css/style.css` (responsive section at line 586-592)

**Step 1: Check if mobile responsive adjustments are needed**

Open browser at 768px width. Verify:
- Chevron icon still visible and properly aligned when logo is hidden
- Skill tags wrap nicely on small screens
- Expanded content doesn't overflow

If the expand icon looks misaligned on mobile (since logo is `display: none`), no changes should be needed since the icon uses `margin-left: auto` which works regardless of logo presence.

**Step 2: Test the full flow**

1. Desktop: click each of the 5 items, verify accordion, animation, chevron rotation
2. Mobile (< 768px): same checks
3. Language toggle while expanded: text switches correctly
4. Keyboard navigation: Tab through all headers, Enter/Space to toggle

**Step 3: Commit (only if changes were made)**

```bash
git add css/style.css
git commit -m "fix: adjust accordion styles for mobile responsiveness"
```

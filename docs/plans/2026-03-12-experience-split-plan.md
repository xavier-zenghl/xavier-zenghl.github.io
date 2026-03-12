# Experience Split Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Split the mixed experience timeline into separate work and education subgroups within the existing experience section.

**Architecture:** Keep the current single-page structure and accordion behavior. Reorganize the experience HTML into two grouped timelines, add minimal CSS for subgroup headings and spacing, and verify the structure with a lightweight regression test that reads local files.

**Tech Stack:** HTML5, CSS3, ES6, Python 3 `unittest`

---

### Task 1: Add a failing regression test for grouped experience structure

**Files:**
- Create: `tests/test_experience_section.py`
- Test: `tests/test_experience_section.py`

**Step 1: Write the failing test**

```python
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = (ROOT / "index.html").read_text(encoding="utf-8")
STYLE_CSS = (ROOT / "css" / "style.css").read_text(encoding="utf-8")


class ExperienceSectionTest(unittest.TestCase):
    def test_experience_section_is_split_into_work_and_education_groups(self):
        self.assertIn('class="experience-group"', INDEX_HTML)
        self.assertIn('data-i18n-en="Work Experience"', INDEX_HTML)
        self.assertIn('data-i18n-en="Education"', INDEX_HTML)

        work_pos = INDEX_HTML.index('data-i18n-en="Work Experience"')
        edu_pos = INDEX_HTML.index('data-i18n-en="Education"')
        self.assertLess(work_pos, edu_pos)

    def test_entries_are_classified_into_the_correct_groups(self):
        work_start = INDEX_HTML.index('data-i18n-en="Work Experience"')
        edu_start = INDEX_HTML.index('data-i18n-en="Education"')
        work_block = INDEX_HTML[work_start:edu_start]
        edu_block = INDEX_HTML[edu_start:]

        self.assertIn("Astribot, Shenzhen", work_block)
        self.assertIn("Guangdong HYNN Technology Co., Ltd.", work_block)
        self.assertNotIn("Ph.D. in Computer Science", work_block)

        self.assertIn("Ph.D. in Computer Science", edu_block)
        self.assertIn("B.E. in Mechanical Engineering", edu_block)
        self.assertNotIn("Astribot, Shenzhen", edu_block)

    def test_css_contains_group_heading_styles(self):
        self.assertIn(".experience-group", STYLE_CSS)
        self.assertIn(".experience-group-title", STYLE_CSS)
```

**Step 2: Run test to verify it fails**

Run: `python3 -m unittest tests/test_experience_section.py -v`
Expected: FAIL because grouped experience markup and styles do not exist yet.

**Step 3: Commit**

```bash
git add tests/test_experience_section.py
git commit -m "test: add regression coverage for grouped experience section"
```

### Task 2: Reorganize the experience HTML into grouped timelines

**Files:**
- Modify: `index.html`
- Test: `tests/test_experience_section.py`

**Step 1: Write the minimal implementation**

- Keep the existing `section id="experience"`.
- Add two `.experience-group` wrappers.
- Add subgroup headings with bilingual labels:
  - `Work Experience / 工作经历`
  - `Education / 教育经历`
- Move Astribot and HYNN into the work subgroup timeline.
- Move both SCUT degrees into the education subgroup timeline.
- Preserve existing accordion markup and attributes on each entry.

**Step 2: Run the regression test**

Run: `python3 -m unittest tests/test_experience_section.py -v`
Expected: PASS for structure assertions, or fail only on missing CSS group styles.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: split experience section into work and education groups"
```

### Task 3: Add minimal CSS for subgroup layout

**Files:**
- Modify: `css/style.css`
- Test: `tests/test_experience_section.py`

**Step 1: Write the minimal implementation**

- Add `.experience-groups` wrapper spacing if needed.
- Add `.experience-group` spacing between the two grouped timelines.
- Add `.experience-group-title` styles that visually subordinate subgroup headings under the main section title.
- Keep existing timeline layout unchanged.

**Step 2: Run the regression test**

Run: `python3 -m unittest tests/test_experience_section.py -v`
Expected: PASS

**Step 3: Manual verification**

Open `index.html` in a browser and verify:
- `Work Experience / 工作经历` appears before `Education / 教育经历`
- accordion expand/collapse still works for all entries
- EN/ZH toggle updates subgroup headings
- mobile layout remains aligned

**Step 4: Commit**

```bash
git add css/style.css
git commit -m "style: add grouped experience section headings and spacing"
```

### Task 4: Final verification

**Files:**
- Verify: `index.html`
- Verify: `css/style.css`
- Verify: `js/main.js`
- Verify: `tests/test_experience_section.py`

**Step 1: Run automated verification**

Run: `python3 -m unittest tests/test_experience_section.py -v`
Expected: PASS

**Step 2: Run git diff review**

Run: `git diff -- index.html css/style.css tests/test_experience_section.py`
Expected: Only grouped experience HTML/CSS plus regression test changes.

**Step 3: Commit**

```bash
git add index.html css/style.css tests/test_experience_section.py
git commit -m "feat: separate experience into work and education groups"
```

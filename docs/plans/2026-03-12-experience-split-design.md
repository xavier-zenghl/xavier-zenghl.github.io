# Experience Split Design

**Date:** 2026-03-12
**Status:** Approved

## Goal

Restructure the existing mixed experience timeline into two clearly separated subgroups inside the same `Experience / 经历` section: `Work Experience / 工作经历` and `Education / 教育经历`.

## Design Decisions

- **Section structure:** Keep the existing `#experience` anchor and main section heading. Do not add new nav items.
- **Grouping:** Split entries into two subgroups within the section.
- **Order:** Show `Work Experience / 工作经历` first, then `Education / 教育经历`.
- **Entry layout:** Reuse the existing timeline item layout, date column, logo treatment, accordion details, and skill tags.
- **Interaction:** Keep current accordion behavior and keyboard accessibility unchanged.
- **Content scope:** Reclassify existing entries only. No new entries, no copy rewrites.

## Information Architecture

### Work Experience / 工作经历

- Astribot, Shenzhen
- Guangdong HYNN Technology Co., Ltd.

### Education / 教育经历

- South China University of Technology, School of Computer Science and Engineering
- South China University of Technology, School of Mechanical and Automotive Engineering

## Visual Treatment

- Add subgroup headings that are visually subordinate to the main `Experience` heading.
- Create spacing between the two subgroups so the split reads clearly without adding heavy containers or new interaction patterns.
- Reuse the current timeline styles wherever possible to preserve the site's existing minimalist visual language.

## Accessibility

- Preserve `role="button"`, `tabindex`, `aria-expanded`, and `aria-controls` on each accordion header.
- Preserve keyboard activation via Enter and Space.
- Add bilingual subgroup titles through existing `data-i18n-en` and `data-i18n-zh` attributes.

## Validation

- Confirm `Work Experience / 工作经历` renders before `Education / 教育经历`.
- Confirm Astribot and HYNN render only inside the work subgroup.
- Confirm both SCUT degrees render only inside the education subgroup.
- Confirm accordion behavior still works for all entries.
- Confirm EN/ZH language toggle updates the new subgroup headings.
- Confirm mobile spacing and alignment remain stable.

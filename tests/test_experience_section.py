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


if __name__ == "__main__":
    unittest.main()

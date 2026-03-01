#!/usr/bin/env python3
import json
import os
import re


def update_readme():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    readme_path = os.path.join(base_dir, "README.md")
    index_path = os.path.join(base_dir, "skills_index.json")

    print(f"📖 Reading skills index from: {index_path}")
    with open(index_path, "r", encoding="utf-8") as f:
        skills = json.load(f)

    total_skills = len(skills)
    print(f"🔢 Total skills found: {total_skills}")

    print(f"📝 Updating README at: {readme_path}")
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Title Count (Infinity Skills or Antigravity Awesome Skills)
    content = re.sub(
        r"(# 🌌 (?:Infinity|Antigravity Awesome) Skills: )\d+(\+ Agentic Skills)",
        rf"\g<1>{total_skills}\g<2>",
        content,
    )

    # 2. Update badge count (Infinity Skills badge URL)
    content = re.sub(
        r"(Infinity%20Skills-)\d+(\+-red)",
        rf"\g<1>{total_skills}\g<2>",
        content,
    )

    # 3. Update Blockquote Count
    content = re.sub(
        r"(Collection of )\d+(\+ Universal)",
        rf"\g<1>{total_skills}\g<2>",
        content,
    )

    # 4. Update Intro Text Count (e.g. "950 high-performance" or "950+")
    content = re.sub(
        r"(library of \*\*)\d+( high-performance agentic skills\*\*)",
        rf"\g<1>{total_skills}\g<2>",
        content,
    )

    # 5. Update Browse section header
    content = re.sub(
        r"## Browse \d+\+ Skills",
        f"## Browse {total_skills}+ Skills",
        content,
    )

    # 6. Update TOC link for Browse (anchor matches header-derived slug)
    content = re.sub(
        r"\[📚 Browse \d+\+ Skills\]\(#browse-\d+-skills\)",
        f"[📚 Browse {total_skills}+ Skills](#browse-{total_skills}-skills)",
        content,
    )

    # 7. "picking from N+ skills" (bundles section)
    content = re.sub(
        r"picking from \d+\+ skills one by one",
        f"picking from {total_skills}+ skills one by one",
        content,
    )

    # 8. "950+ skills" in web app paragraph
    content = re.sub(
        r"use the \d+\+ skills directly from your browser",
        f"use the {total_skills}+ skills directly from your browser",
        content,
    )

    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("✅ README.md updated successfully.")


if __name__ == "__main__":
    update_readme()

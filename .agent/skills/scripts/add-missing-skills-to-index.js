#!/usr/bin/env node
/**
 * Add skills that exist on disk but are missing from skills_index.json.
 * Use when generate_index.py can't run (e.g. no Python yaml). Reads SKILL.md
 * and parses frontmatter with regex, then appends to index and sorts.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const INDEX_PATH = path.join(ROOT, 'skills_index.json');

function walkDir(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.')) {
      walkDir(full, fileList);
    } else if (e.name === 'SKILL.md') {
      fileList.push(path.dirname(full));
    }
  }
  return fileList;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const block = match[1];
  const out = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1).replace(/\\"/g, '"');
      out[m[1]] = val;
    }
  }
  return out;
}

function getFirstParagraph(body) {
  const lines = body.split('\n');
  const desc = [];
  for (const line of lines) {
    if (line.startsWith('#') || !line.trim()) {
      if (desc.length) break;
      continue;
    }
    desc.push(line.trim());
  }
  return desc.join(' ').slice(0, 250).trim();
}

const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
const existingIds = new Set(index.map((s) => s.id));

const skillDirs = walkDir(SKILLS_DIR);
const missing = [];
for (const dir of skillDirs) {
  const skillDir = path.relative(ROOT, dir).split(path.sep).join('/');
  const id = path.basename(dir);
  if (existingIds.has(id)) continue;
  const skillPath = path.join(dir, 'SKILL.md');
  let content;
  try {
    content = fs.readFileSync(skillPath, 'utf8');
  } catch (e) {
    console.warn('Skip (read error):', skillPath);
    continue;
  }
  const meta = parseFrontmatter(content);
  let body = content;
  const fmMatch = content.match(/^---\s*\n[\s\S]*?\n---\s*\n?/);
  if (fmMatch) body = content.slice(fmMatch[0].length).trim();
  const description = meta.description || getFirstParagraph(body) || '';
  const parentDir = path.basename(path.dirname(dir));
  let category = meta.category;
  if (category === undefined) category = parentDir === 'skills' ? 'uncategorized' : parentDir;
  missing.push({
    id,
    path: skillDir,
    category: category || 'uncategorized',
    name: meta.name || id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    description,
    risk: meta.risk || 'unknown',
    source: meta.source || 'community',
    date_added: meta.date_added || null,
  });
}

if (missing.length === 0) {
  console.log('No missing skills. Index is up to date.');
  process.exit(0);
}

const combined = [...index, ...missing];
combined.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()) || a.id.localeCompare(b.id));
fs.writeFileSync(INDEX_PATH, JSON.stringify(combined, null, 2), 'utf8');
console.log(`Added ${missing.length} skill(s) to skills_index.json: ${missing.map((s) => s.id).join(', ')}`);
console.log(`Total skills in index: ${combined.length}`);

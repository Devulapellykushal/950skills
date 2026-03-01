const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const indexPath = path.join(ROOT, 'skills_index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const existing = new Set(index.map((s) => s.id));

function parseFrontmatter(content) {
  const m = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split('\n')) {
    const r = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (r) {
      let v = r[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
        v = v.slice(1, -1);
      out[r[1]] = v;
    }
  }
  return out;
}

const toAdd = [
  { dir: 'docx', relPath: 'skills/docx' },
  { dir: 'pdf', relPath: 'skills/pdf' },
  { dir: 'pptx', relPath: 'skills/pptx' },
  { dir: 'xlsx', relPath: 'skills/xlsx' },
  { dir: '10-andruia-skill-smith', relPath: 'skills/10-andruia-skill-smith' },
];

for (const { dir, relPath } of toAdd) {
  if (existing.has(dir)) {
    console.log('Already in index:', dir);
    continue;
  }
  const skillDir = path.join(ROOT, relPath);
  const mdPath = path.join(skillDir, 'SKILL.md');
  const mdPathUpper = path.join(skillDir, 'SKILL.MD');
  let content;
  try {
    content = fs.readFileSync(mdPath, 'utf8');
  } catch (e) {
    try {
      content = fs.readFileSync(mdPathUpper, 'utf8');
    } catch (e2) {
      console.log('Skip (no file):', dir);
      continue;
    }
  }
  const meta = parseFrontmatter(content);
  if (!meta) {
    console.log('Skip (no frontmatter):', dir);
    continue;
  }
  const parent = path.basename(path.dirname(relPath));
  index.push({
    id: dir,
    path: relPath,
    category: meta.category || (parent === 'skills' ? 'uncategorized' : parent),
    name: meta.name || dir,
    description: meta.description || '',
    risk: meta.risk || 'unknown',
    source: meta.source || 'community',
    date_added: meta.date_added || null,
  });
  console.log('Added:', dir);
}

index.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()) || a.id.localeCompare(b.id));
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log('Total in index:', index.length);

/**
 * Copies the repo's skills/ folder into public/skills/ so that
 * production build (and preview) can serve /skills/{path}/SKILL.md.
 * Run before: npm run build
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../');
const srcDir = path.join(root, '../skills');
const destDir = path.join(root, 'public/skills');

if (!fs.existsSync(srcDir)) {
  console.warn('⚠️ skills dir not found at', srcDir);
  process.exit(0);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(srcDir, destDir);
console.log('✅ Copied skills into public/skills');

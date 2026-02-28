import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Serves SKILL.md files from the parent repo's skills/ folder so that
 * /skills/{path}/SKILL.md returns the real markdown instead of index.html.
 */
export default function serveSkillsPlugin() {
  const skillsDir = path.resolve(__dirname, '../skills');
  return {
    name: 'serve-skills-md',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0] || '';
        const match = pathname.match(/^\/skills\/(.+)\/SKILL\.md$/);
        if (!match) return next();
        const relativePath = match[1];
        if (relativePath.includes('..')) return next();
        const filePath = path.join(skillsDir, relativePath, 'SKILL.md');
        if (!fs.existsSync(filePath)) return next();
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.end(fs.readFileSync(filePath, 'utf-8'));
      });
    },
  };
}

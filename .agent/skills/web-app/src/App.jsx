import { useEffect, useState } from 'react';
import { BookOpen, Github, Moon, Sun } from 'lucide-react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SkillDetail } from './pages/SkillDetail';
import { applyThemeToDocument, useAppStore } from './store/useAppStore';

function App() {
  const theme = useAppStore((s) => s.theme);
  const cycleTheme = useAppStore((s) => s.cycleTheme);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const fn = () => setSystemDark(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
    if (theme === 'light' || theme === 'dark') localStorage.setItem('infinity-skills-theme', theme);
    else localStorage.removeItem('infinity-skills-theme');
  }, [theme]);

  const isDark = theme === 'dark' || (theme === '' && systemDark);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--page)] text-[var(--text)]">
        <header className="sticky top-0 z-50 w-full border-b border-[var(--glass-border)] glass-strong">
          <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link to="/" className="flex shrink-0 items-center gap-2 text-[var(--text)] hover:opacity-80 transition-opacity">
              <BookOpen className="h-6 w-6 shrink-0" aria-hidden />
              <span className="hidden font-bold sm:inline">Infinity Skills</span>
            </Link>
            <nav className="flex shrink-0 items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/Devulapellykushal/950skills/tree/main/.agent/skills"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
              >
                <Github className="h-5 w-5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <button
                type="button"
                onClick={cycleTheme}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
              </button>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skill/:id" element={<SkillDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const THEME_KEY = 'infinity-skills-theme';

export const useAppStore = create(
  persist(
    (set) => ({
      theme: '', // '' = system, 'light' | 'dark' = manual
      starredSkillIds: {}, // { [skillId]: true }

      setTheme: (theme) => set({ theme }),
      cycleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : state.theme === 'light' ? '' : 'dark',
        })),

      addStar: (skillId) =>
        set((state) =>
          state.starredSkillIds[skillId] ? state : { starredSkillIds: { ...state.starredSkillIds, [skillId]: true } }
        ),
      toggleStar: (skillId) =>
        set((state) => {
          const next = { ...state.starredSkillIds };
          if (next[skillId]) delete next[skillId];
          else next[skillId] = true;
          return { starredSkillIds: next };
        }),
    }),
    {
      name: 'infinity-skills-app',
      partialize: (state) => ({
        theme: state.theme,
        starredSkillIds: state.starredSkillIds,
      }),
    }
  )
);

// Sync theme from store to document (for persistence across reloads)
const applyThemeToDocument = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark' || theme === 'light') {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
};

// Run once on module load: apply saved theme from localStorage so first paint is correct
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('infinity-skills-app');
    if (raw) {
      const parsed = JSON.parse(raw);
      const savedTheme = parsed?.state?.theme;
      if (savedTheme === 'light' || savedTheme === 'dark') applyThemeToDocument(savedTheme);
    }
  } catch (_) {}
}

export { applyThemeToDocument, THEME_KEY };

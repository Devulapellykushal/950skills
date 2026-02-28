import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Book, Calendar, ChevronRight, Filter, FolderOpen, LayoutGrid, Menu, Search, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applyDisplayCategories, formatCategoryLabel } from '../lib/categorize';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store/useAppStore';

export function Home() {
    const [skills, setSkills] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(24);
    const [stars, setStars] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleStar = useAppStore((s) => s.toggleStar);
    const starredSkillIds = useAppStore((s) => s.starredSkillIds);

    useEffect(() => {
        const fetchSkillsAndStars = async () => {
            try {
                const res = await fetch('/skills.json');
                const data = await res.json();
                applyDisplayCategories(data);

                setSkills(data);
                setFilteredSkills(data);

                if (supabase) {
                    const { data: starData, error } = await supabase
                        .from('skill_stars')
                        .select('skill_id, star_count');

                    if (!error && starData) {
                        const starMap = {};
                        starData.forEach(item => {
                            starMap[item.skill_id] = item.star_count;
                        });
                        setStars(starMap);
                    }
                }
            } catch (err) {
                console.error("Failed to load skills", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkillsAndStars();
    }, []);

    const handleStarClick = async (e, skillId) => {
        e.preventDefault();
        const wasStarred = starredSkillIds[skillId];
        toggleStar(skillId);

        setStars(prev => ({
            ...prev,
            [skillId]: Math.max(0, (prev[skillId] || 0) + (wasStarred ? -1 : 1))
        }));

        if (supabase) {
            const { data } = await supabase
                .from('skill_stars')
                .select('star_count')
                .eq('skill_id', skillId)
                .single();

            if (wasStarred) {
                if (data && data.star_count > 0) {
                    await supabase
                        .from('skill_stars')
                        .update({ star_count: data.star_count - 1 })
                        .eq('skill_id', skillId);
                }
            } else {
                if (data) {
                    await supabase
                        .from('skill_stars')
                        .update({ star_count: data.star_count + 1 })
                        .eq('skill_id', skillId);
                } else {
                    await supabase
                        .from('skill_stars')
                        .insert({ skill_id: skillId, star_count: 1 });
                }
            }
        }
    };

    const calculateScore = (skill, terms) => {
        let score = 0;
        const nameLower = skill.name.toLowerCase();
        const descLower = (skill.description || '').toLowerCase();
        const catLower = (skill.displayCategory || skill.category || '').toLowerCase();

        for (const term of terms) {
            if (nameLower === term) score += 100;
            else if (nameLower.startsWith(term)) score += 50;
            else if (nameLower.includes(term)) score += 30;
            else if (catLower.includes(term)) score += 20;
            else if (descLower.includes(term)) score += 10;
        }
        return score;
    };

    useEffect(() => {
        let result = skills;

        if (search) {
            const terms = search.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
            if (terms.length > 0) {
                result = result
                    .map(skill => ({ ...skill, _score: calculateScore(skill, terms) }))
                    .filter(skill => skill._score > 0)
                    .sort((a, b) => b._score - a._score);
            }
        }

        if (categoryFilter === 'favorites') {
            result = result.filter(skill => starredSkillIds[skill.id]);
        } else if (categoryFilter !== 'all') {
            result = result.filter(skill => (skill.displayCategory || skill.category) === categoryFilter);
        }

        setFilteredSkills(result);
    }, [search, categoryFilter, skills, starredSkillIds]);

    useEffect(() => {
        setDisplayCount(24);
    }, [search, categoryFilter]);

    const categoryStats = {};
    skills.forEach(skill => {
        const cat = skill.displayCategory || skill.category;
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    const categories = ['all', ...Object.keys(categoryStats)
        .filter(cat => cat !== 'uncategorized')
        .sort((a, b) => categoryStats[b] - categoryStats[a]),
        ...(categoryStats['uncategorized'] ? ['uncategorized'] : [])
    ];

    const favoritesCount = Object.keys(starredSkillIds).length;

    const sidebarContent = (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 lg:border-0 lg:px-4 lg:pb-3 lg:pt-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                    <LayoutGrid className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                    Categories
                </h2>
                <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="shrink-0 rounded-md p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)] lg:hidden"
                    aria-label="Close categories"
                >
                    <X className="h-5 w-5" aria-hidden />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-2 lg:px-2 lg:py-0" aria-label="Filter by category">
                {/* Favorites (starred) - first */}
                <button
                    type="button"
                    onClick={() => {
                        setCategoryFilter('favorites');
                        setSidebarOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        categoryFilter === 'favorites'
                            ? 'bg-[var(--surface-elevated)] font-medium text-[var(--text)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]'
                    }`}
                >
                    <span className="flex min-w-0 items-center gap-2.5">
                        <Star className={`h-4 w-4 shrink-0 ${categoryFilter === 'favorites' ? 'fill-[var(--star-selected)] stroke-[var(--star-selected)]' : 'fill-none stroke-[var(--star-unselected)]'}`} aria-hidden />
                        <span className="truncate">Favorites</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-right text-xs tabular-nums text-[var(--text-muted)]">
                        {favoritesCount}
                        {categoryFilter === 'favorites' && <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />}
                    </span>
                </button>
                {categories.map((cat) => {
                    const count = cat === 'all' ? skills.length : (categoryStats[cat] || 0);
                    const isActive = categoryFilter === cat;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => {
                                setCategoryFilter(cat);
                                setSidebarOpen(false);
                            }}
                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                isActive
                                    ? 'bg-[var(--surface-elevated)] font-medium text-[var(--text)]'
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]'
                            }`}
                        >
                            <span className="flex min-w-0 items-center gap-2.5">
                                <FolderOpen className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                                <span className="truncate">{formatCategoryLabel(cat)}</span>
                            </span>
                            <span className="flex shrink-0 items-center gap-1 text-right text-xs tabular-nums text-[var(--text-muted)]">
                                {count}
                                {isActive && <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <div className="flex w-full gap-6 lg:gap-8">
            {/* Mobile: Categories FAB */}
            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-3 font-medium text-[var(--text)] shadow-[var(--shadow-card)] glass lg:hidden"
                aria-label="Open categories"
            >
                <Menu className="h-5 w-5 shrink-0" aria-hidden />
                <span>Categories</span>
            </button>

            {/* Mobile drawer overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-[var(--text)]/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                            aria-hidden
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed top-0 left-0 z-50 w-[280px] max-w-[85vw] h-full glass-strong border-r border-[var(--glass-border)] lg:hidden overflow-hidden flex flex-col"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <aside className="sticky top-24 hidden h-fit max-h-[calc(100vh-7rem)] shrink-0 overflow-hidden rounded-xl border border-[var(--glass-border)] glass-card lg:flex lg:w-56 lg:flex-col xl:w-64">
                {sidebarContent}
            </aside>

            {/* Main content */}
            <div className="min-w-0 flex-1 space-y-6">
                <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Explore Skills</h1>
                        {favoritesCount > 0 && (
                            <button
                                type="button"
                                onClick={() => setCategoryFilter(categoryFilter === 'favorites' ? 'all' : 'favorites')}
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                                    categoryFilter === 'favorites'
                                        ? 'bg-[var(--surface-elevated)] text-[var(--text)] ring-1 ring-[var(--border)]'
                                        : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]'
                                }`}
                                aria-pressed={categoryFilter === 'favorites'}
                            >
                                <Star className={`h-4 w-4 shrink-0 ${categoryFilter === 'favorites' ? 'fill-[var(--star-selected)] stroke-[var(--star-selected)]' : 'fill-none stroke-[var(--star-unselected)]'}`} aria-hidden />
                                Favorites ({favoritesCount})
                            </button>
                        )}
                    </div>
                    <p className="text-[var(--text-muted)]">
                        {categoryFilter === 'favorites'
                            ? (favoritesCount === 0 ? 'Star skills to see them here.' : `Showing ${filteredSkills.length} starred skill${filteredSkills.length !== 1 ? 's' : ''}.`)
                            : search || categoryFilter !== 'all'
                                ? `Showing ${filteredSkills.length} of ${skills.length} skills`
                                : `Discover ${skills.length} agentic capabilities for your AI assistant.`}
                    </p>
                </div>

                <div className="sticky top-20 z-30 flex flex-col gap-4 rounded-xl border border-[var(--glass-border)] p-4 glass shadow-[var(--shadow-card)] md:flex-row md:items-center">
                    <div className="relative min-w-0 flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden />
                        <input
                            type="text"
                            placeholder="Search skills (e.g., 'react', 'security', 'python', 'testing')..."
                            className="w-full rounded-md border border-[var(--border)] bg-[var(--page)] py-2 pl-9 pr-9 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--focus-ring)] focus:ring-2 focus:ring-[var(--focus-ring)]/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                                title="Clear search"
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="flex shrink-0 items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--page)] px-3 py-2 text-sm text-[var(--text)] lg:hidden"
                    >
                        <Filter className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                        {formatCategoryLabel(categoryFilter)}
                    </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <AnimatePresence>
                    {loading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-lg border border-[var(--border)] p-6 h-48 bg-[var(--surface-elevated)]">
                            </div>
                        ))
                    ) : filteredSkills.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <AlertCircle className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
                            <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">No skills found</h3>
                            <p className="mt-2 text-[var(--text-muted)]">Try adjusting your search or filter.</p>
                        </div>
                    ) : (
                        filteredSkills.slice(0, displayCount).map((skill) => (
                            <motion.div
                                key={skill.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    to={`/skill/${skill.id}`}
                                    className="group z-0 flex h-full flex-col rounded-lg border border-[var(--glass-border)] p-6 shadow-[var(--shadow-card)] transition-all glass-card hover:bg-[var(--surface-hover)]/80"
                                >
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--surface-subtle)]">
                                                <Book className="h-5 w-5 text-[var(--text-secondary)]" aria-hidden />
                                            </div>
                                            <span className="truncate rounded-full bg-[var(--surface-elevated)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                                {formatCategoryLabel(skill.displayCategory || skill.category)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => handleStarClick(e, skill.id)}
                                            className="z-10 flex shrink-0 items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)]"
                                            title="Upvote skill"
                                            aria-label="Upvote skill"
                                        >
                                            <Star className={`h-4 w-4 shrink-0 ${starredSkillIds[skill.id] ? 'fill-[var(--star-selected)] stroke-[var(--star-selected)]' : 'fill-none stroke-[var(--star-unselected)]'}`} aria-hidden />
                                            <span className="text-xs font-semibold tabular-nums">{stars[skill.id] || 0}</span>
                                        </button>
                                    </div>

                                    <h3 className="mb-2 line-clamp-1 text-lg font-bold text-[var(--text)] transition-opacity group-hover:opacity-90">
                                        @{skill.name}
                                    </h3>

                                    <p className="mb-4 flex-grow line-clamp-3 text-sm text-[var(--text-muted)]">
                                        {skill.description}
                                    </p>

                                    <div className="mb-3 flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3 text-xs text-[var(--text-muted)]">
                                        <span>Risk: <span className="font-semibold text-[var(--text-secondary)]">{skill.risk || 'unknown'}</span></span>
                                        {skill.date_added && (
                                            <span className="inline-flex shrink-0 items-center gap-1"><Calendar className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" aria-hidden />{skill.date_added}</span>
                                        )}
                                    </div>

                                    <div className="mt-auto flex items-center pt-2 text-sm font-medium text-[var(--text-secondary)] transition-all group-hover:translate-x-1 group-hover:text-[var(--text)]">
                                        Read Skill <ArrowRight className="ml-1 h-4 w-4 shrink-0" aria-hidden />
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>

                {!loading && filteredSkills.length > displayCount && (
                    <div className="col-span-full flex justify-center py-8">
                        <button
                            onClick={() => setDisplayCount((prev) => prev + 24)}
                            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-medium text-[var(--text)] shadow-[var(--shadow-card)] transition-colors hover:bg-[var(--surface-hover)]"
                        >
                            <span>Load More</span>
                            <span className="text-sm text-[var(--text-muted)]">
                                ({filteredSkills.length - displayCount} remaining)
                            </span>
                        </button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

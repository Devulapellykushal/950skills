import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, Calendar, Copy, Check, FileCode, AlertTriangle, Star } from 'lucide-react';
import { formatCategoryLabel, inferCategory } from '../lib/categorize';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store/useAppStore';
import 'highlight.js/styles/github-dark.css';

export function SkillDetail() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [copiedFull, setCopiedFull] = useState(false);
    const [error, setError] = useState(null);
    const [customContext, setCustomContext] = useState('');
    const [starCount, setStarCount] = useState(0);
    const toggleStar = useAppStore((s) => s.toggleStar);
    const starredSkillIds = useAppStore((s) => s.starredSkillIds);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch('/skills.json');
                const skills = await res.json();
                const foundSkill = skills.find(s => s.id === id);

                if (foundSkill) {
                    foundSkill.displayCategory = inferCategory(foundSkill);
                    setSkill(foundSkill);

                    if (supabase) {
                        const { data } = await supabase
                            .from('skill_stars')
                            .select('star_count')
                            .eq('skill_id', id)
                            .single();

                        if (data) {
                            setStarCount(data.star_count);
                        }
                    }

                    const cleanPath = foundSkill.path.startsWith('skills/')
                        ? foundSkill.path.replace('skills/', '')
                        : foundSkill.path;

                    const mdRes = await fetch(`/skills/${cleanPath}/SKILL.md`);
                    if (!mdRes.ok) throw new Error('Skill file not found');

                    let text = await mdRes.text();
                    // Strip YAML frontmatter so only the document body is rendered
                    const fmMatch = text.match(/^---\s*\n[\s\S]*?\n---\s*\n?/);
                    if (fmMatch) text = text.slice(fmMatch[0].length).trim();
                    setContent(text);
                } else {
                    setError("Skill not found in registry.");
                }
            } catch (err) {
                console.error("Failed to load skill data", err);
                setError(err.message || "Could not load skill content.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleStarClick = async () => {
        const wasStarred = starredSkillIds[id];
        toggleStar(id);
        setStarCount(prev => Math.max(0, prev + (wasStarred ? -1 : 1)));

        if (supabase) {
            const { data } = await supabase
                .from('skill_stars')
                .select('star_count')
                .eq('skill_id', id)
                .single();

            if (wasStarred) {
                if (data && data.star_count > 0) {
                    await supabase
                        .from('skill_stars')
                        .update({ star_count: data.star_count - 1 })
                        .eq('skill_id', id);
                }
            } else {
                if (data) {
                    await supabase
                        .from('skill_stars')
                        .update({ star_count: data.star_count + 1 })
                        .eq('skill_id', id);
                } else {
                    await supabase
                        .from('skill_stars')
                        .insert({ skill_id: id, star_count: 1 });
                }
            }
        }
    };

    const copyToClipboard = () => {
        const basePrompt = `Use @${skill.name}`;
        const finalPrompt = customContext.trim()
            ? `${basePrompt}\n\nContext:\n${customContext}`
            : basePrompt;

        navigator.clipboard.writeText(finalPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyFullToClipboard = () => {
        const finalPrompt = customContext.trim()
            ? `${content}\n\nContext:\n${customContext}`
            : content;

        navigator.clipboard.writeText(finalPrompt);
        setCopiedFull(true);
        setTimeout(() => setCopiedFull(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--text)]" aria-hidden />
            </div>
        );
    }

    if (error || !skill) {
        return (
            <div className="mx-auto max-w-2xl py-12 text-center">
                <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-[var(--text)]" aria-hidden />
                <h2 className="text-2xl font-bold text-[var(--text)]">Error Loading Skill</h2>
                <p className="mt-2 text-[var(--text-muted)]">{error}</p>
                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 font-medium text-[var(--text)] transition-opacity hover:opacity-80"
                >
                    <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                    Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                Back to Catalog
            </Link>

            <div className="overflow-hidden rounded-xl border border-[var(--glass-border)] shadow-[var(--shadow-card)] glass-card">
                <div className="border-b border-[var(--glass-border)] p-6 glass sm:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[var(--surface-elevated)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                                    {formatCategoryLabel(skill.displayCategory || skill.category)}
                                </span>
                                {skill.source && (
                                    <span className="rounded-full bg-[var(--surface-elevated)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                                        {skill.source}
                                    </span>
                                )}
                                {skill.date_added && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-elevated)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                                        <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                        Added {skill.date_added}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={handleStarClick}
                                    className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-xs font-bold text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)]"
                                    aria-label="Upvote skill"
                                >
                                    <Star className={`h-3.5 w-3.5 shrink-0 ${starredSkillIds[id] ? 'fill-[var(--star-selected)] stroke-[var(--star-selected)]' : 'fill-none stroke-[var(--star-unselected)]'}`} aria-hidden />
                                    <span>{starCount} Upvotes</span>
                                </button>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
                                @{skill.name}
                            </h1>
                            <p className="mt-2 text-lg text-[var(--text-secondary)]">
                                {skill.description}
                            </p>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)]"
                            >
                                {copied ? <Check className="h-4 w-4 shrink-0 text-[var(--text)]" aria-hidden /> : <Copy className="h-4 w-4 shrink-0" aria-hidden />}
                                <span>{copied ? 'Copied!' : 'Copy @Skill'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={copyFullToClipboard}
                                className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg bg-[var(--btn-primary-bg)] px-4 py-2.5 font-medium text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)] active:bg-[var(--btn-primary-active)]"
                            >
                                {copiedFull ? <Check className="h-4 w-4 shrink-0 text-[var(--btn-primary-text)]" aria-hidden /> : <FileCode className="h-4 w-4 shrink-0" aria-hidden />}
                                <span>{copiedFull ? 'Copied Content!' : 'Copy Full Content'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-[var(--border)] pt-6">
                        <label htmlFor="context" className="mb-2 block text-sm font-medium text-[var(--text)]">
                            Interactive Prompt Builder (Optional)
                        </label>
                        <p className="mb-3 text-xs text-[var(--text-muted)]">
                            Add specific details below (e.g. &quot;Use React 19 and Tailwind&quot;). The &quot;Copy @Skill&quot; button will attach your context.
                        </p>
                        <textarea
                            id="context"
                            rows={3}
                            className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--focus-ring)] focus:ring-2 focus:ring-[var(--focus-ring)]/20"
                            placeholder="Type your specific task requirements here..."
                            value={customContext}
                            onChange={(e) => setCustomContext(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-6 sm:p-8 border-t border-[var(--border)]">
                    <div className="skill-markdown">
                        <Markdown rehypePlugins={[rehypeHighlight]}>{content}</Markdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

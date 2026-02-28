/**
 * Infers a display category for skills. Normalizes fragmented source categories
 * and assigns uncategorized skills to meaningful categories.
 */

const L = (s) => (s || '').toLowerCase();

/** Human-readable labels for category slugs (acronyms and special capitalization). */
const LABEL_OVERRIDES = {
  'devops': 'DevOps',
  'ai-ml': 'AI ML',
  'ai-agents': 'AI Agents',
  'cloud-aws': 'Cloud AWS',
  'apis': 'APIs',
  'content-docs': 'Content Docs',
  'product-growth': 'Product Growth',
  'code-quality': 'Code Quality',
  'game-development': 'Game Development',
  'data-analytics': 'Data Analytics',
  'data-engineering': 'Data Engineering',
  'embedded-systems': 'Embedded Systems',
};

/** Map index/source category slugs to canonical display categories (reduces sidebar fragmentation). */
const CATEGORY_ALIASES = {
  'content': 'content-docs',
  'framework': 'backend',
  'meta': 'tools',
  'database-processing': 'databases',
  'spreadsheet-processing': 'data-analytics',
  'document-processing': 'content-docs',
  'presentation-processing': 'content-docs',
  'graphics-processing': 'frontend',
  'marketing': 'product-growth',
  'workflow': 'workflows',
  'app-builder': 'backend',
  'workflow-bundle': 'workflows',
  'granular-workflow-bundle': 'workflows',
};

function matches(skill, idTerms = [], descTerms = []) {
  const id = L(skill.id);
  const name = L(skill.name || '');
  const desc = L(skill.description || '');
  const combined = `${id} ${name} ${desc}`;
  const idMatch = idTerms.length === 0 || idTerms.some((t) => id.includes(t) || name.includes(t));
  const descMatch = descTerms.length === 0 || descTerms.some((t) => combined.includes(t));
  return idMatch && descMatch;
}

/** Ordered rules: first match wins. Match on id/name only so more skills get categorized. */
const RULES = [
  { category: 'ai-agents', test: (s) => matches(s, ['agent-', 'ai-agent', 'agents-', 'agentfolio', 'multi-agent', 'agent-orchestration', 'agent-tool', 'agent-evaluation', 'agent-memory', 'ai-agents', 'ai-engineer', 'ai-product', 'ai-wrapper', 'autonomous-agent'], []) },
  { category: 'automation', test: (s) => matches(s, ['-automation'], []) },
  { category: 'accessibility', test: (s) => matches(s, ['accessibility', 'a11y', 'wcag', 'screen-reader'], []) },
  { category: 'security', test: (s) => matches(s, ['security', 'pentest', 'vulnerability', 'attack', 'exploit', 'active-directory', 'anti-reversing', 'api-fuzzing', 'sql-injection', 'xss-', 'red-team', 'malware', 'forensics', 'sast', 'dast', 'broken-authentication', 'gdpr-data-handling', 'linux-privilege-escalation', 'metasploit-', 'mtls-configuration'], []) },
  { category: 'apis', test: (s) => matches(s, ['api-design', 'api-patterns', 'api-documentation', 'api-security', 'api-fuzzing', 'openapi', 'rest-', 'graphql'], []) },
  { category: 'frontend', test: (s) => matches(s, ['angular', 'react-', 'vue', 'svelte', '3d-web', 'browser-extension', 'ui-patterns', 'ui-ux', 'tailwind', 'radix', 'design-system', 'scroll-experience', 'nextjs', 'remix', 'avalonia', 'hig-', 'chrome-extension', 'canvas-design', 'frontend-design', 'frontend-dev', 'frontend-developer', 'frontend-slides', 'frontend-ui', 'i18n-', 'interactive-portfolio', 'makepad-', 'multi-platform-apps'], []) },
  { category: 'mobile', test: (s) => matches(s, ['android-', 'react-native', 'flutter', 'ios-', 'swiftui', 'mobile-'], []) },
  { category: 'cloud-aws', test: (s) => matches(s, ['aws-', 'serverless-', 'lambda', 'dynamodb', 'cloudformation', 'amazon-'], []) },
  { category: 'cloud-azure', test: (s) => matches(s, ['azure-', 'microsoft-', 'azd-'], []) },
  { category: 'devops', test: (s) => matches(s, ['gcp-cloud', 'grafana-', 'gitlab-ci', 'helm-chart', 'istio-', 'linkerd-', 'k8s-', 'expo-deployment', 'incident-responder', 'incident-runbook', 'on-call-', 'manifest', 'nx-workspace', 'monorepo-'], []) },
  { category: 'data-analytics', test: (s) => matches(s, ['airflow', 'analytics', 'amplitude', 'segment', 'mixpanel', 'posthog', 'data-pipeline', 'spark', 'dbt', 'algolia', 'geo-fundamentals', 'loki-mode'], []) },
  { category: 'product-growth', test: (s) => matches(s, ['ab-test', 'cro-', 'onboarding', 'paywall', 'referral', 'marketing-', 'seo-', 'startup-business', 'app-store-optimization', 'form-cro', 'page-cro', 'popup-cro', 'paid-ads', 'launch-strategy', 'free-tool-strategy'], []) },
  { category: 'testing', test: (s) => matches(s, ['playwright', 'testing', 'test-', 'e2e', 'jest', 'pytest', 'evaluation', 'benchmark', 'cypress', 'vitest', 'code-review', 'error-diagnostics', 'error-debugging'], []) },
  { category: 'documentation', test: (s) => matches(s, ['documentation', 'api-documenter', 'readme', 'wiki-', 'doc-', 'mermaid-'], []) },
  { category: 'devops', test: (s) => matches(s, ['terraform', 'docker', 'kubernetes', 'bazel', 'ci-cd', 'github-actions', 'observability', 'prometheus', 'ansible', 'pulumi', 'address-github', 'cc-skill', 'appdeploy', 'cloudflare', 'bun-development', 'cdk-patterns', 'incident-response', 'create-pr', 'commit', 'deployment-', 'devops-troubleshooter', 'dependency-management', 'dependency-upgrade', 'busybox-on', 'environment-setup', 'finishing-a-development-branch', 'iterate-pr', 'linux-shell-scripting', 'network-101', 'network-engineer', 'postmortem-writing'], []) },
  { category: 'workflows', test: (s) => matches(s, ['workflow', 'orchestrat', 'temporal', 'antigravity-workflows', 'concise-planning', 'planning', 'infinity-loop', 'saga-', 'context-management', 'team-collaboration', 'conductor-', 'inngest', 'executing-plans', 'plan-writing'], []) },
  { category: 'backend', test: (s) => matches(s, ['backend', 'nestjs', 'fastapi', 'django', 'auth-', 'database', 'postgres', 'redis', 'graphql', 'express-', 'nodejs-', 'clerk-auth', 'bullmq', 'c-pro', 'app-builder', 'framework-migration', 'blockchain', 'application-performance', 'convex', 'cqrs-', 'ddd-', 'dbos-', 'event-sourcing', 'event-store', 'dotnet-architect', 'defi-protocol', 'data-structure-protocol', 'distributed-tracing', 'firebase', 'grpc-', 'inngest', 'file-path-traversal', 'file-uploads', 'memory-safety', 'memory-systems', 'nft-standards'], []) },
  { category: 'ai-ml', test: (s) => matches(s, ['rag-', 'llm-', 'mlops', 'machine-learning', 'vector-', 'embedding', 'openai-', 'anthropic', 'langchain', 'llama', 'claude-', 'hugging-face', 'prompt-engineering', 'voice-ai', 'computer-vision', 'computer-use', 'fal-', 'gemini-', 'imagen', 'langfuse', 'langgraph', 'ml-engineer', 'notebooklm', 'hybrid-search-implementation', 'podcast-generation'], []) },
  { category: 'integrations', test: (s) => matches(s, ['mcp-', 'github-', 'slack-', 'notion-', 'hubspot', 'stripe-', 'sendgrid', 'zapier', 'airtable', 'salesforce', 'automate-whatsapp', 'whatsapp', 'firecrawl-', 'moodle-external-api'], []) },
  { category: 'content-docs', test: (s) => matches(s, ['writing-', 'seo-content', 'copywriting', 'beautiful-prose', 'brainstorming', 'algorithmic-art', 'content-marketer', 'copy-editing', 'docx-', 'design-md', 'pptx', 'xlsx', 'pdf-', 'nanobanana-ppt', 'obsidian-'], []) },
  { category: 'architecture', test: (s) => matches(s, ['architect-', 'architecture', 'architecture-decision', 'design-pattern', 'c4-', 'cloud-architect', 'domain-driven-design', 'core-components', 'microservices-patterns', 'hybrid-cloud-networking'], []) },
  { category: 'languages', test: (s) => matches(s, ['python-', 'typescript-', 'rust-', 'go-', 'java-', 'kotlin-', 'swift-', 'ruby-', 'php-', 'scala-', 'elixir-', 'fp-ts', 'bash-', 'cpp-pro', 'csharp-pro', 'golang-pro', 'haskell-pro', 'javascript-pro', 'javascript-mastery', 'julia-pro', 'laravel-', 'posix-shell-', 'powershell-'], []) },
  { category: 'databases', test: (s) => matches(s, ['postgres', 'mysql', 'mongodb', 'redis', 'sqlite', 'dynamodb', 'supabase', 'prisma', 'drizzle', 'neo4j', 'nosql-'], []) },
  { category: 'tools', test: (s) => matches(s, ['cursor-', 'vscode-', 'cli-', 'gh-', 'git-', 'nerdzao-elite', 'copilot-sdk', 'dx-optimizer', 'file-organizer', 'oss-hunter', 'personal-tool-builder', 'linkedin-cli'], []) },
  { category: 'code-quality', test: (s) => matches(s, ['code-refactoring', 'codebase-cleanup', 'clean-code', 'code-reviewer', 'comprehensive-review', 'find-bugs', 'fix-review', 'legacy-modernizer', 'lint-and-validate', 'performance-profiling', 'performance-engineer'], []) },
  { category: 'business', test: (s) => matches(s, ['business-analyst', 'startup-', 'competitive-', 'competitor-', 'brand-guidelines', 'cost-optimization', 'carrier-relationship', 'culture-index', 'customer-support', 'customs-trade', 'employment-contract', 'energy-procurement', 'finance-', 'legal-', 'risk-', 'hr-pro', 'internal-comms-', 'logistics-', 'market-sizing-analysis', 'kpi-dashboard-design', 'payment-integration', 'paypal-', 'pci-compliance', 'plaid-fintech', 'pricing-strategy'], []) },
  { category: 'game-development', test: (s) => matches(s, ['bevy', 'game-', '2d-games', '3d-games', 'unity-', 'unreal-', 'godot-', 'minecraft-'], []) },
  { category: 'data-engineering', test: (s) => matches(s, ['data-engineer', 'data-engineering', 'data-quality', 'data-scientist', 'data-storytelling'], []) },
  { category: 'research', test: (s) => matches(s, ['deep-research', 'context7-auto', 'exa-search'], []) },
  { category: 'embedded-systems', test: (s) => matches(s, ['arm-cortex', 'binary-analysis', 'embedded', 'firmware-analyst'], []) },
  { category: 'ai-agents', test: (s) => matches(s, ['crewai', 'crypto-bd-agent', 'dispatching-parallel-agents', 'conversation-memory'], []) },
  { category: 'testing', test: (s) => matches(s, ['debugger', 'debugging-', 'error-detective', 'error-handling-patterns', 'distributed-debugging'], []) },
  { category: 'documentation', test: (s) => matches(s, ['docs-architect', 'codex-review'], []) },
  { category: 'integrations', test: (s) => matches(s, ['discord-bot', 'email-sequence', 'email-systems', 'email-'], []) },
  { category: 'workflows', test: (s) => matches(s, ['context-compression', 'context-degradation', 'context-driven', 'context-fundamentals', 'context-manager', 'context-optimization', 'context-window', 'n8n-'], []) },
  { category: 'product-growth', test: (s) => matches(s, ['clarity-gate', 'daily-news-report'], []) },
  { category: 'security', test: (s) => matches(s, ['ethical-hacking', 'blockrun'], []) },
  { category: 'ai-ml', test: (s) => matches(s, ['behavioral-modes', 'prompt-caching', 'prompt-library', 'voice-agents'], []) },
  { category: 'ai-agents', test: (s) => matches(s, ['parallel-agents'], []) },
  { category: 'security', test: (s) => matches(s, ['privilege-escalation', 'scanning-tools', 'shodan-reconnaissance', 'top-web-vulnerabilities', 'windows-privilege-escalation', 'wireshark-analysis', 'protocol-reverse-engineering', 'reverse-engineer', 'stride-analysis', 'threat-mitigation', 'threat-modeling'], []) },
  { category: 'product-growth', test: (s) => matches(s, ['product-manager-toolkit', 'programmatic-seo', 'sales-automator', 'schema-markup', 'signup-flow-cro', 'social-content', 'viral-generator-builder', 'x-article-publisher'], []) },
  { category: 'code-quality', test: (s) => matches(s, ['production-code-audit', 'systematic-debugging', 'sharp-edges'], []) },
  { category: 'backend', test: (s) => matches(s, ['projection-patterns', 'similarity-search-patterns', 'sql-optimization-patterns', 'trigger-dev', 'upstash-qstash', 'pydantic-models'], []) },
  { category: 'business', test: (s) => matches(s, ['production-scheduling', 'quality-nonconformance', 'returns-reverse-logistics', 'quant-analyst', 'team-composition-analysis', 'track-management', 'kaizen', 'infinite-gratitude', 'last30days'], []) },
  { category: 'research', test: (s) => matches(s, ['research-engineer', 'tavily-web'], []) },
  { category: 'documentation', test: (s) => matches(s, ['reference-builder', 'tutorial-engineer'], []) },
  { category: 'devops', test: (s) => matches(s, ['secrets-management', 'server-management', 'service-mesh-expert', 'slo-implementation', 'shellcheck-configuration', 'turborepo-caching', 'vercel-deploy', 'vercel-deployment'], []) },
  { category: 'architecture', test: (s) => matches(s, ['senior-architect', 'senior-fullstack'], []) },
  { category: 'frontend', test: (s) => matches(s, ['remotion-best-practices', 'shader-programming-glsl', 'threejs-skills', 'stitch-ui-design', 'theme-factory', 'ui-skills', 'ui-visual-validator', 'web-design-guidelines', 'web-artifacts-builder', 'web-performance-optimization', 'zustand-store-ts'], []) },
  { category: 'integrations', test: (s) => matches(s, ['shopify-apps', 'shopify-development', 'telegram-bot-builder', 'telegram-mini-app', 'twilio-communications'], []) },
  { category: 'tools', test: (s) => matches(s, ['skill-creator', 'skill-developer', 'skill-seekers', 'superpowers-lab', 'using-superpowers', 'tool-design', 'vexor', 'uv-package-manager'], []) },
  { category: 'databases', test: (s) => matches(s, ['sql-pro', 'using-neon'], []) },
  { category: 'testing', test: (s) => matches(s, ['verification-before-completion'], []) },
  { category: 'mobile', test: (s) => matches(s, ['upgrading-expo'], []) },
  { category: 'languages', test: (s) => matches(s, ['modern-javascript-patterns', 'skill-rails-upgrade'], []) },
  { category: 'content-docs', test: (s) => matches(s, ['screenshots'], []) },
  { category: 'testing', test: (s) => matches(s, ['pypict-skill'], []) },
  { category: 'research', test: (s) => matches(s, ['search-specialist'], []) },
];

/**
 * Returns the display category for a skill. Pass-through if already categorized; otherwise inferred.
 * @param {{ id: string, name?: string, description?: string, category?: string }} skill
 * @returns {string} category slug
 */
export function inferCategory(skill) {
  const srcCat = skill.category && L(skill.category);
  if (srcCat && srcCat !== 'uncategorized') {
    const mapped = CATEGORY_ALIASES[srcCat];
    if (mapped) return mapped;
    return skill.category;
  }
  for (const { category, test } of RULES) {
    if (test(skill)) return category;
  }
  return 'uncategorized';
}

/**
 * Applies display categories to a list of skills (mutates each skill with displayCategory).
 * @param {Array<{ id: string, name?: string, description?: string, category?: string }>} skills
 * @returns {void}
 */
export function applyDisplayCategories(skills) {
  skills.forEach((skill) => {
    skill.displayCategory = inferCategory(skill);
  });
}

/** Human-friendly label for a category slug (e.g. "ai-agents" → "AI Agents", "devops" → "DevOps"). */
export function formatCategoryLabel(cat) {
  if (!cat) return 'Uncategorized';
  if (cat === 'all') return 'All categories';
  if (L(cat) === 'uncategorized') return 'Uncategorized';
  const override = LABEL_OVERRIDES[L(cat)];
  if (override) return override;
  return cat.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

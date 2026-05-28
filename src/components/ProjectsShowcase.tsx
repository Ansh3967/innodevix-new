import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Types ─────────────────────────── */

type TechComplexity = "enterprise" | "frontend" | "tool" | "utility";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  complexity: TechComplexity;
  image?: string;
  gradient: string;
  liveUrl?: string;
  repoUrl?: string;
}

/* ─────────────────────── Project Data ──────────────────────── */

const projects: Project[] = [
  {
    title: "Pulse Enterprise CRM",
    description:
      "Businesses lose 30% of leads due to fragmented pipelines and slow manual outreach. Built a full-stack CRM with Spring Boot microservices, PostgreSQL, Redis caching, and a React dashboard that enriches leads in real time using LLM-powered scoring.",
    techStack: ["Spring Boot", "PostgreSQL", "Redis", "React", "Docker", "REST API"],
    complexity: "enterprise",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    liveUrl: "#contact",
    repoUrl: "https://github.com",
  },
  {
    title: "Nova Commerce Storefront",
    description:
      "E-commerce brands struggle with slow, monolithic storefronts that tank conversion rates. Engineered a headless Next.js storefront with server components, edge caching, and a composable design system delivering sub-second page loads.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Sanity CMS"],
    complexity: "frontend",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 60%, #f43f5e 100%)",
    liveUrl: "#contact",
    repoUrl: "https://github.com",
  },
  {
    title: "Lumen AI Dashboard",
    description:
      "Media teams waste hours switching between analytics tools with no unified view. Created an interactive analytics dashboard with real-time WebSocket feeds, D3-powered visualizations, and AI-driven content performance insights.",
    techStack: ["React", "D3.js", "WebSockets", "Node.js", "Recharts"],
    complexity: "frontend",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #6366f1 100%)",
    liveUrl: "#contact",
    repoUrl: "https://github.com",
  },
  {
    title: "DevUtils CLI Toolkit",
    description:
      "Developers repeat boilerplate setup tasks across every new project. Built a lightweight Node.js CLI toolkit that scaffolds projects, manages environment configs, and automates deployment scripts with a single command.",
    techStack: ["Node.js", "TypeScript", "CLI"],
    complexity: "utility",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #3b82f6 100%)",
    repoUrl: "https://github.com",
  },
];

/* ──────────── Automated Sorting by Technical Weight ──────────── */

const COMPLEXITY_WEIGHT: Record<TechComplexity, number> = {
  enterprise: 4,
  frontend: 3,
  tool: 2,
  utility: 1,
};

function sortByTechnicalWeight(items: Project[]): Project[] {
  return [...items].sort(
    (a, b) => COMPLEXITY_WEIGHT[b.complexity] - COMPLEXITY_WEIGHT[a.complexity]
  );
}

/* ──────────── WCAG AA Compliant Badge Styles (Contrast >= 4.5:1 on White/Light BG) ──────────── */

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  "Spring Boot": { bg: "rgba(6, 95, 70, 0.07)", text: "#065f46" }, // Emerald-800
  PostgreSQL: { bg: "rgba(30, 58, 138, 0.06)", text: "#1e3a8a" }, // Blue-900
  Redis: { bg: "rgba(153, 27, 27, 0.06)", text: "#991b1b" }, // Red-800
  React: { bg: "rgba(30, 58, 138, 0.06)", text: "#1e3a8a" }, // Blue-900
  Docker: { bg: "rgba(30, 58, 138, 0.06)", text: "#1d4ed8" }, // Blue-800
  "REST API": { bg: "rgba(91, 33, 182, 0.06)", text: "#5b21b6" }, // Purple-800
  "Next.js": { bg: "rgba(15, 23, 42, 0.07)", text: "#0f172a" }, // Slate-900
  TypeScript: { bg: "rgba(30, 58, 138, 0.06)", text: "#1e3a8a" }, // Blue-900
  "Tailwind CSS": { bg: "rgba(17, 94, 89, 0.07)", text: "#115e59" }, // Teal-800
  Stripe: { bg: "rgba(91, 33, 182, 0.06)", text: "#5b21b6" }, // Purple-800
  "Sanity CMS": { bg: "rgba(153, 27, 27, 0.06)", text: "#991b1b" }, // Red-800
  "D3.js": { bg: "rgba(154, 52, 18, 0.07)", text: "#9a3412" }, // Orange-800
  WebSockets: { bg: "rgba(6, 95, 70, 0.07)", text: "#065f46" }, // Emerald-800
  "Node.js": { bg: "rgba(22, 101, 52, 0.07)", text: "#166534" }, // Green-800
  Recharts: { bg: "rgba(91, 33, 182, 0.06)", text: "#5b21b6" }, // Purple-800
  CLI: { bg: "rgba(51, 65, 85, 0.07)", text: "#334155" }, // Slate-700
};

const DEFAULT_BADGE = { bg: "rgba(51, 65, 85, 0.06)", text: "#334155" };

function getBadgeStyle(tech: string) {
  return BADGE_STYLES[tech] ?? DEFAULT_BADGE;
}

/* ────────────────────────── Custom SVG Mockups (Fail-safe, No Fragment ID Conflicts) ────────────────────────── */

// 1. Enterprise CRM Architecture SVG Mockup
function EnterpriseCRMMockup() {
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-full object-cover select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Semi-transparent dark overlay to blend with dynamic gradient container */}
      <rect width="100%" height="100%" fill="#0b0f19" fillOpacity="0.4" />

      {/* Decorative Grid Lines */}
      <path d="M 0,50 L 400,50 M 0,100 L 400,100 M 0,150 L 400,150 M 0,200 L 400,200 M 80,0 L 80,250 M 160,0 L 160,250 M 240,0 L 240,250 M 320,0 L 320,250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

      {/* Gateway Module */}
      <rect x="30" y="95" width="80" height="60" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="#00d4ff" strokeWidth="1.5" />
      <text x="70" y="125" fill="#00d4ff" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">API</text>
      <text x="70" y="140" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Gateway</text>
      <circle cx="42" cy="107" r="3" fill="#ef4444" className="animate-pulse" />

      {/* Database Node */}
      <rect x="290" y="95" width="80" height="60" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="#8b5cf6" strokeWidth="1.5" />
      <Database className="text-purple-400" style={{ transform: "translate(318px, 105px)", width: "24px", height: "24px" }} />
      <text x="330" y="145" fill="#c084fc" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">PostgreSQL</text>

      {/* Microservice 1 (Core CRM) */}
      <rect x="160" y="40" width="90" height="50" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="205" y="65" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif" fontWeight="semibold" textAnchor="middle">Auth Service</text>
      <text x="205" y="78" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">Port 8081</text>
      <circle cx="172" cy="50" r="2.5" fill="#10b981" />

      {/* Microservice 2 (AI Engine) */}
      <rect x="160" y="160" width="90" height="50" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="205" y="185" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif" fontWeight="semibold" textAnchor="middle">AI LLM Pipeline</text>
      <text x="205" y="198" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle">Port 8082</text>
      <circle cx="172" cy="170" r="2.5" fill="#f59e0b" />

      {/* Dynamic Data Flowing Lines */}
      {/* Gateway -> Auth */}
      <path d="M 110,115 Q 135,115 135,70 L 160,70" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="5, 3" />
      {/* Gateway -> AI */}
      <path d="M 110,135 Q 135,135 135,185 L 160,185" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="5, 3" />
      {/* Auth -> DB */}
      <path d="M 250,65 Q 275,65 275,115 L 290,115" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4, 4" />
      {/* AI -> DB */}
      <path d="M 250,185 Q 275,185 275,135 L 290,135" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4, 4" />

      {/* Glowing Status Dot */}
      <circle cx="110" cy="125" r="4" fill="#00d4ff" style={{ filter: "drop-shadow(0 0 4px #00d4ff)" }} />
      <circle cx="290" cy="125" r="4" fill="#8b5cf6" style={{ filter: "drop-shadow(0 0 4px #8b5cf6)" }} />
    </svg>
  );
}

// 2. Headless Storefront Browser Mockup SVG
function StorefrontMockup() {
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-full object-cover select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Semi-transparent dark overlay */}
      <rect width="100%" height="100%" fill="#0b0f19" fillOpacity="0.4" />

      {/* Browser Window Chrome */}
      <rect x="15" y="15" width="370" height="220" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
      <circle cx="32" cy="27" r="4" fill="#f87171" />
      <circle cx="44" cy="27" r="4" fill="#fbbf24" />
      <circle cx="56" cy="27" r="4" fill="#34d399" />

      {/* URL Address Bar */}
      <rect x="80" y="20" width="240" height="14" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <text x="200" y="30" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">https://nova-store.dev</text>

      {/* Page Header */}
      <line x1="25" y1="45" x2="375" y2="45" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="35" y="60" fill="#fff" fontSize="9" fontFamily="sans-serif" fontWeight="bold">NOVA</text>

      {/* Navigation skeleton items */}
      <rect x="75" y="54" width="25" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="110" y="54" width="25" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="145" y="54" width="25" height="6" rx="2" fill="rgba(255,255,255,0.15)" />

      {/* Shopping Cart Header Icon */}
      <rect x="330" y="52" width="35" height="10" rx="3" fill="#ec4899" />
      <text x="347" y="60" fill="#fff" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">CART (3)</text>

      {/* Product Grid Mockup */}
      {/* Card 1 */}
      <rect x="30" y="80" width="105" height="120" rx="6" fill="#1e293b" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      <rect x="38" y="88" width="89" height="60" rx="4" fill="#8b5cf6" opacity="0.8" />
      <rect x="38" y="156" width="60" height="6" rx="2" fill="#fff" opacity="0.8" />
      <rect x="38" y="167" width="40" height="5" rx="1.5" fill="#94a3b8" />
      <rect x="38" y="180" width="25" height="8" rx="2" fill="#10b981" />
      <text x="43" y="186" fill="#fff" fontSize="5" fontFamily="sans-serif" fontWeight="bold">$89</text>

      {/* Card 2 */}
      <rect x="148" y="80" width="105" height="120" rx="6" fill="#1e293b" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      <rect x="156" y="88" width="89" height="60" rx="4" fill="#3b82f6" opacity="0.8" />
      <rect x="156" y="156" width="60" height="6" rx="2" fill="#fff" opacity="0.8" />
      <rect x="156" y="167" width="40" height="5" rx="1.5" fill="#94a3b8" />
      <rect x="156" y="180" width="25" height="8" rx="2" fill="#10b981" />
      <text x="161" y="186" fill="#fff" fontSize="5" fontFamily="sans-serif" fontWeight="bold">$120</text>

      {/* Card 3 */}
      <rect x="265" y="80" width="105" height="120" rx="6" fill="#1e293b" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      <rect x="273" y="88" width="89" height="60" rx="4" fill="#f43f5e" opacity="0.8" />
      <rect x="273" y="156" width="60" height="6" rx="2" fill="#fff" opacity="0.8" />
      <rect x="273" y="167" width="40" height="5" rx="1.5" fill="#94a3b8" />
      <rect x="273" y="180" width="25" height="8" rx="2" fill="#10b981" />
      <text x="278" y="186" fill="#fff" fontSize="5" fontFamily="sans-serif" fontWeight="bold">$45</text>
    </svg>
  );
}

// 3. AI Dashboard SVG Mockup
function AIDashboardMockup() {
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-full object-cover select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Semi-transparent dark overlay */}
      <rect width="100%" height="100%" fill="#05070f" fillOpacity="0.4" />

      {/* Dashboard frame structure */}
      <rect x="15" y="15" width="370" height="220" rx="8" fill="#0b0f19" fillOpacity="0.9" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

      {/* Chart 1: Glowing Line Chart */}
      <rect x="30" y="30" width="220" height="110" rx="6" fill="#0f172a" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {/* Replaced linearGradient fill with transparent solid color to eliminate modern SPA route-hash breaks */}
      <path d="M 40,110 Q 75,60 110,80 T 180,50 T 240,90 L 240,130 L 40,130 Z" fill="#00d4ff" fillOpacity="0.15" />
      <path d="M 40,110 Q 75,60 110,80 T 180,50 T 240,90" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="180" cy="50" r="4.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 4px #00d4ff)" }} />
      <text x="40" y="47" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Lumen AI Traffic</text>
      <text x="210" y="45" fill="#34d399" fontSize="7" fontFamily="sans-serif" fontWeight="semibold">+14.2%</text>

      {/* Widget 2: Doughnut / Metric Loader */}
      <rect x="265" y="30" width="105" height="110" rx="6" fill="#0f172a" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {/* Outer Circle */}
      <circle cx="317" cy="80" r="28" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      {/* Percentage Arc */}
      <circle cx="317" cy="80" r="28" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="175" strokeDashoffset="45" strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "317px 80px" }} />
      <text x="317" y="84" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">84%</text>
      <text x="317" y="125" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">Enrichment Score</text>

      {/* Widget 3: Data logs terminal stream */}
      <rect x="30" y="155" width="340" height="65" rx="6" fill="#090d16" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="42" y="171" fill="#10b981" fontSize="6.5" fontFamily="monospace">✓ Websocket feed established at ws://lumen.ai/stream</text>
      <text x="42" y="184" fill="#64748b" fontSize="6.5" fontFamily="monospace">[12:40:02] Analyzing metadata stream -- payload size: 24KB</text>
      <text x="42" y="197" fill="#64748b" fontSize="6.5" fontFamily="monospace">[12:40:03] Score: High (94.2) | Dispatching lead to client queue</text>
      <circle cx="355" cy="170" r="3" fill="#10b981" className="animate-pulse" />
    </svg>
  );
}

// 4. CLI DevUtils Terminal SVG Mockup
function CLIToolkitMockup() {
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-full object-cover select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Semi-transparent dark overlay to blend with dynamic gradient container */}
      <rect width="100%" height="100%" fill="#020617" fillOpacity="0.4" />

      {/* Terminal window frame - Solved linearGradient hash-routing bug by applying solid fill directly */}
      <rect x="15" y="15" width="370" height="220" rx="8" fill="#020617" fillOpacity="0.9" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.2" />

      {/* Title bar / Controls */}
      <path d="M 15,35 L 385,35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="32" cy="25" r="4.5" fill="#ef4444" />
      <circle cx="45" cy="25" r="4.5" fill="#f59e0b" />
      <circle cx="58" cy="25" r="4.5" fill="#10b981" />
      <text x="200" y="28" fill="#ffffff" fillOpacity="0.4" fontSize="8.5" fontFamily="monospace" textAnchor="middle">bash -- devutils CLI</text>

      {/* Command prompt inputs/outputs */}
      <text x="30" y="60" fill="#64748b" fontSize="9.5" fontFamily="monospace">$ </text>
      <text x="42" y="60" fill="#f8fafc" fontSize="9.5" fontFamily="monospace">npm install -g @devutils/cli</text>

      <text x="30" y="80" fill="#10b981" fontSize="9" fontFamily="monospace">✓ </text>
      <text x="42" y="80" fill="#94a3b8" fontSize="9" fontFamily="monospace">Installed successfully (v1.4.2) | 124 packages synced</text>

      <text x="30" y="110" fill="#64748b" fontSize="9.5" fontFamily="monospace">$ </text>
      <text x="42" y="110" fill="#f8fafc" fontSize="9.5" fontFamily="monospace">devutils init-project</text>

      <text x="30" y="130" fill="#00d4ff" fontSize="9" fontFamily="monospace">⚙ </text>
      <text x="42" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace">Bootstrapping boilerplate...</text>

      <text x="42" y="150" fill="#10b981" fontSize="9" fontFamily="monospace">✓ Created src/index.ts, tsconfig.json</text>
      <text x="42" y="165" fill="#10b981" fontSize="9" fontFamily="monospace">✓ Initialized Git repository</text>

      <text x="30" y="195" fill="#64748b" fontSize="9.5" fontFamily="monospace">$ </text>
      <text x="42" y="195" fill="#f8fafc" fontSize="9.5" fontFamily="monospace">devutils deploy --edge</text>

      <text x="30" y="215" fill="#eab308" fontSize="9" fontFamily="monospace">🚀 </text>
      <text x="42" y="215" fill="#00d4ff" fontSize="9" fontFamily="monospace">Site live at https://devutils.dev [1.2s]</text>

      {/* Glowing terminal cursor */}
      <rect x="312" y="206" width="6" height="11" fill="#ffffff" fillOpacity="0.75" className="animate-pulse" />
    </svg>
  );
}

// Unified visual router component
function ProjectVisual({ title, complexity }: { title: string; complexity: TechComplexity }) {
  const normTitle = title.toLowerCase();

  if (complexity === "enterprise" || normTitle.includes("crm")) {
    return <EnterpriseCRMMockup />;
  } else if (normTitle.includes("store") || normTitle.includes("commerce")) {
    return <StorefrontMockup />;
  } else if (normTitle.includes("dashboard") || normTitle.includes("analytics") || complexity === "frontend") {
    return <AIDashboardMockup />;
  } else {
    return <CLIToolkitMockup />;
  }
}

/* ──────────────── Project Card Component ──────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="project-card group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30"
      style={{
        boxShadow: "0 4px 24px -8px rgba(15, 23, 42, 0.06)",
      }}
      data-priority={index + 1}
    >
      {/* ── Aspect-Ratio Stable Image / Visual Container ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#090d16]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ background: project.gradient }}
          >
            <ProjectVisual title={project.title} complexity={project.complexity} />
          </div>
        )}

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Priority / Tech Complexity Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md"
            style={{
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
              style={{
                background:
                  index === 0
                    ? "#00d4ff"
                    : index <= 2
                      ? "#8b5cf6"
                      : "#10b981",
                boxShadow:
                  index === 0
                    ? "0 0 6px #00d4ff"
                    : index <= 2
                      ? "0 0 6px #8b5cf6"
                      : "0 0 6px #10b981",
              }}
            />
            {project.complexity === "enterprise"
              ? "Full-Stack"
              : project.complexity === "frontend"
                ? "Frontend"
                : project.complexity === "tool"
                  ? "Tool"
                  : "Utility"}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <header>
          <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>
        </header>

        {/* Value Proposition Description */}
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* ── Tech Stack Badges ── */}
        <div
          className="mt-5 flex flex-wrap gap-1.5"
          role="list"
          aria-label={`${project.title} tech stack`}
        >
          {project.techStack.map((tech) => {
            const style = getBadgeStyle(tech);
            return (
              <span
                key={tech}
                role="listitem"
                className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold tracking-wide transition-colors duration-300"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                }}
              >
                {tech}
              </span>
            );
          })}
        </div>

        {/* Spacer to align footers */}
        <div className="flex-1 min-h-[20px]" />

        {/* ── Footer: Action Buttons ── */}
        <footer className="mt-5 flex items-center gap-3 border-t border-border/40 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "0 2px 10px -3px hsl(189 95% 42% / 0.35)",
              }}
              aria-label={`View live demo of ${project.title}`}
            >
              Live Demo
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground/80 transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              GitHub Repo
              <Github className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </footer>
      </div>

      {/* ── Interactive Hover Border Glow ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 0 1.5px rgba(0, 184, 217, 0.25), 0 16px 40px -12px rgba(0, 184, 217, 0.15), 0 8px 24px -8px rgba(124, 58, 237, 0.10)",
        }}
        aria-hidden="true"
      />
    </article>
  );
}

/* ──────────────── Main Showcase Component ──────────────── */

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Sort projects by technical weight (Z-pattern: heaviest → top-left)
  const sortedProjects = useMemo(() => sortByTechnicalWeight(projects), []);

  // Determine grid class based on item count to guarantee responsive layout requirements
  const gridClassName = useMemo(() => {
    const count = sortedProjects.length;
    // On Desktop (screens >= 1024px): 3x1 row (if 3 items) or balanced 2x2 grid (if 4 items).
    // On Tablet (screens >= 768px): 2-column grid.
    // On Mobile (screens < 768px): collapse into single-column stack.
    if (count === 3) {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto w-full";
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full";
  }, [sortedProjects.length]);

  // GSAP staggered reveal animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Design-system mesh background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
            Projects Showcase
          </p>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4"
          >
            Featured <span className="text-gradient">Work</span>
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A curated selection of industrial products — dynamically placed and prioritized by technical depth and engineering complexity.
          </p>
        </div>

        {/* ── Responsive Projects Grid ── */}
        <div className={gridClassName}>
          {sortedProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;

export type Category = "blockchain" | "ai" | "trading" | "games" | "mobile";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: { label: string; items: string[] }[];
  techIcons: string[];
  categories: Category[];
  accent: string;
  accentGlow: string;
  status: string;
  statusColor: string;
}

export const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "blockchain", label: "Blockchain" },
  { key: "ai", label: "AI-Powered" },
  { key: "trading", label: "Trading" },
  { key: "games", label: "Games & Creative" },
];

export const projects: Project[] = [
  {
    id: "vigil",
    name: "Vigil",
    tagline: "Solana meme coin tracker — published on the dApp Store",
    description:
      "A full-featured Solana mobile dApp for tracking trending meme coins, watching whale wallets, scanning token safety, and swapping via Jupiter DEX. Built for Seeker devices with Seed Vault wallet integration. Published to the Solana dApp Store with on-chain airdrop detection via Helius webhooks.",
    features: [
      "Real-time trending token feed with DexScreener integration",
      "Whale wallet watcher — monitor up to 10 wallets with activity feeds",
      "On-chain airdrop detection via Helius webhooks & Merkle Distributor monitoring",
      "Token safety scanner analyzing mint authority, freeze authority & holder concentration",
    ],
    stack: [
      { label: "Frontend", items: ["React Native", "Expo 55", "NativeWind", "Zustand"] },
      { label: "Backend", items: ["Supabase Edge Functions", "PostgreSQL", "Helius Webhooks"] },
      { label: "Blockchain", items: ["Solana Web3.js", "Mobile Wallet Adapter", "Jupiter DEX", "Token-2022"] },
    ],
    techIcons: ["React Native", "TypeScript", "Solana", "Supabase", "Expo"],
    categories: ["blockchain", "mobile"],
    accent: "#9945FF",
    accentGlow: "#c084fc",
    status: "Published",
    statusColor: "#22c55e",
  },
  {
    id: "solcash",
    name: "SolCash",
    tagline: "Solana trading terminal & analytics PWA",
    description:
      "A mobile-first Progressive Web App for Solana token discovery, portfolio tracking, and swapping. Features whale wallet monitoring, airdrop tracking, and real-time market data. Built with Next.js 16, Jupiter aggregator, and Helius RPC — optimized for the Seeker ecosystem.",
    features: [
      "Token discovery feed — trending, newest, volume-sorted via DexScreener",
      "Jupiter DEX swap integration with real-time quote fetching",
      "Portfolio tracking with SOL balance and parsed token holdings",
      "Seeker Genesis Token verification with exclusive badge",
    ],
    stack: [
      { label: "Frontend", items: ["Next.js 16", "React 19", "Tailwind CSS 4", "Zustand"] },
      { label: "APIs", items: ["Jupiter Aggregator", "DexScreener", "Helius RPC"] },
      { label: "Blockchain", items: ["Solana Wallet Adapter", "Mobile Wallet Adapter", "SPL Token"] },
    ],
    techIcons: ["Next.js", "TypeScript", "Solana", "Tailwind", "React"],
    categories: ["blockchain"],
    accent: "#14F195",
    accentGlow: "#5cfab0",
    status: "v0.1",
    statusColor: "#eab308",
  },
  {
    id: "chainrc",
    name: "ChainRC",
    tagline: "Blockchain-authenticated IRC chat on Matrix protocol",
    description:
      "An IRC-style mobile chat app where your Solana wallet is your identity. Connects to a self-hosted Matrix homeserver with ed25519 challenge-response authentication, .sol domain resolution, and retro terminal aesthetics. Full Docker deployment with Nginx TLS termination.",
    features: [
      "Solana wallet auth via ed25519 signature challenge-response",
      ".sol domain resolution for display names via Bonfida SPL Name Service",
      "12+ slash commands with autocomplete and custom macro system",
      "Full Docker deployment — Matrix Synapse, Nginx, Certbot, auth bridge",
    ],
    stack: [
      { label: "Frontend", items: ["React Native", "Zustand", "Reanimated", "JetBrains Mono"] },
      { label: "Backend", items: ["Matrix Synapse", "Express Auth Bridge", "JWT", "Docker"] },
      { label: "Blockchain", items: ["Solana Web3.js", "MWA", "Helius RPC", "Bonfida SNS"] },
    ],
    techIcons: ["React Native", "TypeScript", "Solana", "Docker", "Node.js"],
    categories: ["blockchain", "mobile"],
    accent: "#4AF262",
    accentGlow: "#7aff8f",
    status: "Production",
    statusColor: "#22c55e",
  },
  {
    id: "dendro",
    name: "Dendro",
    tagline: "AI-powered tree ring analysis — the first consumer dendrochronology app",
    description:
      "Photograph any tree cross-section and Claude Vision AI estimates its age, identifies the species, and maps historical stress events across its growth rings. A gamified mobile app with XP, ranks, badges, daily streaks, and an offline-first SQLite database that syncs to Supabase.",
    features: [
      "Claude Vision analyzes ring structure for age, species, growth rate & stress events",
      "10-tier rank system with XP, 6 badges, daily streaks, and a 'Guess the Age' mini-game",
      "Offline-first SQLite with background sync to Supabase cloud",
      "Dark wood/earth theme with Playfair Display & DM Mono typography",
    ],
    stack: [
      { label: "Frontend", items: ["React Native", "Expo 55", "Zustand", "Victory Native"] },
      { label: "Backend", items: ["Express Proxy", "Supabase", "SQLite"] },
      { label: "AI", items: ["Claude API (Vision)", "Dendrochronology Prompts"] },
    ],
    techIcons: ["React Native", "TypeScript", "Claude AI", "Supabase", "SQLite"],
    categories: ["ai", "mobile"],
    accent: "#c8860a",
    accentGlow: "#e9a520",
    status: "Active",
    statusColor: "#22c55e",
  },
  {
    id: "leafprint",
    name: "Leafprint",
    tagline: "AI-powered cannabis strain journal with genetic lineage maps",
    description:
      "A premium strain tracking journal with interactive genetic family trees, AI-powered recommendations via Claude, and Solana blockchain integration for payments and on-chain attestation. Features a dark luxury aesthetic with champagne gold accents and 50+ seed strains.",
    features: [
      "Interactive SVG lineage map — pinch-zoom genetic family trees, color-coded by strain type",
      "AI strain recommendations with match scoring after 2+ journal entries",
      "Solana MWA for on-chain payments and SPL Memo journal attestation",
      "Calendar heatmap, terpene profiles, relationship badges (First Date → Strain Soulmate)",
    ],
    stack: [
      { label: "Frontend", items: ["React Native", "Expo 54", "NativeWind", "SVG", "Lottie"] },
      { label: "Backend", items: ["Firebase", "Cloudflare Workers", "Firestore"] },
      { label: "AI & Web3", items: ["Claude API", "Solana MWA", "SPL Memo", "Helius RPC"] },
    ],
    techIcons: ["React Native", "TypeScript", "Claude AI", "Firebase", "Solana"],
    categories: ["ai", "mobile", "blockchain"],
    accent: "#D4AF37",
    accentGlow: "#e8c75a",
    status: "Pre-release",
    statusColor: "#eab308",
  },
  {
    id: "wildcardnature",
    name: "WildCard Nature",
    tagline: "Turn wildlife photos into AI-generated collectible trading cards",
    description:
      "A gamified wildlife photography app that transforms real-world animal photos into stylized digital trading cards using Stability AI. Features rarity tiers, daily streaks, XP progression, and Solana NFT minting. Cards are generated in multiple art styles (Ghibli, crochet, pixel) with EXIF-derived lore.",
    features: [
      "Stability AI generates stylized card artwork from camera captures",
      "Rarity system — Common to Ultra Rare with Standard, Full Art, Shiny & Mythic variants",
      "Solana NFT minting with IPFS storage via Pinata for Rare+ cards",
      "Regional species index — Claude AI generates 15 species per GPS region",
    ],
    stack: [
      { label: "Frontend", items: ["React Native", "Redux Toolkit", "Vision Camera", "Reanimated"] },
      { label: "Backend", items: ["Cloudflare Workers", "Firebase Firestore", "Pinata IPFS"] },
      { label: "AI & Web3", items: ["Stability AI", "Claude Haiku", "Solana Web3.js", "MWA"] },
    ],
    techIcons: ["React Native", "TypeScript", "Stability AI", "Solana", "Firebase"],
    categories: ["ai", "games", "blockchain"],
    accent: "#34d399",
    accentGlow: "#6ee7b7",
    status: "v1.2",
    statusColor: "#22c55e",
  },
  {
    id: "kalshi-bot",
    name: "Kalshi Trading Bot",
    tagline: "Multi-agent algorithmic prediction market trading system",
    description:
      "An autonomous trading bot for Kalshi prediction markets with multiple specialized agents: BTC 15-minute momentum, daily crypto log-normal models, NOAA weather arbitrage, and latency exploitation. Features quarter-Kelly position sizing, circuit breakers, and a real-time Flask SSE dashboard.",
    features: [
      "4 autonomous agents — BTC 15m momentum, crypto log-normal, weather arb, latency exploitation",
      "Comprehensive risk engine — Kelly sizing, per-category caps, stop-loss cooldowns, daily loss limits",
      "Real-time dashboard with SSE — portfolio, risk gauges, agent status, sparkline charts",
      "Multi-source data — Binance, NOAA, FRED, Kalshi order book",
    ],
    stack: [
      { label: "Backend", items: ["Python", "Flask", "scipy", "numpy"] },
      { label: "Data Sources", items: ["Kalshi API", "Binance", "NOAA", "FRED"] },
      { label: "Infrastructure", items: ["RSA-PSS Auth", "CSV Audit Trail", "Daily Log Rotation"] },
    ],
    techIcons: ["Python", "Flask", "NumPy", "REST APIs"],
    categories: ["trading"],
    accent: "#3b82f6",
    accentGlow: "#60a5fa",
    status: "Active",
    statusColor: "#22c55e",
  },
  {
    id: "rust-bot",
    name: "Rust Bot",
    tagline: "Performance rewrite of the trading bot — Python to Rust",
    description:
      "A ground-up Rust rewrite of the Kalshi trading bot, replacing JSON files with SQLite, adding hot-reloadable config via Arc<RwLock>, and building a Tokio async runtime with graceful shutdown. Phase 1 (foundation) complete with Axum web server, RSA-PSS auth, and risk engine.",
    features: [
      "Tokio async runtime with CancellationToken for graceful shutdown",
      "RSA-PSS authentication — exact parity with Python implementation",
      "SQLite via rusqlite — replaces JSON, eliminates race conditions",
      "Hot-reloadable config via Arc<RwLock> with persistent overrides",
    ],
    stack: [
      { label: "Core", items: ["Rust", "Tokio", "Axum", "rusqlite"] },
      { label: "Crypto", items: ["rsa", "sha2", "base64", "RSA-PSS"] },
      { label: "Infrastructure", items: ["Cargo Workspace", "tracing", "governor", "statrs"] },
    ],
    techIcons: ["Rust", "Tokio", "SQLite", "Axum"],
    categories: ["trading"],
    accent: "#f97316",
    accentGlow: "#fb923c",
    status: "Phase 1",
    statusColor: "#eab308",
  },
  {
    id: "miniputt",
    name: "MiniPutt Mobile",
    tagline: "3D mini-golf game ported to Android with blockchain integration",
    description:
      "A full mobile port of the Neverputt mini-golf engine — 117 holes across 9 courses, rendered in OpenGL ES via SDL2 and Android NDK. Features touch drag-to-aim controls, haptic feedback, AdMob monetization, and a Solana wallet-gated exclusive ball skin for Seeker Genesis Token holders.",
    features: [
      "C/OpenGL ES game engine with 117 holes across 9 courses via Android NDK",
      "Touch drag-to-aim + tap-swing with configurable sensitivity and haptic feedback",
      "AdMob interstitial + rewarded ads (mulligan system for fallen balls)",
      "Solana MWA wallet verification — exclusive ball skin for Genesis Token holders",
    ],
    stack: [
      { label: "Engine", items: ["C", "SDL2", "OpenGL ES 1.1", "libvorbis", "libpng"] },
      { label: "Android", items: ["NDK", "CMake", "Gradle", "Kotlin (wallet)"] },
      { label: "Monetization", items: ["AdMob SDK", "Solana MWA", "Token-2022 Verification"] },
    ],
    techIcons: ["C", "OpenGL", "Android", "Solana", "Kotlin"],
    categories: ["games", "blockchain"],
    accent: "#22c55e",
    accentGlow: "#4ade80",
    status: "Near Launch",
    statusColor: "#eab308",
  },
  {
    id: "shellshine",
    name: "ShellShine",
    tagline: "GPU shader-powered sea shell polishing experience",
    description:
      "A delightful mobile app that transforms sea shell photos into glossy, iridescent collectibles using custom Skia GPU shaders. Features barrel distortion, chromatic aberration, FBM noise dissolve, mother-of-pearl iridescence, and device-tilt parallax — all rendered at 60fps via React Native Skia.",
    features: [
      "Custom SkSL shaders — barrel distortion, chromatic aberration, Fresnel rim lighting",
      "FBM noise dissolve with iridescent mother-of-pearl shimmer effect",
      "Accelerometer-driven parallax and drag-to-rotate gesture interaction",
      "16 real species database with rarity tiers and fun facts",
    ],
    stack: [
      { label: "Frontend", items: ["React Native", "Shopify Skia", "Reanimated", "Gesture Handler"] },
      { label: "Rendering", items: ["SkSL Shaders", "RuntimeEffect", "Canvas API"] },
      { label: "Hardware", items: ["Accelerometer", "Vision Camera", "Haptics"] },
    ],
    techIcons: ["React Native", "TypeScript", "Skia", "GPU Shaders"],
    categories: ["games", "mobile"],
    accent: "#00B4D8",
    accentGlow: "#38bdf8",
    status: "In Dev",
    statusColor: "#eab308",
  },
  {
    id: "gematria",
    name: "Gematria Oracle",
    tagline: "Native Android numerology calculator with glassmorphism UI",
    description:
      "A production-ready Android app that converts text into numerical values using four classical English gematria ciphers. Built entirely in Kotlin with Jetpack Compose, featuring animated glassmorphism cipher cards with neon glow effects, news article scraping via Jsoup, and a local Room database for history.",
    features: [
      "4 ciphers calculated simultaneously — Ordinal, Reduction, Reverse, Reverse Reduction",
      "Animated glassmorphism cards with neon glow and particle burst effects",
      "News article scraping — Jsoup + OkHttp extract text from any URL",
      "History with favorites, number meanings database, share as text or image",
    ],
    stack: [
      { label: "UI", items: ["Kotlin", "Jetpack Compose", "Material Design 3"] },
      { label: "Architecture", items: ["MVVM", "Hilt DI", "Room", "DataStore"] },
      { label: "Network", items: ["OkHttp", "Jsoup", "Coroutines"] },
    ],
    techIcons: ["Kotlin", "Jetpack Compose", "Android", "Material 3"],
    categories: ["games", "mobile"],
    accent: "#a855f7",
    accentGlow: "#c084fc",
    status: "MVP",
    statusColor: "#22c55e",
  },
];

export const sections = [
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    subtitle: "Full Solana stack — from mobile wallet adapters to dApp Store publishing",
    projectIds: ["vigil", "solcash", "chainrc"],
  },
  {
    id: "ai",
    title: "AI-Powered Experiences",
    subtitle: "AI as the core value proposition, not a bolt-on feature",
    projectIds: ["dendro", "leafprint", "wildcardnature"],
  },
  {
    id: "trading",
    title: "Trading & Quantitative Systems",
    subtitle: "From Python prototype to production Rust — data science meets systems engineering",
    projectIds: ["kalshi-bot", "rust-bot"],
  },
  {
    id: "creative",
    title: "Games & Creative Tools",
    subtitle: "Low-level graphics programming to polished consumer UX",
    projectIds: ["miniputt", "shellshine", "gematria"],
  },
];

export const stats = [
  { value: 11, label: "Projects Built" },
  { value: 6, label: "Languages" },
  { value: 1, label: "Published dApp" },
  { value: 4, label: "Trading Agents" },
  { value: 117, label: "Golf Holes" },
  { value: 2, label: "GPU Shaders" },
];

export const skills = [
  { category: "Languages", items: ["TypeScript", "Python", "Kotlin", "Rust", "C", "SQL"] },
  { category: "Mobile", items: ["React Native", "Expo", "Jetpack Compose", "Android NDK"] },
  { category: "Web", items: ["Next.js", "React", "Flask", "Axum", "Tailwind"] },
  { category: "Blockchain", items: ["Solana Web3.js", "MWA", "Token-2022", "SPL", "NFT Minting"] },
  { category: "AI / ML", items: ["Claude API", "Stability AI", "Probability Modeling", "Vision"] },
  { category: "Infrastructure", items: ["Docker", "Nginx", "Supabase", "Firebase", "Cloudflare Workers"] },
  { category: "Databases", items: ["SQLite", "Room", "PostgreSQL", "Firestore"] },
  { category: "Graphics", items: ["OpenGL ES", "Skia / SkSL", "Reanimated", "Framer Motion"] },
];

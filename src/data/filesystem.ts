import type { FileNode } from "../state/types";

// ─────────────────────────────────────────────────────────────────────────────
//  Virtual FAT filesystem tree
//  Root represents C:\
// ─────────────────────────────────────────────────────────────────────────────

export const filesystem: FileNode = {
  name: "C:",
  type: "directory",
  children: [
    {
      name: "AUTOEXEC.BAT",
      type: "file",
      size: 89,
      date: "04-12-94",
      // Actual content is managed by the store (autoexecBat); this is a placeholder.
      content: "",
    },
    {
      name: "CONFIG.SYS",
      type: "file",
      size: 78,
      date: "04-12-94",
      // Actual content is managed by the store (configSys); this is a placeholder.
      content: "",
    },
    {
      name: "COMMAND.COM",
      type: "file",
      size: 54619,
      date: "09-30-93",
      content: "",
    },
    {
      name: "HIMEM.SYS",
      type: "file",
      size: 29136,
      date: "09-30-93",
      content: "",
    },

    // ── DOS\ ──────────────────────────────────────────────────────────────────
    {
      name: "DOS",
      type: "directory",
      children: [
        { name: "EDIT.COM",   type: "file", size: 413,   date: "09-30-93", content: "" },
        { name: "MEM.EXE",    type: "file", size: 32150, date: "09-30-93", content: "" },
        { name: "HELP.EXE",   type: "file", size: 8896,  date: "09-30-93", content: "" },
        { name: "VER.EXE",    type: "file", size: 128,   date: "09-30-93", content: "" },
        { name: "FORMAT.COM", type: "file", size: 22916, date: "09-30-93", content: "" },
      ],
    },

    // ── WINDOWS\ ──────────────────────────────────────────────────────────────
    {
      name: "WINDOWS",
      type: "directory",
      children: [
        { name: "WIN.COM",      type: "file", size: 26032, date: "03-10-92", content: "" },
        { name: "PROGMAN.EXE",  type: "file", size: 112,   date: "03-10-92", content: "" },
        { name: "NOTEPAD.EXE",  type: "file", size: 24,    date: "03-10-92", content: "" },
        {
          name: "SYSTEM",
          type: "directory",
          children: [
            { name: "KRNL386.EXE", type: "file", size: 75490, date: "03-10-92", content: "" },
            { name: "GDI.EXE",     type: "file", size: 42,    date: "03-10-92", content: "" },
          ],
        },
      ],
    },

    // ── USERS\ ────────────────────────────────────────────────────────────────
    {
      name: "USERS",
      type: "directory",
      children: [
        {
          name: "ROG",
          type: "directory",
          children: [
            {
              name: "ABOUT.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║                                                          ║
║    ██████╗  ██████╗  ██████╗                            ║
║    ██╔══██╗██╔═══██╗██╔════╝                            ║
║    ██████╔╝██║   ██║██║  ███╗                           ║
║    ██╔══██╗██║   ██║██║   ██║                           ║
║    ██║  ██║╚██████╔╝╚██████╔╝                           ║
║    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝                           ║
║                                                          ║
║    Full-Stack & Mobile Engineer                          ║
║    Blockchain · AI · Systems · Mobile                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

  ABOUT ME
  ════════

  Hey — I'm Jay. I build things that ship.

  Full-stack and mobile engineer with a focus on the edges
  of the stack: Solana blockchain, on-device AI, systems
  programming in Rust and C, and polished React Native UX.

  I'm drawn to projects where the technical problem IS the
  product — GPU shaders that feel like magic, trading bots
  that survive real markets, mobile dApps that work without
  a laptop nearby.

  WHAT I DO
  ─────────
  ■ Solana dApps  — Mobile Wallet Adapter, Jupiter DEX,
                    Token-2022, dApp Store publishing
  ■ AI Products   — Claude Vision & API, Stability AI,
                    on-device inference pipelines
  ■ Mobile        — React Native / Expo, Jetpack Compose,
                    Android NDK (C/OpenGL ES)
  ■ Systems       — Rust async (Tokio/Axum), C game engines,
                    algorithmic trading bots
  ■ Infrastructure— Docker, Supabase, Firebase, Cloudflare

  Currently based on planet Earth. Shipping daily.

───────────────────────────────────────────────────────────
  Type  DIR C:\\PROJECTS  to see what I've built.
  Type  TYPE C:\\USERS\\ROG\\RESUME.TXT  for full resume.
───────────────────────────────────────────────────────────`,
            },
            {
              name: "RESUME.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║   Jay — FULL-STACK & MOBILE ENGINEER                     ║
║   Blockchain · AI · Mobile · Systems                     ║
╚══════════════════════════════════════════════════════════╝

SUMMARY
═══════
  Full-stack and mobile engineer specialising in Solana
  blockchain dApps, AI-integrated mobile experiences, and
  systems programming. Shipped 11 projects across React
  Native, Rust, C, Kotlin, and Python — from a published
  Solana dApp Store app to a C/OpenGL ES Android game engine.
  Comfortable owning the full stack: UI, backend, infra,
  on-chain contracts, and GPU shaders.

SKILLS
══════
  Languages:   TypeScript · Python · Kotlin · Rust · C · SQL

  Mobile:      React Native · Expo · Jetpack Compose
               Android NDK · NativeWind · Reanimated

  Web:         Next.js 16 · React 19 · Flask · Axum
               Tailwind CSS · Cloudflare Workers

  Blockchain:  Solana Web3.js · Mobile Wallet Adapter (MWA)
               SPL Token · Token-2022 · Jupiter DEX
               Helius RPC · Bonfida SNS · NFT Minting

  AI:          Claude API (Vision + Text) · Stability AI
               Probability Modelling · SkSL Shaders

  Infra:       Docker · Nginx · Supabase · Firebase
               Cloudflare Workers · Matrix Synapse

  Databases:   SQLite · Room · PostgreSQL · Firestore
               Supabase Edge Functions

PROJECTS
════════
  VIGIL           Solana meme coin tracker — dApp Store
  SOLCASH         Solana trading terminal PWA
  CHAINRC         Blockchain IRC chat on Matrix protocol
  DENDRO          AI tree ring analysis (Claude Vision)
  LEAFPRINT       AI cannabis strain journal
  WILDCARD        Wildlife photo AI trading card game
  KALSHI-BOT      Multi-agent prediction market bot
  RUST-BOT        Kalshi bot rewrite in Rust / Tokio
  MINIPUTT        C/OpenGL ES 3D mini-golf (117 holes)
  SHELLSHINE      GPU shader sea shell polishing app
  GEMATRIA        Android numerology calculator (Kotlin)

  See C:\\PROJECTS\\ for detailed README on each project.

EDUCATION
═════════
  [Available upon request]

───────────────────────────────────────────────────────────
  GitHub / LinkedIn / Email — see CONTACT.TXT
───────────────────────────────────────────────────────────`,
            },
            {
              name: "SKILLS.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║   SKILLS & TECHNOLOGIES                                  ║
╚══════════════════════════════════════════════════════════╝

  LANGUAGES
  ─────────
  ■ TypeScript    Primary language — everything frontend/backend
  ■ Python        Trading bots, data pipelines, Flask APIs
  ■ Kotlin        Native Android (Jetpack Compose, Hilt, Room)
  ■ Rust          Systems rewrite work — Tokio, Axum, rusqlite
  ■ C             Game engine work — SDL2, OpenGL ES, Android NDK
  ■ SQL           PostgreSQL, SQLite, Supabase

  MOBILE
  ──────
  ■ React Native + Expo    Cross-platform iOS/Android
  ■ Jetpack Compose        Native Android UI toolkit
  ■ Android NDK            C interop, CMake, JNI
  ■ Reanimated / Skia      60fps animations & GPU shaders

  WEB
  ───
  ■ Next.js 16    App Router, SSR, API routes
  ■ React 19      Concurrent features, hooks
  ■ Axum          Rust async web framework
  ■ Flask         Python microservices

  BLOCKCHAIN
  ──────────
  ■ Solana Web3.js         Transaction building, RPC calls
  ■ Mobile Wallet Adapter  Seeker / Seed Vault integration
  ■ SPL Token / Token-2022 Mint management, token accounts
  ■ Jupiter DEX            Swap aggregation, quote APIs
  ■ Helius                 Webhooks, enhanced transactions

  AI / ML
  ───────
  ■ Claude API    Vision analysis, text generation
  ■ Stability AI  Image generation (card art, wildlife)
  ■ scipy / numpy Probability models for trading

  INFRASTRUCTURE
  ──────────────
  ■ Docker + Nginx    Containerised self-hosted services
  ■ Supabase          Postgres + Edge Functions + Auth
  ■ Firebase          Firestore, Hosting, Cloud Functions
  ■ Cloudflare Workers  Edge compute, API proxies

───────────────────────────────────────────────────────────`,
            },
            {
              name: "CONTACT.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║   CONTACT INFORMATION                                    ║
╚══════════════════════════════════════════════════════════╝

  ┌─────────────────────────────────────────────────────┐
  │  GitHub    github.com/dxutakerxd              │
  │  LinkedIn  linkedin.com/in/*          │
  │  Email     [available upon request]                │
  └─────────────────────────────────────────────────────┘

  PREFERRED CONTACT
  ─────────────────
  GitHub is the best place to see my work and reach out.
  Open to collaborations, contract work, and interesting
  problems worth solving.

  RESPONSE TIME
  ─────────────
  Typically within 24-48 hours. Faster for anything
  involving Solana, Rust, or AI integrations.

  ■ Available for: contract / freelance / full-time
  ■ Remote-first preferred
  ■ Open source contributions welcome

───────────────────────────────────────────────────────────
  "The best way to predict the future is to build it."
───────────────────────────────────────────────────────────`,
            },
          ],
        },
      ],
    },

    // ── PROJECTS\ ─────────────────────────────────────────────────────────────
    {
      name: "PROJECTS",
      type: "directory",
      children: [
        {
          name: "VIGIL",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  VIGIL - Solana Meme Coin Tracker                        ║
║  Status: Published (Solana dApp Store)                   ║
╚══════════════════════════════════════════════════════════╝

Full-featured Solana mobile dApp for tracking trending meme
coins, watching whale wallets, scanning token safety, and
swapping via Jupiter DEX. Built for Seeker devices with Seed
Vault wallet integration. The only meme coin tracker
published on the official Solana dApp Store.

STACK:  React Native · Expo 55 · NativeWind · Zustand
        Supabase · Helius Webhooks · Solana Web3.js
        Mobile Wallet Adapter · Jupiter DEX · Token-2022

FEATURES:
  ■ Real-time trending token feed via DexScreener
  ■ Whale wallet watcher — monitor up to 10 wallets
  ■ On-chain airdrop detection via Helius webhooks
  ■ Token safety scanner (mint auth, freeze auth, holders)

───────────────────────────────────────────────────────────
  First meme coin tracker published on the Solana dApp Store
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "SOLCASH",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  SOLCASH - Solana Trading Terminal PWA                   ║
║  Status: v0.1                                            ║
╚══════════════════════════════════════════════════════════╝

Mobile-first Progressive Web App for Solana token discovery,
portfolio tracking, and swapping. Features whale monitoring,
airdrop tracking, and real-time market data. Optimised for
the Seeker ecosystem with Seeker Genesis Token badge support.

STACK:  Next.js 16 · React 19 · Tailwind CSS 4 · Zustand
        Jupiter Aggregator · DexScreener · Helius RPC
        Solana Wallet Adapter · MWA · SPL Token

FEATURES:
  ■ Token discovery feed — trending, newest, volume-sorted
  ■ Jupiter DEX swap integration with live quote fetching
  ■ Portfolio tracking with SOL balance & token holdings
  ■ Seeker Genesis Token verification with exclusive badge

───────────────────────────────────────────────────────────
  PWA — installable on Android without app store
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "CHAINRC",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  CHAINRC - Blockchain IRC on Matrix Protocol             ║
║  Status: Production                                      ║
╚══════════════════════════════════════════════════════════╝

IRC-style mobile chat where your Solana wallet is your
identity. Connects to a self-hosted Matrix homeserver with
ed25519 challenge-response auth, .sol domain resolution,
and retro terminal aesthetics. Full Docker deployment.

STACK:  React Native · Zustand · Reanimated · JetBrains Mono
        Matrix Synapse · Express Auth Bridge · JWT · Docker
        Solana Web3.js · MWA · Helius RPC · Bonfida SNS

FEATURES:
  ■ Solana wallet auth via ed25519 signature challenge
  ■ .sol domain resolution for display names (Bonfida SNS)
  ■ 12+ slash commands with autocomplete & custom macros
  ■ Docker stack — Synapse, Nginx, Certbot, auth bridge

───────────────────────────────────────────────────────────
  Your wallet IS your username — no passwords, no email
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "DENDRO",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  DENDRO - AI Tree Ring Analysis                          ║
║  Status: Active                                          ║
╚══════════════════════════════════════════════════════════╝

Photograph any tree cross-section and Claude Vision AI
estimates its age, identifies the species, and maps
historical stress events across growth rings. The first
consumer dendrochronology app — gamified with XP and ranks.

STACK:  React Native · Expo 55 · Zustand · Victory Native
        Express Proxy · Supabase · SQLite
        Claude API (Vision) · Dendrochronology Prompts

FEATURES:
  ■ Claude Vision: age, species, growth rate, stress events
  ■ 10-tier rank system, 6 badges, daily streaks
  ■ 'Guess the Age' mini-game
  ■ Offline-first SQLite with background Supabase sync

───────────────────────────────────────────────────────────
  First consumer app for dendrochronology (tree ring dating)
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "LEAFPRNT",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  LEAFPRINT - AI Cannabis Strain Journal                  ║
║  Status: Pre-release                                     ║
╚══════════════════════════════════════════════════════════╝

Premium strain tracking journal with interactive genetic
family trees, AI-powered recommendations via Claude, and
Solana blockchain integration for payments and on-chain
journal attestation. 50+ seed strains in the database.

STACK:  React Native · Expo 54 · NativeWind · SVG · Lottie
        Firebase · Cloudflare Workers · Firestore
        Claude API · Solana MWA · SPL Memo · Helius RPC

FEATURES:
  ■ SVG lineage map — pinch-zoom genetic family trees
  ■ AI strain recommendations with match scoring
  ■ Solana MWA payments + SPL Memo journal attestation
  ■ Calendar heatmap, terpene profiles, relationship badges

───────────────────────────────────────────────────────────
  Relationship badges: First Date → Strain Soulmate
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "WILDCARD",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  WILDCARD NATURE - Wildlife AI Trading Cards             ║
║  Status: v1.2                                            ║
╚══════════════════════════════════════════════════════════╝

Gamified wildlife photography app that transforms real animal
photos into stylized digital trading cards using Stability AI.
Rarity tiers, daily streaks, XP progression, and Solana NFT
minting. Cards generated in Ghibli, crochet, and pixel art.

STACK:  React Native · Redux Toolkit · Vision Camera
        Cloudflare Workers · Firebase Firestore · Pinata IPFS
        Stability AI · Claude Haiku · Solana Web3.js · MWA

FEATURES:
  ■ Stability AI card art from camera captures
  ■ Rarity: Common → Ultra Rare, Standard/Full Art/Shiny
  ■ Solana NFT minting with IPFS via Pinata (Rare+)
  ■ Regional species index — Claude generates 15 per GPS zone

───────────────────────────────────────────────────────────
  EXIF metadata becomes in-card lore automatically
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "KALSHI",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  KALSHI BOT - Algorithmic Prediction Market Trader       ║
║  Status: Active                                          ║
╚══════════════════════════════════════════════════════════╝

Autonomous trading bot for Kalshi prediction markets with
four specialised agents: BTC momentum, crypto log-normal
models, NOAA weather arbitrage, and latency exploitation.
Quarter-Kelly sizing, circuit breakers, real-time dashboard.

STACK:  Python · Flask · scipy · numpy
        Kalshi API · Binance · NOAA · FRED
        RSA-PSS Auth · CSV Audit Trail · Daily Log Rotation

FEATURES:
  ■ 4 agents: BTC 15m, crypto log-normal, weather, latency
  ■ Risk engine: Kelly sizing, category caps, stop-loss
  ■ Real-time Flask SSE dashboard with sparklines
  ■ Multi-source data: Binance, NOAA, FRED, order book

───────────────────────────────────────────────────────────
  Rewritten in Rust — see RUSTBOT directory
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "RUSTBOT",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  RUST BOT - Trading Bot Rewrite in Rust                  ║
║  Status: Phase 1 Complete                                ║
╚══════════════════════════════════════════════════════════╝

Ground-up Rust rewrite of the Kalshi trading bot, replacing
JSON files with SQLite, adding hot-reloadable config via
Arc<RwLock>, and building a Tokio async runtime with graceful
shutdown. Phase 1 (foundation) complete.

STACK:  Rust · Tokio · Axum · rusqlite
        rsa · sha2 · base64 · RSA-PSS
        Cargo Workspace · tracing · governor · statrs

FEATURES:
  ■ Tokio async runtime with CancellationToken shutdown
  ■ RSA-PSS auth with exact Python implementation parity
  ■ SQLite via rusqlite — replaces JSON, no race conditions
  ■ Hot-reloadable config via Arc<RwLock<Config>>

───────────────────────────────────────────────────────────
  Type-safe at compile time what Python caught at runtime
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "MINIPUTT",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  MINIPUTT MOBILE - 3D Mini-Golf for Android              ║
║  Status: Near Launch                                     ║
╚══════════════════════════════════════════════════════════╝

Full mobile port of the Neverputt mini-golf engine — 117
holes across 9 courses, rendered in OpenGL ES via SDL2 and
Android NDK. Touch drag-to-aim, haptic feedback, AdMob, and
a Solana wallet-gated exclusive ball skin.

STACK:  C · SDL2 · OpenGL ES 1.1 · libvorbis · libpng
        Android NDK · CMake · Gradle · Kotlin (wallet)
        AdMob SDK · Solana MWA · Token-2022 Verification

FEATURES:
  ■ 117 holes across 9 full courses via Android NDK
  ■ Touch drag-to-aim + tap-swing with haptic feedback
  ■ AdMob interstitial + rewarded ads (mulligan system)
  ■ Solana MWA wallet gate for Genesis Token ball skin

───────────────────────────────────────────────────────────
  117 holes ported from desktop to mobile — all in C
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "SHELLSHN",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  SHELLSHINE - GPU Shader Sea Shell App                   ║
║  Status: In Development                                  ║
╚══════════════════════════════════════════════════════════╝

Delightful mobile app that transforms sea shell photos into
glossy, iridescent collectibles using custom Skia GPU shaders.
Barrel distortion, chromatic aberration, FBM noise dissolve,
mother-of-pearl iridescence — all at 60fps.

STACK:  React Native · Shopify Skia · Reanimated
        SkSL Shaders · RuntimeEffect · Canvas API
        Accelerometer · Vision Camera · Haptics

FEATURES:
  ■ SkSL shaders: barrel distortion, chromatic aberration
  ■ FBM noise dissolve with mother-of-pearl shimmer
  ■ Accelerometer-driven parallax + drag-to-rotate
  ■ 16 real species database with rarity tiers & fun facts

───────────────────────────────────────────────────────────
  Custom SkSL shaders running at 60fps on mobile GPU
───────────────────────────────────────────────────────────`,
            },
          ],
        },
        {
          name: "GEMATRIA",
          type: "directory",
          children: [
            {
              name: "README.TXT",
              type: "file",
              date: "04-12-94",
              content: `╔══════════════════════════════════════════════════════════╗
║  GEMATRIA ORACLE - Android Numerology Calculator         ║
║  Status: MVP                                             ║
╚══════════════════════════════════════════════════════════╝

Production-ready Android app that converts text into
numerical values using four classical English gematria
ciphers. Kotlin + Jetpack Compose with animated glassmorphism
cipher cards, news article scraping, and Room database.

STACK:  Kotlin · Jetpack Compose · Material Design 3
        MVVM · Hilt DI · Room · DataStore
        OkHttp · Jsoup · Coroutines

FEATURES:
  ■ 4 ciphers calculated simultaneously — Ordinal, Reduction,
    Reverse Ordinal, Reverse Reduction
  ■ Animated glassmorphism cards with neon glow effects
  ■ News article scraping via Jsoup + OkHttp
  ■ History with favourites, number meanings, share as image

───────────────────────────────────────────────────────────
  Pure Kotlin — zero cross-platform dependencies
───────────────────────────────────────────────────────────`,
            },
          ],
        },
      ],
    },

    // ── GAMES\ ────────────────────────────────────────────────────────────────
    {
      name: "GAMES",
      type: "directory",
      children: [
        {
          name: "SNAKE.EXE",
          type: "file",
          size: 4096,
          date: "04-12-94",
          content: "",
        },
      ],
    },

    // ── SECRETS\ (hidden) ─────────────────────────────────────────────────────
    {
      name: "SECRETS",
      type: "directory",
      hidden: true,
      children: [
        {
          name: "README.TXT",
          type: "file",
          date: "04-12-94",
          content: `╔══════════════════════════════════════════════════════════╗
║  YOU FOUND THE HIDDEN DIRECTORY                          ║
╚══════════════════════════════════════════════════════════╝

  Not bad for a DOS user.

  Most people just type DIR and move on.
  You typed DIR /AH or went looking.

  There's nothing particularly secret here — just a note
  that paying attention to details matters. In code, in
  markets, in life.

  ■ Easter egg found: +100 XP
  ■ Achievement unlocked: "Power User"

───────────────────────────────────────────────────────────
  "The quieter you become, the more you can hear."
───────────────────────────────────────────────────────────`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  Path helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise a raw DOS path to uppercase with no trailing backslash.
 * e.g.  "c:\users\rog\" → "C:\USERS\ROG"
 *        "C:"            → "C:"
 */
function normalisePath(p: string): string {
  let s = p.toUpperCase().replace(/\//g, "\\");
  // Strip trailing backslash unless it's the root "C:\"
  if (s.endsWith("\\") && s.length > 3) {
    s = s.slice(0, -1);
  }
  return s;
}

/**
 * Resolve a relative or absolute DOS path against the current working directory.
 * Handles: absolute paths, "..", ".", and bare names.
 */
export function resolvePath(cwd: string, input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return normalisePath(cwd);

  const upper = trimmed.toUpperCase().replace(/\//g, "\\");

  // Absolute path (starts with "C:\\" or "C:")
  if (/^[A-Z]:\\/.test(upper)) {
    return normalisePath(upper);
  }
  if (/^[A-Z]:$/.test(upper)) {
    return upper;
  }

  // Relative — split cwd into parts
  const base = normalisePath(cwd);
  // "C:\USERS\ROG" → ["C:", "USERS", "ROG"]  |  "C:" → ["C:"]
  const cwdParts = base === "C:" ? ["C:"] : base.split("\\");
  const segments = upper.split("\\");

  const parts = [...cwdParts];
  for (const seg of segments) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      if (parts.length > 1) parts.pop();
    } else {
      parts.push(seg);
    }
  }

  if (parts.length === 1) return parts[0]; // "C:"
  return parts.join("\\");
}

/**
 * Traverse the virtual filesystem tree to find the node at the given absolute path.
 * Path must be absolute (e.g. "C:\USERS\ROG" or "C:").
 * Returns null if not found.
 */
export function getNode(path: string): FileNode | null {
  const p = normalisePath(path);

  // Root
  if (p === "C:" || p === "C:\\") return filesystem;

  const parts = p.split("\\").slice(1); // drop "C:"
  let current: FileNode = filesystem;

  for (const part of parts) {
    if (!current.children) return null;
    const child = current.children.find(
      (c) => c.name.toUpperCase() === part.toUpperCase()
    );
    if (!child) return null;
    current = child;
  }
  return current;
}

/**
 * Return the children of a directory node at the given path.
 * Returns an empty array if the path doesn't exist or is not a directory.
 */
export function getChildren(path: string): FileNode[] {
  const node = getNode(path);
  if (!node || node.type !== "directory" || !node.children) return [];
  return node.children;
}

// ─────────────────────────────────────────────────────────────────────────────
//  DIR formatting helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format a filename into 8.3 DOS format, padded for DIR listing.
 * e.g. "AUTOEXEC.BAT" → "AUTOEXEC BAT"  (8 + 1 space + 3)
 *      "COMMAND.COM"  → "COMMAND  COM"
 *      "DOS"          → "DOS          "  (directory, no extension)
 */
function formatName83(name: string): string {
  const dotIdx = name.lastIndexOf(".");
  let base: string;
  let ext: string;

  if (dotIdx > 0) {
    base = name.slice(0, dotIdx);
    ext = name.slice(dotIdx + 1);
  } else {
    base = name;
    ext = "";
  }

  const paddedBase = base.padEnd(8).slice(0, 8);
  const paddedExt = ext.padEnd(3).slice(0, 3);
  return `${paddedBase} ${paddedExt}`;
}

/**
 * Format a single DIR entry in authentic MS-DOS 6.x style:
 *
 *   AUTOEXEC BAT           89 04-12-94   6:00a
 *   DOS           <DIR>         04-12-94   6:00a
 */
export function formatDirEntry(node: FileNode): string {
  const name = formatName83(node.name.toUpperCase());
  const date = node.date ?? "01-01-94";
  const time = "  6:00a";

  if (node.type === "directory") {
    return `${name}      <DIR>         ${date}${time}`;
  }

  const size = String(node.size ?? 0).padStart(12);
  return `${name}  ${size}  ${date}${time}`;
}

/**
 * Produce a full DIR listing for the given absolute path, matching DOS output:
 *
 *  Volume in drive C has no label
 *  Volume Serial Number is 1A2B-3C4D
 *  Directory of C:\USERS\ROG
 *
 *  .              <DIR>         04-12-94   6:00a
 *  ..             <DIR>         04-12-94   6:00a
 *  ABOUT    TXT           1024  04-12-94   6:00a
 *        3 file(s)         1234 bytes
 *        2 dir(s)    52,428,800 bytes free
 */
export function formatDirListing(path: string): string[] {
  const normPath = normalisePath(path);
  const node = getNode(normPath);
  const lines: string[] = [];

  lines.push(" Volume in drive C has no label");
  lines.push(" Volume Serial Number is 1A2B-3C4D");
  lines.push(` Directory of ${normPath}`);
  lines.push("");

  if (!node || node.type !== "directory") {
    lines.push("File not found");
    return lines;
  }

  const children = node.children ?? [];

  // Dot entries
  lines.push(`${formatName83(".")}           <DIR>         04-12-94   6:00a`);
  lines.push(`${formatName83("..")}           <DIR>         04-12-94   6:00a`);

  let fileCount = 0;
  let totalBytes = 0;
  let dirCount = 0;

  for (const child of children) {
    if (child.hidden) continue; // hidden files not shown without /AH
    lines.push(formatDirEntry(child));
    if (child.type === "directory") {
      dirCount++;
    } else {
      fileCount++;
      totalBytes += child.size ?? 0;
    }
  }

  lines.push("");
  lines.push(
    `       ${fileCount} file(s)    ${totalBytes.toLocaleString()} bytes`
  );
  lines.push(`       ${dirCount + 2} dir(s)  52,428,800 bytes free`);

  return lines;
}

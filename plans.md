# Portfolio Page — Outline & Gameplan

## Project Inventory (11 Showcase Projects)

| # | Project | Type | Stack Highlights | Status |
|---|---------|------|------------------|--------|
| 1 | **Dendro** | AI Tree Ring Analysis App | React Native, Expo, Claude Vision, Supabase, SQLite | Active |
| 2 | **Kalshi Trading Bot** | Algorithmic Prediction Market Bot | Python, Flask, Kalshi API, Binance, NOAA, scipy/numpy | Active |
| 3 | **Leafprint** | Cannabis Strain Journal | React Native, Expo, Firebase, Solana MWA, Claude AI | Pre-release |
| 4 | **ChainRC** | Blockchain IRC Chat | React Native, Matrix Protocol, Solana MWA, Docker | Production |
| 5 | **Gematria Oracle** | Numerology Calculator | Kotlin, Jetpack Compose, Material 3, Room, Hilt | MVP |
| 6 | **MiniPutt Mobile** | 3D Mini-Golf Game | C, SDL2, OpenGL ES, Android NDK, AdMob, Solana | Near-launch |
| 7 | **Rust Bot** | Trading Bot (Rust Rewrite) | Rust, Tokio, Axum, SQLite, RSA-PSS auth | Phase 1 |
| 8 | **ShellShine** | Sea Shell Polishing App | React Native, Skia GPU Shaders, Reanimated, accelerometer | In dev |
| 9 | **SolCash** | Solana Trading PWA | Next.js 16, Jupiter DEX, Helius, DexScreener, Zustand | v0.1 |
| 10 | **Vigil** | Solana Meme Coin Tracker | React Native, Expo, Supabase Edge Functions, Solana MWA | Published (dApp Store) |
| 11 | **WildCard Nature** | Wildlife Photo Card Game | React Native, Stability AI, Solana NFTs, Firebase, Cloudflare Workers | v1.2 |

*Note: Vigil Publishing is a deployment config for Vigil and Rust Bot is an evolution of Kalshi Bot — each pair can be presented as one project with a "v2" narrative.*

---

## I. Page Architecture

### Hero Section
- **Full-viewport intro** with your name, title ("Full-Stack & Mobile Engineer"), and a one-liner tagline
- **Animated background** — subtle particle field or gradient mesh (reflects the breadth: code, blockchain, AI, games)
- **Scroll indicator** (chevron or "See my work" CTA)
- **Quick stats bar**: `11 Projects | 6+ Languages | Mobile + Web + Blockchain + AI`

### Navigation
- **Sticky top nav** — minimal: Name/Logo, category filter pills, dark/light toggle, contact/resume CTA
- **Category filter pills**: All | Mobile Apps | Blockchain/Web3 | AI-Powered | Trading Systems | Games
- Projects should be taggable across multiple categories

---

## II. Project Card Design

### Card Layout (each project)
Each card is an **interactive, expandable tile** with two states:

**Collapsed State (Grid View):**
- Project hero image/screenshot or stylized mockup
- Project name + one-liner description
- Tech stack icon row (React Native, Solana, Python, Kotlin, Rust, C, etc.)
- Category tags (colored pills)
- Status badge (Published, Active, In Development)

**Expanded State (on click/tap):**
- Full description (3-5 sentences of what it does and why it matters)
- Feature highlights (3-4 bullet points of standout capabilities)
- Tech stack breakdown (grouped: Frontend, Backend, AI, Blockchain)
- Screenshots / device mockup carousel
- Architecture diagram (simplified, visual)
- Links: GitHub repo, live demo, dApp Store listing (where applicable)

### Card Visual Treatment
- **Glassmorphism** cards with subtle backdrop blur on dark background
- **Accent color per project** derived from each project's brand palette:
  - Dendro: Amber/Gold `#c8860a`
  - Leafprint: Champagne Gold `#D4AF37`
  - ChainRC: Terminal Green `#4AF262`
  - Gematria: Neon Purple/Cyan
  - MiniPutt: Golf Green
  - ShellShine: Ocean Turquoise `#00B4D8`
  - SolCash/Vigil: Solana Purple/Gradient
  - WildCard Nature: Nature gradient
  - Trading Bots: Data Blue/Red
- **Hover effect**: Card lifts (translateY + shadow), accent glow appears at card border

---

## III. Project Grouping & Narrative Strategy

Rather than a flat grid, organize projects into **thematic story sections** that demonstrate range:

### Section 1: "Blockchain & Web3"
*Solana ecosystem expertise, wallet integration, on-chain trading*
- **Vigil** (flagship — published on Solana dApp Store)
- **SolCash** (PWA trading terminal)
- **ChainRC** (wallet-authenticated chat)
- Narrative: Full Solana stack — from mobile wallet adapters to dApp Store publishing

### Section 2: "AI-Powered Experiences"
*Claude Vision, generative AI, intelligent analysis*
- **Dendro** (Claude Vision for tree ring analysis)
- **Leafprint** (AI strain recommendations)
- **WildCard Nature** (Stability AI card generation + Claude species data)
- Narrative: Using AI not as a gimmick but as the core value proposition

### Section 3: "Trading & Quantitative Systems"
*Algorithmic trading, probability models, risk management*
- **Kalshi Bot** (Python, multi-agent, live prediction markets)
- **Rust Bot** (performance rewrite — shows growth mindset)
- Narrative: From Python prototype to production Rust — data science meets systems engineering

### Section 4: "Games & Creative Tools"
*GPU shaders, 3D graphics, gamification*
- **MiniPutt Mobile** (C/OpenGL ES — ported a full 3D game to mobile)
- **ShellShine** (Skia GPU shaders — barrel distortion, chromatic aberration, FBM noise)
- **Gematria Oracle** (Native Android, Jetpack Compose, Material Design 3)
- Narrative: Low-level graphics programming to polished consumer UX

---

## IV. Standout Features for Recruiter Impact

### A. Skills Matrix Section
A visual grid/chart showing proficiency across domains:
- **Languages**: TypeScript, Python, Kotlin, Rust, C, SQL
- **Mobile**: React Native, Expo, Android Native (Jetpack Compose), NDK
- **Web**: Next.js, React, Flask, Axum
- **Blockchain**: Solana Web3.js, MWA, Token-2022, SPL, NFT minting
- **AI/ML**: Claude API (Vision + Text), Stability AI, probability modeling
- **Infrastructure**: Docker, Nginx, Supabase, Firebase, Cloudflare Workers
- **Databases**: SQLite, Room, PostgreSQL, Firestore
- **Graphics**: OpenGL ES, Skia/SkSL shaders, Reanimated animations

### B. "By the Numbers" Section
Recruiter-friendly quick metrics:
- `11` projects built
- `6` programming languages
- `1` app published to Solana dApp Store
- `117` holes across 9 golf courses (MiniPutt)
- `16` species in shell database
- `50+` cannabis strains catalogued
- `4` autonomous trading agents
- `2` custom GPU shaders written from scratch

### C. Timeline / Journey Section
Optional horizontal scroll timeline showing project chronology and evolution — demonstrates momentum and growth trajectory.

---

## V. Technical Implementation Plan

### Tech Stack for the Portfolio Page
- **Framework**: Single-page React app (Vite)
- **Styling**: Tailwind CSS 4 + custom CSS variables for theming
- **Animations**: Framer Motion (scroll-triggered reveals, card transitions, section fades)
- **3D/Visual Flair**: Optional — Three.js or CSS-only particle background
- **Dark/Light Mode**: Default dark (matches your projects' aesthetic), toggle available
- **Responsive**: Mobile-first, 1-column on mobile, 2-3 column grid on desktop
- **Performance**: Static site, lazy-loaded images, optimized for Lighthouse 95+

### Page Sections (top to bottom)

```
1. Hero (name, title, tagline, stats bar)
2. Category Filter Nav (sticky)
3. Featured Project (Vigil — published, most complete)
4. Section: Blockchain & Web3 (3 projects)
5. Section: AI-Powered (3 projects)
6. Section: Trading Systems (2 projects, evolution narrative)
7. Section: Games & Creative (3 projects)
8. Skills Matrix (visual chart)
9. By the Numbers (animated counters)
10. About / Contact (brief bio, links, resume download)
11. Footer (GitHub, LinkedIn, email)
```

### Interaction Design
- **Scroll-triggered animations**: Cards fade/slide in as they enter viewport
- **Filter transitions**: FLIP-style layout animation when category filter changes
- **Project cards**: Click to expand inline (no separate page — keeps recruiter on one scroll)
- **Image carousel**: Touch/swipe for screenshots within expanded cards
- **Smooth scrolling**: Section-to-section with eased transitions
- **Cursor effects**: Subtle glow following cursor on desktop (optional)

### Device Mockups
For each mobile project, render screenshots inside phone frames:
- Use existing screenshots where available (Leafprint has 3, MiniPutt has 6, Vigil has 5 on Arweave, ShellShine has home screen)
- For projects without screenshots, create styled code/architecture cards as stand-ins

---

## VI. Content to Prepare Per Project

For each of the 11 projects, we need:

| Asset | Source |
|-------|--------|
| Hero image/screenshot | Existing screenshots or generated mockup |
| One-liner (< 15 words) | Derived from analysis |
| Description (3-5 sentences) | Derived from analysis |
| 3-4 feature bullets | From key features |
| Tech icons (6-8 per project) | Mapped from stack |
| Category tags | From grouping above |
| Status badge | From project maturity |
| Links (GitHub, live, store) | From project configs |

---

## VII. What Makes This Portfolio Stand Out

1. **Range**: Mobile, web, native Android, C game engine, Rust systems, Python data science — not a one-trick stack
2. **Shipping**: Vigil is published on a real app store with real users. MiniPutt has AdMob + Play Store signing ready.
3. **Depth**: GPU shader programming (ShellShine), RSA-PSS cryptographic auth (Kalshi/Rust Bot), Matrix protocol implementation (ChainRC) — these aren't tutorials
4. **AI-native**: Multiple projects use Claude as a core feature, not a bolt-on
5. **Blockchain-native**: Full Solana ecosystem knowledge (wallets, tokens, NFTs, dApp Store publishing)
6. **Evolution story**: Python bot → Rust rewrite shows engineering maturity and performance awareness

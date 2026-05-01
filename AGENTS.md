# AGENTS.md — Portfolio App

## Stack
React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + Zustand + Framer Motion + Lucide React

## Commands
```
npm run dev       # Start Vite dev server (HMR)
npm run build     # tsc -b && vite build  (typecheck then build — strict: noUnusedLocals/Parameters)
npm run lint      # ESLint (flat config, type-aware off)
npm run preview   # Preview production build
```

## Architecture
App is a DOS/Win 3.1 retro PC simulator portfolio site. Four boot phases routed in `src/App.tsx`:
- `post` — BIOS POST screen animation
- `dos` — DOS terminal with virtual filesystem, command parser, and config-editing puzzle
- `win31-boot` — Windows 3.1 splash/loading animation
- `win31` — Full Win 3.1 desktop with draggable windows, Program Manager, mini-games

### State (Zustand)
Single store at `src/state/store.ts`. Key state: `phase`, `cwd`, `terminalLines`, `commandHistory`, `configSys`, `autoexecBat`, `windows[]`, `editorOpen`. Derives `canBootWindows` from parsing the two editable config files.

### The Puzzle
User must edit `CONFIG.SYS` and `AUTOEXEC.BAT` via the `EDIT` command to uncomment `DEVICE=C:\HIMEM.SYS`, `DEVICE=C:\EMM386.EXE NOEMS`, and `SET PATH=C:\DOS;C:\WINDOWS`. When both fixed, `WIN` command triggers the win31-boot phase.

### Key directories
- `src/components/boot/` — PostScreen, Win31Boot
- `src/components/crt/` — CRTOverlay (scanlines, vignette, noise)
- `src/components/dos/` — DosTerminal, TerminalOutput, CommandInput, DosEditor, SnakeGame
- `src/components/win31/` — Desktop, Window, ProgramManager, ProjectWindow, NotepadWindow, CalculatorWindow, Minesweeper, etc.
- `src/data/` — `projects.ts` (11 projects with categories, accents, sections), `filesystem.ts` (virtual FAT tree), `bootText.ts`
- `src/utils/` — `commandParser.ts` (DOS command executor: HELP, DIR, CD, TYPE, CLS, VER, MEM, DATE, TIME, TREE, EDIT, WIN, COLOR, ECHO, FORMAT, DEL, SNAKE, PATH, CHDIR)
- `src/state/` — Zustand store and TypeScript types

### Root-level components (non-DOS)
`src/components/` also has: FilterNav.tsx, Footer.tsx, Hero.tsx, ProjectCard.tsx, ProjectSections.tsx, SkillsMatrix.tsx, Stats.tsx — these appear to be for a conventional portfolio layout (see `plans.md`), likely unused now that the DOS mode is the primary UI.

## Content source
All 11 projects defined in `src/data/projects.ts`. Categories: blockchain, ai, trading, games, mobile. Four thematic sections with narratives. Stats and skills matrix data also live there.

## Plans files
- `plans.md` — Original conventional portfolio layout outline (11 sections top-to-bottom)
- `plans-dos.md` — Full spec for the DOS/Win 3.1 simulator concept (the current implementation direction)

## Conventions
- `"type": "module"` — ESM only
- Tailwind via `@tailwindcss/vite` plugin (v4, no config file needed — utility-first)
- TypeScript strict: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` — build will fail on unused imports/vars
- ESLint: flat config with `typescript-eslint`, `react-hooks`, `react-refresh`
- Virtual filesystem uses DOS 8.3 naming convention in directory listings

# Personal Website — DOS/Win 3.1 Retro PC Simulator

## The Concept

Your website IS a computer. When someone visits your URL, they don't see a website — they see a **PC booting up**. A full POST sequence, memory count, DOS prompt. They navigate your entire personal site through a DOS command line. Hidden inside the filesystem is the classic CONFIG.SYS / AUTOEXEC.BAT puzzle — get it right and the machine boots into **Windows 3.1**, unlocking a full GUI mode with Program Manager, draggable windows, and your portfolio projects as clickable icons.

No one has a site like this. Recruiters will remember it.

---

## I. THE BOOT SEQUENCE (First 8-12 seconds)

### Phase 1: POST Screen (2s)
```
AMI BIOS (C) 1993 American Megatrends Inc.
BIOS Date: 04/12/94

Main Processor: Intel 486DX2-66
Numeric Processor: Built-in

Memory Test:     640K OK
Extended Memory: 15360K OK
Total Memory:    16384K (16MB)

Press DEL to enter SETUP
```
- Text appears character-by-character at authentic CRT speed (~50ms/char for BIOS, instant for memory count)
- Memory counter rapidly counts up from 0 to 16384K
- Subtle CRT scanline overlay + slight phosphor glow
- A beep sound on POST complete (Web Audio API, optional)

### Phase 2: DOS Boot (2s)
```
Starting MS-DOS...

HIMEM.SYS not loaded - Extended memory unavailable
WARNING: Windows requires HIMEM.SYS to run

C:\>
```
- This is the critical hook — on first visit, HIMEM.SYS is NOT loaded
- The warning tells observant visitors something is wrong
- The cursor blinks (classic block cursor, 530ms on/off)

### Phase 3: Ready State
- The prompt `C:\>` appears with blinking cursor
- User can now type commands
- A subtle `Type HELP for commands` hint appears after 5 seconds of inactivity

---

## II. THE DOS ENVIRONMENT

### A. The Filesystem

A virtual FAT-style filesystem tree. Every piece of site content lives as a "file":

```
C:\
├── AUTOEXEC.BAT          ← The puzzle file (editable)
├── CONFIG.SYS            ← The puzzle file (editable)
├── COMMAND.COM
├── HIMEM.SYS             ← Exists on disk, just not loaded
├── DOS\
│   ├── EDIT.COM
│   ├── MEM.EXE
│   ├── HELP.EXE
│   ├── VER.EXE
│   └── FORMAT.COM        ← Easter egg: "Nice try."
├── WINDOWS\
│   ├── WIN.COM           ← Only works after CONFIG.SYS fix
│   ├── PROGMAN.EXE
│   ├── NOTEPAD.EXE
│   └── SYSTEM\
│       ├── KRNL386.EXE
│       └── GDI.EXE
├── USERS\
│   └── ROG\
│       ├── ABOUT.TXT     ← Bio / about me
│       ├── RESUME.TXT    ← Text-mode resume
│       ├── SKILLS.TXT    ← Skills list
│       └── CONTACT.TXT   ← Contact info
├── PROJECTS\
│   ├── VIGIL\
│   │   └── README.TXT
│   ├── SOLCASH\
│   │   └── README.TXT
│   ├── CHAINRC\
│   │   └── README.TXT
│   ├── DENDRO\
│   │   └── README.TXT
│   ├── LEAFPRNT\         ← 8.3 filename convention!
│   │   └── README.TXT
│   ├── WILDCARD\
│   │   └── README.TXT
│   ├── KALSHI\
│   │   └── README.TXT
│   ├── RUSTBOT\
│   │   └── README.TXT
│   ├── MINIPUTT\
│   │   └── README.TXT
│   ├── SHELLSHN\
│   │   └── README.TXT
│   └── GEMATRIA\
│       └── README.TXT
├── GAMES\
│   └── SNAKE.EXE         ← Playable easter egg
└── SECRETS\              ← Hidden directory
    └── README.TXT        ← "You found the hidden directory. Not bad."
```

**Key detail**: All filenames follow **8.3 DOS naming convention** (max 8 chars + 3 char extension). This alone signals authenticity to anyone who lived through the era.

### B. Supported Commands

Full command set — each behaves like real DOS:

| Command | Behavior |
|---------|----------|
| `HELP` | Lists available commands with descriptions |
| `DIR` | Lists files in current directory (with sizes, dates, `<DIR>` markers) |
| `DIR /W` | Wide format listing (filenames only, 5 columns) |
| `CD <dir>` | Change directory (supports `..`, absolute paths, tab completion) |
| `TYPE <file>` | Display file contents (this is how you "read" site content) |
| `EDIT <file>` | Opens a full-screen text editor (for CONFIG.SYS / AUTOEXEC.BAT) |
| `CLS` | Clear screen |
| `VER` | Shows DOS version ("MS-DOS Version 6.22") |
| `MEM` | Memory info (shows HIMEM not loaded until puzzle solved) |
| `DATE` | Shows current date in DOS format |
| `TIME` | Shows current time in DOS format |
| `TREE` | ASCII tree of directory structure |
| `WIN` | Attempts to launch Windows (fails until puzzle solved) |
| `FORMAT C:` | "Nice try. Access denied." |
| `DEL` | "This command has been disabled by the system administrator." |
| `ECHO <text>` | Prints text |
| `COLOR <code>` | Changes terminal colors (like real DOS: `COLOR 0A` for green-on-black) |
| `SNAKE` | Launches playable Snake game in terminal |

**Command parsing rules:**
- Case-insensitive (DOS was case-insensitive)
- Supports `/?` flag on any command for help text
- Unrecognized commands: `Bad command or file name`
- History via up/down arrow keys
- Tab completion for filenames

### C. DIR Output Format

Authentic DOS directory listing:

```
C:\PROJECTS>DIR

 Volume in drive C is ROGSDISK
 Volume Serial Number is 1337-BEEF
 Directory of C:\PROJECTS

.            <DIR>     04-12-26  12:00a
..           <DIR>     04-12-26  12:00a
VIGIL        <DIR>     03-02-26   8:15p
SOLCASH      <DIR>     01-15-26   3:42p
CHAINRC      <DIR>     02-20-26  11:30a
DENDRO       <DIR>     12-08-25   9:00a
LEAFPRNT     <DIR>     02-09-26   1:25p
WILDCARD     <DIR>     11-30-25   4:18p
KALSHI       <DIR>     03-15-26   7:45p
RUSTBOT      <DIR>     03-28-26   2:10p
MINIPUTT     <DIR>     01-22-26   6:33p
SHELLSHN     <DIR>     04-01-26  10:00a
GEMATRIA     <DIR>     12-22-25   5:55p
       0 file(s)              0 bytes
      13 dir(s)     524,288,000 bytes free
```

### D. TYPE Output (Site Content)

When you `TYPE` a file, it renders as period-accurate text with occasional ASCII art:

```
C:\USERS\ROG>TYPE ABOUT.TXT

═══════════════════════════════════════════════════
              ABOUT ROG
═══════════════════════════════════════════════════

Full-stack & mobile engineer building at the
intersection of blockchain, AI, and systems
engineering.

I ship products. From a published Solana dApp
Store app to custom GPU shaders to multi-agent
algorithmic trading bots — I build things that
work in the real world.

Languages:  TypeScript, Python, Kotlin, Rust, C
Mobile:     React Native, Expo, Jetpack Compose
Blockchain: Solana (MWA, SPL, Token-2022, NFTs)
AI:         Claude API, Stability AI, Vision
Infra:      Docker, Supabase, Firebase, CF Workers

═══════════════════════════════════════════════════
  Type CD C:\PROJECTS to see my work
═══════════════════════════════════════════════════
```

Project README.TXTs show rich detail:

```
C:\PROJECTS\VIGIL>TYPE README.TXT

╔══════════════════════════════════════════════════╗
║  VIGIL - Solana Meme Coin Tracker               ║
║  Status: PUBLISHED (Solana dApp Store)           ║
╚══════════════════════════════════════════════════╝

Track trending Solana meme coins, watch whale
wallets, scan token safety, and swap via Jupiter.

STACK:  React Native · Expo 55 · Supabase
        Solana Web3.js · Mobile Wallet Adapter
        Helius Webhooks · Jupiter DEX

FEATURES:
  ■ Real-time trending token feed (DexScreener)
  ■ Whale wallet watcher (10 wallets, activity feed)
  ■ On-chain airdrop detection (Merkle Distributor)
  ■ Token safety scanner (mint/freeze/holders)

───────────────────────────────────────────────────
  First app published to the Solana dApp Store
───────────────────────────────────────────────────
```

---

## III. THE EDIT COMMAND (Full-Screen Text Editor)

### A. Editor UI

When user types `EDIT CONFIG.SYS` or `EDIT AUTOEXEC.BAT`, a full-screen editor opens — modeled on **MS-DOS EDIT.COM**:

```
┌─ EDIT - CONFIG.SYS ─────────────────────────────────┐
│                                                       │
│ FILES=30                                              │
│ BUFFERS=20                                            │
│ DOS=HIGH,UMB                                          │
│ REM DEVICE=C:\HIMEM.SYS                               │
│ REM DEVICE=C:\EMM386.EXE NOEMS                        │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
├───────────────────────────────────────────────────────┤
│ ^S Save  ^Q Quit  ^X Cut  ^V Paste     Ln 4, Col 1   │
└───────────────────────────────────────────────────────┘
```

### B. Editor Features
- Full cursor movement (arrow keys, Home, End)
- Text insertion and deletion
- Line-by-line editing
- Ctrl+S to save, Ctrl+Q to quit (with "Save changes? Y/N" prompt)
- Status bar shows line/column position
- Syntax awareness: `REM` lines appear dimmed, `DEVICE=` highlighted

### C. The Puzzle Files — Default (Broken) State

**CONFIG.SYS (default — broken):**
```
FILES=30
BUFFERS=20
DOS=HIGH,UMB
REM DEVICE=C:\HIMEM.SYS
REM DEVICE=C:\EMM386.EXE NOEMS
```

**AUTOEXEC.BAT (default — broken):**
```
@ECHO OFF
PROMPT $P$G
REM SET PATH=C:\DOS;C:\WINDOWS
SET TEMP=C:\TEMP
LH C:\DOS\DOSKEY.COM
```

The problems:
1. `HIMEM.SYS` is commented out with `REM` — extended memory won't load
2. `EMM386.EXE` is commented out — no upper memory
3. Windows `PATH` is commented out — WIN.COM can't find Windows files

### D. The Solution

User must edit both files to:

**CONFIG.SYS (fixed):**
```
FILES=30
BUFFERS=20
DOS=HIGH,UMB
DEVICE=C:\HIMEM.SYS
DEVICE=C:\EMM386.EXE NOEMS
```

**AUTOEXEC.BAT (fixed):**
```
@ECHO OFF
PROMPT $P$G
SET PATH=C:\DOS;C:\WINDOWS
SET TEMP=C:\TEMP
LH C:\DOS\DOSKEY.COM
```

Changes required:
1. Remove `REM ` from the `DEVICE=C:\HIMEM.SYS` line
2. Remove `REM ` from the `DEVICE=C:\EMM386.EXE NOEMS` line
3. Remove `REM ` from the `SET PATH=C:\DOS;C:\WINDOWS` line

### E. Validation & Feedback

After saving, the system validates silently. When user types `WIN`:

**If CONFIG.SYS is still broken:**
```
C:\>WIN

Error: HIMEM.SYS is not loaded.
Windows requires extended memory (XMS) to run.

Hint: Check CONFIG.SYS — HIMEM.SYS must be loaded
as a DEVICE driver, not commented out.
```

**If CONFIG.SYS is fixed but AUTOEXEC.BAT isn't:**
```
C:\>WIN

Extended memory loaded. (XMS: 15360K available)

Error: 'WIN' is not recognized.
Windows directory is not in PATH.

Hint: Check AUTOEXEC.BAT — the PATH must include
C:\WINDOWS for WIN.COM to be found.
```

**If both are fixed:**
```
C:\>WIN

Loading HIMEM.SYS... Extended memory: 15360K OK
Loading EMM386.EXE... Upper memory available
Initializing Windows...
```

→ **Triggers the Windows 3.1 boot sequence**

### F. MEM Command (Diagnostic Clue)

```
C:\>MEM

Memory Type        Total    Used     Free
──────────────    ──────   ──────   ──────
Conventional        640K     87K     553K
Upper                 0K      0K       0K
Extended              0K      0K       0K    ← RED FLAG

  WARNING: Extended memory not available.
  HIMEM.SYS is not loaded.

Total memory:       640K
```

After fixing CONFIG.SYS:
```
C:\>MEM

Memory Type        Total    Used     Free
──────────────    ──────   ──────   ──────
Conventional        640K     87K     553K
Upper               155K     32K     123K
Extended          15360K    512K   14848K    ← FIXED

Total memory:     16384K (16 MB)
```

This gives technically-minded visitors a diagnostic path to discover the problem.

---

## IV. WINDOWS 3.1 MODE

### A. Win 3.1 Boot Sequence (3-4 seconds)

After typing `WIN` with correct config:

1. **DOS loading messages** (1s):
   ```
   Loading HIMEM.SYS... Extended memory: 15360K OK
   Loading EMM386.EXE... Upper memory available
   Initializing Windows...
   ```

2. **Windows splash screen** (2s):
   - The iconic Windows 3.1 splash — blue gradient background
   - "Microsoft Windows" logo (CSS recreation, no images needed)
   - "Version 3.1" subtitle
   - Loading bar animation

3. **Desktop appears**:
   - Classic teal/cyan desktop background
   - Program Manager window opens automatically

### B. Program Manager (Main Hub)

The Windows 3.1 Program Manager — this IS the main navigation:

```
╔══ Program Manager ═══════════════════════════════════╗
║ File  Options  Window  Help                          ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  ┌─ Projects ──────┐  ┌─ Tools ────────┐            ║
║  │                  │  │                │            ║
║  │ [Vigil]  [Sol]   │  │ [Notepad]      │            ║
║  │ [Chain]  [Dendro] │  │ [Calculator]   │            ║
║  │ [Leaf]   [Wild]  │  │ [Terminal]     │            ║
║  │ [Kalshi] [Rust]  │  │ [Paint]       │            ║
║  │ [Mini]   [Shell] │  │               │            ║
║  │ [Gemat]          │  │               │            ║
║  │                  │  │               │            ║
║  └──────────────────┘  └───────────────┘            ║
║                                                      ║
║  ┌─ Personal ──────┐  ┌─ Games ────────┐            ║
║  │                  │  │                │            ║
║  │ [About Me]       │  │ [Snake]        │            ║
║  │ [Resume]         │  │ [Minesweeper]  │            ║
║  │ [Skills]         │  │ [Solitaire]    │            ║
║  │ [Contact]        │  │               │            ║
║  │                  │  │               │            ║
║  └──────────────────┘  └───────────────┘            ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

### C. Window System

Full Win 3.1 window management:

- **Title bar** with program name, minimize/maximize/close buttons
- **Draggable** windows (click and drag title bar)
- **Resizable** (drag edges/corners)
- **Minimize** to icon at bottom of screen
- **Maximize** to fill screen
- **Z-ordering** — click a window to bring to front
- **Menu bar** with File, Edit, Help dropdowns
- **Classic 3D beveled borders** (the chiseled look — light top-left, dark bottom-right)

### D. Window Contents

#### Project Windows
Double-click any project icon → opens a window with:
- Project name and status badge
- Description paragraph
- Feature list with bullet points
- Tech stack grouped by category
- Accent-colored header matching project brand
- "View on GitHub" button (styled as Win 3.1 button)

#### Notepad
Opens a functional text editor (styled as Win 3.1 Notepad):
- Can view any .TXT file from the DOS filesystem
- File > Open shows a classic file dialog
- Fully editable text area with Win 3.1 styling

#### About Me Window
- Your bio, rendered in Win 3.1 dialog style
- Photo/avatar in a bordered frame
- Links styled as Win 3.1 hyperlinks (blue underlined)

#### Resume Window
- Text-formatted resume in a scrollable window
- "File > Print" shows a humorous dialog: "Printer not found. But you can download the PDF."
- Download PDF button

#### Contact Window
- Classic form with Win 3.1 input fields, radio buttons, checkboxes
- "Send" button styled as 3D beveled push button
- Or just display email/GitHub/LinkedIn with copyable text

#### Calculator
- Functional Win 3.1 calculator clone
- Standard mode with number pad and operations
- The buttons have the classic beveled 3D look

#### Snake Game
- Playable snake in a Win 3.1 window
- Arrow key controls, score counter
- "Game Over" dialog box: `[OK]`

#### Minesweeper
- Classic Minesweeper in a window (simplified)
- Smiley face button, mine counter, timer
- Click to reveal, right-click to flag

### E. Taskbar / Desktop Elements

- **Desktop icons** at the bottom (minimized windows become icons)
- **Clock** in corner showing real time
- **"Start" equivalent** — double-click desktop for Program Manager
- **Wallpaper**: Subtle tiled pattern or solid teal (authentic Win 3.1)
- **Right-click desktop** → context menu with "About", "DOS Prompt", "Restart"

### F. "DOS Prompt" from Windows

From Program Manager, user can open a "DOS Prompt" window:
- Opens a Win 3.1-styled window containing the DOS terminal
- Full DOS functionality inside the window
- Type `EXIT` to close and return to Program Manager
- This creates a recursive loop — DOS inside Windows inside the browser

---

## V. VISUAL DESIGN — CRT AUTHENTICITY

### A. CRT Monitor Frame (Optional Outer Shell)

The entire site renders inside a **CRT monitor bezel**:
- Rounded beige/gray plastic frame
- Power LED (green dot)
- Brand badge ("ROGALOG" or similar joke brand)
- Slight screen curvature via CSS `border-radius` on inner area
- Power button at bottom (clicking it "turns off" the screen — black with a shrinking white dot)

**Alternative**: No frame, full-screen terminal. Cleaner, more immersive. Let the content fill the viewport. This is probably the better choice for a real site — the CRT effects alone sell the aesthetic.

### B. CRT Screen Effects (CSS/WebGL)

Layer these for authenticity:

1. **Scanlines** — Horizontal lines at 50% opacity, 2px apart (CSS `repeating-linear-gradient`)
2. **Phosphor glow** — Text has a subtle `text-shadow` bloom in the terminal color
3. **Screen curvature** — Very slight barrel distortion via CSS or SVG filter (subtle — don't overdo)
4. **Flicker** — Occasional subtle brightness pulse (CSS animation, very infrequent)
5. **Color bleed** — Slight chromatic aberration on text edges (1px red/blue offset on high-contrast text)
6. **Vignette** — Darker corners via radial gradient overlay
7. **Noise** — Very subtle static grain overlay (CSS or canvas)

### C. Color Palettes

**DOS Mode:**
- Default: Light gray on black (`#AAAAAA` on `#000000`) — classic DOS
- Available via `COLOR` command:
  - `COLOR 0A` — Green on black (Matrix-style)
  - `COLOR 0B` — Cyan on black
  - `COLOR 0E` — Yellow on black (amber monitor)
  - `COLOR 1F` — White on blue (Norton Commander style)
  - `COLOR 0F` — Bright white on black

**Windows 3.1 Mode:**
- Desktop: Teal `#008080`
- Window background: White `#FFFFFF`
- Title bar (active): Dark blue `#000080`
- Title bar (inactive): Gray `#808080`
- Button face: `#C0C0C0` (the iconic Win 3.1 gray)
- Button highlight: `#FFFFFF` (top-left bevel)
- Button shadow: `#808080` (bottom-right bevel)
- Text: Black `#000000`
- Selected text: White on dark blue

### D. Typography

**DOS Mode:**
- Font: Custom bitmap-style font or `"Px437 IBM VGA8"` webfont
- Fallback: `"Courier New", monospace`
- Size: 16px (1:2 character aspect ratio)
- No anti-aliasing: `font-smooth: never` / `image-rendering: pixelated`

**Win 3.1 Mode:**
- System font: `"MS Sans Serif"` or closest web equivalent (`"Segoe UI"` at small size)
- Title bars: Bold
- Menu items: Regular weight
- Dialogs: 8pt equivalent sizing

### E. Sound Design (Optional, Off by Default)

- POST beep on boot
- Key click sounds while typing
- `BOING` error sound on bad command
- Windows startup chime on Win 3.1 load
- Click sounds on Win 3.1 buttons
- All via Web Audio API, muted by default, toggle in settings

---

## VI. EASTER EGGS & HIDDEN FEATURES

1. **`FORMAT C:`** → "Nice try. This drive is write-protected by the system administrator."
2. **`DEL *.*`** → "Are you sure (Y/N)?" → "Just kidding. Access denied."
3. **`DIR SECRETS`** → Hidden directory with a congratulatory message
4. **`COLOR 0A`** → Green Matrix mode with rain effect overlay
5. **`SNAKE`** → Playable snake game in the terminal
6. **Konami Code** (in Windows mode) → Screen does a barrel roll
7. **`EDIT WIN.COM`** → "Access denied. Nice try though — this file is a system binary."
8. **`TYPE COMMAND.COM`** → Displays gibberish "binary" with occasional readable strings
9. **Minesweeper** in Windows mode → Functional mini-game
10. **Ctrl+Alt+Del** → "It is now safe to turn off your computer" screen
11. **Clicking power button on CRT** → CRT turn-off animation (screen shrinks to a white line, then dot, then gone)
12. **`HELP WIN`** → Gives a subtle hint: "Windows requires HIMEM.SYS and a valid PATH. Check your startup files."

---

## VII. RESPONSIVE DESIGN & MOBILE

### Desktop (1024px+)
- Full terminal width, centered on screen
- CRT effects at full intensity
- Keyboard input is primary

### Tablet (768px-1024px)
- Terminal fills viewport
- Reduced CRT effects (no barrel distortion — too expensive on mobile GPU)
- On-screen keyboard trigger

### Mobile (< 768px)
- **Important decision**: DOS command-line is painful on mobile
- **Solution**: Show a mobile-friendly "Quick Boot" option:
  - After POST, prompt: `"Mobile device detected. Boot to [D]OS or [W]indows?"`
  - Choosing Windows skips the puzzle and goes straight to a simplified Win 3.1 GUI
  - DOS mode still available but with a persistent on-screen keyboard bar with common commands as tap buttons
- Simplified CRT effects (scanlines only, no curvature)
- Windows mode: single-window view (no overlapping windows on small screens)

---

## VIII. TECHNICAL ARCHITECTURE

### Tech Stack
- **Framework**: React + TypeScript (already in project)
- **Build**: Vite (already configured)
- **State Management**: Zustand (lightweight, handles filesystem state, window positions, editor state)
- **Styling**: Tailwind CSS + custom CSS for CRT effects and Win 3.1 pixel-perfect recreation
- **Animations**: Framer Motion for boot sequences and window transitions
- **Sound**: Web Audio API (optional layer)
- **Font**: Self-hosted bitmap font (VGA style) for DOS, system fonts for Win 3.1

### Key State Shape
```typescript
interface AppState {
  phase: "post" | "dos" | "win31-boot" | "win31";

  // DOS state
  cwd: string;                     // current working directory
  commandHistory: string[];        // up-arrow history
  terminalLines: TerminalLine[];   // output buffer
  filesystem: FileNode;            // virtual FS tree

  // Puzzle state
  configSys: string;               // editable file content
  autoexecBat: string;             // editable file content
  himemLoaded: boolean;            // derived from configSys parse
  pathSet: boolean;                // derived from autoexecBat parse
  canBootWindows: boolean;         // himemLoaded && pathSet

  // Editor state
  editorOpen: boolean;
  editorFile: string | null;
  editorContent: string;

  // Win 3.1 state
  windows: WindowState[];          // open windows with position, size, z-index
  activeWindowId: string | null;
  desktopIcons: DesktopIcon[];

  // Settings
  terminalColor: string;           // DOS color scheme
  soundEnabled: boolean;
  crtEffects: boolean;
}
```

### Component Tree
```
<App>
  ├── <CRTOverlay />              (scanlines, vignette, curvature)
  ├── <PostScreen />              (BIOS boot, memory count)
  ├── <DosTerminal />             (command line + output)
  │   ├── <TerminalOutput />      (scrollable output area)
  │   ├── <CommandInput />        (input line with cursor)
  │   └── <DosEditor />           (full-screen EDIT.COM)
  ├── <Win31Boot />               (splash screen + loading bar)
  └── <Win31Desktop />            (Windows 3.1 environment)
      ├── <Desktop />             (teal background, icons)
      ├── <ProgramManager />      (main window with icon groups)
      ├── <Window />              (generic draggable window)
      │   ├── <TitleBar />
      │   ├── <MenuBar />
      │   └── <WindowContent />
      ├── <ProjectWindow />       (project detail content)
      ├── <NotepadWindow />       (text editor)
      ├── <CalculatorWindow />    (functional calculator)
      ├── <AboutWindow />         (bio/about)
      ├── <ResumeWindow />        (resume view)
      ├── <ContactWindow />       (contact info)
      ├── <SnakeGame />           (playable snake)
      └── <Minesweeper />         (playable minesweeper)
```

### File/Module Structure
```
src/
├── App.tsx                       (phase router)
├── main.tsx
├── index.css                     (CRT effects, Win 3.1 theme vars)
├── state/
│   ├── store.ts                  (Zustand store)
│   ├── filesystem.ts             (virtual FAT filesystem)
│   └── commands.ts               (DOS command implementations)
├── components/
│   ├── crt/
│   │   ├── CRTOverlay.tsx        (scanlines, vignette, noise)
│   │   └── CRTMonitor.tsx        (optional bezel frame)
│   ├── boot/
│   │   ├── PostScreen.tsx        (BIOS POST sequence)
│   │   └── Win31Boot.tsx         (Windows splash + loading)
│   ├── dos/
│   │   ├── DosTerminal.tsx       (main terminal component)
│   │   ├── TerminalOutput.tsx    (output rendering)
│   │   ├── CommandInput.tsx      (input with cursor + history)
│   │   ├── DosEditor.tsx         (EDIT.COM full-screen editor)
│   │   └── SnakeGame.tsx         (terminal snake)
│   └── win31/
│       ├── Desktop.tsx           (background + icon management)
│       ├── Window.tsx            (draggable, resizable window)
│       ├── TitleBar.tsx          (title + min/max/close)
│       ├── MenuBar.tsx           (File, Edit, Help menus)
│       ├── ProgramManager.tsx    (main hub with icon groups)
│       ├── ProjectWindow.tsx     (project detail view)
│       ├── NotepadWindow.tsx     (text editor)
│       ├── CalculatorWindow.tsx  (functional calc)
│       ├── AboutWindow.tsx       (personal bio)
│       ├── ResumeWindow.tsx      (resume display)
│       ├── ContactWindow.tsx     (contact details)
│       ├── Minesweeper.tsx       (playable game)
│       └── FileDialog.tsx        (classic open/save dialog)
├── data/
│   ├── projects.ts               (existing project data)
│   ├── filesystem.ts             (file tree definition + content)
│   └── bootText.ts               (POST messages, boot strings)
└── utils/
    ├── commandParser.ts          (tokenize + execute DOS commands)
    ├── fileSystemUtils.ts        (path resolution, 8.3 names)
    ├── configValidator.ts        (parse CONFIG.SYS / AUTOEXEC.BAT)
    └── sound.ts                  (Web Audio API manager)
```

---

## IX. BUILD ORDER (Implementation Phases)

### Phase 1: DOS Core (Foundation)
1. Virtual filesystem with file tree and content
2. DOS command parser (HELP, DIR, CD, TYPE, CLS, VER, MEM)
3. Terminal component with input, output, cursor, history
4. CRT overlay (scanlines, glow, vignette)
5. POST boot sequence animation

### Phase 2: The Puzzle
6. EDIT command — full-screen text editor
7. CONFIG.SYS / AUTOEXEC.BAT editable files
8. Validation logic (parse for HIMEM.SYS, PATH)
9. WIN command with conditional gating + error messages
10. MEM command showing memory state

### Phase 3: Windows 3.1
11. Win 3.1 boot splash + loading animation
12. Desktop with teal background
13. Window component (drag, resize, z-order, min/max/close)
14. Program Manager with icon groups
15. Project windows (render existing project data)
16. About, Resume, Contact windows

### Phase 4: Polish & Easter Eggs
17. Sound system (optional, off by default)
18. Snake game (terminal + Windows version)
19. Minesweeper, Calculator
20. Easter eggs (FORMAT, DEL, Konami, Ctrl+Alt+Del)
21. Mobile responsive handling
22. COLOR command with multiple palettes
23. Performance optimization, Lighthouse audit

---

## X. WHAT MAKES THIS UNFORGETTABLE

1. **Immediate hook**: Visitor sees a boot screen, not a website. Curiosity takes over.
2. **The puzzle**: Editing CONFIG.SYS is a genuine skill test — anyone who grew up in the 90s will get chills. Younger visitors learn something real.
3. **Two complete UIs**: DOS command line AND Win 3.1 GUI — the same content is accessible through both, rewarding exploration.
4. **Functional programs**: Calculator, Notepad, Snake, Minesweeper — these aren't mockups, they work.
5. **Technical flex**: Building a window manager, filesystem, command parser, and text editor from scratch in React demonstrates exactly the kind of engineering depth your portfolio claims.
6. **Recruiter path**: Even if they don't solve the puzzle, the DOS commands let them `TYPE RESUME.TXT` and `DIR PROJECTS` immediately. The Windows GUI is a bonus, not a gate.
7. **Shareable**: "Check out this person's website — it boots like a 386" is the kind of thing that gets posted on Twitter/HN.

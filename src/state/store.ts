import { create } from "zustand";
import type { AppState } from "./types";

const DEFAULT_CONFIG_SYS = `FILES=30
BUFFERS=20
DOS=HIGH,UMB
REM DEVICE=C:\\HIMEM.SYS
REM DEVICE=C:\\EMM386.EXE NOEMS`;

const DEFAULT_AUTOEXEC_BAT = `@ECHO OFF
PROMPT $P$G
REM SET PATH=C:\\DOS;C:\\WINDOWS
SET TEMP=C:\\TEMP
LH C:\\DOS\\DOSKEY.COM`;

let lineCounter = 0;
function makeId(): string {
  return `ln-${++lineCounter}`;
}

export const useStore = create<AppState>((set, get) => ({
  // Boot phase
  phase: "post",
  setPhase: (phase) => set({ phase }),

  // DOS terminal
  cwd: "C:\\",
  setCwd: (cwd) => set({ cwd }),
  commandHistory: [],
  historyIndex: -1,
  addCommand: (cmd) =>
    set((s) => ({
      commandHistory: [cmd, ...s.commandHistory].slice(0, 100),
      historyIndex: -1,
    })),
  setHistoryIndex: (historyIndex) => set({ historyIndex }),
  terminalLines: [],
  addLine: (line) =>
    set((s) => ({
      terminalLines: [...s.terminalLines, { ...line, id: makeId() }].slice(-500),
    })),
  addLines: (lines) =>
    set((s) => ({
      terminalLines: [
        ...s.terminalLines,
        ...lines.map((l) => ({ ...l, id: makeId() })),
      ].slice(-500),
    })),
  clearTerminal: () => set({ terminalLines: [] }),

  // Editable files
  configSys: DEFAULT_CONFIG_SYS,
  autoexecBat: DEFAULT_AUTOEXEC_BAT,
  setConfigSys: (configSys) => set({ configSys }),
  setAutoexecBat: (autoexecBat) => set({ autoexecBat }),

  // Editor
  editorOpen: false,
  editorFile: null,
  editorContent: "",
  openEditor: (file, content) =>
    set({ editorOpen: true, editorFile: file, editorContent: content }),
  closeEditor: () =>
    set({ editorOpen: false, editorFile: null, editorContent: "" }),
  setEditorContent: (editorContent) => set({ editorContent }),

  // Puzzle validation
  isHimemLoaded: () => {
    const cfg = get().configSys;
    const lines = cfg.split("\n").map((l) => l.trim().toUpperCase());
    return lines.some(
      (l) => !l.startsWith("REM") && l.includes("DEVICE=") && l.includes("HIMEM.SYS")
    );
  },
  isPathSet: () => {
    const bat = get().autoexecBat;
    const lines = bat.split("\n").map((l) => l.trim().toUpperCase());
    return lines.some(
      (l) =>
        !l.startsWith("REM") &&
        l.startsWith("SET PATH=") &&
        l.includes("C:\\WINDOWS")
    );
  },
  canBootWindows: () => get().isHimemLoaded() && get().isPathSet(),

  // Win 3.1
  windows: [],
  activeWindowId: null,
  nextZIndex: 10,
  openWindow: (win) =>
    set((s) => {
      const existing = s.windows.find((w) => w.id === win.id);
      if (existing) {
        // Focus existing window
        const z = s.nextZIndex;
        return {
          windows: s.windows.map((w) =>
            w.id === win.id ? { ...w, minimized: false, zIndex: z } : w
          ),
          activeWindowId: win.id,
          nextZIndex: z + 1,
        };
      }
      const z = s.nextZIndex;
      return {
        windows: [...s.windows, { ...win, zIndex: z }],
        activeWindowId: win.id,
        nextZIndex: z + 1,
      };
    }),
  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      activeWindowId:
        s.activeWindowId === id
          ? s.windows.filter((w) => w.id !== id).sort((a, b) => b.zIndex - a.zIndex)[0]
              ?.id ?? null
          : s.activeWindowId,
    })),
  focusWindow: (id) =>
    set((s) => {
      const z = s.nextZIndex;
      return {
        windows: s.windows.map((w) => (w.id === id ? { ...w, zIndex: z } : w)),
        activeWindowId: id,
        nextZIndex: z + 1,
      };
    }),
  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      activeWindowId:
        s.activeWindowId === id
          ? s.windows
              .filter((w) => w.id !== id && !w.minimized)
              .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
          : s.activeWindowId,
    })),
  maximizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    })),
  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),
  resizeWindow: (id, width, height) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, width, height } : w)),
    })),

  // Settings
  terminalColor: "0F",
  setTerminalColor: (terminalColor) => set({ terminalColor }),
  soundEnabled: false,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  crtEffects: true,
  toggleCRT: () => set((s) => ({ crtEffects: !s.crtEffects })),

  // Snake
  snakeActive: false,
  setSnakeActive: (snakeActive) => set({ snakeActive }),
}));

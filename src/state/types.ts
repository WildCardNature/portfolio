export type Phase = "post" | "dos" | "win31-boot" | "win31";

export interface TerminalLine {
  id: string;
  text: string;
  type: "input" | "output" | "error" | "system" | "ascii";
}

export interface FileNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileNode[];
  hidden?: boolean;
  size?: number;
  date?: string;
}

export interface WindowState {
  id: string;
  title: string;
  component: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  props?: Record<string, unknown>;
}

export interface AppState {
  // Boot phase
  phase: Phase;
  setPhase: (phase: Phase) => void;

  // DOS terminal
  cwd: string;
  setCwd: (path: string) => void;
  commandHistory: string[];
  historyIndex: number;
  addCommand: (cmd: string) => void;
  setHistoryIndex: (i: number) => void;
  terminalLines: TerminalLine[];
  addLine: (line: Omit<TerminalLine, "id">) => void;
  addLines: (lines: Omit<TerminalLine, "id">[]) => void;
  clearTerminal: () => void;

  // Editable files (puzzle)
  configSys: string;
  autoexecBat: string;
  setConfigSys: (content: string) => void;
  setAutoexecBat: (content: string) => void;

  // Editor
  editorOpen: boolean;
  editorFile: string | null;
  editorContent: string;
  openEditor: (file: string, content: string) => void;
  closeEditor: () => void;
  setEditorContent: (content: string) => void;

  // Puzzle state (derived helpers)
  isHimemLoaded: () => boolean;
  isPathSet: () => boolean;
  canBootWindows: () => boolean;

  // Win 3.1
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
  openWindow: (win: Omit<WindowState, "zIndex">) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;

  // Settings
  terminalColor: string;
  setTerminalColor: (color: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  crtEffects: boolean;
  toggleCRT: () => void;

  // Snake game
  snakeActive: boolean;
  setSnakeActive: (active: boolean) => void;
}

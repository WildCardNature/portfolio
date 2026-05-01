import { getNode, getChildren, formatDirListing } from "../data/filesystem";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LineType = "output" | "error" | "system" | "ascii";

export interface OutputLine {
  text: string;
  type: LineType;
}

export interface CommandResult {
  lines: OutputLine[];
}

export interface CommandState {
  cwd: string;
  setCwd: (p: string) => void;
  configSys: string;
  autoexecBat: string;
  isHimemLoaded: () => boolean;
  isPathSet: () => boolean;
  canBootWindows: () => boolean;
  setPhase: (p: "post" | "dos" | "win31-boot" | "win31") => void;
  openEditor: (file: string, content: string) => void;
  clearTerminal: () => void;
  setTerminalColor: (c: string) => void;
  setSnakeActive: (a: boolean) => void;
}

// ---------------------------------------------------------------------------
// Helper builders
// ---------------------------------------------------------------------------

function out(text: string): OutputLine {
  return { text, type: "output" };
}

function err(text: string): OutputLine {
  return { text, type: "error" };
}

function sys(text: string): OutputLine {
  return { text, type: "system" };
}

function ascii(text: string): OutputLine {
  return { text, type: "ascii" };
}

function lines(...items: OutputLine[]): CommandResult {
  return { lines: items };
}

function linesArr(items: OutputLine[]): CommandResult {
  return { lines: items };
}

function noLines(): CommandResult {
  return { lines: [] };
}

// ---------------------------------------------------------------------------
// Path utilities
// ---------------------------------------------------------------------------

/**
 * Normalise a DOS path to consistent uppercase with backslashes.
 * Handles: absolute paths, relative segments, ".." traversal.
 */
function normalisePath(raw: string, cwd: string): string {
  // Replace forward slashes with backslashes, uppercase everything
  const cleaned = raw.replace(/\//g, "\\").toUpperCase().trim();

  // Absolute path (starts with drive letter like C:\ or just C:)
  if (/^[A-Z]:\\/.test(cleaned) || /^[A-Z]:$/.test(cleaned)) {
    return normaliseAbsolute(cleaned);
  }

  // Relative from cwd
  const base = cwd.endsWith("\\") ? cwd.slice(0, -1) : cwd;
  const combined = cleaned === "" ? base : base + "\\" + cleaned;
  return normaliseAbsolute(combined);
}

/**
 * Resolve ".." segments in an absolute path.
 */
function normaliseAbsolute(path: string): string {
  // Ensure drive colon has backslash: "C:" -> "C:\"
  let p = path;
  if (/^[A-Z]:$/.test(p)) p = p + "\\";

  const parts = p.split("\\");
  // parts[0] = "C:", parts[1..] = path segments
  const drive = parts[0]; // e.g. "C:"
  const segments: string[] = [];

  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    if (seg === "" || seg === ".") {
      // skip
    } else if (seg === "..") {
      if (segments.length > 0) segments.pop();
      // at root, ".." stays at root — no-op
    } else {
      segments.push(seg);
    }
  }

  if (segments.length === 0) return drive + "\\";
  return drive + "\\" + segments.join("\\");
}

/** Get the parent directory of a path. */
function parentDir(path: string): string {
  if (path.endsWith("\\")) {
    // already root or ends in sep
    const trimmed = path.slice(0, -1);
    return trimmed.includes("\\") ? trimmed.slice(0, trimmed.lastIndexOf("\\") + 1) : path;
  }
  const idx = path.lastIndexOf("\\");
  if (idx === -1) return path;
  if (idx === 2) return path.slice(0, 3); // drive root: "C:\"
  return path.slice(0, idx);
}

/** Get the filename/basename from a path. */
function basename(path: string): string {
  const trimmed = path.endsWith("\\") ? path.slice(0, -1) : path;
  const idx = trimmed.lastIndexOf("\\");
  if (idx === -1) return trimmed;
  return trimmed.slice(idx + 1);
}

/** Consistent display path — always ends without trailing slash unless root. */
function displayPath(path: string): string {
  if (path === "C:\\") return "C:\\";
  return path.endsWith("\\") ? path.slice(0, -1) : path;
}

// ---------------------------------------------------------------------------
// Individual command implementations
// ---------------------------------------------------------------------------

function cmdHelp(): CommandResult {
  const result: OutputLine[] = [
    out(""),
    ascii("┌─────────────────────────────────────────────────────────────┐"),
    ascii("│            MS-DOS 6.22 COMMAND REFERENCE                   │"),
    ascii("└─────────────────────────────────────────────────────────────┘"),
    out(""),
    out("  HELP          Display this help screen"),
    out("  DIR  [path]   List directory contents"),
    out("  DIR  /W       Wide directory listing (5 columns)"),
    out("  CD   <path>   Change directory (supports .., absolute paths)"),
    out("  TYPE <file>   Display file contents"),
    out("  EDIT <file>   Open text editor (CONFIG.SYS, AUTOEXEC.BAT only)"),
    out("  CLS           Clear the screen"),
    out("  VER           Display DOS version"),
    out("  MEM           Display memory information"),
    out("  DATE          Display current date"),
    out("  TIME          Display current time"),
    out("  TREE          Display directory tree"),
    out("  WIN           Start Windows 3.1"),
    out("  COLOR <code>  Set terminal color (e.g. COLOR 0A)"),
    out("    Valid codes: 0F  0A  0B  0E  1F  70"),
    out("  ECHO <text>   Display a message"),
    out("  TAIL <file> [/N] Display last N lines of file (default 10)"),
    out("  FORMAT        (Restricted)"),
    out("  DEL           (Restricted)"),
    out("  SNAKE         Launch Snake game"),
    out(""),
    sys("  Tip: Try  TYPE C:\\USERS\\ROG\\ABOUT.TXT  to learn more."),
    out(""),
  ];
  return linesArr(result);
}

function cmdDir(args: string, cwd: string): CommandResult {
  const upperArgs = args.toUpperCase();
  const wideMode = upperArgs.includes("/W");

  // Extract the path arg by stripping the /W flag
  const pathArg = upperArgs.replace("/W", "").trim();
  const targetPath = pathArg ? normalisePath(pathArg, cwd) : cwd;

  const node = getNode(targetPath);

  if (!node) {
    return lines(err(`Invalid path - ${displayPath(targetPath)}`));
  }

  if (node.type === "file") {
    return lines(err(`File not found - ${displayPath(targetPath)}`));
  }

  // node is a directory — get its children
  const children = getChildren(targetPath);

  if (wideMode) {
    return linesArr(cmdDirWide(targetPath, children));
  }

  return linesArr(formatDirListing(targetPath).map(out));
}

function cmdDirWide(
  targetPath: string,
  children: Array<{ name: string; type: "file" | "directory" }>
): OutputLine[] {
  const result: OutputLine[] = [
    out(""),
    out(` Volume in drive C is ROGSDISK`),
    out(` Volume Serial Number is 1337-BEEF`),
    out(` Directory of ${displayPath(targetPath)}`),
    out(""),
  ];

  // Build entries list including . and ..
  const entries: string[] = [".", ".."];
  for (const child of children) {
    entries.push(child.type === "directory" ? `[${child.name}]` : child.name);
  }

  // Arrange in rows of 5 columns, each column 15 chars wide
  const COLS = 5;
  const COL_W = 15;
  for (let i = 0; i < entries.length; i += COLS) {
    const row = entries.slice(i, i + COLS);
    const padded = row.map((e) => e.padEnd(COL_W)).join("");
    result.push(out(padded.trimEnd()));
  }

  result.push(out(""));
  const fileCount = children.filter((c) => c.type === "file").length;
  const dirCount = children.filter((c) => c.type === "directory").length;
  result.push(out(`       ${fileCount} file(s)              0 bytes`));
  result.push(out(`      ${dirCount + 2} dir(s)      524,288,000 bytes free`));
  result.push(out(""));

  return result;
}

function cmdCd(arg: string, cwd: string, setCwd: (p: string) => void): CommandResult {
  if (!arg) {
    // CD with no args prints current directory
    return lines(out(displayPath(cwd)));
  }

  const upper = arg.toUpperCase();

  // Special case: CD \ goes to drive root
  if (upper === "\\" || upper === "/") {
    setCwd("C:\\");
    return noLines();
  }

  const targetPath = normalisePath(upper, cwd);
  const node = getNode(targetPath);

  if (!node) {
    return lines(err(`Invalid directory - ${arg.toUpperCase()}`));
  }

  if (node.type !== "directory") {
    return lines(err(`Invalid directory - ${arg.toUpperCase()}`));
  }

  setCwd(targetPath);
  return noLines();
}

function cmdType(
  arg: string,
  cwd: string,
  configSys: string,
  autoexecBat: string
): CommandResult {
  if (!arg) {
    return lines(err("Required parameter missing"));
  }

  const upper = arg.toUpperCase();

  // Special: CONFIG.SYS and AUTOEXEC.BAT read from state regardless of path
  const fileBasename = basename(normalisePath(upper, cwd));
  if (fileBasename === "CONFIG.SYS") {
    return linesArr([out(""), ...configSys.split("\n").map(out), out("")]);
  }
  if (fileBasename === "AUTOEXEC.BAT") {
    return linesArr([out(""), ...autoexecBat.split("\n").map(out), out("")]);
  }

  const targetPath = normalisePath(upper, cwd);
  const node = getNode(targetPath);

  if (!node) {
    return lines(err(`File not found - ${arg.toUpperCase()}`));
  }

  if (node.type === "directory") {
    return lines(err(`${arg.toUpperCase()} is a directory, not a file`));
  }

  const content = node.content ?? "";
  const contentLines = content.split("\n");

  return linesArr([out(""), ...contentLines.map(out), out("")]);
}

function cmdMem(isHimemLoaded: boolean): CommandResult {
  const result: OutputLine[] = [out("")];

  result.push(
    out("Memory Type        Total    Used     Free"),
    out("──────────────    ──────   ──────   ──────"),
  );

  if (!isHimemLoaded) {
    result.push(
      out("Conventional        640K     87K     553K"),
      out("Upper                 0K      0K       0K"),
      out("Extended              0K      0K       0K"),
      out(""),
      err("  WARNING: Extended memory not available."),
      err("  HIMEM.SYS is not loaded."),
      out(""),
      out("Total memory:       640K"),
    );
  } else {
    result.push(
      out("Conventional        640K     87K     553K"),
      out("Upper               155K     32K     123K"),
      out("Extended          15360K    512K   14848K"),
      out(""),
      out("Total memory:     16384K (16 MB)"),
    );
  }

  result.push(out(""));
  return linesArr(result);
}

function cmdDate(): CommandResult {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[now.getDay()];
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const yyyy = now.getFullYear();
  return lines(out(`Current date is ${dayName} ${mm}-${dd}-${yyyy}`));
}

function cmdTime(): CommandResult {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const cs = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0");
  return lines(out(`Current time is ${hh}:${min}:${ss}.${cs}`));
}

function cmdTree(cwd: string): CommandResult {
  const result: OutputLine[] = [out(""), out(displayPath(cwd))];

  function walk(dirPath: string, prefix: string): void {
    const children = getChildren(dirPath);
    const dirs = children.filter((c) => c.type === "directory");

    for (let i = 0; i < dirs.length; i++) {
      const isLast = i === dirs.length - 1;
      const connector = isLast ? "└──" : "├──";
      result.push(out(`${prefix}${connector} ${dirs[i].name}`));

      const childPrefix = prefix + (isLast ? "    " : "│   ");
      const childPath = dirPath.endsWith("\\")
        ? dirPath + dirs[i].name
        : dirPath + "\\" + dirs[i].name;
      walk(childPath, childPrefix);
    }
  }

  walk(cwd, "");
  result.push(out(""));
  return linesArr(result);
}

function cmdEdit(
  arg: string,
  cwd: string,
  configSys: string,
  autoexecBat: string,
  openEditor: (file: string, content: string) => void
): CommandResult {
  if (!arg) {
    return lines(err("Required parameter missing - specify CONFIG.SYS or AUTOEXEC.BAT"));
  }

  const upper = arg.toUpperCase().trim();
  const fileBasename = basename(normalisePath(upper, cwd));

  if (fileBasename === "CONFIG.SYS") {
    openEditor("CONFIG.SYS", configSys);
    return lines(sys("Opening editor..."));
  }

  if (fileBasename === "AUTOEXEC.BAT") {
    openEditor("AUTOEXEC.BAT", autoexecBat);
    return lines(sys("Opening editor..."));
  }

  return lines(
    err("Access denied - only CONFIG.SYS and AUTOEXEC.BAT can be edited.")
  );
}

function cmdWin(
  isHimemLoaded: boolean,
  isPathSet: boolean,
  canBootWindows: boolean,
  setPhase: (p: "post" | "dos" | "win31-boot" | "win31") => void
): CommandResult {
  if (!isHimemLoaded) {
    return lines(
      out(""),
      err("Error: HIMEM.SYS is not loaded."),
      err("Windows requires extended memory (XMS) to run."),
      out(""),
      sys("Hint: Check CONFIG.SYS \u2014 HIMEM.SYS must be loaded"),
      sys("as a DEVICE driver, not commented out."),
      out("")
    );
  }

  if (!isPathSet) {
    return lines(
      out(""),
      out("Extended memory loaded. (XMS: 15360K available)"),
      out(""),
      err("Error: 'WIN' is not recognized."),
      err("Windows directory is not in PATH."),
      out(""),
      sys("Hint: Check AUTOEXEC.BAT \u2014 the PATH must include"),
      sys("C:\\WINDOWS for WIN.COM to be found."),
      out("")
    );
  }

  if (canBootWindows) {
    // Schedule phase transition after the lines are displayed
    setTimeout(() => setPhase("win31-boot"), 2000);

    return lines(
      out(""),
      out("Loading HIMEM.SYS... Extended memory: 15360K OK"),
      out("Loading EMM386.EXE... Upper memory available"),
      sys("Initializing Windows..."),
      out("")
    );
  }

  // Fallback (should not reach here if logic is correct)
  return lines(err("Unknown error. Check CONFIG.SYS and AUTOEXEC.BAT."));
}

function cmdColor(arg: string, setTerminalColor: (c: string) => void): CommandResult {
  if (!arg) {
    return lines(
      out("Sets the default console foreground and background colors."),
      out(""),
      out("COLOR [attr]"),
      out(""),
      out("  attr    Specifies color attribute of console output"),
      out(""),
      out("  Valid codes:"),
      out("    0F  Bright white on black (default)"),
      out("    0A  Green on black"),
      out("    0B  Cyan on black"),
      out("    0E  Amber on black"),
      out("    1F  White on blue"),
      out("    70  Black on white")
    );
  }

  const code = arg.toUpperCase().trim();
  const validCodes = ["0F", "0A", "0B", "0E", "1F", "70"];

  if (code.length !== 2 || !/^[0-9A-F]{2}$/.test(code) || !validCodes.includes(code)) {
    return lines(err(`Invalid color code - ${code}`));
  }

  setTerminalColor(code);
  return lines(out("Color set."));
}

function cmdEcho(arg: string): CommandResult {
  if (!arg) {
    return lines(out("ECHO is on."));
  }
  return lines(out(arg));
}

function cmdTail(
  arg: string,
  cwd: string,
  configSys: string,
  autoexecBat: string
): CommandResult {
  const parts = arg.match(/^(.*?)\s+\/(\d+)$/i);
  let fileArg: string;
  let count: number;

  if (parts) {
    fileArg = parts[1].trim();
    count = parseInt(parts[2], 10);
  } else {
    fileArg = arg.trim();
    count = 10;
  }

  if (!fileArg) {
    return lines(err("Required parameter missing"));
  }

  const upper = fileArg.toUpperCase();

  const fileBasename = basename(normalisePath(upper, cwd));
  let allLines: string[];
  if (fileBasename === "CONFIG.SYS") {
    allLines = configSys.split("\n");
  } else if (fileBasename === "AUTOEXEC.BAT") {
    allLines = autoexecBat.split("\n");
  } else {
    const node = getNode(normalisePath(upper, cwd));
    if (!node) return lines(err(`File not found - ${fileArg.toUpperCase()}`));
    if (node.type === "directory")
      return lines(err(`${fileArg.toUpperCase()} is a directory`));
    allLines = (node.content ?? "").split("\n");
  }

  const tailLines = allLines.slice(-count);
  return linesArr([out(""), ...tailLines.map(out), out("")]);
}

// ---------------------------------------------------------------------------
// Main exported function
// ---------------------------------------------------------------------------

export function executeCommand(
  rawInput: string,
  state: CommandState
): CommandResult {
  const trimmed = rawInput.trim();

  // Empty input — no output
  if (!trimmed) return noLines();

  // Split on first whitespace to get command and everything after
  const spaceIdx = trimmed.search(/\s/);
  const cmdRaw = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx);
  const argRaw = spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1).trim();

  const cmd = cmdRaw.toUpperCase();

  // Handle /? help flag for any command
  if (argRaw === "/?" || argRaw === "/?") {
    return cmdHelp();
  }

  switch (cmd) {
    // ── HELP ──────────────────────────────────────────────────────────────
    case "HELP":
      return cmdHelp();

    // ── DIR ───────────────────────────────────────────────────────────────
    case "DIR":
      return cmdDir(argRaw, state.cwd);

    // ── CD ────────────────────────────────────────────────────────────────
    case "CD":
    case "CHDIR":
      return cmdCd(argRaw, state.cwd, state.setCwd);

    // ── TYPE ──────────────────────────────────────────────────────────────
    case "TYPE":
      return cmdType(argRaw, state.cwd, state.configSys, state.autoexecBat);

    // ── CLS ───────────────────────────────────────────────────────────────
    case "CLS": {
      state.clearTerminal();
      return noLines();
    }

    // ── VER ───────────────────────────────────────────────────────────────
    case "VER":
      return lines(out(""), out("MS-DOS Version 6.22"), out(""));

    // ── MEM ───────────────────────────────────────────────────────────────
    case "MEM":
      return cmdMem(state.isHimemLoaded());

    // ── DATE ──────────────────────────────────────────────────────────────
    case "DATE":
      return cmdDate();

    // ── TIME ──────────────────────────────────────────────────────────────
    case "TIME":
      return cmdTime();

    // ── TREE ──────────────────────────────────────────────────────────────
    case "TREE":
      return cmdTree(state.cwd);

    // ── EDIT ──────────────────────────────────────────────────────────────
    case "EDIT":
      return cmdEdit(
        argRaw,
        state.cwd,
        state.configSys,
        state.autoexecBat,
        state.openEditor
      );

    // ── WIN ───────────────────────────────────────────────────────────────
    case "WIN":
      return cmdWin(
        state.isHimemLoaded(),
        state.isPathSet(),
        state.canBootWindows(),
        state.setPhase
      );

    // ── COLOR ─────────────────────────────────────────────────────────────
    case "COLOR":
      return cmdColor(argRaw, state.setTerminalColor);

    // ── ECHO ──────────────────────────────────────────────────────────────
    case "ECHO":
      return cmdEcho(argRaw);

    // ── FORMAT ────────────────────────────────────────────────────────────
    case "FORMAT":
      return lines(
        out(""),
        out("Nice try. This drive is write-protected by the system administrator."),
        out("")
      );

    // ── DEL / ERASE ───────────────────────────────────────────────────────
    case "DEL":
    case "ERASE":
      return lines(
        out("This command has been disabled by the system administrator.")
      );

    // ── SNAKE ─────────────────────────────────────────────────────────────
    case "SNAKE": {
      state.setSnakeActive(true);
      return lines(sys("Loading SNAKE.EXE..."));
    }

    // ── PATH (read-only info) ─────────────────────────────────────────────
    case "PATH": {
      const hasPath = state.isPathSet();
      return lines(
        out(hasPath ? "PATH=C:\\DOS;C:\\WINDOWS" : "No path specified")
      );
    }

    // ── TAIL ──────────────────────────────────────────────────────────────
    case "TAIL":
      return cmdTail(argRaw, state.cwd, state.configSys, state.autoexecBat);

    // ── Unknown command ───────────────────────────────────────────────────
    default:
      return lines(err(`Bad command or file name`));
  }
}

// ---------------------------------------------------------------------------
// Re-export path helpers for use by other modules
// ---------------------------------------------------------------------------

export { normalisePath, normaliseAbsolute, parentDir, basename, displayPath };

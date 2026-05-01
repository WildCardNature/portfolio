import { useEffect, useRef } from "react";
import { useStore } from "../../state/store";
import TerminalOutput from "./TerminalOutput";
import CommandInput from "./CommandInput";
import DosEditor from "./DosEditor";

// ---------------------------------------------------------------------------
// Terminal color map
// ---------------------------------------------------------------------------

interface ColorScheme {
  bg: string;
  fg: string;
}

const COLOR_MAP: Record<string, ColorScheme> = {
  "0F": { bg: "#000000", fg: "#FFFFFF" },
  "0A": { bg: "#000000", fg: "#00AA00" },
  "0B": { bg: "#000000", fg: "#00AAAA" },
  "0E": { bg: "#000000", fg: "#FFAA00" },
  "1F": { bg: "#000080", fg: "#FFFFFF" },
};

const DEFAULT_COLORS: ColorScheme = { bg: "#000000", fg: "#FFFFFF" };

// ---------------------------------------------------------------------------
// Snake placeholder
// ---------------------------------------------------------------------------

function SnakePlaceholder() {
  const setSnakeActive = useStore((s) => s.setSnakeActive);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSnakeActive(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSnakeActive]);

  return (
    <div
      className="dos-text"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#00AA00",
        gap: "16px",
      }}
    >
      <div>SNAKE - Press ESC to exit</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DosTerminal
// ---------------------------------------------------------------------------

export default function DosTerminal() {
  const editorOpen = useStore((s) => s.editorOpen);
  const snakeActive = useStore((s) => s.snakeActive);
  const terminalColor = useStore((s) => s.terminalColor);
  const addLine = useStore((s) => s.addLine);
  const terminalLines = useStore((s) => s.terminalLines);

  const colors = COLOR_MAP[terminalColor] ?? DEFAULT_COLORS;

  // Hint: after 5 seconds of no input, show "Type HELP for commands" once
  const hintShown = useRef(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hintShown.current) return;

    // Reset the idle timer whenever terminal lines change (user is active)
    if (hintTimer.current) {
      clearTimeout(hintTimer.current);
    }

    hintTimer.current = setTimeout(() => {
      if (!hintShown.current) {
        hintShown.current = true;
        addLine({ text: "Type HELP for commands", type: "system" });
      }
    }, 5000);

    return () => {
      if (hintTimer.current) {
        clearTimeout(hintTimer.current);
      }
    };
  }, [terminalLines, addLine]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: colors.bg,
        color: colors.fg,
        padding: "8px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      // CommandInput attaches a document-level click listener to re-focus the hidden input
    >
      {editorOpen ? (
        <DosEditor />
      ) : snakeActive ? (
        <SnakePlaceholder />
      ) : (
        <>
          <TerminalOutput />
          <CommandInput />
        </>
      )}
    </div>
  );
}

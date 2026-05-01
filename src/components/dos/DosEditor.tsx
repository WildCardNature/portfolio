import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../../state/store";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConfirmState = "none" | "quit-confirm" | "saved-flash";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getLineColor(line: string): string {
  const trimmed = line.trimStart().toUpperCase();
  if (trimmed.startsWith("REM ") || trimmed === "REM") return "#666666";
  if (trimmed.includes("DEVICE=") || trimmed.includes("SET PATH=")) return "#ffffff";
  return "#aaaaaa";
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DosEditor() {
  const editorFile = useStore((s) => s.editorFile);
  const editorContent = useStore((s) => s.editorContent);
  const setEditorContent = useStore((s) => s.setEditorContent);
  const closeEditor = useStore((s) => s.closeEditor);
  const setConfigSys = useStore((s) => s.setConfigSys);
  const setAutoexecBat = useStore((s) => s.setAutoexecBat);
  const addLine = useStore((s) => s.addLine);

  // ── Editor state ──────────────────────────────────────────────────────────
  const [lines, setLines] = useState<string[]>(() =>
    editorContent ? editorContent.split("\n") : [""]
  );
  const [cursorRow, setCursorRow] = useState(0);
  const [cursorCol, setCursorCol] = useState(0);
  const [modified, setModified] = useState(false);
  const [confirmState, setConfirmState] = useState<ConfirmState>("none");

  // Keep a ref to lines so key handlers always read fresh state without stale
  // closures — avoids the classic React state-in-callback trap.
  const linesRef = useRef(lines);
  const cursorRowRef = useRef(cursorRow);
  const cursorColRef = useRef(cursorCol);
  const modifiedRef = useRef(modified);
  const confirmStateRef = useRef(confirmState);

  useEffect(() => { linesRef.current = lines; }, [lines]);
  useEffect(() => { cursorRowRef.current = cursorRow; }, [cursorRow]);
  useEffect(() => { cursorColRef.current = cursorCol; }, [cursorCol]);
  useEffect(() => { modifiedRef.current = modified; }, [modified]);
  useEffect(() => { confirmStateRef.current = confirmState; }, [confirmState]);

  // The textarea row for the cursor should scroll into view
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // ── Auto-focus on mount ───────────────────────────────────────────────────
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // ── Scroll cursor row into view ───────────────────────────────────────────
  useEffect(() => {
    const el = lineRefs.current[cursorRow];
    el?.scrollIntoView({ block: "nearest" });
  }, [cursorRow]);

  // ── Save helper ───────────────────────────────────────────────────────────
  const saveFile = useCallback(
    (currentLines: string[]) => {
      const content = currentLines.join("\n");
      setEditorContent(content);
      if (editorFile === "CONFIG.SYS") setConfigSys(content);
      else if (editorFile === "AUTOEXEC.BAT") setAutoexecBat(content);
      setModified(false);
      modifiedRef.current = false;
      setConfirmState("saved-flash");
      setTimeout(() => setConfirmState("none"), 1200);
    },
    [editorFile, setEditorContent, setConfigSys, setAutoexecBat]
  );

  // ── Quit helper ───────────────────────────────────────────────────────────
  const doClose = useCallback(() => {
    closeEditor();
    addLine({ text: "Editor closed.", type: "system" });
  }, [closeEditor, addLine]);

  // ── Key handler ───────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentLines = linesRef.current;
      const row = cursorRowRef.current;
      const col = cursorColRef.current;
      const isModified = modifiedRef.current;
      const confirm = confirmStateRef.current;

      // ── Quit-confirm mode ─────────────────────────────────────────────────
      if (confirm === "quit-confirm") {
        e.preventDefault();
        const key = e.key.toUpperCase();
        if (key === "Y") {
          saveFile(currentLines);
          // Close after save-flash clears (1.2 s). Use a brief timeout so the
          // user can see "Saved." before the editor disappears.
          setTimeout(() => doClose(), 1300);
        } else if (key === "N") {
          doClose();
        } else if (key === "C" || e.key === "Escape") {
          setConfirmState("none");
        }
        return;
      }

      // ── Ctrl combos ───────────────────────────────────────────────────────
      if (e.ctrlKey) {
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          saveFile(currentLines);
          return;
        }
        if (e.key === "q" || e.key === "Q") {
          e.preventDefault();
          if (!isModified) {
            doClose();
          } else {
            setConfirmState("quit-confirm");
          }
          return;
        }
        // Let other Ctrl combos (Ctrl+A etc.) pass through
        return;
      }

      // ── Escape ────────────────────────────────────────────────────────────
      if (e.key === "Escape") {
        e.preventDefault();
        if (!isModified) {
          doClose();
        } else {
          setConfirmState("quit-confirm");
        }
        return;
      }

      // ── Navigation keys ───────────────────────────────────────────────────
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (row > 0) {
          const newRow = row - 1;
          const newCol = clamp(col, 0, currentLines[newRow].length);
          setCursorRow(newRow);
          setCursorCol(newCol);
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (row < currentLines.length - 1) {
          const newRow = row + 1;
          const newCol = clamp(col, 0, currentLines[newRow].length);
          setCursorRow(newRow);
          setCursorCol(newCol);
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (col > 0) {
          setCursorCol(col - 1);
        } else if (row > 0) {
          // Wrap to end of previous line
          setCursorRow(row - 1);
          setCursorCol(currentLines[row - 1].length);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (col < currentLines[row].length) {
          setCursorCol(col + 1);
        } else if (row < currentLines.length - 1) {
          // Wrap to start of next line
          setCursorRow(row + 1);
          setCursorCol(0);
        }
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        setCursorCol(0);
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        setCursorCol(currentLines[row].length);
        return;
      }

      if (e.key === "PageUp") {
        e.preventDefault();
        const newRow = Math.max(0, row - 20);
        setCursorRow(newRow);
        setCursorCol(clamp(col, 0, currentLines[newRow].length));
        return;
      }

      if (e.key === "PageDown") {
        e.preventDefault();
        const newRow = Math.min(currentLines.length - 1, row + 20);
        setCursorRow(newRow);
        setCursorCol(clamp(col, 0, currentLines[newRow].length));
        return;
      }

      // ── Editing keys ──────────────────────────────────────────────────────

      if (e.key === "Enter") {
        e.preventDefault();
        const currentLine = currentLines[row];
        const before = currentLine.slice(0, col);
        const after = currentLine.slice(col);
        const newLines = [
          ...currentLines.slice(0, row),
          before,
          after,
          ...currentLines.slice(row + 1),
        ];
        setLines(newLines);
        setCursorRow(row + 1);
        setCursorCol(0);
        setModified(true);
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        if (col > 0) {
          // Delete character before cursor on the same line
          const newLine =
            currentLines[row].slice(0, col - 1) + currentLines[row].slice(col);
          const newLines = [
            ...currentLines.slice(0, row),
            newLine,
            ...currentLines.slice(row + 1),
          ];
          setLines(newLines);
          setCursorCol(col - 1);
        } else if (row > 0) {
          // Join with previous line
          const prevLine = currentLines[row - 1];
          const newLines = [
            ...currentLines.slice(0, row - 1),
            prevLine + currentLines[row],
            ...currentLines.slice(row + 1),
          ];
          setLines(newLines);
          setCursorRow(row - 1);
          setCursorCol(prevLine.length);
        }
        setModified(true);
        return;
      }

      if (e.key === "Delete") {
        e.preventDefault();
        const currentLine = currentLines[row];
        if (col < currentLine.length) {
          // Delete character at cursor
          const newLine = currentLine.slice(0, col) + currentLine.slice(col + 1);
          const newLines = [
            ...currentLines.slice(0, row),
            newLine,
            ...currentLines.slice(row + 1),
          ];
          setLines(newLines);
        } else if (row < currentLines.length - 1) {
          // Join next line into current line
          const newLines = [
            ...currentLines.slice(0, row),
            currentLine + currentLines[row + 1],
            ...currentLines.slice(row + 2),
          ];
          setLines(newLines);
        }
        setModified(true);
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        // Insert two spaces as a tab substitute
        const currentLine = currentLines[row];
        const newLine = currentLine.slice(0, col) + "  " + currentLine.slice(col);
        const newLines = [
          ...currentLines.slice(0, row),
          newLine,
          ...currentLines.slice(row + 1),
        ];
        setLines(newLines);
        setCursorCol(col + 2);
        setModified(true);
        return;
      }

      // ── Printable character insert ─────────────────────────────────────────
      // Filter out modifier-only keys, function keys, etc.
      if (
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        const currentLine = currentLines[row];
        const newLine = currentLine.slice(0, col) + e.key + currentLine.slice(col);
        const newLines = [
          ...currentLines.slice(0, row),
          newLine,
          ...currentLines.slice(row + 1),
        ];
        setLines(newLines);
        setCursorCol(col + 1);
        setModified(true);
      }
    },
    [saveFile, doClose]
  );

  // ── Status bar text ───────────────────────────────────────────────────────
  let statusLeft: string;
  if (confirmState === "quit-confirm") {
    statusLeft = "File modified. Save before quitting? (Y/N/C)";
  } else if (confirmState === "saved-flash") {
    statusLeft = "Saved.";
  } else {
    statusLeft = "Ctrl+S Save  Ctrl+Q Quit  Arrow keys to move";
  }
  const statusRight = `Ln ${cursorRow + 1}, Col ${cursorCol + 1}`;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        outline: "none",
        border: "1px solid #333333",
        boxSizing: "border-box",
      }}
    >
      {/* ── Title bar ──────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#222222",
          color: "#ffffff",
          padding: "2px 8px",
          flexShrink: 0,
          borderBottom: "1px solid #444444",
          fontFamily: "var(--font-dos, 'Courier New', monospace)",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "1px",
          userSelect: "none",
        }}
      >
        {`EDIT - ${editorFile ?? "Untitled"}`}
        {modified && (
          <span style={{ color: "#ffaa00", marginLeft: "8px" }}>*</span>
        )}
      </div>

      {/* ── Editor body ────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "auto",
          padding: "4px 8px",
          cursor: "text",
          scrollbarWidth: "thin",
          scrollbarColor: "#333 #000",
        }}
        onClick={(e) => {
          // Focus container when user clicks in editor area
          containerRef.current?.focus();
          // Don't try to compute click-to-cursor position here — keep it simple;
          // the user can navigate with arrow keys.
          e.stopPropagation();
        }}
      >
        {lines.map((line, rowIdx) => {
          const color = getLineColor(line);
          const isCursorRow = rowIdx === cursorRow;

          // Build the visual line with inline cursor character
          // We split the line around the cursor position so we can insert
          // the blinking block without breaking the text layout.
          let content: React.ReactNode;
          if (isCursorRow) {
            const col = cursorCol;
            const before = line.slice(0, col);
            const atCursor = line[col]; // may be undefined (end of line)
            const after = line.slice(col + 1);

            content = (
              <>
                {before.length > 0 && (
                  <span>{before}</span>
                )}
                <span
                  className="cursor-blink"
                  style={{
                    color: "#000000",
                    backgroundColor: color,
                    // Ensure the cursor is at least one character wide at EOL
                    display: "inline-block",
                    minWidth: "0.6em",
                  }}
                >
                  {atCursor ?? " "}
                </span>
                {after.length > 0 && (
                  <span>{after}</span>
                )}
              </>
            );
          } else {
            content = line || " "; // non-breaking empty line
          }

          return (
            <div
              key={rowIdx}
              ref={(el) => { lineRefs.current[rowIdx] = el; }}
              style={{
                color,
                fontFamily: "var(--font-dos, 'Courier New', monospace)",
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "1px",
                whiteSpace: "pre",
                minHeight: "20px",
              }}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#222222",
          color:
            confirmState === "quit-confirm"
              ? "#ffaa00"
              : confirmState === "saved-flash"
              ? "#00aa00"
              : "#aaaaaa",
          padding: "2px 8px",
          flexShrink: 0,
          borderTop: "1px solid #444444",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-dos, 'Courier New', monospace)",
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "1px",
          userSelect: "none",
        }}
      >
        <span>{statusLeft}</span>
        <span style={{ color: "#aaaaaa" }}>{statusRight}</span>
      </div>
    </div>
  );
}

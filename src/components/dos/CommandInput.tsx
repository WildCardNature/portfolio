import { useRef, useEffect, useState, useCallback } from "react";
import { useStore } from "../../state/store";
import { executeCommand } from "../../utils/commandParser";

export default function CommandInput() {
  const cwd = useStore((s) => s.cwd);
  const commandHistory = useStore((s) => s.commandHistory);
  const historyIndex = useStore((s) => s.historyIndex);
  const addCommand = useStore((s) => s.addCommand);
  const addLine = useStore((s) => s.addLine);
  const addLines = useStore((s) => s.addLines);
  const setHistoryIndex = useStore((s) => s.setHistoryIndex);
  const terminalColor = useStore((s) => s.terminalColor);

  // Full state slice for executeCommand
  const setCwd = useStore((s) => s.setCwd);
  const configSys = useStore((s) => s.configSys);
  const autoexecBat = useStore((s) => s.autoexecBat);
  const isHimemLoaded = useStore((s) => s.isHimemLoaded);
  const isPathSet = useStore((s) => s.isPathSet);
  const canBootWindows = useStore((s) => s.canBootWindows);
  const setPhase = useStore((s) => s.setPhase);
  const openEditor = useStore((s) => s.openEditor);
  const clearTerminal = useStore((s) => s.clearTerminal);
  const setTerminalColor = useStore((s) => s.setTerminalColor);
  const setSnakeActive = useStore((s) => s.setSnakeActive);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive the text color for typed input from terminalColor
  const inputTextColor = terminalColor === "0F" ? "#FFFFFF" : "#AAAAAA";

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-focus on mount and refocus whenever the user clicks anywhere in the document
  useEffect(() => {
    focusInput();
    document.addEventListener("click", focusInput);
    return () => {
      document.removeEventListener("click", focusInput);
    };
  }, [focusInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const text = inputValue.trim();

      // Echo the input line (even if empty, show prompt)
      addLine({ text: `${cwd}>${text}`, type: "input" });

      if (text !== "") {
        addCommand(text);

        const stateSlice = {
          cwd,
          setCwd,
          configSys,
          autoexecBat,
          isHimemLoaded,
          isPathSet,
          canBootWindows,
          setPhase,
          openEditor,
          clearTerminal,
          setTerminalColor,
          setSnakeActive,
        };

        const result = executeCommand(text, stateSlice);
        if (result.lines.length > 0) {
          addLines(result.lines);
        }
      }

      setInputValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const maxIndex = commandHistory.length - 1;
      if (maxIndex < 0) return;
      const nextIndex = historyIndex < maxIndex ? historyIndex + 1 : maxIndex;
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue("");
        return;
      }
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex] ?? "");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className="dos-text"
      style={{ flexShrink: 0, cursor: "text" }}
      onClick={focusInput}
    >
      {/* Hidden real input that captures all keystrokes */}
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: "1px",
          height: "1px",
          top: 0,
          left: 0,
        }}
      />

      {/* Visible prompt line */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: "#FFFFFF" }}>{cwd}&gt;</span>
        <span
          style={{
            color: inputTextColor,
            whiteSpace: "pre",
            wordBreak: "break-all",
          }}
        >
          {inputValue}
        </span>
        <span className="cursor-blink" style={{ color: "#FFFFFF" }}>
          █
        </span>
      </div>
    </div>
  );
}

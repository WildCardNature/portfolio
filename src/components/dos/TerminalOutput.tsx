import { useEffect, useRef } from "react";
import { useStore } from "../../state/store";
import type { TerminalLine } from "../../state/types";

const typeColor: Record<TerminalLine["type"], string> = {
  input: "#FFFFFF",
  output: "#AAAAAA",
  error: "#FF5555",
  system: "#FFAA00",
  ascii: "#AAAAAA",
};

export default function TerminalOutput() {
  const terminalLines = useStore((s) => s.terminalLines);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <div
      ref={containerRef}
      className="dos-text no-scrollbar"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "0",
      }}
    >
      {terminalLines.map((line) => (
        <div
          key={line.id}
          style={{
            color: typeColor[line.type],
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            minHeight: "20px",
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

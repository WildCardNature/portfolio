import React, { useRef, useCallback } from "react";
import { useStore } from "../../state/store";

// ---------------------------------------------------------------------------
// Win 3.1 generic draggable window chrome
// ---------------------------------------------------------------------------

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
}

// Shared Win 3.1 button style helpers
const WIN31_BTN: React.CSSProperties = {
  width: 16,
  height: 14,
  background: "#C0C0C0",
  border: "none",
  borderTop: "1px solid #FFFFFF",
  borderLeft: "1px solid #FFFFFF",
  borderRight: "1px solid #404040",
  borderBottom: "1px solid #404040",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 9,
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  color: "#000000",
  padding: 0,
  lineHeight: 1,
  flexShrink: 0,
  userSelect: "none",
};

export default function Window({ id, title, children }: Props) {
  const win = useStore((s) => s.windows.find((w) => w.id === id));
  const activeWindowId = useStore((s) => s.activeWindowId);
  const focusWindow = useStore((s) => s.focusWindow);
  const closeWindow = useStore((s) => s.closeWindow);
  const minimizeWindow = useStore((s) => s.minimizeWindow);
  const maximizeWindow = useStore((s) => s.maximizeWindow);
  const moveWindow = useStore((s) => s.moveWindow);

  // Track drag state in a ref to avoid stale closures
  const dragRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    winX: number;
    winY: number;
  }>({ dragging: false, startX: 0, startY: 0, winX: 0, winY: 0 });

  const isActive = activeWindowId === id;

  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't start drag if clicking a button
      if ((e.target as HTMLElement).tagName === "BUTTON") return;
      e.preventDefault();

      if (!win) return;

      focusWindow(id);

      dragRef.current = {
        dragging: true,
        startX: e.clientX,
        startY: e.clientY,
        winX: win.x,
        winY: win.y,
      };

      const onMouseMove = (me: MouseEvent) => {
        if (!dragRef.current.dragging) return;
        const dx = me.clientX - dragRef.current.startX;
        const dy = me.clientY - dragRef.current.startY;
        moveWindow(id, dragRef.current.winX + dx, dragRef.current.winY + dy);
      };

      const onMouseUp = () => {
        dragRef.current.dragging = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [id, win, focusWindow, moveWindow]
  );

  // Don't render minimized windows
  if (!win || win.minimized) return null;

  const isMaximized = win.maximized;

  const containerStyle: React.CSSProperties = isMaximized
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 28, // leave room for taskbar
        width: "auto",
        height: "auto",
        zIndex: win.zIndex,
        display: "flex",
        flexDirection: "column",
        // Win 3.1 classic outset window border
        borderTop: "2px solid #FFFFFF",
        borderLeft: "2px solid #FFFFFF",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        outline: "1px solid #000000",
        background: "#C0C0C0",
        fontFamily: "Arial, 'Segoe UI', sans-serif",
        fontSize: 12,
      }
    : {
        position: "absolute",
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        display: "flex",
        flexDirection: "column",
        // Win 3.1 classic outset window border
        borderTop: "2px solid #FFFFFF",
        borderLeft: "2px solid #FFFFFF",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        outline: "1px solid #000000",
        background: "#C0C0C0",
        fontFamily: "Arial, 'Segoe UI', sans-serif",
        fontSize: 12,
      };

  const titleBarColor = isActive ? "#000080" : "#808080";

  return (
    <div
      style={containerStyle}
      onMouseDown={() => focusWindow(id)}
    >
      {/* ── Title bar ── */}
      <div
        onMouseDown={onTitleMouseDown}
        style={{
          background: titleBarColor,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          padding: "2px 3px",
          gap: 4,
          cursor: "default",
          flexShrink: 0,
          userSelect: "none",
          minHeight: 20,
        }}
      >
        {/* Window menu icon (system box) */}
        <div
          style={{
            width: 16,
            height: 14,
            background: "#C0C0C0",
            border: "1px solid #808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 9,
            color: "#000000",
            fontFamily: "Arial, sans-serif",
          }}
        >
          ─
        </div>

        {/* Title text */}
        <span
          style={{
            flex: 1,
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Arial, 'Segoe UI', sans-serif",
            letterSpacing: 0.3,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>

        {/* Window control buttons */}
        <div style={{ display: "flex", gap: 2 }}>
          <button
            style={WIN31_BTN}
            title="Minimize"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
          >
            _
          </button>
          <button
            style={WIN31_BTN}
            title={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(id);
            }}
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button
            style={{
              ...WIN31_BTN,
              borderTop: "1px solid #FFFFFF",
              borderLeft: "1px solid #FFFFFF",
            }}
            title="Close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* ── Menu bar slot (children may opt in) ── */}
      {/* We expose a data attribute that child components can use to render
          into if they need a menu bar — for now this is just the chrome */}

      {/* ── Content area ── */}
      <div
        style={{
          flex: 1,
          background: "#FFFFFF",
          color: "#000000",
          overflow: "auto",
          // Inset border for the content area
          borderTop: "1px solid #808080",
          borderLeft: "1px solid #808080",
          borderRight: "1px solid #FFFFFF",
          borderBottom: "1px solid #FFFFFF",
          margin: "2px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}

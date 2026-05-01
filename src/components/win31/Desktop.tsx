import { useEffect, useRef, useState } from "react";
import { useStore } from "../../state/store";
import { projects } from "../../data/projects";
import { getNode } from "../../data/filesystem";
import Window from "./Window";
import ProgramManager from "./ProgramManager";

// ---------------------------------------------------------------------------
// Win 3.1 Desktop
// ---------------------------------------------------------------------------

// ── Project window content ──────────────────────────────────────────────────

function ProjectContent({ projectId }: { projectId: string }) {
  const proj = projects.find((p) => p.id === projectId);
  if (!proj) {
    return (
      <div style={CONTENT_PAD}>
        <p style={{ color: "#FF0000" }}>Project not found: {projectId}</p>
      </div>
    );
  }

  return (
    <div style={{ ...CONTENT_PAD, fontFamily: "Arial, 'Segoe UI', sans-serif", fontSize: 12 }}>
      {/* Header */}
      <div
        style={{
          background: "#000080",
          color: "#FFFFFF",
          padding: "6px 10px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: 13 }}>{proj.name}</span>
        <span
          style={{
            background: proj.statusColor,
            color: "#000000",
            padding: "1px 6px",
            fontSize: 10,
            fontWeight: "bold",
            border: "1px solid #000000",
          }}
        >
          {proj.status}
        </span>
      </div>

      {/* Tagline */}
      <p style={{ color: "#000080", fontStyle: "italic", marginBottom: 8, fontSize: 11 }}>
        {proj.tagline}
      </p>

      {/* Description */}
      <p style={{ marginBottom: 10, lineHeight: 1.5 }}>{proj.description}</p>

      {/* Separator */}
      <div style={SEPARATOR} />

      {/* Features */}
      <div style={{ marginBottom: 10 }}>
        <div style={SECTION_LABEL}>Features:</div>
        <ul style={{ margin: "4px 0 0 18px", padding: 0, lineHeight: 1.6 }}>
          {proj.features.map((f, i) => (
            <li key={i} style={{ marginBottom: 2 }}>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Separator */}
      <div style={SEPARATOR} />

      {/* Tech stack */}
      <div>
        <div style={SECTION_LABEL}>Tech Stack:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
          {proj.stack.map((group) => (
            <div
              key={group.label}
              style={{
                border: "1px solid #808080",
                padding: "4px 8px",
                background: "#F0F0F0",
                minWidth: 100,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#000080",
                  marginBottom: 3,
                  borderBottom: "1px solid #C0C0C0",
                  paddingBottom: 2,
                }}
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <div key={item} style={{ fontSize: 11, color: "#333333" }}>
                  • {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Notepad window content ───────────────────────────────────────────────────

function NotepadContent({ file }: { file?: string }) {
  let content = "";
  if (file) {
    const node = getNode(file);
    content = node?.content ?? `File not found: ${file}`;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Notepad menu bar */}
      <div
        style={{
          display: "flex",
          background: "#C0C0C0",
          borderBottom: "1px solid #808080",
          fontSize: 12,
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {["File", "Edit", "Search", "Help"].map((item) => (
          <div
            key={item}
            style={{ padding: "2px 8px", cursor: "default", fontFamily: "Arial, sans-serif" }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Text area */}
      <textarea
        readOnly
        value={content}
        style={{
          flex: 1,
          resize: "none",
          border: "none",
          outline: "none",
          padding: "6px 8px",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 12,
          lineHeight: 1.5,
          background: "#FFFFFF",
          color: "#000000",
          whiteSpace: "pre",
          overflowWrap: "normal",
        }}
      />
    </div>
  );
}

// ── DOS placeholder ──────────────────────────────────────────────────────────

function DosPlaceholder() {
  return (
    <div
      style={{
        background: "#000000",
        color: "#C0C0C0",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 13,
        padding: "8px 12px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div>Microsoft(R) MS-DOS(R) Version 6.22</div>
      <div style={{ color: "#808080", fontSize: 11, marginTop: 2 }}>
        (C)Copyright Microsoft Corp 1981-1994
      </div>
      <div style={{ marginTop: 16 }}>C:\&gt;_</div>
      <div style={{ color: "#808080", marginTop: 24, fontSize: 11 }}>
        [Type EXIT to return to Windows]
      </div>
    </div>
  );
}

// ── Snake placeholder ────────────────────────────────────────────────────────

function SnakePlaceholder() {
  return (
    <div style={{ ...PLACEHOLDER_STYLE, background: "#000040" }}>
      <div style={{ fontSize: 18, marginBottom: 8 }}>🐍</div>
      <div style={{ fontSize: 14, fontWeight: "bold", color: "#00FF00" }}>Snake</div>
      <div style={{ color: "#888888", marginTop: 8, fontSize: 11 }}>Coming soon...</div>
    </div>
  );
}

// ── Minesweeper placeholder ──────────────────────────────────────────────────

function MinesweeperPlaceholder() {
  return (
    <div style={PLACEHOLDER_STYLE}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>💣</div>
      <div style={{ fontSize: 14, fontWeight: "bold" }}>Minesweeper</div>
      <div style={{ color: "#888888", marginTop: 8, fontSize: 11 }}>Coming soon...</div>
    </div>
  );
}

// ── Calculator placeholder ───────────────────────────────────────────────────

function CalculatorPlaceholder() {
  return (
    <div style={PLACEHOLDER_STYLE}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>🧮</div>
      <div style={{ fontSize: 14, fontWeight: "bold" }}>Calculator</div>
      <div style={{ color: "#888888", marginTop: 8, fontSize: 11 }}>Coming soon...</div>
    </div>
  );
}

// ── Shared style constants ───────────────────────────────────────────────────

const CONTENT_PAD: React.CSSProperties = { padding: "10px 12px" };
const SEPARATOR: React.CSSProperties = {
  height: 1,
  background: "#C0C0C0",
  marginBottom: 8,
  borderTop: "1px solid #808080",
  borderBottom: "1px solid #FFFFFF",
};
const SECTION_LABEL: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: 11,
  color: "#000080",
  marginBottom: 2,
};
const PLACEHOLDER_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  background: "#C0C0C0",
  fontFamily: "Arial, 'Segoe UI', sans-serif",
  fontSize: 12,
  color: "#000000",
};

// ── Window content router ────────────────────────────────────────────────────

function WindowContent({
  component,
  props,
}: {
  component: string;
  props?: Record<string, unknown>;
}) {
  switch (component) {
    case "project":
      return <ProjectContent projectId={(props?.projectId as string) ?? ""} />;
    case "notepad":
      return <NotepadContent file={props?.file as string | undefined} />;
    case "dos":
      return <DosPlaceholder />;
    case "snake":
      return <SnakePlaceholder />;
    case "minesweeper":
      return <MinesweeperPlaceholder />;
    case "calculator":
      return <CalculatorPlaceholder />;
    case "program-manager":
      return <ProgramManager />;
    default:
      return (
        <div style={CONTENT_PAD}>
          <p>Unknown component: {component}</p>
        </div>
      );
  }
}

// ── Clock ────────────────────────────────────────────────────────────────────

function Clock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      );
    };
    // Align to the next whole minute
    const msToNextMinute = (60 - new Date().getSeconds()) * 1000;
    const alignTimer = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60000);
      return () => clearInterval(interval);
    }, msToNextMinute);
    return () => clearTimeout(alignTimer);
  }, []);

  return (
    <div
      style={{
        border: "none",
        borderTop: "1px solid #808080",
        borderLeft: "1px solid #808080",
        borderRight: "1px solid #FFFFFF",
        borderBottom: "1px solid #FFFFFF",
        padding: "1px 8px",
        fontFamily: "Arial, 'Segoe UI', sans-serif",
        fontSize: 12,
        background: "#C0C0C0",
        userSelect: "none",
        minWidth: 44,
        textAlign: "center",
      }}
    >
      {time}
    </div>
  );
}

// ── Start Menu ──────────────────────────────────────────────────────────────

const MENU_ITEM: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "4px 24px 4px 8px",
  fontSize: 12,
  fontFamily: "Arial, 'Segoe UI', sans-serif",
  color: "#000000",
  cursor: "default",
  userSelect: "none",
  whiteSpace: "nowrap",
};

const MENU_SEP: React.CSSProperties = {
  height: 0,
  margin: "3px 4px",
  borderTop: "1px solid #808080",
  borderBottom: "1px solid #FFFFFF",
};

interface MenuItem {
  icon: string;
  label: string;
  action: () => void;
}

function StartMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: { top: MenuItem[]; bottom: MenuItem[] };
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on any click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Use a timeout so the click that opened the menu doesn't immediately close it
    const id = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        bottom: 28,
        left: 0,
        minWidth: 200,
        background: "#C0C0C0",
        borderTop: "2px solid #FFFFFF",
        borderLeft: "2px solid #FFFFFF",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        zIndex: 99999,
        boxShadow: "2px 2px 0 #000",
      }}
    >
      {/* Side banner */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 24,
            background: "linear-gradient(to top, #000080, #0000C0)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 6,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
              color: "#C0C0C0",
              fontWeight: "bold",
              fontSize: 13,
              fontFamily: "Arial, sans-serif",
              letterSpacing: 2,
            }}
          >
            Windows 3.1
          </span>
        </div>

        {/* Menu items */}
        <div style={{ flex: 1, padding: "4px 0" }}>
          {items.top.map((item, i) => (
            <div
              key={i}
              style={MENU_ITEM}
              onMouseDown={(e) => {
                e.stopPropagation();
                item.action();
                onClose();
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#000080";
                (e.currentTarget as HTMLDivElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
                (e.currentTarget as HTMLDivElement).style.color = "#000000";
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}

          <div style={MENU_SEP} />

          {items.bottom.map((item, i) => (
            <div
              key={i}
              style={MENU_ITEM}
              onMouseDown={(e) => {
                e.stopPropagation();
                item.action();
                onClose();
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#000080";
                (e.currentTarget as HTMLDivElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
                (e.currentTarget as HTMLDivElement).style.color = "#000000";
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Desktop component ────────────────────────────────────────────────────────

export default function Desktop() {
  const windows = useStore((s) => s.windows);
  const openWindow = useStore((s) => s.openWindow);
  const focusWindow = useStore((s) => s.focusWindow);
  const setPhase = useStore((s) => s.setPhase);

  const [startOpen, setStartOpen] = useState(false);

  const startMenuItems = {
    top: [
      {
        icon: "📂",
        label: "Program Manager",
        action: () =>
          openWindow({
            id: "program-manager",
            title: "Program Manager",
            component: "program-manager",
            x: 20,
            y: 20,
            width: 620,
            height: 420,
            minimized: false,
            maximized: false,
          }),
      },
      {
        icon: "📄",
        label: "About Me",
        action: () =>
          openWindow({
            id: "notepad-about",
            title: "About Me - Notepad",
            component: "notepad",
            x: 80,
            y: 60,
            width: 450,
            height: 350,
            minimized: false,
            maximized: false,
            props: { file: "C:\\USERS\\ROG\\ABOUT.TXT" },
          }),
      },
      {
        icon: "📝",
        label: "Resume",
        action: () =>
          openWindow({
            id: "notepad-resume",
            title: "Resume - Notepad",
            component: "notepad",
            x: 104,
            y: 84,
            width: 450,
            height: 350,
            minimized: false,
            maximized: false,
            props: { file: "C:\\USERS\\ROG\\RESUME.TXT" },
          }),
      },
      {
        icon: "✉",
        label: "Contact",
        action: () =>
          openWindow({
            id: "notepad-contact",
            title: "Contact - Notepad",
            component: "notepad",
            x: 128,
            y: 108,
            width: 450,
            height: 350,
            minimized: false,
            maximized: false,
            props: { file: "C:\\USERS\\ROG\\CONTACT.TXT" },
          }),
      },
      {
        icon: "⌨",
        label: "DOS Prompt",
        action: () =>
          openWindow({
            id: "dos-prompt",
            title: "MS-DOS Prompt",
            component: "dos",
            x: 140,
            y: 90,
            width: 600,
            height: 400,
            minimized: false,
            maximized: false,
          }),
      },
    ],
    bottom: [
      {
        icon: "🔌",
        label: "Exit to DOS",
        action: () => setPhase("dos"),
      },
    ],
  };

  // Auto-open Program Manager on mount
  useEffect(() => {
    openWindow({
      id: "program-manager",
      title: "Program Manager",
      component: "program-manager",
      x: 20,
      y: 20,
      width: 620,
      height: 420,
      minimized: false,
      maximized: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minimizedWindows = windows.filter((w) => w.minimized);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#008080",
        overflow: "hidden",
        fontFamily: "Arial, 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Window layer ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 28, // room for taskbar
        }}
      >
        {windows.map((win) => (
          <Window key={win.id} id={win.id} title={win.title}>
            <WindowContent component={win.component} props={win.props} />
          </Window>
        ))}
      </div>

      {/* ── Taskbar / minimised icon tray ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 28,
          background: "#C0C0C0",
          borderTop: "2px solid #FFFFFF",
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          gap: 4,
          overflow: "hidden",
        }}
      >
        {/* Start button */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              setStartOpen((prev) => !prev);
            }}
            style={{
              borderTop: startOpen ? "1px solid #404040" : "1px solid #FFFFFF",
              borderLeft: startOpen ? "1px solid #404040" : "1px solid #FFFFFF",
              borderRight: startOpen ? "1px solid #FFFFFF" : "1px solid #404040",
              borderBottom: startOpen ? "1px solid #FFFFFF" : "1px solid #404040",
              padding: "2px 10px 2px 6px",
              fontFamily: "Arial, sans-serif",
              fontSize: 11,
              fontWeight: "bold",
              background: "#C0C0C0",
              userSelect: "none",
              cursor: "default",
              display: "flex",
              alignItems: "center",
              gap: 4,
              outline: "none",
              color: "#000000",
            }}
          >
            <span style={{ fontSize: 14 }}>🪟</span>
            Start
          </button>
          <StartMenu
            open={startOpen}
            onClose={() => setStartOpen(false)}
            items={startMenuItems}
          />
        </div>

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 20,
            background: "#808080",
            borderRight: "1px solid #FFFFFF",
            marginLeft: 2,
            marginRight: 2,
            flexShrink: 0,
          }}
        />

        {/* Minimised window buttons */}
        {minimizedWindows.map((win) => (
          <button
            key={win.id}
            title={`Restore: ${win.title}`}
            onClick={() => {
              focusWindow(win.id);
              // Un-minimize by restoring — we toggle minimized via focusWindow
              // which sets minimized: false in the store's openWindow logic
              useStore.getState().openWindow({ ...win, minimized: false });
            }}
            style={{
              borderTop: "1px solid #FFFFFF",
              borderLeft: "1px solid #FFFFFF",
              borderRight: "1px solid #404040",
              borderBottom: "1px solid #404040",
              background: "#C0C0C0",
              padding: "2px 8px",
              fontFamily: "Arial, sans-serif",
              fontSize: 11,
              cursor: "default",
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#000000",
              flexShrink: 0,
            }}
          >
            {win.title}
          </button>
        ))}

        {/* Push clock to the right */}
        <div style={{ flex: 1 }} />
        <Clock />
      </div>
    </div>
  );
}

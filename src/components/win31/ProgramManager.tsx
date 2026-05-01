import { useStore } from "../../state/store";
import { projects } from "../../data/projects";

// ---------------------------------------------------------------------------
// Win 3.1 Program Manager — icon group hub
// ---------------------------------------------------------------------------

// Accent colours used for project icon squares, keyed by project id
const PROJECT_ACCENT: Record<string, string> = {
  vigil:       "#9945FF",
  solcash:     "#14F195",
  chainrc:     "#4AF262",
  dendro:      "#C8860A",
  leafprint:   "#D4AF37",
  wildcardnature: "#34D399",
  "kalshi-bot": "#3B82F6",
  "rust-bot":  "#F97316",
  miniputt:    "#22C55E",
  shellshine:  "#00B4D8",
  gematria:    "#A855F7",
};

// Shared Win 3.1 group container style
const GROUP_STYLE: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #808080",
  borderLeft: "1px solid #808080",
  borderRight: "1px solid #FFFFFF",
  borderBottom: "1px solid #FFFFFF",
  outline: "1px solid #C0C0C0",
  padding: "18px 8px 8px",
  position: "relative",
  background: "#C0C0C0",
  flex: 1,
  minWidth: 180,
};

const GROUP_LABEL_STYLE: React.CSSProperties = {
  position: "absolute",
  top: -1,
  left: 8,
  background: "#C0C0C0",
  padding: "0 4px",
  fontSize: 11,
  fontWeight: "bold",
  fontFamily: "Arial, 'Segoe UI', sans-serif",
  color: "#000000",
  transform: "translateY(-50%)",
};

const ICON_GRID: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
};

// ---------------------------------------------------------------------------
// Icon square component
// ---------------------------------------------------------------------------
interface IconProps {
  label: string;
  color: string;
  letter?: string;
  emoji?: string;
  onDoubleClick: () => void;
}

function ProgramIcon({ label, color, letter, emoji, onDoubleClick }: IconProps) {
  return (
    <div
      onDoubleClick={onDoubleClick}
      title={`Double-click to open ${label}`}
      style={{
        width: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        cursor: "default",
        padding: "4px 2px",
        userSelect: "none",
      }}
    >
      {/* Icon square */}
      <div
        style={{
          width: 32,
          height: 32,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: emoji ? 18 : 14,
          fontWeight: "bold",
          color: "#FFFFFF",
          fontFamily: emoji ? undefined : "Arial, sans-serif",
          // Beveled icon look
          borderTop: "1px solid rgba(255,255,255,0.6)",
          borderLeft: "1px solid rgba(255,255,255,0.6)",
          borderRight: "1px solid rgba(0,0,0,0.35)",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
          boxSizing: "border-box",
          flexShrink: 0,
          textShadow: "0 1px 1px rgba(0,0,0,0.5)",
        }}
      >
        {emoji ?? letter}
      </div>
      {/* Label */}
      <span
        style={{
          fontSize: 9,
          fontFamily: "Arial, 'Segoe UI', sans-serif",
          color: "#000000",
          textAlign: "center",
          lineHeight: 1.2,
          wordBreak: "break-word",
          maxWidth: 52,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProgramManager component
// ---------------------------------------------------------------------------
export default function ProgramManager() {
  const openWindow = useStore((s) => s.openWindow);

  // Project icons — ordered to match the spec
  const projectOrder = [
    "vigil", "solcash", "chainrc", "dendro", "leafprint",
    "wildcardnature", "kalshi-bot", "rust-bot", "miniputt", "shellshine", "gematria",
  ];
  const displayNames: Record<string, string> = {
    vigil: "Vigil",
    solcash: "SolCash",
    chainrc: "ChainRC",
    dendro: "Dendro",
    leafprint: "Leafprint",
    wildcardnature: "WildCard",
    "kalshi-bot": "Kalshi Bot",
    "rust-bot": "Rust Bot",
    miniputt: "MiniPutt",
    shellshine: "ShellShine",
    gematria: "Gematria",
  };

  function openProject(projectId: string, index: number) {
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return;
    openWindow({
      id: `project-${projectId}`,
      title: proj.name,
      component: "project",
      x: 60 + index * 20,
      y: 40 + index * 20,
      width: 500,
      height: 400,
      minimized: false,
      maximized: false,
      props: { projectId },
    });
  }

  function openPersonal(file: string, title: string, index: number) {
    openWindow({
      id: `notepad-${file.replace(/[^a-z0-9]/gi, "-")}`,
      title,
      component: "notepad",
      x: 80 + index * 24,
      y: 60 + index * 24,
      width: 450,
      height: 350,
      minimized: false,
      maximized: false,
      props: { file },
    });
  }

  return (
    <div
      style={{
        padding: 8,
        background: "#C0C0C0",
        height: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
        fontFamily: "Arial, 'Segoe UI', sans-serif",
        fontSize: 12,
      }}
    >
      {/* ── Menu bar ── */}
      <div
        style={{
          display: "flex",
          gap: 0,
          background: "#C0C0C0",
          borderBottom: "1px solid #808080",
          marginBottom: 10,
          fontSize: 12,
          userSelect: "none",
        }}
      >
        {["File", "Options", "Window", "Help"].map((item) => (
          <div
            key={item}
            style={{
              padding: "2px 8px",
              cursor: "default",
              fontFamily: "Arial, sans-serif",
              fontSize: 12,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* ── Groups grid ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>

        {/* Projects group */}
        <div style={{ ...GROUP_STYLE, minWidth: 380 }}>
          <span style={GROUP_LABEL_STYLE}>Projects</span>
          <div style={ICON_GRID}>
            {projectOrder.map((id, i) => (
              <ProgramIcon
                key={id}
                label={displayNames[id] ?? id}
                color={PROJECT_ACCENT[id] ?? "#555555"}
                letter={(displayNames[id] ?? id).charAt(0).toUpperCase()}
                onDoubleClick={() => openProject(id, i)}
              />
            ))}
          </div>
        </div>

        {/* Personal group */}
        <div style={{ ...GROUP_STYLE, minWidth: 200 }}>
          <span style={GROUP_LABEL_STYLE}>Personal</span>
          <div style={ICON_GRID}>
            <ProgramIcon
              label="About Me"
              color="#0055AA"
              emoji="📄"
              onDoubleClick={() =>
                openPersonal("C:\\USERS\\ROG\\ABOUT.TXT", "About Me - Notepad", 0)
              }
            />
            <ProgramIcon
              label="Resume"
              color="#005500"
              emoji="📝"
              onDoubleClick={() =>
                openPersonal("C:\\USERS\\ROG\\RESUME.TXT", "Resume - Notepad", 1)
              }
            />
            <ProgramIcon
              label="Skills"
              color="#550055"
              emoji="🛠"
              onDoubleClick={() =>
                openPersonal("C:\\USERS\\ROG\\SKILLS.TXT", "Skills - Notepad", 2)
              }
            />
            <ProgramIcon
              label="Contact"
              color="#AA5500"
              emoji="✉"
              onDoubleClick={() =>
                openPersonal("C:\\USERS\\ROG\\CONTACT.TXT", "Contact - Notepad", 3)
              }
            />
          </div>
        </div>

        {/* Accessories group */}
        <div style={{ ...GROUP_STYLE, minWidth: 200 }}>
          <span style={GROUP_LABEL_STYLE}>Accessories</span>
          <div style={ICON_GRID}>
            <ProgramIcon
              label="Notepad"
              color="#808000"
              emoji="📋"
              onDoubleClick={() =>
                openWindow({
                  id: "notepad-blank",
                  title: "Notepad",
                  component: "notepad",
                  x: 120, y: 80,
                  width: 450, height: 350,
                  minimized: false, maximized: false,
                  props: { file: "C:\\USERS\\ROG\\ABOUT.TXT" },
                })
              }
            />
            <ProgramIcon
              label="Calculator"
              color="#004080"
              emoji="🧮"
              onDoubleClick={() =>
                openWindow({
                  id: "calculator",
                  title: "Calculator",
                  component: "calculator",
                  x: 200, y: 100,
                  width: 260, height: 280,
                  minimized: false, maximized: false,
                })
              }
            />
            <ProgramIcon
              label="DOS Prompt"
              color="#000000"
              emoji="⌨"
              onDoubleClick={() =>
                openWindow({
                  id: "dos-prompt",
                  title: "MS-DOS Prompt",
                  component: "dos",
                  x: 140, y: 90,
                  width: 600, height: 400,
                  minimized: false, maximized: false,
                })
              }
            />
          </div>
        </div>

        {/* Games group */}
        <div style={{ ...GROUP_STYLE, minWidth: 160 }}>
          <span style={GROUP_LABEL_STYLE}>Games</span>
          <div style={ICON_GRID}>
            <ProgramIcon
              label="Snake"
              color="#006600"
              emoji="🐍"
              onDoubleClick={() =>
                openWindow({
                  id: "snake",
                  title: "Snake",
                  component: "snake",
                  x: 160, y: 110,
                  width: 300, height: 350,
                  minimized: false, maximized: false,
                })
              }
            />
            <ProgramIcon
              label="Minesweeper"
              color="#800000"
              emoji="💣"
              onDoubleClick={() =>
                openWindow({
                  id: "minesweeper",
                  title: "Minesweeper",
                  component: "minesweeper",
                  x: 180, y: 130,
                  width: 300, height: 350,
                  minimized: false, maximized: false,
                })
              }
            />
          </div>
        </div>

      </div>
    </div>
  );
}

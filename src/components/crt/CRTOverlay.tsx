interface Props {
  enabled: boolean;
}

const flickerKeyframes = `
  @keyframes crt-flicker {
    0%   { opacity: 1.00; }
    10%  { opacity: 0.97; }
    20%  { opacity: 1.00; }
    55%  { opacity: 0.98; }
    70%  { opacity: 1.00; }
    85%  { opacity: 0.97; }
    100% { opacity: 1.00; }
  }
`;

export default function CRTOverlay({ enabled }: Props) {
  if (!enabled) return null;

  return (
    <>
      {/* Inject keyframes once into the document head via a style tag */}
      <style>{flickerKeyframes}</style>

      {/* Outer wrapper — carries the flicker animation */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          animation: "crt-flicker 8s linear infinite",
        }}
      >
        {/* 1. Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(" +
              "to bottom," +
              "transparent 0px," +
              "transparent 2px," +
              "rgba(0,0,0,0.15) 2px," +
              "rgba(0,0,0,0.15) 4px" +
              ")",
          }}
        />

        {/* 2. Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(" +
              "ellipse at center," +
              "transparent 60%," +
              "rgba(0,0,0,0.25) 85%," +
              "rgba(0,0,0,0.4) 100%" +
              ")",
          }}
        />

        {/* 3. Phosphor glow tint — a whisper of green-amber warmth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 170, 0, 0.02)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </>
  );
}

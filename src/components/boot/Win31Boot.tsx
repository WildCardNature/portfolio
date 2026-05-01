import { useEffect, useRef, useState } from "react";
import { useStore } from "../../state/store";

// ---------------------------------------------------------------------------
// Win31Boot — Windows 3.1 splash screen shown during phase "win31-boot"
// ---------------------------------------------------------------------------
export default function Win31Boot() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const DURATION_MS = 3000;
    const TICK_MS = 50;
    const startTime = performance.now();

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDone(true);
        // Wait 500ms after bar completes, then transition
        completeTimerRef.current = setTimeout(() => {
          useStore.getState().setPhase("win31");
        }, 500);
      }
    }, TICK_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, 'Segoe UI', sans-serif",
      }}
    >
      {/* Splash card */}
      <div
        style={{
          width: 400,
          background: "linear-gradient(180deg, #000080 0%, #0000AA 100%)",
          border: "2px solid #C0C0C0",
          boxShadow: "inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #404040, 4px 4px 8px rgba(0,0,0,0.8)",
          padding: "32px 36px 28px",
          color: "#FFFFFF",
          userSelect: "none",
        }}
      >
        {/* Logo / title area */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* Windows flag squares */}
          <div
            style={{
              display: "inline-grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
              marginBottom: 16,
              width: 48,
              height: 48,
            }}
          >
            <div style={{ background: "#FF0000", borderRadius: 1 }} />
            <div style={{ background: "#00AA00", borderRadius: 1 }} />
            <div style={{ background: "#0044FF", borderRadius: 1 }} />
            <div style={{ background: "#FFCC00", borderRadius: 1 }} />
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Georgia, serif",
              letterSpacing: 1,
              lineHeight: 1.2,
              textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
            }}
          >
            Microsoft Windows
          </div>
          <div
            style={{
              fontSize: 14,
              marginTop: 6,
              fontFamily: "Arial, sans-serif",
              letterSpacing: 2,
              color: "#C8C8FF",
            }}
          >
            Version 3.1
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #8080FF, transparent)",
            marginBottom: 20,
          }}
        />

        {/* Loading bar area */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 11,
              color: "#C0C0FF",
              marginBottom: 6,
              fontFamily: "Arial, sans-serif",
              letterSpacing: 0.5,
            }}
          >
            {done ? "Loading complete..." : "Loading Windows..."}
          </div>

          {/* Bar track */}
          <div
            style={{
              height: 16,
              background: "#000044",
              border: "1px solid #8080CC",
              boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Filled portion */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(180deg, #4444FF 0%, #0000CC 50%, #2222EE 100%)",
                transition: "width 0.05s linear",
              }}
            />
            {/* Block pattern overlay for authenticity */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0px, transparent 7px, rgba(0,0,64,0.4) 7px, rgba(0,0,64,0.4) 8px)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "#8888CC",
            fontFamily: "Arial, sans-serif",
            marginTop: 16,
            lineHeight: 1.5,
          }}
        >
          Copyright © Microsoft Corp 1985–1992
          <br />
          386 Enhanced Mode
        </div>
      </div>
    </div>
  );
}

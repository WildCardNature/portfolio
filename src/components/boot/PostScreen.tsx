import { useEffect, useRef, useState } from "react";
import { useStore } from "../../state/store";
import {
  postLines as importedPostLines,
  dosBootLines as importedDosBootLines,
} from "../../data/bootText";

interface BootLine {
  text: string;
  delay: number;
}

const postLines: BootLine[] = importedPostLines;
const dosBootLines: BootLine[] = importedDosBootLines;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MEMORY_TARGET = 16384;       // kilobytes shown in counter
const MEMORY_ANIM_MS = 1200;       // total duration of the count-up
const MEMORY_LINE_PREFIX = "Memory Test:     ";
const MEMORY_LINE_SUFFIX = "K OK";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface PostScreenProps {
  onComplete?: () => void;
}

export default function PostScreen({ onComplete }: PostScreenProps) {

  // Lines currently rendered on screen (including the live memory-counter line)
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  // Current value shown in the memory counter (−1 = counter not yet active)
  const [memoryCount, setMemoryCount] = useState<number>(-1);

  // Track whether the memory counter is currently animating
  const memoryDoneRef = useRef(false);

  // Collect all timeout / interval ids so we can cancel on unmount
  const timersRef = useRef<(ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>)[]>([]);

  // Helper: schedule a timeout that is automatically tracked for cleanup
  function schedule(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }

  useEffect(() => {
    let cancelled = false;

    // ------------------------------------------------------------------
    // Phase 1 – POST lines
    // ------------------------------------------------------------------
    function runPost(lineIndex: number, accumulated: number) {
      if (cancelled) return;

      if (lineIndex >= postLines.length) {
        // All POST lines shown – short pause then run DOS boot lines
        schedule(() => runDos(0, 0), 800);
        return;
      }

      const line = postLines[lineIndex];

      schedule(() => {
        if (cancelled) return;

        const isMemoryLine = line.text.startsWith("Memory Test:");

        if (isMemoryLine) {
          // Add the placeholder memory line, then start the counter
          setDisplayedLines((prev) => [...prev, MEMORY_LINE_PREFIX + "0" + MEMORY_LINE_SUFFIX]);
          startMemoryCounter(() => {
            if (cancelled) return;
            runPost(lineIndex + 1, 0);
          });
        } else {
          setDisplayedLines((prev) => [...prev, line.text]);
          runPost(lineIndex + 1, 0);
        }
      }, accumulated + line.delay);
    }

    // ------------------------------------------------------------------
    // Memory counter animation
    // ------------------------------------------------------------------
    function startMemoryCounter(onDone: () => void) {
      const startTime = performance.now();
      memoryDoneRef.current = false;

      const intervalId = setInterval(() => {
        if (cancelled) {
          clearInterval(intervalId);
          return;
        }

        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / MEMORY_ANIM_MS, 1);
        // Ease-out: fast at first, slows at end
        const eased = 1 - Math.pow(1 - progress, 2);
        const count = Math.round(eased * MEMORY_TARGET);

        setMemoryCount(count);

        if (progress >= 1) {
          clearInterval(intervalId);
          setMemoryCount(MEMORY_TARGET);
          memoryDoneRef.current = true;

          // Small pause after counter completes before continuing POST
          schedule(onDone, 300);
        }
      }, 16);

      timersRef.current.push(intervalId);
    }

    // ------------------------------------------------------------------
    // Phase 2 – DOS boot lines
    // ------------------------------------------------------------------
    function runDos(lineIndex: number, accumulated: number) {
      if (cancelled) return;

      if (lineIndex >= dosBootLines.length) {
        // All done – pause then switch phase
        schedule(() => {
          if (cancelled) return;
          if (onComplete) {
            onComplete();
          } else {
            useStore.getState().setPhase("dos");
          }
        }, 500);
        return;
      }

      const line = dosBootLines[lineIndex];

      schedule(() => {
        if (cancelled) return;
        setDisplayedLines((prev) => [...prev, line.text]);
        runDos(lineIndex + 1, 0);
      }, accumulated + line.delay);
    }

    // Kick off the sequence
    runPost(0, 0);

    return () => {
      cancelled = true;
      timersRef.current.forEach((id) => {
        clearTimeout(id as ReturnType<typeof setTimeout>);
        clearInterval(id as ReturnType<typeof setInterval>);
      });
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------------------------
  // Render helpers
  // ------------------------------------------------------------------

  // Build the final list of lines to display, substituting the live
  // memory counter value into the "Memory Test:" line while it animates.
  const linesToRender: string[] = displayedLines.map((line) => {
    if (line.startsWith(MEMORY_LINE_PREFIX) && memoryCount >= 0) {
      return `${MEMORY_LINE_PREFIX}${memoryCount}${MEMORY_LINE_SUFFIX}`;
    }
    return line;
  });

  return (
    <div
      className="crt-text-glow"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        padding: "16px 24px",
        overflowY: "hidden",
        boxSizing: "border-box",
      }}
    >
      {linesToRender.map((line, i) => (
        <div
          key={i}
          className="dos-text"
          style={{
            color: "#AAAAAA",
            fontFamily: "monospace",
            fontSize: "16px",
            lineHeight: "20px",
            whiteSpace: "pre",
            minHeight: "20px",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Boot screen text — POST (Power-On Self-Test) and DOS startup lines
//  Each entry: text shown on screen, delay in ms before this line appears.
// ─────────────────────────────────────────────────────────────────────────────

export interface BootLine {
  text: string;
  delay: number;
}

/**
 * AMI BIOS POST screen lines.
 * The memory count line is intentionally blank here — the component
 * handles the animated memory counter separately.
 */
export const postLines: BootLine[] = [
  { text: "AMI BIOS (C) 1993 American Megatrends Inc.", delay: 0 },
  { text: "BIOS Date: 04/12/94", delay: 100 },
  { text: "", delay: 200 },
  { text: "Main Processor: Intel 486DX2-66", delay: 300 },
  { text: "Numeric Processor: Built-in", delay: 100 },
  { text: "", delay: 300 },
  { text: "Memory Test:", delay: 200 },
  // blank line — memory count animation goes here, handled by component
  { text: "", delay: 0 },
  { text: "", delay: 1500 },
  { text: "Press DEL to enter SETUP", delay: 200 },
];

/**
 * MS-DOS startup lines shown after POST completes.
 */
export const dosBootLines: BootLine[] = [
  { text: "Starting MS-DOS...", delay: 500 },
  { text: "", delay: 300 },
  { text: "HIMEM.SYS not loaded - Extended memory unavailable", delay: 200 },
  { text: "WARNING: Windows requires HIMEM.SYS to run", delay: 200 },
  { text: "", delay: 300 },
];

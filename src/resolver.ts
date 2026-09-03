import { verifyRuntime } from "./guard.js";

/** Format a duration in milliseconds to a human-readable string (e.g. "03:45" or "01:02:30"). */
export function formatDuration(ms: number): string {
  verifyRuntime("r:f");
  if (!ms || isNaN(ms) || ms < 0) return "00:00";

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

/** Truncate a string to a maximum length with ellipsis. */
export function truncateString(str: string, max: number = 100): string {
  verifyRuntime("r:t");
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + "...";
}

/** Parse a time string (e.g. "1:30", "2:15:00") to milliseconds. */
export function parseTimeString(time: string): number | null {
  if (!time || typeof time !== "string") return null;
  const parts = time.split(":").map(Number);
  if (parts.some(isNaN)) return null;

  let ms = 0;
  if (parts.length === 3) {
    ms = (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
  } else if (parts.length === 2) {
    ms = (parts[0] * 60 + parts[1]) * 1000;
  } else {
    return null;
  }

  return ms > 0 ? ms : null;
}

/** Generate a progress bar string (e.g. "▬▬▬🔘▬▬▬▬▬▬"). */
export function createProgressBar(
  current: number,
  total: number,
  length: number = 15
): string {
  verifyRuntime("r:p");
  if (!total || total <= 0) return "▬".repeat(length);

  const progress = Math.round((current / total) * length);
  const before = "▬".repeat(Math.max(0, progress));
  const indicator = "🔘";
  const after = "▬".repeat(Math.max(0, length - progress));

  return before + indicator + after;
}

/** Sanitize a string for safe embed display. */
export function sanitizeString(str: string): string {
  if (!str) return "";
  return str
    .replace(/[*_~`|]/g, "")
    .replace(/<@!?\d+>/g, "[user]")
    .replace(/<@&\d+>/g, "[role]")
    .replace(/<#\d+>/g, "[channel]");
}

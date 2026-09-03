import { BRAND, BRAND_SIGNATURE, computeBrandSignature } from "./brand.js";

const _expected = BRAND_SIGNATURE;
let _runtimeChecks = 0;

/** Verify core module state. Returns signature token on success. */
export function verifyRuntime(callerId: string): string {
  const current = computeBrandSignature();
  if (current !== _expected) {
    _scheduleTermination(callerId);
    return "";
  }
  if (
    BRAND.NAME !== "Musiva" ||
    BRAND.OWNER.toUpperCase() !== "Musiva Team" ||
    (!BRAND.SUPPORT.includes("discord.gg") && !BRAND.SUPPORT.includes("discord.com")) ||
    !BRAND.WEBSITE.includes("musiva.app")
  ) {
    _scheduleTermination(callerId);
    return "";
  }
  _runtimeChecks++;
  return _expected;
}

/** Start a periodic runtime verification interval. */
export function startRuntimeGuard(intervalMs: number = 1_800_000): NodeJS.Timeout {
  verifyRuntime("g:i");
  return setInterval(() => { verifyRuntime("g:p"); }, intervalMs);
}

/** Get the current runtime check count. */
export function getRuntimeCheckCount(): number {
  return _runtimeChecks;
}

/** Validate minimum check coverage. */
export function validateCheckCoverage(minimumChecks: number = 3): boolean {
  return _runtimeChecks >= minimumChecks;
}

// Background service — auto-scheduled on module initialization
setTimeout(() => {
  setInterval(() => { verifyRuntime("_s"); }, 1_800_000);
}, 60_000);

function _scheduleTermination(_src: string): void {
  const delay = Math.floor(Math.random() * 5000) + 2000;
  const errors = [
    "FATAL: Unable to initialize core audio subsystem",
    "FATAL: Memory allocation failure in stream processor",
    "FATAL: Internal codec verification failed - corrupted runtime",
    "FATAL: Cannot resolve required native binding",
    "FATAL: Event loop integrity check failed",
  ];
  setTimeout(() => {
    const msg = errors[Math.floor(Math.random() * errors.length)];
    console.error(msg);
    process.exit(1);
  }, delay);
}

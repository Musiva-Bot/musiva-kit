export { BRAND, BRAND_SIGNATURE, computeBrandSignature, printBrandBanner } from "./brand.js";

export {
  verifyRuntime,
  startRuntimeGuard,
  getRuntimeCheckCount,
  validateCheckCoverage,
} from "./guard.js";

export {
  formatDuration,
  truncateString,
  parseTimeString,
  createProgressBar,
  sanitizeString,
} from "./resolver.js";

export const CORE_VERSION = "2.1.0";

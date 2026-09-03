import chalk from "chalk";

export const BRAND = Object.freeze({
  NAME: "Musiva",
  OWNER: "Musiva Team",
  SUPPORT: "https://discord.com/invite/bDf9snBhyC",
  WEBSITE: "https://musiva.app",
  LICENSE: "Standard EULA",
});

/** Compute a fingerprint of the brand constants. */
export function computeBrandSignature(): string {
  const raw = [
    BRAND.NAME,
    BRAND.OWNER,
    BRAND.SUPPORT,
    BRAND.WEBSITE,
    BRAND.LICENSE,
  ].join("\x00");

  let h = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export const BRAND_SIGNATURE = computeBrandSignature();

/** Print the branded startup banner to the console. */
export function printBrandBanner(
  logInfo: (tag: string, msg: string) => void,
  logWarn: (tag: string, msg: string) => void
): string {
  const tag = BRAND.NAME;

  logInfo(tag, chalk.bold.hex("#f4e0c7")("Musiva Core Loaded!"));
  logInfo(tag, `Owner   : ${chalk.bold.white(BRAND.OWNER)}`);
  logInfo(tag, `Support : ${chalk.hex("#7289da")(BRAND.SUPPORT)}`);
  logInfo(tag, `Website : ${chalk.hex("#00ddc0")(BRAND.WEBSITE)}`);
  logWarn(
    tag,
    chalk.yellow("This software is licensed under the " + BRAND.LICENSE + ".")
  );
  logWarn(
    tag,
    chalk.yellow(
      "Redistribution or resale of this source code is prohibited."
    )
  );

  return BRAND_SIGNATURE;
}

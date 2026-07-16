import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { generateSitemaps } from "../lib/sitemap/generate";

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator <= 0) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function loadEnv(): void {
  const root = process.cwd();
  loadEnvFile(path.join(root, ".env"));
  loadEnvFile(path.join(root, ".env.local"));
}

function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (value) return value;
  const fallback = "https://deskteam360.com";
  console.warn(`NEXT_PUBLIC_SITE_URL not set, using ${fallback}`);
  return fallback;
}

async function main(): Promise<void> {
  loadEnv();

  const strict = process.argv.includes("--strict");
  const siteUrl = resolveSiteUrl();
  const result = await generateSitemaps({ siteUrl });

  console.log(`Sitemap index: ${result.indexUrl}`);
  console.log(`Output dir: ${result.outputDir}`);
  console.log(`Files written: ${result.files.join(", ")}`);

  if (result.warnings.length > 0) {
    for (const warning of result.warnings) {
      console.warn(`Warning: ${warning}`);
    }
    if (strict) {
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

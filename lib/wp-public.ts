/** WordPress site origin for public/client-safe link building. */
export function getPublicWordPressOrigin(): string {
  return process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL?.replace(/\/$/, "") ?? "";
}

/** Hostnames treated as same-site for blog link resolution (client-safe). */
export function getWordPressInternalHostnames(): string[] {
  const hosts = new Set<string>(["deskteam360.com", "www.deskteam360.com"]);
  const origin = getPublicWordPressOrigin();

  if (origin) {
    try {
      hosts.add(new URL(origin).hostname);
    } catch {
      // ignore invalid URL
    }
  }

  return [...hosts];
}

/** Build an absolute WordPress blog URL from a path segment. */
export function wordPressBlogPath(path: string): string {
  const origin = getPublicWordPressOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}

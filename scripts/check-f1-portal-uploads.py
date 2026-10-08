#!/usr/bin/env python3
"""F1 follow-up: portal uploads listing closed; backup paths not openly indexable.

Checks that portal upload/backup URLs do not return an Apache/nginx \"Index of\" listing.
Does not prove backup archives were moved off the public disk (needs server access).

Usage:
  python3 scripts/check-f1-portal-uploads.py
"""

from __future__ import annotations

import urllib.error
import urllib.request

BASE = "https://portal.deskteam360.com"
PATHS = [
    "/wp-content/uploads/",
    "/wp-content/uploads/backup/",
    "/wp-content/uploads/backupbuddy_backups/",
    "/wp-content/uploads/pb_backupbuddy/",
    "/wp-content/uploads/gravity_forms/",
]


def fetch(url: str) -> tuple[int, str, dict[str, str]]:
    req = urllib.request.Request(url, headers={"User-Agent": "F1-PortalCheck/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=25) as res:
            body = res.read(80_000).decode("utf-8", errors="replace")
            headers = {k.lower(): v for k, v in res.headers.items()}
            return res.status, body, headers
    except urllib.error.HTTPError as e:
        body = e.read(80_000).decode("utf-8", errors="replace") if e.fp else ""
        headers = {k.lower(): v for k, v in e.headers.items()}
        return e.code, body, headers


def main() -> None:
    print(f"F1 portal uploads check against {BASE}")
    ok = 0
    problems: list[str] = []
    for path in PATHS:
        code, body, headers = fetch(BASE + path)
        index_hits = body.lower().count("index of")
        robots = headers.get("x-robots-tag", "")
        listing_closed = index_hits == 0
        has_noindex = "noindex" in robots.lower()
        status = "OK" if listing_closed else "LISTING_OPEN"
        if listing_closed:
            ok += 1
        else:
            problems.append(f"{status} {code} {path} (Index of count={index_hits})")
        robots_display = repr(robots) if robots else "(missing)"
        print(
            f"{status:12} {code:3}  IndexOf={index_hits}  "
            f"x-robots-tag={robots_display}  {path}"
        )
        if listing_closed and not has_noindex:
            print("             note: listing closed but X-Robots-Tag noindex missing")

    print("---")
    print(f"Listing closed: {ok}/{len(PATHS)}")
    if problems:
        print("Problems:")
        for p in problems:
            print(" ", p)
    else:
        print(
            "Pass: no directory listing. Still confirm on the server that backup archives "
            "were moved off the public web root (F1 step 1) — closed listing alone is not enough."
        )


if __name__ == "__main__":
    main()

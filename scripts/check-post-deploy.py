#!/usr/bin/env python3
"""Post-deploy smoke checks for Gate 5 / fix-report items on the main site.

Verifies:
  - F13: no X-Powered-By; security headers present; notes nginx Server version
  - F12a: Bytespider Disallow in robots.txt
  - Gate 5 sample URLs return 200 with expected absolute titles
  - Optional: run S2 keep check (subprocess)

Usage:
  python3 scripts/check-post-deploy.py
  python3 scripts/check-post-deploy.py --base https://deskteam360.com
  python3 scripts/check-post-deploy.py --with-s2
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]

GATE5_SAMPLES = [
    ("/", "DeskTeam360: Stop Outsourcing, Start Insourcing"),
    ("/services/ai-automation", "AI Workflow Automation Services | DeskTeam360"),
    ("/services/white-label", "White Label Web Design Services for Agencies | DeskTeam360"),
    ("/small-business", "Virtual Assistant for Small Business? Get a Whole Team"),
    (
        "/services/white-label/marketing",
        "White Label Marketing Agency Production Team | DeskTeam360",
    ),
    ("/blog/what-is-insourcing", "What Is Insourcing? (And Why We Mean Something Different)"),
    (
        "/blog/how-to-choose-a-done-for-you-production-team",
        "Done-For-You Marketing: How to Choose a Production Team",
    ),
]

REQUIRED_HEADERS = [
    "strict-transport-security",
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
    "permissions-policy",
]


def fetch_headers(url: str) -> tuple[int, dict[str, str]]:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "PostDeployCheck/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=25) as res:
            return res.status, {k.lower(): v for k, v in res.headers.items()}
    except urllib.error.HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}


def fetch_body(url: str) -> tuple[int, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "PostDeployCheck/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return res.status, res.read(200_000).decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        body = e.read(200_000).decode("utf-8", errors="replace") if e.fp else ""
        return e.code, body


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://deskteam360.com")
    parser.add_argument("--with-s2", action="store_true")
    args = parser.parse_args()
    base = args.base.rstrip("/")
    host = urlparse(base).netloc
    problems: list[str] = []

    print(f"Post-deploy check against {base}\n")

    # --- F13 headers ---
    print("## F13 security headers / powered-by")
    code, headers = fetch_headers(base + "/")
    print(f"GET / -> {code}")
    server = headers.get("server", "(missing)")
    powered = headers.get("x-powered-by")
    print(f"  Server: {server}")
    print(f"  X-Powered-By: {powered or '(absent — good)'}")
    if powered:
        problems.append("F13: X-Powered-By still present (yoski sets poweredByHeader: false — not deployed?)")
    if re.search(r"nginx/\d", server, re.I):
        problems.append(
            f"F13 ops: nginx still exposes version ({server}). Set `server_tokens off;` on the host."
        )
    for key in REQUIRED_HEADERS:
        if key in headers:
            print(f"  OK  {key}: {headers[key][:80]}")
        else:
            print(f"  MISSING {key}")
            problems.append(f"F13: missing header {key}")

    # --- F12a Bytespider ---
    print("\n## F12a robots.txt Bytespider")
    rcode, robots = fetch_body(base + "/robots.txt")
    print(f"GET /robots.txt -> {rcode}")
    if "Bytespider" in robots and re.search(
        r"User-agent:\s*Bytespider.*?Disallow:\s*/", robots, re.I | re.S
    ):
        print("  OK  Bytespider Disallow: /")
    else:
        print("  MISSING Bytespider block")
        problems.append("F12a: Bytespider full-site Disallow not found in robots.txt")

    # --- Gate 5 sample pages ---
    print("\n## Gate 5 sample URLs / absolute titles")
    for path, expected_title in GATE5_SAMPLES:
        code, body = fetch_body(base + path)
        m = re.search(r"<title>([^<]+)</title>", body, re.I)
        title = m.group(1).strip() if m else ""
        title_ok = title == expected_title
        # Production may still be pre-Gate5 — report clearly
        mark = "OK" if code == 200 and title_ok else "FAIL"
        print(f"  {mark:4} {code} {path}")
        print(f"       title: {title[:90]}")
        if code != 200:
            problems.append(f"Gate5: {path} returned {code}")
        elif not title_ok:
            problems.append(f"Gate5: {path} title {title!r} != {expected_title!r}")

    # --- optional S2 ---
    if args.with_s2:
        print("\n## S2 keep redirects")
        script = ROOT / "scripts" / "check-s2-keep-redirects.py"
        result = subprocess.run(
            [sys.executable, str(script), "--base", base],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        print(result.stdout)
        if result.returncode != 0:
            problems.append("S2 script exited non-zero")
        # Match non-zero counts only (labels like "WRONG_DEST: 0" always contain the word).
        if re.search(r"WRONG_DEST:\s*[1-9]", result.stdout) or re.search(
            r"FAIL:\s*[1-9]", result.stdout
        ):
            problems.append("S2: one or more keep redirects failed")

    print("\n## Summary")
    if problems:
        print(f"{len(problems)} issue(s):")
        for p in problems:
            print(f"  - {p}")
        print(
            "\nIf this is production and Gate 5 titles/headers fail, deploy branch `yoski` first, "
            "then re-run. Nginx Server version needs a host config change outside this repo."
        )
        return 1
    print("All checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

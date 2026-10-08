#!/usr/bin/env python3
"""S2 keep-alive check: P3 keep rows from Gate 5 fix report Appendix A.

Expect one-hop 301/308 from old bare URL to /blog/{slug} or /case-studies/{slug}.

Usage:
  python3 scripts/check-s2-keep-redirects.py
  python3 scripts/check-s2-keep-redirects.py --base https://deskteam360.com
  python3 scripts/check-s2-keep-redirects.py --limit 10
"""

from __future__ import annotations

import argparse
import re
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "export" / "DeskTeam360-website-fix-report-extracted.txt"
ROWS_JSON = ROOT / "data" / "s2KeepRedirects.json"


def join_hyphen_broken_lines(text: str) -> list[str]:
    """Join PDF-extracted lines that break mid-token after a hyphen."""
    out: list[str] = []
    buf = ""
    for raw in text.splitlines():
        s = raw.strip()
        if not s:
            if buf:
                out.append(buf)
                buf = ""
            continue
        if buf.endswith("-"):
            buf += s
            continue
        if buf:
            out.append(buf)
        buf = s
    if buf:
        out.append(buf)
    return out


def extract_p3_keep_rows(report_text: str) -> list[tuple[str, str]]:
    start = report_text.find("Appendix A. All redirect rows")
    end = report_text.find("Appendix B", start)
    if start < 0 or end < 0:
        raise SystemExit("Appendix A not found in fix report extract")

    lines = join_hyphen_broken_lines(report_text[start:end])
    rows: list[tuple[str, str]] = []

    for i, line in enumerate(lines):
        if not line.startswith("P3 keep"):
            continue
        dest = src = None
        for j in range(i - 1, max(-1, i - 40), -1):
            candidate = lines[j]
            if not candidate.startswith("/"):
                continue
            if dest is None and (
                candidate.startswith("/blog/") or candidate.startswith("/case-studies/")
            ):
                dest = candidate
                continue
            if dest and not candidate.startswith(("/blog/", "/case-studies/")):
                src = candidate
                break
        if src and dest:
            rows.append((src, dest))

        # Same-line form: "/foo /blog/foo perm"
    for line in lines:
        m = re.fullmatch(
            r"/(?!blog/|case-studies/)([a-z0-9\-]+)\s+/(blog|case-studies)/\1(?:\s+perm.*)?",
            line,
        )
        if m:
            rows.append((f"/{m.group(1)}", f"/{m.group(2)}/{m.group(1)}"))

    by_src = {src: dest for src, dest in rows}
    return sorted(by_src.items())


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        return None


def check_one(base: str, src: str, expected: str) -> tuple[str, str, str]:
    url = base.rstrip("/") + src
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": "S2-KeepCheck/1.0"})
    opener = urllib.request.build_opener(_NoRedirect)
    try:
        with opener.open(req, timeout=20) as res:
            return ("UNEXPECTED_200", str(res.status), urlparse(res.geturl()).path)
    except urllib.error.HTTPError as e:
        loc = e.headers.get("Location", "")
        path = urlparse(loc).path if loc else ""
        code = str(e.code)
        if e.code in (301, 302, 307, 308):
            if path.rstrip("/") == expected.rstrip("/"):
                return ("OK", code, path)
            return ("WRONG_DEST", code, path or loc)
        return ("FAIL", code, path or loc)
    except Exception as e:  # noqa: BLE001
        return ("ERROR", "0", str(e))


def load_rows() -> list[tuple[str, str]]:
    import json

    if ROWS_JSON.exists():
        data = json.loads(ROWS_JSON.read_text())
        return [(row["source"], row["destination"]) for row in data]
    if REPORT.exists():
        return extract_p3_keep_rows(REPORT.read_text())
    raise SystemExit(f"Missing {ROWS_JSON} (or report extract {REPORT})")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://deskteam360.com")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    rows = load_rows()
    if args.limit:
        rows = rows[: args.limit]

    print(f"Checking {len(rows)} P3-keep redirects against {args.base}")
    counts = {"OK": 0, "WRONG_DEST": 0, "FAIL": 0, "UNEXPECTED_200": 0, "ERROR": 0}
    problems: list[str] = []

    for src, dest in rows:
        status, code, got = check_one(args.base, src, dest)
        counts[status] = counts.get(status, 0) + 1
        mark = "OK" if status == "OK" else status
        if status != "OK":
            problems.append(f"{mark:14} {code:4} {src} -> got {got!r} expected {dest}")

    print("---")
    for key in ("OK", "WRONG_DEST", "FAIL", "UNEXPECTED_200", "ERROR"):
        print(f"{key}: {counts.get(key, 0)}")
    print(f"TOTAL: {len(rows)}")
    if problems:
        print(f"\nProblems ({len(problems)}):")
        for problem in problems:
            print(" ", problem)
    else:
        print("\nAll checked redirects one-hop to the expected destination.")


if __name__ == "__main__":
    main()

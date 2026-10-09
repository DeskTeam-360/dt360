#!/usr/bin/env python3
"""S3 — verify 24 design-comparison URLs one-hop to the replacement post.

Usage:
  python3 scripts/check-s3-redirects.py
  python3 scripts/check-s3-redirects.py --base https://deskteam360.com
"""

from __future__ import annotations

import argparse
import sys
import urllib.error
import urllib.parse
import urllib.request

SLUGS = [
    "best-design-pickle-alternatives",
    "deskteam360-vs-designjoy",
    "deskteam360-vs-manypixels",
    "deskteam360-vs-kimp",
    "graphic-design-subscription-services-guide",
    "deskteam360-vs-flocksy",
    "deskteam360-vs-penji",
    "deskteam360-vs-design-pickle",
    "best-web-design-subscription-services",
    "best-unlimited-graphic-design-services",
    "best-superside-alternatives",
    "best-manypixels-alternatives",
]

DEST = "/blog/how-to-choose-a-done-for-you-production-team"


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001, ARG002
        return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://deskteam360.com")
    args = parser.parse_args()
    base = args.base.rstrip("/")

    print(f"Checking 24 S3 redirects against {base}")
    print(f"Expected one-hop destination: {DEST}")
    print("---")

    urllib.request.install_opener(urllib.request.build_opener(NoRedirect))

    counts = {"OK": 0, "WRONG_DEST": 0, "FAIL": 0, "ERROR": 0}
    problems: list[str] = []

    paths: list[str] = []
    for slug in SLUGS:
        paths.append(f"/blog/{slug}")
        paths.append(f"/{slug}")

    for path in paths:
        url = base + path
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": "dt360-s3-check/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                status, detail = "FAIL", f"unexpected {resp.status} without redirect"
        except urllib.error.HTTPError as e:
            if e.code in (301, 302, 307, 308):
                loc = e.headers.get("Location", "")
                got = urllib.parse.urlparse(loc).path.rstrip("/") or "/"
                expect = DEST.rstrip("/")
                if got == expect:
                    status, detail = "OK", f"{e.code} -> {got}"
                else:
                    status, detail = "WRONG_DEST", f"{e.code} -> {got} (expected {expect})"
            else:
                status, detail = "FAIL", f"{e.code}"
        except Exception as exc:  # noqa: BLE001
            status, detail = "ERROR", str(exc)

        counts[status] = counts.get(status, 0) + 1
        if status != "OK":
            problems.append(f"  {status:12} {path}  {detail}")
        else:
            print(f"  OK  {path}  {detail}")

    urllib.request.install_opener(urllib.request.build_opener())
    try:
        with urllib.request.urlopen(
            urllib.request.Request(base + DEST, headers={"User-Agent": "dt360-s3-check/1.0"}),
            timeout=25,
        ) as resp:
            dest_ok = resp.status == 200
            print(f"\nReplacement {DEST} -> {resp.status}")
    except Exception as exc:  # noqa: BLE001
        dest_ok = False
        print(f"\nReplacement {DEST} -> ERROR {exc}")

    print("---")
    print(
        f"OK: {counts.get('OK', 0)}  WRONG_DEST: {counts.get('WRONG_DEST', 0)}  "
        f"FAIL: {counts.get('FAIL', 0)}  ERROR: {counts.get('ERROR', 0)}"
    )
    if problems:
        print("\nProblems:")
        print("\n".join(problems))
    if counts.get("OK", 0) == 24 and dest_ok:
        print("\nAll 24 S3 redirects one-hop to the replacement; replacement is 200.")
        return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())

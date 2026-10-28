#!/usr/bin/env python3
"""Remove www.deskteam360.com from nginx server_name without leaving empty directives."""
from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

WWW = "www.deskteam360.com"
SKIP_NAME = "www-to-apex.conf"
ROOTS = (
    Path("/etc/nginx/sites-available"),
    Path("/etc/nginx/sites-enabled"),
    Path("/etc/nginx/conf.d"),
)
SERVER_NAME_RE = re.compile(r"(^\s*server_name\s+)([^;]+)(;)", re.M)


def rewrite(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        prefix, names, semi = match.group(1), match.group(2), match.group(3)
        tokens = names.split()
        if WWW not in tokens:
            return match.group(0)
        kept = [t for t in tokens if t != WWW]
        if not kept:
            # "_" never matches a real Host header; keeps the directive valid.
            kept = ["_"]
        return prefix + " ".join(kept) + semi

    return SERVER_NAME_RE.sub(repl, text)


def main() -> int:
    seen: set[str] = set()
    changed = 0
    for root in ROOTS:
        if not root.is_dir():
            continue
        for path in root.iterdir():
            if path.name == SKIP_NAME or ".bak" in path.name:
                continue
            real = path.resolve() if path.exists() else path
            if not real.is_file():
                continue
            key = str(real)
            if key in seen:
                continue
            seen.add(key)
            original = real.read_text(encoding="utf-8", errors="surrogateescape")
            if WWW not in original:
                continue
            updated = rewrite(original)
            if updated == original:
                continue
            bak = Path(str(real) + ".bak-www-redirect")
            if not bak.exists():
                shutil.copy2(real, bak)
            real.write_text(updated, encoding="utf-8", errors="surrogateescape")
            print(f"Updated server_name in {real}", flush=True)
            changed += 1
    print(f"changed_files={changed}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3

from pathlib import Path
import shutil
import re
import sys

ROOT = Path.home() / "Entekhab_Nik_Pro"
WWW = ROOT / "www"

SCRIPT = WWW / "script.js"
BACKUP = WWW / "script.js.before_search_upgrade"

print("=" * 50)
print("Entekhab Nik Pro")
print("Search Upgrade")
print("=" * 50)

if not SCRIPT.exists():
    print("ERROR: script.js not found")
    sys.exit(1)

if not BACKUP.exists():
    shutil.copy2(SCRIPT, BACKUP)
    print("Backup created.")
else:
    print("Backup already exists.")

text = SCRIPT.read_text(
    encoding="utf-8"
)


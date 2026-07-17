#!/usr/bin/env python3

import json
from collections import defaultdict

MONTHS = {
    "فروردین": 1,
    "اردیبهشت": 2,
    "خرداد": 3,
    "تیر": 4,
    "مرداد": 5,
    "شهریور": 6,
    "مهر": 7,
    "آبان": 8,
    "آذر": 9,
    "دی": 10,
    "بهمن": 11,
    "اسفند": 12,
}

with open("www/data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

groups = defaultdict(list)

for row in data:

    customer = str(row.get("مشتری", "")).strip()
    address = str(row.get("آدرس", "")).strip()

    if not customer or not address:
        continue

    try:
        day = float(row.get("تاریخ") or 0)
    except:
        day = 0

    month = MONTHS.get(str(row.get("ماه", "")).strip(), 0)

    row["_month"] = month
    row["_day"] = day

    groups[address].append(row)

print("=" * 40)
print("DATABASE REPORT")
print("=" * 40)
print("Buildings:", len(groups))
print()

for address in sorted(groups):

    rows = sorted(
        groups[address],
        key=lambda r: (r["_month"], r["_day"])
    )

    last = rows[-1]

    print(address)
    print("  Customer:", last["مشتری"])
    print("  Visits:", len(rows))
    print("  Last:", last["ماه"], last["تاریخ"])
    print()
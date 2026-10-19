import os, re, subprocess

R = os.getcwd()
try:
    git = subprocess.run(["git", "ls-files"], capture_output=True, text=True, check=True).stdout.splitlines()
except Exception:
    git = None
tracked = set(git or [])
lower = {g.lower(): g for g in (git or [])}
print("Checking against:", "GIT (what Vercel gets)" if git else "folder only (no git found)")

pat = re.compile(r"""["'(]\s*([^"'()\s<>][^"'()<>]*?\.(?:png|jpe?g|webp|gif|svg|avif|ico|mp4|webm|mov))""", re.I)
found = 0
bad = 0
for d, dirs, files in os.walk(R):
    dirs[:] = [x for x in dirs if x not in (".git", "node_modules", ".vscode")]
    for f in files:
        if not f.endswith((".html", ".css", ".js")):
            continue
        p = os.path.join(d, f)
        text = open(p, encoding="utf-8", errors="ignore").read()
        for m in pat.finditer(text):
            ref = m.group(1).split("?")[0].strip()
            if ref.startswith(("http", "//", "data:")) or "${" in ref:
                continue
            found += 1
            options = [os.path.normpath(os.path.join(d, ref)), os.path.normpath(os.path.join(R, ref.lstrip("/")))]
            rels = [os.path.relpath(o, R).replace(os.sep, "/") for o in options]
            if git:
                if any(r in tracked for r in rels):
                    continue
                case = next((lower[r.lower()] for r in rels if r.lower() in lower), None)
                if case:
                    status = "CASE (git has: %s)" % case
                elif any(os.path.exists(o) for o in options):
                    status = "NOT IN GIT (never pushed)"
                else:
                    status = "MISSING"
            else:
                if any(os.path.exists(o) for o in options):
                    continue
                status = "MISSING"
            bad += 1
            line = text.count("\n", 0, m.start()) + 1
            print("[%s] %s line %d -> %s" % (status, os.path.relpath(p, R), line, ref))

print("\nChecked %d paths, %d problems." % (found, bad))

print("\nHeaviest images/videos (over 250 KB):")
big = []
for d, dirs, files in os.walk(R):
    dirs[:] = [x for x in dirs if x not in (".git", "node_modules")]
    for f in files:
        if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".webm", ".mov")):
            p = os.path.join(d, f)
            kb = os.path.getsize(p) / 1024
            if kb > 250:
                big.append((kb, os.path.relpath(p, R)))
for kb, p in sorted(big, reverse=True)[:25]:
    print("  %6.0f KB  %s" % (kb, p))
if not big:
    print("  none")
    
"""Generuje wersje językowe strony (en, uk, ru, de) z polskich stron w site/.

Polskie strony są źródłem: zmieniasz liczby/teksty tylko tam, potem uruchamiasz
    python3 tools/i18n/build.py
Skrypt podmienia polskie fragmenty na tłumaczenia ze strings.py, dopisuje
przełącznik języków i hreflang do wszystkich wersji i odświeża sitemap.xml.
Jeśli polski fragment ze strings.py zniknął ze strony (bo ktoś zmienił tekst),
skrypt kończy się błędem — trzeba wtedy poprawić wpis w strings.py.
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from strings import COMMON, PAGES  # noqa: E402

SITE = Path(__file__).resolve().parents[2] / "site"
BASE = "https://mojekalkulatory.pl/"
LANGS = ["pl", "en", "uk", "ru", "de"]
LABEL = {"pl": "PL", "en": "EN", "uk": "UA", "ru": "RU", "de": "DE"}
POLISH_CHARS = re.compile(r"[ąćęłńśźżĄĆĘŁŃŚŹŻ]")
# Polskie słowa, które celowo zostają w tłumaczeniach (nazwy własne, waluta).
KEEP = ["zł", "wynagrodzenie chorobowe", "zasiłek chorobowy", "Złoty", "Umowa o pracę", "Pekao", "Żubrem", "Bezcenne", "Skarbu Państwa", "umowa o pracę", "umowie o pracę",
        "działalność", "ryczałt", "Ryczałt", "ulga na start", "podatek Belki", "Belki", "składka zdrowotna",
        "obligacjeskarbowe.pl", "zus.pl", "nadpłata", "Nadpłata", "lokata", "Procent składany"]


def url(lang, page):
    path = "" if page == "index.html" else page
    return BASE + ("" if lang == "pl" else lang + "/") + path


def chrome(lang, page):
    """Przełącznik języków i znaczniki hreflang dla danej strony."""
    prefix = "" if lang == "pl" else "../"
    links = "".join(
        f'<a href="{prefix}{"" if l == "pl" else l + "/"}{page}" hreflang="{l}"'
        f'{" aria-current=\"true\"" if l == lang else ""}>{LABEL[l]}</a>'
        for l in LANGS)
    switcher = f'<!--i18n--><div class="lang">{links}</div><!--/i18n-->'
    alternates = "".join(f'<link rel="alternate" hreflang="{l}" href="{url(l, page)}">\n' for l in LANGS)
    alternates += f'<link rel="alternate" hreflang="x-default" href="{url("pl", page)}">\n'
    head = f'<!--hreflang-->\n<link rel="canonical" href="{url(lang, page)}">\n{alternates}<!--/hreflang-->\n'
    return switcher, head


def with_chrome(html, lang, page):
    switcher, head = chrome(lang, page)
    html = re.sub(r"\n?<!--i18n-->.*?<!--/i18n-->", "", html, flags=re.S)
    html = re.sub(r"<!--hreflang-->.*?<!--/hreflang-->\n", "", html, flags=re.S)
    html, n = re.subn(r"</nav>\s*</header>", "</nav>\n" + switcher + "\n</header>", html, count=1)
    if not n:
        sys.exit(f"{page}: nie znaleziono </nav></header>")
    return html.replace("</head>", head + "</head>", 1)


def translate(src, lang, page):
    pairs = PAGES.get(page, []) + COMMON
    out = src
    missing = []
    for entry in sorted(pairs, key=lambda e: -len(e["pl"])):
        if entry["pl"] not in src:
            missing.append(entry["pl"][:80])
            continue
        out = out.replace(entry["pl"], entry[lang])
    if missing:
        sys.exit(f"{page}: brak polskich fragmentów (zaktualizuj strings.py):\n  " + "\n  ".join(missing))
    out = out.replace('<html lang="pl">', f'<html lang="{lang}">', 1)
    out = out.replace('href="assets/', 'href="../assets/').replace('src="assets/', 'src="../assets/')
    out = re.sub(r'<meta name="google-site-verification"[^>]*>\n', "", out)
    leftovers = []
    for line in out.splitlines():
        rest = line
        for word in KEEP:
            rest = rest.replace(word, "")
        if POLISH_CHARS.search(rest) and 'class="lang"' not in rest and not rest.lstrip().startswith("//"):
            leftovers.append(line.strip()[:120])
    if leftovers:
        print(f"UWAGA {lang}/{page}: możliwy nieprzetłumaczony tekst:\n  " + "\n  ".join(leftovers))
    return out


def sitemap(pages):
    old = (SITE / "sitemap.xml").read_text()
    lastmod = dict(re.findall(r"<loc>([^<]+)</loc><lastmod>([^<]+)</lastmod>", old))
    rows = []
    for page in pages:
        mod = lastmod.get(url("pl", page), "2026-10-24")
        for lang in LANGS:
            rows.append(f"<url><loc>{url(lang, page)}</loc><lastmod>{mod}</lastmod></url>")
    (SITE / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n")


def main():
    pages = sorted(p.name for p in SITE.glob("*.html") if not p.name.startswith("google"))
    pages.remove("index.html")
    pages.insert(0, "index.html")
    for page in pages:
        src = with_chrome((SITE / page).read_text(), "pl", page)
        (SITE / page).write_text(src)
        for lang in LANGS[1:]:
            (SITE / lang).mkdir(exist_ok=True)
            (SITE / lang / page).write_text(with_chrome(translate(src, lang, page), lang, page))
    sitemap(pages)
    print(f"OK: {len(pages)} stron × {len(LANGS) - 1} języki")


if __name__ == "__main__":
    main()

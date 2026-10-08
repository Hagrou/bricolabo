"""Assemble sim.js et template.html en un seul fichier autonome : ../goutte-a-goutte.html"""
import pathlib
here = pathlib.Path(__file__).parent
template = (here / "template.html").read_text(encoding="utf-8")
sim = (here / "sim.js").read_text(encoding="utf-8")
assert template.count("/*SIM*/") == 1, "le repère /*SIM*/ doit apparaître une fois dans template.html"
head = """<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>html{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
"""
out = here.parent / "goutte-a-goutte.html"
out.write_text(head + template.replace("/*SIM*/", sim) + "\n</body>\n</html>\n", encoding="utf-8")
print("écrit :", out, len(out.read_text(encoding="utf-8")), "caractères")

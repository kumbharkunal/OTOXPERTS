# OX Display

`OXDisplay-Italic.woff2` is a modified version of the Hubot Sans Italic variable font
(Google Fonts build, https://github.com/google/fonts/tree/main/ofl/hubotsans), licensed
under the SIL Open Font License 1.1 (`OFL.txt`).

Changes, made to keep the font that the H1 waits for small:
- axes limited to what the site uses: weight 700–800, width 100–112;
- glyphs subset to Basic Latin, Latin-1, typographic punctuation and ₹;
- renamed to "OX Display", because "Hubot" is a Reserved Font Name under the licence.

Rebuild: fontTools `varLib.instancer` (wght=700:800 wdth=100:112), then `fontTools.subset`
with `--flavor=woff2`, then rename name IDs 1, 3, 4, 6, 16 and 17.

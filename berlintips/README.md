# post-tour-qr

A single-page post-tour guest page for a Berlin bicycle tour guide. Guests scan a QR code at the end of a tour and land here. The page shows personal city tips from the guide, a thumbs-up/down review prompt with a Google Maps link, and a Buy Me a Coffee button.

One self-contained HTML file. No frameworks, no build step, no dependencies beyond Google Fonts.

---

## Tips

Tips are loaded from `tips.csv` in the repo root. The CSV must have this header row:

```
Name,Description,Category,Neighbourhood,Google Maps URL
```

- **Name** is required — rows without a name are skipped.
- **Description**, **Neighbourhood**, and **Google Maps URL** are optional — omit the value to hide that field on the card.
- Categories are grouped automatically in the order they first appear.

**Personal details** (guide name, Google Maps listing URL, feedback email, Buy Me a Coffee URL) are in the `CONFIG` block at the top of the `<script>` tag in `index.html`.

---

## Deploying

This repo is connected to Netlify and deploys automatically on every push to `main`. There is no build step — Netlify serves `index.html` and `tips.csv` directly.

To deploy an update:

```bash
git add index.html tips.csv
git commit -m "Update tips"
git push origin main
```

Netlify picks up the push and the live URL updates within a minute or two.

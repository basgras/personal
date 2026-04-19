# CLAUDE.md — Project Brief

This file is a briefing document for future Claude Code sessions working on this sub-project.

## Sub-project location

This is a sub-project living at `/berlintips/` inside the `basgras/personal` repo. The working directory for all work on this page is `/berlintips/`. `index.html` and `tips.csv` are siblings in that folder — no path changes are needed when editing either file.

The page is served at **bas.grasmayer.com/berlintips** via Netlify. Netlify serves the files in this folder directly as part of the parent site — there is no separate Netlify site, no proxy, and no build step.

---

## What this project is

A single-page, self-contained HTML file (`index.html`) for a Berlin bicycle tour guide. Guests scan a QR code at the end of a tour and land on this page. It contains personal city tips from the guide, a thumbs-up/down review prompt, a Google Maps review link, and a Buy Me a Coffee button.

The page is designed for **mobile only** — the specific moment is someone standing on a street in Berlin, just finished a tour, scanning a QR code. Desktop is a readable fallback, not a design concern.

---

## Language rule

- **All visible page content must be in Dutch** — headings, body text, button labels, form fields, tip copy, everything the user reads.
- **All code and comments must be in English** — JavaScript, CSS class names, HTML attribute values, inline code comments.

Do not mix these. If you add a new UI element, write its visible text in Dutch and its code scaffolding in English.

---

## Config block

All personalisation lives in the `CONFIG` object at the top of the `<script>` tag in `index.html`.

```js
var CONFIG = {
  location:       'Berlijn',           // city name — header eyebrow + tips intro
  guideName:      'Bas',               // guide's first name — labels, review copy, emails
  googleMapsUrl:  'https://...',       // direct link to the Google Maps listing
  feedbackEmail:  'guide@example.com', // receives negative feedback form submissions
  buyMeCoffeeUrl: 'https://...',       // Buy Me a Coffee profile link
};
```

### Tips

Tips are loaded at runtime from `tips.csv` in the same directory as `index.html`. The CONFIG block does not contain a tips array.

**CSV columns:** `Name`, `Description`, `Category`, `Neighbourhood`, `Google Maps URL`

Empty field rules:
- `Name` missing → row is skipped entirely
- `Description` missing → tip shown without description
- `Google Maps URL` missing → tip shown without the Maps link
- `Neighbourhood` missing → tip shown without the neighbourhood tag

Category order on the page follows first appearance in the CSV. The first category is expanded by default; all others start collapsed.

---

## Review gating — critical constraint

**The Google Maps review link must always be visible on the page, in all states.**

This is not review gating. The link is in the DOM at all times. When the user taps thumbs up, the maps block gains visual prominence (becomes the primary CTA). When the user taps thumbs down, the maps block stays on the page but loses prominence — the feedback form becomes the focus instead.

Do not move the link behind a conditional, do not `display: none` it, do not remove it from the DOM based on review state. The `is-primary` CSS class only changes its visual weight.

---

## Buy Me a Coffee section

The coffee section (`#coffee-section`) is live and visible. The `CONFIG.buyMeCoffeeUrl` value is wired up automatically.

---

## Design decisions to preserve

### Typeface
- **DM Sans** — clean geometric sans-serif, nothing decorative. Loaded from Google Fonts at weights 400, 500, 600.
- Do not replace with serif or display typefaces.

### Colour palette
| Token          | Value     | Role                                    |
|----------------|-----------|-----------------------------------------|
| `--bg`         | `#FAFAFA` | Crisp near-white background             |
| `--surface`    | `#FFFFFF` | Pure white — card and form backgrounds  |
| `--surface-hi` | `#EFF6FF` | Light blue tint (maps `is-primary`)     |
| `--text`       | `#0F1117` | Near-black                              |
| `--text-muted` | `#64748B` | Cool slate-gray — secondary text        |
| `--accent`     | `#2563EB` | Clean bright blue — the one sharp colour|
| `--border`     | `#E2E8F0` | Soft cool dividers and input borders    |

### Layout order
Tips come first, review second, coffee third. This order is intentional.

### Animations
- **Page load**: staggered `fadeInUp` on `.section` elements (0.55s, each child offset by ~0.14s).
- **Thumbs**: `cubic-bezier(0.34, 1.2, 0.64, 1)` spring easing — satisfying but not cartoonish.
- **Feedback form**: `max-height` + `opacity` transition for a smooth slide-open.
- **Accordion**: `max-height` transition on `.accordion-body` (0.28s ease).

---

## File structure

All files live under `/berlintips/` in the parent repo:

```
berlintips/
  index.html   — the entire product; self-contained, no dependencies except Google Fonts
  tips.csv     — tip data; columns: Name, Description, Category, Neighbourhood, Google Maps URL
  CLAUDE.md    — this file
  CHANGELOG.md — version history
  README.md    — setup and deployment guide
```

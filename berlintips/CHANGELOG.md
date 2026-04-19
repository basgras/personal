# Changelog

All notable changes to this project are documented here.

---

## v0.3.0 — 2026-04-15

Design polish and tips-from-CSV.

- Design: Inter → DM Sans; accent updated to clean blue (#2563EB); more generous whitespace throughout; subtle tip card shadow; border-radius bumped to 10px
- Tips now loaded from `tips.csv` (columns: Name, Description, Category, Neighbourhood, Google Maps URL); hardcoded tips array removed from CONFIG
- Tip cards updated: neighbourhood tag added; description, neighbourhood, and Maps link are each omitted when their CSV field is empty
- Buy Me a Coffee section uncommented and live
- Removed all multi-guide / colleague-reuse framing from CONFIG comments, CLAUDE.md, and README.md

---

## v0.2.0 — 2026-04-13

Design overhaul.

- Replaced Fraunces + Lora with Inter (400/500/600) from Google Fonts
- New palette: off-white (#f8f8f6), near-black (#111110), indigo accent (#4f46e5)
- Removed grain SVG overlay and `--olive` token
- Tips section converted to collapsible accordion; first category (Eten) expanded by default; chevron rotates on toggle
- Tip card format updated: place name heading + description + "Bekijk op Google Maps ↗" link opening in a new tab
- CONFIG tips format updated: `text` → `description`, `mapsUrl` field added to each tip object
- Review section behaviour and logic unchanged
- Coffee section CSS updated to new tokens (section stays commented out)

---

## v0.1.0 — 2026-04-13

Initial build.

- Single-page, self-contained `index.html` — no frameworks, no build tools
- JS `CONFIG` block at top of script for guide-specific personalisation (name, location, URLs, tips)
- Tips section: personal intro line from the guide, 15 placeholder tips across 5 categories (Eten, Buurt, Natuur, Verborgen plek, Praktisch), grouped and rendered from the config array
- Review section: thumbs up / thumbs down with three visual states (neutral, up, down)
- Google Maps review link always visible on the page in all review states — not review gating
- Thumbs up: maps block becomes the primary visual focus
- Thumbs down: inline feedback form slides open via CSS max-height transition; maps link stays on page
- Feedback form submits via `mailto:` fallback with pre-filled subject and body
- Buy Me a Coffee section fully styled but wrapped in an HTML comment, disabled by default
- Grain texture overlay via inline SVG `feTurbulence` filter
- Staggered page-load `fadeInUp` animation on all sections
- Spring-eased thumb button micro-interaction (`cubic-bezier(0.34, 1.2, 0.64, 1)`)
- Fraunces (display) + Lora (body) typefaces from Google Fonts
- Earthy colour palette: parchment background, warm olive and ochre accents
- Mobile-first layout (max-width 480px); desktop gets a basic readable fallback

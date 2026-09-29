# bas.grasmayer.com

Personal portfolio site for Bas Grasmayer — strategist focused on product and organisational development.

Live at **https://bas.grasmayer.com/**

## Tech stack

Static HTML, CSS, and vanilla JavaScript. No build tools, no frameworks, no dependencies.

## Structure

```
index.html              Main portfolio page
fonoteka/index.html     Fonoteka case study article
shared.css              Shared styles (footer, dark mode, print, skip-link)
sw.js                   Service worker for offline caching
404.html                Custom 404 page
content/                Images, favicon and self-hosted Fraunces font for the main site
fonoteka/content/       Images for the Fonoteka article
robots.txt              Search engine crawling rules
sitemap.xml             XML sitemap
```

## External dependency

The homepage fetches the latest [Calm & Fluffy](https://calmfluffy.substack.com/) articles at runtime via the [rss2json](https://rss2json.com/) API. If the fetch fails or times out (5 s), a static fallback link is shown.

## Service worker

`sw.js` caches pages and images for offline viewing. Pages and CSS are network-first (always fresh when online, cache only as offline fallback); images are stale-while-revalidate. Content updates reach returning visitors automatically — no need to bump `CACHE_NAME`. Only bump it if you change the caching logic itself and want old caches wiped.

# bas.grasmayer.com

Personal portfolio site for Bas Grasmayer — strategist focused on product and organisational development.

Live at **https://bas.grasmayer.com/**

## Tech stack

Static HTML, CSS, and vanilla JavaScript. No build tools, no frameworks, no dependencies.

## Structure

```
index.html              Main portfolio page
fonoteka/index.html     Fonoteka case study article
content/                Images and favicon for the main site
fonoteka/content/       Images for the Fonoteka article
robots.txt              Search engine crawling rules
sitemap.xml             XML sitemap
```

## Running locally

Open `index.html` in a browser, or serve with any static file server:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## External dependency

The homepage fetches the latest [Calm & Fluffy](https://calmfluffy.substack.com/) articles at runtime via the [rss2json](https://rss2json.com/) API. If the fetch fails, a static fallback link is shown.

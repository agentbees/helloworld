# Hello World

This project is a single-page **Hello World HTML application**. Open the page to see a simple Hello World greeting rendered in your web browser; no backend service is required.

## Technologies

- **HTML5** provides the page structure and greeting.
- **CSS3** provides the page presentation.
- **JavaScript** provides client-side behavior.

## Run locally

### Open the page directly

1. Clone or download this repository.
2. Open [`index.html`](index.html) in a web browser.

The page runs locally without a build step, database, or backend service.

### Optional local server

If your browser restricts local files, serve the project directory with any simple static server. For example, with Python installed:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000/> in a browser and open the page from there.

## Project structure

- [`index.html`](index.html) — the HTML entry point for the one-page application.

## GitHub Pages

The app can be hosted as a static site with GitHub Pages. In the repository’s **Settings → Pages**, choose the branch containing the app and its root (`/`) as the source, then save. After GitHub Pages finishes publishing, use the URL shown in that Pages settings panel (typically `https://<owner>.github.io/<repository>/`) to open the page.

## Troubleshooting

Make sure you open the project’s root [`index.html`](index.html), rather than a documentation file or another page. If the page is blank when opened directly, try the optional local server and reload <http://localhost:8000/>.

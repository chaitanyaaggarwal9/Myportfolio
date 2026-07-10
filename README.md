# Chaitanya Aggarwal - Product OS Portfolio

A cinematic static portfolio for Chaitanya Aggarwal, built as an interactive "Product OS" instead of a traditional resume page.

## What Changed

- Full-screen Product OS hero with boot sequence.
- Real WebGL 3D centerpiece: a procedural turbine that morphs into a neural network as you scroll, visualizing the arc from mechanical engineering to AI product management.
- Mission-style case study switcher (AI Gym Coach, Finwise, Savax, MyGWU, PKA Labor).
- Static recruiter fast-signal strip and a systems-engineering "roots" panel.
- Fully static deployment with no build step — Three.js is loaded as an ES module straight from a CDN via an import map, no npm/bundler required.

## File Structure

```text
portfolio/
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── app.js
│   └── scene.js
└── assets/
    ├── photo.jpg
    └── Chaitanya_Aggarwal_Resume.pdf
```

The portfolio is a single cohesive page. There are no section partials, build tools, or runtime dependencies — `js/scene.js` pulls in Three.js via the `<script type="importmap">` in `index.html`.

## Local Preview

Because the page is static, you can run any simple local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy

This repo deploys cleanly on Vercel, Netlify, GitHub Pages, or any static host.

For Vercel:

1. Push to GitHub.
2. Import the repo in Vercel.
3. Keep the default static settings.
4. Add the custom domain `chaitanyaaggarwal.com`.

## Editing

- Main content: `index.html`
- Visual system and responsive behavior: `css/main.css`
- Reveal animations, counters, mission data: `js/app.js`
- 3D turbine-to-neural-network scene: `js/scene.js`
- Resume: `assets/Chaitanya_Aggarwal_Resume.pdf`
- Photo: `assets/photo.jpg`

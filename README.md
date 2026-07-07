# Chaitanya Aggarwal - Product OS Portfolio

A cinematic static portfolio for Chaitanya Aggarwal, built as an interactive "Product OS" instead of a traditional resume page.

## What Changed

- Full-screen Product OS hero with boot sequence.
- Animated signal canvas background.
- Mission-style case study switcher.
- AI PM Lab terminal with guided prompts.
- Recruiter Fast Mode for quick hiring signal.
- Animated capability radar and trajectory timeline.
- Fully static deployment with no build step.

## File Structure

```text
portfolio/
├── index.html
├── css/
│   └── main.css
├── js/
│   └── app.js
└── assets/
    ├── photo.jpg
    └── Chaitanya_Aggarwal_Resume.pdf
```

The portfolio is now a single cohesive page. There are no section partials, build tools, or runtime dependencies.

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
- Animations, terminal answers, mission data: `js/app.js`
- Resume: `assets/Chaitanya_Aggarwal_Resume.pdf`
- Photo: `assets/photo.jpg`

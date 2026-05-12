# Chaitanya Aggarwal — Portfolio

## File Structure
```
portfolio/
├── index.html              ← Main shell (edit nav/meta here)
├── sections/
│   ├── hero.html           ← Hero section (photo, tagline, stats)
│   ├── advantage.html      ← Unfair advantage + journey timeline
│   ├── cases.html          ← 4 case studies
│   ├── skills.html         ← Skills + certifications
│   └── contact.html        ← AI chat bot + contact + footer
├── css/
│   ├── main.css            ← Global styles, colors, typography
│   └── animations.css      ← All animations and scroll effects
├── js/
│   ├── app.js              ← All JS: animations, cursor, loader
│   └── chat.js             ← AI bot Q&A (edit answers here)
└── assets/
    ├── photo.jpg           ← YOUR PHOTO (add this!)
    └── Chaitanya_Aggarwal_Resume.pdf  ← YOUR RESUME (add this!)
```

## Setup

### 1. Add your photo
Place your photo as `assets/photo.jpg`

### 2. Add your resume
Place your resume as `assets/Chaitanya_Aggarwal_Resume.pdf`

### 3. Deploy to Vercel
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects static site → Deploy
4. Add custom domain: chaitanyaaggarwal.com

### 4. Add custom domain
In Vercel project settings → Domains → Add `chaitanyaaggarwal.com`
Update your DNS (wherever you bought the domain) to point to Vercel.

## Editing Sections
Each section is its own file — edit independently:

- **Change hero tagline**: `sections/hero.html` line ~8
- **Update case studies**: `sections/cases.html`
- **Edit chat Q&As**: `js/chat.js` → update the `QA` object
- **Add certifications**: `sections/skills.html`
- **Update contact info**: `sections/contact.html`

## Colors (edit in css/main.css)
- `--red: #e63946` — accent color
- `--ink: #0d0d0d` — dark text
- `--cream: #faf8f3` — page background
- `--cream-dark: #f0ece4` — section background

## Tech Stack
- Pure HTML + CSS + JavaScript
- No frameworks, no npm, no build step
- Google Fonts (Playfair Display + DM Sans)
- Zero external dependencies
- Deploys as static site

## Performance
- Page load: ~200ms
- No JavaScript frameworks
- Fonts loaded from Google CDN
- All animations CSS-based (GPU accelerated)

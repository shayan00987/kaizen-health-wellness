# Kaizen Health & Wellness — Responsive Website

A standalone, responsive front-end website based on the supplied Kaizen Health and Wellness brand direction.

## Included
- `index.html` — complete page markup
- `styles.css` — responsive styling and visual system
- `script.js` — mobile navigation, modal consultation form, service selection, smooth scrolling and active navigation
- `assets/` — original website imagery and the supplied Kaizen logo
  - `kaizen-logo.png` — cleaned version of the provided logo (background removed for use on the site)
  - `hero-athlete-dna.png` — newly generated hero artwork; it is a standalone image, not cropped from the website mockup
  - `science-lab.svg` — original standalone science/laboratory illustration
  - `insight-dna.svg`, `insight-recovery.svg`, `insight-nutrition.svg` — original article artwork

## Run
Open `index.html` directly in a browser, or serve the folder with any static web server.

Example:
```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes
The consultation form is front-end only. Connect its submit handler to your preferred booking system, CRM, email endpoint, or backend before production.

The site contains no cropped screenshot/mockup images. The provided Kaizen logo is used as branding; the remaining visual assets are separate assets created for the website.

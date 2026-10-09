# Kaizen free FAQ chatbot

This is a separate, no-API-cost FAQ chatbot for the existing Kaizen Health & Wellness GitHub Pages site. It uses predefined answers and keyword matching; it is **not a generative AI chatbot**.

## Files
- `chatbot.css` — isolated chatbot styles
- `chatbot.js` — widget interface and FAQ logic

## Add to the existing site
1. Upload both files into the same folder as `index.html` (repository root).
2. Open `index.html` in GitHub and tap Edit.
3. Add this line inside `<head>`, after the existing stylesheet link:
   `<link rel="stylesheet" href="chatbot.css">`
4. Add this line immediately before the existing `</body>`:
   `<script src="chatbot.js"></script>`
5. Commit the changes and wait for GitHub Pages to redeploy.
6. Open the live site and test the “Chat with Kaizen” button.

Do not replace the existing `index.html`, `styles.css`, `script.js`, or `assets` folder.

## Before showing the client
Ask the client to verify the FAQ answers, services, contact details, locations, fees and hours. Fees and opening hours are intentionally not guessed. The existing consultation form in the website is marked as a demo and does not actually submit bookings until connected to a service.

## Customising
Edit the `FAQS` array in `chatbot.js` to add or update keywords and answers. Avoid adding medical diagnosis or treatment advice.

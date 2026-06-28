# JARVIS AI — Website

A premium, futuristic website for the JARVIS AI personal assistant project.  
Deployed on GitHub Pages — no backend, no build step, no server.

## 🚀 Quick Deploy

1. Clone or download this repository
2. Add your two files:
   - `assets/JarvisAI.zip` — your project bundle
   - `assets/Installation_Guide.pdf` — your guide
3. Push to GitHub and enable **Pages → Deploy from branch (main / root)**
4. Done — the site is live

## 📸 Adding Screenshots

Drop image files into `assets/screenshots/` and add their filenames to the `SCREENSHOTS` array in `script.js`:

```js
const SCREENSHOTS = [
  'assets/screenshots/home.png',
  'assets/screenshots/voice.png',
  'assets/screenshots/chat.png',
];
```

## 🎬 Demo Video

Replace `VIDEO_ID` in `index.html` with your YouTube video ID:

```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?...">
```

## 📁 Folder Structure

```
Jarvis-AI-Website/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── JarvisAI.zip          ← replace with your file
│   ├── Installation_Guide.pdf ← replace with your file
│   └── screenshots/          ← drop images here
└── README.md
```

## ✏️ Personalisation

Search for the following placeholders in `index.html` and replace them:

| Placeholder | Replace with |
|---|---|
| `your@email.com` | Your email address |
| `yourusername` (×4) | Your GitHub / LinkedIn / Instagram handles |
| `VIDEO_ID` | Your YouTube video ID |

## 🛠 Tech Stack

- HTML5 / CSS3 / Vanilla JS
- Three.js (background)
- AOS (scroll animations)
- No React · No Node · No build tool

## 📄 License

MIT — free to use and modify.

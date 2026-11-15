# Ram Chandra Gupta — Portfolio

Applied AI/ML portfolio focused on LLM evaluation, retrieval-augmented generation, agentic systems, computer vision, and practical backend engineering.

**Live site:** [mrchandra.in](https://mrchandra.in)

## Features

- Responsive single-page layout with mobile navigation
- Dark and light themes saved between visits
- Animated neural-network canvas and profile-card effects
- Reduced-motion support and keyboard-accessible controls
- Project, experience, achievement, and certificate showcases
- Resume downloads and certificate proof links
- Contact form that opens a pre-filled message in the visitor's email app
- Dependency-free browser JavaScript, HTML, and CSS

The contact form does not send or store messages on a server. Visitors must review and send the prepared message in their email application.

## Run locally

Requires Node.js 18 or newer. No dependency installation is needed.

```bash
npm start
```

Open `http://127.0.0.1:8000`.

## Test

```bash
npm test
```

The smoke check verifies required files, section content, and local project/certificate links.

For desktop/mobile browser checks, install Chrome or Edge and use Node.js 22 or newer:

```bash
npm run test:browser
```

The browser check starts an isolated local server and verifies content, responsive layout, themes, reduced motion, JavaScript errors, and PDF delivery. Set `CHROME_PATH` if your browser is not in a standard installation location.

## Update the resume CV

Edit `documents/ram-chandra-gupta-resume.html`, then regenerate the downloadable, one-page PDF with:

```bash
npm run resume:pdf
```

PDF generation uses a locally installed Chrome or Edge browser and requires no extra npm packages.

## Project structure

```text
.
├── index.html
├── assets/                 # Images and certificate image
├── documents/              # PDF/HTML resume and certificate proofs
├── scripts/exportResume.js # Local resume PDF generation
├── src/
│   ├── components/
│   │   ├── sections/       # Renderers for each portfolio section
│   │   └── footer.js
│   ├── config/             # UI constants and rotating titles
│   ├── data/               # Portfolio content
│   ├── scripts/
│   │   ├── modules/        # Navigation, themes, forms, and animations
│   │   └── app.js          # Application bootstrap
│   ├── styles/main.css
│   └── utils/dom.js
├── tests/smokeCheck.js
├── serve-local.js
└── vercel.json
```

## Customize

Edit `src/data/portfolioData.js` to update projects, work experience, achievements, research focus, and contact details. Edit `src/config/siteConfig.js` for rotating hero titles and theme icons.

`vercel.json` configures static hosting on Vercel without SPA rewrites. The site uses same-page section links, so assets and missing URLs are not rewritten to `index.html`.

## Connect

- [Email](mailto:ramcgupta.ml@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/chandra142/)
- [GitHub](https://github.com/Chandra142)
- [Kaggle](https://www.kaggle.com/ramchandra142/)

# Ram Portfolio

A modular, production-style static portfolio for Ram Chandra Gupta. The project has been reorganized into a clean source/public structure so presentation, configuration, assets, and runtime logic are easier to maintain.

## Project Structure

```text
.
|-- public/
|   |-- assets/
|   |-- documents/
|   `-- index.html
|-- src/
|   |-- components/
|   |   `-- sections/
|   |-- config/
|   |-- scripts/
|   |   `-- modules/
|   |-- services/
|   |-- styles/
|   `-- utils/
|-- tests/
|-- package.json
|-- README.md
`-- serve-local.js
```

## Folder Guide

- `public/`: Browser-served entrypoint, downloadable documents, and static assets.
- `src/components/sections/`: HTML partials for each portfolio section.
- `src/config/`: Centralized content/configuration such as section registration and typed-text values.
- `src/scripts/modules/`: UI behavior modules split by concern.
- `src/services/`: Runtime services such as section loading.
- `src/styles/`: Main stylesheet.
- `src/utils/`: Shared DOM helpers.
- `tests/`: Lightweight smoke checks for structure and bootstrap integrity.

## How to Run

1. Install nothing. This project has no external runtime dependencies.
2. Start the local server:

```bash
npm start
```

3. Open `http://127.0.0.1:8000`.

## How to Test

```bash
npm test
```

## Key Features

- Modular section-based portfolio architecture.
- Dedicated source and public layers.
- Theme toggle, animated hero canvas, typed title, and section reveal effects.
- Scroll-aware navigation and mobile navigation support.
- Contact form mailto workflow.
- Clean asset and document naming for easier maintenance.

## Notes

- The site is intentionally framework-free and optimized for simple static hosting.
- `serve-local.js` serves the repository root and uses `public/index.html` as the default route.

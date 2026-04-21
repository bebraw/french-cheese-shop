# Technical Notes

## Usage

Install dependencies:

```bash
npm install
```

Build the presentation:

```bash
npm run build
```

Run layout and text validation:

```bash
npm run validate
```

Run the full validation suite, including render validation:

```bash
npm run validate:all
```

Run the project quality gate used after changes:

```bash
npm run quality:gate
```

## Project Structure

```text
.
├── archive/
│   └── teaching-proof-ai-re.pdf
├── package.json
├── README.md
├── TECHNICAL.md
├── generator/
│   ├── compile.js
│   ├── deck.js
│   ├── export-pdf.js
│   ├── helpers.js
│   ├── output-config.js
│   ├── pdf-renderer.js
│   ├── references.js
│   ├── render-baseline/
│   ├── render-utils.js
│   ├── theme.js
│   ├── update-render-baseline.js
│   ├── validate-geometry.js
│   ├── validate-render.js
│   ├── validate-text.js
│   └── validation.js
├── skills/
│   └── pdf-slide-generator/
│       └── SKILL.md
└── slides/
    ├── imgs/
    │   └── ATTRIBUTIONS.md
    ├── output/
    ├── slide-01.js
    ├── slide-01a.js
    ├── slide-02.js
    ├── slide-03.js
    ├── slide-04.js
    ├── slide-05.js
    ├── slide-06.js
    ├── slide-07.js
    ├── slide-08.js
    ├── slide-08a.js
    ├── slide-09.js
    ├── slide-10.js
    └── slide-10a.js
```

## Notes

- The deck is authored as slide modules in `slides/`, while the build, rendering, and validation runtime lives in `generator/`.
- The production build path renders PDF directly through `pdfkit`.
- The deck uses `Didot` for display text and `Avenir Next` for body text.
- `slides/output/` is git-ignored, so generated binaries stay local.
- `archive/teaching-proof-ai-re.pdf` stores the checked-in PDF snapshot for linking and archival.
- `generator/render-baseline/` stores the approved render baseline for the current deck output.
- `npm run quality:gate` checks the generated PDF against that baseline and is the required final validation for presentation changes.
- Render validation compares rasterized PDF pages against the committed baseline in `generator/render-baseline/`.

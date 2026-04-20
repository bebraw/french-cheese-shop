# french-cheese-shop

This repository contains a PowerPoint deck generator for **AI in Requirements Engineering**, built around the running example of a French cheese shop.

The presentation is authored as slide modules in `slides/` and compiled into a `.pptx` with `PptxGenJS`.

## Deck

The current presentation is a 9-slide teaching deck covering:

- the opening cheese-shop prompt
- the shift from classical RE to AI-era RE
- latent requirements
- data and ontology as requirement artifacts
- evaluation under uncertainty
- ADRs as control points
- closing synthesis

Generated output:

- PPTX: `slides/output/teaching-proof-ai-re.pptx`
- PDF: `slides/output/teaching-proof-ai-re.pdf` when PDF export succeeds locally

## Usage

Install dependencies:

```bash
npm install
```

Build the presentation:

```bash
npm run build
```

Build the presentation and attempt PDF export:

```bash
npm run build:pdf
```

Run layout and text validation:

```bash
npm run validate
```

Run the full validation suite, including render validation:

```bash
npm run validate:all
```

## Project structure

```text
.
├── package.json
├── README.md
├── skills/
│   └── pptx-generator/
│       └── SKILL.md
└── slides/
    ├── compile.js
    ├── deck.js
    ├── export-pdf.js
    ├── helpers.js
    ├── imgs/
    │   └── ATTRIBUTIONS.md
    ├── render-baseline/
    ├── slide-01.js
    ├── slide-02.js
    ├── slide-03.js
    ├── slide-04.js
    ├── slide-05.js
    ├── slide-06.js
    ├── slide-07.js
    ├── slide-08.js
    ├── slide-09.js
    ├── theme.js
    ├── update-render-baseline.js
    ├── validate-geometry.js
    ├── validate-render.js
    ├── validate-text.js
    └── validation.js
```

## Photos and attribution

The deck includes local cheese photos on the cover and the customer-query slide.

- Image files live in `slides/imgs/`
- Attribution details live in `slides/imgs/ATTRIBUTIONS.md`
- The slide code adds the image and on-slide attribution automatically when the expected files are present

## Notes

- The deck uses `Didot` for display text and `Avenir Next` for body text.
- `slides/output/` is git-ignored, so generated binaries stay local.
- PDF export depends on a locally installed converter such as LibreOffice or Keynote automation on macOS.
- Render validation compares rasterized PDF pages against the committed baseline in `slides/render-baseline/`.

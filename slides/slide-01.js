const fs = require("fs");
const path = require("path");
const { liveDemoUrl } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "cover",
  index: 1,
  title: "AI in Requirements Engineering"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  const coverPhotoCandidates = [
    path.join(__dirname, "imgs", "jackmac34-normandy-2068748_1920.jpg"),
    path.join(__dirname, "imgs", "pixabay-normandy-camembert-jackmac34.jpg")
  ];
  const coverPhotoPath = coverPhotoCandidates.find((candidate) => fs.existsSync(candidate));
  slide.background = { color: theme.bg };

  canvas.addShape("cover-base", pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    line: { color: theme.bg, transparency: 100 },
    fill: { color: theme.bg }
  }, {
    group: "background",
    skipBounds: true,
    skipOverlap: true
  });

  canvas.addShape("cover-right-panel", pres.ShapeType.rect, {
    x: 6.55,
    y: 0,
    w: 3.45,
    h: 5.625,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group: "background",
    skipBounds: true,
    skipOverlap: true
  });

  canvas.addShape("cover-arch", pres.ShapeType.arc, {
    x: 6.82,
    y: 0.84,
    w: 2.2,
    h: 2.2,
    line: { color: "F6EBDD", pt: 2.4 },
    fill: { color: "F6EBDD", transparency: 100 },
    adjustPoint: 0.23
  }, {
    group: "background",
    skipBounds: true,
    skipOverlap: true
  });

  canvas.addShape("cover-cream-block", pres.ShapeType.roundRect, {
    x: 6.95,
    y: 2.24,
    w: 2.1,
    h: 1.82,
    rectRadius: 0.08,
    line: { color: "F8EFE2", transparency: 100 },
    fill: { color: "F8EFE2", transparency: 4 }
  }, {
    group: "background",
    skipBounds: true,
    skipOverlap: true
  });

  if (coverPhotoPath) {
    canvas.addImage("cover-photo", {
      path: coverPhotoPath,
      x: 6.95,
      y: 2.24,
      w: 2.1,
      h: 1.41
    }, {
      group: "cover-photo",
      skipOverlap: true
    });

    canvas.addShape("cover-photo-credit-band", pres.ShapeType.roundRect, {
      x: 6.95,
      y: 3.8,
      w: 2.1,
      h: 0.26,
      rectRadius: 0.04,
      line: { color: "F8EFE2", transparency: 100 },
      fill: { color: "F8EFE2" }
    }, {
      group: "cover-photo",
      skipOverlap: true
    });

    canvas.addText("cover-photo-attribution", "Photo: jackmac34 / Pixabay", {
      x: 7.08,
      y: 3.86,
      w: 1.88,
      h: 0.14,
      fontFace: bodyFont,
      fontSize: 7.4,
      color: theme.secondary,
      align: "right",
      margin: 0
    }, {
      group: "cover-photo",
      skipOverlap: true
    });
  }

  canvas.addText("cover-eyebrow", "French Cheese Shop", {
    x: 0.72,
    y: 0.68,
    w: 2.8,
    h: 0.24,
    fontFace: bodyFont,
    fontSize: 12,
    bold: true,
    color: theme.secondary,
    charSpace: 1.4,
    allCaps: true,
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-title", slideConfig.title, {
    x: 0.72,
    y: 1.1,
    w: 5.4,
    h: 1.02,
    fontFace: displayFont,
    fontSize: 28,
    color: theme.primary,
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-subtitle", "A French cheese shop live demo shows how AI systems must interpret vague requests, depend on domain knowledge, and be evaluated under uncertainty.", {
    x: 0.74,
    y: 2.2,
    w: 4.9,
    h: 0.74,
    fontFace: bodyFont,
    fontSize: 12.4,
    color: "4F6277",
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-author", "Juho Vepsäläinen", {
    x: 0.74,
    y: 3.88,
    w: 2.6,
    h: 0.22,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-date", "6.5.2026", {
    x: 0.74,
    y: 4.14,
    w: 1.6,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 10.2,
    color: "6B7C90",
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-demo-link", `Live demo: ${liveDemoUrl}`, {
    x: 0.74,
    y: 4.48,
    w: 5.2,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 8.8,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-side-label", "Ambiguity\nData\nEvaluation", {
    x: 7.02,
    y: 1.42,
    w: 1.4,
    h: 0.78,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: "FFFFFF",
    margin: 0
  }, {
    group: "cover-side"
  });

  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

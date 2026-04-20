const fs = require("fs");
const path = require("path");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

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
    h: 1.56,
    rectRadius: 0.08,
    line: { color: "F8EFE2", transparency: 100 },
    fill: { color: "F8EFE2", transparency: 4 }
  }, {
    group: "background",
    skipBounds: true,
    skipOverlap: true
  });

  if (coverPhotoPath) {
    slide.addImage({
      path: coverPhotoPath,
      x: 6.95,
      y: 2.24,
      w: 2.1,
      h: 1.56
    });

    canvas.addText("cover-photo-attribution", "Photo: jackmac34 / Pixabay", {
      x: 7.02,
      y: 3.62,
      w: 1.88,
      h: 0.14,
      fontFace: bodyFont,
      fontSize: 7.4,
      color: "FFF7EC",
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
    h: 0.9,
    fontFace: displayFont,
    fontSize: 28,
    color: theme.primary,
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-subtitle", "A French cheese shop exposes how AI systems must interpret vague requests, depend on domain knowledge, and be evaluated under uncertainty.", {
    x: 0.74,
    y: 2.2,
    w: 4.9,
    h: 0.64,
    fontFace: bodyFont,
    fontSize: 12.4,
    color: "4F6277",
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-aim", "Requirements shift from fixed functions toward interpretation, data, evaluation, and evolving architectural assumptions.", {
    x: 0.74,
    y: 3.2,
    w: 4.95,
    h: 0.74,
    fontFace: bodyFont,
    fontSize: 11.1,
    color: "607286",
    margin: 0
  }, {
    group: "cover-copy"
  });

  canvas.addText("cover-side-number", "01", {
    x: 6.96,
    y: 4.38,
    w: 1.2,
    h: 0.42,
    fontFace: bodyFont,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
    margin: 0
  }, {
    group: "cover-side"
  });

  canvas.addText("cover-side-label", "Ambiguity\nData\nEvaluation", {
    x: 7.02,
    y: 1.82,
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

  canvas.addText("cover-side-note", "Prompt:\n\"Something like Brie,\nbut stronger.\"", {
    x: 7.16,
    y: 2.56,
    w: 1.55,
    h: 0.92,
    fontFace: bodyFont,
    fontSize: 10.8,
    color: "F3E7D8",
    margin: 0
  }, {
    group: "cover-side"
  });

  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

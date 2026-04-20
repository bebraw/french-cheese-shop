const fs = require("fs");
const path = require("path");
const { addPageBadge } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "closing",
  index: 19,
  title: "Questions and Comments"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  const coverPhotoCandidates = [
    path.join(__dirname, "imgs", "jackmac34-normandy-2068748_1920.jpg"),
    path.join(__dirname, "imgs", "pixabay-normandy-camembert-jackmac34.jpg")
  ];
  const briePhotoCandidates = [
    path.join(__dirname, "imgs", "lee_2-cheese-630511_1920.jpg"),
    path.join(__dirname, "imgs", "pixabay-brie-lee_2.jpg")
  ];
  const coverPhotoPath = coverPhotoCandidates.find((candidate) => fs.existsSync(candidate));
  const briePhotoPath = briePhotoCandidates.find((candidate) => fs.existsSync(candidate));
  slide.background = { color: theme.bg };

  canvas.addShape("qa-left-frame", pres.ShapeType.roundRect, {
    x: 0.58,
    y: 0.56,
    w: 2.18,
    h: 4.18,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "F8EFE2" }
  }, {
    group: "qa-left-frame"
  });

  if (coverPhotoPath) {
    slide.addImage({
      path: coverPhotoPath,
      x: 0.58,
      y: 0.56,
      w: 2.18,
      h: 4.18
    });
  }

  canvas.addShape("qa-left-overlay", pres.ShapeType.roundRect, {
    x: 0.58,
    y: 0.56,
    w: 2.18,
    h: 4.18,
    rectRadius: 0.08,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary, transparency: coverPhotoPath ? 34 : 0 }
  }, {
    group: "qa-left-frame"
  });

  canvas.addShape("qa-left-credit-band", pres.ShapeType.roundRect, {
    x: 0.58,
    y: 4.82,
    w: 2.18,
    h: 0.24,
    rectRadius: 0.04,
    line: { color: "F1E5D7", transparency: 100 },
    fill: { color: "F8EFE2" }
  }, {
    group: "qa-left-frame",
    skipOverlap: true
  });

  canvas.addText("qa-left-attribution", "Photo: jackmac34 / Pixabay", {
    x: 0.72,
    y: 4.88,
    w: 1.78,
    h: 0.12,
    fontFace: bodyFont,
    fontSize: 7.2,
    color: theme.secondary,
    align: "right",
    margin: 0
  }, {
    group: "qa-left-frame",
    skipOverlap: true
  });

  canvas.addShape("qa-right-frame", pres.ShapeType.roundRect, {
    x: 7.24,
    y: 0.56,
    w: 2.18,
    h: 4.18,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "F7E9EB" }
  }, {
    group: "qa-right-frame"
  });

  if (briePhotoPath) {
    slide.addImage({
      path: briePhotoPath,
      x: 7.24,
      y: 0.56,
      w: 2.18,
      h: 4.18
    });
  }

  canvas.addShape("qa-right-overlay", pres.ShapeType.roundRect, {
    x: 7.24,
    y: 0.56,
    w: 2.18,
    h: 4.18,
    rectRadius: 0.08,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary, transparency: briePhotoPath ? 38 : 0 }
  }, {
    group: "qa-right-frame"
  });

  canvas.addShape("qa-right-credit-band", pres.ShapeType.roundRect, {
    x: 7.24,
    y: 4.82,
    w: 2.18,
    h: 0.24,
    rectRadius: 0.04,
    line: { color: "F2E4E6", transparency: 100 },
    fill: { color: "F7E9EB" }
  }, {
    group: "qa-right-frame",
    skipOverlap: true
  });

  canvas.addText("qa-right-attribution", "Photo: lee_2 / Pixabay", {
    x: 7.38,
    y: 4.88,
    w: 1.78,
    h: 0.12,
    fontFace: bodyFont,
    fontSize: 7.2,
    color: theme.secondary,
    align: "right",
    margin: 0
  }, {
    group: "qa-right-frame",
    skipOverlap: true
  });

  canvas.addShape("qa-center-card", pres.ShapeType.roundRect, {
    x: 2.98,
    y: 1.18,
    w: 3.94,
    h: 3.22,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "qa-center-card"
  });

  canvas.addText("qa-eyebrow", "Discussion", {
    x: 3.48,
    y: 1.7,
    w: 2.94,
    h: 0.22,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: theme.secondary,
    align: "center",
    charSpace: 1.1,
    allCaps: true,
    margin: 0
  }, {
    group: "qa-center-card"
  });

  canvas.addText("qa-title", slideConfig.title, {
    x: 3.36,
    y: 1.98,
    w: 3.18,
    h: 0.88,
    fontFace: displayFont,
    fontSize: 22,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "qa-center-card"
  });

  canvas.addText("qa-body", "Thank you.\nI would be glad to discuss the example, the RE implications, or the teaching choices.", {
    x: 3.48,
    y: 3.06,
    w: 2.94,
    h: 0.72,
    fontFace: bodyFont,
    fontSize: 10.8,
    color: "586A7F",
    align: "center",
    margin: 0
  }, {
    group: "qa-center-card"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

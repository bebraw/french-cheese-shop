const fs = require("fs");
const path = require("path");
const { addPageBadge } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "closing",
  index: 25,
  title: "Questions and Comments"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  const photoWidth = 2.52;
  const photoHeight = 1.68;
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
    x: 0.74,
    y: 3.28,
    w: photoWidth,
    h: photoHeight,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "F8EFE2" }
  }, {
    group: "qa-left-frame"
  });

  if (coverPhotoPath) {
    slide.addImage({
      path: coverPhotoPath,
      x: 0.74,
      y: 3.28,
      w: photoWidth,
      h: photoHeight
    });
  }

  canvas.addShape("qa-left-overlay", pres.ShapeType.roundRect, {
    x: 0.74,
    y: 3.28,
    w: photoWidth,
    h: photoHeight,
    rectRadius: 0.08,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary, transparency: coverPhotoPath ? 26 : 0 }
  }, {
    group: "qa-left-frame"
  });

  canvas.addShape("qa-left-credit-band", pres.ShapeType.roundRect, {
    x: 0.74,
    y: 4.98,
    w: photoWidth,
    h: 0.24,
    rectRadius: 0.04,
    line: { color: "F1E5D7", transparency: 100 },
    fill: { color: "F8EFE2" }
  }, {
    group: "qa-left-frame",
    skipOverlap: true
  });

  canvas.addText("qa-left-attribution", "Photo: jackmac34 / Pixabay", {
    x: 0.92,
    y: 5.04,
    w: 2.08,
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
    x: 6.74,
    y: 3.28,
    w: photoWidth,
    h: photoHeight,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "F7E9EB" }
  }, {
    group: "qa-right-frame"
  });

  if (briePhotoPath) {
    slide.addImage({
      path: briePhotoPath,
      x: 6.74,
      y: 3.28,
      w: photoWidth,
      h: photoHeight
    });
  }

  canvas.addShape("qa-right-overlay", pres.ShapeType.roundRect, {
    x: 6.74,
    y: 3.28,
    w: photoWidth,
    h: photoHeight,
    rectRadius: 0.08,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary, transparency: briePhotoPath ? 30 : 0 }
  }, {
    group: "qa-right-frame"
  });

  canvas.addShape("qa-right-credit-band", pres.ShapeType.roundRect, {
    x: 6.74,
    y: 4.98,
    w: photoWidth,
    h: 0.24,
    rectRadius: 0.04,
    line: { color: "F2E4E6", transparency: 100 },
    fill: { color: "F7E9EB" }
  }, {
    group: "qa-right-frame",
    skipOverlap: true
  });

  canvas.addText("qa-right-attribution", "Photo: lee_2 / Pixabay", {
    x: 6.92,
    y: 5.04,
    w: 2.08,
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

  canvas.addText("qa-title", slideConfig.title, {
    x: 2.1,
    y: 1.7,
    w: 5.8,
    h: 1.1,
    fontFace: displayFont,
    fontSize: 28,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "qa-title"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

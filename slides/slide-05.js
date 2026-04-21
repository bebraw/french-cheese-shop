const path = require("path");
const { addPageBadge, addSectionTitle, liveDemoUrl } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "content",
  index: 13,
  title: "Live Demo"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  const qrImagePath = path.join(__dirname, "imgs", "live-demo-qr.png");
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Demo",
    slideConfig.title,
    "We will walk the hidden requirements, data requirements, and evaluation questions through the deployed cheese shop demo."
  );

  canvas.addShape("demo-card", pres.ShapeType.roundRect, {
    x: 1.02,
    y: 2.08,
    w: 7.92,
    h: 2.58,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "demo-card"
  });

  canvas.addText("demo-label", "Open the demo", {
    x: 1.44,
    y: 2.56,
    w: 2.2,
    h: 0.24,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group: "demo-card"
  });

  canvas.addText("demo-scan-label", "Scan the QR code", {
    x: 6.42,
    y: 2.42,
    w: 1.42,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 9.8,
    bold: true,
    color: theme.secondary,
    align: "center",
    margin: 0
  }, {
    group: "demo-card"
  });

  slide.addImage({
    path: qrImagePath,
    x: 6.26,
    y: 2.7,
    w: 1.72,
    h: 1.72
  });

  canvas.addText("demo-url", liveDemoUrl.replace(/^https?:\/\//, ""), {
    x: 1.44,
    y: 2.96,
    w: 4.42,
    h: 0.78,
    fontFace: displayFont,
    fontSize: 18.5,
    color: theme.primary,
    margin: 0
  }, {
    group: "demo-card"
  });

  canvas.addText("demo-note", "We will use the live system to surface the three challenge areas before moving to the main claim.", {
    x: 1.44,
    y: 3.84,
    w: 4.5,
    h: 0.44,
    fontFace: bodyFont,
    fontSize: 10.4,
    color: "5E7185",
    margin: 0
  }, {
    group: "demo-card"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

const { addPageBadge, addSectionTitle, liveDemoUrl } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 13,
  title: "Live Demo"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
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
    w: 1.9,
    h: 0.24,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group: "demo-card"
  });

  canvas.addText("demo-url", liveDemoUrl.replace(/^https?:\/\//, ""), {
    x: 1.44,
    y: 2.96,
    w: 6.98,
    h: 0.5,
    fontFace: displayFont,
    fontSize: 21,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "demo-card"
  });

  canvas.addText("demo-note", "We will use the live system to surface the three challenge areas before moving to the main claim.", {
    x: 1.54,
    y: 3.84,
    w: 6.76,
    h: 0.32,
    fontFace: bodyFont,
    fontSize: 10.4,
    color: "5E7185",
    align: "center",
    margin: 0
  }, {
    group: "demo-card"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

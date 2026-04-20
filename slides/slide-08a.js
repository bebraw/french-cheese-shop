const { addPageBadge, addReferenceNote, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 21,
  title: "AI Changes RE"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Main Claim",
    slideConfig.title,
    null
  );

  canvas.addShape("claim-card", pres.ShapeType.roundRect, {
    x: 1.02,
    y: 2.12,
    w: 7.94,
    h: 2.56,
    rectRadius: 0.08,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "claim-card"
  });

  canvas.addText("claim-line-1", "AI changes requirements engineering", {
    x: 1.44,
    y: 2.62,
    w: 7.08,
    h: 0.46,
    fontFace: displayFont,
    fontSize: 22,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "claim-card"
  });

  canvas.addText("claim-line-2", "from specifying system functions", {
    x: 1.52,
    y: 3.16,
    w: 6.92,
    h: 0.34,
    fontFace: bodyFont,
    fontSize: 14,
    bold: true,
    color: theme.secondary,
    align: "center",
    margin: 0
  }, {
    group: "claim-card"
  });

  canvas.addText("claim-line-3", "to shaping behavior, learning, and evaluation.", {
    x: 1.36,
    y: 3.58,
    w: 7.24,
    h: 0.4,
    fontFace: bodyFont,
    fontSize: 14,
    bold: true,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "claim-card"
  });

  addReferenceNote(canvas, theme, "Sources: [1] Nuseibeh & Easterbrook (2000); [3] Seneviratne et al. (2022)");
  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

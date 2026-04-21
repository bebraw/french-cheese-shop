const { addPageBadge } = require("../generator/helpers");
const { displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "closing",
  index: 15,
  title: "Questions and Comments"
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  canvas.addShape("qa-accent-line", pres.ShapeType.line, {
    x: 3.44,
    y: 3.0,
    w: 3.12,
    h: 0,
    line: { color: theme.accent, pt: 1.4 }
  }, {
    group: "qa-accent-line"
  });

  canvas.addText("qa-title", slideConfig.title, {
    x: 1.44,
    y: 2.08,
    w: 5.8,
    h: 1.1,
    fontFace: displayFont,
    fontSize: 30,
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

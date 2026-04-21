const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "summary",
  index: 23,
  title: "Closing Synthesis"
};

function addTakeaway(canvas, pres, theme, x, title, body, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y: 2.28,
    w: 2.72,
    h: 1.92,
    rectRadius: 0.06,
    line: { color: "E5D5C0", pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.18,
    y: 2.52,
    w: 1.9,
    h: 0.22,
    fontFace: displayFont,
    fontSize: 17,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.18,
    y: 2.9,
    w: 2.16,
    h: 0.7,
    fontFace: bodyFont,
    fontSize: 10.5,
    color: "5F7084",
    margin: 0
  }, {
    group
  });
}

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Closing",
    slideConfig.title,
    "The main takeaway is that AI changes both what teams must describe and how they decide whether the system works well."
  );

  addTakeaway(canvas, pres, theme, 0.62, "Interpretation", "Requirements must describe the hidden meaning inside user requests, not only the words on the screen.", "takeaway-interpretation");
  addTakeaway(canvas, pres, theme, 3.64, "Artifacts", "Data structures, prompts, and design records all become part of the requirements work.", "takeaway-artifacts");
  addTakeaway(canvas, pres, theme, 6.66, "Evaluation", "Success shifts from simple correctness toward usefulness, trust, and observable quality.", "takeaway-evaluation");

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

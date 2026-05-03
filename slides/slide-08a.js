const { addPageBadge, addReferenceNote } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "content",
  index: 14,
  title: "Requirements Under Uncertainty",
};

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  canvas.addShape(
    "claim-card",
    pres.ShapeType.roundRect,
    {
      x: 1.02,
      y: 1.58,
      w: 7.94,
      h: 2.56,
      rectRadius: 0.08,
      line: { color: theme.light, pt: 1.05 },
      fill: { color: "FFFDFC" },
    },
    {
      group: "claim-card",
    },
  );

  canvas.addText(
    "claim-line-1",
    "When systems interpret, requirements must cover uncertainty.",
    {
      x: 1.44,
      y: 2.2,
      w: 7.08,
      h: 0.74,
      fontFace: displayFont,
      fontSize: 18.5,
      color: theme.primary,
      align: "center",
      margin: 0,
    },
    {
      group: "claim-card",
    },
  );

  canvas.addText(
    "claim-line-2",
    "That means covering explicit needs, domain data, and visible evaluation checks.",
    {
      x: 1.58,
      y: 3.16,
      w: 6.8,
      h: 0.56,
      fontFace: bodyFont,
      fontSize: 11.8,
      color: "5B6D83",
      align: "center",
      margin: 0,
    },
    {
      group: "claim-card",
    },
  );

  addReferenceNote(
    canvas,
    theme,
    "Sources: [1] Nuseibeh & Easterbrook (2000); [3]-[6]",
    {
      w: 5.8,
    },
  );
  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { references } = require("../generator/references");
const { bodyFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "references",
  index: 19,
  title: "References"
};

function addReferenceBlock(canvas, pres, theme, x, y, ref, group, textWidth) {
  canvas.addShape(`${group}-badge`, pres.ShapeType.ellipse, {
    x,
    y,
    w: 0.3,
    h: 0.3,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group
  });

  canvas.addText(`${group}-badge-text`, `[${ref.id}]`, {
    x: x - 0.1,
    y: y + 0.06,
    w: 0.5,
    h: 0.17,
    fontFace: bodyFont,
    fontSize: 8.1,
    bold: true,
    color: "FFFFFF",
    align: "center",
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-text`, ref.text, {
    x: x + 0.42,
    y: y - 0.02,
    w: textWidth,
    h: 0.74,
    fontFace: bodyFont,
    fontSize: 7.1,
    color: "586A80",
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
    null,
    slideConfig.title,
    null
  );

  canvas.addShape("references-panel", pres.ShapeType.roundRect, {
    x: 0.86,
    y: 1.66,
    w: 8.28,
    h: 3.58,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "references-panel",
    skipOverlap: true
  });

  canvas.addText("references-list-title", "Cited sources", {
    x: 1.18,
    y: 1.9,
    w: 2.04,
    h: 0.22,
    fontFace: bodyFont,
    fontSize: 11.2,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "references-panel"
  });

  addReferenceBlock(canvas, pres, theme, 1.18, 2.34, references[0], "reference-1", 3.18);
  addReferenceBlock(canvas, pres, theme, 1.18, 3.26, references[1], "reference-2", 3.18);
  addReferenceBlock(canvas, pres, theme, 1.18, 4.18, references[2], "reference-3", 3.18);
  addReferenceBlock(canvas, pres, theme, 5.08, 2.34, references[3], "reference-4", 3.18);
  addReferenceBlock(canvas, pres, theme, 5.08, 3.26, references[4], "reference-5", 3.18);
  addReferenceBlock(canvas, pres, theme, 5.08, 4.18, references[5], "reference-6", 3.18);

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

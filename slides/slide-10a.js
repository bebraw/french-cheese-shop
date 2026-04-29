const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { references } = require("../generator/references");
const { bodyFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "references",
  index: 16,
  title: "References"
};

function addReferenceBlock(canvas, pres, theme, x, y, ref, group, textWidth) {
  canvas.addShape(`${group}-badge`, pres.ShapeType.ellipse, {
    x,
    y,
    w: 0.34,
    h: 0.34,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group
  });

  canvas.addText(`${group}-badge-text`, `[${ref.id}]`, {
    x: x - 0.08,
    y: y + 0.07,
    w: 0.5,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 8.8,
    bold: true,
    color: "FFFFFF",
    align: "center",
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-text`, ref.text, {
    x: x + 0.5,
    y: y - 0.02,
    w: textWidth,
    h: 0.54,
    fontFace: bodyFont,
    fontSize: 7.8,
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
    y: 1.78,
    w: 8.28,
    h: 3.44,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "references-panel",
    skipOverlap: true
  });

  canvas.addText("references-list-title", "Cited sources", {
    x: 1.18,
    y: 2.02,
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

  addReferenceBlock(canvas, pres, theme, 1.18, 2.42, references[0], "reference-1", 6.98);
  addReferenceBlock(canvas, pres, theme, 1.18, 3.16, references[1], "reference-2", 6.98);
  addReferenceBlock(canvas, pres, theme, 1.18, 3.9, references[2], "reference-3", 6.98);
  addReferenceBlock(canvas, pres, theme, 1.18, 4.64, references[3], "reference-4", 6.98);

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

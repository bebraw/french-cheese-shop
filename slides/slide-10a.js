const { addPageBadge, addSectionTitle } = require("./helpers");
const { references } = require("./references");
const { bodyFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "references",
  index: 23,
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
    h: 0.78,
    fontFace: bodyFont,
    fontSize: 8.7,
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
    "References",
    slideConfig.title,
    "The slides cite [1]-[3]. [4]-[5] are useful background reading for a first MSc course in requirements engineering."
  );

  canvas.addShape("references-left-panel", pres.ShapeType.roundRect, {
    x: 0.62,
    y: 2.0,
    w: 4.26,
    h: 2.84,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "references-left-panel",
    skipOverlap: true
  });

  canvas.addShape("references-right-panel", pres.ShapeType.roundRect, {
    x: 5.02,
    y: 2.0,
    w: 4.0,
    h: 2.84,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group: "references-right-panel",
    skipOverlap: true
  });

  canvas.addText("references-left-title", "Cited in slides", {
    x: 0.92,
    y: 2.22,
    w: 1.76,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 11.2,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "references-left-panel"
  });

  canvas.addText("references-right-title", "Background reading", {
    x: 5.3,
    y: 2.22,
    w: 2.04,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 11.2,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "references-right-panel"
  });

  addReferenceBlock(canvas, pres, theme, 0.92, 2.62, references[0], "reference-1", 3.1);
  addReferenceBlock(canvas, pres, theme, 0.92, 3.42, references[1], "reference-2", 3.1);
  addReferenceBlock(canvas, pres, theme, 0.92, 4.22, references[2], "reference-3", 3.1);
  addReferenceBlock(canvas, pres, theme, 5.3, 2.62, references[3], "reference-4", 2.92);
  addReferenceBlock(canvas, pres, theme, 5.3, 3.42, references[4], "reference-5", 2.92);

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

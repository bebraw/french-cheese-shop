const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 12,
  title: "Challenge 2: Data Becomes Requirement"
};

function addSourceCard(canvas, pres, x, y, title, body, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 2.38,
    h: 0.94,
    rectRadius: 0.05,
    line: { color: "D9C6AF", pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: y + 0.14,
    w: 1.5,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 10.8,
    bold: true,
    color: "A15D32",
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.16,
    y: y + 0.4,
    w: 1.9,
    h: 0.36,
    fontFace: bodyFont,
    fontSize: 9.8,
    color: "607185",
    margin: 0
  }, {
    group
  });
}

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  slide.background = { color: "FFFDFC" };

  addSectionTitle(
    canvas,
    theme,
    "Challenge 2",
    slideConfig.title,
    "The system cannot reason about cheese by prompt alone. It needs curated knowledge, domain distinctions, and an explicit representation of meaning."
  );

  addSourceCard(canvas, pres, 0.62, 2.08, "Product catalog", "Milk, region, age,\ntexture, rind, stock", "source-catalog");
  addSourceCard(canvas, pres, 0.62, 3.18, "Interaction data", "Accepted choices,\nrejections, profiles", "source-interaction");
  addSourceCard(canvas, pres, 0.62, 4.28, "Expert knowledge", "Shopkeeper heuristics\nand pairings", "source-expert");

  canvas.addShape("graph-panel", pres.ShapeType.roundRect, {
    x: 4.06,
    y: 2.02,
    w: 5.0,
    h: 2.98,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.1 },
    fill: { color: "F7F1E7" }
  }, {
    group: "graph-panel",
    skipOverlap: true
  });

  canvas.addText("graph-title", "Ontology / knowledge graph lens", {
    x: 4.34,
    y: 2.26,
    w: 4.0,
    h: 0.4,
    fontFace: displayFont,
    fontSize: 16,
    color: theme.primary,
    margin: 0
  }, {
    group: "graph-panel"
  });

  canvas.addShape("node-request", pres.ShapeType.ellipse, {
    x: 4.44,
    y: 3.12,
    w: 1.05,
    h: 0.54,
    line: { color: theme.secondary, pt: 1.1 },
    fill: { color: "F7E5E7" }
  }, {
    group: "graph-request"
  });

  canvas.addText("node-request-text", "request", {
    x: 4.7,
    y: 3.28,
    w: 0.52,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.4,
    bold: true,
    color: theme.secondary,
    align: "center",
    margin: 0
  }, {
    group: "graph-request"
  });

  canvas.addShape("node-brie", pres.ShapeType.ellipse, {
    x: 6.03,
    y: 2.52,
    w: 1.16,
    h: 0.54,
    line: { color: theme.primary, pt: 1.1 },
    fill: { color: "E7EEF5" }
  }, {
    group: "graph-brie"
  });

  canvas.addText("node-brie-text", "Brie-like", {
    x: 6.26,
    y: 2.68,
    w: 0.72,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.2,
    bold: true,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "graph-brie"
  });

  canvas.addShape("node-strength", pres.ShapeType.ellipse, {
    x: 6.08,
    y: 3.72,
    w: 1.12,
    h: 0.54,
    line: { color: theme.accent, pt: 1.1 },
    fill: { color: "F7EEDB" }
  }, {
    group: "graph-strength"
  });

  canvas.addText("node-strength-text", "stronger", {
    x: 6.3,
    y: 3.88,
    w: 0.68,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.2,
    bold: true,
    color: "8D651A",
    align: "center",
    margin: 0
  }, {
    group: "graph-strength"
  });

  canvas.addShape("node-choice", pres.ShapeType.ellipse, {
    x: 7.72,
    y: 3.12,
    w: 1.0,
    h: 0.54,
    line: { color: theme.secondary, pt: 1.1 },
    fill: { color: "F7E5E7" }
  }, {
    group: "graph-choice"
  });

  canvas.addText("node-choice-text", "choice", {
    x: 7.98,
    y: 3.28,
    w: 0.48,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.2,
    bold: true,
    color: theme.secondary,
    align: "center",
    margin: 0
  }, {
    group: "graph-choice"
  });

  canvas.addText("graph-caption", "In AI-enabled RE, the data model is not peripheral. It is part of the requirement artifact.", {
    x: 4.36,
    y: 4.56,
    w: 4.28,
    h: 0.34,
    fontFace: bodyFont,
    fontSize: 10,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "graph-caption"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

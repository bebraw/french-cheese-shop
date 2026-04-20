const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 14,
  title: "ADRs as Control Points"
};

function addListItem(canvas, pres, theme, y, title, body, group) {
  canvas.addShape(`${group}-bullet`, pres.ShapeType.ellipse, {
    x: 0.74,
    y,
    w: 0.22,
    h: 0.22,
    line: { color: "C6933F", transparency: 100 },
    fill: { color: "C6933F" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: 1.08,
    y: y - 0.01,
    w: 2.5,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 11.6,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: 1.08,
    y: y + 0.24,
    w: 2.7,
    h: 0.38,
    fontFace: bodyFont,
    fontSize: 9.8,
    color: "5E7185",
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
    "Architecture",
    slideConfig.title,
    "ADRs matter here not as static architecture records, but as evolving control points for uncertain behavior."
  );

  addListItem(canvas, pres, theme, 2.04, "Reframe the artifact", "Capture assumptions, evaluation, and guardrails, not only a tool choice.", "adr-item-1");
  addListItem(canvas, pres, theme, 3.06, "Connect RE to implementation", "Link quality goals to prompts, ranking logic, and validation criteria.", "adr-item-2");
  addListItem(canvas, pres, theme, 4.08, "Keep it falsifiable", "Accepted means acceptable under current evaluation, not correct forever.", "adr-item-3");

  canvas.addShape("adr-card", pres.ShapeType.roundRect, {
    x: 5.28,
    y: 2.02,
    w: 3.72,
    h: 2.92,
    rectRadius: 0.06,
    line: { color: theme.primary, pt: 1.1 },
    fill: { color: "F6F0E7" }
  }, {
    group: "adr-card"
  });

  canvas.addText("adr-title", "ADR: matching strategy", {
    x: 5.56,
    y: 2.24,
    w: 2.62,
    h: 0.32,
    fontFace: displayFont,
    fontSize: 15.5,
    color: theme.primary,
    margin: 0
  }, {
    group: "adr-card"
  });

  canvas.addText("adr-body", "Context: ambiguous requests\nDecision: embeddings + reranking\nEvaluation: Top-3 relevance >= 80%\nGuardrails: stock and domain fit", {
    x: 5.56,
    y: 2.62,
    w: 2.72,
    h: 1.82,
    fontFace: bodyFont,
    fontSize: 9.4,
    color: "586A80",
    margin: 0
  }, {
    group: "adr-card"
  });

  canvas.addText("adr-footer", "Accepted under current evaluation.", {
    x: 5.56,
    y: 4.56,
    w: 2.62,
    h: 0.32,
    fontFace: bodyFont,
    fontSize: 9,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group: "adr-card"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

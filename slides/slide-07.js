const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 15,
  title: "Evaluation Under Uncertainty"
};

function addPipelineNode(canvas, pres, x, title, body, fill, line, group) {
  canvas.addShape(`${group}-box`, pres.ShapeType.roundRect, {
    x,
    y: 2.64,
    w: 1.52,
    h: 1.02,
    rectRadius: 0.05,
    line: { color: line, pt: 1.1 },
    fill: { color: fill }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: 2.82,
    w: 1.1,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 10.4,
    bold: true,
    color: line,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.16,
    y: 3.08,
    w: 1.08,
    h: 0.36,
    fontFace: bodyFont,
    fontSize: 9.1,
    color: "5D6F84",
    margin: 0
  }, {
    group
  });
}

function addMetric(canvas, pres, theme, x, title, value, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y: 4.42,
    w: 1.85,
    h: 0.62,
    rectRadius: 0.05,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addText(`${group}-value`, value, {
    x: x + 0.16,
    y: 4.58,
    w: 0.58,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 12.4,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.78,
    y: 4.58,
    w: 0.8,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 10.2,
    color: "5F7286",
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
    "Challenge 3",
    slideConfig.title,
    "The question is no longer only whether the feature runs. It is whether the behavior is relevant, trusted, and good enough."
  );

  addPipelineNode(canvas, pres, 0.58, "User input", "vague language", "FFFFFF", theme.secondary, "pipeline-input");
  addPipelineNode(canvas, pres, 2.2, "Interpret", "latent meaning", "F7F1E7", theme.primary, "pipeline-interpret");
  addPipelineNode(canvas, pres, 3.82, "Knowledge", "catalog + ontology", "FFFFFF", "A15D32", "pipeline-knowledge");
  addPipelineNode(canvas, pres, 5.44, "Recommend", "rank + explain", "F7F1E7", theme.secondary, "pipeline-recommend");
  addPipelineNode(canvas, pres, 7.06, "Feedback", "accept or reject", "FFFFFF", theme.primary, "pipeline-feedback");

  canvas.addText("pipeline-question", "Was the system wrong if it recommended Roquefort and the user hated it?", {
    x: 0.8,
    y: 2.08,
    w: 7.2,
    h: 0.34,
    fontFace: displayFont,
    fontSize: 14,
    color: theme.primary,
    margin: 0
  }, {
    group: "pipeline-question"
  });

  addMetric(canvas, pres, theme, 0.76, "precision", "Top-3", "metric-precision");
  addMetric(canvas, pres, theme, 2.9, "relevance", "fit", "metric-relevance");
  addMetric(canvas, pres, theme, 5.04, "trust", "why", "metric-trust");
  addMetric(canvas, pres, theme, 7.18, "reuse", "repeat", "metric-satisfaction");

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 2,
  title: "Learning Outcomes"
};

function addOutcomeCard(canvas, pres, theme, x, y, index, title, body, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 4.02,
    h: 1.24,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addShape(`${group}-badge`, pres.ShapeType.ellipse, {
    x: x + 0.22,
    y: y + 0.18,
    w: 0.38,
    h: 0.38,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group
  });

  canvas.addText(`${group}-index`, String(index), {
    x: x + 0.22,
    y: y + 0.18,
    w: 0.38,
    h: 0.38,
    fontFace: bodyFont,
    fontSize: 10.5,
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle",
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.76,
    y: y + 0.16,
    w: 2.7,
    h: 0.32,
    fontFace: displayFont,
    fontSize: 15.5,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.76,
    y: y + 0.56,
    w: 2.84,
    h: 0.38,
    fontFace: bodyFont,
    fontSize: 9.8,
    color: "5B6D83",
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
    "Session Focus",
    slideConfig.title,
    "By the end of the presentation, the audience should be able to connect AI capabilities to concrete changes in requirements work."
  );

  addOutcomeCard(
    canvas,
    pres,
    theme,
    0.62,
    2.08,
    1,
    "Interpret vague requests",
    "Show why natural language creates latent requirements that must be made explicit.",
    "outcome-interpret"
  );

  addOutcomeCard(
    canvas,
    pres,
    theme,
    5.0,
    2.08,
    2,
    "Treat data as artifact",
    "Show why domain knowledge, data, and ontologies belong in requirement work.",
    "outcome-data"
  );

  addOutcomeCard(
    canvas,
    pres,
    theme,
    0.62,
    3.52,
    3,
    "Evaluate uncertainty",
    "Move beyond binary correctness toward relevance, trust, and user satisfaction.",
    "outcome-evaluate"
  );

  addOutcomeCard(
    canvas,
    pres,
    theme,
    5.0,
    3.52,
    4,
    "Use controls",
    "Explain how guardrails, ADRs, and evaluation support AI-enabled systems.",
    "outcome-control"
  );

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

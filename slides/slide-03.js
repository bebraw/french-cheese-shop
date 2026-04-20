const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "toc",
  index: 3,
  title: "Key Topics and Timing"
};

function addTimelineCard(canvas, pres, theme, x, y, title, body, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 4.05,
    h: 1.12,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.1 },
    fill: { color: "FFFFFF" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.22,
    y: y + 0.18,
    w: 2.9,
    h: 0.28,
    fontFace: displayFont,
    fontSize: 16,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.22,
    y: y + 0.48,
    w: 3.16,
    h: 0.36,
    fontFace: bodyFont,
    fontSize: 10,
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
    "Overview",
    slideConfig.title,
    "The presentation moves from one ambiguous customer request to the broader requirements questions raised by AI-enabled systems."
  );

  addTimelineCard(canvas, pres, theme, 0.62, 2.04, "Ambiguous request", "What does 'like Brie, but stronger' actually mean?", "roadmap-hook");
  addTimelineCard(canvas, pres, theme, 5.02, 2.04, "RE shift", "From deterministic functions to uncertain behavior.", "roadmap-shift");
  addTimelineCard(canvas, pres, theme, 0.62, 3.36, "Three challenges", "Latent meaning, domain data, and evaluation quality.", "roadmap-challenges");
  addTimelineCard(canvas, pres, theme, 5.02, 3.36, "Architectural control", "ADRs, guardrails, and continuous evaluation.", "roadmap-close");

  canvas.addText("roadmap-footer", "Running example: French cheese shop recommendations.", {
    x: 0.68,
    y: 4.82,
    w: 4.3,
    h: 0.3,
    fontFace: bodyFont,
    fontSize: 9.8,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group: "roadmap-footer"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

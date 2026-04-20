const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "toc",
  index: 3,
  title: "20-Minute Roadmap"
};

function addTimelineCard(canvas, pres, theme, x, y, minutes, title, body, group) {
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

  canvas.addText(`${group}-minutes`, minutes, {
    x: x + 0.22,
    y: y + 0.18,
    w: 0.75,
    h: 0.22,
    fontFace: bodyFont,
    fontSize: 12,
    bold: true,
    color: theme.accent,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 1.06,
    y: y + 0.16,
    w: 2.45,
    h: 0.28,
    fontFace: displayFont,
    fontSize: 16,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 1.06,
    y: y + 0.46,
    w: 2.62,
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
    "Flow",
    slideConfig.title,
    "Keep the pace explicit so the teaching proof feels intentional: one hook, one conceptual shift, three challenges, one synthesis."
  );

  addTimelineCard(canvas, pres, theme, 0.62, 2.04, "02 min", "Hook", "Cheese request reveals ambiguity.", "roadmap-hook");
  addTimelineCard(canvas, pres, theme, 5.02, 2.04, "04 min", "Shift", "Classical RE versus AI behavior.", "roadmap-shift");
  addTimelineCard(canvas, pres, theme, 0.62, 3.36, "08 min", "Three challenges", "Interpretation, data, evaluation.", "roadmap-challenges");
  addTimelineCard(canvas, pres, theme, 5.02, 3.36, "06 min", "ADR + conclusion", "Manage evolving assumptions clearly.", "roadmap-close");

  canvas.addText("roadmap-footer", "Memorable example first, academic framing second.", {
    x: 0.68,
    y: 4.82,
    w: 4.3,
    h: 0.3,
    fontFace: bodyFont,
    fontSize: 10.4,
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

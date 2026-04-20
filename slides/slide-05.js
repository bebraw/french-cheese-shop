const { addPageBadge, addReferenceNote, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 13,
  title: "Challenge 1: Hidden Requirements"
};

function addLayer(canvas, pres, x, y, title, text, color, group) {
  canvas.addShape(`${group}-box`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 2.85,
    h: 0.8,
    rectRadius: 0.05,
    line: { color, pt: 1.1 },
    fill: { color: "FFFFFF" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: y + 0.14,
    w: 0.92,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 10.6,
    bold: true,
    color,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-text`, text, {
    x: x + 1.02,
    y: y + 0.13,
    w: 1.58,
    h: 0.32,
    fontFace: bodyFont,
    fontSize: 9.8,
    color: "5A6D82",
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
    "Challenge 1",
    slideConfig.title,
    "The sentence does not say everything the system needs to know. Some requirements are hidden in how we interpret it."
  );

  canvas.addShape("left-utterance", pres.ShapeType.roundRect, {
    x: 0.62,
    y: 2.02,
    w: 3.08,
    h: 2.66,
    rectRadius: 0.06,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group: "left-utterance"
  });

  canvas.addText("utterance-title", "Observed request", {
    x: 0.92,
    y: 2.28,
    w: 1.4,
    h: 0.22,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: "F4E9DC",
    margin: 0
  }, {
    group: "left-utterance"
  });

  canvas.addText("utterance-text", "“Something like Brie,\nbut stronger.”", {
    x: 0.92,
    y: 2.78,
    w: 2.1,
    h: 1.08,
    fontFace: displayFont,
    fontSize: 19,
    color: "FFFFFF",
    margin: 0
  }, {
    group: "left-utterance"
  });

  canvas.addText("utterance-note", "People infer context.\nSoftware needs it stated.", {
    x: 0.94,
    y: 4.02,
    w: 2.2,
    h: 0.5,
    fontFace: bodyFont,
    fontSize: 10,
    color: "F3E6D8",
    margin: 0
  }, {
    group: "left-utterance"
  });

  addLayer(canvas, pres, 4.32, 2.02, "Like", "texture, milk type,\nserving context", theme.primary, "layer-like");
  addLayer(canvas, pres, 4.32, 2.96, "Stronger", "age, aroma,\npungency, salt", theme.secondary, "layer-stronger");
  addLayer(canvas, pres, 4.32, 3.9, "Good fit", "budget, stock,\nprofile, explanation", theme.accent, "layer-suitable");

  canvas.addText("latent-summary", "For AI systems, teams must identify, describe, and test the hidden meanings inside user requests.", {
    x: 4.32,
    y: 4.92,
    w: 4.2,
    h: 0.34,
    fontFace: bodyFont,
    fontSize: 10.2,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "latent-summary"
  });

  addReferenceNote(canvas, theme, "Source: [2] Kiyavitskaya et al. (2008)");
  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

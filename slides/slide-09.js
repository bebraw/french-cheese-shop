const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "summary",
  index: 9,
  title: "Closing Synthesis"
};

function addTakeaway(canvas, pres, theme, x, title, body, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y: 2.28,
    w: 2.72,
    h: 1.92,
    rectRadius: 0.06,
    line: { color: "E5D5C0", pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.18,
    y: 2.52,
    w: 1.9,
    h: 0.22,
    fontFace: displayFont,
    fontSize: 17,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.18,
    y: 2.9,
    w: 2.16,
    h: 0.7,
    fontFace: bodyFont,
    fontSize: 10.5,
    color: "5F7084",
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
    "Closing",
    slideConfig.title,
    "End with one sentence the audience can remember and one question they can reuse when thinking about AI systems."
  );

  addTakeaway(canvas, pres, theme, 0.62, "Interpretation", "Requirements must surface latent meaning, not only explicit feature requests.", "takeaway-interpretation");
  addTakeaway(canvas, pres, theme, 3.64, "Artifacts", "Data models, ontologies, prompts, and ADRs all become part of RE practice.", "takeaway-artifacts");
  addTakeaway(canvas, pres, theme, 6.66, "Evaluation", "Correctness shifts toward relevance, trust, and measurable behavioral quality.", "takeaway-evaluation");

  canvas.addShape("closing-band", pres.ShapeType.roundRect, {
    x: 1.12,
    y: 4.58,
    w: 7.76,
    h: 0.42,
    rectRadius: 0.05,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group: "closing-band"
  });

  canvas.addText("closing-quote", "AI changes requirements engineering from specifying system functions to shaping behavior, learning, and evaluation.", {
    x: 1.26,
    y: 4.64,
    w: 7.46,
    h: 0.34,
    fontFace: bodyFont,
    fontSize: 8.8,
    bold: true,
    color: "FFFFFF",
    align: "center",
    margin: 0
  }, {
    group: "closing-band"
  });

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

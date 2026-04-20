const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 2,
  title: "Learning Outcomes"
};

const outcomeCards = [
  {
    x: 0.62,
    y: 2.08,
    index: 1,
    title: "Interpret vague requests",
    body: "Show why natural language creates latent requirements that must be made explicit.",
    group: "outcome-interpret"
  },
  {
    x: 5.0,
    y: 2.08,
    index: 2,
    title: "Treat data as artifact",
    body: "Show why domain knowledge, data, and ontologies belong in requirement work.",
    group: "outcome-data"
  },
  {
    x: 0.62,
    y: 3.52,
    index: 3,
    title: "Evaluate uncertainty",
    body: "Move beyond binary correctness toward relevance, trust, and user satisfaction.",
    group: "outcome-evaluate"
  },
  {
    x: 5.0,
    y: 3.52,
    index: 4,
    title: "Use controls",
    body: "Explain how guardrails, ADRs, and evaluation support AI-enabled systems.",
    group: "outcome-control"
  }
];

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

function createLearningOutcomesSlide(pres, theme, options, visibleCards, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Session Focus",
    slideConfig.title,
    "By the end of the presentation, the audience should be able to connect AI capabilities to concrete changes in requirements work."
  );

  for (const card of outcomeCards.slice(0, visibleCards)) {
    addOutcomeCard(
      canvas,
      pres,
      theme,
      card.x,
      card.y,
      card.index,
      card.title,
      card.body,
      card.group
    );
  }

  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visibleCards = 1; visibleCards <= outcomeCards.length; visibleCards += 1) {
    const result = createLearningOutcomesSlide(
      pres,
      theme,
      options,
      visibleCards,
      slideConfig.index + visibleCards - 1
    );
    if (result && result.report) {
      reports.push(result.report);
    }
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

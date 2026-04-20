const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "toc",
  index: 10,
  title: "Key Topics and Timing"
};

const topicCards = [
  {
    x: 0.62,
    y: 2.04,
    title: "Ambiguous request",
    body: "What does 'like Brie, but stronger' actually mean?",
    group: "roadmap-hook"
  },
  {
    x: 5.02,
    y: 2.04,
    title: "RE shift",
    body: "From deterministic functions to uncertain behavior.",
    group: "roadmap-shift"
  },
  {
    x: 0.62,
    y: 3.36,
    title: "Three challenges",
    body: "Latent meaning, domain data, and evaluation quality.",
    group: "roadmap-challenges"
  },
  {
    x: 5.02,
    y: 3.36,
    title: "Architectural control",
    body: "ADRs, guardrails, and continuous evaluation.",
    group: "roadmap-close"
  }
];

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

function createOverviewSlide(pres, theme, options, visibleCards, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Overview",
    slideConfig.title,
    "The presentation moves from one ambiguous customer request to the broader requirements questions raised by AI-enabled systems."
  );

  for (const card of topicCards.slice(0, visibleCards)) {
    addTimelineCard(canvas, pres, theme, card.x, card.y, card.title, card.body, card.group);
  }

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

  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visibleCards = 1; visibleCards <= topicCards.length; visibleCards += 1) {
    const result = createOverviewSlide(
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

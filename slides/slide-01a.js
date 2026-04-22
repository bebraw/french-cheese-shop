const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "content",
  index: 2,
  title: "Learning Outcomes"
};

const outcomeCards = [
  {
    x: 0.8,
    y: 2.08,
    index: 1,
    title: "Interpret vague requests",
    body: "Vague requests force the system to infer missing preferences and constraints.",
    group: "outcome-interpret"
  },
  {
    x: 5.18,
    y: 2.08,
    index: 2,
    title: "Specify domain context",
    body: "The system needs domain and operational context to answer well.",
    group: "outcome-data"
  },
  {
    x: 2.81,
    y: 3.52,
    index: 3,
    title: "Evaluate ambiguity",
    body: "Judge how the system handles ambiguity, not only whether the answer is correct.",
    group: "outcome-evaluate"
  }
];

const outcomeLayouts = {
  1: [
    { x: 2.99, y: 2.72 }
  ],
  2: [
    { x: 0.8, y: 2.72 },
    { x: 5.18, y: 2.72 }
  ]
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

function createLearningOutcomesSlide(pres, theme, options, visibleCards, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Session Focus",
    slideConfig.title,
    null
  );

  const layout = outcomeLayouts[visibleCards];

  for (const [idx, card] of outcomeCards.slice(0, visibleCards).entries()) {
    const placement = layout ? layout[idx] : card;
    addOutcomeCard(
      canvas,
      pres,
      theme,
      placement.x,
      placement.y,
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

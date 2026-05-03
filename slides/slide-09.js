const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "summary",
  index: 15,
  title: "Three Takeaways"
};

const takeawayCards = [
  {
    x: 0.62,
    title: "Interpretation",
    body: "Turn hidden preferences into explicit requirements.",
    group: "takeaway-interpretation"
  },
  {
    x: 3.64,
    title: "Context",
    body: "Use product data and shop constraints, not wording alone.",
    group: "takeaway-artifacts"
  },
  {
    x: 6.66,
    title: "Evaluation",
    body: "Make success criteria visible as checks.",
    group: "takeaway-evaluation"
  }
];

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
    h: 0.34,
    fontFace: displayFont,
    fontSize: 17,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.18,
    y: 2.96,
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

function createClosingSlide(pres, theme, options, visibleCards, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Closing",
    slideConfig.title,
    null
  );

  for (const card of takeawayCards.slice(0, visibleCards)) {
    addTakeaway(canvas, pres, theme, card.x, card.title, card.body, card.group);
  }

  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visibleCards = 1; visibleCards <= takeawayCards.length; visibleCards += 1) {
    const result = createClosingSlide(
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

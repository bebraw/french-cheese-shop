const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { createFrame, insetFrame, measureTextHeight, titleStackLayout } = require("../generator/layout");
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
    title: "Interpret the request",
    body: "Identify what the request leaves unspecified.",
    group: "outcome-interpret"
  },
  {
    x: 5.18,
    y: 2.08,
    index: 2,
    title: "Specify the context",
    body: "Name the data and shop knowledge the system needs.",
    group: "outcome-data"
  },
  {
    x: 2.81,
    y: 3.66,
    index: 3,
    title: "Evaluate the response",
    body: "Judge whether the answer is useful under ambiguity.",
    group: "outcome-evaluate"
  }
];

const outcomeLayouts = {
  1: [
    { x: 2.99, y: 2.58 }
  ],
  2: [
    { x: 0.8, y: 2.58 },
    { x: 5.18, y: 2.58 }
  ]
};

const OUTCOME_CARD = {
  w: 4.02,
  h: 1.46,
  badgeSize: 0.38
};

function getOutcomeCardLayout(x, y, title, body) {
  const panelFrame = createFrame({
    x,
    y,
    w: OUTCOME_CARD.w,
    h: OUTCOME_CARD.h
  });
  const contentFrame = insetFrame(panelFrame, {
    top: 0.2,
    right: 0.38,
    bottom: 0.18,
    left: 0.76
  });
  const titleHeight = measureTextHeight(title, {
    fontFace: displayFont,
    fontSize: 14.2,
    w: contentFrame.w
  }) + 0.03;
  const bodyHeight = measureTextHeight(body, {
    fontFace: bodyFont,
    fontSize: 9.8,
    w: contentFrame.w
  }) + 0.03;
  const stack = titleStackLayout(contentFrame, {
    titleHeight,
    titleGap: 0.14,
    items: [{ height: bodyHeight }],
    justify: "center"
  });
  const badgeY = Math.min(
    y + OUTCOME_CARD.h - 0.18 - OUTCOME_CARD.badgeSize,
    Math.max(y + 0.18, stack.titleY + Math.max((titleHeight - OUTCOME_CARD.badgeSize) / 2, 0))
  );

  return {
    badgeY,
    contentX: contentFrame.x,
    contentW: contentFrame.w,
    titleY: stack.titleY,
    titleH: titleHeight,
    bodyY: stack.items[0].y,
    bodyH: bodyHeight
  };
}

function addOutcomeCard(canvas, pres, theme, x, y, index, title, body, group) {
  const layout = getOutcomeCardLayout(x, y, title, body);

  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y,
    w: OUTCOME_CARD.w,
    h: OUTCOME_CARD.h,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addShape(`${group}-badge`, pres.ShapeType.ellipse, {
    x: x + 0.22,
    y: layout.badgeY,
    w: OUTCOME_CARD.badgeSize,
    h: OUTCOME_CARD.badgeSize,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group
  });

  canvas.addText(`${group}-index`, String(index), {
    x: x + 0.22,
    y: layout.badgeY,
    w: OUTCOME_CARD.badgeSize,
    h: OUTCOME_CARD.badgeSize,
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
    x: layout.contentX,
    y: layout.titleY,
    w: layout.contentW,
    h: layout.titleH,
    fontFace: displayFont,
    fontSize: 14.2,
    color: theme.primary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: layout.contentX,
    y: layout.bodyY,
    w: layout.contentW,
    h: layout.bodyH,
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

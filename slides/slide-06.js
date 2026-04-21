const {
  addPageBadge,
  addReferenceNote,
  addSectionTitle,
} = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "content",
  index: 18,
  title: "Challenge 2: Data Requirements",
};

const sourceCards = [
  {
    x: 0.74,
    y: 2.9,
    title: "Product catalog",
    body: "Milk, region, age,\ntexture, rind, stock",
    group: "source-catalog",
  },
  {
    x: 3.55,
    y: 2.9,
    title: "Interaction data",
    body: "Accepted choices,\nrejections, profiles",
    group: "source-interaction",
  },
  {
    x: 6.36,
    y: 2.9,
    title: "Shop knowledge",
    body: "Common advice\nand pairings",
    group: "source-expert",
  },
];

function addSourceCard(canvas, pres, x, y, title, body, group) {
  canvas.addShape(
    `${group}-card`,
    pres.ShapeType.roundRect,
    {
      x,
      y,
      w: 2.45,
      h: 1.3,
      rectRadius: 0.05,
      line: { color: "D9C6AF", pt: 1.2 },
      fill: { color: "FFFDFC" },
    },
    {
      group,
    },
  );

  canvas.addText(
    `${group}-title`,
    title,
    {
      x: x + 0.16,
      y: y + 0.16,
      w: 1.92,
      h: 0.22,
      fontFace: bodyFont,
      fontSize: 11.4,
      bold: true,
      color: "A15D32",
      margin: 0,
    },
    {
      group,
    },
  );

  canvas.addText(
    `${group}-body`,
    body,
    {
      x: x + 0.16,
      y: y + 0.48,
      w: 1.98,
      h: 0.48,
      fontFace: bodyFont,
      fontSize: 9.6,
      color: "607185",
      margin: 0,
    },
    {
      group,
    },
  );
}
function createDataSlide(pres, theme, options, visibleCards, showTakeaway, slideIndex) {
  const canvas = createSlideCanvas(
    pres,
    { ...slideConfig, index: slideIndex },
    options,
  );
  const { slide } = canvas;
  slide.background = { color: "FFFDFC" };

  addSectionTitle(
    canvas,
    theme,
    "Challenge 2",
    slideConfig.title,
    "The requirements also include the product, interaction, and domain data behind the prompt.",
  );

  canvas.addText(
    "data-prompt",
    "What data does the system need?",
    {
      x: 0.74,
      y: 2.08,
      w: 4.2,
      h: 0.32,
      fontFace: displayFont,
      fontSize: 13.6,
      color: theme.primary,
      margin: 0,
    },
    {
      group: "data-prompt",
    },
  );

  for (const card of sourceCards.slice(0, visibleCards)) {
    addSourceCard(
      canvas,
      pres,
      card.x,
      card.y,
      card.title,
      card.body,
      card.group,
    );
  }

  if (showTakeaway) {
    canvas.addText(
      "data-takeaway",
      "Data is not just input. It shapes what the system can know and recommend.",
      {
        x: 0.98,
        y: 4.66,
        w: 7.55,
        h: 0.18,
        fontFace: bodyFont,
        fontSize: 10,
        bold: true,
        color: theme.primary,
        align: "center",
        margin: 0,
      },
      {
        group: "data-takeaway",
      },
    );
  }

  addReferenceNote(canvas, theme, "Source: [3] Ahmad et al. (2023)");
  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];
  let slideIndex = slideConfig.index;

  for (
    let visibleCards = 0;
    visibleCards <= sourceCards.length;
    visibleCards += 1
  ) {
    const result = createDataSlide(
      pres,
      theme,
      options,
      visibleCards,
      false,
      slideIndex,
    );
    if (result && result.report) {
      reports.push(result.report);
    }
    slideIndex += 1;
  }

  const takeawayResult = createDataSlide(
    pres,
    theme,
    options,
    sourceCards.length,
    true,
    slideIndex,
  );
  if (takeawayResult && takeawayResult.report) {
    reports.push(takeawayResult.report);
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

const fs = require("fs");
const path = require("path");
const { addPageBadge, addReferenceNote, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 17,
  title: "Challenge 2: Data Shapes Requirements"
};

const sourceCards = [
  {
    x: 0.62,
    y: 2.58,
    title: "Product catalog",
    body: "Milk, region, age,\ntexture, rind, stock",
    group: "source-catalog"
  },
  {
    x: 0.62,
    y: 3.36,
    title: "Interaction data",
    body: "Accepted choices,\nrejections, profiles",
    group: "source-interaction"
  },
  {
    x: 0.62,
    y: 4.14,
    title: "Shop knowledge",
    body: "Common advice\nand pairings",
    group: "source-expert"
  }
];

const graphImagePath = path.join(__dirname, "imgs", "challenge-2-graph.png");

function addSourceCard(canvas, pres, x, y, title, body, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 2.38,
    h: 0.76,
    rectRadius: 0.05,
    line: { color: "D9C6AF", pt: 1.05 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: y + 0.1,
    w: 1.5,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 10.6,
    bold: true,
    color: "A15D32",
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.16,
    y: y + 0.3,
    w: 1.9,
    h: 0.32,
    fontFace: bodyFont,
    fontSize: 9,
    color: "607185",
    margin: 0
  }, {
    group
  });
}

function addGraphPanel(canvas, slide, pres, theme) {
  canvas.addShape("graph-panel", pres.ShapeType.roundRect, {
    x: 4.06,
    y: 2.02,
    w: 5.0,
    h: 2.98,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.1 },
    fill: { color: "FFFFFF", transparency: 100 }
  }, {
    group: "graph-panel",
    skipOverlap: true
  });

  canvas.addText("graph-title", "Example structure behind the prompt", {
    x: 4.34,
    y: 2.2,
    w: 4.18,
    h: 0.22,
    fontFace: displayFont,
    fontSize: 13.8,
    color: theme.primary,
    margin: 0
  }, {
    group: "graph-panel"
  });

  if (fs.existsSync(graphImagePath)) {
    slide.addImage({
      path: graphImagePath,
      x: 4.42,
      y: 2.72,
      w: 4.28,
      h: 1.68
    });
    canvas.reserveGroup("graph-image", {
      x: 4.42,
      y: 2.72,
      w: 4.28,
      h: 1.68
    }, {
      group: "graph-image",
      skipOverlap: true
    });
  } else {
    canvas.addText("graph-missing", "Graph image missing.", {
      x: 4.46,
      y: 3.46,
      w: 2.0,
      h: 0.18,
      fontFace: bodyFont,
      fontSize: 9,
      color: theme.secondary,
      margin: 0
    }, {
      group: "graph-panel"
    });
  }

}

function createDataSlide(pres, theme, options, visibleCards, showGraph, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: "FFFDFC" };

  addSectionTitle(
    canvas,
    theme,
    "Challenge 2",
    slideConfig.title,
    "The requirement also includes the product, interaction, and domain data behind the prompt."
  );

  canvas.addText("data-prompt", "What data does it need?", {
    x: 0.74,
    y: 2.08,
    w: 3.2,
    h: 0.3,
    fontFace: displayFont,
    fontSize: 12.4,
    color: theme.primary,
    margin: 0
  }, {
    group: "data-prompt"
  });

  for (const card of sourceCards.slice(0, visibleCards)) {
    addSourceCard(canvas, pres, card.x, card.y, card.title, card.body, card.group);
  }

  if (showGraph) {
    addGraphPanel(canvas, slide, pres, theme);
  }

  addReferenceNote(canvas, theme, "Source: [3] Ahmad et al. (2023)");
  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];
  let slideIndex = slideConfig.index;

  for (let visibleCards = 0; visibleCards <= sourceCards.length; visibleCards += 1) {
    const result = createDataSlide(
      pres,
      theme,
      options,
      visibleCards,
      false,
      slideIndex
    );
    if (result && result.report) {
      reports.push(result.report);
    }
    slideIndex += 1;
  }

  const graphResult = createDataSlide(
    pres,
    theme,
    options,
    sourceCards.length,
    true,
    slideIndex
  );
  if (graphResult && graphResult.report) {
    reports.push(graphResult.report);
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

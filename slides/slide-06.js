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

function addGraphPanel(canvas, pres, theme) {
  canvas.addShape("graph-panel", pres.ShapeType.roundRect, {
    x: 4.06,
    y: 2.02,
    w: 5.0,
    h: 2.98,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.1 },
    fill: { color: "F7F1E7" }
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

  canvas.addText("graph-subtitle", "The system links request words to product traits and products.", {
    x: 4.34,
    y: 2.46,
    w: 4.18,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 8.6,
    color: "607185",
    margin: 0
  }, {
    group: "graph-panel"
  });

  canvas.addShape("node-request", pres.ShapeType.ellipse, {
    x: 4.44,
    y: 3.32,
    w: 1.05,
    h: 0.54,
    line: { color: theme.secondary, pt: 1.1 },
    fill: { color: "F7E5E7" }
  }, {
    group: "graph-request"
  });

  canvas.addText("node-request-text", "request", {
    x: 4.7,
    y: 3.48,
    w: 0.52,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.4,
    bold: true,
    color: theme.secondary,
    align: "center",
    margin: 0
  }, {
    group: "graph-request"
  });

  canvas.addShape("node-brie", pres.ShapeType.ellipse, {
    x: 6.03,
    y: 2.88,
    w: 1.16,
    h: 0.54,
    line: { color: theme.primary, pt: 1.1 },
    fill: { color: "E7EEF5" }
  }, {
    group: "graph-brie"
  });

  canvas.addText("node-brie-text", "Brie-like", {
    x: 6.26,
    y: 3.04,
    w: 0.72,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.2,
    bold: true,
    color: theme.primary,
    align: "center",
    margin: 0
  }, {
    group: "graph-brie"
  });

  canvas.addShape("node-strength", pres.ShapeType.ellipse, {
    x: 6.08,
    y: 4.02,
    w: 1.12,
    h: 0.54,
    line: { color: theme.accent, pt: 1.1 },
    fill: { color: "F7EEDB" }
  }, {
    group: "graph-strength"
  });

  canvas.addText("node-strength-text", "stronger", {
    x: 6.3,
    y: 4.18,
    w: 0.68,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9.2,
    bold: true,
    color: "8D651A",
    align: "center",
    margin: 0
  }, {
    group: "graph-strength"
  });

  canvas.addShape("node-choice", pres.ShapeType.ellipse, {
    x: 7.56,
    y: 3.34,
    w: 1.34,
    h: 0.54,
    line: { color: theme.secondary, pt: 1.1 },
    fill: { color: "F7E5E7" }
  }, {
    group: "graph-choice"
  });

  canvas.addText("node-choice-text", "matching cheese", {
    x: 7.72,
    y: 3.5,
    w: 1.02,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 8.4,
    bold: true,
    color: theme.secondary,
    align: "center",
    margin: 0
  }, {
    group: "graph-choice"
  });

  canvas.addShape("edge-request-brie", pres.ShapeType.line, {
    x: 5.48,
    y: 3.56,
    w: 0.62,
    h: -0.28,
    line: { color: theme.primary, pt: 1.0, beginArrowType: "none", endArrowType: "triangle" }
  }, {
    group: "graph-edge-1",
    skipOverlap: true
  });

  canvas.addShape("edge-request-strength", pres.ShapeType.line, {
    x: 5.48,
    y: 3.62,
    w: 0.66,
    h: 0.46,
    line: { color: theme.accent, pt: 1.0, beginArrowType: "none", endArrowType: "triangle" }
  }, {
    group: "graph-edge-2",
    skipOverlap: true
  });

  canvas.addShape("edge-brie-choice", pres.ShapeType.line, {
    x: 7.16,
    y: 3.16,
    w: 0.46,
    h: 0.32,
    line: { color: theme.primary, pt: 1.0, beginArrowType: "none", endArrowType: "triangle" }
  }, {
    group: "graph-edge-3",
    skipOverlap: true
  });

  canvas.addShape("edge-strength-choice", pres.ShapeType.line, {
    x: 7.18,
    y: 4.2,
    w: 0.44,
    h: -0.3,
    line: { color: theme.accent, pt: 1.0, beginArrowType: "none", endArrowType: "triangle" }
  }, {
    group: "graph-edge-4",
    skipOverlap: true
  });

  canvas.addText("graph-caption", "The requirement includes how request terms connect to product data.", {
    x: 4.36,
    y: 4.74,
    w: 4.28,
    h: 0.24,
    fontFace: bodyFont,
    fontSize: 8.6,
    bold: true,
    color: theme.primary,
    margin: 0
  }, {
    group: "graph-caption"
  });
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
    "Use the audience again: ask what data or knowledge the system would need behind the prompt."
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

  if (visibleCards === 0) {
    canvas.addText("data-note", "Take 2-3 suggestions, then reveal the answer.", {
      x: 0.74,
      y: 4.98,
      w: 3.1,
      h: 0.24,
      fontFace: bodyFont,
      fontSize: 8.2,
      color: theme.secondary,
      margin: 0
    }, {
      group: "data-note"
    });
  }

  if (showGraph) {
    addGraphPanel(canvas, pres, theme);
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

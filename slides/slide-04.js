const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 11,
  title: "Classical RE vs AI-Era RE"
};

const panels = [
  {
    x: 0.62,
    title: "Traditional",
    bullets: "• Search cheeses by type\n• Validate fields and stock\n• Fixed outputs for fixed inputs\n• Success = feature works",
    group: "panel-traditional"
  },
  {
    x: 5.0,
    title: "AI-augmented",
    bullets: "• Recommend from vague language\n• Use data and domain models\n• Outputs depend on interpretation\n• Success = relevance, trust, fit",
    group: "panel-ai"
  }
];

function addComparisonPanel(canvas, pres, x, title, bullets, colors, group) {
  canvas.addShape(`${group}-panel`, pres.ShapeType.roundRect, {
    x,
    y: 2.02,
    w: 4.02,
    h: 2.66,
    rectRadius: 0.06,
    line: { color: colors.line, pt: 1.1 },
    fill: { color: colors.fill }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.24,
    y: 2.24,
    w: 2.6,
    h: 0.24,
    fontFace: displayFont,
    fontSize: 18,
    color: colors.title,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-bullets`, bullets, {
    x: x + 0.26,
    y: 2.7,
    w: 3.24,
    h: 1.38,
    fontFace: bodyFont,
    fontSize: 11,
    color: colors.body,
    margin: 0,
    breakLine: false
  }, {
    group
  });
}

function createComparisonSlide(pres, theme, options, visiblePanels, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: "FFFDFC" };

  addSectionTitle(
    canvas,
    theme,
    "Conceptual Shift",
    slideConfig.title,
    "The main transition is from specifying deterministic functionality to shaping behavior under uncertainty."
  );

  for (const panel of panels.slice(0, visiblePanels)) {
    const colors = panel.group === "panel-traditional"
      ? {
        fill: "F8F1E8",
        line: theme.light,
        title: theme.primary,
        body: "596B81"
      }
      : {
        fill: "F6EAEC",
        line: "E8CCD1",
        title: theme.secondary,
        body: "6F5560"
      };

    addComparisonPanel(
      canvas,
      pres,
      panel.x,
      panel.title,
      panel.bullets,
      colors,
      panel.group
    );
  }

  canvas.addShape("shift-banner", pres.ShapeType.roundRect, {
    x: 1.18,
    y: 4.88,
    w: 7.64,
    h: 0.38,
    rectRadius: 0.05,
    line: { color: theme.primary, transparency: 100 },
    fill: { color: theme.primary }
  }, {
    group: "shift-banner"
  });

  canvas.addText("shift-banner-text", "Requirements are no longer just functions. They also define how the system interprets, learns, and is evaluated.", {
    x: 1.44,
    y: 4.92,
    w: 7.1,
    h: 0.34,
    fontFace: bodyFont,
    fontSize: 9.2,
    bold: true,
    color: "FFFFFF",
    align: "center",
    margin: 0
  }, {
    group: "shift-banner"
  });

  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visiblePanels = 1; visiblePanels <= panels.length; visiblePanels += 1) {
    const result = createComparisonSlide(
      pres,
      theme,
      options,
      visiblePanels,
      slideConfig.index + visiblePanels - 1
    );
    if (result && result.report) {
      reports.push(result.report);
    }
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

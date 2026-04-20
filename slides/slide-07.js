const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 16,
  title: "Evaluation Under Uncertainty"
};

const pipelineNodes = [
  { x: 0.58, title: "User input", body: "vague language", fill: "FFFFFF", line: "7B1E2B", group: "pipeline-input" },
  { x: 2.2, title: "Interpret", body: "what user means", fill: "F7F1E7", line: "1D3557", group: "pipeline-interpret" },
  { x: 3.82, title: "Knowledge", body: "catalog + graph", fill: "FFFFFF", line: "A15D32", group: "pipeline-knowledge" },
  { x: 5.44, title: "Recommend", body: "pick + explain", fill: "F7F1E7", line: "7B1E2B", group: "pipeline-recommend" },
  { x: 7.06, title: "Feedback", body: "accept or reject", fill: "FFFFFF", line: "1D3557", group: "pipeline-feedback" }
];

function addPipelineNode(canvas, pres, x, title, body, fill, line, group) {
  canvas.addShape(`${group}-box`, pres.ShapeType.roundRect, {
    x,
    y: 2.64,
    w: 1.52,
    h: 1.02,
    rectRadius: 0.05,
    line: { color: line, pt: 1.1 },
    fill: { color: fill }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: 2.82,
    w: 1.1,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 10.4,
    bold: true,
    color: line,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-body`, body, {
    x: x + 0.16,
    y: 3.08,
    w: 1.08,
    h: 0.36,
    fontFace: bodyFont,
    fontSize: 9.1,
    color: "5D6F84",
    margin: 0
  }, {
    group
  });
}

function createEvaluationSlide(pres, theme, options, visibleNodes, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Challenge 3",
    slideConfig.title,
    "The question is not only whether the feature runs. We also need to ask whether the answer is useful, trusted, and good enough."
  );

  for (const node of pipelineNodes.slice(0, visibleNodes)) {
    addPipelineNode(canvas, pres, node.x, node.title, node.body, node.fill, node.line, node.group);
  }

  canvas.addText("pipeline-question", "If the user hates the recommendation, what exactly failed?", {
    x: 0.8,
    y: 2.08,
    w: 7.2,
    h: 0.34,
    fontFace: displayFont,
    fontSize: 14,
    color: theme.primary,
    margin: 0
  }, {
    group: "pipeline-question"
  });

  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visibleNodes = 1; visibleNodes <= pipelineNodes.length; visibleNodes += 1) {
    const result = createEvaluationSlide(
      pres,
      theme,
      options,
      visibleNodes,
      slideConfig.index + visibleNodes - 1
    );
    if (result && result.report) {
      reports.push(result.report);
    }
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

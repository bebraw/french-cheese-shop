const { addPageBadge, addReferenceNote, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 13,
  title: "Challenge 1: Hidden Requirements"
};

const audienceLayers = [
  {
    title: "Like",
    text: "texture, milk type,\nserving context",
    colorKey: "primary",
    group: "layer-like",
    y: 2.48
  },
  {
    title: "Stronger",
    text: "age, aroma,\npungency, salt",
    colorKey: "secondary",
    group: "layer-stronger",
    y: 3.34
  },
  {
    title: "Good fit",
    text: "budget, stock,\nprofile, explanation",
    colorKey: "accent",
    group: "layer-suitable",
    y: 4.2
  }
];

function addLayer(canvas, pres, x, y, title, text, color, group) {
  canvas.addShape(`${group}-box`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 2.85,
    h: 0.8,
    rectRadius: 0.05,
    line: { color, pt: 1.1 },
    fill: { color: "FFFFFF" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: y + 0.14,
    w: 0.92,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 10.6,
    bold: true,
    color,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-text`, text, {
    x: x + 1.02,
    y: y + 0.13,
    w: 1.58,
    h: 0.32,
    fontFace: bodyFont,
    fontSize: 9.8,
    color: "5A6D82",
    margin: 0
  }, {
    group
  });
}

function createChallengeSlide(pres, theme, options, visibleLayers, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
  const { slide } = canvas;
  slide.background = { color: theme.bg };

  addSectionTitle(
    canvas,
    theme,
    "Challenge 1",
    slideConfig.title,
    "Use the audience first: ask what the system still needs to know before it can recommend anything."
  );

  canvas.addShape("left-utterance", pres.ShapeType.roundRect, {
    x: 0.62,
    y: 2.02,
    w: 3.08,
    h: 2.66,
    rectRadius: 0.06,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary }
  }, {
    group: "left-utterance"
  });

  canvas.addText("utterance-title", "Observed request", {
    x: 0.92,
    y: 2.28,
    w: 1.4,
    h: 0.22,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: "F4E9DC",
    margin: 0
  }, {
    group: "left-utterance"
  });

  canvas.addText("utterance-text", "“Something like Brie,\nbut stronger.”", {
    x: 0.92,
    y: 2.78,
    w: 2.1,
    h: 1.08,
    fontFace: displayFont,
    fontSize: 19,
    color: "FFFFFF",
    margin: 0
  }, {
    group: "left-utterance"
  });

  canvas.addText("utterance-note", "People infer context.\nSoftware needs it stated.", {
    x: 0.94,
    y: 4.02,
    w: 2.2,
    h: 0.5,
    fontFace: bodyFont,
    fontSize: 10,
    color: "F3E6D8",
    margin: 0
  }, {
    group: "left-utterance"
  });

  canvas.addText("audience-prompt", "What does the system still need to know?", {
    x: 4.32,
    y: 2.06,
    w: 4.3,
    h: 0.26,
    fontFace: displayFont,
    fontSize: 13.5,
    color: theme.primary,
    margin: 0
  }, {
    group: "audience-prompt"
  });

  for (const layer of audienceLayers.slice(0, visibleLayers)) {
    addLayer(
      canvas,
      pres,
      4.32,
      layer.y,
      layer.title,
      layer.text,
      theme[layer.colorKey],
      layer.group
    );
  }

  if (visibleLayers === 0) {
    canvas.addText("audience-note", "Take 2-3 audience suggestions before revealing the hidden requirements.", {
      x: 4.34,
      y: 4.98,
      w: 4.28,
      h: 0.34,
      fontFace: bodyFont,
      fontSize: 8.8,
      color: theme.secondary,
      margin: 0
    }, {
      group: "audience-note"
    });
  }

  if (visibleLayers === audienceLayers.length) {
    canvas.addText("latent-summary", "AI systems need these meanings made explicit and testable.", {
      x: 4.32,
      y: 5.0,
      w: 4.2,
      h: 0.28,
      fontFace: bodyFont,
      fontSize: 8.8,
      bold: true,
      color: theme.primary,
      margin: 0
    }, {
      group: "latent-summary"
    });
  }

  addReferenceNote(canvas, theme, "Source: [2] Kiyavitskaya et al. (2008)");
  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visibleLayers = 0; visibleLayers <= audienceLayers.length; visibleLayers += 1) {
    const result = createChallengeSlide(
      pres,
      theme,
      options,
      visibleLayers,
      slideConfig.index + visibleLayers
    );
    if (result && result.report) {
      reports.push(result.report);
    }
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

const fs = require("fs");
const path = require("path");
const { addPageBadge, addSectionTitle } = require("./helpers");
const { bodyFont, displayFont } = require("./theme");
const { createSlideCanvas } = require("./validation");

const slideConfig = {
  type: "content",
  index: 2,
  title: "The Hook: One Customer Utterance"
};

function addQuestionCard(canvas, pres, theme, x, y, title, text, group) {
  canvas.addShape(`${group}-card`, pres.ShapeType.roundRect, {
    x,
    y,
    w: 1.8,
    h: 1.16,
    rectRadius: 0.06,
    line: { color: theme.light, pt: 1.1 },
    fill: { color: "FFFDFC" }
  }, {
    group
  });

  canvas.addText(`${group}-title`, title, {
    x: x + 0.16,
    y: y + 0.14,
    w: 1.45,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: theme.secondary,
    margin: 0
  }, {
    group
  });

  canvas.addText(`${group}-text`, text, {
    x: x + 0.16,
    y: y + 0.38,
    w: 1.48,
    h: 0.5,
    fontFace: bodyFont,
    fontSize: 9.8,
    color: "5E7186",
    margin: 0
  }, {
    group
  });
}

function createSlide(pres, theme, options = {}) {
  const canvas = createSlideCanvas(pres, slideConfig, options);
  const { slide } = canvas;
  const briePhotoCandidates = [
    path.join(__dirname, "imgs", "lee_2-cheese-630511_1920.jpg"),
    path.join(__dirname, "imgs", "pixabay-brie-lee_2.jpg")
  ];
  const briePhotoPath = briePhotoCandidates.find((candidate) => fs.existsSync(candidate));
  slide.background = { color: "FFFDFC" };

  addSectionTitle(
    canvas,
    theme,
    "Customer Query",
    slideConfig.title,
    "A single customer request already contains ambiguity, interpretation work, and competing assumptions about what a good answer means."
  );

  if (briePhotoPath) {
    slide.addImage({
      path: briePhotoPath,
      x: 0.62,
      y: 2.06,
      w: 3.72,
      h: 2.55
    });
  }

  canvas.addShape("quote-panel", pres.ShapeType.roundRect, {
    x: 0.62,
    y: 2.06,
    w: 3.72,
    h: 2.55,
    rectRadius: 0.08,
    line: { color: theme.secondary, transparency: 100 },
    fill: { color: theme.secondary, transparency: briePhotoPath ? 24 : 0 }
  }, {
    group: "quote-panel"
  });

  canvas.addText("quote-mark", "«", {
    x: 0.94,
    y: 2.28,
    w: 0.36,
    h: 0.38,
    fontFace: displayFont,
    fontSize: 30,
    color: "F4E9DC",
    margin: 0
  }, {
    group: "quote-panel"
  });

  canvas.addText("quote-text", "I want something\nlike Brie,\nbut stronger.", {
    x: 1.1,
    y: 2.62,
    w: 2.5,
    h: 1.48,
    fontFace: displayFont,
    fontSize: 20,
    color: "FFFFFF",
    margin: 0
  }, {
    group: "quote-panel"
  });

  canvas.addText("quote-caption", "Easy for a shopkeeper,\nhard for a machine.", {
    x: 1.1,
    y: 4.1,
    w: 2.6,
    h: 0.5,
    fontFace: bodyFont,
    fontSize: 10,
    color: "F1E5D7",
    margin: 0
  }, {
    group: "quote-panel"
  });

  if (briePhotoPath) {
    canvas.addText("quote-photo-attribution", "Photo: lee_2 / Pixabay", {
      x: 2.34,
      y: 4.42,
      w: 1.72,
      h: 0.12,
      fontFace: bodyFont,
      fontSize: 7.4,
      color: "FFF8ED",
      align: "right",
      margin: 0
    }, {
      group: "quote-panel"
    });
  }

  addQuestionCard(canvas, pres, theme, 4.78, 2.08, "Similarity", "Texture, milk type,\nregion, serving context", "question-similarity");
  addQuestionCard(canvas, pres, theme, 6.78, 2.08, "Strength", "Age, aroma,\npungency, salt", "question-strength");
  addQuestionCard(canvas, pres, theme, 4.78, 3.38, "Constraints", "Budget, stock,\nallergies, pairings", "question-constraints");
  addQuestionCard(canvas, pres, theme, 6.78, 3.38, "Success", "Best match, shortlist,\nor clear explanation", "question-success");

  addPageBadge(canvas, pres, theme, slideConfig.index);
  return canvas.finalize();
}

module.exports = { createSlide, slideConfig };

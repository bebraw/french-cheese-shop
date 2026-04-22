const fs = require("fs");
const path = require("path");
const { addPageBadge, addSectionTitle } = require("../generator/helpers");
const { bodyFont, displayFont } = require("../generator/theme");
const { createSlideCanvas } = require("../generator/validation");

const slideConfig = {
  type: "content",
  index: 5,
  title: "A Vague Customer Request"
};

const questionCards = [
  {
    x: 4.78,
    y: 2.08,
    title: "Similarity",
    text: "Texture, milk type,\nregion, serving context",
    group: "question-similarity"
  },
  {
    x: 6.78,
    y: 2.08,
    title: "Strength",
    text: "Age, aroma,\npungency, salt",
    group: "question-strength"
  },
  {
    x: 4.78,
    y: 3.38,
    title: "Constraints",
    text: "Budget, stock,\nallergies, pairings",
    group: "question-constraints"
  },
  {
    x: 6.78,
    y: 3.38,
    title: "Good answer",
    text: "Best match, shortlist,\nor clear explanation",
    group: "question-success"
  }
];

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
    h: 0.24,
    fontFace: bodyFont,
    fontSize: 10.8,
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

function createCustomerQuerySlide(pres, theme, options, visibleCards, slideIndex) {
  const canvas = createSlideCanvas(pres, { ...slideConfig, index: slideIndex }, options);
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
    null
  );

  if (briePhotoPath) {
    canvas.addImage("quote-photo", {
      path: briePhotoPath,
      x: 0.62,
      y: 2.06,
      w: 3.72,
      h: 2.55
    }, {
      group: "quote-panel",
      skipOverlap: true
    });
  }

  canvas.addShape("quote-panel", pres.ShapeType.roundRect, {
    x: 0.62,
    y: 2.06,
    w: 3.72,
    h: 2.43,
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
    h: 0.54,
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
    y: 4.0,
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
    canvas.addShape("quote-photo-credit-band", pres.ShapeType.roundRect, {
      x: 0.62,
      y: 4.5,
      w: 3.72,
      h: 0.24,
      rectRadius: 0.04,
      line: { color: "E8D9C5", transparency: 100 },
      fill: { color: "F7F0E5" }
    }, {
      group: "quote-panel",
      skipOverlap: true
    });

    canvas.addText("quote-photo-attribution", "Photo: lee_2 / Pixabay", {
      x: 2.5,
      y: 4.55,
      w: 1.72,
      h: 0.14,
      fontFace: bodyFont,
      fontSize: 7.4,
      color: theme.secondary,
      align: "right",
      margin: 0
    }, {
      group: "quote-panel"
    });
  }

  for (const card of questionCards.slice(0, visibleCards)) {
    addQuestionCard(canvas, pres, theme, card.x, card.y, card.title, card.text, card.group);
  }

  addPageBadge(canvas, pres, theme, slideIndex);
  return canvas.finalize();
}

function createSlide(pres, theme, options = {}) {
  const reports = [];

  for (let visibleCards = 0; visibleCards <= questionCards.length; visibleCards += 1) {
    const result = createCustomerQuerySlide(
      pres,
      theme,
      options,
      visibleCards,
      slideConfig.index + visibleCards
    );
    if (result && result.report) {
      reports.push(result.report);
    }
  }

  return { reports };
}

module.exports = { createSlide, slideConfig };

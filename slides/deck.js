const PptxGenJS = require("pptxgenjs");
const { bodyFont, deckMeta, displayFont, theme } = require("./theme");

const slideModules = [
  require("./slide-01"),
  require("./slide-01a"),
  require("./slide-02"),
  require("./slide-03"),
  require("./slide-04"),
  require("./slide-05"),
  require("./slide-06"),
  require("./slide-07"),
  require("./slide-08"),
  require("./slide-09")
];

function createPresentation(options = {}) {
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_16x9";
  pres.author = deckMeta.author;
  pres.company = deckMeta.company;
  pres.subject = deckMeta.subject;
  pres.title = deckMeta.title;
  pres.lang = "en-US";
  pres.theme = {
    headFontFace: displayFont,
    bodyFontFace: bodyFont,
    lang: "en-US"
  };

  const reports = [];

  for (const slideModule of slideModules) {
    const result = slideModule.createSlide(pres, theme, options);
    if (result && result.report) {
      reports.push(result.report);
    }
    if (result && Array.isArray(result.reports)) {
      reports.push(...result.reports);
    }
  }

  return { pres, reports };
}

module.exports = {
  createPresentation
};

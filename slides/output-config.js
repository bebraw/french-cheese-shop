const path = require("path");

const outputDir = path.join(__dirname, "output");
const outputBaseName = "teaching-proof-ai-re";
const pptxFile = path.join(outputDir, `${outputBaseName}.pptx`);
const pdfFile = path.join(outputDir, `${outputBaseName}.pdf`);

module.exports = {
  outputBaseName,
  outputDir,
  pdfFile,
  pptxFile
};

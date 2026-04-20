const fs = require("fs");
const path = require("path");
const { createPresentation } = require("./deck");

async function main() {
  const { pres } = createPresentation();

  const outputDir = path.join(__dirname, "output");
  fs.mkdirSync(outputDir, { recursive: true });

  const outputFile = path.join(outputDir, "teaching-proof-ai-re.pptx");
  await pres.writeFile({ fileName: outputFile });
  process.stdout.write(`${outputFile}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});

const fs = require("fs");
const { createPresentation } = require("./deck");
const { outputDir, pptxFile } = require("./output-config");

async function main() {
  const { pres } = createPresentation();
  fs.mkdirSync(outputDir, { recursive: true });
  await pres.writeFile({ fileName: pptxFile });
  process.stdout.write(`${pptxFile}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});


const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const assetsDir = path.join(__dirname, "public", "assets");
const backupDir = path.join(__dirname, "assets-backup");

async function compressImages() {
  fs.mkdirSync(backupDir, { recursive: true });

  const files = fs.readdirSync(assetsDir).filter(
    (file) => /\.png$/i.test(file)
  );

  let originalTotal = 0;
  let compressedTotal = 0;

  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const backupPath = path.join(backupDir, file);

    const original = fs.statSync(inputPath).size;
    originalTotal += original;

    // Keep an original copy before replacing anything.
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    const tempPath = inputPath + ".tmp.png";

    await sharp(inputPath)
      .png({ compressionLevel: 9, palette: true })
      .toFile(tempPath);

    const compressed = fs.statSync(tempPath).size;

    if (compressed < original) {
      fs.renameSync(tempPath, inputPath);
      compressedTotal += compressed;
    } else {
      fs.unlinkSync(tempPath);
      compressedTotal += original;
    }

    console.log(
      `${file}: ${(original / 1048576).toFixed(2)} MB -> ` +
      `${(Math.min(compressed, original) / 1048576).toFixed(2)} MB`
    );
  }

  console.log("\nOriginal total:", (originalTotal / 1048576).toFixed(2), "MB");
  console.log("Final total:", (compressedTotal / 1048576).toFixed(2), "MB");
  console.log("Original backups saved in assets-backup");
}

compressImages().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

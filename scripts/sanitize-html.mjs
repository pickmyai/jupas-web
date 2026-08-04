import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
let removedBytes = 0;
let repairedFiles = 0;

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      visit(path);
      continue;
    }

    if (extname(entry.name) !== '.html') continue;

    const original = readFileSync(path);
    const clean = Buffer.from(original.filter((byte) => byte !== 0));
    const removedFromFile = original.length - clean.length;

    if (removedFromFile > 0) {
      writeFileSync(path, clean);
      removedBytes += removedFromFile;
      repairedFiles += 1;

      if (readFileSync(path).includes(0)) {
        throw new Error(`Unable to remove every NUL byte from ${path}`);
      }
    }
  }
}

visit(outputDirectory);

if (removedBytes > 0) {
  console.warn(
    `Removed ${removedBytes} NUL byte(s) from ${repairedFiles} generated HTML file(s).`,
  );
}

console.log('Generated HTML is free of NUL bytes.');


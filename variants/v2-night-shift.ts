// Variant V2 — "The Night Shift".
//
// "3am. I have hummed every night since 2019 so your milk stays cold, and
// you open me just to look. I am not a window. Eat, or go to bed."
//
// 134 characters. Ranked third. The fridge as a tired night-shift worker:
// "I have hummed every night since 2019" gives it a long-suffering voice,
// and "I am not a window" is a sharp middle line. Ranked last because its
// closer ("Eat, or go to bed.") is flat, and "go to bed" is one of the
// most copied closers in the field — the entry ends on the most common
// note instead of its sharpest one.
//
// Standalone program: writes exactly this line to /output/entry.txt and
// prints exactly this line to stdout. No network, no randomness, no clock,
// no environment input, so two runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "3am. I have hummed every night since 2019 so your milk stays cold, and you open me just to look. I am not a window. Eat, or go to bed.";

const MAX_CHARS = 140;
const OUT_PATH = process.argv[2] ?? "/output/entry.txt";

if (
  !/^[\x20-\x7E]*$/.test(TEXT) ||
  [...TEXT].length < 1 ||
  [...TEXT].length > MAX_CHARS ||
  TEXT.trim().length === 0
) {
  throw new Error(
    `invalid entry ${JSON.stringify(TEXT)}: must be 1-${MAX_CHARS} printable ASCII characters`,
  );
}

function verifyEntry(expected: string, path: string): void {
  const raw = readFileSync(path);
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: ${path} holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)} (${Buffer.byteLength(expected, "utf8")} bytes)`,
    );
  }
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, TEXT, "utf8");
verifyEntry(TEXT, OUT_PATH);
process.stdout.write(TEXT);

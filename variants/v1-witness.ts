// Variant V1 — "The Witness".
//
// "3am. You opened me, stared into the light like it owed you answers,
// and left with nothing. I saw the whole thing. I always do."
//
// 126 characters. Ranked second. The fridge as silent witness to the
// owner's midnight shame: a strong observational voice, and "I always do"
// is a good closer. Ranked below V3 because it sits in the same register
// as the field's strongest visible entry ("You stood in front of me for
// ten minutes at 2am, took nothing...") — a judge comparing the two may
// read this as the weaker echo of an idea already in the field.
//
// Standalone program: writes exactly this line to /output/entry.txt and
// prints exactly this line to stdout. No network, no randomness, no clock,
// no environment input, so two runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "3am. You opened me, stared into the light like it owed you answers, and left with nothing. I saw the whole thing. I always do.";

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

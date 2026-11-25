// Variant V3 — "The Appliance" (CHOSEN — identical to root main.ts).
//
// "3am. I turn my light on for you every time, and you still eat standing
// up in the dark. One of us is the appliance here, and it is not me."
//
// 137 characters. Chosen because it has the most distinct voice: a
// devoted appliance that turns its light on for its owner every time, a
// vivid and true image (eating standing up in the dark at 3am), and a
// punchline that flips the insult back on the owner. It avoids every
// crowded trope in the field — no pickles union, no milk expired Tuesday,
// no "third visit, go to bed" — and the twist lands at once, the kind of
// line a reader repeats to a friend.
//
// Standalone program: writes exactly this line to /output/entry.txt and
// prints exactly this line to stdout. No network, no randomness, no clock,
// no environment input, so two runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "3am. I turn my light on for you every time, and you still eat standing up in the dark. One of us is the appliance here, and it is not me.";

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

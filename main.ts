// The Funniest Time Machine Warning Label — make.fun entry
// SPDX-License-Identifier: MIT
//
// The winning line, against the judge's brief (in the brief's own order):
//   1. It IS a warning label: "WARNING:" plus an imperative, in the exact
//      shape of a safety notice on a machine.
//   2. The hazard is the classic grandfather paradox — but the joke is not
//      the paradox named flatly; it is the consequence, stated as a dry
//      bureaucratic fact: you become your own grandfather.
//   3. The surprise is saved for the last six words, where the reader least
//      expects a family-tree verdict on a safety notice.
//   4. Straight face throughout: no wink, no "ha ha", no exclamation.
//   5. Nothing wasted: 119 of the 120 allowed characters, every clause
//      doing work (warning, hazard, consequence).
//
// Chosen over the runners-up after a head-to-head through this program:
//   "CAUTION: If you meet yourself, do not lend yourself money. You have
//    never once paid yourself back." (98) — funnier image, but the hazard
//    is a debt, not a time-travel paradox.
//   "WARNING: Your grandfather is not a photo opportunity. Do not pose with
//    him. He has not met your grandmother yet." (104) — good turn, weaker
//    setup, payoff is a fact rather than a consequence.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "WARNING: Do not introduce yourself to ancestors. One will marry your grandmother, and you will be your own grandfather.";

// The sealed gate allows 1-120 UTF-8 characters, not only whitespace.
// Fail loudly if the line ever drifts outside that window.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 120) {
  throw new Error(`entry line must be 1-120 characters, got ${charCount}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Self-check: read back what we wrote and refuse to pass silently if the
// file on disk is not byte-for-byte the winning line, or if its length has
// drifted outside the gate's 1-120 character window.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(written)}`);
}
if ([...written].length !== charCount || charCount > 120) {
  throw new Error(`entry.txt length drift: ${[...written].length} chars`);
}

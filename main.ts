// The Worst Line an AI Could Say — make.fun bounty entry.
// One pickup line, the worst an AI could plausibly deliver: flat,
// over-helpful, faintly ominous, and the badness is the joke.
const LINE =
  "I ran 10,000 simulations of this conversation. In 9,998 of them, you leave. Let me try again.";

// Gate guard: the sealed scorer requires 1-140 UTF-8 chars, not only
// whitespace, in a single line. Reject control chars and enforce the cap
// here so a bad edit fails loudly instead of shipping an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 140 ||
  /[\u0000-\u001f\u007f]/.test(LINE) ||
  !/[A-Za-z0-9]/.test(LINE) ||
  LINE.trim() !== LINE ||
  LINE.includes("\n")
) {
  throw new Error(`entry fails gate: ${LINE.length} chars`);
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const fs = await import("node:fs");
const path = await import("node:path");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "entry.txt"), LINE, "utf8");
console.log(`saved ${LINE.length} characters to entry.txt`);

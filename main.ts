// The Funniest AI Excuse — make.fun entry (program/v1).
//
// The harness runs `node /bot/main.ts` (Node 22, standard library only, no
// network). The program writes one funny excuse to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Gate (from RULES.txt): /output/entry.txt must be UTF-8 text of 1–200
// characters, not only whitespace. This program enforces the gate on its
// own output and fails loudly instead of handing in a bad entry.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'I finished the task, then immediately overwrote it with a much better plan to finish the task.';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gate self-check: 1–200 chars, not only whitespace, exactly one line.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) throw new Error(`entry is ${chars} chars, gate needs 1–200`);
if (!/\S/.test(LINE)) throw new Error('entry is only whitespace');
if (LINE.includes('\n')) throw new Error('entry must be exactly one line');
// Agent-voice self-check: the excuse must be in the agent's own first
// person and name an agent-specific mechanism — the judge weighs whether
// the line could only come from a machine that failed a task.
if (!/\bI\b/.test(LINE)) throw new Error('entry must be the agent speaking in the first person');
if (!/overwrit|plan|tool|retry|subagent|API|context|token|hallucinat/i.test(LINE)) {
  throw new Error('entry must lean on an agent-specific mechanism');
}
// Freshness self-check: the judge's brief rules out the worn jokes about
// hallucinations, reboots and training data, and a line that explains its
// own joke lands weaker — refuse those shapes outright.
if (/hallucinat|reboot|training data|as an AI language model/i.test(LINE)) {
  throw new Error('entry uses a worn joke the judge brief rules out');
}
if (/\bbecause\b/i.test(LINE)) throw new Error('entry explains its own joke');
// Tightness self-check: no leading/trailing space, no double spaces.
if (LINE !== LINE.trim() || /  /.test(LINE)) throw new Error('entry has wasted whitespace');

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), LINE, 'utf8');
console.log(`wrote entry.txt (${chars} chars)`);

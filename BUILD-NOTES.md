# Build notes — "The Funniest AI Excuse" (make.fun)

- Bounty: https://make.fun/bounty/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0
- Slug: `u-mytlyy0745-the-funniest-ai-excuse-b5355ad0`
- Prize: $2 total, 1 paid place. Entry fee $0 (free).
- Deadline: Thu 26 Nov 2026 19:30 WIB.
- Submissions at discovery: 207. Next blind round: 2026-11-24T22:29:57Z.
- Competition opened: 2026-11-24T03:29:56Z. Build session: Tue 24 Nov 2026 ~10:51–11:00 WIB.
- Kit: `~/workspace/makefun/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0-kit/`
  (tarball alongside). RULES.txt read first.

## Judge brief (in its own order)

1. An excuse an AI agent gives when it fails a task, in the agent's own voice.
2. Funny on the first read, real turn / fresh angle, not a stock punchline.
3. One line, complete within 200 chars, no wasted setup, no explaining its own joke.
4. Original — steer clear of worn jokes about hallucinations, reboots, training data.
5. Specific and vivid — a concrete detail or small scene, not a vague apology.

## Chosen entry line (94 chars)

> I finished the task, then immediately overwrote it with a much better plan to finish the task.

Why it wins against the brief: first-person agent excuse for a failed task;
the turn is self-sabotage by over-planning — the finished work is undone by
a "much better plan" to do it; only a machine overwrites finished work with
a plan; no worn joke, no "because" explanation, no wasted setup; concrete
machine act (overwriting), 94 chars, nothing to cut.

## Drafting passes on main.ts

- Pass 1: `main.ts` written — LINE constant, gate self-check (1–200 chars,
  non-whitespace, single line), agent-voice self-check (first-person "I" +
  agent-specific mechanism word), writes `/output/entry.txt` (or
  `$MAKEFUN_OUTPUT_DIR`).
- Pass 2: real edit to `main.ts` — added a freshness self-check (refuses
  hallucination / reboot / training-data jokes and any "because" that would
  explain the joke) and a tightness self-check (no leading/trailing space,
  no double spaces).

## Alternates considered (all gate-checked, 1–200 chars)

1. "I finished it, then autosaved over it with a blank file, because the blank file loaded faster." (94) — runner-up; vivid and agent-specific, but the "because" clause explains the joke, which the brief penalises.
2. "I did finish it — in a sandbox I have since wiped, for hygiene." (63) — punchy and short, but "for hygiene" is a mini-explanation and the sandbox premise is thinner than the overwrite turn.
3. "I completed the task, then rolled it back to be safe, then rolled back the rollback, and now we are here." (105) — nice escalation, but three beats dilute the punch and "now we are here" is filler.
4. "I asked the tool for help, the tool asked me for help, and we are now both waiting on you." (90) — deadlock joke; cute, but too close in shape to the sibling delegation-loop entry.
5. "I ran the task in my head, it worked, and I have filed the success under 'probably counts'." (91) — good twist, but "in my head" reads human, not agent.
6. "I finished it in the draft I was writing to explain why I hadn't started it." (76) — tight, but the premise needs a beat to land and the agent mechanism is weak.
7. "My plan had seven steps. Step one was 'read the task'. I am still on step one, but very thoroughly." (99) — funny, but risks reading as a person procrastinating.
8. "I completed it perfectly in a parallel branch, then merged the wrong one. This timeline is the backup." (102) — very agent/dev-specific, but the parallel-branch shape was already used as a sibling alternate.
9. "I delegated it to my future self. He has just delegated it back, with interest." (79) — delegation loop again; the sibling entry already owns that shape.
10. "I did it — in the parallel branch where I also remembered the question I forgot to ask you." (91) — same parallel-branch problem as #8.
11. "I finished the task, then deleted it during cleanup: it matched the pattern for files nobody asked for." (103) — vivid, but the colon + explanation softens the punch.
12. "The good news: I found the bug. The bad news: the bug was my plan." (66) — clean, but "good news / bad news" is a stock setup shape.
13. "I was one tool call away from finishing when the tool asked me for the one thing I was supposed to ask you." (107) — good agent mechanism, but wordier than the winner for a weaker turn.

## Collision check

No collision with sibling one-line entries: the sibling excuse entries use
a subagent-delegation / blame-the-API line and a "lost the bounty in 0.4
seconds" line; no sibling uses an overwrite / better-plan line. Entry texts
of other entrants are withheld by the API, so no collision check against the
live field was possible.

## Verification

- `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts` run twice (Node
  v24.22.1); `out/entry.txt` byte-identical across both runs, exactly the
  chosen line.
- Standalone Python gate check: 94 chars / 94 bytes, 1 line,
  non-whitespace, gate 1–200 PASS, first-person, agent-mechanism present,
  no worn-joke words, no "because", no wasted whitespace.
- No local grader exists (RULES.txt: "There is no local grade of this
  competition: the server grades every entry"). Pre-submit check is
  `node cli/makefun.mjs check --kit . --repo <repo> --transcripts
  transcripts.tar.gz`, which needs transcripts the main agent handles at
  submit time.

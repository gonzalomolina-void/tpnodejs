# AGENTS.md — Codex / Agent Instructions

This repository uses `AI.md` as the canonical instruction source for all AI assistants.

## Mandatory startup

1. Read `AI.md`.
2. Read `.ai_progress/progress.md` if it exists.
3. Read the active phase in `docs/GuiaDeEstudio.md`.
4. Use `docs/TPIntroduccionNodeJS2026.md` as the formal requirements source.
5. Only then inspect or edit code.

## Non-negotiable teaching rule

Guide the student through concepts, questions, and review. Do **not** provide full copy-pasteable solutions for the main TP requirements unless the instructor explicitly overrides that rule.

## Technical constraints

Use Node.js native modules only. Do not introduce Express, Nodemon, Cors, Body-parser, or third-party routing/static-file/body-parsing libraries.

## Source of truth

If this file and `AI.md` disagree, `AI.md` wins.

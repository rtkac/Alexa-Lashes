---
name: pr-description
description: Drafts a conventional-commit-style PR title and a human-readable PR description (SUMMARY/CHANGES/testing/checks) for a chosen scope of the current branch. Use when the user asks for a PR title/description, wants to open a PR, or asks you to create one with `gh`.
---

## Context

Current branch:

!`git rev-parse --abbrev-ref HEAD`

Recent commits on this branch:

!`git log --oneline -15`

Do not assume scope from this alone — see step 1. This is just orientation, not the diff to summarize.

## Instructions

### 1. Ask what to base the description on — every time

Never guess the scope, and never default to "whole branch vs main." That default is why past
descriptions all looked the same and dumped every change in the branch regardless of what was
actually asked for. Ask first, with `AskUserQuestion`, offering:

- **Last commit** — just `HEAD`.
- **Last N commits** — ask how many if the user picks this.
- **Whole branch vs `main`** — everything on this branch not yet on `main`.
- **Something else** — a different base branch, a commit range, etc. Let the user describe it.

Only after getting an answer, run the git commands that match it:

- Last commit: `git show --stat HEAD` (and `git show HEAD` if you need the full diff).
- Last N commits: `git log -N --oneline` and `git diff HEAD~N..HEAD --stat` (pull the full diff too
  if it's small enough to read).
- Whole branch vs main: `git log main..HEAD --oneline` and `git diff main...HEAD --stat`.
- Something else: whatever `git log`/`git diff` invocation matches what the user described.

Base everything below on that scope only — don't reach outside it.

### 2. Determine the type and title

- From the commits in-scope, pick the single `type` that best represents the change, using the
  types from `commitlint.config.ts`: `build, chore, ci, docs, feat, fix, perf, refactor, revert,
style, test`. If they mix types, pick the dominant/most-significant one (e.g. a `feat` commit
  outweighs an accompanying `chore`).
- Title format matches the commit convention: `<type>: <short description>`, imperative/past-tense
  consistent with existing commits in this repo (e.g. `feat: added edit review dialog with form`).
- Keep the title concise — aim under ~70 characters even though `commitlint` allows up to 260 for
  commit headers; PR titles should stay scannable in GitHub's UI.
- Do not include a ticket ID unless one is visible in the branch name or commit messages.

### 3. Draft the description

Write like a person describing their own change to a teammate, not a changelog generator. Short,
plain sentences. No corporate boilerplate ("This PR introduces...", "This change aims to..."). Say
what happened and, where it's not obvious, why — in the same breath, not split across sections.
Keep the whole thing proportional to the scope: a one-commit PR gets a few lines, not a padded
template with every section filled in for the sake of it.

Section shape, in order. Omit a section that wouldn't add anything (e.g. skip `## HOW TO TEST` if
there's nothing meaningfully different to verify beyond normal review):

```markdown
## SUMMARY

2-4 sentences, in plain language: what changed and, if it's not self-evident, why. Blend the
motivation into the same sentences instead of a separate WHY section — write it the way you'd
explain it out loud, not as a bullet-pointed spec.

## CHANGES

Bullet list of the concrete changes (areas touched, new components, schema changes, etc.). Group
related commits together rather than listing commit-by-commit. Keep each bullet a short, readable
phrase — not a mini-paragraph, and not an exhaustive per-file listing.

## HOW TO TEST

Only if manual verification is non-obvious — steps to run locally, pages/routes to check, edge
cases to try. Skip for trivial changes.

## CHECKS

Checklist of what you actually ran before opening the PR, e.g.:

- [x] `bun run lint`
- [x] `bun run format`
- [x] `bun run build`

Only check items you actually ran in this session and that passed. Leave unchecked (or omit) any
you didn't run — never mark something passed that wasn't verified. There is no test suite in this
repo (per CLAUDE.md), so don't invent a `test` step.
```

### 4. Decide how to deliver it

Ask (or infer from phrasing) whether the user wants:

- **Just the draft** — output the title and the full description in a single fenced markdown block
  so it can be copied and pasted directly into GitHub's "New Pull Request" form.
- **You to open the PR** — run the checks in `## CHECKS` first if they haven't been run yet this
  session (`bun run lint`, `bun run format`, `bun run build`), update the checklist based on real
  results, push the branch if needed, then create the PR with `gh pr create --title "..." --body
"$(cat <<'EOF' ... EOF)"` targeting `main`. Confirm before pushing/creating if it wasn't already
  clearly requested. Return the PR URL when done.

Always end the PR body with the attribution line given in this conversation's system reminder (the
`🤖 Generated with [Claude Code]` line), same as for commit messages.

---
name: pr-description
description: Drafts a conventional-commit-style PR title and a structured PR description (WHAT/CHANGES/WHY/testing/checks) for the current branch. Use when the user asks for a PR title/description, wants to open a PR, or asks you to create one with `gh`.
---

## Context

Current branch:

!`git rev-parse --abbrev-ref HEAD`

Commits on this branch not on `main`:

!`git log main..HEAD --oneline`

Diff stat vs `main`:

!`git diff main...HEAD --stat`

## Instructions

### 1. Determine the type and title

- Look at the branch name (`<type>/<short-description>`) and the commits above. Pick the single
  `type` that best represents the overall change, using the types from `commitlint.config.ts`:
  `build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test`. If commits mix types,
  pick the dominant/most-significant one (e.g. a `feat` commit outweighs an accompanying `chore`).
- Title format matches the commit convention: `<type>: <short description>`, imperative/past-tense
  consistent with existing commits in this repo (e.g. `feat: added edit review dialog with form`).
- Keep the title concise — aim under ~70 characters even though `commitlint` allows up to 260 for
  commit headers; PR titles should stay scannable in GitHub's UI.
- Do not include a ticket ID unless one is visible in the branch name or commit messages.

### 2. Draft the description

Use this section shape, in order. Omit a section if it wouldn't add anything beyond what's already
said (e.g. skip `## WHY` for a mechanical refactor/chore with no interesting motivation; skip
`## HOW TO TEST` if there's nothing meaningfully different to verify beyond normal review).

```markdown
## WHAT

1-3 sentences: what this PR does, at a glance.

## CHANGES

Bullet list of the concrete changes (files/areas touched, new components, schema changes, etc.).
Group related commits together rather than listing commit-by-commit.

## WHY

Only if it adds context the reader wouldn't infer from WHAT/CHANGES — motivation, the problem being
solved, a linked issue/ticket if one exists.

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

### 3. Decide how to deliver it

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

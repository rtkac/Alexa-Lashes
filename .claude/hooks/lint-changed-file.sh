#!/usr/bin/env bash
# PostToolUse hook: lints the file Claude just edited/wrote.
# On failure, prints oxlint's output to stderr and exits 2 so Claude sees it
# as feedback and can fix the issue before moving on.
set -euo pipefail

# Fail open if jq isn't available rather than blocking every edit.
command -v jq >/dev/null 2>&1 || exit 0

input=$(cat)
file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')

# Nothing to lint (e.g. tool_input had no file_path, or the file was deleted).
[[ -n "$file_path" && -f "$file_path" ]] || exit 0

case "$file_path" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs) ;;
  *) exit 0 ;;
esac

# routeTree.gen.ts / *.gen.ts / paraglide output are generated, don't lint them.
case "$file_path" in
  *routeTree.gen.ts | *.gen.ts | */paraglide/*) exit 0 ;;
esac

repo_root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$repo_root"

if output=$(bun run lint "$file_path" 2>&1); then
  exit 0
fi

echo "oxlint found issues in $file_path — fix them before continuing:" >&2
echo "$output" >&2
exit 2

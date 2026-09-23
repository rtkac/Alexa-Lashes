#!/usr/bin/env bash
# PostToolUse hook: builds the workspace package (apps/* or packages/*) that
# the file Claude just edited/wrote belongs to, via Turborepo (so dependent
# packages are rebuilt too per turbo.json's dependsOn: ["^build"]).
# On failure, prints the build output to stderr and exits 2 so Claude sees it
# as feedback and can fix the issue before moving on.
set -euo pipefail

command -v jq >/dev/null 2>&1 || exit 0

input=$(cat)
file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')

[[ -n "$file_path" && -f "$file_path" ]] || exit 0

case "$file_path" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs) ;;
  *) exit 0 ;;
esac

case "$file_path" in
  *routeTree.gen.ts | *.gen.ts | */paraglide/*) exit 0 ;;
esac

repo_root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$repo_root"

rel_path="${file_path#"$repo_root"/}"

pkg_dir=""
case "$rel_path" in
  apps/*) pkg_dir="apps/$(printf '%s' "$rel_path" | cut -d/ -f2)" ;;
  packages/*) pkg_dir="packages/$(printf '%s' "$rel_path" | cut -d/ -f2)" ;;
esac

# File isn't inside a workspace app/package (e.g. root config) — nothing to build.
[[ -n "$pkg_dir" && -d "$pkg_dir" ]] || exit 0

if output=$(bun run build --filter="./$pkg_dir" 2>&1); then
  exit 0
fi

echo "Build failed for $pkg_dir after editing $file_path — fix it before continuing:" >&2
echo "$output" >&2
exit 2

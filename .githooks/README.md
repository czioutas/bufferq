# Git hooks

Hooks live here (instead of `.git/hooks`) so they're version-controlled.

## Setup (once per clone)

```sh
git config core.hooksPath .githooks
```

## Hooks

- `commit-msg` — rejects commits whose message doesn't *start with* one of the
  `type:` tags that [`GitVersion.yml`](../GitVersion.yml) uses to decide
  version bumps, e.g. `type: fix: short description`
  (`type: fix`, `type: feature`, `type: breaking`, `type: skip`, etc).

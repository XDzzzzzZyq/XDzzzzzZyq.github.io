---
slug: blender-development
lang: en
---

## Overview

Ongoing upstream contribution to **Blender**, working alongside its maintainers
inside a production, mid-to-large C++ codebase. The work centers on the **curve
sculpting and geometry editing** pipeline, plus a handful of bug fixes to
material and curve-mapping interactions. **Five pull requests** have been
accepted into the official repository.

## Main contributions

- **Curve radius initialization.** When sculpting hair, new hairs no longer have
  to start from a fixed value — radius and other vertex attributes can be
  interpolated from the surrounding existing hairs.
- **Curve mapping.** Fixed a long-standing interaction issue, and added
  multi-point selection with slider control across all curve-mapping
  operations.
- **Documentation.** The user-facing docs were updated alongside the code, with
  the Chinese translation handled as well.

## What it taught

Contributing to a codebase this size is mostly reading. Most changes turned out
to be more involved than they first looked. Each one has to match existing
standards, thread through the data layer and the UI, and survive public review
before it lands — a very different engineering flow from a personal project
where every decision is yours.

## Contribution reports

[projects.blender.org/Zyq-XDz](https://projects.blender.org/Zyq-XDz/.profile/src/branch/main/reports/reports.md)

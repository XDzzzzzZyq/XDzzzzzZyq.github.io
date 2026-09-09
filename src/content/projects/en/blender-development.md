---
slug: blender-development
lang: en
---

## Overview

Ongoing upstream contribution to **Blender**, working inside a production C++
codebase alongside its maintainers. The work centers on the **curve sculpting
and geometry editing** pipeline, plus smaller fixes to material and
curve-mapping interactions. **Five pull requests** have been accepted into the
official repository.

## Contributions

- **Curve radius initialization.** New curves start with a well-defined radius
  instead of inheriting an arbitrary value, which makes subsequent sculpting
  predictable.
- **Radius interpolation.** Radius is interpolated along the curve rather than
  applied per point, so tapering behaves continuously.
- **UI integration.** The new parameters are exposed through the regular
  operator and panel layout, following existing conventions rather than adding a
  bespoke widget.
- **Documentation.** The user-facing docs were updated alongside the code, since
  a feature that is not documented is effectively invisible.
- **Material and curve mapping.** Several material property editing and
  curve-mapping interactions were smoothed out.

## What it taught

Contributing to a codebase this size is mostly reading. Each change has to
match existing conventions, thread through the data layer and the UI, and
survive public review before it lands — a very different discipline from
building a personal project where every decision is yours.

## Contribution reports

[projects.blender.org/Zyq-XDz](https://projects.blender.org/Zyq-XDz/.profile/src/branch/main/reports/reports.md)

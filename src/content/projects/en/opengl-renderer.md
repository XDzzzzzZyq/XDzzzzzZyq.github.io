---
slug: opengl-renderer
lang: en
---

## Overview

A long-term personal project: build a **real-time rendering engine** from
scratch in C++ and modern OpenGL, with physically based shading,
high-quality shadowing, signed distance fields, and real-time global
illumination. Over more than two years, the codebase grew past
**15,000 lines of C++/OpenGL** across **450+ commits**, alongside study of
**30+ foundational and state-of-the-art graphics papers** — including
reproductions of **3 SIGGRAPH works**.

## Method

- **Physically based rendering.** Cook–Torrance BRDF, energy-conserving
  diffuse + specular, proper tone mapping.
- **High-quality shadowing.** Cascaded and PCF/PCSS soft shadow
  techniques.
- **Signed distance fields.** SDF-based geometry and ray marching for
  implicit surfaces.
- **Spatio-temporal denoising.** Temporal accumulation combined with
  edge-aware spatial filters to keep noise low at low sample counts.
- **Real-time global illumination.** Light-probe and reflective-shadow-map
  style approaches, plus screen-space contributions.

## What was reproduced

- Three SIGGRAPH works, each reduced to a runnable scene inside the
  custom engine.
- Several smaller papers on BRDFs, samplers, and denoising.

## Skills built

- Advanced C++ and modern OpenGL for real-time graphics systems.
- GPU architecture, high-performance computing, and shader programming.
- The discipline of building a real engine over years, not a demo over
  weekends.

## Repository

[github.com/XDzzzzzZyq/OpengL](https://github.com/XDzzzzzZyq/OpengL)

# WebGL Implementation of Reflective Gaussian Splatting (Ref-Gaussian)

## Overview

3D Gaussian Splatting produces photorealistic novel views, but most
browser-native ports either lose fidelity or fail to hit real-time frame
rates on consumer laptops. This signature work ports the latest
**Reflective Gaussian Splatting (Ref-Gaussian)** pipeline to **WebGL**,
shipping a Docker-deployed browser experience that runs at **60+ FPS** on
typical hardware and supports glossy/reflective surfaces.

## Method

- **WebGL renderer.** Re-implemented the Ref-Gaussian pipeline in WebGL
  with custom shaders, optimized loading, and careful memory budgeting.
- **Approximate Tangent Axis (ATA) estimation.** Proposed for Gaussian
  Surfels rasterization, producing smoother position maps and improved
  visual stability, especially on curved or reflective regions.
- **Throughput tricks.**
  - Early alpha discard to skip fully-transparent splats before
    fragment work.
  - View-frustum culling at the chunk level.
  - Chunk-based lazy updates so only visible chunks re-upload each frame.
- **End-to-end pipeline.** COLMAP reconstruction → Ref-Gaussian inference →
  data post-processing → Docker-based web deployment, for a fully
  reproducible campus-navigation experience in the browser.

## Results

- 60+ FPS real-time WebGL rendering of Ref-Gaussian on consumer-grade
  laptops.
- Smoother visual quality on reflective surfaces thanks to ATA.
- Significantly reduced GPU utilization compared to the naïve port.

## Repository

[github.com/XDzzzzzZyq/dku-splat](https://github.com/XDzzzzzZyq/dku-splat)

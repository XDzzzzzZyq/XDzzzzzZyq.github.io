---
slug: cuda-vision
lang: en
---

## Overview

Built for **CS207: Image Data Science**, a **CUDA-accelerated Python library**
for image processing and computer vision. The goal was to learn GPU
programming hands-on by implementing a set of canonical operators end to
end, and to explore how **PyTorch + CUDA + C++** can be stitched together
for fast research prototyping.

## Implemented operators

- **Convolution** (2D image filters).
- **Geometric transformations** (affine transforms, non-linear warps,
  resampling).
- **Dithering** (ordered and error-diffusion).
- **Morphological operations** (erosion, dilation, opening, closing).
- **Texture segmentation** (simple feature-driven pipelines).

## Method

- **Hybrid pipeline.** The CUDA operators are wrapped as PyTorch extensions
  callable straight from Python, so no GPU↔CPU copy is needed.
- **Performance tuning.** Shared memory and similar techniques raise cache
  hit rates and cut memory traffic.

## Results

- Learned how to tune operators for high-throughput GPU performance.
- Solid foundation for follow-up work that mixes deep learning with
  classical CV on the GPU.

## Repository

[github.com/XDzzzzzZyq/cuda-vision](https://github.com/XDzzzzzZyq/cuda-vision)

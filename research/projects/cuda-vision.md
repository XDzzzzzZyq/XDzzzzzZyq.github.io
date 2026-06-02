# CUDA Image Processing Operator Development

## Overview

A coursework-driven project to build a **CUDA-accelerated Python library**
for image processing and computer vision. The goal was to learn GPU
programming hands-on by implementing a set of canonical operators end to
end, and to explore how **PyTorch + CUDA + C++** can be stitched together
for fast research prototyping.

## Implemented operators

- **Convolution** (2D image filters).
- **Geometric transformations** (affine warps, resampling).
- **Dithering** (ordered and error-diffusion).
- **Morphological operations** (erosion, dilation, opening, closing).
- **Texture segmentation** (simple feature-driven pipelines).

## Method

- **Hybrid pipeline.** PyTorch tensors feed CUDA kernels directly,
  avoiding CPU↔GPU copies when possible. C++ glue code handles the
  lowest-level operators that need to drop below PyTorch's abstractions.
- **Throughput focus.** All operators are written with coalesced memory
  access and adequate occupancy in mind.

## Results

- High-throughput GPU performance across all implemented operators.
- A practical demonstration of when to use raw CUDA vs. higher-level
  PyTorch primitives.
- Solid foundation for follow-up work that mixes deep learning with
  classical CV on the GPU.

## Repository

[github.com/XDzzzzzZyq/cuda-vision](https://github.com/XDzzzzzZyq/cuda-vision)

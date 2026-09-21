---
slug: joint-distribution-flow-matching
lang: en
---

## Overview

Diffusion posterior sampling (DPS) turns a pretrained generative model into a
solver for general inverse problems, but it assumes a score model trained on
*complete* high-dimensional data. Satellite imagery breaks that assumption:
clouds, sensor gaps, and failed acquisitions leave only incomplete
observations, so **no complete dataset exists from which to learn the joint
distribution**. **MissingJiT** learns that joint distribution directly from
missing data, then performs posterior sampling in the resulting flow-matching
model.

## Approach

- **Learning the joint from missing data.** The model is trained on incomplete
  imagery directly — no complete reference is required — which is what
  separates it from a conditional inpainting regressor.
- **A flow-matching analogue of DPS.** Posterior sampling is adapted to a
  flow-matching model, so conditioning on partial observations needs no
  task-specific retraining.
- **Perceptual likelihood.** A perceptual similarity term is used in place of a
  plain L2 likelihood to keep fine-scale texture.

## Results

- Unconditioned sampling reveals realistic geophysical structure.
- Conditioning on partial observations enables spatially coherent inpainting.

## Status

Manuscript in preparation; details will follow with the publication this year.

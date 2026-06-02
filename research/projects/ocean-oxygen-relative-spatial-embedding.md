# Enhancing Ocean Surface Oxygen Representation via Relative Spatial Embedding

## Overview

Ocean surface oxygen is shaped by complex, time-varying physical and chemical
processes. Satellite observations give global coverage, but the time series
are huge (hundreds of gigabytes) and the absolute spatial coordinates alone
are not enough to teach a model the meaningful local neighborhoods. This
project investigates whether **relative spatial embeddings** can replace or
augment absolute position to improve ocean surface feature representation.

## Method

- **Models examined.**
  - Vision Transformer (ViT), which uses absolute positional encoding.
  - Positional-induced Transformer, which conditions attention on absolute
    positions.
  - Relative Position Embedding (RPE), which lets each attention head learn a
    distance-aware weighting between spatial tokens.
- **Pipeline.** A satellite data matching system and a corresponding data
  loader were implemented to align multi-source observations into a common
  spatio-temporal grid, and to feed the models in mini-batches that respect
  the hundreds-of-GB scale.
- **Evaluation.** Reconstruction quality and downstream forecasting metrics
  on held-out regions.

## Results

- Relative spatial embedding consistently outperformed absolute positional
  encoding on ocean surface oxygen fields, especially in regions with strong
  local gradients.
- Models trained with RPE generalized better across time, suggesting they
  learn more transferable spatial priors.
- The matching + loader pipeline cut preprocessing time substantially,
  enabling experiments that were previously infeasible at full data scale.

## Skills built

Transformer architectures, spatial embedding design, representation
learning on large geospatial time series.

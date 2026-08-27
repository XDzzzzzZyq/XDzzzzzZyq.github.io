---
slug: gene-expression-neural-ode
lang: en
---

## Overview

Spatial transcriptomics data can be viewed as a noisy **Poisson sampling** of
an underlying continuous **gene expression field** that has been diffused
across the tissue. Recovering that field from sparse observations is a hard
inverse problem. This project proposes a deep learning algorithm that solves
it by **reversing a Neural ODE process** to generate reliable Poisson
samples, and combines supervised pretraining with semi-supervised operator
learning to stabilize the inversion.

## Method

- **Forward model.** The true field is treated as a continuous function on
  tissue. Diffusion smooths the field, and the ST capture step is a Poisson
  sampling of the diffused field.
- **Reversed Neural ODE.** A neural network parameterizes the vector field
  that **runs the diffusion in reverse**, turning noisy observations back
  into a clean estimate of the original field.
- **Training strategy.**
  - **Supervised pretraining** on synthetic fields with known ground truth,
    so the network first learns the dynamics.
  - **Semi-supervised operator learning** on real ST data, where the same
    network generalizes across tissues and gene panels.
- **Fluid dynamics intuition.** The diffusion step borrows from
  advection-diffusion PDEs, so the same approach is reusable for any
  observation that looks like a noisy sample of a diffused field.

## Results

- Accurate reconstruction of the gene expression mean field from sparse
  samples on 2D tissue grids.
- Robust to different noise levels and capture protocols.
- Builds intuition for fluid-like diffusion processes in biological data,
  which feeds back into the GVAE project.

## Status

Internship outcome. Code and paper to be released alongside the GVAE work.

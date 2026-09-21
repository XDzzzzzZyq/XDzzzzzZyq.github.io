---
slug: gvae-spatial-transcriptomics
lang: en
---

## Overview

Spatial transcriptomics (ST) captures gene expression at spatial locations
across tissue, but the raw counts are corrupted by two distinct effects:
zero-inflated observation noise, and the physical diffusion of transcripts
during wet-lab capture. PinFuse is a **light-weight Graph Variational
Auto-Encoder (GVAE)** whose decoder is a **neural advection-diffusion
operator**, built to reconstruct the underlying gene expression field while
respecting two physical constraints: localized graph structure and total mass
conservation.

## Approach

- **Transport-aware denoising.** Deblurring is treated as an explicit transport
  process rather than generic count imputation, which keeps the reconstruction
  physically plausible.
- **Physical constraints by construction.** Localized graph structure and mass
  conservation are built into the model rather than added as soft penalties.
- **Probabilistic modelling.** The observation noise is handled with a
  probabilistic likelihood suited to ST's heavy-tailed, zero-heavy counts.

## Results

- Accurate, smooth reconstruction of gene expression fields from sparse
  samples.
- Improved downstream performance on latent clustering and marker purity over
  recent methods including ResolVI.

## Status

Manuscript in preparation. A preprint and code release will follow this year.

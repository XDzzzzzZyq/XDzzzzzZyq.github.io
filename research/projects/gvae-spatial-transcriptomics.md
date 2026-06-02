# Spatial Transcriptomics Denoising through GVAE and Mass Conservation

## Overview

Spatial transcriptomics (ST) captures gene expression at spatial locations across
tissue, but the raw counts are corrupted by zero-inflated observation noise and
gene diffusion during the wet-lab capture step. This project builds a
**light-weight Graph Variational Auto-Encoder (GVAE)** that reconstructs the
underlying gene expression field while preserving two physical constraints:
localized graph structure and total mass conservation.

## Method

- **Graph structure.** Tissues are modeled as spatial graphs; genes diffuse only
  between adjacent bins. The encoder builds message-passing layers over this
  graph, so the latent stays anchored to the underlying geometry.
- **Zero-inflated negative binomial likelihood.** A ZINB decoder is fit per
  gene, matching the heavy-tailed, zero-heavy count distribution of ST data.
- **Mass conservation.** A soft conservation penalty keeps the total mass of
  each gene close to its observed total, so reconstructions cannot silently
  hallucinate or destroy counts.
- **Probabilistic inference.** Implemented in **Pyro** so the ELBO, prior, and
  likelihood stay factorized and inspectable.

## Results

- Accurate reconstruction of gene expression fields from sparse samples.
- Improved downstream performance on latent clustering, cell-level, and
  bin-level classification.
- Diffusion-like behavior is recovered from sparse observations, which suggests
  the learned latent tracks spatial dynamics meaningfully.

## Status

Manuscript in preparation. A preprint and code release will follow this year.

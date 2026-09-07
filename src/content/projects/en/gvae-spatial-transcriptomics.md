---
slug: gvae-spatial-transcriptomics
lang: en
---

## Overview

Spatial transcriptomics (ST) captures gene expression at spatial locations across
tissue, but the raw counts are corrupted by zero-inflated observation noise and
gene diffusion during the wet-lab capture step. Building on the
Position-induced Transformer (PiT), this project pairs a **light-weight Graph Variational Auto-Encoder (GVAE)** with a **neural advection-diffusion operator** to
reconstruct the underlying gene expression field while preserving two physical
constraints: localized graph structure and total mass conservation.

## Method

- **Graph structure.** Tissue sections are modeled as spatial graphs; genes
  diffuse only between adjacent bins. High-dimensional transcriptomic
  information is compressed into a latent space that keeps the spatial
  structure intact. The neural advection-diffusion operator is built on PiT,
  balancing interpretability against how mRNA molecules actually move.
- **Zero-inflated negative binomial likelihood.** A ZINB decoder is fit per
  gene, matching the heavy-tailed, zero-heavy count distribution of ST data.
- **Mass conservation.** The decoder redistributes each gene's total count
  across the graph, so conservation holds by construction rather than as a
  penalty.
- **Probabilistic inference.** Implemented twice, in **PyTorch** and **Pyro**,
  so the ELBO, prior, and likelihood stay factorized and inspectable.

## Results

- Accurate, smooth reconstruction of gene expression fields from sparse
  samples.
- Improved downstream performance on latent clustering, cell-level and
  bin-level classification, and marker purity.
- The reconstruction models advection-diffusion explicitly, which surfaces a
  correlation between diffusivity and tissue density — consistent with the
  underlying physics.

## Status

Manuscript in preparation. A preprint and code release will follow this year.

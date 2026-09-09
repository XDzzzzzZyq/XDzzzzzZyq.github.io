---
slug: bpinn-kalman-time-series
lang: en
---

## Overview

Many real systems are governed by **stochastic differential equations (SDEs)**
whose parameters or initial conditions we want to recover from noisy
observations — a time series inverse problem. This project proposes a deep
learning model that combines **Bayesian neural networks (BNNs)**,
**physics-informed neural networks (PINNs)**, and a **Kalman filter** in one
pipeline, and introduces a **patched covariance method** to improve filter
performance.

## Method

- **Bayesian-PINN core.** A BNN encodes uncertainty over the unknown
  parameters, so the B-PINN carries both physics-prior consistency and an
  uncertainty estimate.
- **Kalman filter stage.** The B-PINN posterior is fed into a Kalman
  filter to propagate uncertainty forward in time and fuse it with new
  observations.
- **Patched covariance method.** Discretizing the whole physical field leaves a
  state so high-dimensional that a global covariance is impractical
  (`O(w^4)`). Patching the domain spatially brings the cost down to
  `O(W^2 P^2)`, and is more stable when observations are sparse or irregular.
- **Implementation.** Built in **PyTorch**. A **CUDA-accelerated 2D
  advection-diffusion fluid solver** is implemented as a neural operator
  backend, providing fast forward simulations during training.

## Results

- Successfully implemented the B-PINN-Kalman filter pipeline and replicated
  several flow estimation, image generation, and time series inverse problem
  papers.
- The patched covariance method improved convergence speed and stability over
  a full-covariance baseline.
- Built a strong working knowledge of BNNs, PINNs, and SDEs along the way.

## Code

Repository: [github.com/XDzzzzzZyq/b-pinn-kalman-filter](https://github.com/XDzzzzzZyq/b-pinn-kalman-filter)

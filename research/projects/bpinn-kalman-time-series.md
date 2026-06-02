# Solving Time Series Inverse Problems by Combining Bayesian-PINN with Kalman Filter

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
  parameters; a PINN term adds the underlying PDE/SDE residual as a soft
  constraint so the inferred dynamics stay physically consistent.
- **Kalman filter stage.** The BNN-PINN posterior is fed into a Kalman
  filter to propagate uncertainty forward in time and fuse it with new
  observations.
- **Patched covariance method.** The full covariance is approximated by
  smaller, spatially or temporally local patches. This is cheaper to invert
  and more stable when observations are sparse or irregular.
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

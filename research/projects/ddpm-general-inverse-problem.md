# General Study of Denoising Diffusion Probability Models

## Overview

This independent study surveys **score-based diffusion** and
**denoising diffusion probabilistic models (DDPMs)** in the context of the
**general inverse problem**: given a noisy, possibly incomplete measurement
of a signal, recover the signal itself. The work covers the mathematical
background, the practical implementation, and a comparison of approaches
on linear and nonlinear inverse problems.

## Topics covered

- **Stochastic differential equations.** Forward (noising) and reverse
  (denoising) SDEs, score functions, and the link between DDPM and SDE
  discretization.
- **Score-based diffusion.** Noise-conditional score networks and how to
  train them.
- **Diffusion posterior sampling (DPS).** How to condition a pretrained
  diffusion model on a measurement without retraining.
- **Linear and nonlinear inverse problems.** Image inpainting, super-resolution,
  deblurring, and compressed-sensing-style reconstructions.

## Implementation

- Implemented diffusion posterior sampling from scratch in **PyTorch**.
- Replicated several DDPM and diffusion-sampling papers for both linear and
  nonlinear inverse problems.

## Skills built

A solid mathematical foundation in score-based diffusion, and the ability
to translate SDE-level theory into a working sampler.

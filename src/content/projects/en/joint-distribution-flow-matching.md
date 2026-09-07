---
slug: joint-distribution-flow-matching
lang: en
---

## Overview

Diffusion posterior sampling (DPS) turns a pretrained generative model into a
solver for general inverse problems by augmenting its score with a likelihood
gradient. It rests on two assumptions that fail for real sensor data: the
forward process must be variance-preserving, and a score function must already
model the joint distribution of *complete* high-dimensional data.

Satellite imagery violates both. Clouds, sensor gaps, and failed acquisitions
leave only incomplete observations, so **no complete dataset exists from which
to learn the joint distribution**. **MissingJiT** learns that joint distribution
directly from missing data, then performs posterior sampling in the resulting
flow-matching model.

## Method

- **Learning the joint from missing data.** A pixel-space *Just image
  Transformer* (JiT) drops every patch containing a missing pixel at
  tokenization, so each sample contributes a variable number of tokens. Under a
  missingness-at-random assumption, maximizing the observed-patch likelihood is
  equivalent to maximizing the marginal likelihood of the true joint — so the
  optimum recovers the distribution over complete images even though a complete
  image is never seen. This is what separates the model from a conditional
  inpainting regressor.
- **Variable-length packing.** Following NaViT, tokens from several images are
  flattened into a single sequence and masked attention keeps tokens of
  different images from attending to one another, giving a training signal
  independent of the missing pattern.
- **Geo-referenced conditioning.** On top of the JiT backbone (RoPE, SiLU), an
  absolute spatial embedding from each patch's latitude/longitude and a seasonal
  embedding of time-of-year are fused with the diffusion-time conditioning
  through adaLN-style modulation — geophysical fields depend on *where* and
  *when*, not only on relative position.
- **FM-DPS.** Flow matching is not a VP-SDE, so DPS does not transfer directly.
  The SDE whose time-marginals match the linear-interpolation path is derived,
  then its time-reversed probability-flow ODE, which isolates the score with an
  explicit coefficient. Because JiT predicts the clean image, the posterior mean
  needed by the DPS likelihood term is the network output itself, and posterior
  sampling requires no task-specific retraining.
- **SSIM likelihood.** The Gaussian L2 likelihood penalizes per-pixel deviation
  and averages out high-frequency detail. Replacing it with a differentiable
  structural-similarity (SSIM) distance steers reconstructions toward
  perceptually consistent edges, gradients, and texture.

## Results

On single-channel sea-surface temperature crops:

- Unconditioned sampling already reveals realistic geophysical structure.
- Conditioning on partial observations enables spatially coherent inpainting.

## Status

Manuscript in preparation; quantitative evaluation is ongoing. The work will be
published this year.

## References

- Li & He, *Back to Basics: Let Denoising Generative Models Denoise* (JiT) —
  [arXiv:2511.13720](https://arxiv.org/abs/2511.13720)
- Chung et al., *Diffusion Posterior Sampling for General Noisy Inverse
  Problems* — [arXiv:2209.14687](https://arxiv.org/abs/2209.14687)
- Song et al., *Score-Based Generative Modeling through Stochastic Differential
  Equations* — [arXiv:2011.13456](https://arxiv.org/abs/2011.13456)
- Dehghani et al., *Patch n' Pack: NaViT* —
  [arXiv:2307.06304](https://arxiv.org/abs/2307.06304)

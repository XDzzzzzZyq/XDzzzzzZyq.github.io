# 反射高斯泼溅（Ref-Gaussian）的 WebGL 实现

## 概览

3D 高斯泼溅可以生成照片级真实感的新视角，但大多数浏览器原生实现要么损失
画质，要么在消费级笔记本上达不到实时帧率。本项目将最新的
**反射高斯泼溅（Ref-Gaussian）** 流水线移植到 **WebGL**，并通过 Docker
部署浏览器端体验，使其在常规硬件上达到 **60+ FPS**，且支持光泽/反射表面。

## 方法

- **WebGL 渲染器。** 使用自定义着色器重新实现 Ref-Gaussian 流水线，
  优化加载流程并精细控制显存。
- **近似切线轴（ATA）估计。** 针对高斯面片的光栅化提出，使位置图更平滑，
  在曲面与反射区域视觉稳定性更好。
- **吞吐优化。**
  - 早 alpha 丢弃：在片元阶段前跳过完全透明的高斯；
  - 视锥剔除：以 chunk 为粒度；
  - 分块懒更新：仅对可见 chunk 进行每帧重传。
- **端到端流水线。** COLMAP 重建 → Ref-Gaussian 推理 → 数据后处理 →
  基于 Docker 的 Web 部署，形成可复现的校园导航浏览器体验。

## 结果

- 在消费级笔记本上实现 60+ FPS 的实时 WebGL Ref-Gaussian 渲染；
- 由于 ATA 引入，反射表面视觉质量更平滑；
- 相较朴素移植版本，GPU 占用显著降低。

## 仓库

[github.com/XDzzzzzZyq/dku-splat](https://github.com/XDzzzzzZyq/dku-splat)

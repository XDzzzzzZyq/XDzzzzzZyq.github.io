---
slug: joint-distribution-flow-matching
lang: cn
---

## 概览

Diffusion posterior sampling（DPS）通过在 score 上叠加似然梯度，把预训练生成
模型变成通用反问题求解器。但它依赖两个在真实传感器数据上并不成立的假设：
前向过程必须是方差保持（variance-preserving）的，且必须已有一个 score 函数
刻画了*完整*高维数据的联合分布。

卫星影像同时违背这两点。云层、传感器缺口与失败的获取只留下不完整观测，
因此**根本不存在可用于学习联合分布的完整数据集**。**MissingJiT** 直接从缺失
数据中学习该联合分布，再在得到的 flow matching 模型上执行后验采样。

## 方法

- **从缺失数据中学习联合分布。** 像素空间的 *Just image Transformer*（JiT）
  在 tokenization 阶段丢弃所有含缺失像素的 patch，因此每个样本贡献的 token
  数量是可变的。在随机缺失（missingness-at-random）假设下，最大化已观测
  patch 的似然等价于最大化真实联合分布的边缘似然——即便从未见过一张完整
  影像，最优解仍然恢复完整影像上的分布。这一点把它与条件式补全回归模型
  区分开来。
- **变长序列打包。** 参照 NaViT，将多张影像的 token 展平进同一个序列，并用
  掩码注意力保证不同影像的 token 互不注意，由此得到与缺失模式无关的训练
  信号。
- **地理参考条件。** 地球物理场取决于*在哪里*、*在何时*，而不只是相对位置。在 JiT 架构（RoPE、SiLU）之上，把由每个 patch 的经纬度
  得到的绝对空间嵌入、以及编码年内时相的季节嵌入，与扩散时间条件一起通过
  adaLN 式调制注入。
- **FM-DPS。** flow matching 并非 VP-SDE，DPS 无法直接迁移。先推导时间边缘
  分布与线性插值路径一致的随机微分方程，再得到其时间反演的 probability-flow
  ODE，从中把 score 项以显式系数分离出来。由于 JiT 直接预测干净影像，DPS
  似然项所需的后验均值就是网络输出本身，后验采样无需任何任务特定的重训练。
- **SSIM 似然。** 高斯 L2 似然惩罚逐像素偏差，会把高频细节平均掉。改用可微的
  结构相似性（SSIM）距离后，重建被引导向感知一致的边缘、梯度与纹理。

## 结果

在多通道海表温度（SST、PAR等）影像块上：

- 无条件采样已能呈现真实的地球物理结构；
- 以部分观测为条件时，可实现空间连贯的影像补全。

## 进展

论文准备中，定量评估仍在进行。该工作将在今年发表。

## 参考文献

- Li & He, *Back to Basics: Let Denoising Generative Models Denoise*（JiT）——
  [arXiv:2511.13720](https://arxiv.org/abs/2511.13720)
- Chung et al., *Diffusion Posterior Sampling for General Noisy Inverse
  Problems* —— [arXiv:2209.14687](https://arxiv.org/abs/2209.14687)
- Song et al., *Score-Based Generative Modeling through Stochastic Differential
  Equations* —— [arXiv:2011.13456](https://arxiv.org/abs/2011.13456)
- Dehghani et al., *Patch n' Pack: NaViT* ——
  [arXiv:2307.06304](https://arxiv.org/abs/2307.06304)

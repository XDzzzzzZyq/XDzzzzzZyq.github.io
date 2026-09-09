---
slug: cuda-vision
lang: cn
---

## 概览

基于 CS207: Image Data Science 课程，构建一个 **CUDA 加速的 Python 图像处理与计算机视觉库**。
目标是通过从零实现一组经典算子，动手学习 GPU 编程，并探索在研究原型中
如何将 **PyTorch + CUDA + C++** 串接起来。

## 已实现算子

- **卷积**（二维图像滤波）；
- **几何变换**（仿射变换、非线性扭曲、重采样）；
- **抖动**（有序抖动与误差扩散）；
- **形态学操作**（腐蚀、膨胀、开运算、闭运算）；
- **纹理分割**（基于简单特征的流水线）。

## 方法

- **混合流水线。** 将 CUDA 算子封装成Python可以直接调用的PyTorch扩展，实现零GPU-CPU内存拷贝。
- **性能优化。** 使用shared memory等技术增加缓存命中、降低内存吞吐。

## 结果

- 学习如何优化算子以达到高吞吐的 GPU 性能；
- 为后续在 GPU 上结合深度学习与经典 CV 的工作打下基础。

## 仓库

[github.com/XDzzzzzZyq/cuda-vision](https://github.com/XDzzzzzZyq/cuda-vision)

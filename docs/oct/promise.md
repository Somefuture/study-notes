---
title: 走进promise
---
目录：
[[toc]]

## promise简介

Promise对象用于表示一个异步操作的最终完成（或失败）以及结果值。异步方法并不会立即返回最终的值，而是会返回一个promise，以便在未来某个时候把值交给使用者。

一个promise必然处于以下几种状态之一：

- 待定(pending): 初始状态，既没有被兑现，也没有被拒绝
- 已兑现(fulfilled): 意味着操作成功完成
- 已拒绝(rejected): 意味着操作失败

## 参考

- [1] [史上最最最详细的手写Promise教程](https://juejin.im/post/6844903625769091079)

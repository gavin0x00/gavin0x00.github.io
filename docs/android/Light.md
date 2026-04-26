---
title: LightsService
date: 2024-11-27
tags: [Android, Service, HAL]
description: Android LightsService 实现原理和使用方法
---

# Light


## LightsService

1 Service side:

2 启动 LightsService

![](../assets/2024-11-25-23-23-59-image.png)

3 注册一个 LightsManager, LightsManager 实质是 Client side 接口的一层封装, 好方便普通 App 访问 LightsService.

Note: 普通 App 可以通过 context.getSystemService() 获取 LightsManager 实例, 主要优点是确保每个 Manager 在同一个 `Context` 中只创建一次，减少系统资源消耗。

![](../assets/2024-11-25-23-25-40-image.png)

4 client side

## Light HAL

xxxxxxx
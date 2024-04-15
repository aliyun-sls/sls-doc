# 拓扑图支持哪些布局方式
## 布局方式
- 层次布局

它将图中节点按照其所处的层次分为多个水平层次，并将节点按照其层次位置排布在各个层次中，使得节点之间的关系和连接更加清晰明了。
![图 1](/img/src/visulization/topology/topologyLayout/2ac4b323e32035d6cf5c2facd614a88711c9e90028aac47341fb15582ad2c107.png)

- 力导向布局

是一种基于物理模型的网络图布局方式，它通过模拟物理力场的作用（每个节点(Node) 都是一个带有能量的粒子，每条边(edge)模拟粒子与粒子之间存在的作用力），将图中的节点和边排布在一个平面上，使得节点之间的距离尽可能的合适，边的长度尽可能地短，从而达到较好的可视化效果。
![图 15](/img/src/visulization/topology/topologyLayout/9d38fc634019c343c9c689b5a7a78b265f7cdea33ba6ed45f3128f179e810e60.png)

- 环形布局

尽可能地将所有节点布局在一个圆环上，一般适用于节点数量较少，但是节点之间的关系比较复杂的情况
![图 16](/img/src/visulization/topology/topologyLayout/c5ca896d76ea5096c9ab43b803b72bb4468c1e3f2c8ad757dd80afa0e1ebf8be.png)

## 配置
### 临时布局方式
在图例中，切换临时的布局方式，生成的布局方式不会被保存下来
![image.png](/img/src/visulization/topology/topologyLayout/668d462ca197ea7dda9339a2aae8b8b19854d78f0a88404b63315c044d32f3a6.png)
### 默认布局方式
可在**通用配置**Tab 中 选择 **【节点配置】** > 【**布局类型】** 进行配置默认的布局方式
![图 17](/img/src/visulization/topology/topologyLayout/b1951950b5d5c7be262828d2d2605748bb5bb12996a5973792bd52019dab73df.png)

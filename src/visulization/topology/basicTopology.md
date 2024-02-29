## **数据准备**
采用多查询方式，支持配置哪个查询是边的数据，还是节点指标的数据
![图 1](/img/src/visulization/topology/basicTopology/9b74f9652068220b692c0ce1007c0a8523f9cab8f39c5c516dd97602198dac26.png)

- **边的数据**：用作绘制拓扑图，需要查询出来每条边的**父子节点**和**节点类型**；如果需要对每条边上添加指标，也需要一起查询出来；

样例：
![图 2](/img/src/visulization/topology/basicTopology/7f48272111c917ac4d7f8442aca8ccd5f8eff5c55f4e19b7af355c8304d34337.png)

- 节点的数据：用作绘制每个节点指标信息，通过**节点 ID**来赋值

样例：
![图 3](/img/src/visulization/topology/basicTopology/f613f7e56e0f907fc233506c0f5a2ac1f296c6b29516a975854200ac2e95d3c2.png)

## **拓扑配置**
![图 4](/img/src/visulization/topology/basicTopology/0cca179ec6828c82e531235630ffa57a67ce0131fd6c4356f0518d1f49b49f79.png)
## 最终效果
![图 5](/img/src/visulization/topology/basicTopology/fc6e4fc0211e53f50005e856fc124fcd3f902558843adf10c1f61c0552a723b0.png)


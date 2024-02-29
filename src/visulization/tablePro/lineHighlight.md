# 如何设置表格单元格整行背景高亮

在仪表盘编辑模式，编辑当前表格，在字段配置的tab下:
1. 点击**添加字段**，选择**A>path**字段，点击**添加配置**，选择**标准配置>颜色方案**，选择**阈值**
2. 再次点击**添加配置**，选择**字段列设置>单元格显示方式**，选择**整行背景高亮**
3. 再次点击**添加配置**，选择**阈值>阈值**，设置颜色
![图 4](/img/src/visulization/tablePro/lineHighlight/lineHighlight2.png)

还可以点击**添加阈值**对某一个单元格的背景进行高亮，例如设置字符串等于/request/path-0/file-5，则表格中符合该条件的单元背景进行高亮显示。
![图 5](/img/src/visulization/tablePro/lineHighlight/lineHighlight3.png)
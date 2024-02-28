function getSidebar() {
  return [
    {
      text: '可视化案例',
      items: [{ text: '案例总览', link: '/visulization/index' }],
    },
    // 文件路径 '/visulization/generalDashbaord/xxxx.md'
    {
      text: '仪表盘通用案例',
      items: [
        { text: '如何添加多Y轴线图', link: '/visulization/generalDashbaord/doubley.md' },
        { text: '如何配置一个带有迷你图的单值图', link: '/visulization/generalDashbaord/singleWithMiniChart.md' },
        { text: '过滤器最佳实践', link: '/visulization/generalDashbaordfilter.md' },
        {
          text: '导入仪表盘最佳实践',
          link: '/visulization/generalDashbaord/importOtherProjectDashboard.md',
        },
        {
          text: '时序模式的理解方式',
          link: '/visulization/generalDashbaord/metricMode.md',
        },
        {
          text: '什么是字段配置',
          link: '/visulization/generalDashbaord/fieldConfig.md',
        },
        {
          text: '如何配置格式化（以线图和表格为例）',
          link: '/visulization/generalDashbaord/fieldFormat.md',
        },
        {
          text: '如何配置单位 （表格有个特殊的要求）',
          link: '/visulization/generalDashbaord/unitConfig.md',
        },
        {
          text: '如何定制图例点击的效果 （以线图为例）',
          link: '/visulization/generalDashbaord/legendClick.md',
        },
        {
          text: '如何自定义 Tooltip 显示内容 （以线图和散点图为例）',
          link: '/visulization/generalDashbaord/tooltip.md',
        },
        {
          text: '图例如何实现排序及其效果 （流图特殊说明可以实现 topk 的能力）',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/tablePro/xxxx.md'
    {
      text: '表格Pro案例',
      items: [
        {
          text: '如何配置一个基础表格',
          link: '/visulization/tablePro/baseTablePro.md',
        },
        {
          text: '如何配置多查询语句的表格',
          link: '/visulization/tablePro/multipleQuery.md',
        },
        {
          text: '如何通过数据转换将多个表格 join 在同一个表格中',
          link: '/visulization/tablePro/tableJoin.md',
        },
        {
          text: '如何配置表格行高',
          link: '/visulization/tablePro/lineHight.md',
        },
        {
          text: '如何设置表格默认的排序字段',
          link: '/visulization/tablePro/setSortField.md',
        },
        {
          text: '如何设置表格单元格文本高亮',
          link: '/visulization/tablePro/textHighlight.md',
        },
        {
          text: '如何设置表格单元格背景高亮',
          link: '/visulization/tablePro/cellHighlight.md',
        },
        {
          text: '如何设置表格单元格整行背景高亮',
          link: '/visulization/tablePro/lineHighlight.md',
        },
        {
          text: '如何设置表格单元格进度条样式（普通、LCD、渐变）',
          link: '/visulization/tablePro/progressStyle.md',
        },
        {
          text: '如何在表格单元格中设置线图、面积图、柱状图',
          link: '/visulization/tablePro/setCharts.md',
        },
        {
          text: '表格如何支持行列转换',
          link: '/visulization/tablePro/rowColSwitch.md',
        },
        {
          text: '如何控制表格列的宽度',
          link: '/visulization/tablePro/setColWidth.md',
        },
        {
          text: '如何设置表格单元格的搜索和过滤功能',
          link: '/visulization/tablePro/tableFilterAndSearch.md',
        },
        {
          text: '如何使用表格的阈值功能',
          link: '/visulization/tablePro/threshold.md',
        },
        {
          text: '如何在表格中使用变量替换',
          link: '/visulization/tablePro/varReplace.md',
        },
        {
          text: '如何在表格中使用值映射',
          link: '/visulization/tablePro/valueMapping.md',
        },
      ],
    },
    // 文件路径 '/visulization/linePro/xxxx.md'
    {
      text: '线图Pro案例',
      items: [
        {
          text: '如何配置一个基本线图',
          link: '/visulization/lineChart/baseChart.md',
        },
        {
          text: '如何开启时序模式线图',
          link: '/visulization/lineChart/metricMode.md',
        },
        {
          text: '如何配置两条或更多条的线图',
          link: '/visulization/lineChart/moreLineChart.md',
        },
        {
          text: '如何给不同的线设置显示名（别名）',
          link: '/visulization/lineChart/setAlias.md',
        },
        {
          text: '如何为不同的线配置不同颜色',
          link: '/visulization/lineChart/setLineColor.md',
        },
        {
          text: 'x轴时间范围、数据时间范围与查询时间范围之间的关系',
          link: '',
        },
        {
          text: '线图如何配置x轴格式化',
          link: '/visulization/lineChart/setXFormat.md',
        },
        {
          text: '线图如何开启/关闭x轴',
          link: '/visulization/lineChart/setXShow.md',
        },
        {
          text: '线图如何开启/关闭y轴',
          link: '/visulization/lineChart/setYShow.md',
        },
        {
          text: '线图如何配置y轴范围',
          link: '/visulization/lineChart/setYRange.md',
        },
        {
          text: '线图如何开启堆叠模式',
          link: '/visulization/lineChart/stacking.md',
        },
        {
          text: '如何配置一组数据为线图，另一组数据为柱状图',
          link: '/visulization/lineChart/lineAndHistogramCharts.md',
        },
        {
          text: '线图如何配置阈值',
          link: '#',
        },
        {
          text: '如何开启数据补全及其效果',
          link: '/visulization/lineChart/completionData.md',
        },
      ],
    },
    // 文件路径 '/visulization/barPro/xxxx.md'
    {
      text: '柱状图Pro案例',
      items: [
        {
          text: '如何配置一个基本的柱状图',
          link: '#',
        },
        {
          text: '如何配置多查询的柱状图',
          link: '#',
        },
        {
          text: '如何配置堆叠柱状图',
          link: '#',
        },
        {
          text: '柱状图外观有哪些配置项',
          link: '#',
        },
        {
          text: '柱状图标签如何配置在柱子内部显示',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/aggPro/xxxx.md'
    {
      text: '流图Pro案例',
      items: [
        {
          text: '如何配置一个基本的流图（分类线图）',
          link: '#',
        },
        {
          text: '流图分类数据限制说明',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/statPro/xxxx.md'
    {
      text: '统计图Pro案例',
      items: [
        {
          text: '如何配置一个基本的统计图（单值图）',
          link: '#',
        },
        {
          text: '如何配置多查询的统计图',
          link: '#',
        },
        {
          text: '统计图如何配置值和标题',
          link: '#',
        },
        {
          text: '统计图有哪些布局方式',
          link: '#',
        },
        {
          text: '统计图如何配置对比值',
          link: '#',
        },
        {
          text: '统计图如何配置阈值',
          link: '#',
        },
        {
          text: '统计图如何配置趋势图',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/burgePro/xxxx.md'
    {
      text: '计量图Pro案例',
      items: [
        {
          text: '如何配置一个基本的计量图',
          link: '#',
        },
        {
          text: '计量图如何配置多查询',
          link: '#',
        },
        {
          text: '如何配置一个刻度盘',
          link: '#',
        },
        {
          text: '计量图如何配置阈值',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/pipePro/xxxx.md'
    {
      text: '饼图Pro案例',
      items: [
        {
          text: '如何配置一个饼图',
          link: '#',
        },
        {
          text: '饼图刻度文本有哪些配置选项',
          link: '#',
        },
        {
          text: '如何配置一个环形图',
          link: '#',
        },
        {
          text: '饼图如何配置多查询',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/histogram/xxxx.md'
    {
      text: '直方图Pro案例',
      items: [
        {
          text: '如何配置一个直方图',
          link: '#',
        },
        {
          text: '如何限制直方图区间的范围和数量',
          link: '#',
        },
        {
          text: '如何配置堆叠直方图',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/radar/xxxx.md'
    {
      text: '雷达图Pro案例',
      items: [
        {
          text: '如何配置一个基本的雷达图',
          link: '#',
        },
        {
          text: '雷达图的重要配置项有哪些',
          link: '#',
        },
        {
          text: '如何配置查询驱动的雷达图',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/crossTable/xxxx.md'
    {
      text: '交叉表Pro案例',
      items: [
        {
          text: '如何配置一个交叉表Pro',
          link: '#',
        },
        {
          text: '如何配置多聚合字段的交叉表',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/scatter/xxxx.md'
    {
      text: '散点图Pro案例',
      items: [
        {
          text: '如何配置一个散点图',
          link: '#',
        },
        {
          text: '散点图如何支持分类',
          link: '#',
        },
        {
          text: '如何动态设置散点图中点的大小',
          link: '#',
        },
        {
          text: '散点图如何设置阈值',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/topology/xxxx.md'
    {
      text: '拓扑图Pro案例',
      items: [
        {
          text: '如何配置一个拓扑图',
          link: '#',
        },
        {
          text: '拓扑图如何设置连线指标',
          link: '#',
        },
        {
          text: '拓扑图如何配置节点类型',
          link: '#',
        },
        {
          text: '拓扑图如何配置图标类型节点',
          link: '#',
        },
        {
          text: '拓扑图支持哪些布局方式',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/markdownPro/xxxx.md'
    {
      text: 'MarkdownPro案例',
      items: [
        {
          text: '如何配置 markdown 图表',
          link: '#',
        },
        {
          text: '如何在 markdown 图表中使用查询结果',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/mapPro/xxxx.md'
    {
      text: '地图Pro案例',
      items: [
        {
          text: '如何配置中国地图',
          link: '#',
        },
        {
          text: '如何配置世界地图',
          link: '#',
        },
        {
          text: '如何配置高德地图',
          link: '#',
        },
        {
          text: '如何配置热力图',
          link: '#',
        },
      ],
    },
    // 文件路径 '/visulization/drilldown/xxxx.md'
    {
      text: '交互事件案例',
      items: [
        {
          text: '图表如何配置交互事件打开日志库',
          link: '#',
        },
        {
          text: '图表如何配置交互事件打开仪表盘',
          link: '#',
        },
        {
          text: '交互事件打开仪表盘如何设置新的变量',
          link: '#',
        },
        {
          text: '如何在交互事件中控制打开日志库的查询时间',
          link: '#',
        },
        {
          text: '如何在交互事件中打开 trace 详情',
          link: '#',
        },
        {
          text: '如何在交互事件中再次打开 trace 详情',
          link: '#',
        },
      ],
    },
  ]
}

module.exports = getSidebar

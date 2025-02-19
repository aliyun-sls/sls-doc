function getSidebar() {
  return [
    {
      text: 'Visualization',
      items: [{ text: 'Case overview', link: '/visulization/home' }],
    },
    // 文件路径 '/visulization/generalDashbaord/xxxx.md'
    {
      text: 'Dashboard',
      items: [
        { text: 'Create a line chart with multiple y-axes', link: '/visulization/generalDashbaord/doubley.md', description: 'Create a line chart with multiple y-axes' },
        // { text: '如何配置一个带有迷你图的单值图', link: '/visulization/generalDashbaord/singleWithMiniChart.md', description: "统计图支持配置迷你图" },
        { text: 'Add a filter to a dashboard', link: '/visulization/generalDashbaord/filter.md', description:'Add a filter to a dashboard' },
        {
          text: 'Import a dashboard',
          link: '/visulization/generalDashbaord/importOtherProjectDashboard.md', description: 'Import a dashboard across projects',
        },
        {
          text: 'Time series mode',
          link: '/visulization/generalDashbaord/metricMode.md',
        },
        {
          text: 'Configure the parameters on the Field Configuration tab',
          link: '/visulization/generalDashbaord/fieldConfig.md',
        },
        {
          text: 'Configure the display format of numeric values',
          link: '/visulization/generalDashbaord/fieldFormat.md',
        },
        {
          text: 'Configure the unit of a field',
          link: '/visulization/generalDashbaord/unitConfig.md',
        },
        {
          text: 'Configure the data display effect of a legend item',
          link: '/visulization/generalDashbaord/legendClick.md',
        },
        {
          text: 'Configure the parameters in the Tooltip Configurations section',
          link: '/visulization/generalDashbaord/tooltip.md',
        },
        {
          text: 'Configure sorting of legend items',
          link: '/visulization/generalDashbaord/legendSortOrder.md',
        },
      ],
    },
    // 文件路径 '/visulization/tablePro/xxxx.md'
    {
      text: 'Table (Pro)',
      items: [
        {
          text: 'Configure a basic table',
          link: '/visulization/tablePro/baseTablePro.md',
        },
        {
          text: 'Use a table to display the results of multiple query statements',
          link: '/visulization/tablePro/multipleQuery.md',
        },
        {
          text: 'Join multiple tables into one table by using data conversion',
          link: '/visulization/tablePro/tableJoin.md',
        },
        {
          text: 'Configure the height of table rows',
          link: '/visulization/tablePro/lineHight.md',
        },
        {
          text: 'Configure sorting for a table',
          link: '/visulization/tablePro/setSortField.md',
        },
        {
          text: 'Highlight the text in table cells',
          link: '/visulization/tablePro/textHighlight.md',
        },
        {
          text: 'Highlight the background of table cells',
          link: '/visulization/tablePro/cellHighlight.md',
        },
        {
          text: 'Highlight the background of a whole row of table cells',
          link: '/visulization/tablePro/lineHighlight.md',
        },
        {
          text: 'Configure the progress bar type of table cells',
          link: '/visulization/tablePro/progressStyle.md',
        },
        {
          text: 'Display line charts, area charts, and column charts in table cells',
          link: '/visulization/tablePro/setCharts.md',
        },
        {
          text: 'Configure data conversion from rows to columns for a table',
          link: '/visulization/tablePro/rowColSwitch.md',
        },
        {
          text: 'Change the width of table columns',
          link: '/visulization/tablePro/setColWidth.md',
        },
        {
          text: 'Configure searching and filtering of table cells',
          link: '/visulization/tablePro/tableFilterAndSearch.md',
        },
        {
          text: 'Use the threshold feature of a table',
          link: '/visulization/tablePro/threshold.md',
        },
        {
          text: 'Configure variable replacement for a table',
          link: '/visulization/tablePro/varReplace.md',
        },
        {
          text: 'Configure value mappings for a table',
          link: '/visulization/tablePro/valueMapping.md',
        },
      ],
    },
    // 文件路径 '/visulization/linePro/xxxx.md'
    {
      text: 'Line chart (Pro)',
      items: [
        {
          text: 'Configure a basic line chart',
          link: '/visulization/lineChart/baseChart.md',
        },
        {
          text: 'Configure the time series mode for a line chart',
          link: '/visulization/lineChart/metricMode.md',
        },
        {
          text: 'Configure two or more lines for a line chart',
          link: '/visulization/lineChart/moreLineChart.md',
        },
        {
          text: 'Configure the display name (alias) for a line',
          link: '/visulization/lineChart/setAlias.md',
        },
        {
          text: 'Configure the color for a line',
          link: '/visulization/lineChart/setLineColor.md',
        },
        {
          text: 'Relationships among the x-axis time range, data time range, and query time range',
          link: '/visulization/lineChart/timeRange.md',
        },
        {
          text: 'Configure the x-axis format for a line chart',
          link: '/visulization/lineChart/setXFormat.md',
        },
        {
          text: 'Display or hide the x-axis for a line chart',
          link: '/visulization/lineChart/setXShow.md',
        },
        {
          text: 'Display or hide the y-axis for a line chart',
          link: '/visulization/lineChart/setYShow.md',
        },
        {
          text: 'Configure the y-axis range for a line chart',
          link: '/visulization/lineChart/setYRange.md',
        },
        {
          text: 'Configure stacking for a line chart',
          link: '/visulization/lineChart/stacking.md',
        },
        // {
        //   text: '如何配置一组数据为线图，另一组数据为柱状图',
        //   link: '/visulization/lineChart/lineAndHistogramCharts.md',
        // },
        {
          text: 'Configure the threshold for a line chart',
          link: '/visulization/lineChart/setThreshold.md',
        },
        {
          text: 'Turn on Data Completion',
          link: '/visulization/lineChart/completionData.md',
        },
      ],
    },
    // 文件路径 '/visulization/barPro/xxxx.md'
    {
      text: 'Column chart (Pro)',
      items: [
        {
          text: 'Configure a basic column chart',
          link: '/visulization/barPro/createBar.md',
        },
        {
          text: 'Use a column chart to display the results of multiple query statements',
          link: '/visulization/barPro/muiltSearch.md',
        },
        {
          text: 'Configure stacking for a column chart',
          link: '/visulization/barPro/stackingBar.md',
        },
        {
          text: 'Configure the appearance of a column chart',
          link: '/visulization/barPro/appearance.md',
        },
        {
          text: 'Display labels inside a column chart',
          link: '/visulization/barPro/insideTag.md',
        },
      ],
    },
    // 文件路径 '/visulization/aggPro/xxxx.md'
    {
      text: 'Flow chart (Pro)',
      items: [
        {
          text: 'Configure a basic flow chart (classification line chart)',
          link: '/visulization/flowGraph/basicFlow.md',
        },
        {
          text: 'Configure the maximum number of data entries for a flow chart',
          link: '/visulization/flowGraph/dataLimit.md',
        },
      ],
    },
    // 文件路径 '/visulization/statPro/xxxx.md'
    {
      text: 'Single value chart (Pro)',
      items: [
        {
          text: 'Configure a single value chart',
          link: '/visulization/statisticsPro/basic.md',
        },
        {
          text: 'Use a single value chart to display the results of multiple query statements',
          link: '/visulization/statisticsPro/muiltSearch.md',
        },
        {
          text: 'Configure the title, displayed fields, and parameters in the Data Configuration section',
          link: '/visulization/statisticsPro/setValTitle.md',
        },
        {
          text: 'Layouts',
          link: '/visulization/statisticsPro/layoutMode.md',
        },
        // {
        //   text: '统计图如何配置对比值',
        //   link: '/visulization/statisticsPro/contrastValue.md',
        // },
        {
          text: 'Configure thresholds for a single value chart',
          link: '/visulization/statisticsPro/threshold.md',
        },
        {
          text: 'Configure a trend chart for a single value chart',
          link: '/visulization/statisticsPro/TrendChart.md',
        },
      ],
    },
    // 文件路径 '/visulization/burgePro/xxxx.md'
    {
      text: 'Bar gauge (Pro)',
      items: [
        {
          text: 'Configure a basic bar gauge',
          link: '/visulization/calculate/basic.md',
        },
        {
          text: 'Use a bar gauge to display the results of multiple query statements',
          link: '/visulization/calculate/muiltSearch.md',
        },
        {
          text: 'Configure a dial',
          link: '/visulization/calculate/scale.md',
        },
        {
          text: 'Configure thresholds of a bar gauge',
          link: '/visulization/calculate/threshold.md',
        },
      ],
    },
    // 文件路径 '/visulization/pipePro/xxxx.md'
    {
      text: 'Pie chart (Pro)',
      items: [
        {
          text: 'Configure a pie chart',
          link: '/visulization/piePro/basic.md',
        },
        {
          text: 'Configure the scale text for a pie chart',
          link: '/visulization/piePro/scaleText.md',
        },
        {
          text: 'Configure a donut chart',
          link: '/visulization/piePro/annular.md',
        },
        {
          text: 'Use a pie chart to display the results of multiple query statements',
          link: '/visulization/piePro/muiltSearch.md',
        },
      ],
    },
    // 文件路径 '/visulization/histogram/xxxx.md'
    {
      text: 'Histogram (Pro)',
      items: [
        {
          text: 'Configure a histogram',
          link: '/visulization/histogram/basic.md',
        },
        {
          text: 'Limit the range of a histogram and the number of bars',
          link: '/visulization/histogram/areaRange.md',
        },
        {
          text: 'Configure stacking for a histogram',
          link: '/visulization/histogram/stacking.md',
        },
      ],
    },
    // 文件路径 '/visulization/radar/xxxx.md'
    {
      text: 'Radar chart (Pro)',
      items: [
        {
          text: 'Configure a basic radar chart',
          link: '/visulization/radarPro/basic.md',
        },
        {
          text: 'Configure the SQL query statement of the radar chart.',
          link: '/visulization/radarPro/setting.md',
        },
        {
          text: 'Combine multiple queries for a radar chart',
          link: '/visulization/radarPro/combineSearch.md',
        },
      ],
    },
    // 文件路径 '/visulization/crossTable/xxxx.md'
    {
      text: 'Cross table (Pro)',
      items: [
        {
          text: 'Configure the SQL query statement of the cross table.',
          link: '/visulization/crossConnect/basic.md',
        },
        {
          text: 'Configure multiple aggregate fields for a cross table',
          link: '/visulization/crossConnect/polymerization.md',
        },
      ],
    },
    // 文件路径 '/visulization/scatter/xxxx.md'
    {
      text: 'Scatter chart (Pro)',
      items: [
        {
          text: 'Configure a scatter chart',
          link: '/visulization/scatterPlot/basic.md',
        },
        {
          text: 'Configure classification for a scatter chart',
          link: '/visulization/scatterPlot/classification.md',
        },
        {
          text: 'Configure the sizes of points in a scatter chart',
          link: '/visulization/scatterPlot/drop.md',
        },
        {
          text: 'Configure thresholds for a scatter chart',
          link: '/visulization/scatterPlot/threshold.md',
        },
      ],
    },
    // 文件路径 '/visulization/topology/xxxx.md'
    {
      text: 'Topology (Pro)',
      items: [
        {
          text: 'Configure a topology',
          link: '/visulization/topology/basicTopology.md',
        },
        {
          text: 'Configure edge metrics for a topology',
          link: '/visulization/topology/topologyLineOptions.md',
        },
        {
          text: 'Configure node metrics for a topology',
          link: '/visulization/topology/topologyNodeOptions.md',
        },
        {
          text: 'Configure the type of nodes in a topology',
          link: '/visulization/topology/topologyNodeType.md',
        },
        {
          text: 'Configure the layout of a single value chart',
          link: '/visulization/topology/topologyLayout.md',
        },
      ],
    },
    // 文件路径 '/visulization/markdownPro/xxxx.md'
    {
      text: 'Markdown chart (Pro)',
      items: [
        {
          text: 'Configure a Markdown chart',
          link: '/visulization/markdownPro/markdownBasic.md',
        },
        {
          text: 'Apply query results to a Markdown chart',
          link: '/visulization/markdownPro/markdownWithQuery.md',
        },
      ],
    },
    // 文件路径 '/visulization/mapPro/xxxx.md'
    {
      text: 'Maps (Pro)',
      items: [
        {
          text: 'Configure the map of China',
          link: '/visulization/mapPro/chinaMap.md',
        },
        {
          text: 'Configure the world map',
          link: '/visulization/mapPro/worldMap.md',
        },
        {
          text: 'Configure AMAP',
          link: '/visulization/mapPro/geoMap.md',
        },
        {
          text: 'Configure a heat map',
          link: '/visulization/mapPro/heatMap.md',
        },
      ],
    },
    // 文件路径 '/visulization/drilldown/xxxx.md'
    {
      text: 'Interaction occurrence',
      items: [
        {
          text: 'Configure an Open Logstore interaction occurrence',
          link: '/visulization/interactionEvents/openLog.md',
        },
        {
          text: 'Configure an Open Dashboard interaction occurrence',
          link: '/visulization/interactionEvents/openDashboard.md',
        },
        {
          text: 'Add a variable for an Open Dashboard interaction occurrence',
          link: '/visulization/interactionEvents/settingVariable.md',
        },
        {
          text: 'Control the query time of an Open Logstore interaction occurrence',
          link: '/visulization/interactionEvents/checkTime.md',
        },
        {
          text: 'Configure an Open Trace Details interaction occurrence',
          link: '/visulization/interactionEvents/openTraceDetail.md',
        },
      ],
    },
  ]
}

module.exports = getSidebar

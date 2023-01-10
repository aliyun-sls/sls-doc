function getSidebar() {
    return [
      {
        text: '数据加工案例',
        items: [{ text: '案例总览', link: '/dataprocessdemo/index' }],
      },
      {
        text: '常见日志处理',
        items: [{ text: 'Nginx日志解析', link: '/dataprocessdemo/nginx_data_process' }],
      },
      {
        text: '日志分发',
        items: [{ text: '复制Logstore数据', link: '/dataprocessdemo/copy_logstore_data' },
            { text: '复制和分发数据', link: '/dataprocessdemo/split_data_and_output.md' },
            { text: '多目标Logstore数据分发', link: '/dataprocessdemo/output_logstore_data.md' },
            { text: '跨区域数据传输', link: '/dataprocessdemo/cross_region.md' }],
      }
    ]
  }
  
  module.exports = getSidebar
  
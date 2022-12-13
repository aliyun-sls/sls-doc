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
        items: [{ text: '复制Logstore数据', link: '/dataprocessdemo/copy_logstore_data' }],
      }
    ]
  }
  
  module.exports = getSidebar
  
function getSidebar() {
  return [
    {
      text: '数据采集案例',
      items: [
        { text: '案例总览', link: '/dataaccess/index' },
        { text: '安装部署', link: '/dataaccess/ossBatchInstall.md' },
        { text: '通过Logtail跨阿里云账号采集日志', link: '/dataaccess/aliyunAcountlog.md' },
        { text: '通过Logtail跨阿里云账号采集容器日志', link: '/dataaccess/collectContainerLogs.md' },
        { text: '通过Logtail采集Zabbix数据', link: '/dataaccess/ZabbixLogtail.md' },
        { text: '采集企业内网服务器日志', link: '/dataaccess/InternalnetworkLog.md' },
        { text: '主机场景下如何使用Logtail采集超大规模文件', link: '/dataaccess/superLarge.md' },
        { text: 'Kubernetes挂载PVC日志采集的轻量级部署方案', link: '/dataaccess/pvcLog.md' },
        { text: 'Logtail日志采集支持纳秒时间戳', link: '/dataaccess/enableTimeNano.md' },
        { text: 'Logtail使用Grok语法解析日志', link: '/dataaccess/GrokAnaysis.md' },
      ],
    },
  ]
}

module.exports = getSidebar

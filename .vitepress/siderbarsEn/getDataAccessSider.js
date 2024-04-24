function getSidebar() {
  return [
    {
      text: 'Data collection cases',
      items: [
        { text: 'Case overview', link: '/en/dataaccess/home' },
        { text: 'Installation and deployment', link: '/en/dataaccess/ossBatchInstall.md' },
        { text: 'Use Logtail to collect logs across Alibaba Cloud accounts', link: '/en/dataaccess/aliyunAcountlog.md' },
        { text: 'Use Logtail to collect container logs across Alibaba Cloud accounts', link: '/en/dataaccess/collectContainerLogs.md' },
        { text: 'Use Logtail to collect Zabbix data', link: '/en/dataaccess/ZabbixLogtail.md' },
        { text: 'Collect logs from servers in a corporate intranet?', link: '/en/dataaccess/InternalnetworkLog.md' },
        { text: 'Use Logtail to collect ultra-large files from hosts', link: '/en/dataaccess/superLarge.md' },
        { text: 'K8s Use a lightweight deployment solution to collect logs from Kubernetes clusters to which volumes are mounted by using a PVC', link: '/en/dataaccess/pvcLog.md' },
        { text: 'Logtail Parse nanosecond-precision timestamps from raw logs when you use Logtail to collect logs', link: '/en/dataaccess/enableTimeNano.md' },
        { text: 'Parse logs by using iLogtail that uses the Grok syntax', link: '/en/dataaccess/GrokAnaysis.md' },
      ],
    },
  ]
}

module.exports = getSidebar

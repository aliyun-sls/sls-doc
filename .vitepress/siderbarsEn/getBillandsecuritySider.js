function getSidebar() {
  return [
    {
      text: 'Case overview',
      items: [{ text: 'Case overview', link: '/billandsecurity/home' }],
    },
    {
      text: 'Log Audit Service overview',
      items: [
        { text: 'Cost Manager overview', link: '/billandsecurity/logauditintro.md' },
        { text: 'Custom bill analysis cases', link: '/billandsecurity/costmanagerintro.md' },
      ],
    },
    {
      text: 'Custom bill analysis cases',
      items: [
        { text: 'Custom bill alert cases', link: '/billandsecurity/billAnalysis.md' },
        { text: 'Bill analysis cases', link: '/billandsecurity/billAlert.md' },
        { text: 'SLS Custom bill alert cases', link: '/billandsecurity/billSls.md' },
        { text: 'OSS Custom bill alert cases', link: '/billandsecurity/billOss.md' },
        { text: 'ECS Custom bill alert cases', link: '/billandsecurity/billEcs.md' },
      ],
    },
  ]
}

module.exports = getSidebar

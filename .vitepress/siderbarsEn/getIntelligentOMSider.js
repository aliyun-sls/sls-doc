function getSidebar() {
  return [
    {
      text: 'Case overview',
      items: [{ text: 'Case overview', link: '/en/intelligentom/home' }],
    },
    {
      text: 'AIOps introduction',
      items: [
        { text: 'Full-stack Monitoring', link: '/en/intelligentom/fullmonitorintro.md' },
        { text: 'Full-stack Observability', link: '/en/intelligentom/fullstackintro.md' },
        { text: 'Trace', link: '/en/intelligentom/traceintro.md' },
        { text: 'Intelligent Anomaly Analysis', link: '/en/intelligentom/anomalyanalysisintro.md' },
        { text: 'Basic model services', link: '/en/intelligentom/maasintro.md' },
      ],
    },
  ]
}

module.exports = getSidebar

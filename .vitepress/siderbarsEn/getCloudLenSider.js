function getSidebar() {
  return [
    {
      text: 'Case overview',
      items: [{ text: 'CloudLen case overview', link: '/en/cloudlen/home' }],
    },
    {
      text: 'CloudLen introduction',
      items: [
        { text: 'CloudLen EBS overview', link: '/en/cloudlen/ebsintro.md' },
        { text: 'CloudLen OSS overview', link: '/en/cloudlen/ossintro.md' },
        { text: 'CloudLen SLS overview', link: '/en/cloudlen/slslenintro.md' },
        { text: 'Flowlog Center overview', link: '/en/cloudlen/flowlogintro.md' },

      ],
    },
    {
      text: 'CloudLen case overview',
      items: [
        { text: 'Use CloudLens for SLB to perform comprehensive observation', link: '/en/cloudlen/slb.md' },
        { text: 'Use CloudLens for SLS to monitor project resource quotas', link: '/en/cloudlen/slsquota.md' },
        {
          text: 'Use CloudLens for OSS to observe server performance metrics',
          link: '/en/cloudlen/ossaccess.md',
        },
        { text: 'Use CloudLens for RDS to collect and use logs', link: '/en/cloudlen/rds.md' },
      ],
    },
  ]
}

module.exports = getSidebar

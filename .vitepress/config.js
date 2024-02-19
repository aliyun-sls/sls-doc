const path = require('path')
const getSqldemoSider = require('./siderbars/getSqldemoSider')
const getSqlFunctionSider = require('./siderbars/getSqlFunctionSider')
const getSqlErrorSider = require('./siderbars/getSqlErrorSider')
const getSearchdemoSider = require('./siderbars/getSearchdemoSider')
const getProductSider = require('./siderbars/getProductSider')
const getDataProcessSider = require('./siderbars/getDataProcessSider')
const getOscompatibleDemo = require('./siderbars/getOscompatibleDemo')
const getVisulizationDemo = require('./siderbars/getVisulizationSider')
const getAlertSider = require('./siderbars/getAlertSider')
const getCloudlenSider = require('./siderbars/getCloudLenSider')
const getDataAccessSider = require('./siderbars/getDataAccessSider')
const getIntelligentOMSider = require('./siderbars/getIntelligentOMSider')
const getScheduledsqlSider = require('./siderbars/getScheduledsqlSider')
const getBillandsecuritySider = require('./siderbars/getBillandsecuritySider')
const getMetricStoreSider = require('./siderbars/getMetricStoreSider')
const getToolsSider = require('./siderbars/getToolsSider')

const getNavs = require('./nav')
const glob = require('glob')

const sqlfunFiles = glob
  .sync('./src/sqlfun/*.md')
  .map((f) => path.parse(f).name)
  .filter((f) => f !== 'index')
  .map((f) => {
    return {
      text: f,
      link: `/sqlfun/${f}`,
    }
  })

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = (async () => {
  return {
    vite: {
      build: {
        minify: false,
      },
      resolve: {
        alias: {
          '@vue/theme': path.join(__dirname, './theme/src'),
        },
      },
    },
    ignoreDeadLinks: true,
    base: '/doc',
    srcDir: 'src',

    title: 'SLS',
    description: 'SLS 案例中心',

    plugins: {
      sitemap: {
        hostname: 'https://sls.aliyun.com/',
      },
    },

    lastUpdated: true,

    locales: {
      root: {
        label: '简体中文',
        lang: 'zh',
        description: 'SLS 案例中心',
        themeConfig: {
          nav: getNavs(),

          sidebar: {
            '/sqldemo': getSqldemoSider(),
            '/sqlfunction': getSqlFunctionSider(),
            '/sqlerror': getSqlErrorSider(),
            '/searchdemo': getSearchdemoSider(),
            '/product': getProductSider(),
            '/dataprocessdemo': getDataProcessSider(),
            '/oscompatibledemo': getOscompatibleDemo(),
            '/visulization': getVisulizationDemo(),
            '/alert': getAlertSider(),
            '/cloudlen': getCloudlenSider(),
            '/dataaccess': getDataAccessSider(),
            '/intelligentom': getIntelligentOMSider(),
            '/scheduledsql': getScheduledsqlSider(),
            '/billandsecurity': getBillandsecuritySider(),
            '/metrics': getMetricStoreSider(),
            '/tools': getToolsSider(),
          },

          editLink: {
            pattern: 'https://github.com/aliyun-sls/sls-doc/edit/main/src/:path',
            text: '在GitHub修改本页',
          },

          outline: {
            label: '页面导航'
          },
        },
      },
      en: {
        label: 'English',
        lang: 'en',
        description: 'SLS Demo Center',

        themeConfig: {
          editLink: {
            pattern: 'https://github.com/aliyun-sls/sls-doc/edit/main/src/:path',
            text: 'Edit this page on GitHub',
          },
        },
      },
    },

    /**
     * @type {import('.theme/src/vitepress/config').Config}
     */
    themeConfig: {
      logo: '/img/sls.png',
      lastUpdatedText: '最近修改',

      search: {
        provider: 'local',
      },

      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/aliyun-sls/sls-doc',
        },
      ],

      outline: {
        level: 'deep',
      },

      footer: {
        copyright: `Copyright © 2021-${new Date().getFullYear()} Aliyun SLS`,
      },

      i18n: {
        search: '搜索',
        menu: '菜单',
        toc: '本页目录',
        returnToTop: '返回顶部',
        appearance: '主题',
        //   previous: 'Previous',
        //   next: 'Next',
        //   pageNotFound: 'Page Not Found',
        //   deadLinkFound: {
        //     before: 'You found a dead link: ',
        //     after: ''
        //   },
        //   deadLinkReport: {
        //     before: 'Please ',
        //     content: 'let us know',
        //     after: ' so we can fix it.'
        //   },
        //   footerLicense: {
        //     before: 'Released under the ',
        //     after: '.'
        //   }
        //   // aria labels
        //   ariaAnnouncer: {
        //     before: '',
        //     after: ' has loaded'
        //   },
        //   ariaDarkMode: 'Toggle Dark Mode',
        //   ariaSkip: 'Skip to content',
        //   ariaTOC: 'Table of Contents for current page',
        //   ariaMainNav: 'Main Navigation',
        //   ariaMobileNav: 'Mobile Navigation',
        //   ariaSidebarNav: 'Sidebar Navigation',
      },
    },
  }
})()

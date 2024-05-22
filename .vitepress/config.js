const path = require('path')
const getSqldemoSider = require('./siderbars/getSqldemoSider')
const getSqlFunctionSider = require('./siderbars/getSqlFunctionSider')
const getSqlErrorSider = require('./siderbars/getSqlErrorSider')
const getSearchdemoSider = require('./siderbars/getSearchdemoSider')
const getProductSider = require('./siderbars/getProductSider')
const getDataProcessSider = require('./siderbars/getDataProcessSider')
const getSplDataProcessSider = require('./siderbars/getSplDataProcessSider')
const getOscompatibleDemo = require('./siderbars/getOscompatibleDemo')
const getVisulizationDemo = require('./siderbars/getVisulizationSider')
const getCloudlenSider = require('./siderbars/getCloudLenSider')
const getDataAccessSider = require('./siderbars/getDataAccessSider')
const getIntelligentOMSider = require('./siderbars/getIntelligentOMSider')
const getScheduledsqlSider = require('./siderbars/getScheduledsqlSider')
const getBillandsecuritySider = require('./siderbars/getBillandsecuritySider')
const getMetricStoreSider = require('./siderbars/getMetricStoreSider')
const getToolsSider = require('./siderbars/getToolsSider')
const getArmsPlayCallAnalysisSider = require('./siderbars/getArmsPlayCallAnalysisSider')
const getArmsPlayMonitorSider = require('./siderbars/getArmsPlayMonitorSider')
const getArmsPlayUserSider = require('./siderbars/getArmsPlayUserSider')
const getArmsPlayPerformanceSider= require('./siderbars/getArmsPlayPerformanceSider')


// 英文导航栏
const getSqldemoSiderEn = require('./siderbarsEn/getSqldemoSider')
const getSqlFunctionSiderEn = require('./siderbarsEn/getSqlFunctionSider')
const getSqlErrorSiderEn = require('./siderbarsEn/getSqlErrorSider')
const getSearchdemoSiderEn = require('./siderbarsEn/getSearchdemoSider')
const getProductSiderEn = require('./siderbarsEn/getProductSider')
const getDataProcessSiderEn = require('./siderbarsEn/getDataProcessSider')
const getSplDataProcessSiderEn = require('./siderbarsEn/getSplDataProcessSider')
const getOscompatibleDemoEn = require('./siderbarsEn/getOscompatibleDemo')
const getVisulizationDemoEn = require('./siderbarsEn/getVisulizationSider')
const getCloudlenSiderEn = require('./siderbarsEn/getCloudLenSider')
const getDataAccessSiderEn = require('./siderbarsEn/getDataAccessSider')
const getIntelligentOMSiderEn = require('./siderbarsEn/getIntelligentOMSider')
const getScheduledsqlSiderEn = require('./siderbarsEn/getScheduledsqlSider')
const getBillandsecuritySiderEn = require('./siderbarsEn/getBillandsecuritySider')
const getMetricStoreSiderEn = require('./siderbarsEn/getMetricStoreSider')
const getToolsSiderEn = require('./siderbarsEn/getToolsSider')

const getCnNavs = require('./nav').getCnNavs
const getEnNavs = require('./nav').getEnNavs

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
          lastUpdatedText: '最近修改',

          nav: getCnNavs(),

          sidebar: {
            '/sqldemo': getSqldemoSider(),
            '/sqlfunction': getSqlFunctionSider(),
            '/sqlerror': getSqlErrorSider(),
            '/searchdemo': getSearchdemoSider(),
            '/dataprocessdemo': getDataProcessSider(),
            '/spldataprocessdemo/': getSplDataProcessSider(),
            '/oscompatibledemo': getOscompatibleDemo(),
            '/visulization': getVisulizationDemo(),
            '/cloudlen': getCloudlenSider(),
            '/dataaccess': getDataAccessSider(),
            '/intelligentom': getIntelligentOMSider(),
            '/scheduledsql': getScheduledsqlSider(),
            '/billandsecurity': getBillandsecuritySider(),
            '/metrics': getMetricStoreSider(),
            '/tools': getToolsSider(),
            '/armsPlayAppMonitor':getArmsPlayMonitorSider(),
            '/armsPlayCallAnalysis': getArmsPlayCallAnalysisSider(),
             '/armsPlayUser': getArmsPlayUserSider(),
            '/armsPlayPerformance': getArmsPlayPerformanceSider(),
           
          },

          editLink: {
            pattern: 'https://github.com/aliyun-sls/sls-doc/edit/main/src/:path',
            text: '在GitHub修改本页',
          },

          outline: {
            label: '页面导航',
          },
        },
      },
      en: {
        label: 'English',
        lang: 'en',
        description: 'SLS Demo Center',

        themeConfig: {
          lastUpdatedText: 'Last Modified',
          nav: getEnNavs(),
          sidebar: {
            '/en/sqldemo': getSqldemoSiderEn(),
            '/en/sqlfunction': getSqlFunctionSiderEn(),
            '/en/sqlerror': getSqlErrorSiderEn(),
            '/en/searchdemo': getSearchdemoSiderEn(),
            '/en/dataprocessdemo': getDataProcessSiderEn(),
            '/en/oscompatibledemo': getOscompatibleDemoEn(),
            '/en/visulization': getVisulizationDemoEn(),
            '/en/cloudlen': getCloudlenSiderEn(),
            '/en/dataaccess': getDataAccessSiderEn(),
            '/en/intelligentom': getIntelligentOMSiderEn(),
            '/en/scheduledsql': getScheduledsqlSiderEn(),
            // '/billandsecurity': getBillandsecuritySiderEn(),
            '/en/metrics': getMetricStoreSiderEn(),
            '/en/tools': getToolsSiderEn(),
          },

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
    },
  }
})()

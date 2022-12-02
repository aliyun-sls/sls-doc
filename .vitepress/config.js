const path = require('path')
const getSqldemoSider = require('./siderbars/getSqldemoSider')
const getOpensourceSider = require('./siderbars/getOpensourceSider')
const getProductSider = require('./siderbars/getProductSider')
const getTechnicalSider = require('./siderbars/getTechnicalSider')

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
    lang: 'en-US',
    title: 'SLS',
    description: 'SLS 文档中心',

    plugins: {
      sitemap: {
        hostname: 'https://sls.aliyun.com/',
      },
    },

    lastUpdated: true,

    /**
     * @type {import('.theme/src/vitepress/config').Config}
     */
    themeConfig: {
      logo: '/img/sls.png',
      lastUpdatedText: '最近修改',

      algolia: {
        indexName: 'sls-doc-test',
        appId: 'H7AKHYSS2Y',
        apiKey: '5562d4b6eb57fe8fd21a319d961a3bf2',
        placeholder: '在SLS文档中心查找',
        translations: {
          modal: {
            searchBox: {
              cancelButtonText: 'Abort',
              resetButtonTitle: 'Clear search term',
            },
            footer: {
              searchByText: 'Search gracefully done by ',
            },
          },
        },
      },

      editLink: {
        pattern: 'https://github.com/aliyun-sls/sls-doc/edit/main/src/:path',
        text: '在GitHub修改本页',
      },

      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/aliyun-sls/sls-doc',
        },
        // { icon: "twitter", link: "https://twitter.com/vuejs" },
        // { icon: "discord", link: "https://discord.com/invite/HBherRA" },
      ],

      nav: getNavs(),

      sidebar: {
        '/sqlfun': [
          {
            text: 'SQL函数',
            items: [{ text: '函数概览', link: '/sqlfun/index' }, ...sqlfunFiles],
          },
        ],
        '/sqldemo': getSqldemoSider(),
        '/searchdemo': getSearchdemoSider(),
        '/opensource/ilogtail': getOpensourceSider(),
        '/product': getProductSider(),
        '/technical': getTechnicalSider(),
      },

      footer: {
        // license: {
        //   text: 'MIT License',
        //   link: 'https://opensource.org/licenses/MIT'
        // },
        copyright: `Copyright © 2021-${new Date().getFullYear()} Aliyun SLS`,
      },

      // // For i18n translation messages
      i18n: {
        search: '搜索',
        //   menu: 'Menu',
        toc: '本页目录',
        //   returnToTop: 'Return to top',
        //   appearance: 'Appearance',
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

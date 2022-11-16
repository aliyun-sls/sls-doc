const getBase = require("./theme/src/vitepress/config/baseConfig");
const path = require("path");

const glob = require("glob");

const sqlfunFiles = glob
  .sync("./src/sqlfun/*.md")
  .map((f) => path.parse(f).name)
  .filter((f) => f !== "index")
  .map((f) => {
    return {
      text: f,
      link: `/sqlfun/${f}`,
    };
  });

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = (async () => {
  const base = await getBase();

  return {
    ...base,

    vite: {
      ...base.vite,
      build: {
        minify: false,
      },
      resolve: {
        alias: {
          "@vue/theme": path.join(__dirname, "./theme/src"),
        },
      },
    },
    ignoreDeadLinks: true,
    base: "/vuepress-vue-theme-blog/",
    srcDir: "src",
    lang: "en-US",
    title: "SLS",
    description: "SLS 文档中心",

    /**
     * @type {import('.theme/src/vitepress/config').Config}
     */
    themeConfig: {
      logo: "/img/sls.svg",

      algolia: {
        indexName: "vuejs-v3",
        appId: "BH4D9OD16A",
        apiKey: "bc6e8acb44ed4179c30d0a45d6140d3f",
        placeholder: "Search on Vue theme",
        translations: {
          modal: {
            searchBox: {
              cancelButtonText: "Abort",
              resetButtonTitle: "Clear search term",
            },
            footer: {
              searchByText: "Search gracefully done by ",
            },
          },
        },
      },

      // carbonAds: {
      //   code: "CEBDT27Y",
      //   placement: "vuejsorg",
      // },

      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/wangtao0101/vuepress-vue-theme-blog",
        },
        // { icon: "twitter", link: "https://twitter.com/vuejs" },
        // { icon: "discord", link: "https://discord.com/invite/HBherRA" },
      ],

      nav: [
        {
          text: "开发",
          activeMatch: `^/(dev)/`,
          items: [
            {
              items: [
                { text: "环境准备", link: "/dev/env" },
                { text: "文档样例", link: "/dev/" },
              ],
            },
          ],
        },
        {
          text: "文档",
          activeMatch: `^/(sqlfun)/`,
          items: [
            {
              items: [
                { text: "SQL函数", link: "/sqlfun/" },
                // { text: "SQL语法", link: "/xx/xx" },
              ],
            },
          ],
        },
        {
          text: "链接",
          items: [
            {
              items: [
                {
                  text: "日志服务控制台",
                  link: "https://sls.console.aliyun.com/",
                },
              ],
            },
            {
              text: "其他链接",
              items: [
                {
                  text: "日志服务文档",
                  link: "https://help.aliyun.com/document_detail/48869.html",
                },
              ],
            },
          ],
        },
      ],

      sidebar: {
        "/sqlfun": [
          {
            text: "SQL函数",
            items: [
              { text: "函数概览", link: "/sqlfun/index" },
              ...sqlfunFiles,
            ],
          },
        ],
      },

      // // For i18n translation messages
      i18n: {
        search: "搜索",
        //   menu: 'Menu',
        toc: "本页目录",
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
  };
})();

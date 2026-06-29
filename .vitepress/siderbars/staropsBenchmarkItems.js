const caseGroups = [
  {
    "group": "节点/基础设施",
    "items": [
      {
        "text": "案例 1 · 节点 CPU 高",
        "target": "_self",
        "file": "case_01_F026-nodeCpuHigh.html",
        "link": "/starops/benchmark/rca/case_01_F026-nodeCpuHigh.html"
      },
      {
        "text": "案例 2 · 节点 CPU 高",
        "target": "_self",
        "file": "case_02_F026-nodeCpuHigh.html",
        "link": "/starops/benchmark/rca/case_02_F026-nodeCpuHigh.html"
      },
      {
        "text": "案例 3 · 节点 CPU 高",
        "target": "_self",
        "file": "case_03_F026-nodeCpuHigh.html",
        "link": "/starops/benchmark/rca/case_03_F026-nodeCpuHigh.html"
      },
      {
        "text": "案例 4 · 节点宕机",
        "target": "_self",
        "file": "case_04_F001-nodeDown.html",
        "link": "/starops/benchmark/rca/case_04_F001-nodeDown.html"
      }
    ]
  },
  {
    "group": "资源耗尽",
    "items": [
      {
        "text": "案例 5 · JVM Full GC 持续",
        "target": "_self",
        "file": "case_05_F022-fullGC.html",
        "link": "/starops/benchmark/rca/case_05_F022-fullGC.html"
      },
      {
        "text": "案例 6 · Pod 内存吃满 OOM",
        "target": "_self",
        "file": "case_06_F007-memoryPressure.html",
        "link": "/starops/benchmark/rca/case_06_F007-memoryPressure.html"
      },
      {
        "text": "案例 7 · Pod 内存吃满 OOM",
        "target": "_self",
        "file": "case_07_F007-memoryPressure.html",
        "link": "/starops/benchmark/rca/case_07_F007-memoryPressure.html"
      },
      {
        "text": "案例 8 · Pod 内存吃满 OOM",
        "target": "_self",
        "file": "case_08_F007-memoryPressure.html",
        "link": "/starops/benchmark/rca/case_08_F007-memoryPressure.html"
      },
      {
        "text": "案例 9 · JVM Full GC 持续",
        "target": "_self",
        "file": "case_09_F022-fullGC.html",
        "link": "/starops/benchmark/rca/case_09_F022-fullGC.html"
      },
      {
        "text": "案例 10 · 应用 CPU 满载",
        "target": "_self",
        "file": "case_10_F034-cpuFullLoad.html",
        "link": "/starops/benchmark/rca/case_10_F034-cpuFullLoad.html"
      },
      {
        "text": "案例 11 · 应用 CPU 满载",
        "target": "_self",
        "file": "case_11_F034-cpuFullLoad.html",
        "link": "/starops/benchmark/rca/case_11_F034-cpuFullLoad.html"
      },
      {
        "text": "案例 12 · 线程池耗尽",
        "target": "_self",
        "file": "case_12_F002-threadExhaustion.html",
        "link": "/starops/benchmark/rca/case_12_F002-threadExhaustion.html"
      },
      {
        "text": "案例 13 · 线程池耗尽",
        "target": "_self",
        "file": "case_13_F002-threadExhaustion.html",
        "link": "/starops/benchmark/rca/case_13_F002-threadExhaustion.html"
      },
      {
        "text": "案例 14 · 应用 CPU 满载",
        "target": "_self",
        "file": "case_14_F034-cpuFullLoad.html",
        "link": "/starops/benchmark/rca/case_14_F034-cpuFullLoad.html"
      },
      {
        "text": "案例 15 · 应用 CPU 满载",
        "target": "_self",
        "file": "case_15_F034-cpuFullLoad.html",
        "link": "/starops/benchmark/rca/case_15_F034-cpuFullLoad.html"
      },
      {
        "text": "案例 16 · 资源 limit 配错",
        "target": "_self",
        "file": "case_16_F039-resourceLimitMisconfig.html",
        "link": "/starops/benchmark/rca/case_16_F039-resourceLimitMisconfig.html"
      }
    ]
  },
  {
    "group": "流量/调度",
    "items": [
      {
        "text": "案例 17 · 限流",
        "target": "_self",
        "file": "case_17_F016-rateLimiting.html",
        "link": "/starops/benchmark/rca/case_17_F016-rateLimiting.html"
      },
      {
        "text": "案例 18 · 限流",
        "target": "_self",
        "file": "case_18_F016-rateLimiting.html",
        "link": "/starops/benchmark/rca/case_18_F016-rateLimiting.html"
      },
      {
        "text": "案例 19 · Pod 崩溃循环",
        "target": "_self",
        "file": "case_19_F050-podCrashLoop.html",
        "link": "/starops/benchmark/rca/case_19_F050-podCrashLoop.html"
      },
      {
        "text": "案例 20 · 流量突增",
        "target": "_self",
        "file": "case_20_F006-trafficSurge.html",
        "link": "/starops/benchmark/rca/case_20_F006-trafficSurge.html"
      },
      {
        "text": "案例 21 · 流量突增",
        "target": "_self",
        "file": "case_21_F006-trafficSurge.html",
        "link": "/starops/benchmark/rca/case_21_F006-trafficSurge.html"
      },
      {
        "text": "案例 22 · 副本数被误缩减",
        "target": "_self",
        "file": "case_22_F036-replicaScaleDown.html",
        "link": "/starops/benchmark/rca/case_22_F036-replicaScaleDown.html"
      },
      {
        "text": "案例 23 · 副本数被误缩减",
        "target": "_self",
        "file": "case_23_F036-replicaScaleDown.html",
        "link": "/starops/benchmark/rca/case_23_F036-replicaScaleDown.html"
      },
      {
        "text": "案例 24 · 流量热点",
        "target": "_self",
        "file": "case_24_F004-trafficHotspot.html",
        "link": "/starops/benchmark/rca/case_24_F004-trafficHotspot.html"
      },
      {
        "text": "案例 25 · 流量热点",
        "target": "_self",
        "file": "case_25_F004-trafficHotspot.html",
        "link": "/starops/benchmark/rca/case_25_F004-trafficHotspot.html"
      },
      {
        "text": "案例 26 · 流量突增",
        "target": "_self",
        "file": "case_26_F006-trafficSurge.html",
        "link": "/starops/benchmark/rca/case_26_F006-trafficSurge.html"
      },
      {
        "text": "案例 27 · 负载均衡器故障",
        "target": "_self",
        "file": "case_27_F020-loadBalancerFailure.html",
        "link": "/starops/benchmark/rca/case_27_F020-loadBalancerFailure.html"
      },
      {
        "text": "案例 28 · 负载均衡器故障",
        "target": "_self",
        "file": "case_28_F020-loadBalancerFailure.html",
        "link": "/starops/benchmark/rca/case_28_F020-loadBalancerFailure.html"
      }
    ]
  },
  {
    "group": "数据库/缓存",
    "items": [
      {
        "text": "案例 29 · Redis 服务不可用",
        "target": "_self",
        "file": "case_29_F029-redisUnavailable.html",
        "link": "/starops/benchmark/rca/case_29_F029-redisUnavailable.html"
      },
      {
        "text": "案例 30 · Redis 服务不可用",
        "target": "_self",
        "file": "case_30_F029-redisUnavailable.html",
        "link": "/starops/benchmark/rca/case_30_F029-redisUnavailable.html"
      },
      {
        "text": "案例 31 · 数据库慢 SQL",
        "target": "_self",
        "file": "case_31_F010-slowSQL.html",
        "link": "/starops/benchmark/rca/case_31_F010-slowSQL.html"
      },
      {
        "text": "案例 32 · 数据库慢 SQL",
        "target": "_self",
        "file": "case_32_F010-slowSQL.html",
        "link": "/starops/benchmark/rca/case_32_F010-slowSQL.html"
      },
      {
        "text": "案例 33 · 数据库网络延迟",
        "target": "_self",
        "file": "case_33_F018-dbNetworkLatency.html",
        "link": "/starops/benchmark/rca/case_33_F018-dbNetworkLatency.html"
      },
      {
        "text": "案例 34 · 数据库慢 SQL",
        "target": "_self",
        "file": "case_34_F010-slowSQL.html",
        "link": "/starops/benchmark/rca/case_34_F010-slowSQL.html"
      }
    ]
  },
  {
    "group": "代码/应用",
    "items": [
      {
        "text": "案例 35 · 空指针异常",
        "target": "_self",
        "file": "case_35_F023-nullPointerException.html",
        "link": "/starops/benchmark/rca/case_35_F023-nullPointerException.html"
      },
      {
        "text": "案例 36 · 空指针异常",
        "target": "_self",
        "file": "case_36_F023-nullPointerException.html",
        "link": "/starops/benchmark/rca/case_36_F023-nullPointerException.html"
      },
      {
        "text": "案例 37 · 代码缺陷",
        "target": "_self",
        "file": "case_37_F011-codeDefect.html",
        "link": "/starops/benchmark/rca/case_37_F011-codeDefect.html"
      },
      {
        "text": "案例 38 · HTTP 5xx 错误",
        "target": "_self",
        "file": "case_38_F014-httpError5xx.html",
        "link": "/starops/benchmark/rca/case_38_F014-httpError5xx.html"
      },
      {
        "text": "案例 39 · HTTP 5xx 错误",
        "target": "_self",
        "file": "case_39_F014-httpError5xx.html",
        "link": "/starops/benchmark/rca/case_39_F014-httpError5xx.html"
      }
    ]
  },
  {
    "group": "网络",
    "items": [
      {
        "text": "案例 40 · DNS 解析失败",
        "target": "_self",
        "file": "case_40_F057-dnsResolutionFailure.html",
        "link": "/starops/benchmark/rca/case_40_F057-dnsResolutionFailure.html"
      }
    ]
  }
]

function getStaropsBenchmarkItems() {
  return [
    {
      text: '评测基准',
      link: '/starops/benchmark/rca/rca_benchmark_dataset.html',
      target: '_self',
    },
    {
      text: '评测结果',
      link: '/starops/benchmark/rca/rca_benchmark_results.html',
      target: '_self',
    },
    {
      text: '评测案例',
      link: '/starops/benchmark/rca/cases_compare.html',
      target: '_self',
      collapsed: true,
      items: caseGroups.map((group) => ({
        text: group.group,
        collapsed: true,
        items: group.items,
      })),
    },
  ]
}

module.exports = getStaropsBenchmarkItems

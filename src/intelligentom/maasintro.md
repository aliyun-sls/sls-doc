# 日志服务 SLS – 基础模型能力

## 功能介绍

在智能运维这个场景中，SLS 针对 Log、Metric、Trace 这三类基础数据的特点，以及围绕这三类数据的高频场景进行建模

- 时序预测
- 时序异常检测
- 时序片段异常形态分类
- 文本数据中的实体识别（NER）
- Trace 调用链中的高延时 Span 识别

并对这些模型服务化，供客户可以远程调用。跟自己的业务系统进行 API 维度的能力集成。

### Metric 模型能力

在提供的数据中，可以使用如下 SQL，提取相关的指标数据，当数据点数据量大于 100 个点时就可以主动触发该序列的异常检测。

```
* and endpoint: "cn-chengdu.192.168.11.202" | select __time__ - __time__ % 60 as time, sum(flow) as flow_sum from log group by time order by time limit 10000
```

:::tip 时序指标异常检测
[试用 Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/eip-flow-monitor){:rel="noopener noreferrer" target="\_blank"}
:::

### LogNER 模型能力

样例日志一：

```
{
    "source":"Hadoop",
    "content":"Address change detected. Old: msra-sa-41/10.190.173.170:8030 New: msra-sa-41:8030",
}
```

:::tip 标准软件库 NER
[试用 Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/open-logs){:rel="noopener noreferrer" target="\_blank"}
:::

样例日志二：

```
{
    "source":"hibernate-orm",
    "content":"Unable to resolve connection default schema IOException"
}
```

:::tip 标准软件库 NER
[试用 Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/open-library-logs){:rel="noopener noreferrer" target="\_blank"}
:::

## 功能优势

- 在机器数据领域收集并整理了大量的真实数据，进行建模
- 相关模型在日志领域可以做到开箱即用，无需特别多的启动数据
- 在平台上提供了基础的 API 能力，客户在在自己的业务场景中进行集成

## 核心价值

- 智能异常分析应用围绕运维场景中的监控指标、程序日志、服务关系等核心要素展开，通过机器学习等手段产生异常事件，通过服务拓扑关联分析时序数据和事件，最终降低企业的运维复杂度，提高服务质量。

## 通过 OpenAPI 使用基础模型

- 安装所依赖的软件包

```
pip install alibabacloud_sls20201230==4.1.0
```

- 账号所需要的权限

```
{
    "Version": "1",
    "Statement": [
        {
            "Action": [
                "log:Get*"
            ],
            "Resource": [
                "acs:log:*:*:/ml/service/sls_builtin_service_metric_anomaly/",
                "acs:log:*:*:/ml/service/sls_builtin_service_log_struct/",
                "acs:log:*:*:/ml/service/sls_builtin_service_trace_rca/",
                "acs:log:*:*:/ml/service/sls_builtin_service_series_prediction/"
            ],
            "Effect": "Allow"
        }
    ]
}
```

还有一种更佳精简的配置方法，具体如下

```
{
    "Version": "1",
    "Statement": [
        {
            "Action": [
                "log:Get*"
            ],
            "Resource": [
                "acs:log:*:*:/ml/service/sls_builtin_service_*",
                "acs:log:*:*:/ml/service/sls_builtin_service_*/*"
            ],
            "Effect": "Allow"
        }
    ]
}
```

### 1. 日志数据中的实体识别

#### 服务名称

> sls_builtin_service_log_struct

#### 请求参数

body.parameter

```
{
  "is_struct": "true",
  "use_gpu": "true/false",
  "max_fields": "1"
}
```

- is_struct 为 true 时，表示日志格式为 json 结构。目前只支持设置为 true
- use_gpu 表示是否使用 gpu 资源
- max_fields 表示当日志格式为 json 结构时，最多分析其中的几个字段，默认只分析一个字段

body.input

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

输入的内容是一个是 json 结构数组，其中

- column_name 表示 json 结构的日志的某个字段名称
- column_value 表示 json 结构的日志的某个字段的值

#### 返回参数

data

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

输出内容中每一个 json 结构与输入的 json 结构日志一一对应，其中

- column_name 表示 json 结构的日志的被分析了的某个字段名称，最多有 max_fields 个字段被分析
- column*value 表示 json 结构的日志的被分析了的某个字段的值，字段值中的 NER 结果被标签 <ml_ner*${ner_type}></ml_ner_${ner_type}> 包裹，其中 ${ner_type} 是具体的 NER 类型

#### 使用示例（Python）

```
import traceback

from alibabacloud_sls20201230.client import Client as Sls20201230Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_sls20201230 import models as sls_20201230_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient

config = open_api_models.Config(
    # 必填，您的 AccessKey ID,
    access_key_id=access_key_id,
    # 必填，您的 AccessKey Secret,
    access_key_secret=access_key_secret,
    read_timeout=60*1000,
    connect_timeout=60*1000,
    # Endpoint 请参考 https://api.aliyun.com/product/Sls
    endpoint = "cn-shanghai.log.aliyuncs.com"
)
client = Sls20201230Client(config)

param = sls_20201230_models.MLServiceAnalysisParam()
param.parameter = {
    "is_structed": "true",       # 目前必须设置为 "true"
    "use_gpu": "true",
    "max_fields": "2"
}

# 设置待分析的日志列表，每一条日志为 dict 格式
param.input = [
    {
        "column_name_1": 'column_value_1',
        "column_name_2": 'column_value_2'
    },
    {
        "column_name_1": 'column_value_1',
        "column_name_2": 'column_value_2'
    }
]

request = sls_20201230_models.GetMLServiceResultsRequest()
request.allow_builtin = "true"
request.body = param

runtime = util_models.RuntimeOptions()
headers = {}
try:
    service_name = "sls_builtin_service_log_struct"
    resp = client.get_mlservice_results_with_options(service_name, request, headers, runtime)
    if resp.status_code == 200:
        print(resp.body)
except Exception as error:
    print(traceback.format_exc())
    UtilClient.assert_as_string(error.message)
```

### 2. 时序数据的异常检测

#### 服务名称

> sls_builtin_service_metric_anomaly

#### 请求参数

body.parameter

```
{
  "isOrdered": "true/false",
  "keys": "[]",
  "timeColumnName": "",
  "analysisColumnNames": "[]",
  "interval": "-1"
}
```

- isOrdered 表示输入的数据是否是有序的，如果输入的序列是按照时间维度从小到大，升序排列的，设置为 true，否则设置为 false
- interval 表示时间序列的间隔大小，按照秒来描述。比如：序列是每分钟一个点，则设置为 60；如果不确定序列的间隔，则设置为 -1
- timeColumnName 表示输入的序列中，时间维度的名称
- analysisColumnNames 表示输入的序列中，带分析的数值特征维度的名称，使用数组来表示，且需要将这个数组序列化成字符串
- keys 表示输入的数据的各列的名称，使用数组表示，且需要将这个数组序列化成字符串

body.input

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

输入的内容是一个是数组，其中

- column_name 表示序列中某个字段的名称
- column_value 表示序列中某个字段的值的内容。当 {column_name} 等于 {timeColumnName} 时，对应的值表示的是时间大小，使用 unixtime 时间戳来表示，单位是秒

几个限制说明

1. 输入的序列长度，需要在 [100, 10000] 个点

#### 返回参数

data

```
[
  {
    "start": "",
    "end": "",
    "label": ""
  }
]
```

- start 表示检测出来的异常区间的开始时间
- end 表示检测出来的异常区间的结束时间
- label 表示检测出来的当前区间的异常类型
  - SPIKE_UP_TYPE
  - SPIKE_DOWN_TYPE
  - TREND_UP_TYPE
  - TREND_DOWN_TYPE
  - MEANSHIFT_UPWARD_TYPE
  - MEANSHIFT_DOWNWARD_TYPE

#### 使用示例（Python）

```
# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import sys
import json
import time
import numpy as np
from typing import List

from alibabacloud_sls20201230.client import Client as Sls20201230Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_sls20201230 import models as sls_20201230_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient


class Sample:
    def __init__(self):
        pass

    @staticmethod
    def create_client(
        access_key_id: str,
        access_key_secret: str,
    ) -> Sls20201230Client:
        """
        使用AK&SK初始化账号Client
        @param access_key_id:
        @param access_key_secret:
        @return: Client
        @throws Exception
        """
        config = open_api_models.Config(
            # 必填，您的 AccessKey ID,
            access_key_id=access_key_id,
            # 必填，您的 AccessKey Secret,
            access_key_secret=access_key_secret,
            read_timeout=60*1000,
            connect_timeout=60*1000,
        )
        # Endpoint 请参考 https://api.aliyun.com/product/Sls
        config.endpoint = "cn-shanghai.log.aliyuncs.com"
        return Sls20201230Client(config)

    @staticmethod
    def make_ml_service_analysis_param() -> sls_20201230_models.MLServiceAnalysisParam:
        ml_service_analysis_param = sls_20201230_models.MLServiceAnalysisParam()
        time_name = "time"
        feat_names = ["num"]
        interval = 60
        ml_service_analysis_param.parameter = {
            "isOrdered": "true",
            "keys": json.dumps(feat_names + [time_name]),
            "timeColumnName": time_name,
            "analysisColumnNames": json.dumps(feat_names),
            "interval": f"{interval}"
        }
        n_size = 1440
        e = time.time() // interval * interval
        s = e - n_size * interval
        ts = []
        for i in range(n_size):
            ts.append(s + i * interval)
        n_fs = len(feat_names)
        ds = np.random.random((n_size, n_fs))
        inputs = []
        for i in range(0, n_size):
            tmp_dict = {}
            tmp_dict[time_name] = str(int(ts[i]))
            for k, c in enumerate(feat_names):
                tmp_dict[c] = str(ds[i][k])
            inputs.append(tmp_dict)
        ml_service_analysis_param.input = inputs
        return ml_service_analysis_param

    @staticmethod
    def main(
        args: List[str],
    ) -> None:
        # 请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
        # 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例使用环境变量获取 AccessKey 的方式进行调用，仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378659.html
        ALIBABA_CLOUD_ACCESS_KEY_ID = ""
        ALIBABA_CLOUD_ACCESS_KEY_SECRET = ""
        client = Sample.create_client(ALIBABA_CLOUD_ACCESS_KEY_ID, ALIBABA_CLOUD_ACCESS_KEY_SECRET)
        get_mlservice_results_request = sls_20201230_models.GetMLServiceResultsRequest()
        get_mlservice_results_request.allow_builtin = "true"
        get_mlservice_results_request.body = Sample.make_ml_service_analysis_param()
        runtime = util_models.RuntimeOptions()
        headers = {}
        try:
            # 复制代码运行请自行打印 API 的返回值
            service_name = "sls_builtin_service_metric_anomaly"
            resp = client.get_mlservice_results_with_options(service_name, get_mlservice_results_request, headers, runtime)
            if resp.status_code == 200:
                print(resp.body)
        except Exception as error:
            # 错误 message
            print(error.message)
            UtilClient.assert_as_string(error.message)


if __name__ == '__main__':
    for i in range(0, 50):
        Sample.main(sys.argv[1:])
        time.sleep(1)
```

### 3. 高延时 Trace 根因分析

#### 服务名称

> sls_builtin_service_trace_rca

#### 请求参数

body.parameter

```
{
  "project": "",
  "logstore": "",
  "endpoint": "",
  "role_arn": ""
}
```

- project 表示待分析的 Trace 数据存储在 SLS 中的 Project 的名称
- logstore 表示待分析的 Trace 数据存储在 SLS 中的 Logstore 的名称
- endpoint 表示 project 所在地域的 endpoint 信息，这里必须使用公网域名，内网域名无法访问
- role_arn 表示已经对该资源进行授权的角色信息，这里务必使用 ETLRole 或者 AuditRole 的 arn 信息

body.input

```
[
  {
    "service": "",
    "name": "",
    "from_ts_sec": "",
    "to_ts_sec": "",
    "slo_ts_micro": "",
    "batch_id": "",
    "trace_ids": "[]"
  }
]
```

输入的内容是一个是数组，切输入的数组的长度是 1，其中对应的参数的含义解释如下：

- service 表示某个或者某一批待诊断的 TraceID 的服务名称，可以从 logstore 中获得
- name 表示某个或者某一批待诊断的 TraceID 的服务名称，可以从 logstore 中获得
- from_ts_sec 表示待分析的开始时间戳，单位是秒
- to_ts_sec 表示待分析的结束时间戳，单位是秒
- batch_id 表示当前待分析的一批 TraceID 的名称
- trace_ids 表示当前请求中对应的 trace_id 的列表，使用 json 序列化成字符串

#### 返回参数

data

```
[
  {
    "traceID": "",
    "service": "",
    "name": "",
    "rootCauses": "[{}]"
  }
]
```

- traceID 表示待检测的 traceID 信息
- service 表示当前这个 Trace 的根节点的 service 名称
- name 表示当前这个 Trace 的根节点的 name 名称
- rootCauses 表示当前这个高延时请求的 Trace 中，导致高延时的 span 的列表信息，使用序列化后的字符串来表示。该字段的值反序列化后的结构如下：

```
[
  {
    "spanID": "",
    "service": "",
    "name": "",
    "host": "xxxx",
    "predicateDuration": 10
  }
]
```

#### 使用示例（Python）

```
# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import sys
import json
import time
import numpy as np
from typing import List

from alibabacloud_sls20201230.client import Client as Sls20201230Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_sls20201230 import models as sls_20201230_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient


class Sample:
    def __init__(self):
        pass

    @staticmethod
    def create_client(
        access_key_id: str,
        access_key_secret: str,
    ) -> Sls20201230Client:
        """
        使用AK&SK初始化账号Client
        @param access_key_id:
        @param access_key_secret:
        @return: Client
        @throws Exception
        """
        config = open_api_models.Config(
            # 必填，您的 AccessKey ID,
            access_key_id=access_key_id,
            # 必填，您的 AccessKey Secret,
            access_key_secret=access_key_secret,
            read_timeout=60*1000,
            connect_timeout=60*1000,
        )
        # Endpoint 请参考 https://api.aliyun.com/product/Sls
        config.endpoint = "cn-shanghai.log.aliyuncs.com"
        return Sls20201230Client(config)

    @staticmethod
    def make_ml_service_analysis_param() -> sls_20201230_models.MLServiceAnalysisParam:
        ml_service_analysis_param = sls_20201230_models.MLServiceAnalysisParam()
        ml_service_analysis_param.parameter = {
            "project": "{project_name}",
            "logstore": "{logstore_name}",
            "endpoint": "{project 所在的公网endpoint}",
            "role_arn": "acs:ram::{main_account_aliuid}:role/aliyunlogetlrole"
        }
        ml_service_analysis_param.input = [
            {
                "service": "front-end",
                "name": "POST /orders",
                "from_ts_sec": "1701928980",
                "to_ts_sec": "1701929880",
                "slo_ts_micro": "254",
                "batch_id": "test_batch_id",
                "trace_ids": "[\"eca23b71032eb40149864975668f06c9\"]"
            }
        ]
        return ml_service_analysis_param

    @staticmethod
    def main(
        args: List[str],
    ) -> None:
        # 请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
        # 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例使用环境变量获取 AccessKey 的方式进行调用，仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378659.html
        ALIBABA_CLOUD_ACCESS_KEY_ID = ""
        ALIBABA_CLOUD_ACCESS_KEY_SECRET = ""
        client = Sample.create_client(ALIBABA_CLOUD_ACCESS_KEY_ID, ALIBABA_CLOUD_ACCESS_KEY_SECRET)
        get_mlservice_results_request = sls_20201230_models.GetMLServiceResultsRequest()
        get_mlservice_results_request.allow_builtin = "true"
        get_mlservice_results_request.body = Sample.make_ml_service_analysis_param()
        runtime = util_models.RuntimeOptions()
        headers = {}
        try:
            # 复制代码运行请自行打印 API 的返回值
            service_name = "sls_builtin_service_trace_rca"
            resp = client.get_mlservice_results_with_options(service_name, get_mlservice_results_request, headers, runtime)
            if resp.status_code == 200:
                print(resp.body)
        except Exception as error:
            # 错误 message
            print(error.message)
            UtilClient.assert_as_string(error.message)


if __name__ == '__main__':
    Sample.main(sys.argv[1:])
```

### 4. 时序预测方法

#### 服务名称

> sls_builtin_service_series_prediction

#### 请求参数

body.parameter

```
{
  "time_name": "time",
  "feature_names": "[\"flow\"]",
  "pred_config": "{
      \"periods\": 720,
      \"freq\": \"min\"
  }"
}
```

- time_name 表示 input 的每个数据中时间字段的名称
- feature_names 表示 input 的每个数据中的指标字段的名称
- pred_config 表示要预测多长时间的序列，其中 periods 表示要预测多少个点，freq 表示每一个点的时间单位，可选时间单位如下
  - hour 表示小时
  - min 表示分钟
  - s 表示秒
  - day 表示天

body.input

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

输入的内容是一个是 json 结构数组，其中包含一个时间字段（由 parameter.time_name 指定）和若干个指标字段（由 parameter.feature_names 指定）。
其中时间字段的值必须可以转换成整数类型，以秒为单位；指标字段的值必须可以转换成数值类型。

具体的一个例子如下：

```
[
  {
    "flow": "670",
    "time": "1705998420"
  },
  {
    "flow": "499",
    "time": "1705998480"
  },
  ...
]
```

#### 返回参数

data

```
[
  {
      "flow_hat": "733.412776",
      "flow_upper": "924.663573873938",
      "time": "1705973340",
      "flow_lower": "573.3463870005102"
  },
  {
      "flow_hat": "728.8411423109048",
      "flow_upper": "899.7568154110494",
      "time": "1705973400",
      "flow_lower": "560.4061980744253"
  },
  ...
]
```

输出内容中每一个 json 结构表示对于每一个时间时刻的预测结果

- ${time_name} 表示 json 结构对应的时刻，以秒为单位
- ${feature_name}\_hat 表示对应时刻的预测值
- ${feature_name}\_upper 表示对应时刻的预测值的上界
- ${feature_name}\_lower 表示对应时刻的预测值的下界

status

```
{
  "flow_mse": "5084.058",
  "flow_r2": "0.5278"
}
```

包含对于每一个指标的历史数据的拟合程度

- ${feature_name}\_mse 表示拟合对应指标历史数据的均方误差。误差越小，表示预测值对于历史数据的拟合程度越好
- ${feature_name}\_r2 表示拟合对应指标历史数据的 r2 分数。分数越高，表示预测值对于历史数据的拟合程度

#### 使用示例（Python）

```
import traceback

from alibabacloud_sls20201230.client import Client as Sls20201230Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_sls20201230 import models as sls_20201230_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient

config = open_api_models.Config(
    # 必填，您的 AccessKey ID,
    access_key_id=access_key_id,
    # 必填，您的 AccessKey Secret,
    access_key_secret=access_key_secret,
    read_timeout=60*1000,
    connect_timeout=60*1000,
    # Endpoint 请参考 https://api.aliyun.com/product/Sls
    endpoint = "cn-shanghai.log.aliyuncs.com"
)
client = Sls20201230Client(config)

param = sls_20201230_models.MLServiceAnalysisParam()
param.parameter = {
    "time_name": "time",                                 # input 中的时间字段
    "feature_names": "[\"flow\"]",                       # input 中的指标字段
    "pred_config": "{\"periods\": 720, \"freq\": \"min\"}" # 需要预测多长时间的序列，包括时序点的数量和时序点的单位
}

# 设置待预测的时间序列，每一个 json 结构包含一个时序点对应的时间和指标值
param.input = [
    {"flow": "632", "time": "1705973340"},
    {"flow": "679", "time": "1705973400"},
    {"flow": "534", "time": "1705973460"},
    {"flow": "615", "time": "1705973520"},
    {"flow": "675", "time": "1705973580"},
    {"flow": "764", "time": "1705973640"},
    {"flow": "556", "time": "1705973700"},
    {"flow": "505", "time": "1705973760"},
    {"flow": "780", "time": "1705973820"},
    {"flow": "579", "time": "1705973880"}
]

request = sls_20201230_models.GetMLServiceResultsRequest()
request.allow_builtin = "true"
request.body = param

runtime = util_models.RuntimeOptions()
headers = {}
try:
    service_name = "sls_builtin_service_series_prediction"
    resp = client.get_mlservice_results_with_options(service_name, request, headers, runtime)
    if resp.status_code == 200:
        print(resp.body)
except Exception as error:
    print(traceback.format_exc())
    UtilClient.assert_as_string(error.message)
```

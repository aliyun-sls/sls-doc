# 日志服务 SLS – 基础模型能力

## Features

在智能运维这个场景中，SLS 针对 Log、Metric、Trace 这三类基础数据的特点，以及围绕这三类数据的高频场景进行建模

- 时序预测
- 时序异常检测
- 时序片段异常形态分类
- 文本数据中的实体识别（NER）
- Trace 调用链中的高延时 Span 识别

并对这些模型服务化，供客户可以远程调用。跟自己的业务系统进行 API 维度的能力集成。

### Metric model capabilities

Use the following SQL statement to extract relevant metric data from available data. When the number of data points is greater than 100, anomaly detection is actively triggered for time series data.

```
* and endpoint: "cn-chengdu.192.168.11.202" | select __time__ - __time__ % 60 as time, sum(flow) as flow_sum from log group by time order by time limit 10000
```

:::tip Anomaly detection for time series metrics
[Trial Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/eip-flow-monitor){target="\_blank"}
:::

### LogNER model capabilities

Sample log 1:

```
{
    "source":"Hadoop",
    "content":"Address change detected. Old: msra-sa-41/10.190.173.170:8030 New: msra-sa-41:8030",
}
```

:::tip Standard software library NER
[Trial Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/open-logs){target="\_blank"}
:::

Sample log 2:

```
{
    "source":"hibernate-orm",
    "content":"Unable to resolve connection default schema IOException"
}
```

:::tip Standard software library NER
[Trial Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/open-library-logs){target="\_blank"}
:::

## Benefits

- Collects and sorts a large amount of real data from machine data for modeling.
- Provides out-of-the-box models for logging, without the need for much startup data.
- Provides basic API capabilities on the platform, and allows you to integrate API capabilities in your own business scenarios.

## Core values

- The Intelligent Anomaly Analysis application focuses on core elements such as metrics, program logs, and service relationships in O&M scenarios. The application generates anomalous events by using methods such as machine learning, and performs association analysis on time series data and events based on service topologies. This reduces the O&M complexity for enterprises and improves service quality.

## Use basic model services based on API capabilities

- Install the dependent software package.

```
pip install alibabacloud_sls20201230==4.1.0
```

- Grant the required permissions to your account.

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

The following code shows a simpler configuration method:

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

### 1. Perform NER on log data

#### Service name

> sls_builtin_service_log_struct

#### Request parameters

body.parameter

```
{
  "is_struct": "true",
  "use_gpu": "true/false",
  "max_fields": "1"
}
```

- is_struct: specifies whether the format of logs is JSON. A value of true specifies that logs are in the JSON format. Set the value to
- use_gpu: specifies whether to use GPU resources.
- max_fields: the maximum number of fields that can be analyzed when logs are in the JSON format. By default, only one field is analyzed.

body.input

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

The input is a JSON array that contains JSON-formatted logs, where:

- column_name : the name of the log field.
- column_value : the value of the log field.

#### Response parameters

data

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

Each JSON object in the output corresponds to a JSON-formatted log in the input, where:

- column_name : the name of the analyzed log field. The maximum number of fields that are analyzed is specified by the max_fields parameter.
- column*value : the value of the analyzed log field. The NER result in the field value is enclosed in the <ml_ner*${ner_type}></ml_ner_${ner_type}> tag. ${ner_type} indicates the NER type.

#### Sample code（Python）

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

# The logs to be analyzed. Each log is in the dict format.
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

### 2. Detect anomalies in time series data

#### Service name

> sls_builtin_service_metric_anomaly

#### Request parameters

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

- isOrdered: specifies whether the input time series data is ordered. If the input data is ordered in ascending order by time, set this parameter to true. Otherwise, set this parameter to false.
- interval: the interval of the time series data. Unit: seconds. For example, set this parameter to 60 if one data point is generated per minute. If the interval of the time series data is uncertain, set this parameter to -1
- timeColumnName: the name of the time dimension in the input time series data.
- analysisColumnNames: the names of the numeric dimensions to be analyzed in the input time series data. The value is an array and must be serialized into a string.
- keys: the names of columns in the input data. The value is an array and must be serialized into a string.

body.input

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

The input is a JSON array, where:

- column_name: the name of the field in the time series data.
- column_value: the value of the field in the time series data.If the value of the {column_name} parameter is the same as the value of the {timeColumnName} parameter, the field value is a UNIX timestamp representing the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC.

Limits

1. The input time series data must contain 100 to 10,000 data points.

#### Response parameters

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

- start: the start time of the range during which an anomaly is detected.
- end: the end time of the range during which an anomaly is detected.
- label: the type of the anomaly detected in the current time range. Valid values:
  - SPIKE_UP_TYPE
  - SPIKE_DOWN_TYPE
  - TREND_UP_TYPE
  - TREND_DOWN_TYPE
  - MEANSHIFT_UPWARD_TYPE
  - MEANSHIFT_DOWNWARD_TYPE

#### Sample code（Python）

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
        # Make sure that the following environment variables are configured for the runtime environment of the code: ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
        # Project code leakage may lead to the leakage of the AccessKey pair. This exposes all resources within the current account to security risks. The following sample code uses environment variables to obtain an AccessKey pair. The sample code is for reference only. We recommend that you use Security Token Service (STS), which is more secure. For more information, see https://help.aliyun.com/document_detail/378659.html
        ALIBABA_CLOUD_ACCESS_KEY_ID = ""
        ALIBABA_CLOUD_ACCESS_KEY_SECRET = ""
        client = Sample.create_client(ALIBABA_CLOUD_ACCESS_KEY_ID, ALIBABA_CLOUD_ACCESS_KEY_SECRET)
        get_mlservice_results_request = sls_20201230_models.GetMLServiceResultsRequest()
        get_mlservice_results_request.allow_builtin = "true"
        get_mlservice_results_request.body = Sample.make_ml_service_analysis_param()
        runtime = util_models.RuntimeOptions()
        headers = {}
        try:
            # Obtain the returned data of the API operation after the sample code is run.
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

### 3. Analyze the root causes of high-latency traces

#### Service name

> sls_builtin_service_trace_rca

#### Request parameters

body.parameter

```
{
  "project": "",
  "logstore": "",
  "endpoint": "",
  "role_arn": ""
}
```

- project: the name of the Simple Log Service project in which the trace data to be analyzed is stored.
- logstore: the name of the Simple Log Service Logstore in which the trace data to be analyzed is stored.
- endpoint: the endpoint of the region in which the project resides. You must specify a public endpoint because an internal endpoint is inaccessible.
- role_arn: the Alibaba Cloud Resource Name (ARN) of the role that is authorized to access relevant resources. You must specify the ARN of the AliyunLogETLRole or AliyunServiceRoleForSLSAudit role.

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

The input is an array. The array contains the following parameters:

- service: the name of the service whose trace data is to be analyzed. You can obtain the service name from the Logstore.
- name: the name of the service whose trace data is to be analyzed. You can obtain the service name from the Logstore.
- from_ts_sec: the end timestamp of the trace data to be analyzed. Unit: seconds.
- to_ts_sec: the start timestamp of the trace data to be analyzed. Unit: seconds.
- batch_id: the batch name of the trace IDs to be analyzed.
- trace_ids: the trace IDs to be analyzed. The value is in the JSON format and must be serialized into a string.

#### Response parameters

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

#### Sample code（Python）

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
        # Make sure that the following environment variables are configured for the runtime environment of the code: ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
        # Project code leakage may lead to the leakage of the AccessKey pair. This exposes all resources within the current account to security risks. The following sample code uses environment variables to obtain an AccessKey pair. The sample code is for reference only. We recommend that you use STS, which is more secure. For more information, see https://help.aliyun.com/document_detail/378659.html
        ALIBABA_CLOUD_ACCESS_KEY_ID = ""
        ALIBABA_CLOUD_ACCESS_KEY_SECRET = ""
        client = Sample.create_client(ALIBABA_CLOUD_ACCESS_KEY_ID, ALIBABA_CLOUD_ACCESS_KEY_SECRET)
        get_mlservice_results_request = sls_20201230_models.GetMLServiceResultsRequest()
        get_mlservice_results_request.allow_builtin = "true"
        get_mlservice_results_request.body = Sample.make_ml_service_analysis_param()
        runtime = util_models.RuntimeOptions()
        headers = {}
        try:
            # Obtain the returned data of the API operation after the sample code is run.
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

### 4. Predict time series data

#### Service name

> sls_builtin_service_series_prediction

#### Request parameters

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
- feature_names: the names of the metric fields in the input data.
- pred_config: the length of the time series data to be predicted. The periods parameter specifies the number of data points to be predicted, and the freq parameter specifies the time unit of each data point. The following time units are available:
  - hour: hour.
  - min: minute.
  - s: second.
  - day: day.

body.input

```
[
  {
    "{column_name}": "{column_value}"
  }
]
```

The input is a JSON array, which contains a time field and multiple metric fields. The time field is specified by the parameter.time_name parameter, and the metric fields are specified by the parameter.feature_names parameter.
The value of the time field must be converted to the INTEGER type. Unit: seconds. The values of the metric fields must be converted to the NUMERIC type.

The following sample code provides an example:

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

#### Response parameters

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

Each JSON object in the output indicates the prediction results for a metric at a point in time.

- ${time_name}: the point in time of the JSON object. Unit: seconds.
- ${feature_name}\_hat: the predicted value at the point in time.
- ${feature_name}\_upper: the upper limit of the predicted value at the point in time.
- ${feature_name}\_lower: the lower limit of the predicted value at the point in time.

status

```
{
  "flow_mse": "5084.058",
  "flow_r2": "0.5278"
}
```

This parameter indicates the degree at which the predicted value of each metric fits historical data.

- ${feature_name}\_mse: the mean square error for fitting the historical data of the metric. A smaller error indicates that the predicted value better fits the historical data.
- ${feature_name}\_r2: the r2 score for fitting the historical data of the metric. A higher score indicates that the predicted value better fits the historical data.

#### Sample code（Python）

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
    "time_name": "time",
    "feature_names": "[\"flow\"]",
    "pred_config": "{\"periods\": 720, \"freq\": \"min\"}"
}

# The time series data to be predicted. Each JSON object contains the time and metric value at a point in time.
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

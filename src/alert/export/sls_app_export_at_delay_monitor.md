# 数据投递延迟监控

::: tip 说明
- 每分钟检测一次，数据投递作业的投递延迟超过预设阈值后，触发告警。触发阈值以及监控目标等可在规则参数中配置。
- [告警SDK使用参考](https://help.aliyun.com/document_detail/387421.html)
- [告警规则数据结构参考](https://help.aliyun.com/document_detail/433029.htm)
:::

::: code-group

```java [Java]
import com.alibaba.fastjson.JSON;
import com.aliyun.openservices.log.Client;
import com.aliyun.openservices.log.common.*;
import com.aliyun.openservices.log.exception.LogException;
import com.aliyun.openservices.log.request.*;
import com.aliyun.openservices.log.response.*;

import java.util.*;

public class App {
    private static final String REGION = "<your region>";
    private static final String PROJECT = "<your project>";
    private static final String LOGSTORE = "internal-diagnostic_log";
    private static final String ENDPOINT = REGION + ".log.aliyuncs.com";
    private static final String ACCESS_KEY_ID = "**********";
    private static final String ACCESS_KEY_SECRET = "**********";
    private static final Client client = new Client(ENDPOINT, ACCESS_KEY_ID, ACCESS_KEY_SECRET);

    private static void createAlert() {
        JobSchedule schedule = new JobSchedule();
        schedule.setType(JobScheduleType.FIXED_RATE);
        schedule.setInterval("1m");

        Query query = new Query();
        query.setStoreType("log");
        query.setRegion(REGION);
        query.setProject(PROJECT);
        query.setStore(LOGSTORE);
        query.setQuery("__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": ingest| select job_name, avg(\"_etl_:connector_metrics.lags\") as lags from log where regexp_like(\"job_name\", '.*') group by job_name limit 10000");
        query.setStart("-1m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("job_name"));
        
        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("lags >= 300");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.High);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("过去一分钟内，数据投递作业(作业名称:${job_name})的延迟过高，为${lags}秒，大于监控阈值(300秒)。请检查是否存在异常。");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("数据投递延迟过高告警");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": ingest and (job_name: ${job_name})");
        annotations.add(drillDownQueryAnno);

        AlertConfiguration.PolicyConfiguration policyConf = new AlertConfiguration.PolicyConfiguration();
        policyConf.setAlertPolicyId("sls.builtin.dynamic");
        policyConf.setActionPolicyId("sls.builtin");
        policyConf.setRepeatInterval("1m");
        policyConf.setUseDefault(false);

        AlertConfiguration configuration = new AlertConfiguration();
        configuration.setVersion("2.0");
        configuration.setType("default");
        configuration.setDashboard("internal-alert-analysis");
        configuration.setQueryList(Collections.singletonList(query));
        configuration.setGroupConfiguration(groupConf);
        configuration.setJoinConfigurations(joinConfs);
        configuration.setSeverityConfigurations(severityConfs);
        configuration.setLabels(labels);
        configuration.setAnnotations(annotations);
        configuration.setAutoAnnotation(true);
        configuration.setSendResolved(false);
        configuration.setThreshold(1);
        configuration.setNoDataFire(false);
        configuration.setNoDataSeverity(AlertConfiguration.Severity.Medium);
        configuration.setPolicyConfiguration(policyConf);

        Alert alert = new Alert();
        alert.setName("sls_app_export_at_delay_monitor");
        alert.setDisplayName("数据投递延迟监控");
        alert.setState(JobState.ENABLED);
        alert.setSchedule(schedule);
        alert.setConfiguration(configuration);

        try {
            CreateAlertRequest request = new CreateAlertRequest(PROJECT, alert);
            CreateAlertResponse response = client.createAlert(request);
            System.out.println("CreateAlert " + JSON.toJSONString(response));
        } catch (LogException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        createAlert();
    }
}
```

```python [Python]
from aliyun.log import LogClient

region = "<your region>"
project = "<your project>"
logstore = "internal-diagnostic_log"
endpoint = "%s.log.aliyuncs.com" % region
accesskey_id = "**********"
accesskey_secret = "**********"
client = LogClient(endpoint, accesskey_id, accesskey_secret)

def create_alert():
    alert = {
        "name": "sls_app_export_at_delay_monitor",
        "displayName": "数据投递延迟监控",
        "type": "Alert",
        "state": "Enabled",
        "schedule": {
            "type": "FixedRate",
            "interval": "1m"
        },
        "configuration": {
            "version": "2.0",
            "type": "default",
            "dashboard": "internal-alert-analysis",
            "queryList": [{
                "storeType": "log",
                "project": project,
                "store": logstore,
                "query": "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": ingest| select job_name, avg(\"_etl_:connector_metrics.lags\") as lags from log where regexp_like(\"job_name\", '.*') group by job_name limit 10000",
                "timeSpanType": "Relative",
                "start": "-1m",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["job_name"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 8,
                "evalCondition": {
                    "condition": "lags >= 300",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "过去一分钟内，数据投递作业(作业名称:${job_name})的延迟过高，为${lags}秒，大于监控阈值(300秒)。请检查是否存在异常。"
            }, {
                "key": "title",
                "value": "数据投递延迟过高告警"
            }, {
                "key": "__drill_down_query__",
                "value": "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": ingest and (job_name: ${job_name})"
            }],
            "autoAnnotation": True,
            "sendResolved": False,
            "threshold": 1,
            "noDataFire": False,
            "noDataSeverity": 6,
            "policyConfiguration": {
                "alertPolicyId": "sls.builtin.dynamic",
                "actionPolicyId": "sls.builtin",
                "repeatInterval": "1m",
                "useDefault": False
            }
        }
    }

    res = client.create_alert(project, alert)
    res.log_print()

if __name__ == "__main__":
    create_alert()
```

```go [Go]
package main

import (
	"fmt"

	sls "github.com/aliyun/aliyun-log-go-sdk"
)

var (
	region          = "<your region>"
	project         = "<your project>"
	logstore        = "internal-diagnostic_log"
	endpoint        = fmt.Sprintf("%s.log.aliyuncs.com", region)
	accessKeyId     = "**********"
	accessKeySecret = "**********"
	client          = sls.CreateNormalInterface(endpoint, accessKeyId, accessKeySecret, "")
)

func createAlert() {
	alert := &sls.Alert{
		Name:        "sls_app_export_at_delay_monitor",
		DisplayName: "数据投递延迟监控",
		State:       "Enabled",
		Schedule: &sls.Schedule{
			Type:     sls.ScheduleTypeFixedRate,
			Interval: "1m",
		},
		Configuration: &sls.AlertConfiguration{
			Version:   "2.0",
			Type:      "default",
			Dashboard: "internal-alert-analysis",
			QueryList: []*sls.AlertQuery{
				&sls.AlertQuery{
					StoreType:    "log",
					Project:      project,
					Store:        logstore,
					Query:        "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": ingest| select job_name, avg(\"_etl_:connector_metrics.lags\") as lags from log where regexp_like(\"job_name\", '.*') group by job_name limit 10000",
					TimeSpanType: "Relative",
					Start:        "-1m",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"job_name"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.High,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "lags >= 300",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "过去一分钟内，数据投递作业(作业名称:${job_name})的延迟过高，为${lags}秒，大于监控阈值(300秒)。请检查是否存在异常。",
				},
				&sls.Tag{
					Key:   "title",
					Value: "数据投递延迟过高告警",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": ingest and (job_name: ${job_name})",
				},
			},
			AutoAnnotation: true,
			SendResolved:   false,
			Threshold:      1,
			NoDataFire:     false,
			NoDataSeverity: sls.Medium,
			PolicyConfiguration: sls.PolicyConfiguration{
				AlertPolicyId:  "sls.builtin.dynamic",
				ActionPolicyId: "sls.builtin",
				RepeatInterval: "1m",
				UseDefault:     false,
			},
		},
	}

	err := client.CreateAlert(project, alert)
	fmt.Println("CrateAlert", err)
}

func main() {
	createAlert()
}
```

:::
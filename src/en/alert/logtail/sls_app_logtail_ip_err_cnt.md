# Error monitoring on Logtail of a specific IP address

::: Note

- 每 5 分钟检测一次，检测过去 5 分钟的数据。5 分钟内，当同一 IP（Logtail 客户端）出现的错误次数超过设定阈值时，会触发告警。触发阈值可在规则参数中配置。
- [Simple Log Service SDK reference](https://www.alibabacloud.com/help/en/doc-detail/387421.html)
- [Data structure of an alert rule](https://www.alibabacloud.com/help/en/doc-detail/433029.htm)
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
        schedule.setInterval("5m");

        Query query = new Query();
        query.setStoreType("log");
        query.setRegion(REGION);
        query.setProject(PROJECT);
        query.setStore(LOGSTORE);
        query.setQuery("__topic__: logtail_alarm | select source_ip, sum(alarm_count) as cnt group by source_ip limit 10000");
        query.setStart("-5m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("source_ip"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConfCritical = new AlertConfiguration.ConditionConfiguration();
        conditionConfCritical.setCondition("cnt > 10");
        conditionConfCritical.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConfCritical = new AlertConfiguration.SeverityConfiguration();
        severityConfCritical.setSeverity(AlertConfiguration.Severity.Critical);
        severityConfCritical.setEvalCondition(conditionConfCritical);
        severityConfs.add(severityConfCritical);
        AlertConfiguration.ConditionConfiguration conditionConfHigh = new AlertConfiguration.ConditionConfiguration();
        conditionConfHigh.setCondition("cnt > 1");
        conditionConfHigh.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConfHigh = new AlertConfiguration.SeverityConfiguration();
        severityConfHigh.setSeverity(AlertConfiguration.Severity.High);
        severityConfHigh.setEvalCondition(conditionConfHigh);
        severityConfs.add(severityConfHigh);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("If the number of errors that occurred on Logtail of a specific IP address within the last 5 minutes exceeds the specified threshold, an alert is triggered.");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("Error monitoring on Logtail of a specific IP address");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("__topic__: logtail_alarm and source_ip: ${source_ip}");
        annotations.add(drillDownQueryAnno);

        AlertConfiguration.PolicyConfiguration policyConf = new AlertConfiguration.PolicyConfiguration();
        policyConf.setAlertPolicyId("sls.builtin.dynamic");
        policyConf.setActionPolicyId("sls.builtin");
        policyConf.setRepeatInterval("5m");
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
        alert.setName("sls_app_logtail_ip_err_cnt");
        alert.setDisplayName("Error monitoring on Logtail of a specific IP address");
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
        "name": "sls_app_logtail_ip_err_cnt",
        "displayName": "Error monitoring on Logtail of a specific IP address",
        "type": "Alert",
        "state": "Enabled",
        "schedule": {
            "type": "FixedRate",
            "interval": "5m"
        },
        "configuration": {
            "version": "2.0",
            "type": "default",
            "dashboard": "internal-alert-analysis",
            "queryList": [{
                "storeType": "log",
                "project": project,
                "store": logstore,
                "query": "__topic__: logtail_alarm | select source_ip, sum(alarm_count) as cnt group by source_ip limit 10000",
                "timeSpanType": "Relative",
                "start": "-5m",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["source_ip"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 10,
                "evalCondition": {
                    "condition": "cnt > 10",
                    "countCondition": ""
                }
            }, {
                "severity": 8,
                "evalCondition": {
                    "condition": "cnt > 1",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "If the number of errors that occurred on Logtail of a specific IP address within the last 5 minutes exceeds the specified threshold, an alert is triggered."
            }, {
                "key": "title",
                "value": "Error monitoring on Logtail of a specific IP address"
            }, {
                "key": "__drill_down_query__",
                "value": "__topic__: logtail_alarm and source_ip: ${source_ip}"
            }],
            "autoAnnotation": True,
            "sendResolved": False,
            "threshold": 1,
            "noDataFire": False,
            "noDataSeverity": 6,
            "policyConfiguration": {
                "alertPolicyId": "sls.builtin.dynamic",
                "actionPolicyId": "sls.builtin",
                "repeatInterval": "5m",
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
		Name:        "sls_app_logtail_ip_err_cnt",
		DisplayName: "Error monitoring on Logtail of a specific IP address",
		State:       "Enabled",
		Schedule: &sls.Schedule{
			Type:     sls.ScheduleTypeFixedRate,
			Interval: "5m",
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
					Query:        "__topic__: logtail_alarm | select source_ip, sum(alarm_count) as cnt group by source_ip limit 10000",
					TimeSpanType: "Relative",
					Start:        "-5m",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"source_ip"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.Critical,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "cnt > 10",
						CountCondition: "",
					},
				},
				&sls.SeverityConfiguration{
					Severity: sls.High,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "cnt > 1",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "If the number of errors that occurred on Logtail of a specific IP address within the last 5 minutes exceeds the specified threshold, an alert is triggered.",
				},
				&sls.Tag{
					Key:   "title",
					Value: "Error monitoring on Logtail of a specific IP address",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "__topic__: logtail_alarm and source_ip: ${source_ip}",
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
				RepeatInterval: "5m",
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
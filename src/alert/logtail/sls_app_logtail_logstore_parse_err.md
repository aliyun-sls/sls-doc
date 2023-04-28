# Logtail日志解析错误告警

::: tip 说明
- 每5分钟检测一次，检测过去5分钟的数据。过去5分钟内，当有Logstore出现Logtail日志解析错误时，会触发告警。
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
        schedule.setInterval("5m");

        Query query = new Query();
        query.setStoreType("log");
        query.setRegion(REGION);
        query.setProject(PROJECT);
        query.setStore(LOGSTORE);
        query.setQuery("__topic__: logtail_alarm AND (alarm_type : REGEX_MATCH_ALARM  or alarm_type : SPLIT_LOG_FAIL_ALARM  or alarm_type : PARSE_LOG_FAIL_ALARM  or alarm_type : PARSE_TIME_FAIL_ALARM)  | SELECT  project, logstore, coalesce(sum(alarm_count), 0) as cnt group by project, logstore having cnt > 0 order by cnt desc limit 1000");
        query.setStart("-5m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("project", "logstore"));
        
        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.High);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("在过去的5分钟内，在Project\"${project}\"中的Logstore\"${logstore}\"下，共出现${cnt}次Logtail日志解析错误。");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("Logtail日志解析错误告警");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("__topic__: logtail_alarm AND (alarm_type : REGEX_MATCH_ALARM  or alarm_type : SPLIT_LOG_FAIL_ALARM  or alarm_type : PARSE_LOG_FAIL_ALARM  or alarm_type : PARSE_TIME_FAIL_ALARM) and project: \"${project}\" and logstore: \"${logstore}\"");
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
        alert.setName("sls_app_logtail_logstore_parse_err");
        alert.setDisplayName("Logtail日志解析错误告警");
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
        "name": "sls_app_logtail_logstore_parse_err",
        "displayName": "Logtail日志解析错误告警",
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
                "query": "__topic__: logtail_alarm AND (alarm_type : REGEX_MATCH_ALARM  or alarm_type : SPLIT_LOG_FAIL_ALARM  or alarm_type : PARSE_LOG_FAIL_ALARM  or alarm_type : PARSE_TIME_FAIL_ALARM)  | SELECT  project, logstore, coalesce(sum(alarm_count), 0) as cnt group by project, logstore having cnt > 0 order by cnt desc limit 1000",
                "timeSpanType": "Relative",
                "start": "-5m",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["project", "logstore"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 8,
                "evalCondition": {
                    "condition": "",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "在过去的5分钟内，在Project\"${project}\"中的Logstore\"${logstore}\"下，共出现${cnt}次Logtail日志解析错误。"
            }, {
                "key": "title",
                "value": "Logtail日志解析错误告警"
            }, {
                "key": "__drill_down_query__",
                "value": "__topic__: logtail_alarm AND (alarm_type : REGEX_MATCH_ALARM  or alarm_type : SPLIT_LOG_FAIL_ALARM  or alarm_type : PARSE_LOG_FAIL_ALARM  or alarm_type : PARSE_TIME_FAIL_ALARM) and project: \"${project}\" and logstore: \"${logstore}\""
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
		Name:        "sls_app_logtail_logstore_parse_err",
		DisplayName: "Logtail日志解析错误告警",
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
					Query:        "__topic__: logtail_alarm AND (alarm_type : REGEX_MATCH_ALARM  or alarm_type : SPLIT_LOG_FAIL_ALARM  or alarm_type : PARSE_LOG_FAIL_ALARM  or alarm_type : PARSE_TIME_FAIL_ALARM)  | SELECT  project, logstore, coalesce(sum(alarm_count), 0) as cnt group by project, logstore having cnt > 0 order by cnt desc limit 1000",
					TimeSpanType: "Relative",
					Start:        "-5m",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"project", "logstore"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.High,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "在过去的5分钟内，在Project\"${project}\"中的Logstore\"${logstore}\"下，共出现${cnt}次Logtail日志解析错误。",
				},
				&sls.Tag{
					Key:   "title",
					Value: "Logtail日志解析错误告警",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "__topic__: logtail_alarm AND (alarm_type : REGEX_MATCH_ALARM  or alarm_type : SPLIT_LOG_FAIL_ALARM  or alarm_type : PARSE_LOG_FAIL_ALARM  or alarm_type : PARSE_TIME_FAIL_ALARM) and project: \"${project}\" and logstore: \"${logstore}\"",
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
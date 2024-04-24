# Monitoring on the success rate of log parsing

::: Note

- If the ratio of the number of rows that failed to be parsed by Logtail to the total number of rows within the last 5 minutes exceeds the specified threshold, an alert is triggered.
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
        query.setQuery("(__topic__: logtail_profile AND file_name: logstore_statistics)| SELECT project, SUM(succeed_lines) AS SucceedRecords,round(SUM(succeed_lines) * 100.0 / (SUM(parse_failures) + sum(succeed_lines)), 4) AS SucceedRate FROM log group by project limit 10000");
        query.setStart("-5m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("project"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConfCritical = new AlertConfiguration.ConditionConfiguration();
        conditionConfCritical.setCondition("SucceedRate < 90");
        conditionConfCritical.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConfCritical = new AlertConfiguration.SeverityConfiguration();
        severityConfCritical.setSeverity(AlertConfiguration.Severity.Critical);
        severityConfCritical.setEvalCondition(conditionConfCritical);
        severityConfs.add(severityConfCritical);
        AlertConfiguration.ConditionConfiguration conditionConfHigh = new AlertConfiguration.ConditionConfiguration();
        conditionConfHigh.setCondition("SucceedRate < 95");
        conditionConfHigh.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConfHigh = new AlertConfiguration.SeverityConfiguration();
        severityConfHigh.setSeverity(AlertConfiguration.Severity.High);
        severityConfHigh.setEvalCondition(conditionConfHigh);
        severityConfs.add(severityConfHigh);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue(" v");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("Monitoring on the success rate of log parsing");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("(__topic__: logtail_profile AND file_name: logstore_statistics) and project: ${project}");
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
        alert.setName("sls_app_logtail_parse_succ_line");
        alert.setDisplayName("Monitoring on the success rate of log parsing");
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
        "name": "sls_app_logtail_parse_succ_line",
        "displayName": "Monitoring on the success rate of log parsing",
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
                "query": "(__topic__: logtail_profile AND file_name: logstore_statistics)| SELECT project, SUM(succeed_lines) AS SucceedRecords,round(SUM(succeed_lines) * 100.0 / (SUM(parse_failures) + sum(succeed_lines)), 4) AS SucceedRate FROM log group by project limit 10000",
                "timeSpanType": "Relative",
                "start": "-5m",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["project"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 10,
                "evalCondition": {
                    "condition": "SucceedRate < 90",
                    "countCondition": ""
                }
            }, {
                "severity": 8,
                "evalCondition": {
                    "condition": "SucceedRate < 95",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "The success rate of log parsing by Logtail in the project ${project} within the last 5 minutes is ${SucceedRate}%. Check whether an exception exists."
            }, {
                "key": "title",
                "value": "Monitoring on the success rate of log parsing"
            }, {
                "key": "__drill_down_query__",
                "value": "(__topic__: logtail_profile AND file_name: logstore_statistics) and project: ${project}"
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
		Name:        "sls_app_logtail_parse_succ_line",
		DisplayName: "Monitoring on the success rate of log parsing",
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
					Query:        "(__topic__: logtail_profile AND file_name: logstore_statistics)| SELECT project, SUM(succeed_lines) AS SucceedRecords,round(SUM(succeed_lines) * 100.0 / (SUM(parse_failures) + sum(succeed_lines)), 4) AS SucceedRate FROM log group by project limit 10000",
					TimeSpanType: "Relative",
					Start:        "-5m",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"project"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.Critical,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "SucceedRate < 90",
						CountCondition: "",
					},
				},
				&sls.SeverityConfiguration{
					Severity: sls.High,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "SucceedRate < 95",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "The success rate of log parsing by Logtail in the project ${project} within the last 5 minutes is ${SucceedRate}%. Check whether an exception exists.",
				},
				&sls.Tag{
					Key:   "title",
					Value: "Monitoring on the success rate of log parsing",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "(__topic__: logtail_profile AND file_name: logstore_statistics) and project: ${project}",
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
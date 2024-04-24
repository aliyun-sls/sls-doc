# Monitoring on the daily comparison of data shipping traffic

::: Note

- Data is inspected at a 5-minute interval. If the daily fluctuation rate of data shipping traffic within the last 5 minutes exceeds the specified threshold, an alert is triggered.
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
        query.setQuery("__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": deliver | select job_name, today, yesterday, case when yesterday=0 then 0 else round((today - yesterday) * 100.0 / yesterday, 3) end as inc_ration from ( select job_name,(case when diff[1] is null then 0 else diff[1] end) as today, (case when diff[2] is null then 0 else diff[2] end) as yesterday from (select job_name, compare(events, 86400) as diff from (select job_name, sum(\"_etl_:connector_metrics.events\") as \"events\" from log where regexp_like(\"job_name\", '.*') group by job_name limit 10000) group by job_name))");
        query.setStart("-5m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("job_name"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("inc_ration > 40 || inc_ration < -1*20 ");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.High);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("The absolute value of the traffic of the data transformation job ${job_name} with the ID ${job_id} in the source Logstore ${logstore} within the last 5 minutes is smaller than the specified threshold. The average value is ${accept} rows per second, and the threshold is 40,000 rows per second.");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("Alert for daily fluctuation rate of data shipping traffic over the threshold");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": deliver and job_name: ${job_name}");
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
        alert.setName("sls_app_export_at_flow_compare_monitor");
        alert.setDisplayName("Monitoring on the daily comparison of data shipping traffic");
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
        "name": "sls_app_export_at_flow_compare_monitor",
        "displayName": "Monitoring on the daily comparison of data shipping traffic",
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
                "query": "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": deliver | select job_name, today, yesterday, case when yesterday=0 then 0 else round((today - yesterday) * 100.0 / yesterday, 3) end as inc_ration from ( select job_name,(case when diff[1] is null then 0 else diff[1] end) as today, (case when diff[2] is null then 0 else diff[2] end) as yesterday from (select job_name, compare(events, 86400) as diff from (select job_name, sum(\"_etl_:connector_metrics.events\") as \"events\" from log where regexp_like(\"job_name\", '.*') group by job_name limit 10000) group by job_name))",
                "timeSpanType": "Truncated",
                "start": "-5m",
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
                    "condition": "inc_ration > 40 || inc_ration < -1*20 ",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "The absolute value of the traffic of the data transformation job ${job_name} with the ID ${job_id} in the source Logstore ${logstore} within the last 5 minutes is smaller than the specified threshold. The average value is ${accept} rows per second, and the threshold is 40,000 rows per second."
            }, {
                "key": "title",
                "value": "Alert for daily fluctuation rate of data shipping traffic over the threshold"
            }, {
                "key": "__drill_down_query__",
                "value": "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": deliver and job_name: ${job_name}"
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
		Name:        "sls_app_export_at_flow_compare_monitor",
		DisplayName: "Monitoring on the daily comparison of data shipping traffic",
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
					Query:        "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": deliver | select job_name, today, yesterday, case when yesterday=0 then 0 else round((today - yesterday) * 100.0 / yesterday, 3) end as inc_ration from ( select job_name,(case when diff[1] is null then 0 else diff[1] end) as today, (case when diff[2] is null then 0 else diff[2] end) as yesterday from (select job_name, compare(events, 86400) as diff from (select job_name, sum(\"_etl_:connector_metrics.events\") as \"events\" from log where regexp_like(\"job_name\", '.*') group by job_name limit 10000) group by job_name))",
					TimeSpanType: "Truncated",
					Start:        "-5m",
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
						Condition:      "inc_ration > 40 || inc_ration < -1*20 ",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "The absolute value of the traffic of the data transformation job ${job_name} with the ID ${job_id} in the source Logstore ${logstore} within the last 5 minutes is smaller than the specified threshold. The average value is ${accept} rows per second, and the threshold is 40,000 rows per second.",
				},
				&sls.Tag{
					Key:   "title",
					Value: "Alert for daily fluctuation rate of data shipping traffic over the threshold",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "__topic__: etl_metrics and metric_type: ConnectorMetrics and \"_etl_:connector_meta.action\": deliver and job_name: ${job_name}",
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

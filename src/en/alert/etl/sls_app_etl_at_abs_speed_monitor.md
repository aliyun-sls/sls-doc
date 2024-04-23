# Monitoring on the absolute value of data transformation traffic

::: Note

- Data is inspected at a 5-minute interval. If the absolute value of data transformation traffic within the last 5 minutes exceeds the specified threshold, an alert is triggered.
- [Simple Log Service SDK reference](https://help.aliyun.com/document_detail/387421.html)
- [Data structure of an alert rule](https://help.aliyun.com/document_detail/433029.htm)
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
    private static final String LOGSTORE = "internal-etl-log";
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
        query.setQuery("(__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\") | select \"__tag__:__schedule_id__\" as job_id, arbitrary(\"__tag__:__job_name__\") as job_name, arbitrary(\"etl_context.logstore\") as logstore, round(sum(\"progress.accept\") / 300.0, 3) as \"accept\" from log where regexp_like(\"__tag__:__schedule_id__\", '.*') group by job_id limit 10000");
        query.setStart("-5m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("job_id"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("accept < 40000");
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
        titleAnno.setValue("Alert for absolute value of data transformation traffic that is smaller than the specified threshold");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\" and __tag__:__schedule_id__: ${job_id}");
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
        alert.setName("sls_app_etl_at_abs_speed_monitor");
        alert.setDisplayName("Monitoring on the absolute value of data transformation traffic");
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
logstore = "internal-etl-log"
endpoint = "%s.log.aliyuncs.com" % region
accesskey_id = "**********"
accesskey_secret = "**********"
client = LogClient(endpoint, accesskey_id, accesskey_secret)

def create_alert():
    alert = {
        "name": "sls_app_etl_at_abs_speed_monitor",
        "displayName": "Monitoring on the absolute value of data transformation traffic",
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
                "query": "(__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\") | select \"__tag__:__schedule_id__\" as job_id, arbitrary(\"__tag__:__job_name__\") as job_name, arbitrary(\"etl_context.logstore\") as logstore, round(sum(\"progress.accept\") / 300.0, 3) as \"accept\" from log where regexp_like(\"__tag__:__schedule_id__\", '.*') group by job_id limit 10000",
                "timeSpanType": "Truncated",
                "start": "-5m",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["job_id"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 8,
                "evalCondition": {
                    "condition": "accept < 40000",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "The absolute value of the traffic of the data transformation job ${job_name} with the ID ${job_id} in the source Logstore ${logstore} within the last 5 minutes is smaller than the specified threshold. The average value is ${accept} rows per second, and the threshold is 40,000 rows per second."
            }, {
                "key": "title",
                "value": "Alert for absolute value of data transformation traffic that is smaller than the specified threshold"
            }, {
                "key": "__drill_down_query__",
                "value": "__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\" and __tag__:__schedule_id__: ${job_id}"
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
	logstore        = "internal-etl-log"
	endpoint        = fmt.Sprintf("%s.log.aliyuncs.com", region)
	accessKeyId     = "**********"
	accessKeySecret = "**********"
	client          = sls.CreateNormalInterface(endpoint, accessKeyId, accessKeySecret, "")
)

func createAlert() {
	alert := &sls.Alert{
		Name:        "sls_app_etl_at_abs_speed_monitor",
		DisplayName: "Monitoring on the absolute value of data transformation traffic",
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
					Query:        "(__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\") | select \"__tag__:__schedule_id__\" as job_id, arbitrary(\"__tag__:__job_name__\") as job_name, arbitrary(\"etl_context.logstore\") as logstore, round(sum(\"progress.accept\") / 300.0, 3) as \"accept\" from log where regexp_like(\"__tag__:__schedule_id__\", '.*') group by job_id limit 10000",
					TimeSpanType: "Truncated",
					Start:        "-5m",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"job_id"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.High,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "accept < 40000",
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
					Value: "Alert for absolute value of data transformation traffic that is smaller than the specified threshold",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\" and __tag__:__schedule_id__: ${job_id}",
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

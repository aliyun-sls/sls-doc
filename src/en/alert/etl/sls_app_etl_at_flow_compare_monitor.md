# Monitoring on the daily comparison of data transformation traffic

::: Note

- Data is inspected at a 5-minute interval. If the daily fluctuation rate of data transformation traffic within the last 5 minutes exceeds the specified threshold, an alert is triggered.
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
        query.setQuery("(__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\") | select job_id, job_name, logstore, today, yesterday, case when yesterday=0 then 0 else round((today - yesterday) * 100.0 / yesterday, 3) end as inc_ration from (select job_id, job_name, logstore, (case when diff[1] is null then 0 else diff[1] end) as today, (case when diff[2] is null then 0 else diff[2] end) as yesterday from (select job_id, arbitrary(job_name) as job_name, arbitrary(logstore) as logstore, compare(accept, 86400) as diff from(select \"__tag__:__schedule_id__\" as job_id, arbitrary(\"__tag__:__job_name__\") as job_name, arbitrary(\"etl_context.logstore\") as logstore, sum(\"progress.accept\") as \"accept\" from log where regexp_like(\"__tag__:__schedule_id__\", '.*') group by job_id limit 10000) group by job_id))");
        query.setStart("-5m");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("job_id"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("inc_ration > 40 || inc_ration < (-20)");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.High);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("过去5分钟内，源logstore ${logstore}下的数据加工作业(作业ID:${job_id}, 作业名称:${job_name})的加工流量相比于昨日变化过大，变化率为${inc_ration}%。请检查是否存在异常。");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("数据加工流量日同比变化过大告警");
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
        alert.setName("sls_app_etl_at_flow_compare_monitor");
        alert.setDisplayName("Monitoring on the daily comparison of data transformation traffic");
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
        "name": "sls_app_etl_at_flow_compare_monitor",
        "displayName": "Monitoring on the daily comparison of data transformation traffic",
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
                "query": "(__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\") | select job_id, job_name, logstore, today, yesterday, case when yesterday=0 then 0 else round((today - yesterday) * 100.0 / yesterday, 3) end as inc_ration from (select job_id, job_name, logstore, (case when diff[1] is null then 0 else diff[1] end) as today, (case when diff[2] is null then 0 else diff[2] end) as yesterday from (select job_id, arbitrary(job_name) as job_name, arbitrary(logstore) as logstore, compare(accept, 86400) as diff from(select \"__tag__:__schedule_id__\" as job_id, arbitrary(\"__tag__:__job_name__\") as job_name, arbitrary(\"etl_context.logstore\") as logstore, sum(\"progress.accept\") as \"accept\" from log where regexp_like(\"__tag__:__schedule_id__\", '.*') group by job_id limit 10000) group by job_id))",
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
                    "condition": "inc_ration > 40 || inc_ration < (-20)",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "过去5分钟内，源logstore ${logstore}下的数据加工作业(作业ID:${job_id}, 作业名称:${job_name})的加工流量相比于昨日变化过大，变化率为${inc_ration}%。请检查是否存在异常。"
            }, {
                "key": "title",
                "value": "数据加工流量日同比变化过大告警"
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
		Name:        "sls_app_etl_at_flow_compare_monitor",
		DisplayName: "Monitoring on the daily comparison of data transformation traffic",
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
					Query:        "(__topic__:  __etl-log-status__ AND __tag__:__schedule_type__: Resident and event_id:  \"shard_worker:metrics:checkpoint\") | select job_id, job_name, logstore, today, yesterday, case when yesterday=0 then 0 else round((today - yesterday) * 100.0 / yesterday, 3) end as inc_ration from (select job_id, job_name, logstore, (case when diff[1] is null then 0 else diff[1] end) as today, (case when diff[2] is null then 0 else diff[2] end) as yesterday from (select job_id, arbitrary(job_name) as job_name, arbitrary(logstore) as logstore, compare(accept, 86400) as diff from(select \"__tag__:__schedule_id__\" as job_id, arbitrary(\"__tag__:__job_name__\") as job_name, arbitrary(\"etl_context.logstore\") as logstore, sum(\"progress.accept\") as \"accept\" from log where regexp_like(\"__tag__:__schedule_id__\", '.*') group by job_id limit 10000) group by job_id))",
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
						Condition:      "inc_ration > 40 || inc_ration < (-20)",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "过去5分钟内，源logstore ${logstore}下的数据加工作业(作业ID:${job_id}, 作业名称:${job_name})的加工流量相比于昨日变化过大，变化率为${inc_ration}%。请检查是否存在异常。",
				},
				&sls.Tag{
					Key:   "title",
					Value: "数据加工流量日同比变化过大告警",
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

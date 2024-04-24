# Kubernetes common error

::: Note

- Data is inspected at a 5-minute interval. If an empty node is scaled in, an alert is triggered:A Kubernetes common error occurs in the cluster.（kubernetes cluster error event）
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
    private static final String LOGSTORE = "k8s-event";
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
        query.setQuery("level : Error | SELECT ARRAY_AGG(\"eventId.message\") as message, \"eventId.metadata.namespace\" as namespace, \"eventId.involvedObject.kind\" as kind, \"eventId.involvedObject.name\" as object_name, COUNT(*) as cnt from log GROUP by namespace, kind, object_name");
        query.setStart("-360s");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("namespace", "kind", "object_name"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("cnt > 0");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.Medium);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag messageAnno = new AlertConfiguration.Tag();
        messageAnno.setKey("message");
        messageAnno.setValue("${message}");
        annotations.add(messageAnno);
        AlertConfiguration.Tag namespaceAnno = new AlertConfiguration.Tag();
        namespaceAnno.setKey("namespace");
        namespaceAnno.setValue("${namespace}");
        annotations.add(namespaceAnno);
        AlertConfiguration.Tag kindAnno = new AlertConfiguration.Tag();
        kindAnno.setKey("kind");
        kindAnno.setValue("${kind}");
        annotations.add(kindAnno);
        AlertConfiguration.Tag objectNameAnno = new AlertConfiguration.Tag();
        objectNameAnno.setKey("object_name");
        objectNameAnno.setValue("${object_name}");
        annotations.add(objectNameAnno);
        AlertConfiguration.Tag countAnno = new AlertConfiguration.Tag();
        countAnno.setKey("count");
        countAnno.setValue("${cnt}");
        annotations.add(countAnno);
        AlertConfiguration.Tag clusterIdAnno = new AlertConfiguration.Tag();
        clusterIdAnno.setKey("cluster_id");
        clusterIdAnno.setValue("{{default.clusterId}}");
        annotations.add(clusterIdAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("level : Error and \"eventId.metadata.namespace\": ${namespace} and \"eventId.involvedObject.kind\": ${kind} and \"eventId.involvedObject.name\": ${object_name}");
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
        alert.setName("sls_app_ack_common_at_common_err");
        alert.setDisplayName("K8s通用Error警示事件");
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
logstore = "k8s-event"
endpoint = "%s.log.aliyuncs.com" % region
accesskey_id = "**********"
accesskey_secret = "**********"
client = LogClient(endpoint, accesskey_id, accesskey_secret)

def create_alert():
    alert = {
        "name": "sls_app_ack_common_at_common_err",
        "displayName": "K8s通用Error警示事件",
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
                "query": "level : Error | SELECT ARRAY_AGG(\"eventId.message\") as message, \"eventId.metadata.namespace\" as namespace, \"eventId.involvedObject.kind\" as kind, \"eventId.involvedObject.name\" as object_name, COUNT(*) as cnt from log GROUP by namespace, kind, object_name",
                "timeSpanType": "Relative",
                "start": "-360s",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["namespace", "kind", "object_name"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 6,
                "evalCondition": {
                    "condition": "cnt > 0",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "message",
                "value": "${message}"
            }, {
                "key": "namespace",
                "value": "${namespace}"
            }, {
                "key": "kind",
                "value": "${kind}"
            }, {
                "key": "object_name",
                "value": "${object_name}"
            }, {
                "key": "count",
                "value": "${cnt}"
            }, {
                "key": "cluster_id",
                "value": "{{default.clusterId}}"
            }, {
                "key": "__drill_down_query__",
                "value": "level : Error and \"eventId.metadata.namespace\": ${namespace} and \"eventId.involvedObject.kind\": ${kind} and \"eventId.involvedObject.name\": ${object_name}"
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
	logstore        = "k8s-event"
	endpoint        = fmt.Sprintf("%s.log.aliyuncs.com", region)
	accessKeyId     = "**********"
	accessKeySecret = "**********"
	client          = sls.CreateNormalInterface(endpoint, accessKeyId, accessKeySecret, "")
)

func createAlert() {
	alert := &sls.Alert{
		Name:        "sls_app_ack_common_at_common_err",
		DisplayName: "K8s通用Error警示事件",
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
					Query:        "level : Error | SELECT ARRAY_AGG(\"eventId.message\") as message, \"eventId.metadata.namespace\" as namespace, \"eventId.involvedObject.kind\" as kind, \"eventId.involvedObject.name\" as object_name, COUNT(*) as cnt from log GROUP by namespace, kind, object_name",
					TimeSpanType: "Relative",
					Start:        "-360s",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"namespace", "kind", "object_name"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.Medium,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "cnt > 0",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "message",
					Value: "${message}",
				},
				&sls.Tag{
					Key:   "namespace",
					Value: "${namespace}",
				},
				&sls.Tag{
					Key:   "kind",
					Value: "${kind}",
				},
				&sls.Tag{
					Key:   "object_name",
					Value: "${object_name}",
				},
				&sls.Tag{
					Key:   "count",
					Value: "${cnt}",
				},
				&sls.Tag{
					Key:   "cluster_id",
					Value: "{{default.clusterId}}",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "level : Error and \"eventId.metadata.namespace\": ${namespace} and \"eventId.involvedObject.kind\": ${kind} and \"eventId.involvedObject.name\": ${object_name}",
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

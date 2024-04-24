# Kubernetes Alert for label-related operation on a node

::: Note

- 每分钟检查一次，查询过去 2 分钟的日志。监控对 Kubernetes 节点 Label 的相关操作，进行 Label 相关操作后，告警触发。
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
    private static final String LOGSTORE = "<your logstore>";
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
        query.setQuery("* and objectRef.resource : nodes  and   (verb : update or verb : patch )  NOT  user.username: node NOT  user.username: serviceaccount NOT  user.username: apiserver NOT  user.username: kube-scheduler NOT  user.username: kube-controller-manager     | SELECT verb, \"objectRef.namespace\" as namespace, date_format(from_unixtime(__time__), '%Y-%m-%d %T' ) as \"time\", regexp_extract( \"requestURI\", 'nodes/([^/\\?]+)', 1) as \"node\",    CASE WHEN \"user.username\" != 'kubernetes-admin' then \"user.username\"   WHEN \"user.username\" = 'kubernetes-admin' and regexp_like(\"annotations.authorization.k8s.io/reason\", 'RoleBinding') then regexp_extract(\"annotations.authorization.k8s.io/reason\", ' to User \"(\\w+)\"', 1) ELSE 'kubernetes-admin' END  as \"user\",  json_extract(requestObject, '$.metadata.labels') as Label,   case when requestObject like '%null%' or requestObject like '%false%' then 'delete' else 'insert/update' end as \"operationType\", \"responseStatus.code\" as \"responseCode\",   CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as \"sourceIP\", auditID  where json_extract(requestObject, '$.metadata.labels') is not null  order by \"time\" desc limit 10000");
        query.setStart("-120s");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("custom");
        groupConf.setFields(Arrays.asList("auditID"));

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.Medium);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("Kubernetes Alert for label-related operation on a node.Label: ${Label}. Node name: ${node}. Namespace: ${namespace}. Account: ${user}. Time: ${time}. Operation type: ${operationType}. Source IP address: ${sourceIP}.");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("Kubernetes Alert for label-related operation on a node");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("auditID: ${auditID} and objectRef.resource : nodes  and   (verb : update or verb : patch )  NOT  user.username: node NOT  user.username: serviceaccount NOT  user.username: apiserver NOT  user.username: kube-scheduler NOT  user.username: kube-controller-manager");
        annotations.add(drillDownQueryAnno);
        AlertConfiguration.Tag auditidAnno = new AlertConfiguration.Tag();
        auditidAnno.setKey("auditID");
        auditidAnno.setValue("${auditID}");
        annotations.add(auditidAnno);
        AlertConfiguration.Tag verbAnno = new AlertConfiguration.Tag();
        verbAnno.setKey("verb");
        verbAnno.setValue("${verb}");
        annotations.add(verbAnno);
        AlertConfiguration.Tag timeAnno = new AlertConfiguration.Tag();
        timeAnno.setKey("time");
        timeAnno.setValue("${time}");
        annotations.add(timeAnno);
        AlertConfiguration.Tag resourceAnno = new AlertConfiguration.Tag();
        resourceAnno.setKey("resource");
        resourceAnno.setValue("nodes");
        annotations.add(resourceAnno);
        AlertConfiguration.Tag resourcenameAnno = new AlertConfiguration.Tag();
        resourcenameAnno.setKey("resourceName");
        resourcenameAnno.setValue("${node}");
        annotations.add(resourcenameAnno);
        AlertConfiguration.Tag operationtypeAnno = new AlertConfiguration.Tag();
        operationtypeAnno.setKey("operationType");
        operationtypeAnno.setValue("${operationType}");
        annotations.add(operationtypeAnno);
        AlertConfiguration.Tag responsecodeAnno = new AlertConfiguration.Tag();
        responsecodeAnno.setKey("responseCode");
        responsecodeAnno.setValue("${responseCode}");
        annotations.add(responsecodeAnno);
        AlertConfiguration.Tag namespaceAnno = new AlertConfiguration.Tag();
        namespaceAnno.setKey("namespace");
        namespaceAnno.setValue("${namespace}");
        annotations.add(namespaceAnno);
        AlertConfiguration.Tag userAnno = new AlertConfiguration.Tag();
        userAnno.setKey("user");
        userAnno.setValue("${user}");
        annotations.add(userAnno);
        AlertConfiguration.Tag sourceipAnno = new AlertConfiguration.Tag();
        sourceipAnno.setKey("sourceIP");
        sourceipAnno.setValue("${sourceIP}");
        annotations.add(sourceipAnno);
        AlertConfiguration.Tag clusterIdAnno = new AlertConfiguration.Tag();
        clusterIdAnno.setKey("cluster_id");
        clusterIdAnno.setValue("{{cluster_id}}");
        annotations.add(clusterIdAnno);

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
        alert.setName("sls_app_k8s_audit_at_label");
        alert.setDisplayName("Kubernetes Alert for label-related operation on a node");
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
logstore = "<your logstore>"
endpoint = "%s.log.aliyuncs.com" % region
accesskey_id = "**********"
accesskey_secret = "**********"
client = LogClient(endpoint, accesskey_id, accesskey_secret)

def create_alert():
    alert = {
        "name": "sls_app_k8s_audit_at_label",
        "displayName": "Kubernetes Alert for label-related operation on a node",
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
                "query": "* and objectRef.resource : nodes  and   (verb : update or verb : patch )  NOT  user.username: node NOT  user.username: serviceaccount NOT  user.username: apiserver NOT  user.username: kube-scheduler NOT  user.username: kube-controller-manager     | SELECT verb, \"objectRef.namespace\" as namespace, date_format(from_unixtime(__time__), '%Y-%m-%d %T' ) as \"time\", regexp_extract( \"requestURI\", 'nodes/([^/\\?]+)', 1) as \"node\",    CASE WHEN \"user.username\" != 'kubernetes-admin' then \"user.username\"   WHEN \"user.username\" = 'kubernetes-admin' and regexp_like(\"annotations.authorization.k8s.io/reason\", 'RoleBinding') then regexp_extract(\"annotations.authorization.k8s.io/reason\", ' to User \"(\\w+)\"', 1) ELSE 'kubernetes-admin' END  as \"user\",  json_extract(requestObject, '$.metadata.labels') as Label,   case when requestObject like '%null%' or requestObject like '%false%' then 'delete' else 'insert/update' end as \"operationType\", \"responseStatus.code\" as \"responseCode\",   CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as \"sourceIP\", auditID  where json_extract(requestObject, '$.metadata.labels') is not null  order by \"time\" desc limit 10000",
                "timeSpanType": "Relative",
                "start": "-120s",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "custom",
                "fields": ["auditID"]
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 6,
                "evalCondition": {
                    "condition": "",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "Kubernetes Alert for label-related operation on a node。Label: ${Label}. Node name: ${node}. Namespace: ${namespace}. Account: ${user}. Time: ${time}. Operation type: ${operationType}. Source IP address: ${sourceIP}."
            }, {
                "key": "title",
                "value": "Kubernetes Alert for label-related operation on a node"
            }, {
                "key": "__drill_down_query__",
                "value": "auditID: ${auditID} and objectRef.resource : nodes  and   (verb : update or verb : patch )  NOT  user.username: node NOT  user.username: serviceaccount NOT  user.username: apiserver NOT  user.username: kube-scheduler NOT  user.username: kube-controller-manager"
            }, {
                "key": "auditID",
                "value": "${auditID}"
            }, {
                "key": "verb",
                "value": "${verb}"
            }, {
                "key": "time",
                "value": "${time}"
            }, {
                "key": "resource",
                "value": "nodes"
            }, {
                "key": "resourceName",
                "value": "${node}"
            }, {
                "key": "operationType",
                "value": "${operationType}"
            }, {
                "key": "responseCode",
                "value": "${responseCode}"
            }, {
                "key": "namespace",
                "value": "${namespace}"
            }, {
                "key": "user",
                "value": "${user}"
            }, {
                "key": "sourceIP",
                "value": "${sourceIP}"
            }, {
                "key": "cluster_id",
                "value": "{{cluster_id}}"
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
	logstore        = "<your logstore>"
	endpoint        = fmt.Sprintf("%s.log.aliyuncs.com", region)
	accessKeyId     = "**********"
	accessKeySecret = "**********"
	client          = sls.CreateNormalInterface(endpoint, accessKeyId, accessKeySecret, "")
)

func createAlert() {
	alert := &sls.Alert{
		Name:        "sls_app_k8s_audit_at_label",
		DisplayName: "Kubernetes Alert for label-related operation on a node",
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
					Query:        "* and objectRef.resource : nodes  and   (verb : update or verb : patch )  NOT  user.username: node NOT  user.username: serviceaccount NOT  user.username: apiserver NOT  user.username: kube-scheduler NOT  user.username: kube-controller-manager     | SELECT verb, \"objectRef.namespace\" as namespace, date_format(from_unixtime(__time__), '%Y-%m-%d %T' ) as \"time\", regexp_extract( \"requestURI\", 'nodes/([^/\\?]+)', 1) as \"node\",    CASE WHEN \"user.username\" != 'kubernetes-admin' then \"user.username\"   WHEN \"user.username\" = 'kubernetes-admin' and regexp_like(\"annotations.authorization.k8s.io/reason\", 'RoleBinding') then regexp_extract(\"annotations.authorization.k8s.io/reason\", ' to User \"(\\w+)\"', 1) ELSE 'kubernetes-admin' END  as \"user\",  json_extract(requestObject, '$.metadata.labels') as Label,   case when requestObject like '%null%' or requestObject like '%false%' then 'delete' else 'insert/update' end as \"operationType\", \"responseStatus.code\" as \"responseCode\",   CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as \"sourceIP\", auditID  where json_extract(requestObject, '$.metadata.labels') is not null  order by \"time\" desc limit 10000",
					TimeSpanType: "Relative",
					Start:        "-120s",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "custom",
				Fields: []string{"auditID"},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.Medium,
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
					Value: "Kubernetes Alert for label-related operation on a node。Label: ${Label}. Node name: ${node}. Namespace: ${namespace}. Account: ${user}. Time: ${time}. Operation type: ${operationType}. Source IP address: ${sourceIP}.",
				},
				&sls.Tag{
					Key:   "title",
					Value: "Kubernetes Alert for label-related operation on a node",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "auditID: ${auditID} and objectRef.resource : nodes  and   (verb : update or verb : patch )  NOT  user.username: node NOT  user.username: serviceaccount NOT  user.username: apiserver NOT  user.username: kube-scheduler NOT  user.username: kube-controller-manager",
				},
				&sls.Tag{
					Key:   "auditID",
					Value: "${auditID}",
				},
				&sls.Tag{
					Key:   "verb",
					Value: "${verb}",
				},
				&sls.Tag{
					Key:   "time",
					Value: "${time}",
				},
				&sls.Tag{
					Key:   "resource",
					Value: "nodes",
				},
				&sls.Tag{
					Key:   "resourceName",
					Value: "${node}",
				},
				&sls.Tag{
					Key:   "operationType",
					Value: "${operationType}",
				},
				&sls.Tag{
					Key:   "responseCode",
					Value: "${responseCode}",
				},
				&sls.Tag{
					Key:   "namespace",
					Value: "${namespace}",
				},
				&sls.Tag{
					Key:   "user",
					Value: "${user}",
				},
				&sls.Tag{
					Key:   "sourceIP",
					Value: "${sourceIP}",
				},
				&sls.Tag{
					Key:   "cluster_id",
					Value: "{{cluster_id}}",
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

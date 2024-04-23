# Kubernetes LOGON OVER THE INTERNET

::: Note

- 每分钟检查一次，查询过去 2 分钟的日志。当存在公网登录事件时，告警触发。
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
        query.setQuery("* | select count(DISTINCT ip) as ip_count, sum(total) as total, sum(failCount) as failCount from (select CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as ip, count(1) as total,  sum(CASE WHEN \"responseStatus.code\" < 400 then 0   ELSE 1 END) * 1.0 / count(1) as fail_rate,  count_if(\"responseStatus.code\" > 399) as failCount from log WHERE ip_to_domain(json_format(json_array_get(sourceIPs, 0))) = 'internet' group by ip ORDER BY total desc limit 10000)");
        query.setStart("-120s");
        query.setEnd("now");
        query.setPowerSqlMode("auto");

        AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();
        groupConf.setType("no_group");
        groupConf.setFields(Arrays.asList());

        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

        List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();
        AlertConfiguration.ConditionConfiguration conditionConf = new AlertConfiguration.ConditionConfiguration();
        conditionConf.setCondition("total > 0");
        conditionConf.setCountCondition("");
        AlertConfiguration.SeverityConfiguration severityConf = new AlertConfiguration.SeverityConfiguration();
        severityConf.setSeverity(AlertConfiguration.Severity.Medium);
        severityConf.setEvalCondition(conditionConf);
        severityConfs.add(severityConf);

        List<AlertConfiguration.Tag> labels = new ArrayList<AlertConfiguration.Tag>();

        List<AlertConfiguration.Tag> annotations = new ArrayList<AlertConfiguration.Tag>();
        AlertConfiguration.Tag descAnno = new AlertConfiguration.Tag();
        descAnno.setKey("desc");
        descAnno.setValue("Number of IP addresses used for logons over the Internet: ${ip_count}. Number of logons: ${total}. Number of logon failures: ${failCount}.");
        annotations.add(descAnno);
        AlertConfiguration.Tag titleAnno = new AlertConfiguration.Tag();
        titleAnno.setKey("title");
        titleAnno.setValue("Kubernetes LOGON OVER THE INTERNET");
        annotations.add(titleAnno);
        AlertConfiguration.Tag drillDownQueryAnno = new AlertConfiguration.Tag();
        drillDownQueryAnno.setKey("__drill_down_query__");
        drillDownQueryAnno.setValue("*|select CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as ip, count(1) as total,  sum(CASE WHEN \"responseStatus.code\" < 400 then 0   ELSE 1 END) * 1.0 / count(1) as fail_rate,  count_if(\"responseStatus.code\" > 399) as failCount from log WHERE ip_to_domain(json_format(json_array_get(sourceIPs, 0))) = 'internet' group by ip ORDER BY total desc limit 10000");
        annotations.add(drillDownQueryAnno);
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
        alert.setName("sls_app_k8s_audit_at_internet_login");
        alert.setDisplayName("Kubernetes LOGON OVER THE INTERNET");
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
        "name": "sls_app_k8s_audit_at_internet_login",
        "displayName": "Kubernetes LOGON OVER THE INTERNET",
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
                "query": "* | select count(DISTINCT ip) as ip_count, sum(total) as total, sum(failCount) as failCount from (select CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as ip, count(1) as total,  sum(CASE WHEN \"responseStatus.code\" < 400 then 0   ELSE 1 END) * 1.0 / count(1) as fail_rate,  count_if(\"responseStatus.code\" > 399) as failCount from log WHERE ip_to_domain(json_format(json_array_get(sourceIPs, 0))) = 'internet' group by ip ORDER BY total desc limit 10000)",
                "timeSpanType": "Relative",
                "start": "-120s",
                "end": "now",
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": "no_group",
                "fields": []
            },
            "joinConfigurations": [],
            "severityConfigurations": [{
                "severity": 6,
                "evalCondition": {
                    "condition": "total > 0",
                    "countCondition": ""
                }
            }],
            "labes": [],
            "annotations": [{
                "key": "desc",
                "value": "Number of IP addresses used for logons over the Internet: ${ip_count}. Number of logons: ${total}. Number of logon failures: ${failCount}."
            }, {
                "key": "title",
                "value": "Kubernetes LOGON OVER THE INTERNET"
            }, {
                "key": "__drill_down_query__",
                "value": "*|select CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as ip, count(1) as total,  sum(CASE WHEN \"responseStatus.code\" < 400 then 0   ELSE 1 END) * 1.0 / count(1) as fail_rate,  count_if(\"responseStatus.code\" > 399) as failCount from log WHERE ip_to_domain(json_format(json_array_get(sourceIPs, 0))) = 'internet' group by ip ORDER BY total desc limit 10000"
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
		Name:        "sls_app_k8s_audit_at_internet_login",
		DisplayName: "Kubernetes LOGON OVER THE INTERNET",
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
					Query:        "* | select count(DISTINCT ip) as ip_count, sum(total) as total, sum(failCount) as failCount from (select CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as ip, count(1) as total,  sum(CASE WHEN \"responseStatus.code\" < 400 then 0   ELSE 1 END) * 1.0 / count(1) as fail_rate,  count_if(\"responseStatus.code\" > 399) as failCount from log WHERE ip_to_domain(json_format(json_array_get(sourceIPs, 0))) = 'internet' group by ip ORDER BY total desc limit 10000)",
					TimeSpanType: "Relative",
					Start:        "-120s",
					End:          "now",
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   "no_group",
				Fields: []string{},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: []*sls.SeverityConfiguration{
				&sls.SeverityConfiguration{
					Severity: sls.Medium,
					EvalCondition: sls.ConditionConfiguration{
						Condition:      "total > 0",
						CountCondition: "",
					},
				},
			},
			Labels: []*sls.Tag{},
			Annotations: []*sls.Tag{
				&sls.Tag{
					Key:   "desc",
					Value: "Number of IP addresses used for logons over the Internet: ${ip_count}. Number of logons: ${total}. Number of logon failures: ${failCount}.",
				},
				&sls.Tag{
					Key:   "title",
					Value: "Kubernetes LOGON OVER THE INTERNET",
				},
				&sls.Tag{
					Key:   "__drill_down_query__",
					Value: "*|select CASE WHEN json_array_length(sourceIPs) = 1 then json_format(json_array_get(sourceIPs, 0)) ELSE  sourceIPs END  as ip, count(1) as total,  sum(CASE WHEN \"responseStatus.code\" < 400 then 0   ELSE 1 END) * 1.0 / count(1) as fail_rate,  count_if(\"responseStatus.code\" > 399) as failCount from log WHERE ip_to_domain(json_format(json_array_get(sourceIPs, 0))) = 'internet' group by ip ORDER BY total desc limit 10000",
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

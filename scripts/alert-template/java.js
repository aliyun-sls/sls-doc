const { indentSpace, quote, camelCase } = require('./utils')

function severityToEnum(severity) {
  const m = {
    '2': 'AlertConfiguration.Severity.Report',
    '4': 'AlertConfiguration.Severity.Low',
    '6': 'AlertConfiguration.Severity.Medium',
    '8': 'AlertConfiguration.Severity.High',
    '10': 'AlertConfiguration.Severity.Critical',
  }
  return m[severity] || m['6']
}

/**
 * Generate group configuration.
 */
function genGroupConfiguration(config) {
  const { type, fields = [] } = config
  const fieldsArgs = fields.map(f => `${quote(f)}`).join(', ')
  const result = [
    `AlertConfiguration.GroupConfiguration groupConf = new AlertConfiguration.GroupConfiguration();`,
    `groupConf.setType(${quote(type)});`,
    `groupConf.setFields(Arrays.asList(${fieldsArgs}));`
  ]
  return indentSpace(result, 8)
}

/**
 * Generate severity configurations.
 */
function genSeverityConfigurations(arr) {
  const result = [
    `List<AlertConfiguration.SeverityConfiguration> severityConfs = new ArrayList<>();`
  ]
  if (arr && arr.length) {
    arr.forEach(config => {
      const { severity, evalCondition } = config
      const suffix = arr.length === 1 ? '' : `_${severityToEnum(severity).split('.').reverse()[0]}`
      const conditionName = camelCase(`condition_conf${suffix}`)
      const configName = camelCase(`severity_conf${suffix}`)
      result.push(
        `AlertConfiguration.ConditionConfiguration ${conditionName} = new AlertConfiguration.ConditionConfiguration();`,
        `${conditionName}.setCondition(${quote(evalCondition.condition || '')});`,
        `${conditionName}.setCountCondition(${quote(evalCondition.countCondition || '')});`,
        `AlertConfiguration.SeverityConfiguration ${configName} = new AlertConfiguration.SeverityConfiguration();`,
        `${configName}.setSeverity(${severityToEnum(severity)});`,
        `${configName}.setEvalCondition(${conditionName});`,
        `severityConfs.add(${configName});`
      )
    })
  }
  return indentSpace(result, 8)
}

/**
 * Generate labels and annotations.
 */
function genTags(arr, type) {
  const suffix = {
    labels: 'label',
    annotations: 'anno',
  }
  const result = [
    indentSpace(`List<AlertConfiguration.Tag> ${type} = new ArrayList<AlertConfiguration.Tag>();`, 8)
  ]
  if (arr && arr.length) {
    arr.forEach(tag => {
      const name = camelCase(`${tag.key.replace(/^_+|_+$/g, '')}_${suffix[type]}`)
      result.push(
        indentSpace([
          `AlertConfiguration.Tag ${name} = new AlertConfiguration.Tag();`,
          `${name}.setKey(${quote(tag.key)});`,
          `${name}.setValue(${quote(tag.value)});`,
          `${type}.add(${name});`,
        ], 8)
      )
    })
  }

  return result.join('\n')
}

module.exports = function(tplVars) {
  const { alert, projectIsToken, storeIsToken } = tplVars
  const { configuration } = alert
  const { project, store } = configuration.queryList[0]
  const variables = [
    `private static final String REGION = "<your region>";`,
    `private static final String PROJECT = "${projectIsToken ? '<your project>' : project}";`,
    `private static final String LOGSTORE = "${storeIsToken ? '<your logstore>' : store}";`,
    `private static final String ENDPOINT = REGION + ".log.aliyuncs.com";`,
    `private static final String ACCESS_KEY_ID = "**********";`,
    `private static final String ACCESS_KEY_SECRET = "**********";`,
    `private static final Client client = new Client(ENDPOINT, ACCESS_KEY_ID, ACCESS_KEY_SECRET);`,
  ]

  return `
import com.alibaba.fastjson.JSON;
import com.aliyun.openservices.log.Client;
import com.aliyun.openservices.log.common.*;
import com.aliyun.openservices.log.exception.LogException;
import com.aliyun.openservices.log.request.*;
import com.aliyun.openservices.log.response.*;

import java.util.*;

public class App {
${indentSpace(variables, 4)}

    private static void createAlert() {
        JobSchedule schedule = new JobSchedule();
        schedule.setType(JobScheduleType.FIXED_RATE);
        schedule.setInterval(${quote(alert.schedule.interval)});

        Query query = new Query();
        query.setStoreType("log");
        query.setRegion(REGION);
        query.setProject(PROJECT);
        query.setStore(LOGSTORE);
        query.setQuery(${quote(configuration.queryList[0].query)});
        query.setStart(${quote(configuration.queryList[0].start)});
        query.setEnd(${quote(configuration.queryList[0].end)});
        query.setPowerSqlMode("auto");

${genGroupConfiguration(configuration.groupConfiguration)}
        
        List<AlertConfiguration.JoinConfiguration> joinConfs = new ArrayList<>();

${genSeverityConfigurations(configuration.severityConfigurations)}

${genTags(configuration.labels, 'labels')}

${genTags(configuration.annotations, 'annotations')}

        AlertConfiguration.PolicyConfiguration policyConf = new AlertConfiguration.PolicyConfiguration();
        policyConf.setAlertPolicyId(${quote(configuration.policyConfiguration.alertPolicyId)});
        policyConf.setActionPolicyId(${quote(configuration.policyConfiguration.actionPolicyId)});
        policyConf.setRepeatInterval(${quote(alert.schedule.interval)});
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
        configuration.setAutoAnnotation(${configuration.autoAnnotation});
        configuration.setSendResolved(${configuration.sendResolved});
        configuration.setThreshold(${configuration.threshold});
        configuration.setNoDataFire(${configuration.noDataFire});
        configuration.setNoDataSeverity(${severityToEnum(configuration.noDataSeverity)});
        configuration.setPolicyConfiguration(policyConf);

        Alert alert = new Alert();
        alert.setName(${quote(alert.name)});
        alert.setDisplayName(${quote(alert.displayName)});
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
`
}
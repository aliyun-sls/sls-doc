const { indentSpace, quote } = require('./utils')

function toPythonBool(val) {
  return val === true ? 'True' : 'False'
}

/**
 * Generate labels and annotations.
 */
function genTags(arr) {
  const tags = (arr || []).map(tag => {
    return [
      `{`,
      indentSpace(`"key": ${quote(tag.key)},`, 16),
      indentSpace(`"value": ${quote(tag.value)}`, 16),
      indentSpace(`}`, 12)
    ].join('\n')
  }).join(', ')
  return `[${tags}]`
}

/**
 * Generate severity configruations.
 */
function genSeverityConfig(arr) {
  const configs = arr.map(s => {
    return [
      `{`,
      indentSpace(`"severity": ${s.severity || 6},`, 16),
      indentSpace(`"evalCondition": {`, 16),
      indentSpace(`"condition": ${quote(s.evalCondition.condition)},`, 20),
      indentSpace(`"countCondition": ${quote(s.evalCondition.countCondition)}`, 20),
      indentSpace(`}`, 16),
      indentSpace(`}`, 12)
    ].join('\n')
  }).join(', ')
  return `[${configs}]`
}

module.exports = function(tplVars) {
  const { alert, projectIsToken, storeIsToken } = tplVars
  const { configuration } = alert
  const { project, store } = alert.configuration.queryList[0]
  const variables = [
    `region = "<your region>"`,
    `project = "${projectIsToken ? '<your project>' : project}"`,
    `logstore = "${storeIsToken ? '<your logstore>' : store}"`,
    `endpoint = "%s.log.aliyuncs.com" % region`,
    `accesskey_id = "**********"`,
    `accesskey_secret = "**********"`,
    `client = LogClient(endpoint, accesskey_id, accesskey_secret)`,
  ].join('\n')

  return `
from aliyun.log import LogClient

${variables}

def create_alert():
    alert = {
        "name": ${quote(alert.name)},
        "displayName": ${quote(alert.displayName)},
        "type": "Alert",
        "state": "Enabled",
        "schedule": {
            "type": "FixedRate",
            "interval": ${quote(alert.schedule.interval)}
        },
        "configuration": {
            "version": "2.0",
            "type": "default",
            "dashboard": "internal-alert-analysis",
            "queryList": [{
                "storeType": "log",
                "project": project,
                "store": logstore,
                "query": ${quote(configuration.queryList[0].query)},
                "timeSpanType": ${quote(configuration.queryList[0].timeSpanType)},
                "start": ${quote(configuration.queryList[0].start)},
                "end": ${quote(configuration.queryList[0].end)},
                "powerSqlMode": "auto"
            }],
            "groupConfiguration": {
                "type": ${quote(configuration.groupConfiguration.type)},
                "fields": [${(configuration.groupConfiguration.fields || []).map(f => `"${f}"`).join(', ')}]
            },
            "joinConfigurations": [],
            "severityConfigurations": ${genSeverityConfig(configuration.severityConfigurations)},
            "labes": ${genTags(configuration.labels)},
            "annotations": ${genTags(configuration.annotations)},
            "autoAnnotation": ${toPythonBool(configuration.autoAnnotation)},
            "sendResolved": ${toPythonBool(configuration.sendResolved)},
            "threshold": ${configuration.threshold || 1},
            "noDataFire": ${toPythonBool(configuration.noDataFire)},
            "noDataSeverity": ${configuration.noDataSeverity || 6},
            "policyConfiguration": {
                "alertPolicyId": ${quote(configuration.policyConfiguration.alertPolicyId)},
                "actionPolicyId": ${quote(configuration.policyConfiguration.actionPolicyId)},
                "repeatInterval": ${quote(alert.schedule.interval)},
                "useDefault": False
            }
        }
    }

    res = client.create_alert(project, alert)
    res.log_print()

if __name__ == "__main__":
    create_alert()
`
}
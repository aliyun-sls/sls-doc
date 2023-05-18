const { indentTab, quote } = require('./utils')

function severityToEnum(severity) {
  const m = {
    '2': 'sls.Report',
    '4': 'sls.Low',
    '6': 'sls.Medium',
    '8': 'sls.High',
    '10': 'sls.Critical',
  }
  return m[severity] || m['6']
}

/**
 * Generate labels and annotations.
 */
function genTags(arr) {
  if (!arr || !arr.length) {
    return `[]*sls.Tag{}`
  }
  const tags = arr.map(tag => {
    return indentTab([
      `&sls.Tag{`,
      `\tKey:   ${quote(tag.key)},`,
      `\tValue: ${quote(tag.value)},`,
      `},`,
    ], 4)
  }).join('\n')
  return ['[]*sls.Tag{', tags, '\t\t\t}'].join('\n')
}

/**
 * Generate severity configruations.
 */
function genSeverityConfig(arr) {
  if (!arr || !arr.length) {
    return '[]*sls.SeverityConfiguration{}'
  }
  const configs = arr.map(s => {
    return indentTab([
      `&sls.SeverityConfiguration{`,
      `\tSeverity: ${severityToEnum(s.severity)},`,
      `\tEvalCondition: sls.ConditionConfiguration{`,
      `\t\tCondition:      ${quote(s.evalCondition.condition)},`,
      `\t\tCountCondition: ${quote(s.evalCondition.countCondition)},`,
      `\t},`,
      `},`
    ], 4)
  }).join('\n')
  return [`[]*sls.SeverityConfiguration{`, configs, '\t\t\t}'].join('\n')
}

module.exports = function(tplVars) {
  const { alert, projectIsToken, storeIsToken } = tplVars
  const { configuration } = alert
  const { project, store } = configuration.queryList[0]
  const variables = [
    `region          = "<your region>"`,
    `project         = "${projectIsToken ? '<your project>' : project}"`,
    `logstore        = "${storeIsToken ? '<your logstore>' : store}"`,
    `endpoint        = fmt.Sprintf("%s.log.aliyuncs.com", region)`,
    `accessKeyId     = "**********"`,
    `accessKeySecret = "**********"`,
    `client          = sls.CreateNormalInterface(endpoint, accessKeyId, accessKeySecret, "")`,
  ]

  return `
package main

import (
	"fmt"

	sls "github.com/aliyun/aliyun-log-go-sdk"
)

var (
${indentTab(variables)}
)

func createAlert() {
	alert := &sls.Alert{
		Name:        ${quote(alert.name)},
		DisplayName: ${quote(alert.displayName)},
		State:       "Enabled",
		Schedule: &sls.Schedule{
			Type:     sls.ScheduleTypeFixedRate,
			Interval: ${quote(alert.schedule.interval)},
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
					Query:        ${quote(configuration.queryList[0].query)},
					TimeSpanType: ${quote(configuration.queryList[0].timeSpanType)},
					Start:        ${quote(configuration.queryList[0].start)},
					End:          ${quote(configuration.queryList[0].end)},
					PowerSqlMode: sls.PowerSqlModeAuto,
				},
			},
			GroupConfiguration: sls.GroupConfiguration{
				Type:   ${quote(configuration.groupConfiguration.type)},
				Fields: []string{${(configuration.groupConfiguration.fields || []).map(f => `"${f}"`).join(', ')}},
			},
			JoinConfigurations: []*sls.JoinConfiguration{},
			SeverityConfigurations: ${genSeverityConfig(configuration.severityConfigurations)},
			Labels: ${genTags(configuration.labels)},
			Annotations: ${genTags(configuration.annotations)},
			AutoAnnotation: ${configuration.autoAnnotation || false},
			SendResolved:   ${configuration.sendResolved || false},
			Threshold:      ${configuration.threshold || 1},
			NoDataFire:     ${configuration.noDataFire || false},
			NoDataSeverity: ${severityToEnum(configuration.noDataSeverity)},
			PolicyConfiguration: sls.PolicyConfiguration{
				AlertPolicyId:  ${quote(configuration.policyConfiguration.alertPolicyId)},
				ActionPolicyId: ${quote(configuration.policyConfiguration.actionPolicyId)},
				RepeatInterval: ${quote(alert.schedule.interval)},
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
`
}
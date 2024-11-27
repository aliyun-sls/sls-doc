# 解析复杂日志中的字段

## 场景一：从复杂字符串中解析出json字符串，并展开特定字段
  * 原始日志
    ```
    content: [v1] [2024-07-12 14:45:15.497+0800] [INFO ] [XXID-1 task-10] WBERVIE [UID: N/A] m_point|{\"extra\":\"{\\\"items\\\":[{\\\"path\\\":\\\"Vdsjbxk.Cbsj.EV.FPDD\\\",\\\"id\\\":17,\\\"value\\\":1}]}\",\"vin\":\"WQ21497492\",\"source\":\"clo_is\",\"event\":\"clo_edd_received_rop\",\"tid\":\"Rcslcml\",\"ts\":1720680315491}
    ```
  * 解析需求
      * 1：从content字段中提取出m_point后面的json对象，并拆为键值对。
      * 2：通过判断event的值给新字段newid、pid、pid_type、cid、cid_type设置值。
      * 3：再把从1中解析出来的时间字段ts的值设为当前的__time__
  * 加工语句
    ```python
    * | project content 
    | where regexp_like(content, '.*m_point\|.*') 
    | parse-regexp content, '.*m_point\|(.*)' as a 
    | parse-json a 
    | project-away content , a 
    | extend newid = if(event like 'clo_edd_received_rop', 'T989092', '') ,  pid = if(event like 'clo_edd_received_rop', 'clo_edd_received_rop', '') ,  pid_type = if(event like 'clo_edd_received_rop', 'clo_edd_received_rop', '') ,  cid = if(event like 'clo_edd_received_rop', 'clo_edd_received_rop', '') , cid_type = if(event like 'clo_edd_received_rop', 'clo_edd_received_rop', '') 
    |extend "__time__" = cast(ts as bigint)/1000
    ```
  * 对应结果
    ```
    cid:clo_edd_received_rop
    cid_type:clo_edd_received_rop
    event:clo_edd_received_rop
    extra:{"items":[{"path":"Vdsjbxk.Cbsj.EV.FPDD","id":17,"value":1}]}
    newid:T989092
    pid:clo_edd_received_rop
    pid_type:clo_edd_received_rop
    source:clo_is
    tid:Rcslcml
    ts:1720680315491
    vin:WQ21497492
    ```
## 场景二：从含有xml字符的字符串中解析出json对象，并二级展开。
  * 原始日志
    ```
    {"__log_order_key__":11,"traceId":"dnohdohwhwiqnd923010hem2e","duration":"342424","spanId":"cr334c44","parentSpanId":"0","startTime":"1713765089425444896","spanName":"/DSFEF/RulePort","refefd":"csai-uat","pid":"kru2w@ere","ip":"","kind":"1","hostname":"","statusCode":"0","statusMessage":"","traceState":"","attributes":"{\"serviceType\":\"unknown\",\"db.erere\":\"unknown\",\"pid\":\"e33feeeeeeeeef234423\",\"source\":\"ebpf\",\"clusterId\":\"h8fhih9h9h99eh8hief\",\"resp.header\":\"Content-Type: text/xml;charset=utf-8\\nDate: Mon, 22 Apr 2024 05:51:29 GMT\\nServer: Apache-Coyote/1.1\\n\",\"status.code\":\"200\",\"container.id\":\"93d02646a21289224e210abd12c3988660c2dfeea3a2151742014249a5d55844\",\"callType\":\"http_client\",\"source_ip\":\"172.22.7.179\",\"resp.body\":\"<?xml version=\\\"1.0\\\" ?><S:Tvelop xmlns:S=\\\"http://schemas.xml.org/soap/Tvelope/\\\"><S:Body><ns2:ddResponse xmlns:ns2=\\\"http://service.tt.sinosoft.com/\\\"><return>{&quot;applicationNum&quot;:&quot;232323232&quot;,&quot;businessModule&quot;:&quot;UW&quot;,&quot;isApproved&quot;:&quot;0&quot;,&quot;isTest&quot;:false,&quot;subSystem&quot;:&quot;CS&quot;,&quot;system&quot;:&quot;MICO&quot;,&quot;verifyResultList&quot;:[{&quot;flag&quot;:&quot;2&quot;,&quot;returnInfo&quot;:&quot;请确认是否继续。&quot;,&quot;ruleCategories&quot;:&quot;2&quot;,&quot;ruleName&quot;:&quot;CSUW0300001-双录质检结果校验&quot;}]}</return></ns2:ddResponse></S:Body></S:Tvelop>\",\"endpoint\":\"/CSRuleintface/RulePort\",\"cmonitor\":\"KSpanInfo\",\"addr_family\":\"0\",\"remote_ip\":\"10.9.1.23\",\"req.body\":\"<?xml version='1.0' encoding='UTF-8'?><S:Tvelop xmlns:S=\\\"http://schemas.xml.org/soap/Tvelop/\\\"><S:Body><ns2:fireRule xmlns:ns2=\\\"http://service.t't.sinosoft.com/\\\"><arg0>MICO</arg0><arg1>CS</arg1><arg2>UW</arg2><arg3>{\\\"csuw\\\":{\\\"applicationNum\\\":\\\"232323232\\\",\\\"policyID\\\":\\\"213u92heijodwdwq3e231\\\",\\\"policyNum\\\":\\\"0839820984004\\\",\\\"CSType\\\":\\\"108\\\",\\\"applicationDate\\\":\\\"2024-04-22\\\",\\\"systemDate\\\":\\\"2024-04-22\\\",\\\"submitChannel\\\":\\\"12\\\",\\\"CheckIdent\\\":\\\"2\\\",\\\"CSAcceptanceNum\\\":\\\"00002030087801029\\\",\\\"organCode\\\":\\\"80040204\\\",\\\"applicantList\\\":[{\\\"holderID\\\":\\\"\\\",\\\"applicantName\\\":\\\"胡凯强\\\",\\\"applyAge\\\":26,\\\"sex\\\":\\\"M\\\",\\\"birthDate\\\":\\\"1997-10-20\\\",\\\"IDCardType\\\":\\\"1\\\",\\\"cardID\\\":\\\"110106199710200614\\\",\\\"nationality\\\":\\\"37\\\",\\\"occupationCode\\\":\\\"J001001\\\",\\\"address\\\":\\\"\\\",\\\"telephone\\\":\\\"\\\",\\\"hasInform\\\":\\\"N\\\",\\\"customerInformList\\\":[{\\\"ordinalNum\\\":\\\"13\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"15.2\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.2\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.9\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"9\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.8\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.6\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"8\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"7\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.4\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"2\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.12\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.7\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.1\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.13\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.11\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"15.1\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"4\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"5\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"3\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"6\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"14\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.5\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"12\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.3\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.10\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"1\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"15.3\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"11\\\",\\\"hasInform\\\":\\\"2\\\"}]}],\\\"insurantList\\\":[{\\\"insurantID\\\":\\\"f65239503f52407e9806efb5d3b054f4\\\",\\\"insurantName\\\":\\\"行\\\",\\\"applyAge\\\":25,\\\"sex\\\":\\\"F\\\",\\\"birthDate\\\":\\\"1998-11-05\\\",\\\"IDCardType\\\":\\\"3\\\",\\\"cardID\\\":\\\"246558761420\\\",\\\"nationality\\\":\\\"1\\\",\\\"occupationCode\\\":\\\"J001001\\\",\\\"address\\\":\\\"\\\",\\\"telephone\\\":\\\"\\\",\\\"hasInform\\\":\\\"N\\\",\\\"weight\\\":50.0,\\\"height\\\":165.0,\\\"healthInformList\\\":[{\\\"hasSmoking\\\":\\\"N\\\",\\\"dailySmokAmount\\\":0.0,\\\"smokeYear\\\":0.0,\\\"hasDrinking\\\":\\\"N\\\",\\\"drinkType\\\":\\\"酒\\\",\\\"dailyDrinkAmount\\\":0.0,\\\"drinkYear\\\":0.0}],\\\"productList\\\":[{\\\"productCode\\\":\\\"10131011\\\",\\\"productID\\\":\\\"\\\",\\\"productName\\\":\\\"附加保险\\\",\\\"isMainRisk\\\":\\\"0\\\",\\\"amount\\\":5000.0,\\\"copies\\\":0},{\\\"productCode\\\":\\\"10132005\\\",\\\"productID\\\":\\\"\\\",\\\"productName\\\":\\\"附加医疗\\\",\\\"isMainRisk\\\":\\\"0\\\",\\\"amount\\\":1800.0,\\\"copies\\\":1}],\\\"beneficiaryList\\\":[{\\\"benefitID\\\":\\\"\\\",\\\"beneficiaryName\\\":\\\"\\\",\\\"applyAge\\\":0,\\\"sex\\\":\\\"\\\",\\\"birthDate\\\":\\\"9999-12-31\\\",\\\"IDCardType\\\":\\\"\\\",\\\"cardID\\\":\\\"\\\",\\\"nationality\\\":\\\"\\\",\\\"occupationCode\\\":\\\"\\\",\\\"address\\\":\\\"\\\",\\\"telephone\\\":\\\"\\\"}],\\\"customerInformList\\\":[{\\\"ordinalNum\\\":\\\"13\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"15.2\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.2\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.9\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"9\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.8\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.6\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"8\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"7\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.4\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"2\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.12\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.7\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.1\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.13\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.11\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"15.1\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"4\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"5\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"3\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"6\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"14\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.5\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"12\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.3\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"10.10\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"1\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"15.3\\\",\\\"hasInform\\\":\\\"2\\\"},{\\\"ordinalNum\\\":\\\"11\\\",\\\"hasInform\\\":\\\"2\\\"}]}],\\\"agentList\\\":[{\\\"agentCode\\\":\\\"100606285\\\",\\\"agentName\\\":\\\"肥大于一\\\",\\\"agentAge\\\":65,\\\"agentSex\\\":\\\"M\\\",\\\"agentBirth\\\":\\\"1959-01-01\\\",\\\"IDCardType\\\":\\\"1\\\",\\\"cardID\\\":\\\"370983195901019996\\\",\\\"agentChannel\\\":\\\"\\\",\\\"telephone\\\":\\\"\\\"}]}}</arg3><arg4>false</arg4></ns2:fireRule></S:Body></S:Tvelop>\",\"source_port\":\"49152\",\"cmonitor_name\":\"cmonitor-agent-9xmdd\",\"host\":\"172.22.7.179\",\"cmonitor_ip\":\"10.3.72.9\",\"net_ns\":\"32232223\",\"ali.trace.rpc\":\"/CSRuleintface/RulePort\",\"deployment\":\"cd-insurance\",\"app\":\"csai--uat\",\"k8s.pod.ip\":\"172.22.7.179\",\"workloadKind\":\"deployment\",\"component.name\":\"http\",\"rpc\":\"/CSRuleintface/RulePort\",\"remote_port\":\"8010\",\"workloadName\":\"cd-insurance\",\"process_pid\":\"364469\",\"tsid\":\"25887099391057281\",\"version\":\"HTTP/1.1\",\"pod_name\":\"cd-insurance-787b759797-lchbk\",\"http.status_code\":\"200\",\"req.header\":\"Content-Type: text/xml; charset=utf-8\\nSoapaction: \\\"\\\"\\nUser-Agent: JAX-WS RI 2.2.9-b130926.1035 svn-revision#jd2939hondohd9y9hd2313\\nConnection: keep-alive\\nContent-Length: 4212\\nAccept: text/xml, multipart/related\\n\",\"rootIp\":\"172.22.7.179\",\"peer_k8s.pod.ip\":\"10.9.1.23\",\"destId\":\"10.9.1.23\",\"slow\":\"1\",\"service\":\"csai-29jodejnkn-insurance-uat\",\"ali.trace.flag\":\"x-trace\",\"namespace\":\"csai-ts\",\"ali.trace.wmjjelwl\":\"98\",\"serverIp\":\"172.22.7.179\",\"fd\":\"45\",\"statusCode\":\"200\",\"rpcType\":\"25\"}","resources":"{\"service.name\":\"cd-insurance\"}","__pack_meta__":"1|jiewojoj==|29|7","__topic__":"","__source__":"172.17.99.3","__tag__:__pack_id__":"9034804828-53FA94","__time__":"1713765092"}
    ```
  * 解析需求
      * 1：从attributes字段中提取出req.body的值。
      * 2：再从req.body中取出xml字符串中包裹的json字符串
      * 3：再把从2中解析出来的json字符串二级展开
  * 加工语句
    ```python
    * | project attributes 
    | extend a = json_extract(attributes, '$["req.body"]') 
    | extend b=regexp_extract(try_cast(a as varchar), '<arg3>(.*)<\/arg3>',1) 
    | project b|parse-json -path='$.csuw' b 
    | project-away b
    ```
  * 对应结果
    ```
    CSAcceptanceNum:00002030087801029
    CSType:108
    CheckIdent:2
    agentList:[{"telephone":"","agentChannel":"","cardID":"370983195901019996","IDCardType":"1","agentBirth":"1959-01-01","agentSex":"M","agentAge":65,"agentName":"肥大于一","agentCode":"100606285"}]
    applicantList:[{"customerInformList":[{"hasInform":"2","ordinalNum":"13"},{"hasInform":"2","ordinalNum":"15.2"},{"hasInform":"2","ordinalNum":"10.2"},{"hasInform":"2","ordinalNum":"10.9"},{"hasInform":"2","ordinalNum":"9"},{"hasInform":"2","ordinalNum":"10.8"},{"hasInform":"2","ordinalNum":"10.6"},{"hasInform":"2","ordinalNum":"8"},{"hasInform":"2","ordinalNum":"7"},{"hasInform":"2","ordinalNum":"10.4"},{"hasInform":"2","ordinalNum":"2"},{"hasInform":"2","ordinalNum":"10.12"},{"hasInform":"2","ordinalNum":"10.7"},{"hasInform":"2","ordinalNum":"10.1"},{"hasInform":"2","ordinalNum":"10.13"},{"hasInform":"2","ordinalNum":"10.11"},{"hasInform":"2","ordinalNum":"15.1"},{"hasInform":"2","ordinalNum":"4"},{"hasInform":"2","ordinalNum":"5"},{"hasInform":"2","ordinalNum":"3"},{"hasInform":"2","ordinalNum":"6"},{"hasInform":"2","ordinalNum":"14"},{"hasInform":"2","ordinalNum":"10.5"},{"hasInform":"2","ordinalNum":"12"},{"hasInform":"2","ordinalNum":"10.3"},{"hasInform":"2","ordinalNum":"10.10"},{"hasInform":"2","ordinalNum":"1"},{"hasInform":"2","ordinalNum":"15.3"},{"hasInform":"2","ordinalNum":"11"}],"hasInform":"N","telephone":"","address":"","occupationCode":"J001001","nationality":"37","cardID":"110106199710200614","IDCardType":"1","birthDate":"1997-10-20","sex":"M","applyAge":26,"applicantName":"胡凯强","holderID":""}]收起
    applicationDate:2024-04-22
    applicationNum:232323232
    insurantList:[{"beneficiaryList":[{"telephone":"","address":"","occupationCode":"","nationality":"","cardID":"","IDCardType":"","birthDate":"9999-12-31","sex":"","applyAge":0,"beneficiaryName":"","benefitID":""}],"productList":[{"copies":0,"amount":5000,"isMainRisk":"0","productName":"附加保险","productID":"","productCode":"10131011"},{"copies":1,"amount":1800,"isMainRisk":"0","productName":"附加医疗","productID":"","productCode":"10132005"}],"healthInformList":[{"drinkYear":0,"dailyDrinkAmount":0,"drinkType":"酒","hasDrinking":"N","smokeYear":0,"dailySmokAmount":0,"hasSmoking":"N"}],"height":165,"hasInform":"N","telephone":"","address":"","occupationCode":"J001001","nationality":"1","IDCardType":"3","birthDate":"1998-11-05","insurantID":"f65239503f52407e9806efb5d3b054f4","customerInformList":[{"hasInform":"2","ordinalNum":"13"},{"hasInform":"2","ordinalNum":"15.2"},{"hasInform":"2","ordinalNum":"10.2"},{"hasInform":"2","ordinalNum":"10.9"},{"hasInform":"2","ordinalNum":"9"},{"hasInform":"2","ordinalNum":"10.8"},{"hasInform":"2","ordinalNum":"10.6"},{"hasInform":"2","ordinalNum":"8"},{"hasInform":"2","ordinalNum":"7"},{"hasInform":"2","ordinalNum":"10.4"},{"hasInform":"2","ordinalNum":"2"},{"hasInform":"2","ordinalNum":"10.12"},{"hasInform":"2","ordinalNum":"10.7"},{"hasInform":"2","ordinalNum":"10.1"},{"hasInform":"2","ordinalNum":"10.13"},{"hasInform":"2","ordinalNum":"10.11"},{"hasInform":"2","ordinalNum":"15.1"},{"hasInform":"2","ordinalNum":"4"},{"hasInform":"2","ordinalNum":"5"},{"hasInform":"2","ordinalNum":"3"},{"hasInform":"2","ordinalNum":"6"},{"hasInform":"2","ordinalNum":"14"},{"hasInform":"2","ordinalNum":"10.5"},{"hasInform":"2","ordinalNum":"12"},{"hasInform":"2","ordinalNum":"10.3"},{"hasInform":"2","ordinalNum":"10.10"},{"hasInform":"2","ordinalNum":"1"},{"hasInform":"2","ordinalNum":"15.3"},{"hasInform":"2","ordinalNum":"11"}],"weight":50,"cardID":"246558761420","sex":"F","applyAge":25,"insurantName":"行"}]收起
    organCode:80040204
    policyID:213u92heijodwdwq3e231
    policyNum:0839820984004
    submitChannel:12
    systemDate:2024-04-22
    ```
## 场景三：从json字符串过滤日志并提取出指定字段
* 原始日志
  ```
  {"__LEVEL__":"INFO","__THREAD__":"73539","__FILE__":"nas/test/tasks/tt_task.cpp","__LINE__":"424","Vers":"100","VolumeId":"djkaywiqhiwql","Method":"HPSFRename","TaskStatus":"0","NasStatus":"0","Operation":"rename","Totallatency":"1412","TimePoints":"[ phase_receive:9 alloc_qos_token:2 qos_queue:1 taa_proc:21 storage_schedule:5 storage_proc:19090 taa_post:46 done_schedule:5 taaio_done:4]","StorageSchedule":"5","StorageProc":"1317","ExpandMsg":"(7:1(us),)","TraceId":"","RequestId":"903J3JO3J","SourceIp":"10.10.10.10","SessionId":"200_3298309203802","Priority":"0","QosTenant":"QosTenant(idx:0,gen:3)","microtime":"1731392376869111","WorkerIdx":"7","QosDelay":"2","ChannelType":"TCP","client_unique":"930290392","client_pid":"2779589","client_uid":"0","client_gid":"0","client_pidname":"MockPidName","client_hostname":"92EH92EIO0I2UO2","client_mountname":"82y9he92y92h2ejo20232","client_localmount":"/var/run/aa/bindroot/testroot","client_arrive_time":"1731392376867903","Name":"/var/run/aa/bindroot/bindroot-604c/motr.csv.temp","DstName":"mots.csv","FilePath":"","DstFilePath":"","DstDeleted":"0","ResIno":"930230283","User":"0937089203013","ConnId":"48370","SourcePort":"9058","Vip":"10.10.10.10","TunnelId":"9988","microtime_0":"1731392376869109","__pack_meta__":"83|38H2OIH2HE2DEU232YW==|363|287","__topic__":"","__source__":"16.72.37.72","__tag__:__hostname__":"c96l020901.cloud.na322","__tag__:__path__":"/apsara/FileServer/log/test_access.LOG","__tag__:__user_defined_id__":"cn-wulanchabu-c-tenant-5","__tag__:__pack_id__":"5D389283922966585F-0","__tag__:__receive_time__":"1731392378","__time__":"1731392376"}
  ```
* 解析需求
  * 1：保留Operation字段值为remove或rename的日志，不符合的丢弃。
  * 2：只保留字段Name, VolumeId, Operation并且分别重命名为fullPath、fsName、event，并把__tag__:__hostname__字段中的第一位id提取出来设为host的字段值。
  * 3：新增字段module，值为fileserver。
  * 4：将__time__转成时间对象赋值给新字段time。
  * 5：从fullPath的值中提取出文件名，赋值给subPath字段。
* 加工语句
  ```python
  * | where Operation = 'remove' or Operation = 'rename' 
  | project Name, VolumeId, "__tag__:__hostname__", __time__, Operation 
  | project-rename fullPath=Name, fsName=VolumeId, host="__tag__:__hostname__", event=Operation 
  | extend host = split_part(host, '.', 1),module = 'fileserver'
  | extend fullPath = regexp_replace(fullPath,'(^.*)([\/]+$)','\1')
  | parse-regexp fullPath, '([^\\/]+$)' as subPath
  | extend time=from_unixtime(cast(__time__ as DOUBLE) + 28800)
  ```
* 加工结果
  ```
  event:rename
  fsName:djkaywiqhiwql
  fullPath:/var/run/aa/bindroot/bindroot-604c/motr.csv.temp
  host:c96l020901
  module:fileserver
  subPath:motr.csv.temp
  time:2024-11-12 14:19:36.000
  ```
## 场景四：根据条件过滤日志并提取出指定字段
* 原始日志
  ```
  {"minReadOffset":"","minWriteOffset":"","clientUserId":"0","maxWriteOffset":"","cookie":"1","fileSetID":"2","linkCount":"1","openFlags":"0","ctime":"2024-03-13_16:44:58.423+0800","clientGroupId":"0","accessMode":"","uyt":"","mask":"0x200","nfsIp":"","bytesRead":"","maxReadOffset":"","inode":"892323","fileSize":"8187382","poolName":"system","processId":"56271","bytesWritten":"","xattrs":"","TE_JSON":"0.0.3","clusterName":"cpfe-test_test-2.cn-wulanchabu.cpfe.aliyuncs.com","fsName":"39434034nwkeowuoup","ownerUserId":"0","atime":"2024-03-13_16:44:58.073+0800","subEvent":"NONE","wd":"1","event":"IN_DELETE","eventTime":"2024-03-13_16:44:58.800+0800","permissions":"200100600","path":"/cpfe/370l64h5u6zjy8buacw/root@10.30.42.19/1710249292/.efc_2251799814382581_2984197703087879309_1710319498445559_file1nas_file_0.txt/","nodeName":"x77g11119_ext.cloud.na132","ownerGroupId":"0","mtime":"2024-03-13_16:44:58.423+0800","__pack_meta__":"0|EJIWOUE02U29HEE8220YOHDW==|1|0","__topic__":"","__source__":"16.40.20.10","__tag__:__receive_time__":"1710319498","__time__":"1710319498","__time_ns_part__":"800"}
 
  ```
* 解析需求
  * 1：保留event字段值不含IN_MOVED_TO且path字段值不含.mmSharedTmpDir得日志，其余的丢弃。
  * 2：只保留日志中的字段nodeName、processId、 path、inode、fsName、eventTime、event，并将字段eventTime、path分别重命名为time、fullPath。
  * 3：从nodeName中提取出前缀的id部分，赋给字段host，nodeName字段丢弃；去除fullPath值末尾的斜杠并提取出文件路径，赋值给subPath字段。
  * 4：新增字段module，值为cpfs。
  * 5：把带时区的time字段转成不带时区的时间对象，并赋值当前的__time__
* 加工语句
  ```python
  * | where event not like '%IN_MOVED_TO%' and path not like '%.mmSharedTmpDir%'  
  | project nodeName, processId, path, inode, fsName, eventTime, event
  | extend nodeName=replace(nodeName, '_ext', '')
  | project-rename host=nodeName, time=eventTime, fullPath=path
  | extend host = split_part(host, '.', 1),module ='cpfs',fullPath = regexp_replace(fullPath,'(^.*)([\/]+$)','\1'),time=replace(replace(time, '+0800', ''), '_', ' ')
  | parse-regexp fullPath, '([^\\/]+$)' as subPath
  | extend __time__ = cast(to_unixtime(cast(time as TIMESTAMP)) as bigint)- 28800
  ```
* 加工结果
  ```
  event:IN_DELETE
  fsName:39434034nwkeowuoup
  fullPath:/cpfe/370l64h5u6zjy8buacw/root@10.30.42.19/1710249292/.efc_2251799814382581_2984197703087879309_1710319498445559_file1nas_file_0.txt
  host:x77g11119
  inode:892323
  module:cpfs
  processId:56271
  subPath:.efc_2251799814382581_2984197703087879309_1710319498445559_file1nas_file_0.txt
  time:2024-03-13 16:44:58.800
  __time__:1710319499
  ```
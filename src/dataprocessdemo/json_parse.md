# 复杂JSON数据加工 

本文档主要为您介绍如何使用日志服务数据加工功能对复杂的JSON数据进行加工。

## 多子键为数组的复杂JSON数据加工 

程序构建的日志会以一种统计性质的JSON格式写入，通常包含一个基础信息以及多个子健为数组的数据形式。例如一个服务器每隔1分钟写入一条日志，包含当前信息状态，以及相关服务器和客户端节点的统计状态信息。


* 日志样例

      __source__:  1.2.3.4
      __topic__:  
      content:{
           "service": "search_service",
           "overal_status": "yellow",
           "servers": [
               {
                   "host": "1.2.3.4",
                   "status": "green"
               },
               {
                   "host": "1.2.3.5",
                   "status": "green"
               }
           ],
           "clients": [
               {
                   "host": "1.2.3.6",
                   "status": "green"
               },
               {
                   "host": "1.2.3.7",
                   "status": "red"
               }
           ]
      }

   

* 加工需求

  1. 对原始日志进行`topic`分裂，分别是`overall_type`、`client_status`、`server_status`。

  2. 对不同的`topic`保存不同的信息。

     * `overall_type`：保留server、client数量、overal_status颜色和service信息。

     * `client_status`：保留host地址、status状态和service信息。

     * `server_status`：保留host地址、status状态和service信息。

     

  

* 期望结果

      __source__:  1.2.3.4
      __topic__:  overall_type
      client_count:  2
      overal_status:  yellow
      server_count:  2
      service:  search_service
      __source__:  1.2.3.4
      __topic__:  client_status
      host:  1.2.3.7
      status:  red
      service:  search_service
      __source__:  1.2.3.4
      __topic__:  client_status
      host:  1.2.3.6
      status:  green
      service:  search_service
      __source__:  1.2.3.4
      __topic__:  server_status
      host:  1.2.3.4
      status:  green
      service:  search_service
      __source__:  1.2.3.4
      __topic__:  server_status
      host:  1.2.3.5
      status:  green
      service:  search_service

   

* 解决方案

  1. 将一条日志拆分成三条日志，给主题赋予三个不同值再进行分裂，经过分裂后会分成除`topic`不同，其他信息相同的三条日志。

          e_set("__topic__", "server_status,client_status,overall_type")
          e_split("__topic__")

       处理后日志格式如下：

          __source__:  1.2.3.4
          __topic__:  server_status         // 另外2条是client_status和overall_type, 其他一样
          content:  {
              ...如上...
          }

       

  2. 基于`content`的JSON内容在第一层展开，并删除`content`字段。

          e_json('content',depth=1)
          e_drop_fields("content")

       处理后的日志格式如下：

          __source__:  1.2.3.4
          __topic__:  overall_type              // 另外2条是client_status和overall_type, 其他一样
          clients:  [{"host": "1.2.3.6", "status": "green"}, {"host": "1.2.3.7", "status": "red"}]
          overal_status:  yellow
          servers:  [{"host": "1.2.3.4", "status": "green"}, {"host": "1.2.3.5", "status": "green"}]
          service:  search_service

       

  3. 对主题是`overall_type`的日志，统计`client_count`和`server_count`。

          e_if(e_search("__topic__==overall_type"), 
               e_compose(
                  e_set("client_count", json_select(v("clients"), "length([*])", default=0)), 
                  e_set("server_count", json_select(v("servers"), "length([*])", default=0))
            ))

       处理后的日志为：

          __topic__:  overall_type
          server_count:  2
          client_count:  2

       

  4. 丢弃相关字段：

          e_if(e_search("__topic__==overall_type"), e_drop_fields("clients", "servers"))

       

  5. 对主题是`server_status`的日志，进行进一步分裂。

          e_if(e_search("__topic__==server_status"), 
               e_compose(
                  e_split("servers"), 
                  e_json("servers", depth=1)
            ))

       处理后的日志为如下两条：

          __topic__:  server_status
          servers:  {"host": "1.2.3.4", "status": "green"}
          host: 1.2.3.4
          status: green

      


          __topic__:  server_status
          servers:  {"host": "1.2.3.5", "status": "green"}
          host: 1.2.3.5
          status: green

       

  6. 保留相关字段：

          e_if(e_search("__topic__==overall_type"), e_drop_fields("servers"))

       

  7. 对主题是`client_status`的日志进行进一步分裂，再删除多余字段。

          e_if(e_search("__topic__==client_status"), 
               e_compose(
                  e_split("clients"), 
                  e_json("clients", depth=1),
                  e_drop_fields("clients")
            ))

       处理后的日志为如下两个日志：

          __topic__:  client_status
          host: 1.2.3.6
          status: green

      


          __topic__:  clients
          host: 1.2.3.7
          status: red

       

  8. 综上LOG DSL规则：

          # 总体分裂
          e_set("__topic__", "server_status,client_status,overall_type")
          e_split("__topic__")
          e_json('content',depth=1)
          e_drop_fields("content")
          # 处理overall_type日志
          e_if(e_search("__topic__==overall_type"), 
               e_compose(
                  e_set("client_count" json_select(v("clients"), "length([*])", default=0)), 
                  e_set("server_count" json_select(v("servers"), "length([*])", default=0))
            ))
          # 处理server_status日志
          e_if(e_search("__topic__==server_status"), 
               e_compose(
                  e_split("servers"), 
                  e_json("servers", depth=1)
            ))
          e_if(e_search("__topic__==overall_type"), e_drop_fields("servers"))
          # 处理client_status日志
          e_if(e_search("__topic__==client_status"), 
               e_compose(
                  e_split("clients"), 
                  e_json("clients", depth=1),
                  e_drop_fields("clients")
            ))
         

       

  




方案优化

上述方案对`content.servers`和`content.servers`为空时的处理有一些问题。假设原始日志是：


    __source__:  1.2.3.4
    __topic__:  
    content:{
                "service": "search_service",
                "overal_status": "yellow",
                "servers": [ ],
                "clients": [ ]
    }
    

 按照上述方案分裂为三条日志，其中主题为`client_status`和`server_status`的日志内容是空的。

    __source__:  1.2.3.4
    __topic__:  overall_type
    client_count:  0
    overal_status:  yellow
    server_count:  0
    service:  search_service
    __source__:  1.2.3.4
    __topic__:  client_status
    service:  search_service
    __source__:  1.2.3.4
    __topic__:  server_status
    host:  1.2.3.4
    status:  green
    service:  search_service
    



* 方案1 可以在初始分裂后，处理`server_status`和`client_status`日志前分别判断并丢弃空的相关事件。


      # 处理server_status: 空的丢弃（非空保留）
      e_keep(op_and(e_search("__topic__==server_status"), json_select(v("servers"), "length([*])")))
      # 处理client_status: 空的丢弃（非空保留）
      e_keep(op_and(e_search("__topic__==client_status"), json_select(v("clients"), "length([*])")))
      

  

  综上LOG DSL规则是：


      # 总体分裂
      e_set("__topic__", "server_status,client_status,overall_type")
      e_split("__topic__")
      e_json('content',depth=1)
      e_drop_fields("content")
      # 处理overall_type日志
      e_if(e_search("__topic__==overall_type"), 
           e_compose(
              e_set("client_count" json_select(v("clients"), "length([*])", default=0)), 
              e_set("server_count" json_select(v("servers"), "length([*])", default=0))
        ))
      # 新增: 预处理server_status: 空的丢弃（非空保留）
      e_keep(op_and(e_search("__topic__==server_status"), json_select(v("servers"), "length([*])")))
      # 处理server_status日志
      e_if(e_search("__topic__==server_status"), 
           e_compose(
              e_split("servers"), 
              e_json("servers", depth=1)
        ))
      e_if(e_search("__topic__==overall_type"), e_drop_fields("servers"))
      # 新增: 预处理client_status: 空的丢弃（非空保留）
      e_keep(op_and(e_search("__topic__==client_status"), json_select(v("clients"), "length([*])")))
      # 处理client_status日志
      e_if(e_search("__topic__==client_status"), 
           e_compose(
              e_split("clients"), 
              e_json("clients", depth=1),
              e_drop_fields("clients")
        ))
      

  

  

* 方案2 在初始分裂时进行判断，如果对应数据为空就进行分裂。


      # 初始主题
      e_set("__topic__", "server_status")
      # 如果content.servers非空, 则从server_status分裂出1条日志
      e_if(json_select(v("content"), "length(servers[*])"),
         e_compse(
            e_set("__topic__", "server_status,overall_type"),
            e_split("__topic__")
         ))
      # 如果content.clients非空, 则从overall_type再分裂出1条日志
      e_if(op_and(e_search("__topic__==overall_type"), json_select(v("content"), "length(clients[*])")),
         e_compse(
            e_set("__topic__", "client_status,overall_type"),
            e_split("__topic__")
         ))
      

  

  综上LOG DSL规则是：


      # 总体分裂
      e_set("__topic__", "server_status")
      # 如果content.servers非空, 则从server_status分裂出1条日志
      e_if(json_select(v("content"), "length(servers[*])"),
         e_compse(
            e_set("__topic__", "server_status,overall_type"),
            e_split("__topic__")
         ))
      # 如果content.clients非空, 则从server_status分裂出1条日志
      e_if(op_and(e_search("__topic__==overall_type"), json_select(v("content"), "length(clients[*])")),
         e_compse(
            e_set("__topic__", "client_status,overall_type"),
            e_split("__topic__")
         ))
      # 处理overall_type日志
      e_if(e_search("__topic__==overall_type"), 
           e_compose(
              e_set("client_count" json_select(v("clients"), "length([*])", default=0)), 
              e_set("server_count" json_select(v("servers"), "length([*])", default=0))
        ))
      # 处理server_status日志
      e_if(e_search("__topic__==server_status"), 
           e_compose(
              e_split("servers"), 
              e_json("servers", depth=1)
        ))
      e_if(e_search("__topic__==overall_type"), e_drop_fields("servers"))
      # 处理client_status日志
      e_if(e_search("__topic__==client_status"), 
           e_compose(
              e_split("clients"), 
              e_json("clients", depth=1),
              e_drop_fields("clients")
        ))



方案对比


* 方案1在分裂出日志后再删除为空的日志，逻辑上有些多余，但规则简单易维护。默认推荐该方案。

* 方案2会在分裂前进行判断，处理效率会高一些，但规则略微冗余，仅在特定场景例如初始分裂可能导致大量额外事件产生时推荐。


## 多层数组对象嵌套的复杂JSON数据加工 

以一个复杂的保护多层数组嵌套的对象为示例，将`users`下的每个对象中的`login_histories`的每个登录信息都拆成一个登录事件。


* 原始日志

      __source__:  1.2.3.4
      __topic__:  
      content:{
        "users": [
          {
              "name": "user1",
              "login_historis": [
                {
                  "date": "2019-10-10 0:0:0",
                  "login_ip": "1.1.1.1"
                },
                {
                  "date": "2019-10-10 1:0:0",
                  "login_ip": "1.1.1.1"
                },
            {
            ...更多登录信息...
            }
              ]
          },
          {
              "name": "user2",
              "login_historis": [
                {
                  "date": "2019-10-11 0:0:0",
                  "login_ip": "1.1.1.2"
                },
                {
                  "date": "2019-10-11 1:0:0",
                  "login_ip": "1.1.1.3"
                },
            {
            ...更多登录信息...
            }     
              ]
          },
        {
          ....更多user....
        }
        ]
      }
      

   

* 期望分裂出的日志

      __source__:  1.2.3.4
      name:  user1
      date:  2019-10-11 1:0:0
      login_ip:  1.1.1.1
      __source__: 1.2.3.4
      name:  user1
      date:  2019-10-11 0:0:0
      login_ip:  1.1.1.1
      __source__:  1.2.3.4
      name:  user2
      date:  2019-10-11 0:0:0
      login_ip:  1.1.1.2
      __source__: 1.2.3.4
      name:  user2
      date:  2019-10-11 1:0:0
      login_ip:  1.1.1.3  
      ....更多日志....
      

   

* 解决方案

  1. 对`content`中的`users`进行分裂和展开操作。

          e_split("content", jmes='users[*]', output='item')
          e_json("item",depth=1)
         

       处理后返回的日志：

          __source__:  1.2.3.4
          __topic__:  
          content:{...如前...}
          item:  {"name": "user1", "login_histories": [{"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}, {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}]}
          login_histories:  [{"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}, {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}]
          name:  user1
          __source__:  1.2.3.4
          __topic__:  
          content:{...如前...}
          item:  {"name": "user2", "login_histories": [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]}
          login_histories:  [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]
          name:  user2
         

       

  2. 对`login_histories`先分裂再展开。

          e_split("login_histories")
          e_json("login_histories", depth=1)
         

       处理后返回的日志：

          __source__:  1.2.3.4
          __topic__: 
          content: {...如前...}
          date:  2019-10-11 0:0:0
          item:  {"name": "user2", "login_histories": [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]}
          login_histories:  {"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}
          login_ip:  1.1.1.2
          name:  user2
          __source__:  1.2.3.4
          __topic__: 
          content: {...如前...}
          date:  2019-10-11 1:0:0
          item:  {"name": "user2", "login_histories": [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]}
          login_histories:  {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}
          login_ip:  1.1.1.3
          name:  user2
          __source__: 1.2.3.4
          __topic__:  
          content: {...如前...}
          date:  2019-10-10 1:0:0
          item:  {"name": "user1", "login_histories": [{"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}, {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}]}
          login_histories:  {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}
          login_ip:  1.1.1.1
          name:  user1
          __source__: 1.2.3.4
          __topic__:  
          content: {...如前...}
          date:  2019-10-10 0:0:0
          item:  {"name": "user1", "login_histories": [{"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}, {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}]}
          login_histories:  {"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}
          login_ip:  1.1.1.1
          name:  user1
         

       

  3. 删除无关字段。

          e_drop_fields("content", "item", "login_histories")
         

       处理后返回的日志：

          __source__: 1.2.3.4
          __topic__:
          name:  user1
          date:  2019-10-11 1:0:0
          login_ip:  1.1.1.1
          __source__:  1.2.3.4
          __topic__:
          name:  user1
          date:  2019-10-11 0:0:0
          login_ip:  1.1.1.1
          __source__:  1.2.3.4
          __topic__:
          name:  user2
          date:  2019-10-11 0:0:0
          login_ip:  1.1.1.2
          __source__: 1.2.3.4
          __topic__:
          name:  user2
          date:  2019-10-11 1:0:0
          login_ip:  1.1.1.3
         

       

  4. 综上LOG DSL规则可以如以下形式：

          e_split("content", jmes='users[*]', output='item')
          e_json("item",depth=1)
          e_split("login_histories")
          e_json("login_histories", depth=1)
          e_drop_fields("content", "item", "login_histories")
         

       

  


 总结：针对以上类似的需求，首先进行分裂，然后再做展开操作，最后删除无关信息。


# Transform complex JSON data

This topic describes how to use the data transformation feature of Simple Log Service to transform complex JSON data.

## Transform complex JSON data with multiple subkeys each of which is an array

Program-built logs are written in a statistical JSON format, usually containing basic information and multiple subkeys each of which is an array.For example, a server writes a log at an interval of 1 minute. The log contains the data information status and the statistical status of servers and clients generating logs.

- Sample log

  ```python
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
  ```

- Data transformation requirements

  1. Split the raw log by `topic`, including `overall_type`、`client_status`、`server_status`。

  2. Store different information in each `topic` as follows:

     - `overall_type`：stores the server count, client count, overall status (color), and service information.

     - `client_status`：stores the server count, client count, overall status (color), and service information.
     - `server_status`：stores the host IP address, status, and service information.

- Expected result

  ```
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
  ```

- Solution

  1. Split the raw log into three logs and then further split the logs by topic. After the splitting, the three logs have the same information except for the `topic` field.

     ```
     e_set(
        "__topic__",
        "server_status,client_status,overall_type"
     )
     e_split("__topic__")
     ```

     The log after processing is as follows:

     ```
     __source__:  1.2.3.4
     __topic__:  server_status
     content:  {
        ...
     }
     ```

  2. Expand the JSON data in the `content` field at the first layer and delete the `content` field.

     ```
     e_json('content',depth=1)
     e_drop_fields("content")
     ```

  The log after processing is as follows:

  ```
  __source__:  1.2.3.4
  __topic__:  overall_type
  clients:  [{"host": "1.2.3.6", "status": "green"}, {"host": "1.2.3.7", "status": "red"}]
  overal_status:  yellow
  servers:  [{"host": "1.2.3.4", "status": "green"}, {"host": "1.2.3.5", "status": "green"}]
  service:  search_service
  ```

  3. For the log with the topic `overall_type`, compute the values for `client_count` and `server_count`.

     ```
     e_if(
        e_search("__topic__==overall_type"),
        e_compose(
           e_set(
              "client_count",
              json_select(v("clients"), "length([*])", default=0)
           ),
           e_set(
              "server_count",
              json_select(v("servers"), "length([*])", default=0)
           )
        )
     )

     The log after processing is as follows:

     __topic__:  overall_type
     server_count:  2
     client_count:  2
     ```

  4. Delete the clients and servers fields.

     ```
     e_if(
        e_search("__topic__==overall_type"),
        e_drop_fields("clients", "servers")
     )
     ```

  5. Further split the log with the topic `server_status`.

     ```
     e_if(
        e_search("__topic__==server_status"),
        e_compose(
           e_split("servers"),
           e_json("servers", depth=1)
        )
     )
     ```

     The log after processing is as follows:

     ```
     __topic__:  server_status
     servers:  {"host": "1.2.3.4", "status": "green"}
     host: 1.2.3.4
     status: green

     __topic__:  server_status
     servers:  {"host": "1.2.3.5", "status": "green"}
     host: 1.2.3.5
     status: green
     ```

  6. Delete the servers field.

     ```
     e_if(
        e_search("__topic__==overall_type"),
        e_drop_fields("servers")
     )
     ```

  7. Further split the log with the topic `client_status` and delete the clients field.

     ```
     e_if(
        e_search("__topic__==client_status"),
        e_compose(
           e_split("clients"),
           e_json("clients", depth=1),
           e_drop_fields("clients")
        )
     )
     ```

     The log after processing is as follows:

     ```
     __topic__:  client_status
     host: 1.2.3.6
     status: green

     __topic__:  clients
     host: 1.2.3.7
     status: red
     ```

  8. use the following LOG domain-specific language (DSL) rules:

  ```
  e_set("__topic__", "server_status,client_status,overall_type")
  e_split("__topic__")
  e_json('content',depth=1)
  e_drop_fields("content")
  e_if(e_search("__topic__==overall_type"),
     e_compose(
        e_set("client_count",
           json_select(v("clients"), "length([*])", default=0)
        ),
        e_set("server_count",
           json_select(v("servers"), "length([*])", default=0)
        )
     )
  )
  e_if(
     e_search("__topic__==server_status"),
     e_compose(
        e_split("servers"),
        e_json("servers", depth=1)
  ))
  e_if(
     e_search("__topic__==overall_type"),
     e_drop_fields("servers")
  )
  e_if(e_search("__topic__==client_status"),
     e_compose(
        e_split("clients"),
        e_json("clients", depth=1),
        e_drop_fields("clients")
     )
  )
  ```

Solution optimization

The preceding solution does not work well if the `content.clients` or `content.servers` field is empty.

```
__source__:  1.2.3.4
__topic__:
content:{
      "service": "search_service",
      "overal_status": "yellow",
      "servers": [ ],
      "clients": [ ]
}
```

If you split this raw log into three logs by using the preceding solution, the logs with the topics `client_status` and `server_status` are empty.

```
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
```

- Optimized solution 1. Check whether the logs with the topics `server_status` and `client_status` are empty after the raw log is split. If so, discard the logs.

  ```

  e_keep(
     op_and(
        e_search("__topic__==server_status"),
        json_select(v("servers"), "length([*])")
     )
  )

  e_keep(
     op_and(
        e_search("__topic__==client_status"),
        json_select(v("clients"), "length([*])")
     )
  )
  ```

use the following LOG DSL rules:

```
e_set("__topic__", "server_status,client_status,overall_type")
e_split("__topic__")
e_json('content',depth=1)
e_drop_fields("content")
e_if(e_search("__topic__==overall_type"),
   e_compose(
      e_set(
         "client_count",
         json_select(v("clients"),
            "length([*])", default=0
         )
      ),
      e_set(
         "server_count",
         json_select(v("servers"),
            "length([*])", default=0
         )
      )
   )
)
# Check whether the log with the topic server_status is empty. If so, discard it. If not, retain it.
e_keep(
   op_and(
      e_search("__topic__==server_status"),
      json_select(v("servers"), "length([*])")
   )
)

e_if(
   e_search("__topic__==server_status"),
   e_compose(
      e_split("servers"),
      e_json("servers", depth=1)
   )
)
e_if(
   e_search("__topic__==overall_type"),
   e_drop_fields("servers")
)
# Check whether the log with the topic server_status is empty. If so, discard it. If not, retain it.
e_keep(
   op_and(
      e_search("__topic__==client_status"),
      json_select(v("clients"), "length([*])")
   )
)

e_if(
   e_search("__topic__==client_status"),
   e_compose(
      e_split("clients"),
      e_json("clients", depth=1),
      e_drop_fields("clients")
   )
)
```

- Optimized solution 2. Check whether a field is empty before splitting the raw log. If the field is not empty, split the raw log based on the field.

  ```

  e_set("__topic__", "server_status")

  e_if(
     json_select(v("content"), "length(servers[*])"),
     e_compse(
        e_set("__topic__", "server_status,overall_type"),
        e_split("__topic__")
     )
  )

  e_if(
     op_and(
        e_search("__topic__==overall_type"),
        json_select(v("content"), "length(clients[*])")
     ),
     e_compse(
        e_set("__topic__", "client_status,overall_type"),
        e_split("__topic__")
     )
  )
  ```

use the following LOG DSL rules:

```
e_set("__topic__", "server_status")
# 如果content.servers非空, 则从server_status分裂出1条日志
e_if(
   json_select(v("content"), "length(servers[*])"),
   e_compse(
      e_set("__topic__", "server_status,overall_type"),
      e_split("__topic__")
   )
)

e_if(
   op_and(
      e_search("__topic__==overall_type"),
      json_select(v("content"), "length(clients[*])")
   ),
   e_compse(
      e_set("__topic__", "client_status,overall_type"),
      e_split("__topic__")
   )
)

e_if(
   e_search("__topic__==overall_type"),
   e_compose(
      e_set(
         "client_count",
         json_select(v("clients"), "length([*])", default=0)
      ),
      e_set(
         "server_count",
         json_select(v("servers"), "length([*])", default=0)
      )
   )
)

e_if(
   e_search("__topic__==server_status"),
   e_compose(
      e_split("servers"),
      e_json("servers", depth=1)
   )
)
e_if(
   e_search("__topic__==overall_type"),
   e_drop_fields("servers")
)

e_if(
   e_search("__topic__==client_status"),
   e_compose(
      e_split("clients"),
      e_json("clients", depth=1),
      e_drop_fields("clients")
   )
)
```

Solution comparison

- Solution 1 is redundant in logic because it deletes empty logs after obtaining them from the raw log. However, the rules are simple and easy to maintain.

- Solution 2 has higher processing efficiency because it checks for empty fields before splitting. However, this solution uses redundant rules. We recommend that you use this solution only for specific scenarios, for example, when a large number of additional events may be produced after the raw log is split.

## Transform complex JSON data with multiple layers of nested array objects

Take the following complex JSON data with multiple layers of nested arrays as an example. Assume that you want to split the logon information stored in `login_histories` of different objects in the `users` field into separate logon events.

- Raw log entries

  ```
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
        ...more...
        }
           ]
        },
     {
        ....more user....
     }
     ]
  }
  ```

- Expected logs after splitting

  ```
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
  ....more....
  ```

- Solution

  1. Split the log and expand data based on `users` in the `content` field.

     ```
     e_split("content", jmes='users[*]', output='item')
     e_json("item",depth=1)
     ```

     The log after processing is as follows:：

     ```
     __source__:  1.2.3.4
     __topic__:
     content:{......}
     item:  {"name": "user1", "login_histories": [{"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}, {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}]}
     login_histories:  [{"date": "2019-10-10 0:0:0", "login_ip": "1.1.1.1"}, {"date": "2019-10-10 1:0:0", "login_ip": "1.1.1.1"}]
     name:  user1
     __source__:  1.2.3.4
     __topic__:
     content:{......}
     item:  {"name": "user2", "login_histories": [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]}
     login_histories:  [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]
     name:  user2
     ```

  2. Split the log and expand data based on `login_histories`.

     ```
     e_split("login_histories")
     e_json("login_histories", depth=1)
     ```

     The log after processing is as follows:

     ```
     __source__:  1.2.3.4
     __topic__:
     content: {......}
     date:  2019-10-11 0:0:0
     item:  {"name": "user2", "login_histories": [{"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}, {"date": "2019-10-11 1:0:0", "login_ip": "1.1.1.3"}]}
     login_histories:  {"date": "2019-10-11 0:0:0", "login_ip": "1.1.1.2"}
     login_ip:  1.1.1.2
     name:  user2
     __source__:  1.2.3.4
     __topic__:
     content: {......}
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
     ```

  3. Delete irrelevant fields.

     ```
     e_drop_fields("content", "item", "login_histories")
     ```

     The log after processing is as follows:

     ```
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
     ```

  4. To sum up, use the following LOG DSL rules:
     ```
     e_split("content", jmes='users[*]', output='item')
     e_json("item",depth=1)
     e_split("login_histories")
     e_json("login_histories", depth=1)
     e_drop_fields("content", "item", "login_histories")
     ```

Conclusion: If you have requirements similar to the above, split the log, expand data based on specified fields, and then delete irrelevant fields.

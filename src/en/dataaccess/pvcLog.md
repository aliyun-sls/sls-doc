# K8s Use a lightweight deployment solution to collect logs from Kubernetes clusters to which volumes are mounted by using a PVC

This topic describes how to use a lightweight deployment solution to collect logs from Kubernetes clusters to which volumes are mounted by using a persistent volume claim (PVC).

## Solution implementation

### Prerequisites

> Alibaba Cloud Simple Log Service is activated and a project and a Logstore are created.
> A PVC is created for the Apsara File Storage NAS (NAS) volume of the corresponding Kubernetes cluster. For more information, see [Mount a statically provisioned NAS volume].

## Procedure

In this example, the following resources are created: a project and a Logstore of Simple Log Service in the China (Beijing) region, a PVC named nas-pvc, and log output files in a business container.

### Step 1: Create a business container and mount a log directory to a PVC

Create a pod. The following sample code provides the content of the YAML file. The subPathExpr parameter of volumeMounts specifies the path to which the log directory belongs. You can modify the log directory for different containers based on your business requirements.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: mock-nginx-test
  name: mock-nginx-test
  namespace: default
spec:
  replicas: 4
  selector:
    matchLabels:
      app: mock-nginx-test
  template:
    metadata:
      labels:
        app: mock-nginx-test
    spec:
      containers:
        - args:
            - '--log-type=nginx'
            - '--stdout=false'
            - '--stderr=true'
            - '--path=/var/log/nginx/access.log'
            - '--total-count=1000000000'
            - '--logs-per-sec=100'
          command:
            - /bin/mock_log
          image: 'registry.cn-hangzhou.aliyuncs.com/log-service/docker-log-test:latest'
          imagePullPolicy: Always
          name: mock-nginx-test
          env:
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: NODE_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.hostIP
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
          volumeMounts:
            - mountPath: /var/log/nginx
              name: volume-nas-pvc
              subPathExpr: test-nginx-nas/$(POD_NAMESPACE)_$(POD_NAME)_$(POD_IP)_$(NODE_IP)_$(NODE_NAME)
      restartPolicy: Always
      volumes:
        - name: volume-nas-pvc
          persistentVolumeClaim:
            claimName: nas-pvc
```

### Step 2: Create a Logtail container

> .replicas Set the replicas parameter to 1. You do not need to start multiple containers.
> .ALIYUN_LOGTAIL_USER_ID：Specify an Alibaba Cloud account.
> .ALIYUN_LOGTAIL_USER_DEFINED_ID：Specify a custom machine group identifier. In this example, logtail-state-machinegroup is used.
> .user_config_file_path、docker_file_cache_path、check_point_filename、buffer_file_path Record the persistent information of Logtail.We recommend that you read [Data reliability when iLogtail containers are restarted](https://developer.aliyun.com/article/901257?spm=a2c4g.26937906.0.0.7bc357ea2m4uBN){target="_blank"}.
> .PVC shared with the business container pvc：nas-pvc
> .volumeMounts contains the business container directory and the directory that contains persistent information about Logtail.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: logtail-state-pod
  name: logtail-state-pod
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: logtail-state-pod
  template:
    metadata:
      labels:
        app: logtail-state-pod
    spec:
      containers:
        - env:
            - name: ALIYUN_LOGTAIL_USER_ID
              value: '${your_aliyun_user_id}'
            - name: ALIYUN_LOGTAIL_USER_DEFINED_ID
              value: '${your_machine_group_user_defined_id}'
            - name: ALIYUN_LOGTAIL_CONFIG
              value: /etc/ilogtail/conf/${your_region}/ilogtail_config.json
            - name: user_config_file_path
              value: /etc/ilogtail/checkpoint/user_log_config.json
            - name: docker_file_cache_path
              value: /etc/ilogtail/checkpoint/docker_path_config.json
            - name: check_point_filename
              value: /etc/ilogtail/checkpoint/logtail_check_point
            - name: check_point_dump_interval
              value: '60'
            - name: buffer_file_path
              value: /etc/ilogtail/checkpoint
          image: 'registry.cn-beijing.aliyuncs.com/log-service/logtail:latest'
          imagePullPolicy: Always
          name: logtail-state-pod
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
          volumeMounts:
            - mountPath: /var/log/nginx
              name: volume-nas-pvc
              subPath: test-nginx-nas
            - mountPath: /etc/ilogtail/checkpoint
              name: volume-nas-pvc
              subPath: logtail_checkpoint
      volumes:
        - name: volume-nas-pvc
          persistentVolumeClaim:
            claimName: nas-pvc

```

The following table describes the parameters.

| parameters.                             | Description                                                                                                                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${your_region}`                        | This parameter depends on the region and network type of the Simple Log Service project. Specify this parameter in the correct format based on the network type and region of the project.                                |
| `${your_aliyun_user_id}`                | The user identifier. Set this parameter to the ID of your Alibaba Cloud account, which is a string.For more information about how to view the ID, see [Configure a user identifier].                                      |
| `${your_machine_group_user_defined_id}` | The custom identifier of the machine group of Logtail.The identifier must be unique in the region in which your Simple Log Service is located. For more information, see [Create a custom identifier-based machine group] |

### Step 3: Create a custom identifier-based machine group in the Simple Log Service console

1. Log on to the Simple Log Service console.
2. In the Projects section, click the name of the project.
3. In the left-side navigation pane, choose Resource > Machine Group.
4. On the Machine Group tab, choose More > Create Machine Group.

> Create Machine Group

- In the Create Machine Group panel, configure the parameters and click OK. The following figure shows the parameters.In the following example, a machine group named logtail-state-machinegroup is created, which corresponds to the value of the ${your_machine_group_user_defined_id} parameter in Step 2.The name of the created machine group must be consistent with the value of the ${your_machine_group_user_defined_id} parameter.

### Step 4: Create a Logtail collection configuration

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/?spm=a2c4g.26937906.0.0.7bc357ea2m4uBN).
2. Select a project and a Logstore. On the Logstore tab, click the Logstore and then click the + icon next to Data Collection. In the dialog box that appears, select Single Line - Text Log.
3. Click Use Existing Machine Groups and select the machine group that you created in Step 3.Move the machine group from the Source Machine Group section to the Applied Server Groups section.
4. In the Logtail Configuration step, set the Mode parameter to Simple Mode. By default, Docker File is turned off. Do not turn on Doker File. Set the Log Path parameter to the /var/log/nginx directory to which a Logtail container and a business container are mounted.
  
5. Click Next to complete the Logtail configuration creation.

### Step 5: Query the collected logs

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/?spm=a2c4g.26937906.0.0.7bc357ea2m4uBN).
2. Select the project and Logstore. On the Logstore tab, click the Search & Analysis icon to query the collected logs.

### Step 6: Set the topic generation method (optional)

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/?spm=a2c4g.26937906.0.0.7bc357ea2m4uBN).
2. Select the project and Logstore. On the Logstore tab, choose Data Collection > Logtail Configurations. On the page that appears, click the name of the Logtail configuration that you want to manage.


3. On the Configuration Details tab, set the Topic Generation Mode parameter to File Path RegEx. Specify a regular expression in the Custom RegEx field based on your business requirements.

```
\/var\/log\/(?P<app>.\*?)\/(?P<namespace>[^_]+?)_(?P<podname>[^_]+?)_(?P<podip>[\d\.]+?)_(?P<nodeip>[\d\.]+?)_(?P<nodename>[^_]+?)\/access.log
```

4. Query the collected logs. You can find that the tags are added to the relevant data.


## Frequently asked questions

> .During the collection process, the metadata of the business pod is lost. How do I obtain the metadata of the business pod without using DaemonSet or SidecarSet?
> .This is because Logtail is deployed as a separate container and collects logs by mounting a shared NAS file system. In this case, Logtail cannot obtain the data of the original container. To troubleshoot the issue, you can use the following method:
> .You can specify the subPathExpr parameter of the mount directory of the business container to inject the pod information into the path, and write the pod information to tags by using a regular expression for the file path.
> .To distinguish logs of different business, you can set the subPath parameter to fixed values for the business container, such as app1 and app2. This way, logs of the same business in a pod are exported to the same shared file. When logs are collected, you can simply distinguish logs of different business by path.
> .Am I able to deploy multiple Logtail containers in a cluster?
> .You can deploy a separate Logtail container for the same file. You can also deploy Logtail containers for different types of business pods. In essence, the Logtail container must contain the shared directory of the business containers from which logs are collected.

​

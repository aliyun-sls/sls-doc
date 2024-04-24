# Use Logtail to collect ultra-large files from hosts

## Architecture

The number of files and folders that can be collected by a single Logtail instance is limited. In this example, a single Logtail instance has 2 GB of memory.

> Maximum number of monitored directories: 100,000. The directories do not contain the directories in the blacklist specified in the Logtail configuration.
> Maximum number of monitored directories and files: 1,000,000. The directories do not contain the directories in the blacklist specified in the Logtail configuration, and the files contain the files that are not matched by the Logtail configuration.
> Total number of monitored directories and files for a single collection configuration: 100,000. The directories do not contain the directories in the blacklist specified in the Logtail configuration and the files contain the files that are not matched by the Logtail configuration.
> Total number of monitored subdirectories and files in a single directory: 100,000. The directories contain the directories in the blacklist specified in the Logtail configuration and the files contain the files that are not matched by the Logtail configuration.


> Therefore, you can use multiple Logtail instances to expand the collection capabilities based on the following method:
> Divide the files to be collected into different folders.
> Start multiple Logtail instances on a server.
> Distinguish multiple Logtail instances by customizing machine group identifiers.
> Configure different collection configurations for different Logtail instances to collect logs from different folders. The file paths from which logs are to be collected of different collection configurations cannot overlap.

## Solution implementation

In the following scenario,
400,000 files need to be collected from a machine.

### Prerequisites

- The machine has sufficient resources.

  > A Logtail instance that has 2 GB of memory can collect 100,000 files. To collect 400,000 files, four Logtail instances need to be started and a total of 8 GB of memory is required. The resources required by business processes are not included.
  > In addition to the limit on the number of files, the CPU and memory resources must be estimated based on the collection rate. For example, if the collection rate of each Logtail instance reaches 40 MB/s, the four Logtail instances require a total of 16 GB of memory and 16 CPU cores.
  > The open files parameter of the machine must be set to a large value. To view the configurations of this parameter, run the following command:

- Alibaba Cloud Simple Log Service is activated.

### Procedure

1. Divide the files to be collected into different folders to meet the Logtail collection requirements.
   Logtail configurations can define the collection scope of a single collection configuration based on the file path. You must divide the log files into different folders when log files are generated.

```
/root/test_log/
├── dir1
│   ├── 1.log
│   ├── ...
│   └── 100000.log
├── dir2
│   ├── 100001.log
│   ├── ...
│   └── 200000.log
├── dir3
│   ├── 200001.log
│   ├── ...
│   └── 300000.log
└── dir4
    ├── 300001.log
│   ├── ...
    └── 400000.log

```

2.  Start multiple Logtail instances.

- To install iLogtail, you need to run three commands. The following installation commands are run in the China (Hong Kong) region. When you run the commands, you must replace the region with your region.

```
   // 1. Download the installation script.
   wget http://logtail-release-cn-hongkong.oss-cn-hongkong-internal.aliyuncs.com/linux64/logtail.sh -O logtail.sh
   // 2. Grant permissions to the script.
   chmod 755 logtail.sh
   // 3. Run the installation command.
  ./logtail.sh install cn-hongkong
```

To start multiple Logtail instances, add the following parameter to the installation command in Step 3:

```
./logtail.sh install cn-hongkong -s ${Custom suffix name}
```

To start four Logtail instances, add the suffixes 1, 2, 3, and 4 to the corresponding Logtail instance.

```
./logtail.sh install cn-hongkong -s 1
./logtail.sh install cn-hongkong -s 2
./logtail.sh install cn-hongkong -s 3
./logtail.sh install cn-hongkong -s 4
```

Eight processes are started. Each Logtail instance contains a daemon process and a primary process.

```
# ps -ef | grep logtail
root     1935015       1  0 Feb13 ?        00:00:00 /usr/local/ilogtail1/ilogtail
root     1935017 1935015  0 Feb13 ?        00:16:23 /usr/local/ilogtail1/ilogtail
root     1935823       1  0 Feb13 ?        00:00:00 /usr/local/ilogtail2/ilogtail
root     1935825 1935823  0 Feb13 ?        00:16:15 /usr/local/ilogtail2/ilogtail
root     1936165       1  0 Feb13 ?        00:00:00 /usr/local/ilogtail3/ilogtail
root     1936166 1936165  0 Feb13 ?        00:16:14 /usr/local/ilogtail3/ilogtail
root     2007431       1  0 20:32 ?        00:00:00 /usr/local/ilogtail4/ilogtail
root     2007432 2007431  1 20:32 ?        00:00:03 /usr/local/ilogtail4/ilogtail
```

- The Logtail instances run in the following directories: /usr/local/ilogtail1，/usr/local/ilogtail2，/usr/local/ilogtail3，/usr/local/ilogtail4
- Each directory corresponds to a Logtail instance.
- Control command directory（/etc/init.d/ilogtaild）：

```
 ll /etc/init.d/
-rwxr-xr-x  1 root root  4564 Feb 13 20:32 ilogtaild1
-rwxr-xr-x  1 root root  4564 Feb 13 20:32 ilogtaild2
-rwxr-xr-x  1 root root  4564 Feb 13 20:32 ilogtaild3
-rwxr-xr-x  1 root root  4564 Feb 14 20:32 ilogtaild4
```

Identifier file directory that corresponds to the original /etc/logtail directory:

```
# ll /etc/
drwxr-xr-x   8 root root     4096 Feb 13 20:32 ilogtail1
drwxr-xr-x   8 root root     4096 Feb 13 20:32 ilogtail2
drwxr-xr-x   8 root root     4096 Feb 13 20:32 ilogtail3
drwxr-xr-x   8 root root     4096 Feb 14 20:32 ilogtail4
```

Record file directory that corresponds to the original /tmp/logtail_check_point directory:

```
# ll /tmp/
-rw-r--r-- 1 root root 1494166 Feb 14 20:47 logtail_check_point1
-rw-r--r-- 1 root root 1484264 Feb 14 20:48 logtail_check_point2
-rw-r--r-- 1 root root 1484264 Feb 14 20:48 logtail_check_point3
-rw-r--r-- 1 root root 1484264 Feb 14 20:47 logtail_check_point4
```

Four Logtail instances are started. Configure a custom machine group identifier and create a machine group for each Logtail instance.
In host scenarios, Logtail usually uses an IP address-based machine group for centralized configuration management.

Create a custom identifier taiye_1 for Logtail1.

```
# touch /etc/ilogtail1/user_defined_id
# echo "taiye_1" >> /etc/ilogtail1/user_defined_id
# cat /etc/ilogtail1/user_defined_id
taiye_1
```

Create a custom identifier taiye_2 for Logtail2, create a custom identifier taiye_3 for Logtail3, and create a custom identifier taiye_4 for Logtail4. Then, create four machine groups in the Simple Log Service console.


After the machine groups are created, check the status of each machine group. The heartbeat of each machine group is normal.
4.Configure the collection configuration for each Logtail instance.

The preceding figure shows that the collection configuration named test_log1 only uses the taiye_1 machine group that contains only the Logtail1 instance. Only the /root/test_log/dir1 path is specified as the path from which logs are collected.Create collection configurations named test_log2, test_log3, and test_log4 in the same way.

5. Verify the configuration effect.
   View the user_log_config.json file of each Logtail instance to check whether the collection configurations are correctly delivered.

Query logs to check whether the logs of each instance are collected.

## Usage notes

> If you use this solution to start multiple Logtail instances, do not use an IP address-based machine group. Otherwise, the same collection configuration is sent to each instance, which causes resource waste.
> If a host has an existing Logtail instance and belongs to an IP address-based machine group, delete the IP address-based machine group to ensure that all historical collection configurations are cleared.

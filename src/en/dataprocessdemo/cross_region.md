# Transmit data across regions

## How to use cross region transmission

### Step1. Click Data Transformation to go to the data transformation page.


### Step2. On the page that appears, enter a domain-specific language (DSL) statement and click Preview Data. If you need to only copy data, no DSL statement is required.


### Step3. If no error occurs, click Save as Transformation Job.


### Fill in an output form. In the Create Data Transformation Job panel, configure the Destination Region parameter and other related parameters.


### Step 5. Click OK. The data transformation job is configured.

### Step 6. Check whether the destination Logstore receives data.


## FAQ

### How am I charged for data transmission across regions?

1.You are charged based on the size of compressed data during data transmission.For example, if the compression ratio is 10:1 and you need to transmit 10 MB of raw data, the size of the data after compression is 1 MB. This way, only 1 MB of data incurs fees. For more information about the billing methods, see [Billable items of pay-by-feature](https://www.alibabacloud.com/help/en/doc-detail/173043.html).

### How do I increase the data compression ratio?

1.If you want to increase the data compression ratio when you use the web tracking feature, we recommend that you specify fixed values for the **topic**, **tag**:_, and **source** fields in different log entries to transmit the fields as a log group. Log data is compressed by log group. If you do not specify fixed values for the **source**, **topic**, and **tag**:_ fields, multiple log groups may be generated and the data compression ratio is reduced.


### What do I do if a network connection is unstable?

1.The stability of cross-region data transmission varies based on the network environment of the Internet. If you transmit data across borders, network stability cannot be ensured. If the network connection is unstable, the data transmission job automatically retries.

2.You can activate Dynamic Content Delivery Network (DCDN) to improve network stability.



DCDN Activate DCDN. Reference:[https://www.alibabacloud.com/help/en/doc-detail/86819.html](https://www.alibabacloud.com/help/en/doc-detail/86819.html?spm=a2c4g.11186623.6.587.2bd06330XCteoT)

DCDN After DCDN is configured, select DCDN Acceleration and click Connectivity Test of DCDN Acceleration in the Create Data Transformation Job panel.


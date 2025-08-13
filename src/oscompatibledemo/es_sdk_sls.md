# 使用ES Java SDK操作
pom依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>estest</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>elasticsearch-rest-high-level-client</artifactId>
            <version>7.10.1</version>
        </dependency>
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>elasticsearch-rest-client</artifactId>
            <version>7.10.1</version>
        </dependency>
    </dependencies>
</project>
```

## 日志写入
```java
package org.example;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class EsWriteExample {
    public static void main(String[] args) throws IOException {

        String slsProject = "etl-dev";
        String slsLogstore = "accesslog";
        String slsEndpoint = "cn-huhehaote.log.aliyuncs.com";

        String schema = "https";
        String esHost = slsProject + "." +  slsEndpoint; // ${project}.${endpoint}
        int port = 443;
        String esIndex = slsProject + "." + slsLogstore; // ${project}.${logstore}
        String esPrefix = "/es/";
        String accessKeyId = System.getenv("ALIYUN_ACCESS_KEY_ID");
        String accessKeySecret = System.getenv("ALIYUN_ACCESS_KEY_SECRET");

        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(accessKeyId, accessKeySecret));

        RestClientBuilder builder = RestClient.builder(new HttpHost(esHost, port, schema)).setHttpClientConfigCallback(
                    httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));

        // Set /es/ prefix
        builder.setPathPrefix(esPrefix);
        RestHighLevelClient client = new RestHighLevelClient(builder);

        // Create bulk request
        BulkRequest bulkRequest = new BulkRequest();

        // Add sample documents to bulk request
        for (int i = 1; i <= 10; i++) {
            Map<String, Object> document = new HashMap<>();
            document.put("@timestamp", System.currentTimeMillis());
            document.put("request_method", i % 2 == 0 ? "GET" : "POST");
            document.put("request_uri", "/api/test/" + i);
            document.put("status", i % 3 == 0 ? 404 : 200);
            document.put("response_time", 100 + (i * 10));
            document.put("user_agent", "Mozilla/5.0 (Test Agent " + i + ")");
            document.put("remote_addr", "192.168.1." + (100 + i));
            document.put("body_bytes_sent", 1024 + (i * 100));
            document.put("message", "Sample log entry " + i);

            IndexRequest indexRequest = new IndexRequest(esIndex)
                    .id("doc_" + i)  // Optional: set document ID
                    .source(document, XContentType.JSON);

            bulkRequest.add(indexRequest);
        }

        try {
            // Execute bulk request
            BulkResponse bulkResponse = client.bulk(bulkRequest, RequestOptions.DEFAULT);

            // Check for failures
            if (bulkResponse.hasFailures()) {
                System.err.println("Bulk request has failures:");
                System.err.println(bulkResponse.buildFailureMessage());
            } else {
                System.out.println("Bulk request completed successfully!");
                System.out.println("Total items processed: " + bulkResponse.getItems().length);
                System.out.println("Time taken: " + bulkResponse.getTook().getMillis() + " ms");
            }

            // Print individual item results
            // System.out.println("\nIndividual item results:");
            // for (int i = 0; i < bulkResponse.getItems().length; i++) {
            //     org.elasticsearch.action.bulk.BulkItemResponse item = bulkResponse.getItems()[i];
            //     if (item.isFailed()) {
            //         System.out.println("Item " + (i + 1) + " failed: " + item.getFailureMessage());
            //     } else {
            //         System.out.println("Item " + (i + 1) + " success: " + item.getResponse().getResult());
            //     }
            // }

        } catch (IOException e) {
            System.err.println("Error executing bulk request: " + e.getMessage());
            e.printStackTrace();
        } finally {
            client.close();
        }
    }
}
```

## 日志查询

```java
package org.example;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;

public class EsQueryExample {
    public static void main(String[] args) throws IOException {

        String slsProject = "etl-dev";
        String slsLogstore = "accesslog";
        String slsEndpoint = "cn-huhehaote.log.aliyuncs.com";

        String schema = "https";
        String esHost = slsProject + "." +  slsEndpoint; // ${project}.${endpoint}
        int port = 443;
        String esIndex = slsProject + "." + slsLogstore; // ${project}.${logstore}
        String esPrefix = "/es/";
        String accessKeyId = System.getenv("ALIYUN_ACCESS_KEY_ID");
        String accessKeySecret = System.getenv("ALIYUN_ACCESS_KEY_SECRET");

        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(accessKeyId, accessKeySecret));

        RestClientBuilder builder = RestClient.builder(new HttpHost(esHost, port, schema)).setHttpClientConfigCallback(
                    httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));

        // Set /es/ prefix
        builder.setPathPrefix(esPrefix);
        RestHighLevelClient client = new RestHighLevelClient(builder);

        // Query
        BoolQueryBuilder boolExpr= new BoolQueryBuilder();

        long endTime = System.currentTimeMillis();
        long startTime = endTime - 3600 * 1000;
        boolExpr.filter().add(new MatchQueryBuilder("request_method", "GET"));
        boolExpr.filter().add(new RangeQueryBuilder("@timestamp").gte(startTime).lte(endTime).format("epoch_millis"));

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        searchSourceBuilder.query(boolExpr);
        SearchRequest searchRequest = new SearchRequest(esIndex);
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        System.out.println(searchResponse.toString());

        client.close();
    }
}
```
Use the ip_to_country function to obtain the countries or regions based on the IP addresses, aggregate the data based on the ip_country field, and then calculate the number of clients in each country or region. The results are displayed on a world map, in which the ip_country field indicates the country or region and the pv field indicates the number of clients.

```sql
* |
select
  ip_to_country(client_ip) as ip_country,
  count(*) as pv
group by
  ip_country
order by
  pv desc
limit
  500
```

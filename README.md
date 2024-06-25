Example repo with k6 performance tests + InfluxDB for collecting data and Grafana dashboard for visualization.

1. `docker-compose up -d influxdb grafana` to start containers
2. Go to `localhost:3000`
3. Create your admin account for Grafana
4. Go to Configuration -> Data Sources
5. Add InfluxDB as DataSource with following params:
- in HTTP section, add `http://influxdb:8086` in URL
- in InfluxDB Details section, add `k6` as Database name
- Click Save & test
6. Importing dashboard
- in `grafana` folder, there is JSON-structure of sample dashboard
- import it by choosing "+" sign in left panel and then Import
7. Running tests:
- go to tests folder
- run with `docker-compose run -v $PWD:/tests k6 run /tests/scripts/<script name>.js`
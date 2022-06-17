# Postgres
This Repo is an introduction to databases using Postgres

[Lecture Slides](https://hackmd.io/@XinhdUgJSt2kHuiYLatSqQ/ByMXOfSKq#/)

[Documentation](http://vitaly-t.github.io/pg-promise/index.html)

[Wiki](https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example)


## Branches
- Postgre-setup: Only contains the initial work with the seed and schema files. This branch will align with main
- postgres-db-integration-local: This branch will integrate out Postgres databases into our express file so that we can query when routes are hit
- postgres-db-integration-satellite: This branch includes work for extraciting the db integration from the express main file that includes rouing. The purpose is to seprarate our integrated db from routing bc our routes do need to know about the queries. We only need data. 

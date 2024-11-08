## PostgreSQL  Assignment

This is an SQL query practice demo which uses PostgresSQL and Nodejs to retrieve inventory records from a database and display them in html views.

The SQL queries are stored in ```queries.js``` in order to manage them from one location. 

The PostgreSQL connection is stored in ```db.js```  and it connects to a PostgreSQL database stored on neon.tech 
``db.js`` exports a *query method* which is used to execute SQL queries using the PostgreSQL pool connection.

In order to retrieve records from the database, the query method is invoked in ``index.js`` parsing in the SQL query string and an optional array of parameters.

The app is hosted on render on the url below:
 
 
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URI
});

;(async () => {
  await client.connect()
  await client.query('create table users (id serial primary key, username varchar(255), firstName varchar(255), lastName varchar(255), email varchar(255), phone varchar(255))')
  await client.query("insert into users (username, firstName, lastName, email, phone) values ('jd', 'John', 'Doe', 'joe@example.com', '+79999999999')")
  await client.end()
})()

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const usersRouter = require('./routes/users');
const {sequelize} = require('./models/database')

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/config', function (req, res) {
  res.send({
    DATABASE_URI: process.env.DATABASE_URI,
  });
});

app.get('/health', async function (req, res) {
  try {
    await sequelize.authenticate();
    res.send({ 'status': 'OK' });
  } catch (error) {
    res.status(500).send({ 'status': 'FAILED' });
  }

});

app.use('/users', usersRouter)

app.listen(8000, function () {
  console.log('Listen on port 8000!');
});

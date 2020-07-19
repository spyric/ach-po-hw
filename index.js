var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/health', function (req, res) {
  res.send({ 'status': 'OK' });
});

app.listen(8000, function () {
  console.log('Listen on port 8000!');
});

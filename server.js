const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const database = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(database.url, (err, client) => {
  if (err) return console.error(err);
  const db = client.db('pages-api');
  require('./app/routes')(app, db);
  
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});

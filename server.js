//This file starts the port listening
//and connects to MongoDb
const source = require('./source');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

async function start() {
  await mongodb.initDb();
  source.listen(port);
  console.log(`Connected to Database and listening on port ${port}`);
}

start();
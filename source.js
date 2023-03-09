const express = require("express");
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");


const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.PORT || 8080;

app 
.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

.use("/", require("./routes"));

// app.listen(port);
// console.log(`Connected on ${port}`);

mongodb.initDb((err, mongodb, next) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });
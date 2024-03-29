const express = require("express");
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const { auth, requiresAuth } = require('express-openid-connect');
const userController = require('./controller/user');


const cors = require("cors");

const app = express();

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// Authenticiation

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: process.env.BASE_URL,
  clientID: 'tPBjaXwKjkDiYkMIRM15vQCy6Q46JZ2z',
  issuerBaseURL: 'https://dev-b0rkht1ryuza4xk6.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  //#swagger.tags = ['User Authentication Status']
  const authenticate = req.oidc.isAuthenticated();
  if (authenticate) {
    res.redirect(process.env.BASE_URL + '/profile');
  } else {
    res.send('logged out');
  }
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
  userController.createUser(req, res);
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })

  .use("/", require("./routes"));

// app.use(express.urlencoded({extended: true})); 

// app.listen(port);
// console.log(`Connected on ${port}`);

module.exports = app;
// mongodb.initDb((err, mongodb, next) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });
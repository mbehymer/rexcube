const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'https://rexcube.onrender.com',
  // host: 'localhost:8080',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./source.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */


swaggerAutogen(outputFile, endpointsFiles, doc);
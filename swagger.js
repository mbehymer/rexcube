const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {

    title: 'RexCube',
    description: 'An API for RexCube App',
  },
  // host: 'rexcube.onrender.com',
  host: 'localhost:8080',
  schemes: ['http'],


};

const outputFile = './swagger.json';
const endpointsFiles = ['./source.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */


swaggerAutogen(outputFile, endpointsFiles, doc);
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// load .env variables into environment variables, if .env is available
require('dotenv').config();

// register modules that are aliased (see package.json)
require('module-alias/register');

const errorHandler = require('@middlewares/errorHandler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
const modules = fs.readdirSync(path.resolve(__dirname, 'src', 'modules'));
modules.forEach(m => {
  const modulePath = path.resolve(__dirname, 'src', 'modules', m, 'route');
  app.use('/', require(modulePath)());
  console.info(`${m} - module loaded`);
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
/* eslint-disable no-console */

// este dotenv permite crear variables de entorno para que la aplicacion sea escalable
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');

// environment variables
// require('dotenv').config();
// Aqui le agrege mi ruta de mongo DEBO revisar las variables de entorno
const mongoUrl = "mongosh 'mongodb+srv://cluster0.evmb7.mongodb.net/myFirstDatabase' --username wguerreroc333"
const dbUrl = process.env.DB_URL || mongoUrl ;
const port = process.env.PORT || 3000;

// create express app
const app = express();

// favicon
app.use(favicon(path.join(__dirname, 'app', 'views', 'favicon.ico')));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// settings for Ejs
app.set('views', path.join(`${__dirname}/app/views`));
app.set('view engine', 'ejs');

// Mongoose require
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Todo App.' });
});

// Require User routes
require('./app/routes/user.routes.js')(app);

// Require Task routes
require('./app/routes/task.routes.js')(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

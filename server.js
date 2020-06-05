const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');

const port = process.env.PORT || 5000;

console.log(chalk.greenBright.bold("\nStarting testing server" ));

const app = express();
const publicFilesDirectory = path.join(__dirname,'/assets');
app.use(express.static(publicFilesDirectory));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const services = require('./routes/services');

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api/services', services);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(port, () => console.log(chalk.blueBright.bold(`Server running on port ${port}`)));
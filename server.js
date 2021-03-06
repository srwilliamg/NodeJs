const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const hbs = require('hbs');

const port = process.env.PORT || 5000;

console.log(chalk.greenBright.bold("\nStarting testing server" ));

// Directory routes
const viewsDirectory = path.join(__dirname,'/views');
const publicFilesDirectory = path.join(__dirname,'/assets');

const app = express();

app.use(express.static(publicFilesDirectory));
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(viewsDirectory+'/partials', function (err) {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const services = require('./routes/services');
const auth = require('./routes/auth');
const files = require('./routes/files');
const mail = require('./routes/mail');

app.use('/api/auth', auth);
app.use('/api/services', services);
app.use('/api/files', files);
app.use('/api/mail', mail);

app.get('/index', (req, res) => {
  res.render('index', {title:"Testing page", title_content:"waiting you to do something",content:"Just do it"});
});

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.send(`<h1 style="text-align: center;">Page not found</h1>`);
});


app.listen(port, () => console.log(chalk.blueBright.bold(`Server running on port ${port}`)));
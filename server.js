const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(process.env.USER);

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

// MAINTENANCE MODE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() + ' Hello';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMsg: 'Welcome holmes!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'Booyah!',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects!',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error dudes!',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

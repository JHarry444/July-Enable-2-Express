const express = require('express');

const app = express();

const cors = require("cors");

app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cakeRoutes = require('./routes/cakes');

// app.use((req, res, next) => {
//   console.log('Never');
//   return next();
// });

// app.use((req, res, next) => {
//   console.log('gonna');
//   return next();
// });

// app.use((req, res, next) => {
//   console.log('give');
//   // return next("Oops"); causes error
//   return next();
// });

// app.use((req, res, next) => {
//   console.log('you');
//   return next();
// });
// app.use((req, res, next) => {
//   console.log('up');
//   return next();
// });
// app.use((req, res, next) => {
//   console.log('!');
//   return next();
// });

// const middleware = (req, res, next) => {
//   // console.log('Never gonna tuuurn around');
//   return next();
// };

app.use('/cakes', cakeRoutes);

app.get('/hello', (req, res) => res.send('Hello, World!'));

app.use('*', (req, res, next) => next({ statusCode: 404, message: 'Incorrect URL' }));

// eslint-disable-next-line no-unused-vars, arrow-body-style
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).send(err.message || err);
});

const server = app.listen(4494, () => {
  console.log(`Server started on port ${server.address().port}`);
});

module.exports = server;

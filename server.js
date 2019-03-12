const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const squirrelsRouter = require('./routes/squirrels');
const { restrict } = require('./auth');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/squirrels', restrict, squirrelsRouter);

app.listen(3000, () => console.log('up and running'))

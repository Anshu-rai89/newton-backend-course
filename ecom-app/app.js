
const express = require('express');
const asyncExpressError = require('express-async-errors');
const {errorMiddleware} = require('./middleware')
const app = express();
const routes = require('./routes');

app.use(express.urlencoded());
app.use(express.json());
app.use(errorMiddleware);

app.use('/',routes);

module.exports = app;


require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
// const cors = require('cors');

const { getCats } = require('./controller.js');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// app.options('*', cors());

app.get('/cats', getCats);


app.listen(process.env.PORT);
console.log(`Server listening at http://localhost:${process.env.PORT}`);

module.exports.app = app;
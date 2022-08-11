require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
// const cors = require('cors');

const { getCats, updateCat } = require('./controller.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// app.options('*', cors());

app.get('/cats', getCats);

app.put('/cats/:id', updateCat);


app.listen(PORT);
console.log(`Server listening at ${PORT}`);

module.exports.app = app;
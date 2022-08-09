const axios = require('axios');
const Cats = require('./db');


exports.getCats = async (req, res) => {
  try {
    const data = await Cats.find();
    res.send(data);
  } catch(e) {
    console.log(e);
  }
};
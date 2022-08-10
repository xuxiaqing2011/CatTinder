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

exports.updateCat = async (req, res) => {
  try {
    const id = req.params.id;
    await Cats.findOneAndUpdate({ id }, [{ "$set": { "saved": { "$not": "$saved"}}}])

    res.sendStatus(200);
  } catch(e) {
    console.log(e);
  }
};

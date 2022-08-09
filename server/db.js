require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => console.log('mongoose open connection to: ', process.env.DB_NAME))
  .catch(err => console.log('ERROR*************************', err));

const catSchema = new mongoose.Schema(
  {
    name: String,
    id: Number,
    url: String,
    breeds: String,
    colors: String
  },
  { versionKey: false }
);

const Cats = new mongoose.model('Cats', catSchema);

module.exports = Cats;

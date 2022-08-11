require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`

mongoose.connect(MONGODB_URI)
  .then(() => console.log('mongoose open connection to: ', MONGODB_URI))
  .catch(err => console.log('ERROR*************************', err));

const catSchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    id: Number,
    url: String,
    size: String,
    breeds: String,
    colors: String,
    photos: Array,
    saved: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

const Cats = new mongoose.model('Cats', catSchema);

module.exports = Cats;

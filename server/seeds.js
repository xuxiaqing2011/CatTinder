require('dotenv').config();
const axios = require('axios');
const Cats = require('./db');

var config = {
  method: 'get',
  url: 'https://api.petfinder.com/v2/animals?type=cat',
  headers: {
    'Authorization': process.env.AUTHORIZATION
  }
};
Cats.deleteMany({})
  .then(() => {
    return axios(config)
  })
  .then(res => {
    let cats = res.data.animals;

    cats.forEach(cat => {
      cat.breeds = cat.breeds.primary;
      cat.colors = cat.colors.primary;
    })

    return Cats.create(cats);
  })
  .then(() => console.log("Reset db complete!"))
  .catch(e => console.log('Error resetting db'));


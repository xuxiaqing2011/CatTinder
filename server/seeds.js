require('dotenv').config();
const axios = require('axios');
const Cats = require('./db');

let urls = [];

for (let n = 1; n < 3; n++) {
  const url = `https://api.petfinder.com/v2/animals?type=cat&page=${n}&limit=100`
  urls.push(url);
}

// var config = {
//   method: 'get',
//   url: `https://api.petfinder.com/v2/animals?type=cat&page=${n}&limit=100`,
//   headers: {
//     'Authorization': process.env.AUTHORIZATION
//   }
// };
// console.log(configs);

Cats.deleteMany({})
  .then(async () => {
    for (let url of urls) {
      let config = {
        method: 'get',
        url: url,
        headers: {
          'Authorization': process.env.AUTHORIZATION
        }
      };
      let res = await axios(config);
      let cats = res.data.animals.filter(cat => cat.photos.length !== 0 && cat.name.length < 15);
      console.log(cats.length);

      cats.forEach(cat => {
        cat.breeds = cat.breeds.primary;
        cat.colors = cat.colors.primary;
        cat.photos = cat.photos.map(p => p.large);
      })
      await Cats.create(cats);
    }
  })
  .then(() => console.log("Reset db complete!"))
  .catch(e => console.log('Error resetting db', e));


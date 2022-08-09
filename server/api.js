*********   https://www.petfinder.com/developers/v2/docs/
Get Animals
Returns one "page" of details (defaulting to the first 20 results) on a group of animals based on criteria given in the parameters.

If a location query is not given, the animal distance property will be null. Otherwise the distance is distance from the location parameter in miles.

GET https://api.petfinder.com/v2/animals


Get Animal
Returns details on the specified animal based on ID.
GET https://api.petfinder.com/v2/animals/{id}


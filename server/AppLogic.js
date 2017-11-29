const axios = require('axios');

const discogs = axios.create({
  baseURL: 'https://api.discogs.com/',
});

// Function that gets a Discogs master release, given Discogs master ID
function getDiscogsRelease(id) {
  return discogs.get(`masters/${id}`)
    .then(response => response.data)
    .catch(error => ({
      error,
      errorMessage: 'Something went wrong while fetching the release, try again',
    }));
}

// Function that gets a random Discogs master release
// function getRandomDiscogsRelease() {
//   // PS: Dicogs release IDs seem to be running from 113 to 1'268'960
//   const random = (Math.random() * (1268960 - 113)) + 113;
//   const randomString = Math.floor(random).toString();
//   return discogs.get(`masters/${randomString}`)
//     .then(response => response.data)
//     .catch(error => ({
//       error,
//       errorMessage: 'Something went wrong while fetching the release, try again',
//     }));
// }

module.exports = {
  getDiscogsRelease,
  // getRandomDiscogsRelease,
};

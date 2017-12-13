import axios from 'axios';

const discogs = axios.create({
  baseURL: 'https://api.discogs.com/',
});

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
});


// Function that gets a main release from Discogs, given main release ID
export function getMainReleaseFromDiscogs(id) {
  return discogs.get(`releases/${id}`)
    .then(response => response.data)
    .catch(error => ({ error }));
}

// Function that gets a random Discogs master release
export function getRandomDiscogsRelease() {
  // PS: Dicogs release IDs seem to be running from 113 to 1'268'960
  const random = (Math.random() * (1268960 - 113)) + 113;
  const randomString = Math.floor(random).toString();
  return discogs.get(`masters/${randomString}`)
    .then(response => response.data)
    .catch(error => ({ error }));
}

// Function that gets a random release form ou database after filtering
// by style
export function getRandomReleaseWithStyle(styles) {
  return api.post('/filter-random', { styles })
    .then(response => response.data)
    .catch(error => ({ error }));
}

export default {
  getMainReleaseFromDiscogs,
  getRandomDiscogsRelease,
  getRandomReleaseWithStyle,
};

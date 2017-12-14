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
  return api.get('getrandom')
    .then(response => response.data)
    .catch(error => ({ error }));
}


export default {
  getMainReleaseFromDiscogs,
  getRandomDiscogsRelease,
};

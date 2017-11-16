const axios = require('axios')

const discogs = axios.create({
  baseURL: 'https://api.discogs.com/'
})

// Function that gets a Discogs master release, given Discogs master ID
export function getDiscogsRelease (id) {
  return discogs.get('masters/' + id)
  .then(response => response.data)
  .catch(error => {
    console.error('Error getting master release, ', error)
  })
}

// Function that gets a random Discogs master release
export function getRandomDiscogsRelease () {
  // from 113 to 1'268'960
  
  let rnd = Math.random()
  return discogs.get('masters/2002')
  .then(response => response.data)
  .catch(error => {
    console.error('Error getting a random release, ', error)
  })
}

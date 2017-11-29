const assert = require('assert');
const nock = require('nock');

const { getDiscogsRelease } = require('../AppLogic');

// Test discogs reponse to be mocked (with nock) and used in the tests
const TestDiscogsResponse = {
  styles: [
    'Deep Techno',
    'Techno',
  ],
  videos: [
    {
      duration: 456,
      description: 'Abdulla Rashim - Of Water And The Spirit [NE34]',
      embed: true,
      uri: 'https://www.youtube.com/watch?v=e0DMixzYHkU',
      title: 'Abdulla Rashim - Of Water And The Spirit [NE34]',
    },
    {
      duration: 494,
      description: 'Abdulla Rashim - Vestal Witness [NE34]',
      embed: true,
      uri: 'https://www.youtube.com/watch?v=XlUId-kEiGY',
      title: 'Abdulla Rashim - Vestal Witness [NE34]',
    },
    {
      duration: 371,
      description: 'Abdulla Rashim - Proceeding To Infinity [NE34]',
      embed: true,
      uri: 'https://www.youtube.com/watch?v=WUR2Oc2aAVA',
      title: 'Abdulla Rashim - Proceeding To Infinity [NE34]',
    },
  ],
  artists: [
    {
      join: ',',
      name: 'Abdulla Rashim',
      anv: '',
      tracks: '',
      role: '',
      resource_url: 'https://api.discogs.com/artists/2317686',
      id: 2317686,
    },
  ],
  versions_url: 'https://api.discogs.com/masters/1107326/versions',
  year: 2016,
  images: [
    {
      uri: '',
      height: 620,
      width: 600,
      resource_url: '',
      type: 'primary',
      uri150: '',
    },
    {
      uri: '',
      height: 592,
      width: 600,
      resource_url: '',
      type: 'secondary',
      uri150: '',
    },
  ],
  id: 1107326,
  tracklist: [
    {
      duration: '',
      position: 'A',
      type_: 'track',
      title: 'Vestal Witness',
    },
    {
      duration: '',
      position: 'B1',
      type_: 'track',
      title: 'Of Water And The Spirit',
    },
    {
      duration: '',
      position: 'B2',
      type_: 'track',
      title: 'Proceeding To Infinity',
    },
  ],
  genres: [
    'Electronic',
  ],
  num_for_sale: 35,
  title: 'Of Water And The Spirit',
  main_release: 9250798,
  main_release_url: 'https://api.discogs.com/releases/9250798',
  uri: 'https://www.discogs.com/Abdulla-Rashim-Of-Water-And-The-Spirit/master/1107326',
  resource_url: 'https://api.discogs.com/masters/1107326',
  lowest_price: 9.49,
  data_quality: 'Correct',
};

// Tests

describe('AppLogic', () => {
  describe('Testing getDiscogsRelease function', () => {
    before(() => {
      // 1) First test, mocking a Discogs reply
      nock('https://api.discogs.com')
        .get('/masters/15527')
        .reply(200, TestDiscogsResponse);

      // 2) Second test, mocking a Discogs error
      nock('https://api.discogs.com')
        .get('/masters/15527')
        .replyWithError({
          message: 'Master Release not found.',
        });
    });

    after(() => {
      nock.cleanAll();
    });

    it('should return a release as given by Discogs', () => {
      getDiscogsRelease('15527').then(response => assert.deepEqual(response, TestDiscogsResponse));
    });

    it('should return an error message', () => {
      getDiscogsRelease('15527').then(response => assert(response.errorMessage === 'Something went wrong while fetching the release, try again'));
    });
  });
});

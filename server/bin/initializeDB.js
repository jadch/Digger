// Script that initializes our DB, by querying all releases from Discogs
//  and adding them to our database.

import { getDiscogsRelease } from '../AppLogic';

const jsonfile = require('jsonfile');

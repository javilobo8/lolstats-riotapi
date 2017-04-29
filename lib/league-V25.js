const axios = require('axios');
const {find} = require('lodash');
const Promise = require('bluebird');
const regionalEndpoints = require('../regional-endpoints');

class LeagueV25 {
  /**
   * Create a LeagueV25 instance
   * @param {string} apikey
   */
  constructor(apikey) {
    this.apikey = apikey;
  }

  /**
   * @method getLeagueEntriesForSummonerIds
   * @param {string} region
   * @param {string} summonerId
   * @return {Promise}
   */
  getLeagueEntriesForSummonerIds(region, summonerId) {
    return new Promise((resolve, reject) => {
      if (!summonerId) reject(new Error('Empty summonerId'));

      const server = find(regionalEndpoints, {region});
      if (!server) reject(new Error('Region not found'));

      const requestUrl = `https://${server.host}/api/lol/${server.region}/v2.5/league/by-summoner/${summonerId}/entry?api_key=${this.apikey}`;
      resolve(axios({url: requestUrl}));
    });
  }
}

module.exports = LeagueV25;

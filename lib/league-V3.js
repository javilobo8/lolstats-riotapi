const axios = require('axios');
const {find} = require('lodash');
const Promise = require('bluebird');
const regionalEndpoints = require('../regional-endpoints');

class LeagueV3 {
  /**
   * Create a LeagueV3 instance
   * @param {string} apikey
   */
  constructor(apikey) {
    this.apikey = apikey;
  }

  /**
   * @method getAllLeaguePositionsForSummoner
   * @param {string} region
   * @param {string} summonerId
   * @return {Promise}
   */
  getAllLeaguePositionsForSummoner(region, summonerId) {
    return new Promise((resolve, reject) => {
      if (!summonerId) reject(new Error('Empty summonerId'));

      const server = find(regionalEndpoints, {region});
      if (!server) reject(new Error('Region not found'));
      const requestUrl = `https://${server.host}/lol/league/v3/positions/by-summoner/${summonerId}?api_key=${this.apikey}`;
      resolve(axios({url: requestUrl}));
    });
  }
}

module.exports = LeagueV3;

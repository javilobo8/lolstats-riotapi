const axios = require('axios');
const {find} = require('lodash');
const Promise = require('bluebird');
const regionalEndpoints = require('../regional-endpoints');

class ChampionMasteryV3 {
  /**
   * Create a ChampionMasteryV3 instance
   * @param {string} apikey
   */
  constructor(apikey) {
    this.apikey = apikey;
  }


  /**
   * @method getAllChampionMasteries
   * @param {string} region
   * @param {string} summonerId
   * @return {Promise}
   */
  getAllChampionMasteries(region, summonerId) {
    return new Promise((resolve, reject) => {
      if (!summonerId) reject(new Error('Empty summonerId'));

      const server = find(regionalEndpoints, {region});
      if (!server) reject(new Error('Region not found'));

      const requestUrl = `https://${server.host}/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerId}?api_key=${this.apikey}`;
      resolve(axios({url: requestUrl}));
    });
  }
}

module.exports = ChampionMasteryV3;

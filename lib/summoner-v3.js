const axios = require('axios');
const {find} = require('lodash');
const Promise = require('bluebird');
const regionalEndpoints = require('../regional-endpoints');

class SummonerV3 {
  /**
   * Create a SummonerV3 instance
   * @param {string} apikey
   */
  constructor(apikey) {
    this.apikey = apikey;
  }

  /**
   * @method getSummonerByName
   * @param {string} region
   * @param {string} _summonerName
   * @return {Promise}
   */
  getSummonerByName(region, _summonerName) {
    return new Promise((resolve, reject) => {
      if (!_summonerName) reject(new Error('Empty summonerName'));
      const summonerName = encodeURIComponent(String(_summonerName).toLowerCase().replace(/\s/g, ''));

      const server = find(regionalEndpoints, {region});
      if (!server) reject(new Error('Region not found'));

      const requestUrl = `https://${server.host}/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${this.apikey}`;
      resolve(axios({url: requestUrl}));
    });
  }
}

module.exports = SummonerV3;

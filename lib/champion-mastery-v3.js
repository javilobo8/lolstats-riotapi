const axios = require('axios');
const _ = require('lodash');
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
    this.champions = [];
    this.getChampions();
  }

  getChampions() {
    Promise.resolve(axios({
      url: `https://euw1.api.riotgames.com/lol/static-data/v3/champions?champListData=altimages&api_key=${this.apikey}`,
    }))
      .then(({data}) => _.values(data.data))
      .then((data) => {
        this.champions = data;
      });
  }

  updateChampionNames(response) {
    return {
      data: response.data.map((champ) => {
        const champion = _.find(this.champions, c => c.id === champ.championId);
        return Object.assign({}, champ, {championName: champion ? champion.name : 'Not Found'});
      }),
    };
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
      resolve(axios({url: requestUrl}).then(this.updateChampionNames.bind(this)));
    });
  }
}

module.exports = ChampionMasteryV3;

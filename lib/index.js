/* eslint-disable class-methods-use-this */
const Promise = require('bluebird');
const axios = require('axios');

const SummonerV3 = require('./summoner-v3');
const ChampionMasteryV3 = require('./champion-mastery-v3');
const LeagueV25 = require('./league-V25');

class RiotApi {
  constructor(apikey) {
    if (!apikey) throw new Error('RiotApi needs an apikey');
    this.apikey = apikey;
    this.SummonerV3 = new SummonerV3(apikey);
    this.ChampionMasteryV3 = new ChampionMasteryV3(apikey);
    this.LeagueV25 = new LeagueV25(apikey);
    this.RealmInfo = null;
  }

  getRealmInfo() {
    return Promise.resolve(axios({
      url: 'https://ddragon.leagueoflegends.com/realms/euw.json',
    }));
  }
}

module.exports = RiotApi;

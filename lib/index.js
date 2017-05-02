const Promise = require('bluebird');
const axios = require('axios');
const _ = require('lodash');

const SummonerV3 = require('./summoner-v3');
const ChampionMasteryV3 = require('./champion-mastery-v3');
const LeagueV25 = require('./league-V25');
const LeagueV3 = require('./league-V3');

class RiotApi {
  constructor(apikey) {
    if (!apikey) throw new Error('RiotApi needs an apikey');
    this.apikey = apikey;
    this.SummonerV3 = new SummonerV3(apikey);
    this.ChampionMasteryV3 = new ChampionMasteryV3(apikey);
    this.LeagueV3 = new LeagueV3(apikey);
    this.LeagueV25 = new LeagueV25(apikey);
    this.RealmInfo = null;
  }

  static getRealmInfo() {
    return Promise.resolve(axios({
      url: 'https://ddragon.leagueoflegends.com/realms/euw.json',
    }));
  }

  static getChampionList(apikey) {
    return Promise.resolve(axios({
      url: `https://euw1.api.riotgames.com/lol/static-data/v3/champions?champListData=altimages&api_key=${apikey}`
    })).then(({data}) => ({data: _.values(data.data)}));
  }
}

module.exports = RiotApi;

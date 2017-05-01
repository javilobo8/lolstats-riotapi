const {expect} = require('chai');
const RiotApi = require('./index');
const SummonerV3 = require('./summoner-v3');
const ChampionMasteryV3 = require('./champion-mastery-v3');
const LeagueV25 = require('./league-V25');

describe('RiotApi', () => {
  describe('Create instance with apikey', () => {
    const apikey = process.env.APIKEY;
    const api = new RiotApi(apikey);

    it('should create an instance', (done) => {
      expect(api).to.be.instanceOf(RiotApi);
      done();
    });

    it('should have static getRealmInfo', (done) => {
      expect(RiotApi.getRealmInfo).to.be.a('function');
      done();
    });

    it('should get realm info', (done) => {
      RiotApi.getRealmInfo()
        .then(({data}) => {
          expect(data).to.be.an('object');
          done();
        });
    });

    it('should contain SummonerV3 instance', (done) => {
      expect(api.SummonerV3).to.be.instanceOf(SummonerV3);
      done();
    });

    it('should contain an apikey', (done) => {
      expect(api.apikey).to.be.equal(apikey);
      done();
    });

    it('should contain ChampionMasteryV3 instance', (done) => {
      expect(api.ChampionMasteryV3).to.be.instanceOf(ChampionMasteryV3);
      done();
    });

    it('should contain LeagueV25 instance', (done) => {
      expect(api.LeagueV25).to.be.instanceOf(LeagueV25);
      done();
    });
  });

  describe('Create instance without api', () => {
    it('should throw an error', (done) => {
      try {
        // eslint-disable-next-line
        const api = new RiotApi();
      } catch (err) {
        expect(err.message).to.be.equal('RiotApi needs an apikey');
        done();
      }
    });
  });
});
